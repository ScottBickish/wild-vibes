import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/wildvibes/comments')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getByCommentId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const comments = await commentsService.getAll(query)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getByCommentId(req, res, next) {
    try {
      const comment = await commentsService.getByCommentId(req.params.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const post = await commentsService.edit(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.id
      await commentsService.remove(commentId, userId)
      res.send('you have deleted this comment forever')
    } catch (error) {
      next(error)
    }
  }
}
