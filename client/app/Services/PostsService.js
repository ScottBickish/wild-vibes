import { ProxyState } from '../AppState.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'
import { Post } from '../Models/Post.js'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/wildvibes/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async createPost(data) {
    const res = await api.post('api/wildvibes/posts', data)
    ProxyState.posts = [new Post(res.data), ...ProxyState.posts]
    logger.log(res.data)
  }

  async editPost(newData, id) {
    const res = await api.put('api/wildvibes/posts/' + id, newData)
    logger.log(res.data)
  }

  async deletePost(id) {
    const res = await api.delete('api/wildvibes/posts/' + id)
    logger.log(res.data)
    this.getAllPosts()
  }

  async like(id) {
    const post = ProxyState.posts.find(p => p.id === id)
    const res = await api.put('api/wildvibes/posts/' + id + '/like', post)
    logger.log(res.data)
    const index = ProxyState.posts.findIndex(p => p.id === id)
    ProxyState.posts.splice(index, 1, new Post(res.data))
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
  }

  async dislike(id) {
    const post = ProxyState.posts.find(p => p.id === id)
    const res = await api.put('api/wildvibes/posts/' + id + '/dislike', post)
    logger.log(res.data)
    const index = ProxyState.posts.findIndex(p => p.id === id)
    ProxyState.posts.splice(index, 1, new Post(res.data))
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
  }

  mostLiked() {
    ProxyState.sort = 0
  }

  mostDisliked() {
    ProxyState.sort = 1
  }

  // mostRecent() {
  //   ProxyState.sort = 2
  // }
}

export const postsService = new PostsService()
