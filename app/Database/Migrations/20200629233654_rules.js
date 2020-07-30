
export function up(knex) {
    return knex.schema.createTable('Rules', t=> {
        t.increments('ID');
        t.string('ContentRule')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.string('Note')
        t.float('PriceInclude')
        t.float('PriceNotInclude')
        t.boolean('isDeleted').defaultTo(0)
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Rules')
}
