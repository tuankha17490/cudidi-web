
export function up(knex) {
    return knex.schema.createTable('Bookings', t=> {
        t.increments('ID');
        t.string('NameOFPeople')
        t.string('Email')
        t.string('PhoneNumber')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.bool('IsChecked')
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Bookings')
}
