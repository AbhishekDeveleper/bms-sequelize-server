export interface CategoryInterface{
    id?: number;
    categoryName: string;
}

export interface CategoryUpdateBody{
    categoryName?:string
}

export interface CategoryInstance{
    generType: string;
}