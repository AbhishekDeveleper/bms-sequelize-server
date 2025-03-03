import { CRUD_INTERFACE } from "../types_interface/crudInterface.js";
import crudRepository from "../repository/crudRepository.js";
import Category from "../model/categoryModel.js";
import User from "../model/userModel.js";
import Book from "../model/bookModel.js";

class CRUDService {
  constructor(private crudService: CRUD_INTERFACE) {}

  async getData(modal: string): Promise<Book[] | Category[] | User[]> {
    const data = await this.crudService.getData(modal);
    return data;
  }
  async addData(modal: string, data: any) {
    await this.crudService.addData(modal, data);
  }

  async deleteWithId(modal: string, id: number): Promise<number> {
    const deletedData = await this.crudService.deleteWithId(modal, id);
    return deletedData;
  }

  async updateWithId(modal: string, id: number, data: any, userId: number) {
    await this.crudService.updateWithId(modal, id, data, userId);
  }
}

const crudService = new CRUDService(crudRepository);
export default crudService;
