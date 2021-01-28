import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import {
  createUserMutation,
  createUserMutationVariables,
} from "../__generated__/createUserMutation";
import { UserRole } from "../__generated__/globalTypes";
import logo from "../images/logo.svg";

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      ok
      error
    }
  }
`;

interface ICreateUserForm {
  email: string;
  password: string;
  role: UserRole;
  resultError?: string;
}

export const CreateUser = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<ICreateUserForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Host,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createUserMutation) => {
    const {
      createUser: { ok, error },
    } = data;
    if (ok) {
      history.push("/");
    }
  };
  const [createUserMutation, { data: createUserResult, loading }] = useMutation<
    createUserMutation,
    createUserMutationVariables
  >(CREATE_USER_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createUserMutation({
        variables: {
          createUserInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <div className="canvas">
      <Helmet>
        <title>Sign Up | HostPod</title>
      </Helmet>
      <div className="flex items-center w-full">
        <img src={logo} alt="logo" className="w-24" />
        <h1 className="ml-5 text-2xl font-bold">Sign Up</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-2 w-full"
      >
        <div className="w-11/12">
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />
        </div>
        <div className="w-11/12">
          <input
            ref={register({ required: "Password is required" })}
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input"
          />
        </div>
        <div className="w-10/12 grid grid-cols-2 my-2 rounded-xl border-2 h-12 bg-gray-50 overflow-hidden">
          {Object.keys(UserRole).map((role, index) => (
            <div
              key={index}
              className="parent flex justify-center items-center relative hover:bg-gray-200 hover:text-lg"
            >
              <input
                ref={register({ required: true })}
                type="radio"
                id={role}
                name="role"
                value={role}
                className="opacity-0 absolute w-full h-full"
              />
              <label
                htmlFor={role}
                className="w-full h-full flex justify-center items-center"
              >
                {role}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-2">
          {errors.email?.message ? (
            <FormError errorMessage={errors.email?.message} />
          ) : (
            errors.password?.message && (
              <FormError errorMessage={errors.password?.message} />
            )
          )}
          {createUserResult?.createUser.error && (
            <FormError errorMessage={createUserResult.createUser.error} />
          )}
        </div>
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText={"Sign Up"}
        />
      </form>
      <div className="mt-2">
        Already have an account?{" "}
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Login now
        </Link>
      </div>
    </div>
  );
};
