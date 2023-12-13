import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); 
        this.account=new Account(this.client)
    }
}

const authService=new AuthService()

export default authService

//see, we created the class for using this service and then exporting this class right!
//so, inorder to use this service, object must be created for it right!.... Cool!
//Or we can do one thing just create an object and export it from here only and the benefit would be that
//object will have methods attached as well!