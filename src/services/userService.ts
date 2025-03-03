import { DeleteMyBook } from "../types_interface/userInterface.js";
import { userRepository } from "../repository/userRepository.js";

class UserService {
    constructor(private repository: DeleteMyBook) { }
    async deleteMyBook(userId:number,bookId:number):Promise<void> {
       await  this.repository.deleteMyBook(userId,bookId);
    }
}

export const userService = new UserService(userRepository);