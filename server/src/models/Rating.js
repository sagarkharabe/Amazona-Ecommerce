const mongoose = require('mongoose');
const Joi = require('joi');
const { productSchema } = require('./Product');
const { userSchema } = require('./User');

const { Schema } = mongoose;

const ratingSchema = new Schema({
  product: {
    type: productSchema,
    required: true,
  },
  user: {
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
},
  { timestamps: true });

export const validateRating = (rating) => {
  const schema = {
    productId: Joi.object().required(),
    userId: Joi.object().required(),
    rate: Joi.number().min(1).max(5).required(),
    date: Joi.number(),
  }

  return Joi.validate(rating, schema)
};

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
