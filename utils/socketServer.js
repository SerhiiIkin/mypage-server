import { Server } from "socket.io";
import User from "../models/User.js";
export default function socketIo(server) {
    const io = new Server(server, {
        connectionStateRecovery: {},
        cors: { origin: "*", methods: ["GET", "POST"] },
    });

    io.on("connection", (socket) => {
        socket.on("join_room", async (user) => {
            socket.join(user.roomId);
            socket.broadcast.emit("new_user_joined", user);
        });

        socket.on("rejoin_room", (room) => {
            socket.join(room);
        })

        socket.on("online", () => {
            socket.broadcast.emit("online");
        });
        socket.on("offline", () => {
            socket.broadcast.emit("offline");
        });

        socket.on("typing", (user) => {
            socket.to(user.roomId).emit("typing", user);
        });

        socket.on("stopTyping", (user) => {
            socket.to(user.roomId).emit("stopTyping");
        });

        socket.on("get_user", async (token) => {
            const users = await User.find({});
            const currentUser = users.find(
                (user) => user.token === token.value
            );

            if (!currentUser) return;
            socket.emit("current_user", currentUser);
            socket.join(currentUser.roomId);
        });

        socket.on("send_msg", (data) => {
            socket.to(data.roomId).emit("receive_msg", data);
        });

        socket.on("get_users", async () => {
            const users = await User.find({});
            socket.emit("receive_users", users);
        });

        socket.on("disconnect", async () => {
            const users = await User.find({});
            const leavedUser = users.find((user) => user.id === socket.id);

            setTimeout(() => {
                users = users.filter((user) => user.id !== socket.id);

                socket.to(leavedUser?.roomId).emit("leaved_user", users);
            }, 24 * 60 * 60 * 1000);
        });
    });
}
