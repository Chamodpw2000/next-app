import Image from "next/image";
import Link from "next/link";
import CardProduct from "./components/CardProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const sessions = await getServerSession(authOptions);
  return (
    <main>
      <h1>
        Hello {sessions?.user?.name} {sessions?.user?.email}
      </h1>
      <Link  href="/users">Users</Link>
      <CardProduct />
    </main>
  );
}
