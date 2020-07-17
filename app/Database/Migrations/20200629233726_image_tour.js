
export function up(knex) {
    return knex.schema.createTable('Image_Tours', t=> {
        t.increments('ID');
        t.string('URL')
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Image_Tours')
}
