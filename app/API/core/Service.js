import response from "../../Util/Response"
export default class BaseServices {
    constructor() {
        this.respository = this.getModule();
    }
    async getListLazyLoad(lastId, limitvalue,table = '', column = ['*']) {
        try {
            const data = await this.respository.graphFetched(0, limitvalue, table, column).where('ID', '>', lastId).where({isDeleted: 0})
            return {
                status: 200,
                message: 'Success to load data !!!',
                lastId: data[data.length - 1].ID,
                data
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getList(page, limit,table = '', column = ['*']) {
        try {
            const count = await this.respository.count().where({isDeleted: 0});
            const offset = (page -1) * limit
            if(offset > count) {
                throw 'Offset can not be greater than the number of data'
            }
            const data = await this.respository.graphFetched(offset, limit, table,column).where({isDeleted: 0})
            return response(200, 'Success !!!', data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async search(query,page,limit,table, searchBy = [], column = ['*']) {
        try {
            for(let i = 0; i < searchBy.length; i ++) {
                const count = await this.respository.count().where(searchBy[i], 'like', `%${query}%`)
                const offset = (page - 1) * limit
                const data = await this.respository.graphFetched(offset, limit,table ,column).where(searchBy[i], 'like', `%${query}%`).where({isDeleted: 0})
                if(data.length != 0) {
                    return {
                        status: 200,
                        message: 'Success !!!',
                        totalRow: count[0].CNT,
                        data
                    }
                }
            }
            return {
                status: 200,
                message: 'Success !!!',
                totalRow: 0,
                data: []
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async create(param) {
        try {
            const dataFetch = await this.respository.create(param);
            return response(201, 'Create Success !!!',dataFetch)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getInforById(id) {
        try {
            const data = await this.respository.findAt(id);
            return response(200, 'Success !!!',data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getInformation(condition, table = '') {
        try {
            const data = await this.respository.getBy(condition).withGraphFetched(table);
            return response(200, 'Success !!!',data)
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async updateById(data, id) {
        try {
            const result = await this.respository.updateById(data, id)
            return response(201, 'Success !!!',result)
        } catch (error) {
            return response(400, error.toString())
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
            return response(400, error.toString())
        }
    }
    async deleteBySlug(Slug) {
        try {
            const result = await this.respository.delete({Slug})
            return {
                status: 200,
                message: 'Delete success!!!',
                isDeleted: result
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async deleteSoft(condition) {
        try {
            const result = await this.respository.deleteSoft(condition)
            return {
                status: 200,
                message: 'Delete success!!!',
                isDeleted: result
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
}