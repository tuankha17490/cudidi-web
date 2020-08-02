
export function up(knex) {
  return knex.schema.createTable('Articles', t => {
    t.increments('ID')
    t.integer('User_Id').unsigned()
    t.foreign('User_Id').references('Users.ID').onDelete('CASCADE').onUpdate('CASCADE')
    t.string('Location')
    t.string('Image')
    t.string('Title')
    t.string('Slug')
    t.integer('Duration')
    t.float('Price')
    t.string('Introduce')
    t.integer('NumberOfPeople')
    t.float('AvgRate').defaultTo(0)
    t.integer('RateAmount').defaultTo(0)
    t.boolean('isDeleted').defaultTo(0)
    t.timestamps()
  })
}

export function down(knex) {
  return knex.schema.dropTable('Articles')
}
