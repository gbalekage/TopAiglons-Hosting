const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const HttpError = require("../models/errorModel");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const {
  sendVerificationMail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require("../mails/mail");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return next(new HttpError("Vous devez remplir tout le champs", 422));
    }

    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("L'email exist deja", 422));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const vericationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      email: newEmail,
      password: hashedPassword,
      vericationCode,
      vericationCodeExpiresAt: Date.now() + 10 * 60 * 1000,
    });

    await user.save(); 

    generateToken(res, user._id);

    // await sendVerificationMail(user.email, vericationCode);

    res.status(201).json({
      success: true,
      message: "User Registerd",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return next(new HttpError(error.message || "Server error", 500));
  }
};


const verifyEmail = async (req, res, next) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      vericationCode: code,
      vericationCodeExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return next(new HttpError("Code invalide ou expiree", 422));
    }

    (user.isVerified = true), (user.vericationCode = undefined);
    user.vericationCodeExpiresAt = undefined;
    await user.save();

    // await sendWelcomeEmail(user.email, user.name);

    res.status(201).json({
      success: true,
      message: "Email Verified",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new HttpError("Le compte n'est pas trouver, verifier vos infos", 422)
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new HttpError("Mot de passe incorect", 422));
    }

    generateToken(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    return next(new HttpError(error));
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    // await sendPasswordResetEmail(
    //   user.email,
    //   `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    // );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar) {
      return next(new HttpError("Choisisser une image", 422));
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    // If the user already has an avatar, delete it
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;

    // Check the file size
    if (avatar.size > 1000000) {
      return next(
        new HttpError(
          "Le fiche est trop lourd, elle doit avoir au moins 1mb",
          422
        )
      );
    }

    let fileName = avatar.name;
    let splittedFileName = fileName.split(".");
    let newFilename =
      splittedFileName[0] +
      uuid() +
      "." +
      splittedFileName[splittedFileName.length - 1];

    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }

        // Update the user's avatar field
        const updatedAvatar = await User.findByIdAndUpdate(
          req.userId, // Ensure you're using req.userId
          { avatar: newFilename },
          { new: true }
        );

        if (!updatedAvatar) {
          return next(new HttpError("The avatar could not be changed", 422));
        }

        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  register,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
  checkAuth,
  changeAvatar,
};
