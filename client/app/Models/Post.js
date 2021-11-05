export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.discussion = data.discussion
    this.imgUrl = data.imgUrl
    this.like = data.like
    this.dislike = data.dislike
    this.creatorName = data.creator.name // what did they use??
  }

  get Template() {
    return `
    template here
    `
  }
}
