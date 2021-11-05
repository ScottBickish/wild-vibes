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
    return await dbContext.Posts.create(body)
  }

  async edit(body) {
    const post = await this.getById(body.id)
    if (post.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('you do not have the credentials')
    }
    const updatedPost = dbContext.Posts.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return updatedPost
  }
}
export const postsService = new PostsService()
