import { ProxyState } from '../AppState.js'
export class Comment {
  constructor(data) {
    this.id = data.id
    this.comment = data.comment
    this.postId = data.postId
    this.creatorName = data.creator.name // what did they use??
    this.creatorId = data.creator.id
  }

  get Template() {
    return `
    <div class="card border-0 mt-2 commentsbutton text-start p-3 mb-4 mb-1">
    <div class="d-flex justify-content-between">
      <h6 class=" mb-1">${this.creatorName} commented:</h6>
      <div>
     
        <i onclick="app.commentsController.deleteComment('${this.id}')" class="m-1 mdi selectable mdi-trash-can ${ProxyState.account.id === this.creatorId ? '' : 'visually-hidden'} "></i>
      </div>
    </div>
    <p> ${this.comment} </p>
  </div>
    `
  }
}
// <i class=" selectable mdi m-1 mdi-pencil "></i>
