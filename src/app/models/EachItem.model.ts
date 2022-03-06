export class EachItem{
    id!:number
    userId!:number
    pid!:number
    title!:string
    price!:number
    image!:string
    numberOfItems!:number
    constructor(id:number= 0, userId:number=0, pid:number=0, title:string='',price:number=0,image:string='',numberOfItems:number=0){
        this.id = id
        this.userId = userId
        this.pid = pid
        this.title = title
        this.price = price
        this.image = image
        this.numberOfItems = numberOfItems
    }
}