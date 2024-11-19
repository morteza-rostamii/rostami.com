<!--

# next js data fetching:
==

# basic server-side data fetching
# next js catches data by default
  # meaning as long you hit the same url: next uses the cached data!!

async function fetchData() {
  const response = await fetch(url);
  return response.json();
}

async function Component() {
  // data is not cached by default
  const data = await fetchData();
}

===========================================

# time based revalidation
fetch("url", {next: {revalidate: 3600}}) // cacheTime

# revalidate all request in a page or layout
// layout.ts or page.tsx

# export
export const revalidate = 3600;

==========================================

# revalidate on demand: by tag

# basically you can name any request and revalidate based on name.

# tag the request
const response = await fetch("https://...", {
  next: {tags: ['posts']}
});

# now we can make the decision of revalidation inside the route: (request)
import {revalidateTag} from "next/cache"

// /app/api
export async function GET(request: NextRequest) {

  // get the tag: comes as urlParam : /revalidate?tag=posts
  const tag = request.nextUrl.searchParams.get("tag");
  revalidateTag(tag);

  return NextResponse.json({
    revalidated: true, now: Date.now(),
  })
}

# revalidate the whole path
import {revalidatePath} from "next/cache"

const path = request.nextUrl.searchParams.get("path");
revalidatePath(path);

## if revalidate failed =: last cached data will be served through response.

==========================================

# no cache

fetch(url, {cache: "no-store"})
or
fetch(url, {revalidate: 0})

or
export const dynamic = "auto"; // within page.tsx or layout.tsx

==========================================

# SSG =: static generation
  # one time build happens =: then page is cached and served each time.

# ISR: incremental static regeneration
  # still static! but: revalidate with dynamic DB data every 10 second or so!

----------
# Next.js uses static rendering by default for server components unless there’s a reason to make the page dynamic.
  # If a page doesn’t rely on any dynamic data—like cookies, headers, or query parameters—Next.js will statically render the page.
  # dynamic elements that might change for each user or request

# examples of dynamic:
  # Cookies: Used to manage user sessions or preferences.
  # Headers: Often contain information about the user’s request, such as user-agent or referer.
  #Query parameters (searchParams): These allow you to change the page’s content based on URL parameters.

# If a page uses any of these dynamic elements, it will render dynamically on each request to ensure the data is fresh and specific to each request.
====================

# server data fetching with a lib: no fetch-api

import {cache} from "react"

// revalidate
export const revalidate = 3600;

// just pass your async function within cache()
export const getItem = cache(async (id:string) => {
  const item = await db.item.findUnique({id});

  return item;
})

===================

# let's say we have 2 components
# and you want to have access to posts data you fetch in both
# fetching posts in both and next js only does one request anyways

async function fetchPosts() {
  const response = await fetch();
  return response.json();
}

async function Compo1() {
  const posts = await fetchPosts();

}

async function Compo2() {
  cons posts = await fetchPosts();
}
=====================

# parallel fetching
# sequential fetching

export default async function Page({
  params: {username},
}) {

  # if: you await each it will create a waterfall effect
    # meaning it first show artist then albums =: delay in ui
  const artistPromise = getArtist(username);
  const albumsPromise = getArtistAlbums(username);

  // now await both promises
  const [artist, albums] = await Promise.all([artistPromise, albumsPromise]);

  // we can use the data after both promises are resolved
  return (
    <div>
      <h1>{artist.name}</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.name}</li>
        ))}
      </ul>
    </div>)
}

=================================

=====================
# cache data coming from db

const getPosts = unstable_cache(
  async () => await db.select().from(posts),
  ['posts'], // Cache key
  { revalidate: 3600, tags: ['posts'] }
);

export default async function Page() {
  const allPosts = await getPosts();
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

==================

# cache data across requests:

async function getPost(id: string) {
  let res = await fetch(`https://api.vercel.app/blog/${id}`, {
    cache: 'force-cache',
  });
  return await res.json();
}

=================

# fetch api =: base url
function fetchWithBaseURL(url, options = {}) {
  // Prepend the base URL to the requested URL
  const fullUrl = baseURL + url;

  // Call the native fetch with the full URL
  return fetch(fullUrl, options);
}

===================





-->
