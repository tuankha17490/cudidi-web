
export function up(knex) {
    return knex.schema.createTable('Image_Articles', t=> {
        t.increments('ID');
        t.string('URL');
        t.string('Location');
        t.boolean('isDeleted').defaultTo(0)
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Image_Articles')
}
