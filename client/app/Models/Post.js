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
    this.gmapUrl = data.gmapUrl
  }

  get Template() {
    return `
    <div class="col-10">
    <div id="post" class="card shadow p-3 mb-4">
      <div>
      <div class="d-flex justify-content-between">
      <h4 class=" mb-0">${this.title}</h4>
      <div>

      <i onclick="app.postsController.deletePost('${this.id}')" class="mdi selectable2  ${ProxyState.account.id === this.creatorId ? '' : 'visually-hidden'} mdi-24px grow mdi-close-thick me-2"></i>
      </div>
    </div>
    <div class="d-flex justify-content-between ${this.gmapUrl ? 'mb-3' : ''} ">
        <p class="fst-italic text-secondary lighten-15 ">Posted by: ${this.creatorName}</p>
        <div class=" ${this.gmapUrl ? '' : 'visually-hidden'}">
        <a href="${this.gmapUrl}" target="_blank"><i class="mdi mdi-24px mdi-map-marker-radius text end me-4 ">Check out this location!</i></a>
      </div>
      </div>

        <div class="d-flex justify-content-center mb-4">
          <img class="rounded shadow" width="85%" src="${this.imgUrl}" alt="">
        </div>
        <p class=" me-3 ms-3"> ${this.discussion}</p>
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

// <form onsubmit="app.postsController.editPost('${this.id}')">
// <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
//   aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="staticBackdropLabel">Editing your post</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//       <div class="d-flex">
//       <input type="text" class="form-control m-3 ms-3" id="floatingInputValue"
//         placeholder="Edit your Title" name="title" value="${ProxyState.posts.find(p => p.id === this.idid).title}">
//       <label for="floatingInputValue"></label>
//     </div>
//     <div class="d-flex">
//       <input type="text" class="form-control m-3 ms-3 me-2" id="floatingInputValue"
//         placeholder="Edit Image Url" name="imgUrl" value="">
//       <label for="floatingInputValue"></label>

//       <input type="text" class="form-control m-3 ms-1 me-4" id="floatingInputValue"
//         placeholder="Edit Google Maps Url" name="gmapUrl" value="">
//       <label for="floatingInputValue"></label>
//     </div>

//     <div class="m-3 me-4">
//       <div class="form-floating">
//         <textarea name="discussion" class="form-control" placeholder="Leave a comment here"
//           id="floatingTextarea2" style="height: 100px"></textarea>
//         <label for="floatingTextarea2">Edit your Discussion</label>
//       </div>
//     </div>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//         <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Save Changes</button>
//       </div>
//     </div>
//   </div>
// </div>
// </form>
// <i type="button" class="mdi-24px mdi mdi-pencil selectable2 grow ${ProxyState.account.id === this.creatorId ? '' : 'visually-hidden'}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
