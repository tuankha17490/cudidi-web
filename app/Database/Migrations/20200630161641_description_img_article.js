
export function up(knex) {
    return knex.schema.createTable('Description_Img_Article', t=> {
        t.increments('ID');
        t.integer('Description_Id').unsigned()
        t.foreign('Description_Id').references('Description_Articles.ID').onDelete('CASCADE').onUpdate('CASCADE')
        t.integer('Image_Id').unsigned()
        t.foreign('Image_Id').references('Image_Articles.ID').onDelete('CASCADE').onUpdate('CASCADE')
    })
}

export function down(knex) {
    return knex.schema.dropTable('Description_Img_Article')
}
