export default class BaseRespository {
    constructor() {
        this.tableName = this.getTable();
    }
    tableQuery() {
        return this.tableName.query();
    }
    listBy(column = ['*'], condition = {}) {
        return this.tableQuery().select(column).where(condition);
    }
    listOffSet(offsetValue,limitValue,column = ['*']) {
        return this.listBy(column).limit(limitValue).offset(offsetValue)
    }
    findAt(id, column = ['*']) {
        return this.tableQuery().select(column).findById(id);
    }
    count() {
        return this.tableQuery().count('id as CNT');
    }
    countBy(condition = {}) {
        return this.tableQuery().where(condition).count('id as CNT');
    }
    getBy(condition, column = ['*']) {
        return this.tableQuery().select(column).findOne(condition);
    }
    create(data) {
        return this.tableQuery().insert(data);
    }
    delete(condition) {
        return this.tableQuery().delete().where(condition);
    }
    deleteById(id) {
        return this.tableQuery().deleteById(id)
    }
    deleteSoft(condition) {
        return this.tableQuery().patch({isDeleted: 1}).where(condition)
    }
    update(data, condition = {}) {
        return this.tableQuery().patch(data).where(condition);
    }
    updateById(data, id) {
        return this.tableQuery().patch(data).findById(id);
    }
    updateAndFetchById(data, id) {
        return this.tableQuery().patchAndFetchById(id, data)
    }
    relatedQuery(table, id, condition = {}) {
        return this.tableName.relatedQuery(table).for(id).where(condition)
    }
    graphFetched(offsetValue,limitValue,table,column = ['*']) {
        return this.listOffSet(offsetValue,limitValue,column).withGraphFetched(table);
    }
    graphJoined(offsetValue,limitValue,table,column = ['*']) {
        return this.listOffSet(offsetValue,limitValue,column).withGraphJoined(table);
    }
    relatedDelete(table, id, condition = {}) {
        return this.relatedQuery(table, id, condition).delete()
    }
    graphInsert(data) {
        return this.tableQuery().insertGraph(data)
    }
}