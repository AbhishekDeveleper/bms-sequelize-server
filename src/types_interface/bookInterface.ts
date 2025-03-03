export interface BookInterface {
  id?: number;
  bookTitle: string;
  bookAuthorId: number;
  bookIsbn: string;
  categoryId: number;
  publishDate: string;
  bookPrice: number;
}

export interface BookUpdateBody{
  bookTitle?: string;
  bookIsbn?: string;
  bookCategory?: string;
  publishDate?: string;
  bookPrice?: number;
}



export interface LendAndSubmitBook{
  lendBook(bookId: number, userId: number, issuedDate:string,submitDate:string): Promise<void>;
  myBook(userId:number): Promise<any>;
  submitBook(bookId: number, userId: number,submitDate: string): Promise<void>;
  myIssuedBook(userId: number): Promise<any>;
}



export interface BookInstance{
  bookTitle: string;
  bookIsbn: number;
  publishDate: string;
  bookPrice: number;
  bookAvailable: number;
  bookUsers: number[]|null;
  bookAuthorId: number;
  generId: number;
}
