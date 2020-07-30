
export function up(knex) {
    return knex.schema.createTable('Comments', t=> {
        t.increments('ID');
        t.integer('User_Id').unsigned()
        t.foreign('User_Id').references('Users.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Article_Id').unsigned()
        t.foreign('Article_Id').references('Articles.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.string('Description')
        t.integer('Reply_Id').unsigned()
        t.foreign('Reply_Id').references('Comments.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.boolean('isDeleted').defaultTo(0)
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Comments')
}
