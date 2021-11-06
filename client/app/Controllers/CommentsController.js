import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

export class CommentsController {
  constructor() {
    this.getAllComments()
  }

  async getAllComments() {
    try {
      await commentsService.getAllComments()
    } catch (error) {
      logger.error('[error]', error)
    }
  }

  async createComment(postId) {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      const newComment = {
        // @ts-ignore
        comment: formElem.comment.value,
        postId: postId
      }
      await commentsService.createComment(newComment)
      // @ts-ignore
      formElem.reset()
    } catch (error) {
      logger.error('[error]', error)
    }
  }
}
