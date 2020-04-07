class PostLink {
  constructor({
    type,
    url,
    image,
    title,
    description,
    updatedTime,
    imageWidth,
    imageHeight,
    videoUrl,
    videoSecureUrl,
    videoType,
    videoWidth,
    videoHeight,
    videoTag,
    siteName,
  }) {
    this.type = type;
    this.url = url;
    this.image = image;
    this.title = title;
    this.description = description;
    this.updatedTime = updatedTime;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.videoUrl = videoUrl;
    this.videoSecureUrl = videoSecureUrl;
    this.videoType = videoType;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.videoTag = videoTag;
    this.siteName = siteName;
  }
}

export function createPostLink(args) {
  return Object.freeze(new PostLink(args));
}
