export interface ITag{
    _id: string
    title: string
    works: IWork[]
}

export interface IWorkType
{
    _id: string
    slug: any
    title: string
}

export interface ISubType{
    _id: string 
    title: string 
    image: string
    description: string 
    workTypeId: string 
}


export interface IWork{
    _id: string
    price: number 
    workType: string
    subTypes: ISubType[] 
    title: string
    description: string
    tags: ITag[]
    images: string[]
    contractorId: any
    slug: string
   
    createdAt: string
 }

