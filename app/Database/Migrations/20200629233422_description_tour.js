export function up(knex) {
    return knex.schema.createTable('Description_Tours', t=> {
        t.increments('ID');
        t.integer('Day')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.string('Place')
        t.string('Description')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Description_Tours')
}
