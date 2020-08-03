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
            console.log(result);
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
    async getListLazyLoad(lastId, limitvalue,table = 'childs', column = ['*']) {
        try {
            const data = await this.respository.graphFetched(0, limitvalue, table, column).where('ID', '>', lastId).where({isDeleted: 0})
            .modifyGraph('childs', builder => {
                builder.select('*').where({isDeleted: 0}).limit(5)
            })
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
    async getListReply(replyId, lastId) {
        try {
            const data = await this.respository.graphFetched.listBy(['*'], {Reply_Id: replyId}).where('ID', '>', lastId).where({isDeleted: 0}).limit(5)
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
}