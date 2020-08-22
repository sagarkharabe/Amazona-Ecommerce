import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 80,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  brand: {
    type: String,
    minlength: 2,
    maxlength: 80,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 255,
  },
  image: String,
  avgRating: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},
  { timestamps: true });

export const validateProduct = (product) => {
  const validateProduct = {
    name: Joi.string().min(2).max(80).required(),
    category: Joi.string().required(),
    price: Joi.number().min(0).required(),
    brand: Joi.string().min(2).max(80).required(),
    image: Joi.string().required(),
    avgRating: Joi.number().default(0),
    description: Joi.string().max(255).required(),
  };

  return Joi.validate(product, validateProduct)
}

//TODO: compute a function to add avgRating

const Product = mongoose.model('product', productSchema);

export default Product;
