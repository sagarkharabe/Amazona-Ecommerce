const mongoose = require('mongoose');
const Joi = require('joi');
const { productSchema } = require('./Product');
const { userSchema } = require('./User');

const commentSchema = new mongoose.Schema({
  productId: {
    type: productSchema,
    required: true,
  },
  userId: {
    type: userSchema,
    required: true,
  },
  comment: {
    type: String,
    max: 500,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validateComment = {
  productId: Joi.object().required(),
  userId: Joi.object().required(),
  comment: Joi.string().max(500).required(),
  date: Joi.number(),
};

const Comment = new mongoose.model('comment', commentSchema);

exports.Comment = Comment;
exports.validateComment = validateComment;
