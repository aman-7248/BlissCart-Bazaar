//have two functions 
//1. for hashing the password
//2. for comparing the entered password and hashed password

import bcrypt from 'bcrypt'

export const hashPassword=async (password)=>{
    try{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);  //syntax (password,no of salt rounds)
        return hashedPassword;
    }
    catch(error){
        console.log(error);
    }
}

export const comparePassword=async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}