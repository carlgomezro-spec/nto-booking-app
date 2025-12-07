const pool = require('../config/db');
const queries = require('../models/queries').booking;

module.exports = {
  getAll: async () => {
    const { rows } = await pool.query(queries.getAll);
    return rows;
  },

  getById: async (id_booking) => {
    const { rows } = await pool.query(queries.getById, [id_booking]);
    return rows[0];
  },

  create: async ({ id_user, id_tattoo, date_booking, hour_booking }) => {
    const { rows } = await pool.query(queries.create, [id_user, id_tattoo, date_booking, hour_booking]);
    return rows[0];
  },

  update: async (id_booking, { id_user, id_tattoo, date_booking, hour_booking }) => {
    const { rows } = await pool.query(queries.update, [id_user, id_tattoo, date_booking, hour_booking, id_booking]);
    return rows[0];
  },
  
  updateDateTime: async (id_booking, { date_booking, hour_booking }) => {
  const { rows } = await pool.query(
    queries.updateDateTime,
    [date_booking, hour_booking, id_booking]
  );
  return rows[0];
},

  delete: async (id_booking) => {
    const { rows } = await pool.query(queries.delete, [id_booking]);
    return rows[0];
  }
};
