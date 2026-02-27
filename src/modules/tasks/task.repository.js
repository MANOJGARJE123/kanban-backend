import pool from '../../config/db.js';

export const createTask = async (data) => {
    const result = await pool.query(
        'INSERT INTO tasks (title, description, column_id, position) VALUES ($1, $2, $3, $4) RETURNING id, title, description, column_id, position, created_at',
        [data.title, data.description, data.column_id, data.position]
    );
    return result.rows[0];
};

export const getTasks = async (boardId, columnId) => {
    console.log("boardid", boardId);
    console.log("columnid", columnId);
    let query = 'SELECT t.id, t.title, t.description, t.column_id, t.position, t.created_at FROM tasks t JOIN board_columns bc ON t.column_id = bc.id WHERE bc.board_id = $1';
    let params = [boardId];
    let paramCount = 1;

    if (columnId) {
        paramCount++;
        query += ` AND t.column_id = $${paramCount}`;
        params.push(columnId);
    }

    query += ' ORDER BY t.position';
    
    console.log("query", query);
    console.log("params", params);

    const result = await pool.query(query, params);
    console.log("Result:", result.rows);
    return result.rows;
};

export const updateTask = async (id, data) => {
    const result = await pool.query(
        'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING id, title, description, column_id, position, created_at',
        [data.title, data.description, id]
    );
    return result.rows[0];
};

export const moveTask = async (id, columnId, position) => {
    const result = await pool.query(
        'UPDATE tasks SET column_id = $1, position = $2 WHERE id = $3 RETURNING id, title, description, column_id, position, created_at',
        [columnId, position, id]
    );
    return result.rows[0];
};

export const deleteTask = async (id) => {
    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
};

export const assignTask = async (taskId, userId) => {
    const result = await pool.query(
        'INSERT INTO task_assignments (task_id, user_id) VALUES ($1, $2) RETURNING task_id, user_id, assigned_at',
        [taskId, userId]
    );
    return result.rows[0];  
}

export const fetchUserTasks = async (userId) => {
    const result = await pool.query(
        `select t.id, t.title, t.description, t.column_id, t.position, t.created_at 
         from tasks t 
         join task_assignments ta on t.id = ta.task_id 
         where ta.user_id = $1
         order by t.created_at desc`,
        [userId]
    );
    return result.rows;
}

export const getTaskOfColumn = async (columnId) => {
    const result = await pool.query(
        'SELECT id, title, description, column_id, position, created_at FROM tasks WHERE column_id = $1 ORDER BY position',
        [columnId]
    )
    return result.rows;
}   
