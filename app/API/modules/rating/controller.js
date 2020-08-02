import BaseController from '../../core/Controller'
import RateService from "./service"
export default class RateController extends BaseController {
    constructor() {
        super();
    }
    getModule() {
        return RateService.Instance();  
    }
  
}