
export function up(knex) {
    return knex.schema.createTable('Followings', t => {
        t.increments('ID')
        t.integer('User_Id').unsigned()
        t.foreign('User_Id').references('Users.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Article_Id').unsigned()
        t.foreign('Article_Id').references('Articles.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Followings')
}
