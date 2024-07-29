import User from "../models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../utils/sendEmail.js";

export async function deleteUser(req, res) {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ message: "Not correct id", result });
        }
        await User.findOneAndDelete({ _id: req.params.id });

        return res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Cant delete user" });
    }
}

export async function createUser(req, res) {
    const secret = process.env.SECRET;
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct username", result });
        }
        const { username } = req.body;
        const roomId = uuidv4();
        const token = {
            value: jwt.sign(roomId, secret),
            expiry: new Date().getTime() + 24 * 60 * 60 * 1000,
            message: "Success",
            role: "user",
        };
        const newUser = new User({ username, roomId, token, role: "user" });
        await newUser.save();

        const subject = "New user joined to chat";
        const message = `Joined ${newUser.username}`;

        await sendEmail(subject, message);
        return res.status(200).json({ message: "New user created", newUser });
    } catch (error) {
        res.status(500).send({
            message: "Server Error, cant create user",
            error,
        });
    }
}

export async function updateTokenExpiryUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct request", errors });
        }
        const { expiry } = req.body;

        const currentUser = await User.findById({ _id: req.params.id });
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                token: {
                    ...currentUser.token,
                    expiry: expiry,
                    message: `Updated ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()} `,
                },
            },
            { returnOriginal: false }
        );
        return res
            .status(200)
            .json({ message: "Users token was updated!", updatedUser });
    } catch (error) {
        res.status(500).send({
            message: "Server Error, cant update users token",
            error,
        });
    }
}

export async function updateMessagesUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct request", errors });
        }
        const message = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    messages: message,
                },
            },
            { returnOriginal: false }
        );

        return res
            .status(200)
            .json({ message: "User messages was updated!", updatedUser });
    } catch (error) {
        res.status(500).send({
            message: "Server Error, cant update user messages",
            error,
        });
    }
}

export function checkJWT(req, res) {
    const loginName = process.env.MYLOGIN;
    const secret = process.env.SECRET;
    const name = jwt.verify(req.body.localToken, secret);
    if (name === loginName) {
        return res.status(200).json({ name });
    }
    return res.status(500).json({ message: "Invalid token" });
}

export async function deleteMessage(req, res) {
    try {
        const currentUser = await User.findById({ _id: req.params.id });

        const { id } = req.body;
        currentUser.messages = currentUser.messages.filter(
            (message) => message.id != id
        );
        await currentUser.save();
        return res.status(200).json({ message: "User message was deleted!" });
    } catch (error) {
        res.status(500).send({
            message: "Server Error, cant delete user message",
            error,
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: "Cant get users" });
    }
}
