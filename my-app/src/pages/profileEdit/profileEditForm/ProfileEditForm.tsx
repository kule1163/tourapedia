import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FaUserCircle } from "react-icons/fa";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./FormValidation";
import NestedInput from "../../../components/handleFormInput/nestedInput/NestedInput";
import { Button } from "@mui/material";
import { editProfile } from "../../../features/auth/asyncThunks";
import InputError from "../../../components/handleFormInput/inputError/InputError";

interface Inputs {
  firstname: string;
  lastname: string;
  file: FileList;
}

interface ProfileEditFormProps {
  submit?: () => void;
}

const ProfileEditForm = ({ submit }: ProfileEditFormProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  const newPhoto = methods.watch("file");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { file, firstname, lastname } = data;

    const formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("profilePhoto", file[0]);

    dispatch(editProfile(formData));

    if (submit) {
      submit();
    }

    methods.reset();
  };

  useEffect(() => {
    if (user) {
      methods.setValue("firstname", user.firstname);
      methods.setValue("lastname", user.lastname);
    }
  }, [user]);

  return (
    <>
      {user && (
        <>
          <div className="sign-box">
            {newPhoto && newPhoto.length > 0 ? (
              <img
                className="profile-photo"
                src={URL.createObjectURL(newPhoto[0])}
              />
            ) : user.profilePhoto.public_id !== "default" ? (
              <img className="profile-photo" src={user.profilePhoto.url} />
            ) : (
              <FaUserCircle style={{ width: 40, height: 40 }} />
            )}
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
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
              <div className="half-box">
                <div className="input-box">
                  <NestedInput
                    label="First Name"
                    name="firstname"
                    type="text"
                    errorMessage={methods.formState.errors?.firstname?.message}
                  />
                </div>
                <div className="input-box">
                  <NestedInput
                    errorMessage={methods.formState.errors?.lastname?.message}
                    label="Last Name"
                    name="lastname"
                    type="text"
                  />
                </div>
              </div>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                edit
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default ProfileEditForm;
