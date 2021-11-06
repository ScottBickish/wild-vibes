export class Comment {
  constructor(data) {
    this.id = data.id
    this.comment = data.comment
    this.postId = data.postId
    this.creatorName = data.creator.name // what did they use??
  }

  get Template() {
    return `
    <div class="card border-0 mt-2 commentsbutton text-start p-3 mb-4 mb-1">
    <div class="d-flex justify-content-between">
      <h6 class=" mb-1">${this.creatorName} Commented:</h6>
      <div>
        <i class=" selectable mdi m-1 mdi-pencil "></i>
        <i class="m-1 mdi selectable mdi-trash-can "></i>
      </div>
    </div>
    <p> ${this.comment} </p>
  </div>
</div> 
    `
  }
}
