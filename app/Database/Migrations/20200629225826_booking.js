
export function up(knex) {
    return knex.schema.createTable('Bookings', t=> {
        t.increments('ID');
        t.string('NameOFPeople')
        t.string('Email')
        t.string('PhoneNumber')
        t.integer('Tour_Id').unsigned()
        t.foreign('Tour_Id').references('Tours.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.bool('IsChecked')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Bookings')
}
