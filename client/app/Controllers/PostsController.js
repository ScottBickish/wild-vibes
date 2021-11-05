import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {

}

export class PostsController {
  constructor() {
    // ProxyState.on('posts', _drawPosts)
    this.getAllPosts()
  }

  async getAllPosts() {
    const posts = await postsService.getAllPosts()
    logger.log(posts)
  }

//   async createPost() {
//     const posts = await postsService.createPost()
//   }
}
