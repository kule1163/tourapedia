import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../../features/posts/asyncThunks";
import NestedInput from "../../../components/handleFormInput/nestedInput/NestedInput";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { categories } from "../../../utils/pages/filteredPost/categories";
import {
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { schema } from "./FormValidation";
import { EntitieProps } from "../../../features/posts/types";
import InputError from "../../../components/handleFormInput/inputError/InputError";

export interface Inputs {
  title: string;
  description: string;
  tags: string;
  category: string;
  file: FileList;
}

interface AddTourFormProps {
  addPost?: () => void;
  editPost?: () => void;
  currentPost?: EntitieProps | null;
}

const AddTourForm = ({ addPost, currentPost, editPost }: AddTourFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(currentPost);

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { category, description, file, tags, title } = data;

    const formData = new FormData();
    formData.append("category", category);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("postImage", file[0]);
    tags.split(",").forEach((tag) => formData.append("tags[]", tag));

    if (currentPost) {
      dispatch(updatePost({ formData, id: currentPost._id, navigate }));
      methods.reset();
      if (editPost) {
        editPost();
      }
    } else {
      dispatch(createPost({ formData, navigate }));
      methods.reset();
      if (addPost) {
        addPost();
      }
    }
  };

  return (
    <div className="log-reg-container">
      <div className="log-reg-box">
        <div className="sign-box">
          <Typography>{currentPost ? "Update Tour" : "Add Tour"}</Typography>
        </div>
        <FormProvider {...methods}>
          <form
            method="POST"
            encType="multipart/form-data"
            data-testid="form"
            className="form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="input-box">
              <NestedInput
                errorMessage={methods.formState.errors?.title?.message}
                label="Enter Title"
                type="text"
                name="title"
              />
            </div>
            <div className="input-box">
              <NestedInput
                errorMessage={methods.formState.errors?.tags?.message}
                label="Enter Tags"
                type="text"
                name="tags"
              />
            </div>
            <div className="input-box">
              <Controller
                control={methods.control}
                name="category"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <FormControl>
                    <InputLabel id="demo-select-small">Category</InputLabel>
                    <Select
                      data-testid="category"
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={value}
                      label="category"
                      onChange={onChange}
                    >
                      {categories.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          <Typography>{item.label}</Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <InputError
                errorMessage={methods.formState.errors?.category?.message}
              />
            </div>
            <div className="input-box">
              <TextareaAutosize
                data-testid="description"
                className="text-area"
                placeholder="Enter Description"
                minRows={5}
                {...methods.register("description")}
              />
              <InputError
                errorMessage={methods.formState.errors?.description?.message}
              />
            </div>
            <div className="input-box">
              <input
                data-testid="file"
                type="file"
                {...methods.register("file")}
              />
              <InputError
                errorMessage={methods.formState.errors?.file?.message}
              />
            </div>
            <Button variant="contained" type="submit" fullWidth color="primary">
              {currentPost ? "Update Tour" : "Add Tour"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddTourForm;
