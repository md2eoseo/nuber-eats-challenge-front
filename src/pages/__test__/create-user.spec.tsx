import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { CREATE_USER_MUTATION } from "../create-user";
import { CreateUser } from "../create-user";
import { UserRole } from "../../__generated__/globalTypes";
import { render, waitFor, RenderResult } from "../../test-utils";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateUser />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    mockedClient = createMockClient();
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateUser />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Sign Up | HostPod");
    });
  });

  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);

    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/enter a valid email./i);

    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required./i);

    await waitFor(() => {
      userEvent.type(email, "this@will.work");
      userEvent.type(password, "1234");
      userEvent.clear(password);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required./i);
  });

  it("should submit form and call mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "test@test.com",
      password: "1234",
      role: UserRole.Host,
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: { createUser: { ok: true, error: "mutation-error" } },
    });
    mockedClient.setRequestHandler(
      CREATE_USER_MUTATION,
      mockedMutationResponse
    );
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      createUserInput: formData,
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(window.alert).toHaveBeenCalledWith("Create User Success!!");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
