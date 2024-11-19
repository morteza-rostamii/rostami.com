import React from "react";
import { notFound } from "next/navigation";
// force the page to be on dynamic rendering mode
// for when there is a need for have fresh data consistently
export const dynamic = "force-dynamic";

async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

async function BlogsPage() {
  const data = await fetchData();
  //throw new Error("error");
  //notFound();
  return (
    <div>
      <div>BlogHome</div>
    </div>
  );
}

export default BlogsPage;
