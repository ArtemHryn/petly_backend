const { Schema, model } = require('mongoose');

const noticeSchema = new Schema(
  {
    title: { type: String, minlength: 2, maxlength: 48, required: true },
    category: {
      type: String,
      enum: ['lost-found', 'in-good-hands', 'sell'],
      required: true,
    },
    name: { type: String, minlength: 2, maxlength: 16, default: 'no name' },
    birthdate: {
      type: Date,
      min: '1980-01-01',
      max: Date.now(),
      default: '00/00/0000',
    },
    breed: { type: String, minlength: 0, maxlength: 24, default: 'no info' },
    sex: {
      type: String,
      enum: ['male', 'female', 'no info'],
      default: 'no info',
    },
    location: {
      type: String,
      minlength: 2,
      maxlength: 50,
      default: 'no info',
    },
    comments: { type: String, maxlength: 120, default: 'no info' },
    price: {
      type: Number,
      min: [1, 'Min price 1'],
      max: [1000000, 'Max price 1000000,'],
      default: null,
    },
    imgURL: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { versionKey: false, timestamps: true }
);
const Notice = model('notice', noticeSchema);

module.exports = {
  Notice,
};
