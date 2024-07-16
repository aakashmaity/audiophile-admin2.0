import jwt from "jsonwebtoken";

export async function getDataFromToken(req){
    try {
        const token = req.cookies.get('token')?.value || "" ;
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodeToken);
        return decodeToken?.id;   // 'id' contains admin._id
    } catch (error) {
        throw new Error(error.message);
    }
}