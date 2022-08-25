const crypto = require('crypto');

export function encryptedPassword(password: string, complement?) {
    let salt = complement || crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    let datos = { salt: salt, hash: hash, clave: password };
    return datos;
}