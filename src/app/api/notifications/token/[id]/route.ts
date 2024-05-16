import { NextRequest, NextResponse } from "next/server";
import PushNotifications from "@pusher/push-notifications-server";

const beamsClient = new PushNotifications({
  instanceId: <string>process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID,
  secretKey: <string>process.env.PUSHER_BEAMS_INSTANCE_PRIMARY_KEY,
});

async function getToken(
  request: Request,
  { params }: { params: { id: string } },
  req: NextRequest,
  res: NextResponse
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "Falta id del usuario" },
      { status: 400 }
    );
  }

  const beamsToken = beamsClient.generateToken(id);

  return NextResponse.json({ ...beamsToken }, { status: 200 });
}

export { getToken as GET };
