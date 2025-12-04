const pool = require('../config/db');
const queries = require('../models/queries').user;
const bcrypt = require('bcrypt');

module.exports = {
  // CRUD existente
  getAll: async () => {
    const { rows } = await pool.query(queries.getAll);
    return rows;
  },

  getById: async (id_user) => {
    const { rows } = await pool.query(queries.getById, [id_user]);
    return rows[0];
  },

  create: async ({ name, email, password, role, is_logged }) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña
    const { rows } = await pool.query(queries.create, [name, email, hashedPassword, role, is_logged]);
    return rows[0];
  },

  update: async (id_user, { name, email, password, role, is_logged }) => {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const user = await pool.query(queries.getById, [id_user]);
    if (!user.rows[0]) return null;

    const updated = await pool.query(
      queries.update,
      [
        name ?? user.rows[0].name,
        email ?? user.rows[0].email,
        hashedPassword ?? user.rows[0].password,
        role ?? user.rows[0].role,
        is_logged ?? user.rows[0].is_logged,
        id_user
      ]
    );
    return updated.rows[0];
  },

  delete: async (id_user) => {
    const { rows } = await pool.query(queries.delete, [id_user]);
    return rows[0];
  },

  // Buscar usuario por email (para login)
  getByEmail: async (email) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
  }
};
