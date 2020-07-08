
export function up(knex) {
    return knex.schema.createTable('Tours', t=> {
        t.increments('ID');
        t.string('NameTour')
        t.float('AdultPrice')
        t.float('ChildrenPrice')
        t.string('Duration')
        t.integer('NumberOfPeople')
        t.timestamp('Updated_At').defaultTo(knex.fn.now());
        t.timestamp('Created_At').defaultTo(knex.fn.now());
    })
}

export function down(knex) {
    return knex.schema.dropTable('Tours')
}
