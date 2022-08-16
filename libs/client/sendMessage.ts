import crypto from "crypto-js";
const axios = require("axios").default;

export default function sendmessage(phone: string, payload: string) {
  let resultCode = 404;
  const date = Date.now().toString();
  const uri = process.env.NAVER_ID;
  const secretKey = process.env.NAVER_ACCESS_SECRIT_KEY;
  const accessKey = process.env.NAVER_ACCESS_KEY;
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  const hmac = crypto.algo.HMAC.create(crypto.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(crypto.enc.Base64);
  axios({
    method: method,
    url: url,
    headers: {
      "Contenc-type": "application/json; charset=utf-8",
      "x-ncp-iam-access-key": accessKey,
      "x-ncp-apigw-timestamp": date,
      "x-ncp-apigw-signature-v2": signature,
    },
    data: {
      type: "SMS",
      countryCode: "82",
      from: "01020866423",
      content: `로그인 인증 키는 ${payload} 입니다.`,
      messages: [{ to: `${phone}` }],
    },
  })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err);
    });

  return resultCode;
}
