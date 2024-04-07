"use client";

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import Spinner from "@/components/Spinner";
import { PostFormType } from "@/types/PostFormType";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

const EditBlogPage = ({ params }: EditBlogPageProps) => {
  const router = useRouter();
  const { data: post, isFetching } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axios.get(`/api/posts/${params.id}`);
      return res.data;
    },
  });

  const {mutate: updatePost, isPending} = useMutation({
    mutationFn: async (data: PostFormType) => {
      const res = await axios.patch(`/api/posts/${params.id}`, data);
      return res.data;
    }
  })

  console.log({ post });

  const submit: SubmitHandler<PostFormType> = (data) => {
    updatePost(data, {
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        router.push("/");
        router.refresh();
      }
    })
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">Edit post</h1>
      {isFetching ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <FormPost
          submit={submit}
          isEdting
          initialValue={{
            content: post.content,
            title: post.title,
            tag: post.tag.id,
          }}
          isLoading={isPending}
        />
      )}
    </div>
  );
};

export default EditBlogPage;
