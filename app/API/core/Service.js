export default class BaseServices {
    constructor() {
        this.respository = this.getModule();
        console.log('services constructor ------>', this.respository)
    }
    async getList() {
        try {
            const data = await this.respository.list();
            return data;
        } catch (error) {
            return error
        }
    }
    async create(param) {
        try {
            const dataFetch = await this.respository.create(param);
            return dataFetch;
        } catch (error) {
           return error
        }
    }
    async getInforById(id) {
        try {
            const data = await this.respository.findAt(id);
            return data;
        } catch (error) {
            return error
        }
    }
    async getInformation(condition) {
        try {
            const data = await this.respository.getBy(condition);
            return data;
        } catch (error) {
            return error
        }
    }
    async updateById(data, id) {
        try {
            const result = await this.respository.updateById(data, id)
            return result
        } catch (error) {
            return error;
        }
    }
    async deleteById(id) {
        try {
            const result = await this.respository.deleteById(id);
            return result;
        } catch (error) {
            return error
        }
    }
}