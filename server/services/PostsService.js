import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    return await dbContext.Posts.find(query).populate('creator', 'name')
  }

  async getById(id) {
    const post = await dbContext.Posts.findById(id).populate('creator', 'name')
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async create(body) {
    // REVIEW do you want a populate here?
    const newPost = await dbContext.Posts.create(body)
    return newPost.populate('creator', 'name')
  }

  async like(body) {
    const post = await this.getById(body.id)
    // if (post.creatorId.toString() !== body.creatorId) {
    //   throw new Forbidden('you do not have the credentials to edit this post')
    // }
    post.like++
    const updatedPost = dbContext.Posts.findOneAndUpdate({ _id: body.id }, post, { new: true })
    return await updatedPost.populate('creator', 'name')
  }

  async remove(postId, userId) {
    const post = await this.getById(postId)
    if (post.creatorId.toString() !== userId) {
      throw new Forbidden('you do not have the credentials to delete this post')
    }
    await dbContext.Posts.findByIdAndDelete(postId)
  }
}
export const postsService = new PostsService()
