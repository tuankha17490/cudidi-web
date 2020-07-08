
export function up(knex) {
    return knex.schema.createTable('Rate_Articles', t => {
        t.increments('ID')
        t.integer('User_Id').unsigned()
        t.foreign('User_Id').references('Users.ID')
        t.integer('Article_Id').unsigned()
        t.foreign('Article_Id').references('Articles.ID')
        t.float('Rate')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Rate_Articles')
}
    