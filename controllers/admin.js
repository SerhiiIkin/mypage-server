import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export function login(req, res) {
    const secret = process.env.SECRET;
    const loginName = process.env.MYLOGIN;

    try {
        const result = validationResult(req);

        if (result.isEmpty()) {
            const token = {
                value: jwt.sign(loginName, secret),
                expiry: 0,
                message: "Success",
                role: "admin",
            };

            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: "incorrect data" });
        }
    } catch (error) {
        return res.status(500).json({ message: "fejl login" });
    }
}
