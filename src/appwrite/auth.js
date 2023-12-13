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

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)

            if(userAccount){
                //we will call method lets say if user created then make him logged in directly! right, depends on you how you want this functionality

                return this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password)
        }
        catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try {
            const currentUser=await this.account.get()
             if(currentUser){
                return currentUser
             }
             return null
        } catch (error) {
            throw error
        }

    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService=new AuthService()

export default authService

//see, we created the class for using this service and then exporting this class right!
//so, inorder to use this service, object must be created for it right!.... Cool!
//Or we can do one thing just create an object and export it from here only and the benefit would be that
//object will have methods attached as well!