export function up(knex) {
    return knex.schema.createTable('Tour_Schedule', t=> {
        t.increments('ID');
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID');
        t.integer('Schedule_Id').unsigned()
        t.foreign('Schedule_Id').references('Schedules.ID');
    })
}

export function down(knex) {
    return knex.schema.dropTable('Tour_Schedule')
}
