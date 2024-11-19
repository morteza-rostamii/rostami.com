<!--
# during chakraui installation had to role back chakraui to 2

npm install @chakra-ui/react@^2

=============================================

# all pages are server-side rendered by default, unless explicitly marked with "use client"

=============================================
# types of routes
  # nested routes
    # /blog/first-post
  # dynamic routes
    # /blog/[slug]
  # nested dynamic routes
    # /blogs/[slug]/comments/[commentId]

# catch all segments
  /docs/[...slug]
  # catches all segments after the first segment /docs
  # /docs/section1/concept1

# use it

export default function Docs({params}: {params: {slug: string[]}}) {
  return <div>Docs</div>;
}

=============================================

# not-found
# for each route we can have not-found.tsx
import { notFound } from "next/navigation";

# then call this : notFound(); if there is no data

=============================================

# File Colocation
page.tsx => export default function =: is the page component

=============================================

# just put a underscore before the file name
# /app/_test => is not a route

=============================================

# route groups:

/(auth)/login/page.tsx

=============================================



-->
