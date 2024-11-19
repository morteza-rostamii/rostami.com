import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-24">
      <p className="bg-red-200">Hello</p>
      <Button colorScheme="orange">click</Button>
      <Link href={"/blogs"}>blogs</Link>
    </main>
  );
}
