class CreateComment {
  constructor({
    source_id = null,
    parent_comment_id = null,
    comment_content = '',
    comment_link = '',
    list_tag = null,
    comment_images = null,
  }) {
    this.source_id = source_id;
    this.parent_comment_id = parent_comment_id;
    this.comment_content = comment_content;
    this.comment_link = comment_link;
    this.list_tag = list_tag;
    this.comment_images = comment_images;
  }
}

class EditComment {
  constructor({
    source_id = null,
    // parent_comment_id = null,
    comment_id,
    comment_content = '',
    comment_link = '',
    list_tag = null,
    comment_images = null,
    delete_img = false,
    list_tag_del
  }) {
    this.source_id = source_id;
    // this.parent_comment_id = parent_comment_id;
    this.comment_id = comment_id;
    this.comment_content = comment_content;
    this.comment_link = comment_link;
    this.list_tag = list_tag;
    this.comment_images = comment_images;
    this.delete_img = delete_img;
    this.list_tag_del = list_tag_del;
  }
}

export function createComment(params) {
  return Object.freeze(new CreateComment(params));
}

export function editComment(params) {
  return Object.freeze(new EditComment(params));
}
