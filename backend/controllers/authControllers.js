import User from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import zod from 'zod'
import {response_400, response_200} from '../utils/responseCode.utils.js'
const dictionary = [];

function validate(username, email, password, res){
    const emailSchema = zod.string().email();
    const passwordSchema = zod.string.min(8);

    if(!username || !email || !password){
        response_400(res, 'All fields required')
        return false;
    }
    else if(!emailSchema.safeParse(email).success){
        response_400(res, "Not a valid email address")
        return false;
    }
    else if(!passwordSchema.safeParse(password).success){
        response_400(res, "Password must be 8 characters long")
        return false;
    }
    return true;
}

async function generateToken(res, user){
    try {
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d",
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        });
        return token
    }
    catch(error){
        console.log(error);
        return "";    
    }
}

export const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(validate(username, email, password, res)){
            const emailExists = await User.findOne({email: email});
            if(emailExists){
                return response_400(res, "Email Already Exists");
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            })

            const savedUser = await newUser.save();
            const token = await generateToken(res, savedUser);

            function sendEmail(email){
                const OTP = Math.floor(Math.random()*90000) + 10000
                dictionary.push({
                    email: email,
                    password: hashedPassword,
                    otp: OTP,
                    token: token
                })
                const text = `The OTP for email verification is ${OTP}`;
                const subjectOfEmail = "Email Verification For Trendico";
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
                    console.log("Success");
                    res.end();
                })
            }
            sendEmail(email);
            

            return response_200(res, "Registered Successfully", {
                username: savedUser.username,
                email: savedUser.email,
                token: token,
                id: savedUser._id
            })
        }
    }
    catch(error){
        response_400(res, error);
    }
}

// exports.verifyOtp = async (req, res) => {
//     try {
        
//     }
//     catch(error){
        
//     }
// }