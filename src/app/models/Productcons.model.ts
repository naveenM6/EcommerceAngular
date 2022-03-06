export class Productcons{
    id!:number;
    title!:string;
    price!:string;
    description!:string;
    category!:string;
    image!:string;
    rate!:number;
    count!:number;
    constructor(id:number,title:string,price:string,description:string,category:string,image:string,rate:number,count:number){
        this.id = id
        this.title = title
        this.price = price
        this.description = description
        this.category = category
        this.image  = image
        this.rate = rate
        this.count = count
    }
}