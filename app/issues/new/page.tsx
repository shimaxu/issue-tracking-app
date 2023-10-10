"use client";
import "easymde/dist/easymde.min.css";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { IssueSchema } from "../IssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof IssueSchema>;

const IssueForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
  });

  const createIssue = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="max-w-lg m-5 space-y-4" onSubmit={createIssue}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button type="submit">Submit Issue</Button>
    </form>
  );
};

export default IssueForm;
