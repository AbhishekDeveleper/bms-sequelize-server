var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crudRepository from "../repository/crudRepository.js";
class CRUDService {
    constructor(crudService) {
        this.crudService = crudService;
    }
    getData(modal) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.crudService.getData(modal);
            return data;
        });
    }
    addData(modal, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.crudService.addData(modal, data);
        });
    }
    deleteWithId(modal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedData = yield this.crudService.deleteWithId(modal, id);
            return deletedData;
        });
    }
    updateWithId(modal, id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.crudService.updateWithId(modal, id, data, userId);
        });
    }
}
const crudService = new CRUDService(crudRepository);
export default crudService;
