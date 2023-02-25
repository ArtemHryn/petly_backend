const { Schema, model } = require('mongoose');
const { ErrorConstructor } = require('../helper/errors');

const newsSchema = new Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } }
);

newsSchema.post('save', ErrorConstructor);

const News = model('new', newsSchema);

module.exports = { News };
