import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.CLIENT_ID);

export const authGoogle = async (req, res) => {
  const { token }  = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const info = ticket.getPayload();
  // const user = await db.user.upsert({ 
  //     where: { email: email },
  //     update: { name, picture },
  //     create: { name, email, picture }
  // });
  console.log(info);
  res.status(201);
  res.json(info);
}
