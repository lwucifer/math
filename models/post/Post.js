class CreatePost {
  constructor({
    content,
    link,
    post_image,
    list_tag,
    check_in,
    privacy,
    label_id
  }) {
    this.content = content;
    this.link = link;
    this.post_image = post_image;
    this.list_tag = list_tag;
    this.check_in = check_in;
    this.privacy = privacy;
    this.label_id = label_id;
  }
}

export function createPost(params) {
  return Object.freeze(new CreatePost(params));
}
