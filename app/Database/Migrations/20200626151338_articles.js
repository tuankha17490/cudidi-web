
export function up(knex) {
  return knex.schema.createTable('Articles', t => {
    t.increments('ID')
    t.integer('User_Id').unsigned()
    t.foreign('User_Id').references('Users.ID').onDelete('CASCADE').onUpdate('CASCADE')
    t.string('Location')
    t.string('Title')
    t.string('Slug')
    t.string('Duration')
    t.float('Price')
    t.integer('NumberOfPeople')
    t.float('AvgRate')
    t.integer('NumberOfVote')
    t.timestamps()
  })
}

export function down(knex) {
  return knex.schema.dropTable('Articles')
}
