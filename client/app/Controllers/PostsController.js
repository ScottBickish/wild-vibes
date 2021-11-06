import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let template = ''
  const sort = ProxyState.sort
  if (sort === 0) {
    ProxyState.posts.sort(function(a, b) {
      return b.like - a.like
    })
  } else if (sort === 1) {
    ProxyState.posts.sort(function(a, b) {
      return a.like - b.like
    })
  }
  ProxyState.posts.forEach(post => { template += post.Template })
  document.getElementById('post').innerHTML = template
}

// function _drawComments() {
//   let template = ''
//   ProxyState.comments.forEach(c => { template += c.Template })
// }
// function _drawLikes()

export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    ProxyState.on('account', _drawPosts)
    ProxyState.on('comments', _drawPosts)
    ProxyState.on('sort', _drawPosts)

    this.getAllPosts()
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
      const result = await Swal.fire({
        title: 'Delete this Post?',
        icon: 'question',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true
      })
      if (result.isConfirmed) {
        await postsService.deletePost(id)
      } else {

      }
    } catch (error) {
      logger.log('[Delete error]', error)
    }
  }

  mostLiked() {
    postsService.mostLiked()
  }

  mostDisliked() {
    postsService.mostDisliked()
  }

  // mostRecent() {
  //   postsService.mostRecent()
  // }
}
