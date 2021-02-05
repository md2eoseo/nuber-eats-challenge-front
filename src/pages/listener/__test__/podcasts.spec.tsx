import { ApolloProvider } from "@apollo/client";
import { RenderResult, waitFor } from "@testing-library/react";
import React from "react";
import { Podcasts } from "../podcasts";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import userEvent from "@testing-library/user-event";
import { GET_ALL_PODCASTS_QUERY } from "../podcasts";
import { render } from "../../../test-utils";

describe("<Podcasts />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    mockedClient = createMockClient();
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Podcasts />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Home | HostPod");
    });
  });

  // it("should link to podcast page", async () => {
  //   const { getByText, debug } = renderResult;
  //   const mockedQueryResponse = jest.fn().mockResolvedValue({
  //     data: {
  //       getAllPodcasts: {
  //         ok: true,
  //         error: "query-error",
  //         podcasts: [{ id: 1, title: "Title", category: "Comedy" }],
  //       },
  //     },
  //   });
  //   mockedClient.setRequestHandler(GET_ALL_PODCASTS_QUERY, mockedQueryResponse);
  //   await waitFor(() => {
  //     userEvent.click(getByText("Title"));
  //   });
  //   debug();
  // });
});
