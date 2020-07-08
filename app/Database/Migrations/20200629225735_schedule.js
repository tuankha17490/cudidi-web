export function up(knex) {
    return knex.schema.createTable('Schedules', t=> {
        t.increments('ID');
        t.date('DayBegin')
        t.date('DayEnd')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Schedules')
}
