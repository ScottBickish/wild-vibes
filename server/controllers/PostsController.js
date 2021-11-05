import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'

export class PostsController extends BaseController {
  constructor() {
    super('api/wildvibes/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
<<<<<<< HEAD
      .delete('/:id', this.remove)
=======
      // .delete()
>>>>>>> ebc2afb2a8b38decf24e6ae272cbac16b106a623
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

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const post = await postsService.edit(req.body)
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
