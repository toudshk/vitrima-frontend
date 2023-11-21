export interface ITag{
    _id: string
    title: string
    works: IWork[]
}


interface ICategory {
    _id: string 
    name: string
}

export interface IWork{
    _id: string
    price: number 
    category: ICategory
    title: string
    description: string
    tags: ITag[]
    images: string[]
    contractorId: any
    slug: string
   
    createdAt: string
 }