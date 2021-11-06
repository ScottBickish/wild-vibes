import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class CommentsService {
  async getAll(query = {}) {
    return await dbContext.Comments.find(query).populate('creator')
  }

  async getByCommentId(id) {
    const comment = await dbContext.Comments.findById(id).populate('creator')
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async getByPostId(id) {
    const comment = await dbContext.Comments.find({ postId: id }).populate('creator')
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async create(body) {
    const newComment = await dbContext.Comments.create(body)
    return newComment.populate('creator')
  }

  async edit(body) {
    const comment = await this.getByCommentId(body.id)
    if (comment.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('you do not have the credentials to edit this comment')
    }
    const updatedComment = dbContext.Comments.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return updatedComment
  }

  async remove(commentId, userId) {
    const comment = await this.getByCommentId(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('you do not have the credentials to delete this comment')
    }
    await dbContext.Comments.findByIdAndDelete(commentId)
  }
}

export const commentsService = new CommentsService()
