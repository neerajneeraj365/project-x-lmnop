import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export const dynamic = "force-dynamic";

export async function testFunction() {
  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testUser@example.com",
    },
  });

  return NextResponse.json({ message: "Event sent!" });
}
