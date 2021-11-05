import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    return await dbContext.Posts.find(query)
  }

  async getById(id) {
    const post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
  }

  async create(body) {
    return await dbContext.Posts.create(body)
  }
}
export const postsService = new PostsService()
