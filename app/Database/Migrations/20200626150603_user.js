export function up(knex) {
    return knex.schema.createTable('Users', t => {
        t.increments('ID')
        t.string('FullName')
        t.string('Username')
        t.string('Email')
        t.string('Password').nullable()
        t.string('Address').nullable()
        t.string('Avatar').nullable()
        t.string('PhoneNumber').nullable()
        t.date('BirthDay').nullable()
        t.string('Slug')
        t.string('linkFacebook').nullable()
        t.boolean('isDeleted').defaultTo(0)
        t.integer('Role_Id').unsigned()
        t.foreign('Role_Id').references('Roles.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.timestamps();
    })
}

export function down(knex) {
    return knex.schema.dropTable('Users')
}
