import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;                                             //bucket is basically the storage in Appwrite, to store the images.

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); 
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,                                 //I'll be using this slug as a document id, you can use something like ID.unique() as well to generate unique IDs
                {                                     //these will be the data, we will be using to create the post!
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            
        }
    }
    
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {                                                      //post will be updated as per the new data put by you!
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error : Error Updating Post ",error);
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true               //means the post is deleted
        } catch (error) {
            console.log("Appwrite Service Error : Error Deleting Post ",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service Error : Error Getting Post ",error);
            return false
        }
    }


    //we need to show only those posts, whose status is active!
    //remember, we can only write this query only when we have made indexes, and we have made that to the status right!
    async getAllPost(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                //we can have many more args here like pagination, offset etc... will implement in the future!
            )
        } catch (error) {
            console.log("Appwrite Service Error : Error Getting All Post ",error);
            return false
        }
    }

    //File Upload Service
    //here it is accepting file, remember that from frontend we don't need to just pass the file-name, rather we need to pass a file blob.
    async uploadFile(file){
        try {
            return await this.bucket.createFile(              //from here, id of the file will get returned
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service Error : Error Uploading ",error);
            return false
        }
    }

    async deletFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service Error : Error Deleting File ",error);
            return false
        }
    }

    //why I didn't I made this service async, because it doesn't return a promise.
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service=new Service()

export default service;