import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

function _drawCommentsForPost(postId) {
  const comments = ProxyState.comments
  const found = comments.filter(c => c.postId === postId)
  let template = ''
  found?.forEach(c => { template += c.Template })
  template += Post.commentForm(found.postId)
  const myCollapse = document.getElementById('a' + postId + 'a')
  myCollapse.innerHTML = template
}
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
      const result = await Swal.fire({
        title: 'Delete this Comment?',
        icon: 'question',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true
      })
      if (result.isConfirmed) {
        const postId = await commentsService.deleteComment(id)
        _drawCommentsForPost(postId)
      } else {

      }
      // const bsCollapse = new bootstrap.Collapse(myCollapse)
      // bsCollapse.show()
    } catch (error) {
      logger.error('[error]', error)
    }
  }
}
