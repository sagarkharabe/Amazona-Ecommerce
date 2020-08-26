const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
  },
  { timestamps: true },
);

export const validateRating = (rating) => {
  const schema = {
    rate: Joi.number().min(0).max(5).required(),
  };

  return Joi.validate(rating, schema);
};

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
