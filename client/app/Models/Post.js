import { ProxyState } from '../AppState.js'

export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.discussion = data.discussion
    this.imgUrl = data.imgUrl || ''
    this.like = data.like
    this.dislike = data.dislike
    this.creatorName = data.creator.name
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.serial = data.serial
  }

  get Template() {
    return `
    <div class="col-10">
    <div id="post" class="card shadow p-3 mb-4">
      <div>
      <div class="d-flex justify-content-between">
      <h4 class=" mb-0">${this.title}</h4>
      <i onclick="app.postsController.deletePost('${this.id}')" class="mdi selectable2 grow ${ProxyState.account.id === this.creatorId ? '' : 'visually-hidden'} mdi-24px mdi-close-thick me-2"></i>
    </div>
        <p class="fst-italic text-secondary lighten-15 ">Posted by: ${this.creatorName}</p>
        <div class="d-flex justify-content-center mb-4">
                    <img class="rounded shadow" width="85%"
                      src="${this.imgUrl}"
                      alt="">
                  </div>
        <p> ${this.discussion}</p>
      </div>
      <div class="d-flex pt-2 align-items-center">

        <button class="btn  me-1 grow likedislike" onclick="app.postsController.like('${this.id}')">
          <i class=" mdi mdi-thumb-up px-2"> Like</i>
        </button>
        <div  class="arrowleft text-center ps-3 p-1 me-3">
          ${this.like}
        </div>
        <div class="arrowright p-1  text-center">
          ${this.dislike}
        </div>
        <button class="btn ms-1 grow likedislike" onclick="app.postsController.dislike('${this.id}')">
          <i class=" mdi   mdi-thumb-down ">Dislike</i>
        </button>
      </div>
      <div class="text-end">
        <p>
          <a class="btn grow commentsbutton" data-bs-toggle="collapse" href="#a${this.id}a" role="button"
            aria-expanded="false" aria-controls="collapseExample">
            View comments...
          </a>
        </p>
        <div class="collapse " id="a${this.id}a">
${this.getComments()}
            <div class="me-5 mt-3  m-2">
            <form onsubmit="app.commentsController.createComment('${this.id}')">
              <input type="text" class="form-control m-3 ms-3" id="floatingInputValue"
                placeholder="Enter your comment..." name="comment" value="">
              <label for="floatingInputValue"></label>
              </form>
            </div>
         
        </div>
      </div>
    </div>
  </div>
    `
  }

  getComments() {
    const comments = ProxyState.comments.filter(c => this.id === c.postId)
    let template = ''
    comments.forEach(c => { template += c.Template })
    return template
  }

  static commentForm(id) {
    return `<div class="me-5 mt-3  m-2">
    <form onsubmit="app.commentsController.createComment('${id}')">
      <input type="text" class="form-control m-3 ms-3" id="floatingInputValue"
        placeholder="Enter your comment..." name="comment" value="">
      <label for="floatingInputValue"></label>
      </form>`
  }
}
