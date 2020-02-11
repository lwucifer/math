class Signup {
  constructor(phone, password, name, province_id) {
    this.phone = phone;
    this.password = password;
    this.name = name;
    this.province_id = province_id;
  }
}

export function createSignup(phone, password, name, province_id) {
  return Object.freeze(new Signup(phone, password, name, province_id));
}
