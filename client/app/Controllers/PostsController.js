import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {

}

export class PostsController {
  constructor() {
    // ProxyState.on('posts', _drawPosts)
    this.getAllPosts()
    // this.createPost()
  }

  async getAllPosts() {
    const posts = await postsService.getAllPosts()
    logger.log(posts)
  }

  // async createPost() {
  //   try {
  // prevant default
  //     const formElem = window.event.target
  //     const newPost = {
  //       title: formElem.title.value,
  //       discussion: formElem.discussion.value,
  //       imgUrl: formElem.imgUrl.value,
  //       like: formElem.like.value,
  //       dislike: formElem.like.value,
  //       //gmapUrl: formElem.gmapUrl
  //     }
  //     await postsService.creatPost(newPost)
  //     formElem.reset()
  //   } catch (error) {
  //     logger.error('[error]', error)
  //   }

  //   async createPost() {
  //     const posts = await postsService.createPost()
  //   }
  // }
}
