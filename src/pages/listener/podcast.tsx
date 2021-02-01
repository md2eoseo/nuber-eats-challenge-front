import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  getPodcast,
  getPodcastVariables,
} from "../../__generated__/getPodcast";

const GET_PODCAST_QUERY = gql`
  query getPodcast($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        id
        title
        category
        episodes {
          id
          title
          category
        }
      }
    }
  }
`;

interface IPodcastParams {
  podcastId: string;
}

export const Podcast = () => {
  const params = useParams<IPodcastParams>();
  const { data, loading } = useQuery<getPodcast, getPodcastVariables>(
    GET_PODCAST_QUERY,
    { variables: { input: { id: +params.podcastId } } }
  );
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>{`${data?.getPodcast.podcast?.title} | HostPod`}</title>
      </Helmet>
      <h2>{data?.getPodcast.podcast?.title}</h2>
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-10">
        {data?.getPodcast?.podcast?.episodes.map(episode => (
          <div
            key={episode.id}
            className="m-4 p-3 flex flex-col border-black border-2 rounded-md"
          >
            <h3 className="text-xl font-medium">{episode.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
