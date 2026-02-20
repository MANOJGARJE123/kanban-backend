import pool from '../../config/db.js';

export const createColumn = async (data) => {
    const { name, board_id, position } = data;
    let resolvedPosition = position;

    if (resolvedPosition === undefined || resolvedPosition === null) {
        const positionResult = await pool.query(
            'SELECT COALESCE(MAX(position), 0) + 1 AS next_position FROM columns WHERE board_id = $1',
            [board_id]
        );
        resolvedPosition = positionResult.rows[0].next_position;
    }

    const result = await pool.query(
        'INSERT INTO columns (name, board_id, position) VALUES ($1, $2, $3) RETURNING id, name, board_id, position',
        [name, board_id, resolvedPosition]
    );
    return result.rows[0];
}

export const getColumnById = async (id) => {
    const result = await pool.query(
        'SELECT id, name, board_id, position FROM columns WHERE id = $1',
        [id]
    );
    if (result.rows.length === 0) {
        throw new Error('Column not found');
    }
    return result.rows[0];
}

export const reorderColumns = async (data) => {
    const { board_id, columns } = data;
    if (!board_id || !Array.isArray(columns)) {
        throw new Error('Invalid payload for column reorder');
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const updated = [];
        for (const column of columns) {
            const result = await client.query(
                'UPDATE columns SET position = $1 WHERE id = $2 AND board_id = $3 RETURNING id, name, board_id, position',
                [column.position, column.id, board_id]
            );

            if (result.rows.length === 0) {
                throw new Error('Column not found for reorder');
            }

            updated.push(result.rows[0]);
        }

        await client.query('COMMIT');
        return updated;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export const deleteColumn = async (id) => {
    if (!id) {
        throw new Error('Column id is required');
    }
    const result = await pool.query(
        'DELETE FROM columns WHERE id = $1 RETURNING id, name, board_id, position',
        [id]
    );
    if (result.rows.length === 0) {
        throw new Error('Column not found');
    }
    return result.rows[0];
}
