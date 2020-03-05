class CreateComment {
  constructor(
    comment_content,
    comment_link,
    source_id,
    list_tag,
    parent_comment_id,
    comment_images,
  ) {
    this.comment_content = comment_content;
    this.comment_link = comment_link;
    this.source_id = source_id;
    this.list_tag = list_tag;
    this.parent_comment_id = parent_comment_id;
    this.comment_images = comment_images;
  }
}

export function createComment(...args) {
  return Object.freeze(new CreateComment(...args));
}
