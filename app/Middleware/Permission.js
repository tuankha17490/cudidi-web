import RoleRespository from "../API/modules/roles/respository"
var module
const Excute = async (req, res, method) => {
    const roleName = req.userData.Role;
    const roleFetched = await RoleRespository.Instance().tableQuery().where('Roles.Name',roleName)
    .withGraphJoined('permissions.[modules, methods]').where('permissions:modules.Name', module).where('permissions:methods.Name', method)
    if(roleFetched.length == 0) {
        return res.status(200).json({
            status: 403,
            message: 'You don not have permission to access'
        })
    }
    return true
}
export default class Permissions {
    constructor() {
    }
    setModuleUsers(req, res, next) {
        module = 'Users'
        next()
    }
    setModuleArticle(req, res, next) {
        module = 'Article'
        next()
    }
    setModuleDescription(req, res, next) {
        module = 'Description-Article'
        next()
    }
    async GetList(req, res, next) {
        const excute = await Excute(req, res, 'GetList')
        if (excute != true) return excute
        next()
    }

    async Create(req, res, next) {
        const excute = await Excute(req, res, 'Create')
        if (excute != true) return excute
        next()
    }

    async Read(req, res, next) {
        const excute = await Excute(req, res, 'Read')
        if (excute != true) return excute
        next()
    }

    async Delete(req, res, next) {
        const excute = await Excute(req, res, 'Delete')
        if (excute != true) return excute
        next()
    }
    async Update(req, res, next) {
        const excute = await Excute(req, res, 'Update')
        if (excute != true) return excute
        next()
    }
    async Search(req, res, next) {
        const excute = await Excute(req, res, 'Search')
        if (excute != true) return excute
        next()
    }
    async JoinClass(req, res, next) {
        const excute = await Excute(req, res, 'JoinClass')
        if (excute != true) return excute
        next()
    }
    async UpdateMyUser(req, res, next) {
        const excute = await Excute(req, res, 'UpdateMyUser')
        if (excute != true) return excute
        next()
    }
}