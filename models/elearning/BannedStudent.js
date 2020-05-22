class BannedStudent {
    constructor(payload) {
        this.elearning_id = payload.elearning_id;
        this.student_id = payload.student_id;
        this.banned = payload.banned;
    }
}

export function createBannedStudent(payload) {
    return Object.freeze(new BannedStudent(payload));
}