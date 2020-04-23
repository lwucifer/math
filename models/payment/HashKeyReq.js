class HashKeyReq {
  constructor(payload) {
    this.again_link = payload.payload.again_link;
    this.title = payload.title;
    this.vpc_access_code = payload.vpc_access_code;
    this.vpc_amount = payload.vpc_amount;
    this.vpc_card_list = payload.vpc_card_list;
    this.vpc_command = payload.vpc_command;
    this.vpc_currency = payload.vpc_currency;
    this.vpc_customer_email = payload.vpc_customer_email;
    this.vpc_customer_id = payload.vpc_customer_id;
    this.vpc_customer_phone = payload.vpc_customer_phone;
    this.vpc_locale = payload.vpc_locale;
    this.vpc_merch_txn_ref = payload.vpc_merch_txn_ref;
    this.vpc_merchant = payload.vpc_merchant;
    this.vpc_order_info = payload.vpc_order_info;
    this.vpc_return_url = payload.vpc_return_url;
    this.vpc_secure_hash = payload.vpc_secure_hash;
    this.vpc_ticket_no = payload.vpc_ticket_no;
    this.vpc_txn_response_code = payload.vpc_txn_response_code;
    this.vpc_version = payload.vpc_version;
  }
}

export function createHashKeyReq(payload) {
  return Object.freeze(
    new HashKeyReq({
      again_link: payload.again_link,
      title: payload.title,
      vpc_access_code: payload.vpc_access_code,
      vpc_amount: payload.vpc_amount,
      vpc_card_list: payload.vpc_card_list,
      vpc_command: payload.vpc_command,
      vpc_currency: payload.vpc_currency,
      vpc_customer_email: payload.vpc_customer_email,
      vpc_customer_id: payload.vpc_customer_id,
      vpc_customer_phone: payload.vpc_customer_phone,
      vpc_locale: payload.vpc_locale,
      vpc_merch_txn_ref: payload.vpc_merch_txn_ref,
      vpc_merchant: payload.vpc_merchant,
      vpc_order_info: payload.vpc_order_info,
      vpc_return_url: payload.vpc_return_url,
      vpc_secure_hash: payload.vpc_secure_hash,
      vpc_ticket_no: payload.vpc_ticket_no,
      vpc_txn_response_code: payload.vpc_txn_response_code,
      vpc_version: payload.vpc_version
    })
  );
}
