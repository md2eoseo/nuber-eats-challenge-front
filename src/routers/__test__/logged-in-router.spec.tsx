import React from "react";
import { createMemoryHistory } from "history";
import { render, waitFor } from "../../test-utils";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ApolloProvider } from "@apollo/client";
import { Router } from "react-router-dom";
import { LoggedInRouter } from "../logged-in-router";

describe("<LoggedInRouter />", () => {
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    mockedClient = createMockClient();
  });

  it("renders Podcasts page", async () => {
    const history = createMemoryHistory();
    render(
      <ApolloProvider client={mockedClient}>
        <Router history={history}>
          <LoggedInRouter />
        </Router>
      </ApolloProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe("Home | HostPod");
    });
  });
});
