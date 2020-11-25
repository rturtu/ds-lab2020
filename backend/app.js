var cors = require("cors");
var cookieParser = require("cookie-parser");
var express = require("express");
var app = express();
var logger = require("morgan");
var http = require("http");
var rabbit = require("./connection");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./routes"));

app.use(function (req, res, next) {
    var err = new Error("Page not found!");
    err.status = 404;
    next(err);
});

// ERROR HANDLER
app.use(function errorHandler(err, req, res, next) {
    console.log(err);

    // next(parameter) is err from here

    if (err.status === 501) {
        res.status(501).send("Route not implemented");
        return;
    }

    res.status(err.status).send(err.message);
});
//rabbitmq
var server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "https://dslab2020-front.herokuapp.com/",
        methods: ["GET", "POST"],
    },
});

server.listen(process.env.PORT);

io.on("connection", (socket) => {
    console.log("An user has connected.");

    socket.emit("msg", "Hey there :)");
    socket.on("disconnect", () => {
        console.log("An user has disconnected");
    });
});

rabbit((connection) => {
    connection.createChannel((err, channel) => {
        if (err) {
            throw new Error(err);
        }

        channel.assertQueue("activities");
        channel.consume("activities", (msg) => {
            if (msg !== null) {
                let content = JSON.parse(msg.content.toString());
                let startDate = new Date(content.start);
                let endDate = new Date(content.end);
                if (content.activity === "Sleeping") {
                    if (
                        endDate.valueOf() - startDate.valueOf() >
                        1000 * 60 * 60 * 7
                    ) {
                        io.emit(
                            "alert",
                            "Patient spent longer than 7 hours sleeping."
                        );
                    }
                } else if (content.activity === "Outdoor") {
                    if (
                        endDate.valueOf() - startDate.valueOf() >
                        1000 * 60 * 60 * 5
                    ) {
                        io.emit(
                            "alert",
                            "Patient spent longer than 5 hours outdoors."
                        );
                    }
                } else if (content.activity === "Toileting") {
                    if (
                        endDate.valueOf() - startDate.valueOf() >
                        1000 * 60 * 30
                    ) {
                        io.emit(
                            "alert",
                            "Patient spent longer than 30 minutes toileting."
                        );
                    }
                }

                io.emit("msg", msg.content.toString());
                channel.ack(msg);
            }
        });
    });
});

module.exports = app;
