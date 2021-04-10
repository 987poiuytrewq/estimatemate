"use strict";
exports.__esModule = true;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var httpServer = http_1.createServer();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on("connection", function (socket) {
    var _a = socket.handshake.query, room = _a.room, user = _a.user;
    socket.join(room);
    var getHeaders = function () { return ({ timestamp: new Date().toISOString(), user: user, room: room }); };
    var broadcast = function (message, body) {
        if (body === void 0) { body = {}; }
        var payload = { headers: getHeaders(), body: body };
        console.log(">", message, payload);
        socket.emit(message, payload);
        socket.to(room).emit(message, payload);
    };
    console.log("<", "connected", { room: room, user: user });
    socket.emit("connected", { headers: getHeaders() });
    broadcast("joined-room");
    socket.on("disconnect", function (reason) {
        broadcast("left-room");
    });
    socket.on("sync-session", function (session) {
        console.log("<", "sync-session", { session: session });
        broadcast("sync-session", { session: session });
    });
});
httpServer.listen(4000);
