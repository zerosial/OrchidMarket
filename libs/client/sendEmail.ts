import MakeSignature from "@components/makeSignature";
const axios = require("axios").default;

export default function sendEmail(email: string, payload: string) {
  let resultCode = 404;
  const date = Date.now().toString();
  const accessKey = process.env.NAVER_ACCESS_KEY;
  const method = "POST";
  const url = "https://mail.apigw.ntruss.com/api/v1/mails";
  const signature = MakeSignature("/api/v1/mails", method);

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
      senderAddress: `${process.env.MYMAIL}`,
      title: `${email}님 반갑습니다. `,
      body: `로그인 인증 번호는 ${payload} 입니다.`,
      recipients: [
        {
          address: `${email}`,
          name: null,
          type: "R",
        },
      ],
      individual: true,
      advertising: false,
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
