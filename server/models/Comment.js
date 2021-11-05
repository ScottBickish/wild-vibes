import mongoose from 'mongoose'
import { PostSchema } from './Post'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
  comment: { type: String, requred: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  justOne: true,
  ref: 'Post'
})

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
