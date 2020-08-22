const mongoose = require('mongoose');
const Joi = require('joi');
const { productSchema } = require('./Product');
const { userSchema } = require('./User');

const ratingSchema = new mongoose.Schema({
  productId: {
    type: productSchema,
    required: true,
  },
  userId: {
    type: userSchema,
    required: true,
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validateRating = {
  productId: Joi.object().required(),
  userId: Joi.object().required(),
  rate: Joi.number().min(1).max(5).required(),
  date: Joi.number(),
};

const Rating = new mongoose.model('rating', ratingSchema);

exports.Rating = Rating;
exports.validateRating = validateRating;
