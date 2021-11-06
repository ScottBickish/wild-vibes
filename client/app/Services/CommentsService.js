import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getAllComments() {
    const res = await api.get('api/wildvibes/comments')
    logger.log(res.data)
  }

  async createComment(data) {
    const res = await api.post('api/wildvibes/comments', data)
    logger.log(res.data)
  }

  //   async editcomment(neData) {
  //     const res = await api.put('api/wildvibes/comments' + id, newData)
  //     logger.log(res.data)
  //   }

  //   async deletecomment(id) {
  //     const res = await api.remove('api/wildvibes/comments' + id)
  //     logger.log(res.data)
  //   }
}

export const commentsService = new CommentsService()
