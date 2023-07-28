import AES from 'crypto-js/aes'
import EncUTF8 from 'crypto-js/enc-utf8'
import MODE_ECB from 'crypto-js/mode-ecb'
import PAD_PKCS7 from 'crypto-js/pad-pkcs7'
// 密钥对生成: http://web.chacuo.net/netrsakeypair or https://www.bejson.com/math/hex_gen/

const SECRET_KEY = 'f4wjsudffd34er26'
// 偏移量 16位（不可随意修改，否则前后端加密解密可能失败）
const SECRET_IV = '0000000000000000'

export function encrypt(word) {
  return AES.encrypt(EncUTF8.parse(word), EncUTF8.parse(SECRET_KEY), {
    iv: EncUTF8.parse(SECRET_IV),
    mode: MODE_ECB,
    padding: PAD_PKCS7
  }).toString()
}

export function decrypt(word) {
  const decrypted = AES.decrypt(word, EncUTF8.parse(SECRET_KEY), {
    mode: MODE_ECB,
    padding: PAD_PKCS7
  })
  return decrypted.toString(EncUTF8).toString()
}
