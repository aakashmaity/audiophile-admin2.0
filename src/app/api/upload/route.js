import multiparty from 'multiparty'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs'
import mime from 'mime-types'
import { mongooseConnect } from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export const maxDuration = 5


export async function POST(req) {
    try {
        await mongooseConnect();

        console.log("mongo connected");
        const form = new multiparty.Form();
        const {fields,files} = await new Promise ((resolve,reject) => {
            form.parse(req,(err, fields, files) => {
                if(err){
                    throw err;
                } else {
                    resolve({fields,files})
                }    
            });
        });
        // console.log(form);
        console.log("file upload");

        // create connection with S3
        const client = new S3Client({
            region:'ap-southeast-2',
            credentials:{
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
            },
        });

        console.log("created s3 bucket")
        // Add all images to S3 bucket named(audiophile-ecommerce)
        const links=[];
        for( const file of files.file)
        {
            const extension = file?.originalFilename?.split('.')?.pop()
            // console.log("Uploaded File details: ",{extension,file})

            const newFilename = Date.now() +'.'+extension        //to generate random file name
            // console.log(newFilename)
            client.send(new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL:'public-read',
                ContentType: mime.lookup(file.path)
            }));
            const link = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${newFilename}`
            links.push(link)
            console.log(`published image : ${link}`);
        }
        return NextResponse.json({links, success: true, message : "Uploaded file successfully"});
    } catch (error) {
        // console.error(error);
        return NextResponse.json({req ,success: false, message : "Error uploading file"},{status: 500});
    }
    
}   

// export const config = {
//     api: {bodyParser:false}
// }