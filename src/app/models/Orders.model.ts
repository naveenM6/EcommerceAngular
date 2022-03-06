export class Order{
    uid!:any
    name!:string
    phone!:string
    email!:string
    payment!:string
    address!:string
    orders!:any
    constructor(uid:any,name:string,phone:string,email:string,payment:string,address:string,orders:any){
        this.uid = uid
        this.name = name
        this.phone = phone
        this.email = email
        this.payment = payment
        this.address = address
        this.orders = orders
    }
}