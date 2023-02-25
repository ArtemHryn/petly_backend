const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    city: {
      type: String,
      default: 'Uknown',
    },
    phone: {
      type: String,
      default: null,
    },
    userPhotoURL: {
      type: String,
      default: null,
    },
    birthday: {
      type: Date,
      default: Date.now(),
    },
    token: {
      type: String,
      default: null,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notice' }],
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    resetToken: {
      type: String,
      default: null,
    }
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
  if (this.isNew || this.isModified) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("Users", userSchema);

module.exports = {
  User,
};
