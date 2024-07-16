import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models/Admin';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

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

        // https://mailtrap.io
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_ID,
              pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from : "aakashmaity57@gmail.com",
            to : email,
            subject : emailType === "VERIFY" ? "Verify your mail" : "Reset your password",
            html : `Hello, <br><br>Please ${emailType === "VERIFY"? "verify" : "reset"} your password by clicking on the following link: <br><br>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${emailType}}</a><br><br>
            If you did not request this, please ignore this email.<br>
            <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            <br><br>
            Thanks,<br>
            Aakash Maity`
        }
        try {
            const mailResponse = await transport.sendMail(mailOptions);
            return mailResponse;
        } catch (error) {
            throw new Error(error.message);
        }
    
    } catch (error) {
        console.error("Sendemail error : ",error);
        throw new Error(error.message);
    }
}