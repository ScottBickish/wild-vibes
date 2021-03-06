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
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
    logger.log('create comment', res.data)
    return res.data.postId
  }

  //   async editcomment(neData) {
  //     const res = await api.put('api/wildvibes/comments' + id, newData)
  //     logger.log(res.data)
  //   }

  async deleteComment(id) {
    const found = ProxyState.comments.find(c => c.id === id)
    const foundIndex = ProxyState.comments.findIndex(c => c.id === id)
    const postid = found.postId
    await api.delete('api/wildvibes/comments/' + id)
    ProxyState.comments.splice(foundIndex, 1)
    return postid
  }
}

export const commentsService = new CommentsService()
