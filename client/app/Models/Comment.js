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
      <h6 class=" mb-1">You Commented:</h6>
      <div>
        <i class=" mdi m-1 mdi-pencil "></i>
        <i class="m-1 mdi  mdi-trash-can "></i>
      </div>
    </div>
    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been
      the
      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
      type
      and
      scrambled it to make a type specimen book. </p>
  </div>
</div> 
    `
  }
}
