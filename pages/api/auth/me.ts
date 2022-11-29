import client from "../../libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../libs/server/withHandler";
import { withApiSession } from "../../libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { email, name },
  } = req;

  const currentUser = await client.user.findUnique({
    where: { id: user?.id },
  });

  if (email && email !== currentUser?.email) {
    const alreadyExists = Boolean(
      await client.user.findUnique({
        where: { email },
        select: { id: true },
      })
    );

    if (alreadyExists) {
      res.json({ ok: false, error: "Email already taken" });
    }

    await client.user.update({
      where: { id: user?.id },
      data: { email },
    });

    res.json({ ok: true });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
