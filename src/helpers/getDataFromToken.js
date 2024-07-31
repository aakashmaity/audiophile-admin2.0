import jwt from "jsonwebtoken";

export async function getDataFromToken(req){
    try {
        const token = req.cookies.get('token')?.value || "" ;
        // console.log(token)
        const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
        return decodeToken?.id;   // 'id' contains admin._id
    } catch (error) {
        throw new Error(error.message);
    }
}