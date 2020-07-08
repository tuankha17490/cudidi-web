export default class BaseRespository {
    constructor() {
        this.tableName = this.getTable();
    }
    tableQuery() {
        return this.tableName.query();
    }
    list(column = ['*']) {
        return this.tableQuery().select(column).limit(15);
    }
    findAt(id) {
        return this.tableQuery().findById(id);
    }
    count() {
        return this.tableQuery().count();
    }
    countBy(condition = {}) {
        return this.tableQuery().where(condition).count();
    }
    getBy(condition) {
        return this.tableQuery().findOne(condition);
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
    update(data, condition) {
        return this.tableQuery().patch(data).where(condition);
    }
    updateById(data, id) {
        return this.tableQuery().patch(data).findById(id);
    }
}