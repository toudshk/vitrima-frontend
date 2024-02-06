export interface ITableItem {
    _id: string
    editUrl: string
    title: string
    price: number
    
     
}

export interface IAdminTableItem {
  tableItem: ITableItem
  removeHandler: (id: string) => void 
}