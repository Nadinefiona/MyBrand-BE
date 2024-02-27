"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");
//middleware
const requireSingIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
exports.default = requireSingIn;
