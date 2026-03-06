import { auth } from "@clerk/nextjs/server";
import SignedOutHome from "@/components/global/SignedOutHome";
import SignedInHome from "@/components/global/SignedInHome";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    return <SignedInHome />;
  } else {
    return <SignedOutHome />;
  }
}
