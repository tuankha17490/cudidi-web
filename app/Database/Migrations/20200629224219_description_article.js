
export function up(knex) {
    return knex.schema.createTable('Description_Articles', t => {
      t.increments('ID')
      t.integer('Article_Id').unsigned()
      t.foreign('Article_Id').references('Articles.ID')
      t.integer('Day')
      t.string('Place')
      t.string('Description')
      t.timestamp('Updated_At').defaultTo(knex.fn.now());
      t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
  }
  
export function down(knex) {
    return knex.schema.dropTable('Description_Articles')
}
