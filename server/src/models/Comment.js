const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema } = mongoose;

const commentSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: {
    type: String,
    max: 500,
    required: true,
  }
},
  { timestamps: true });

export const validateComment = (comment) => {
  const schema = {
    comment: Joi.string().max(500).required()
  };
  return Joi.validate(comment, schema)
}

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

