import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    console.log(2134566);
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = decodeToken(token);
        console.log('decoded!!!!!!!!!!!!');
        req.user = decoded;
        console.log(decoded, decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

function decodeToken(token) {
    console.log('decodeToken function');
    const secretKey = 'yaacov_ben_naftaly_zl';
    console.log('email', token);

    const decoded = jwt.verify(token, secretKey);
    const { email} = decoded;
    return { email};
}

export default verifyToken;

