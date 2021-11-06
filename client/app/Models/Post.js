export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.discussion = data.discussion
    this.imgUrl = data.imgUrl
    this.like = data.like
    this.dislike = data.dislike
    this.gmapUrl = data.gmapUrl
    this.creatorName = data.creator.name // what did they use??
  }

  get Template() {
    return `
    <div class="col-10">
    <div id="post" class="card p-3 mb-4">
      <div>
        <h4 class=" mb-0">Post Title</h4>
        <p class="fst-italic text-secondary lighten-15 ">Posted by: UserName</p>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the
          leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
          the
          release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
      <div class="d-flex pt-2 align-items-center">

        <button class="btn me-1 grow likedislike">
          <i class=" mdi mdi-thumb-up px-2"> Like</i>
        </button>
        <div class="arrowleft ps-3 p-1 me-3">
          13
        </div>
        <div class="arrowright ps-3 pe-1 p-1 ms-3">
          2
        </div>
        <button class="btn ms-1 grow likedislike">
          <i class=" mdi   mdi-thumb-down ">Dislike</i>
        </button>
      </div>
      <div class="text-end">
        <p>
          <a class="btn grow commentsbutton" data-bs-toggle="collapse" href="#comments" role="button"
            aria-expanded="false" aria-controls="collapseExample">
            View comments...
          </a>
        </p>
        <div class="collapse" id="comments">
          <!-- <div class="card border-0 mt-2 commentsbutton text-start p-3 mb-4 mb-1">
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
        </div> -->
          <div class="collapse" id="comments">
            <div class="me-5 mt-3  m-2">
              <input type="text" class="form-control m-3 ms-3" id="floatingInputValue"
                placeholder="Enter your comment..." name="Enter your comment..." value="">
              <label for="floatingInputValue"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
  }
}
