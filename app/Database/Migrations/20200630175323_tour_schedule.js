export function up(knex) {
    return knex.schema.createTable('Tour_Schedule', t=> {
        t.increments('ID');
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Schedule_Id').unsigned()
        t.foreign('Schedule_Id').references('Schedules.ID').onDelete('CASCADE').onUpdate('CASCADE')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Tour_Schedule')
}
