import { ProxyState } from '../AppState.js'
import { Comment } from '../Models/Comment.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getAllComments() {
    const res = await api.get('api/wildvibes/comments')
    ProxyState.comments = res.data.map(c => new Comment(c))
    logger.log(res.data)
  }

  async createComment(data) {
    const res = await api.post('api/wildvibes/comments', data)
    ProxyState.comments = [new Comment(res.data), ...ProxyState.comments]
    logger.log('create comment', res.data)
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
