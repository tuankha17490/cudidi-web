
export function up(knex) {
    return knex.schema.createTable('Policies', t=> {
        t.increments('ID');
        t.string('Content')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.boolean('isDeleted').defaultTo(0)
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Policies')
}
