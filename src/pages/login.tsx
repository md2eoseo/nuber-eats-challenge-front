import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constants";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import logo from "../images/logo.svg";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="canvas">
      <Helmet>
        <title>Login | HostPod</title>
      </Helmet>
      <img src={logo} alt="logo" className="w-48" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-4 w-full"
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
            className="input mb-6"
          />
        </div>
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText={"Login"}
        />
        <div className="mb-2">
          {errors.email?.message ? (
            <FormError errorMessage={errors.email?.message} />
          ) : (
            errors.password?.message && (
              <FormError errorMessage={errors.password?.message} />
            )
          )}
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </div>
      </form>
      <div className="mt-2">
        You don't have an account?{" "}
        <Link
          to="/create-user"
          className="text-sm text-blue-600 hover:underline"
        >
          Sign up now
        </Link>
      </div>
    </div>
  );
};
