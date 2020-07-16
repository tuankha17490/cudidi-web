export default class BaseServices {
    constructor() {
        this.respository = this.getModule();
    }
    async getListLazyLoad(lastId, limitvalue,table = '', column = ['*']) {
        try {
            const data = await this.respository.graphFetched(0, limitvalue, table, column).where('ID', '>', lastId)
            return {
                status: 200,
                message: 'Success to load data !!!',
                lastId: data[data.length - 1].ID,
                data
            }
        } catch (error) {
            return {
                status: 400,
                message: 'Error to load list user',
                error: error.toString()
            }
        }
    }
    async getList(page, limit,table = '', column = ['*']) {
        try {
            const count = await this.respository.count();
            const offset = (page -1) * limit
            if(offset > count) {
                return {
                    status: 400,
                    message: 'Offset can not be greater than the number of data'
                }
            }
            const data = await this.respository.graphFetched(offset, limit, table,column)
            return {
                status: 200,
                message: 'Success !!!',
                data
            }
        } catch (error) {
            return {
                status: 400,
                message: 'Get list failed',
                error: error.toString()
            }
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
            return {
                status: 400,
                message: 'Create failed',
                error: error.toString()
            }
        }
    }
    async getInforById(id) {
        try {
            const data = await this.respository.findAt(id);
            return data;
        } catch (error) {
            return {
                status: 400,
                message: 'Get information by id failed',
                error: error.toString()
            }
        }
    }
    async getInformation(condition) {
        try {
            const data = await this.respository.getBy(condition);
            return data;
        } catch (error) {
            return {
                status: 400,
                message: 'Get information by condition failed',
                error: error.toString()
            }
        }
    }
    async updateById(data, id) {
        try {
            const result = await this.respository.updateById(data, id)
            return result
        } catch (error) {
            return {
                status: 400,
                message: 'Update failed',
                error: error.toString()
            }
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
            return {
                status: 400,
                message: 'Delete failed',
                error: error.toString()
            }
        }
    }
    async deleteBySlug(Slug) {
        try {
            const result = await this.respository.delete({Slug})
            console.log('delete by slug', result);
            return {
                status: 200,
                message: 'Delete success!!!',
                isDeleted: result
            }
        } catch (error) {
            return {
                status: 400,
                message: 'Delete failed',
                error: error.toString()
            }
        }
    }
}