import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';


// create connection with S3
const client = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
});

async function uploadFiletoS3(file,filename){
    const fileBuffer = file;
    
    const filetypes = ["png","jpg","jpeg"]
    const extension = filename?.split('.')?.pop()

    if(!filetypes.includes(extension)){
        throw new Error("Invalid file extension");
    }

    const newFilename = `${Date.now()}.${extension}` 
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: newFilename,
        Body: fileBuffer,
        ACL: "public-read",
        ContentType: `image/${extension}`
    }

    const command = new PutObjectCommand(params);
    await client.send(command);

    return newFilename

}

export async function POST(req) {
    try {
        await mongooseConnect();

        const formData = await req.formData();
        const file = formData.get('file');

        if(!file){
            return NextResponse.json({success: false, message: "file not found"},{status: 400});
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // upload file to the s3 bucket
        const filename = await uploadFiletoS3(buffer,file.name);
        const link = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`

        let links = [];
        links.push(link);

        return NextResponse.json({links, success: true, message:"upload successfully"},{status: 200});
    } catch (error) {
        // console.error(error);
        return NextResponse.json({req ,success: false, message : "File type must be in .jpg, .jpeg, .png format"},{status: 500});
    }
    
}   
