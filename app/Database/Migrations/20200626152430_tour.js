
export function up(knex) {
    return knex.schema.createTable('Tours', t=> {
        t.increments('ID');
        t.string('Name')
        t.string('Slug')
        t.float('AdultPrice')
        t.float('ChildrenPrice')
        t.string('Duration')
        t.integer('NumberOfPeople')
        t.timestamps()
    })
}

export function down(knex) {
    return knex.schema.dropTable('Tours')
}
