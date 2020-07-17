export default class BaseServices {
    constructor() {
        this.respository = this.getModule();
    }
    async getListLazyLoad(lastId, limitvalue, table = '', column = ['*']) {
        try {
            const data = await this.respository.graphFetched(0, limitvalue, table, column).where('ID', '>', lastId)
            return {
                status: 200,
                message: 'Success to load data !!!',
                lastId: data[data.length - 1].ID,
                data
            }
        } catch (error) {
            console.log('Error to load list user');
            throw error.toString()
        }
    }
    async getList(page, limit, table = '', column = ['*']) {
        try {
            const count = await this.respository.count();
            const offset = (page - 1) * limit
            if (offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.graphFetched(offset, limit, table, column)
            return {
                status: 200,
                message: 'Success !!!',
                data
            }
        } catch (error) {
            console.log('Get list failed');
            throw error.toString()
        }
    }
    async create(param) {
        try {
            const dataFetch = await this.respository.create(param);
            return {
                status: 200,
                message: 'Create success',
                dataFetch
            };
        } catch (error) {
            console.log('Create failed');
            throw error.toString()
        }
    }
    async getInforById(id) {
        try {
            const data = await this.respository.findAt(id);
            return data;
        } catch (error) {
            console.log('Get information by id failed');
            throw error.toString()
        }
    }
    async getInformation(condition) {
        try {
            const data = await this.respository.getBy(condition);
            return data;
        } catch (error) {
            console.log( 'Get information by condition failed');
            throw error.toString()
        }
    }
    async updateById(data, id) {
        try {
            const result = await this.respository.updateById(data, id)
            return result
        } catch (error) {
            console.log('Update failed');
            throw error.toString()
        }
    }
    async deleteById(id) {
        try {
            const result = await this.respository.deleteById(id);
            return {
                status: 200,
                message: 'Delete success!!!',
                isDeleted: result
            }
        } catch (error) {
            console.log('Delete failed');
            throw error.toString()
        }
    }
    async deleteBySlug(Slug) {
        try {
            const result = await this.respository.delete({
                Slug
            })
            return {
                status: 200,
                message: 'Delete success!!!',
                isDeleted: result
            }
        } catch (error) {
            console.log('Delete failed');
            throw error.toString()
        }
    }
}