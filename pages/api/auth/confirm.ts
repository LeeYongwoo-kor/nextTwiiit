import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { withApiSession } from "../../libs/server/withSession";
import withHandler from "../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ ok: false });
  }

  const exists = await client.user.findUnique({
    where: { email },
  });

  if (!exists) {
    return res.status(404).end();
  }

  req.session.user = {
    id: exists?.id,
  };
  await req.session.save();

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
