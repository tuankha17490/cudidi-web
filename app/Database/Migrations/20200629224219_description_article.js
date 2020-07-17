
export function up(knex) {
    return knex.schema.createTable('Description_Articles', t => {
      t.increments('ID')
      t.integer('Article_Id').unsigned()
      t.foreign('Article_Id').references('Articles.ID').onDelete('CASCADE').onUpdate('CASCADE')
      t.integer('Day')
      t.string('Place')
      t.string('Description')
      t.timestamps()
    })
  }
  
export function down(knex) {
    return knex.schema.dropTable('Description_Articles')
}
