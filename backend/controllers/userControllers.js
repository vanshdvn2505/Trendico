import User from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import {response_400, response_200} from '../utils/responseCode.utils.js'
import {v4 as uuidv4} from 'uuid'
const dict = [];

function send(res, email){
    const OTP = Math.floor(Math.random()*90000) + 10000
    dict.push({
        email: email,
        otp: OTP,
    })
    const text = `The OTP for User verification is ${OTP}`;
    const subjectOfEmail = "Email Verification For Trendonic";
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth:{
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASS,
        },
    })
    const reciever = {
        from: process.env.SENDER_EMAIL,
        to: [email],
        subject: subjectOfEmail,
        text: text,
    }
    auth.sendMail(reciever, (error, emailResponse) => {
        if(error){
            throw error;
        }
        console.log("Email Sent");
        res.end();
    })
}

export const sendEmail = (req, res) => {
    try {
        const {auth} = req.body;
        send(res, auth.email);
        return response_200(res, "Email Sent Successfully");
    }
    catch(error){
        return response_400(res, error);    
    }
}

export const verifyCode = (req, res) => {
    try {
        const {otp, auth} = req.body;
        const userRecord = dict.find(record => record.email == auth.email && record.otp == otp)
        if(userRecord){
            const idx = dict.indexOf(userRecord);
            if(idx > -1){
                dict.splice(idx, 1);
            }
            return response_200(res, "Registered Successfully")
        }
        else{
            return response_400(res, "Invalid OTP");
        }
    }
    catch(error){
        return response_400(res, error);    
    }
}

export const saveChanges = async (req, res) => {
    try {
        const {username, email, phone, currPass, newPass, auth} = req.body;
        let isPassTrue = false;
        
        if(!username || !email){
            console.error("Email and Username are mandatory");
            return response_400(res, "Email And UserName Are Mandatory")
        }
        if(currPass != "" && (newPass == "" || newPass.length < 8)){
            console.log("Minium Length Of password Should be 8");
            return response_400(res, "Minium Length Of password Should be 8")
        }

        const user = await User.findOne({email: email});
        if(!user){
            console.error("User not found");
            return response_400(res, "User Not Found!!");
        }
        user.username = username;
        user.email = email;
        user.phone = phone;

        const pass = await bcrypt.compare(currPass, user.password);
        let newHashedPass;
        if(pass){
            newHashedPass = await bcrypt.hash(newPass, 10);
            isPassTrue = true;
            user.password = newHashedPass;
        }
        await user.save();
        return response_200(res, "Changes Saved Successfully", {
            id: user._id,
            username: username,
            email: email,
            phone: phone,
            token: auth.token,
            password: newHashedPass
        })
    }
    catch(error){
        console.log(error);
        return response_400(res, error.message);    
    }
}

export const fetchAddress = async (req, res) => {
    try {
        const {id} = req.body;
        const user = await User.findOne({email: id});
        if(!user){
            return response_400(res, "User Not Found");
        }
        const result = user.address;
        return response_200(res, "Found Successfully", {result})
    }
    catch(error){
        console.log("Error At Fetch Address " + error);
        return response_400(res, error);  
    }
}

export const addAddress = async (req, res) => {
    try {
        const {id, details} = req.body;
        if(details.name == "" || details.phone == "" || details.flat == "" || details.area == "" || details.city == "" || details.state == ""){
            return response_400(res, "Enter All Fields")
        }
        const user = await User.findOne({email: id});
        if(!user){
            return response_400(res, "User Not Found");
        }
        user.address.push(details);
        await user.save();
        return response_200(res, "Saved Successfully")
    }
    catch(error){
        console.log("Error At Add Address " + error);
        return response_400(res, error);    
    }
}

export const removeAddress = async (req, res) => {
    try {
        const {idx, id} = req.body;
        const user = await User.findOne({email: id});
        if(!user){
            return response_400(res, "User Not Found");
        }
        user.address.splice(idx, 1);
        await user.save();
        return response_200(res, "Removed Successfully")
    }
    catch(error){
        console.log("Error At Remove Address " + error);
        return response_400(res, error);   
    }
}