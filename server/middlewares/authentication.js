const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { UnauthenticatedError } = require("../errors");

const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Cant get a token");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { _id: decode?._id, role: decode?.role };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Invalid access token");
    }
});

const verifyRefreshToken = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.refreshToken) {
        throw new UnauthenticatedError("Cant get refresh token");
    }

    try {
        const decode = jwt.verify(cookie.refreshToken, process.env.SECRET_KEY);
        req.user = { _id: decode?._id, refreshToken: cookie.refreshToken };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Invalid refresh token");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        throw new UnauthenticatedError("REQUIRE ADMIN ROLE");
    }
    next();
});
module.exports = { verifyToken, verifyRefreshToken, isAdmin };
