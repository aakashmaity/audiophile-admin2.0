import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models/Admin';
import bcryptjs from 'bcryptjs';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';


const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OATH_REDIRECT_URL, OATH_REFRESH_TOKEN} = process.env 

// set up OAuth 2.0 client
const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OATH_REDIRECT_URL);

// set the refresh token
oAuth2Client.setCredentials({ refresh_token: OATH_REFRESH_TOKEN });

export async function sendEmail(email, emailType, adminId){
    try {
        await mongooseConnect();
        // create a hashed token 
        const hashedToken = await bcryptjs.hash(adminId.toString(), 10);
        
        
        // update the admin's verifyToken or forgotPasswordToken based on the emailType
        if(emailType === "VERIFY"){
            await Admin.findByIdAndUpdate(adminId, {
                verifyToken : hashedToken,
                verifyExpires: Date.now() + 3600000, // 1 hour
            })
        } else if(emailType === "RESET"){
            await Admin.findByIdAndUpdate(adminId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordExpires: Date.now() + 1800000, // 30 minutes,
            })
        }

        // send the email using the OAuth 2.0 token and refresh token
        const accessToken = await oAuth2Client.getAccessToken();

        var transport = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type: "OAuth2",
                user: "akash.testdevelopment@gmail.com",
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: OATH_REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });

        const mailOptions = {
            from : "Audiophile 🎧 <akash.testdevelopment@gmail.com>",
            to : email,
            subject : emailType === "VERIFY" ? "Verify your mail" : "Reset your password",
            html : `Hello, <br><br>Please ${emailType === "VERIFY"? "verify" : "reset"} your password by clicking on the following link 
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}&type=${emailType.toLowerCase()}">${emailType.toLowerCase()}</a><br><br>
            If you did not request this, please ignore this email.<br>
            <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            <br><br>
            Thanks,<br>
            Akash Maity`
        }
        
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.error("Sendemail error : ",error);
        throw new Error(error.message);
    }
}