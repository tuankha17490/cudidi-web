
export function up(knex) {
    return knex.schema.createTable('Rules', t=> {
        t.increments('ID');
        t.string('ContentRule')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.string('Note')
        t.float('PriceInclude')
        t.float('PriceNotInclude')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Rules')
}
