import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function _drawPosts() {
  let template = ''
  const sort = ProxyState.sort
  if (sort === 0) {
    ProxyState.posts.sort(function(a, b) {
      return b.like - a.like
    })
  } else if (sort === 1) {
    ProxyState.posts.sort(function(a, b) {
      return b.dislike - a.dislike
    })
  } else if (sort === 2) {
    ProxyState.posts.sort(function(a, b) {
      return b.serial - a.serial
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
    // ProxyState.on('sort', _drawPosts)

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
      logger.log('posts here', posts)
    } catch (error) {
      console.error(error)
    }
  }

  async createPost() {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      let last = 0
      ProxyState.posts.sort(function(a, b) {
        return a.serial - b.serial
      })
      for (let i = 0; i < ProxyState.posts.length; i++) {
        last = ProxyState.posts[i].serial
      }
      const newPost = {
        title: formElem.title.value,
        discussion: formElem.discussion.value,
        imgUrl: formElem.imgUrl.value,
        gmapUrl: formElem.gmapUrl.value,
        serial: last + 1
        // dislike: formElem.like.value
      }
      await postsService.createPost(newPost)
      formElem.reset()
      Toast.fire({
        icon: 'success',
        title: 'Post created!'
      })
    } catch (error) {
      logger.error('[error]', error)
    }
  }

  async editPost(id) {
    try {
      window.event.preventDefault()
      const formElem = window.event.target
      const editedPost = {
        title: formElem.title.value ? formElem.title.value : ProxyState.posts.find(p => p.id === id).title,
        discussion: formElem.discussion.value ? formElem.discussion.value : ProxyState.posts.find(p => p.id === id).discussion,
        imgUrl: formElem.imgUrl.value ? formElem.imgUrl.value : ProxyState.posts.find(p => p.id === id).imgUrl,
        gmapUrl: formElem.gmapUrl.value ? formElem.gmapUrl.value : ProxyState.posts.find(p => p.id === id).gmapUrl
      }
      await postsService.editPost(editedPost, id)
      Toast.fire({
        icon: 'success',
        title: 'Post edited!'
      })
    } catch (error) {
      logger.error(error)
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
        Toast.fire({
          icon: 'success',
          title: 'Post deleted successfully!'
        })
      }
    } catch (error) {
      logger.log('[Delete error]', error)
    }
  }

  mostLiked() {
    postsService.mostLiked()
    _drawPosts()
  }

  mostDisliked() {
    postsService.mostDisliked()
    _drawPosts()
  }

  mostRecent() {
    postsService.mostRecent()
    _drawPosts()
  }
}
