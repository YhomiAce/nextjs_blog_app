"use client";

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { PostFormType } from "@/types/PostFormType";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

export default function CreatePage() {
  const router = useRouter();
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (newPost: PostFormType) => {
      const res = await axios.post("/api/posts/create", newPost);
      return res;
    },
  });
  const submit: SubmitHandler<PostFormType> = (data) => {
    console.log(data);
    createPost(data, {
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
    });
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">Add new post</h1>
      <FormPost submit={submit} isLoading={isPending} />
    </div>
  );
}
