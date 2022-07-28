const jwt = require("jsonwebtoken");
const jwtSecret = "vdfvdsf73t7t47t574re";

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.json({ err: 1, msg: "Token required" });
    } else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ err: 1, msg: "Token is invalid" });
            } else {
                next();
            }
        });
    }
}

module.exports = { verifyToken };
