import { body } from "express-validator";

export const checkUsername = body("username")
    .trim()
    .notEmpty()
    .matches(/^[A-Za-zØøÅåÆæ\s]+$/);

export const checkMyData = [
    body("username").custom((value) => {
        const loginName = process.env.MYLOGIN;
        if (value.toLowerCase() !== loginName.toLowerCase()) {
            throw new Error("Invalid username");
        }
        return true;
    }),
    body("password").custom((value) => {
        const password = process.env.MYPASSWORD;
        if (value !== password) {
            throw new Error("Invalid password");
        }
        return true;
    }),
];
