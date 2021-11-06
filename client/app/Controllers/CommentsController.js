import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

export class CommentsController {
  constructor() {
    this.getAllComments()
    // this.createComment()
  }

  async getAllComments() {
    const comments = await commentsService.getAllComments()
    logger.log('these are the comments', comments)
  }

  // async createComment(newComment) {
  //   try {
  //     window.event.preventDefault()
  //     const formElem = window.event.target
  //     const newComment = {
  //       // @ts-ignore
  //       comment: formElem.comment.value,
  //     }
  //     await commentsService.createComment(newComment)
  //     formElem.reset()
  //   } catch (error) {
  //     logger.error('[error]', error)
  //   }
  // }
}
