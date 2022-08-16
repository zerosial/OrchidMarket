import crypto from "crypto-js";

export default function MakeSignature(url, method) {
  const date = Date.now().toString();
  const space = " ";
  const newLine = "\n";
  const secretKey = process.env.NAVER_ACCESS_SECRIT_KEY;
  const accessKey = process.env.NAVER_ACCESS_KEY;
  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();

  return hash.toString(crypto.enc.Base64);
}
