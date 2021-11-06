import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'

export class PostsController extends BaseController {
  constructor() {
    super('api/wildvibes/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getByPostId)
      .put('/:id/like', this.like)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const posts = await postsService.getAll(query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postsService.getById(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getByPostId(req, res, next) {
    try {
      const comments = await commentsService.getByPostId(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async like(req, res, next) {
    try {
      // req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const post = await postsService.like(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const postId = req.params.id
      await postsService.remove(postId, userId)
      res.send('you have deleted this post forever')
    } catch (error) {
      next(error)
    }
  }
}
