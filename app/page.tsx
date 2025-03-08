import Image from "next/image";
import Link from "next/link";
import CardProduct from "./components/CardProduct";

export default function Home() {
  return (
    <main>
      <h1>
        Hello World !
      </h1>
      <Link  href="/users">Users</Link>
      <CardProduct />
    </main>
  );
}
