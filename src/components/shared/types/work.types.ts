interface ITag{
    _id: string
    name: string
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
    slug: string
    contractorId: string
 }