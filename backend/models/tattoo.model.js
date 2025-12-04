const pool = require('../config/db');
const queries = require('../models/queries').tattoo;

module.exports = {
  getAll: async () => {
    const { rows } = await pool.query(queries.getAll);
    return rows;
  },

  getById: async (id_tattoo) => {
    const { rows } = await pool.query(queries.getById, [id_tattoo]);
    return rows[0];
  },

  create: async ({ name, description, image }) => {
    const { rows } = await pool.query(queries.create, [name, description, image]);
    return rows[0];
  },

  update: async (id_tattoo, { name, description, image }) => {
    const { rows } = await pool.query(queries.update, [name, description, image, id_tattoo]);
    return rows[0];
  },

  delete: async (id_tattoo) => {
    const { rows } = await pool.query(queries.delete, [id_tattoo]);
    return rows[0];
  }
};
