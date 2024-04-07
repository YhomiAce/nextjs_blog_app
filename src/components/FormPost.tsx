"use client";

import { PostFormType } from "@/types/PostFormType";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from "./Spinner";

interface FormPostProps {
  submit: SubmitHandler<PostFormType>;
  isEdting?: boolean;
  initialValue?: PostFormType;
  isLoading: boolean;
}

const FormPost: FC<FormPostProps> = ({
  submit,
  isEdting,
  initialValue,
  isLoading,
}) => {
  const { register, handleSubmit } = useForm<PostFormType>({
    defaultValues: initialValue,
  });
  const { data: tags, isLoading: isTagsLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });
  console.log({ tags });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <input
        type="text"
        placeholder="Post title.."
        className="input input-bordered w-full max-w-lg"
        {...register("title", { required: true })}
      />
      <textarea
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Post content.."
        {...register("content", { required: true })}
      ></textarea>
      {isTagsLoading ? (
        <Spinner />
      ) : (
        <select
          className="select select-bordered w-full max-w-lg"
          {...register("tag", { required: true })}
          defaultValue=""
        >
          <option disabled value="">
            Select tag
          </option>
          {tags &&
            tags.length > 0 &&
            tags.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      )}
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isLoading ? <Spinner /> : isEdting ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default FormPost;
