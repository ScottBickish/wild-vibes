import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema({
  title: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
  imgUrl: { type: String },
  gmapUrl: { type: String },
  discussion: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  serial: { type: Number, default: 0 }
},
{ timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
