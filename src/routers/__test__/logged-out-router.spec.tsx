import React from "react";
import { createMemoryHistory } from "history";
import { LoggedOutRouter } from "../logged-out-router";
import { render, waitFor } from "../../test-utils";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ApolloProvider } from "@apollo/client";
import { Router } from "react-router-dom";

describe("<LoggedOutRouter />", () => {
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    mockedClient = createMockClient();
  });

  it("renders Login page", async () => {
    const history = createMemoryHistory();
    render(
      <ApolloProvider client={mockedClient}>
        <Router history={history}>
          <LoggedOutRouter />
        </Router>
      </ApolloProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Login | HostPod");
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
