/**
 * validate for IP Address, Netmask, subnet mask, fixed IP, Gateway,
 */
export const validateIpAddress = _ip => {
    console.log("[validations] validateIpAddress", _ip);
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        _ip
    );
};

/**
 * validate MAC Address
 * @param {mac_address} _mac
 */
export const validateMacAddress = _mac => {
    console.log("[validations] validateMacAddress", _mac);
    return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(_mac);
};

/**
 * validate Address Range: ip_address/number
 *  ip_address : Địa chỉ IP
    number : số từ 0-> 32
    ví dụ : 1.1.11.2/24
 * @param {mac_address} _mac 
 */
export const validateAddressRange = _addressRange => {
    console.log("[validations] validateAddressRange", _addressRange);
    if (!_addressRange) return false;
    const splits = _addressRange.split("/");
    if (splits.length != 2) return false;

    const ipAddress = splits[0];
    const _number = splits[1];

    if (!validateIpAddress(ipAddress)) return false;

    if (!Number.isInteger(parseInt(_number))) return false;
    if (isNaN(_number)) return false;
    if (parseInt(_number) < 0 || parseInt(_number) > 32) return false;

    return true;
};

/**
 * validate username setting
 * @param {username} _username
 */
export const validateUsername = _username => {
    console.log("[validations] validateUsername", _username);
    return /^([a-zA-Z0-9]+)$/.test(_username);
};

/**
 * validate number
 * @param {number} _number
 */
export const validateNumber = _number => {
    console.log("[validations] validateNumber", _number);
    return /^([0-9]+)$/.test(_number);
};
/**
 * validate port setting
 * @param {port} _port
 */
export const validatePort = _port => {
    if (parseFloat(_port) > 65535) return false;
    return true;
};

/**
 * format phone number
 * @param {phoneNumber} _phoneNumber
 */
export const formatPhoneNumber = _phoneNumber => {
    return _phoneNumber.replace("0", "+84");
};