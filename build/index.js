"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const database_1 = require("./database/database");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (_req, res) => {
    res.send("Home Api");
});
app.use("/api/products", products_route_1.default);
//database
(0, database_1.connectDB)()
    .then(() => {
    app.listen(config_1.PORT || 3000, () => {
        console.log(`Server listen on port ${config_1.PORT || 3000}`);
    });
})
    .catch(() => {
    console.log("Connection database failed!");
});
