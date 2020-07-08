
export function up(knex) {
    return knex.schema.createTable('Policies', t=> {
        t.increments('ID');
        t.string('Content')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Policies')
}
