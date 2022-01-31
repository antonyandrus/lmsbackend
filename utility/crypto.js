"use strict";

const CryptoJS = require("crypto-js");

module.exports = {
  aesEncrypt: aesEncrypt,
  aesDecrypt: aesDecrypt,
};

function aesEncrypt(content) {
  const parsedkey = CryptoJS.enc.Utf8.parse(process.env.SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(process.env.SECRET_IV);
  const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

function aesDecrypt(word) {
  var keys = CryptoJS.enc.Utf8.parse(process.env.SECRET_KEY);
  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}
