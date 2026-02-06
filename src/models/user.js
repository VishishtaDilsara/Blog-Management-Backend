import pool from "../config/db.js";

export const createUser = async ({ name, email, passwordHash, role }) => {
  const [result] = await pool.query(
    `
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
    `,
    [name, email, passwordHash, role],
  );

  return result.insertId;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT id, name, email, password_hash, role
    FROM users
    WHERE email = ?
    `,
    [email],
  );

  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `
    SELECT id, name, email, role, created_at
    FROM users
    ORDER BY created_at DESC
    `,
  );

  return rows;
};
