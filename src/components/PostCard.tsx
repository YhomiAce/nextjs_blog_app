import { Post } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

interface PostCardProps {
  post: {
    title: string;
    content: string;
    id: string;
    tag: {
      id: string;
      name: string;
    };
  };
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { id, title, content } = post;
  return (
    <div className="card w-full bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{content.slice(0, 20)}...</p>
        <div className="card-actions justify-end">
          <span className="badge badge-neutral">{post.tag.name}</span>
          <Link href={`/blog/${id}`} className="hover:underline">
            Read more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
