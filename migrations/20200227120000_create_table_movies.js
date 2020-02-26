exports.up = async (knex) => {
  await knex.schema.createTable('movies', (table) => {
    table.increments();
    table.json('movie').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('movies');
};
