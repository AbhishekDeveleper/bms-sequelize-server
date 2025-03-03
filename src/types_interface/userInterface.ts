export interface UserInterface{
    id: number;
    userName: string;
    userRole: 'admin' | 'author';
    password:string
}


export interface UserUpdateData{
    userName?: string;
}

export interface DeleteMyBook{
    deleteMyBook(userId: number,bookId:number): Promise<void>;
}

export interface UserInstance{
    userName: string;
  userRole: string;
  password: string;
}