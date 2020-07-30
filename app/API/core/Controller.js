export default class BaseConTroller {
    constructor() {
        this.service = this.getModule();
    }
    getListLazyLoad(lastId, limit) {
        return this.service.getListLazyLoad(lastId, limit);
    }
    getList(page, limit) {
        return this.service.getList(page, limit)
    }
    create(param) {
        return this.service.create(param);
    }
    getInforById(id) {
        return this.service.getInforById(id);
    }
    getInformation(condition) {
        return this.service.getInformation(condition)
    }
    updateById(data, id) {
        return this.service.updateById(data, id);
    }
    deleteById(id){
        return this.service.deleteById(id);
    }
    deleteSlug(Slug) {
        return this.service.deleteBySlug(Slug)
    }
    search(data,page, limit,table) {
        return this.service.search(data,page, limit, table)
    }
    deleteSoft(condition) {
        return this.service.deleteSoft(condition)
    }
}