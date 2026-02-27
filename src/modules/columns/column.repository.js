import pool from '../../config/db.js';

export const createColumn = async (data) => {
    const result = await pool.query(
        'INSERT into board_columns (name, board_id, position) VALUES ($1, $2, $3) RETURNING id, name, board_id, position, created_at',
        [data.name, data.board_id, data.position]
    );
    return result.rows[0];
};

export const getColumnById = async (id) => {
    const result = await pool.query(
        'SELECT id, name, board_id, position, created_at FROM board_columns WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

export const getColumnsByBoardId = async (boardId) => {
    const result = await pool.query(
        'SELECT id,name, board_id, position, created_at FROM board_columns WHERE board_id = $1 order by position',
        [boardId]
    );
    return result.rows;
};

export const updateColumnPosition = async (id, position) => {
    const result = await pool.query(
        'UPDATE board_columns set position = $1 WHERE id = $2 RETURNING id, name, board_id, position, created_at',
        [position, id]
    );
    return result.rows[0];
};

export const deleteColumn = async (id) => {
    const result = await pool.query(
        'DELETE from board_columns WHERE id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
};

export const fetchColumnsOfBoard = async (boardId) => {
    const result = await pool.query(
        'SELECT id,name, board_id, position, created_at FROM board_columns WHERE board_id = $1 order by position',
        [boardId]
    );
    return result.rows;
};