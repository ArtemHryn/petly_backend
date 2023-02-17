const { Schema, model } = require('mongoose');

const sponsorsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    addressUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    workDays: {
      type: Array,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Sponsor = model('sponsor', sponsorsSchema);

module.exports = {
  Sponsor,
};
