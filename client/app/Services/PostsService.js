import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/wildvibes/posts')
    logger.log(res.data)
  }

  async createPost(data) {
    const res = await api.post('api/wildvibes/posts', data)
    logger.log(res.data)
  }

//   async editPost(neData) {
//     const res = await api.put('api/wildvibes/posts' + id, newData)
//     logger.log(res.data)
//   }

//   async deletePost(id) {
//     const res = await api.remove('api/wildvibes/posts' + id)
//     logger.log(res.data)
//   }
// }

export const postsService = new PostsService()
