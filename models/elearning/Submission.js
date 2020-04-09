class MarkSubmission {
  constructor({
                submission_id,
                mark,
                note,
                to_passed
              }) {
    this.submission_id = submission_id;
    this.mark = mark;
    this.note = note;
    this.to_passed = to_passed;
  }
}

export function createPayloadMarkSubmission(payload) {
  return Object.freeze(new MarkSubmission(payload));
}
