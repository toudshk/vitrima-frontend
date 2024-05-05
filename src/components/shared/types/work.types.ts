export interface ITag{
    _id: string
    title: string
   
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
    label?:string
}
export interface IBuildingTechnique{
    _id: string
    title: string 
    description: string
    image: string
}


export interface IWork{
    _id: string
    price: number 
    workType: string
    purposeType: string
    subTypes: ISubType[] 
    title: string
    description: string
    tags: ITag[]
    images: string[]
    contractorId: any
    slug: string
    buildingTechnique: string
   
    createdAt: string
    isMainWork?: boolean
 }

