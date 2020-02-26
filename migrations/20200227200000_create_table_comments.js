exports.up = async (knex) => {
  await knex.schema.createTable('comments', (table) => {
    table.increments();
    table.integer('id_video').notNullable();
    table.text('comment').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('comments');
};
