import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Userdb from "../models/usermodel";
import bcrypt from 'bcrypt';
import dbConnect from "../db/conn";
import { NextResponse } from "next/server";

export const authOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            async authorize(credentials,req){
                const {email,password}=credentials; 
                // console.log({email,password});
                await dbConnect();

                const user=await Userdb.findOne({email});
                
                const isMatched=await bcrypt.compare(password,user.password);

                if(user && isMatched){
                    // console.log({user});
                    
                    return user;
                }else{
                    return null;
                }


            }
        })
    ],
    session:{
        strategy:'jwt',
        maxAge:10*60,

    },
    jwt:{
        maxAge:10*60,
    },
    callbacks:{
        async session(session){
            // console.log({session});
            return session
        }

    }
    
}

export default NextAuth(authOptions);