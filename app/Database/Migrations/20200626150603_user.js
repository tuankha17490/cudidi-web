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
        t.string('GoogleID')
        t.string('FacebookID')
        t.timestamps();
        t.integer('Role_Id').unsigned()
        t.foreign('Role_Id').references('Roles.ID').onDelete('CASCADE').onUpdate('CASCADE')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Users')
}
