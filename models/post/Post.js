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

class EditPost {
  constructor({
    post_id,
    content,
    link,
    post_image,
    list_tag,
    list_tag_del,
    delete_img_id,
    check_in,
    privacy,
    label_id
  }) {
    this.post_id = post_id;
    this.content = content;
    this.link = link;
    this.post_image = post_image;
    this.list_tag = list_tag;
    this.list_tag_del = list_tag_del;
    this.delete_img_id = delete_img_id;
    this.check_in = check_in;
    this.privacy = privacy;
    this.label_id = label_id;
  }
}

export function createPost(params) {
  return Object.freeze(new CreatePost(params));
}

export function editPost(params) {
  return Object.freeze(new EditPost(params));
}
