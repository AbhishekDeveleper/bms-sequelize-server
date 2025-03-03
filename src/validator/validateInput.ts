import { UserInterface } from "../types_interface/userInterface";
import { BookInterface } from "../types_interface/bookInterface";

// fro validating model value
export const validateModel = (
  model: UserInterface | BookInterface
): boolean => {
  
  //using type narrowing to check model and validating its value
  if ("userName" in model) {
    const { userName, userRole, password, ...other } = model;
    if (Object.keys(other).length != 0) return false;
    return model.userName && model.password && model.userRole 
      ? true
      : false;
  }

  if ("bookTitle" in model) {
    if (typeof (model.bookIsbn) != 'number') return false;
    if(typeof model.bookPrice != 'number') return false
    return model.bookTitle &&
      model.bookIsbn &&
      model.bookPrice &&model.publishDate
      ? true
      : false;
  }

  return false;
};
