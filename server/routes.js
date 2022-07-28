const express = require("express");
const router = express.Router();
const Users = require("./models/user.model");
const { signIn } = require("./validation/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "usingGraphql267";

router.post("/login", (req, res) => {
    const result = signIn.validate(req.body);
    if (result.error === undefined) {
        Users.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    const match = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );
                    if (match) {
                        const token = jwt.sign({ _id: user._id }, jwtSecret, {
                            expiresIn: "10d",
                        });
                        res.send({
                            flag: 1,
                            message: "Login Successful!",
                            user: user,
                            token: token,
                        });
                    } else {
                        res.send({ flag: 0, message: "Password Incorrect!" });
                    }
                } else {
                    res.send({ err: 0, message: "User not registered!" });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.send(result.error.details[0].message);
    }
});

module.exports = router;
