export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.discussion = data.discussion
    this.imgUrl = data.imgUrl
    this.like = data.like
    this.dislike = data.dislike
    // this.gmapUrl = data.gmapUrl
    this.creatorName = data.creator.name // what did they use??
  }

  get Template() {
    return `
    <div class="col-10">
    <div id="post" class="card p-3 mb-4">
      <div>
        <h4 class=" mb-0">${this.title}</h4>
        <p class="fst-italic text-secondary lighten-15 ">Posted by: UserName</p>
        <div class="d-flex justify-content-center mb-4">
                    <img class="rounded shadow" width="85%"
                      src="${this.imgUrl}"
                      alt="">
                  </div>
        <p> ${this.discussion}</p>
      </div>
      <div class="d-flex pt-2 align-items-center">

        <button class="btn me-1 grow likedislike" onclick="app.postsController.like('${this.id}')">
          <i class=" mdi mdi-thumb-up px-2"> Like</i>
        </button>
        <div class="arrowleft ps-3 p-1 me-3">
          ${this.like}
        </div>
        <div class="arrowright ps-3 pe-1 p-1 ms-3">
          ${this.dislike}
        </div>
        <button class="btn ms-1 grow likedislike" onclick="app.postsController.dislike('${this.id}')">
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
