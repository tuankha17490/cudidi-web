export function up(knex) {
    return knex.schema.createTable('Description_Tours', t=> {
        t.increments('ID');
        t.integer('Day')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.string('Place')
        t.string('Description')
        t.boolean('isDeleted').defaultTo(0)
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Description_Tours')
}
