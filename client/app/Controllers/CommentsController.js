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
      const id = await commentsService.createComment(newComment)

      // @ts-ignore
      formElem.reset()

      const myCollapse = document.getElementById('a' + id + 'a')
      const bsCollapse = new bootstrap.Collapse(myCollapse)
      bsCollapse.show()
    } catch (error) {
      logger.error('[error]', error)
    }
  }

  async deleteComment(id) {
    try {
      const postid = await commentsService.deleteComment(id)
      const myCollapse = document.getElementById('a' + postid + 'a')
      const bsCollapse = new bootstrap.Collapse(myCollapse)
      bsCollapse.show()
    } catch (error) {
      logger.error('[error]', error)
    }
  }
}
