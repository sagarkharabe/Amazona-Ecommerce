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
    type: [String],
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
  stock: {
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
  images: [
    {
      contentType: String,
      default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
      required: true,
      data: Buffer,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  avgRating: { type: Number, default: 0 },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},
  { timestamps: true });

export const validateProduct = (product) => {
  const validateProduct = {
    product: Joi.object().keys({
      _id: Joi.objectId(),
      name: Joi.string().min(2).max(80).required(),
      seller: Joi.object().required(),
      categoryId: Joi.object().required(),
      price: Joi.number().min(0).required(),
      stock: Joi.number().min(0).required(),
      brand: Joi.string().min(2).max(80).required(),
      images: Joi.array().required(),
      ratings: Joi.array(),
      comments: Joi.array(),
      description: Joi.string().min(10).max(255),
    }),
  };

  return Joi.validate(product, validateProduct)
}

//TODO: compute a function to add avgRating

const Product = mongoose.model('product', productSchema);

export default Product;
