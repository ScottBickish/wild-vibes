import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/wildvibes/posts')
    logger.log(res.data)
  }
}

export const postsService = new PostsService()
