import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";

async function getPosts() {
  const response = await db.post.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      content: true,
      id: true,
      title: true,
      tag: true
    }
  });
  return response;
}

export default async function Home() {
  const posts = await getPosts();
  console.log({ posts });

  return (
    <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {posts.map((item) => (
        <PostCard key={item.id} post={item} />
      ))}
    </main>
  );
}
