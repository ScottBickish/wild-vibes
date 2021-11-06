import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let template = ''

  ProxyState.posts.forEach(post => { template += post.Template })
  document.getElementById('post').innerHTML = template
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    ProxyState.on('account', _drawPosts)
    this.getAllPosts()
    // this.createPost()
  }

  async like(id) {
    await postsService.like(id)
  }

  async dislike(id) {
    await postsService.dislike(id)
  }

  async getAllPosts() {
    try {
      const posts = await postsService.getAllPosts()
      logger.log(posts)
    } catch (error) {
      console.error(error)
    }
  }

  async createPost() {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      const newPost = {
        title: formElem.title.value,
        discussion: formElem.discussion.value,
        imgUrl: formElem.imgUrl.value
        // like: formElem.like.value,
        // dislike: formElem.like.value
        // gmapUrl: formElem.gmapUrl
      }
      await postsService.createPost(newPost)
      formElem.reset()
    } catch (error) {
      logger.error('[error]', error)
    }
  }

  async editPost(id) {
    try {
      await postsService.editPost(id)
    } catch (error) {
      console.error(error)
    }
  }

  async deletePost(id) {
    try {
      if (window.confirm('Are you sure you want to delete this Discussion?')) {
        await postsService.deletePost(id)
      }
    } catch (error) {
      logger.log('[Delete error]', error)
    }
  }
}
