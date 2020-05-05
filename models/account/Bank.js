class AddBank{
    constructor(payload) {
        if (payload.account_name) {
            this.account_name = payload.account_name;
        }
        if (payload.account_number) {
            this.account_number = payload.account_number;
        }
        if (payload.bank_code) {
            this.bank_code = payload.bank_code;
        }
        if (payload.bank_code) {
            this.bank_code = payload.bank_code;
        }
        if (payload.id) {
            this.id = payload.id;
        }
        if (payload.is_testing) {
            this.is_testing = payload.is_testing;
        }
    }
}
export function createPayloadAddBank(payload) {
    return Object.freeze(new AddBank(payload));
  }