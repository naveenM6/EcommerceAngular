export class UserSignUp{
    userId!:string;
    Email!:string;
    password!:string;
    constructor(userId:string,email:string,password:string){
        this.userId = userId
        this.Email = email
        this.password = password
    }
}