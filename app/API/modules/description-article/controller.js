import BaseController from '../../core/Controller'
import DescriptionArticleService from "./service"
export default class DescriptionArticleController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return DescriptionArticleService.Instance();  
    }
  
}