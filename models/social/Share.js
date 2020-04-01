class CreateShare {
  constructor(
    post_id,
    content,
    list_tag,
    label_id,
  ) {
    this.post_id = post_id;
    this.content = content;
    this.list_tag = list_tag;
    this.label_id = label_id;
  }
}

export function createShare(...args) {
  return Object.freeze(new CreateShare(...args));
}
