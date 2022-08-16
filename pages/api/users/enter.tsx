//import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import sendmessage from "@libs/client/sendMessage";

//mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  console.log(user);
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = sendmessage(phone, payload);

    /* const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: "+82" + String(phone).slice(1),
      from: process.env.TWILIO_PHONENUMBER,
      body: `로그인 토큰은 ${payload} 입니다.`,
    })*/
  } else if (email) {
    /*const email = await mail.send({
      from: "nico@nomadcoders.co",
      to: "nico@nomadcoders.co",
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email);*/
  }
  return res.json({
    ok: true,
  });
}

export default withHandler({ method: "POST", handler, isPrivate: false });
