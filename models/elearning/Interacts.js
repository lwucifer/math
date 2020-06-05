class Interact {
    constructor(payload) {
        this.elearning_id = payload.elearning_id;
        this.title = payload.title;
        this.content = payload.content;
    }
}

export function createInteract(payload) {
    return Object.freeze(new Interact(payload));
}