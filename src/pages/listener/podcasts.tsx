import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { getAllPodcasts } from "../../__generated__/getAllPodcasts";

const GET_ALL_PODCASTS_QUERY = gql`
  query getAllPodcasts {
    getAllPodcasts {
      ok
      error
      podcasts {
        id
        title
        category
      }
    }
  }
`;

export const Podcasts = () => {
  const { data, loading } = useQuery<getAllPodcasts>(GET_ALL_PODCASTS_QUERY);
  console.log(data);
  return (
    <div>
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-10">
        {data?.getAllPodcasts.podcasts?.map(podcast => (
          <Link key={podcast.id} to={`/podcast/${podcast.id}`}>
            <div className="m-4 p-3 flex flex-col border-black border-2 rounded-md">
              <h3 className="text-xl font-medium">{podcast.title}</h3>
              <span className="border-t-2 border-gray-200 self-end">
                {podcast.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
