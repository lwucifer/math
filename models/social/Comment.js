class CreateComment {
  constructor({
    source_id = null,
    parent_comment_id = null,
    comment_content = "",
    comment_link = "",
    list_tag = [],
    comment_images = null,
  }) {
    this.source_id = source_id;
    this.comment_content = comment_content;
    list_tag && list_tag.length && (this.list_tag = JSON.stringify(list_tag));
    parent_comment_id && (this.parent_comment_id = parent_comment_id);
    comment_link && (this.comment_link = comment_link);
    comment_images && (this.comment_images = comment_images);
  }
}

class EditComment {
  constructor({
    source_id = null,
    comment_id,
    comment_content = "",
    comment_link = "",
    list_tag = [],
    comment_images = null,
    delete_img = false,
    list_tag_del = [],
    parent_comment_id,
  }) {
    this.source_id = source_id;
    this.comment_id = comment_id;
    this.comment_content = comment_content;
    comment_link && (this.comment_link = comment_link);
    list_tag && list_tag.length && (this.list_tag = JSON.stringify(list_tag));
    comment_images && (this.comment_images = comment_images);
    delete_img && (this.delete_img = delete_img);
    list_tag_del &&
      list_tag_del.length &&
      (this.list_tag_del = JSON.stringify(list_tag_del));
    this.parent_comment_id = parent_comment_id;
  }
}

export function createComment(params) {
  return Object.freeze(new CreateComment(params));
}

export function editComment(params) {
  return Object.freeze(new EditComment(params));
}
