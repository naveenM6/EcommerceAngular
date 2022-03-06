export class CartProduct{
    uid!: number
    id!: number
    title!: string
    image!: string
    price!: number
    noOfItems!: number
    constructor(uid:number,id:number,title:string,image:string,price:number,noOfItems:number){
        this.uid = uid
        this.id = id
        this.title = title
        this.image = image
        this.price = price
        this.noOfItems = noOfItems
    }
}