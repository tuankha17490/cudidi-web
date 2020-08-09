import CommentRespository from "./respository"
import BaseServices from '../../core/Service';
import response from "../../../Util/Response";
export default class CommentService extends BaseServices {
    static _Instance;
    static Instance() {
        if(!this._Instance) {
            this._Instance = new this();
        }
        return this._Instance;
    }
    getModule() {
        return CommentRespository.Instance();
    }
    async create(req) {
        try {
            const data = req.body
            if(data.Article_Id == undefined) {
                throw 'Must be have id of article'
            }
            data.User_Id = req.userData.ID
            const result = await this.respository.create(data)
            return response(201,'Success !!!', result)
        } catch (error) {
            console.log('SERVICE_COMMENT_ARTICLE', error.toString());
            return response(400, error.toString())
        }
    }
    async createReply(req) {
        try {
            const data = req.body
            if(data.Article_Id == undefined) {
                throw 'Must be have id of article'
            }
            if(data.Reply_Id == undefined) {
                throw 'Must be have id of reply comment'
            }
            const check = await this.respository.getBy({ID: data.Reply_Id})
            if(!check) {
                return response(404, 'Not found')
            }
            if(check.isDeleted == 1) {
                return response(404, 'Comment was deleted')
            }
            data.User_Id = req.userData.ID
            const result = await this.respository.create(data)
            return response(201,'Success !!!', result)
        } catch (error) {
            console.log('SERVICE_COMMENT_ARTICLE', error.toString());
            return response(400, error.toString())
        }
    }

    async updateById(req, id) {
        try {
            const check = await this.respository.getBy({ID: id})
            if(!check) {
                return response(404, 'Not found')
            }
            if(check.isDeleted == 1) {
                return response(404, 'Comment was deleted')
            }
            if(check.User_Id != req.userData.ID) {
                return response(403, 'You can not edit comment of other people')
            }
            const data = req.body
            await this.respository.updateById(data, id)
            return response(201,'Success !!!')
        } catch (error) {
            console.log('SERVICE_COMMENT_ARTICLE', error.toString());
            return response(400, error.toString())
        }
    }
    async getListLazyLoad(lastId, limitvalue,Article_Id,table = 'users') {
        try {
            let data = 0
            if(lastId == 0) {
                data = await this.respository.tableQuery()
                .where('ID', '>', lastId).where({isDeleted: 0, Reply_Id: null, Article_Id}).orderBy('ID','desc').limit(limitvalue)
                .withGraphFetched(table)
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName','Username', 'Avatar').where({isDeleted: 0})
                })
            }
            else {
                data = await this.respository.tableQuery().where('ID', '<', lastId).where({isDeleted: 0, Reply_Id: null, Article_Id}).orderBy('ID','desc').limit(limitvalue)
                .withGraphFetched(table)
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName', 'Username', 'Avatar').where({isDeleted: 0})
                })
            }
            if(data.length != 0) lastId = data[data.length - 1].ID
            else lastId = undefined
            let temp = 0
            for (let index = 0; index < data.length; index++) {
                temp = await this.respository.listBy(['*'], {Reply_Id: data[index].ID}).withGraphFetched('users').limit(3)
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName','Username', 'Avatar').where({isDeleted: 0})
                })
                data[index].childs = temp
            }
            return {
                status: 200,
                message: 'Success to load data !!!',
                lastId,
                data
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
    async getListReply(replyId, lastId) {
        try {
            let data = 0
            if(lastId == 0) {
                data = await this.respository.listBy(['*'], {Reply_Id: replyId}).withGraphFetched('users')
                .where('ID', '>', lastId).where({isDeleted: 0}).orderBy('ID','desc').limit(5)
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName','Username', 'Avatar').where({isDeleted: 0})
                })
            }
            else {
                data = await this.respository.listBy(['*'], {Reply_Id: replyId}).withGraphFetched('users')
                .where('ID', '<', lastId).where({isDeleted: 0}).orderBy('ID','desc').limit(5)
                .modifyGraph('users', builder => {
                    builder.select('ID', 'FullName','Username', 'Avatar').where({isDeleted: 0})
                })
            }
            if(data.length != 0) lastId =data[data.length - 1].ID
            else lastId = undefined
            return {
                status: 200,
                message: 'Success to load data !!!',
                lastId,
                data
            }
        } catch (error) {
            return response(400, error.toString())
        }
    }
}