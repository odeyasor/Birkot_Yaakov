import jwt from "jsonwebtoken";

export const generateToken= async (user)=>{
    let jwtSecretKey = "yaacov_ben_naftaly_zl";
    let data = {
        time: Date(),
        email: user.email,
    }
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}