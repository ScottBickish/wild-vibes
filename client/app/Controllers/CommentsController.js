import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

export class CommentsController {
  constructor() {
    // this.getAllComments()
    this.createComment()
  }

  async getAllComments() {
    try {
      await commentsService.getAllComments()
    } catch (error) {
      logger.error('[error]', error)
    }
  }

  async createComment() {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      const newComment = {
        // @ts-ignore
        comment: formElem.comment.value
      }
      await commentsService.createComment(newComment)
      // @ts-ignore
      formElem.reset()
    } catch (error) {
      logger.error('[error]', error)
    }
  }
}
