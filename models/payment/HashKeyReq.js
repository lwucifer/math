class HashKeyReq {
  constructor(
    again_link,
    title,
    vpc_access_code,
    vpc_amount,
    vpc_card_list,
    vpc_command,
    vpc_currency,
    vpc_customer_email,
    vpc_customer_id,
    vpc_customer_phone,
    vpc_locale,
    vpc_merch_txn_ref,
    vpc_merchant,
    vpc_order_info,
    vpc_return_url,
    vpc_secure_hash,
    vpc_ticket_no,
    vpc_txn_response_code,
    vpc_version
  ) {
    this.again_link = again_link;
    this.title = title;
    this.vpc_access_code = vpc_access_code;
    this.vpc_amount = vpc_amount;
    this.vpc_card_list = vpc_card_list;
    this.vpc_command = vpc_command;
    this.vpc_currency = vpc_currency;
    this.vpc_customer_email = vpc_customer_email;
    this.vpc_customer_id = vpc_customer_id;
    this.vpc_customer_phone = vpc_customer_phone;
    this.vpc_locale = vpc_locale;
    this.vpc_merch_txn_ref = vpc_merch_txn_ref;
    this.vpc_merchant = vpc_merchant;
    this.vpc_order_info = vpc_order_info;
    this.vpc_return_url = vpc_return_url;
    this.vpc_secure_hash = vpc_secure_hash;
    this.vpc_ticket_no = vpc_ticket_no;
    this.vpc_txn_response_code = vpc_txn_response_code;
    this.vpc_version = vpc_version;
  }
}

export function createHashKeyReq(again_link,
  title,
  vpc_access_code,
  vpc_amount,
  vpc_card_list,
  vpc_command,
  vpc_currency,
  vpc_customer_email,
  vpc_customer_id,
  vpc_customer_phone,
  vpc_locale,
  vpc_merch_txn_ref,
  vpc_merchant,
  vpc_order_info,
  vpc_return_url,
  vpc_secure_hash,
  vpc_ticket_no,
  vpc_txn_response_code,
  vpc_version
) {
  return Object.freeze(new HashKeyReq(again_link,
    title,
    vpc_access_code,
    vpc_amount,
    vpc_card_list,
    vpc_command,
    vpc_currency,
    vpc_customer_email,
    vpc_customer_id,
    vpc_customer_phone,
    vpc_locale,
    vpc_merch_txn_ref,
    vpc_merchant,
    vpc_order_info,
    vpc_return_url,
    vpc_secure_hash,
    vpc_ticket_no,
    vpc_txn_response_code,
    vpc_version));
}
