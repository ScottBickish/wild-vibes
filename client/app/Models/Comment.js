export class Comment {
  constructor(data) {
    this.id = data.id
    this.comment = data.comment
    this.postId = data.postId
    this.creatorName = data.creator.name // what did they use??
  }

  get Template() {
    return `
    template here
    `
  }
}