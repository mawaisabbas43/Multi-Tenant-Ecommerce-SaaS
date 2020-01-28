// external imports
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const config = require("config");
const Fawn = require("fawn");
const ejs = require("ejs");
const engine = require("ejs-mate");
const flash = require("express-flash");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//session related imports
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// custom imports
//others
const secret = require("./config/secret");
const Security = require("./lib/Security");

//routes
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const stores = require("./routes/api/stores");
const categories = require("./routes/api/categories");
const products = require("./routes/api/products");
const aboutUS = require("./routes/api/aboutUS");
const contactUS = require("./routes/api/contactUS");
const feedbacks = require("./routes/api/feedbacks");
const orders = require("./routes/api/orders");
const paymentAccounts = require("./routes/api/paymentAccounts");
const paymentPlans = require("./routes/api/paymentplans");

//EJS Routes
const productsEJS = require("./routes/products");
const mainEJS = require("./routes/main");
const cartsEJS = require("./routes/carts");
const paymentsEJS = require("./routes/payments");
const ordersEJS = require("./routes/orders");

const app = express();
app.use(cors());
app.use(fileUpload());

// if(!config.get('jwtPrivateKey')){
//     console.log("FATAL ERROR: jwtPrivatekey is not defined!");
//     process.exit(1);
// }

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(secret.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDb..."))
  .catch(err => console.log("Fail to connect MongoDb!"));
Fawn.init(mongoose); //for transations

app.use(express.static(__dirname + "/client/public/server"));

app.engine("ejs", engine);
app.set("view engine", "ejs");

app.locals.paypal = secret.paypal;
app.locals.locale = secret.locale;

app.use(express.json());
app.use(helmet());
app.use(
  session({
    secret: secret.secretKey,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    store: new MongoDBStore({ uri: secret.database, collection: "sessions" }),
    name: config.name + "-" + Security.generateId(),
    genid: req => {
      return Security.generateId();
    }
  })
);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === "/favicon.ico") {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}

app.use(flash());
app.use(ignoreFavicon);

app.use("/", mainEJS);
app.use("/:storeId/products", productsEJS);
app.use("/:storeId/cart", cartsEJS);
app.use("/:storeId/checkout", paymentsEJS);
app.use("/:storeId/myorders", ordersEJS);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/stores", stores);
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/feedbacks", feedbacks);
app.use("/api/contact-us", contactUS);
app.use("/api/about-us", aboutUS);
app.use("/api/orders", orders);
app.use("/api/payments", paymentAccounts);
app.use("/api/payment-plans", paymentPlans);

const port = process.env.PORT || secret.port;
app.listen(port, () => console.log(`Listening on port ${port}...`));
