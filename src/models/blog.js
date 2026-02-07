import pool from "../config/db.js";

export const createBlog = async ({ userId, title, content, summary }) => {
  const [result] = await pool.query(
    `INSERT INTO blogs (user_id, title, content, summary) VALUES (?, ?, ?, ?)`,
    [userId, title, content, summary],
  );
  return result.insertId;
};

export const countBlogs = async () => {
  const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM blogs`);
  return rows[0].total;
};

export const getBlogsPaginated = async ({ limit, offset }) => {
  const [rows] = await pool.query(
    `
    SELECT b.id, b.title, b.summary, b.created_at, b.updated_at,
           u.id AS author_id, u.name AS author_name, u.email AS author_email
    FROM blogs b
    JOIN users u ON u.id = b.user_id
    ORDER BY b.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [limit, offset],
  );
  return rows;
};

export const getBlogById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT b.id, b.user_id, b.title, b.content, b.summary, b.created_at, b.updated_at,
           u.name AS author_name, u.email AS author_email
    FROM blogs b
    JOIN users u ON u.id = b.user_id
    WHERE b.id = ?
    `,
    [id],
  );
  return rows[0];
};

export const updateBlogById = async ({ id, title, content, summary }) => {
  const [result] = await pool.query(
    `
    UPDATE blogs
    SET title = ?, content = ?, summary = ?
    WHERE id = ?
    `,
    [title, content, summary, id],
  );
  return result.affectedRows;
};

export const deleteBlogById = async (id) => {
  const [result] = await pool.query(`DELETE FROM blogs WHERE id = ?`, [id]);
  return result.affectedRows;
};
