import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { withApiSession } from "../../libs/server/withSession";
import withHandler from "../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ ok: false });
  }

  const exists = await client.user.findUnique({
    where: { email },
  });

  if (exists) {
    return res.status(200).end();
  }

  await client.user.create({
    data: { name, email },
  });

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
