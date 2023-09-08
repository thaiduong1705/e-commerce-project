const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, CustomAPIError } = require("../errors");
const sendEmail = require("../utils/sendEmail");

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new BadRequestError("Please provide full required fill");
    }

    const newUser = await User.create(req.body);
    return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        newUser,
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError(`Dont have this user with email ${email}`);
    }

    if (!user.validatePassword(pass)) {
        throw new NotFoundError(`Password is not correct`);
    }

    const accessToken = user.createJWT(process.env.ACCESS_TOKEN_LT);
    const refreshToken = user.createJWT(process.env.REFRESH_TOKEN_LT);

    // save refresh token to cookie
    await User.findByIdAndUpdate(
        user._id,
        { refreshToken },
        { runValidators: true, new: true }
    );

    // save refresh token into cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 3 * 1000 * 60 * 60 * 24,
    });

    const {
        password,
        role,
        refreshToken: userToken,
        ...userData
    } = user.toObject();

    res.status(StatusCodes.OK).json({
        accessToken,
        refreshToken,
        userData,
    });
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        throw new CustomAPIError("No refresh token in cookies");
    }

    const user = await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        { refreshToken: "" },
        { new: true, runValidators: true }
    );

    if (!user) {
        throw new BadRequestError("No user found");
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Logout successfully",
    });
});

const renewAccessToken = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user);

    if (!user) {
        throw new Error(
            "Refresh token does not match with user, but when sign we sign id. PLEASE CHECK"
        );
    }

    const newAccessToken = user.createJWT(process.env.ACCESS_TOKEN_LT);

    return res.status(StatusCodes.OK).json({
        newAccessToken,
    });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) {
        throw new BadRequestError("Missing Email");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError("No user has registered with this email");
    }

    const resetToken = await user.createPasswordResetToken();

    const html = `Xin vui lòng click vào link này để thay đổi mật khẩu, link có hiệu lực 30 phút: <a href=
${process.env.URL_SERVER}/auth/reset-password?email=${email}&resetToken=${resetToken}>Nhấn vào đây</a>`;

    const rs = await sendEmail(email, html);

    return res.status(StatusCodes.OK).json({
        success: true,
        rs,
    });
});

const checkResetToken = asyncHandler(async (req, res) => {
    const { resetToken, email, password } = req.body;

    if (!resetToken || !email || !password) {
        throw new BadRequestError(
            "Please provide full reset token, email, password"
        );
    }

    const user = await User.findOne({
        email,
        passwordResetToken: resetToken,
        passwordResetExpired: { $gt: Date.now() },
    });
    if (!user) {
        throw new BadRequestError("Invalid reset token");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpired = undefined;

    await user.save();
    return res.status(StatusCodes.OK).json({
        success: true,
        msg: "Reset password oke",
    });
});

module.exports = {
    register,
    login,
    renewAccessToken,
    logout,
    forgotPassword,
    checkResetToken,
};
