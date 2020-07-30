
export function up(knex) {
    return knex.schema.createTable('Rate_Articles', t => {
        t.increments('ID')
        t.integer('User_Id').unsigned()
        t.foreign('User_Id').references('Users.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Article_Id').unsigned()
        t.foreign('Article_Id').references('Articles.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.float('Rate')
        t.boolean('isDeleted').defaultTo(0)
    })
}

export function down(knex) {
    return knex.schema.dropTable('Rate_Articles')
}
    