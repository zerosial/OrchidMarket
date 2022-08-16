import MakeSignature from "@components/makeSignature";
const axios = require("axios").default;

export default function sendmessage(phone: string, payload: string) {
  let resultCode = 404;
  const date = Date.now().toString();
  const smsId = process.env.NAVER_ID;
  const accessKey = process.env.NAVER_ACCESS_KEY;
  const method = "POST";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${smsId}/messages`;
  const signature = MakeSignature({
    url: `/sms/v2/services/${smsId}/messages`,
    method,
  });

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
      from: `${process.env.MYPHONE}`,
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
