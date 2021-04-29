//we'll use these vars in more than one route, than is better call global here
(NR_APP_NAME_PRODUCTION = ["Anota AI Production"]),
    (NR_APP_NAME_STAGING = ["Anota AI Staging"]),
    require("newrelic");
config = require("./config/config.js");
moment = require("moment-timezone");
moment.tz.setDefault("America/Sao_Paulo");
express = require("express");
mongoose = require("mongoose");
ObjectIDForModel = mongoose.Schema.Types.ObjectId;
ObjectId = mongoose.Types.ObjectId;
//mongoose.Promise = require("q").Promise;
jwt = require("jsonwebtoken");
Promise = require("bluebird");
const database = require("./db/db");
socketIO = require("socket.io");
var mongoAdapter = require("socket.io-adapter-mongo");
mongoosePaginate = require("mongoose-paginate");
//amazon = require("./routes/sources/amazon/amazon.js");
multipart = require("connect-multiparty");
multipartMiddleware = multipart({
    maxFilesSize: 1024 * 1024,
});

Sentry = require("@sentry/node");

urlBase = process.env.URLBASE || config.urlBase;


var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var device = require("express-device");

// tracking errors
/*if (environment == "production") {
    Sentry.init({
        dsn: "https://74b86dc10d1d4a2ea67c44a5de432792@sentry.io/1837622",
    }); // ISMAEL
} else {
    Sentry.init({
        dsn: "https://40214e61ec1547b5b1d37e6ed442311c@sentry.io/1457104",
    }); // IGROW
}*/

//to get ip
app.enable("trust proxy");

//to get device bei
app.use(
    device.capture({
        parseUserAgent: true,
    })
);
// app.use(bodyParser.json()); // support json encoded bodies
app.use(
    bodyParser.json({
        limit: "1mb",
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "1mb",
        extended: true,
    })
); // support encoded bodies
app.use(cors());

app.use(express.static(__dirname + "/"));


// all environments
app.set("port", process.env.PORT || 8000);

//to use render
database
    .connect()
    .then(() => {
        if (!module.parent) {
            //services = require("@anotaaidev/lib-services");
            //services.setEnviroment.setEnviroment(environment)
            const server = app.listen(app.get("port"), function () {
                console.log("servidor ligado porta " + app.get("port"));
            });
            server.timeout = 45000;

            io = socketIO(server, {
                pingInterval: 15000,
                pingTimeout: 30000,
            });
            io.adapter(mongoAdapter(config.db.socket));
        }

        queue = require("./routes/sources/amazon/queue");

        app.use(function (req, res, next) {
            res.status(404);

            // respond with html page
            if (req.accepts("html")) {
                res.send("Not found");
                return;
            }

            // respond with json
            if (req.accepts("json")) {
                res.send({
                    error: "Not found",
                });
                return;
            }

            // default to plain-text. send()
            res.type("txt").send("Not found");
        });
    })
    .catch((e) => {
        console.log(e);
        Sentry.captureException(e);
    });


var noAuthRoutes = require("./routes/noauth/routes.js");
app.use("/noauth", noAuthRoutes);


module.exports = app;
