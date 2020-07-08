
export function up(knex) {
    return knex.schema.createTable('Image_Tours', t=> {
        t.increments('ID');
        t.string('URL')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Image_Tours')
}
