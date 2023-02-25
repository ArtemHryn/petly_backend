const { Schema, model } = require('mongoose');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for pet'],
    },
    date: {
      type: String,
      default: ' 00/00/0000',
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
    },
    avatarURL: {
      type: String,
    },
    comments: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

const Pet = model('pet', petSchema);

module.exports = {
  Pet,
};
