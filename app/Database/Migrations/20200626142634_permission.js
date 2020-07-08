export function up(knex) {
    return knex.schema.createTable('Permissions', t => {
        t.increments('ID')
        t.integer('Method_Id').unsigned()
        t.foreign('Method_Id').references('Methods.ID')
        t.integer('Module_Id').unsigned()
        t.foreign('Module_Id').references('Modules.ID')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Permissions')
}
