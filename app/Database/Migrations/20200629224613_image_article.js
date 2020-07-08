
export function up(knex) {
    return knex.schema.createTable('Image_Articles', t=> {
        t.increments('ID');
        t.string('URL');
        t.string('Location');
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Image_Articles')
}
