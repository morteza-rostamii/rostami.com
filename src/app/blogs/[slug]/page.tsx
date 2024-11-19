import React from "react";

const BlogPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <div>BlogPage</div>
      <div>slug: {params.slug}</div>
    </div>
  );
};

export default BlogPage;
