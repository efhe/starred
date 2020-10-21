import React, { useCallback, useEffect, useState } from "react";
import Repositories from "../components/Repositories";
import { gql, useQuery } from "@apollo/client";
import { IRepository } from "../components/Repository";

const GET_STARRED_REPOSITORIES = gql`
  query($cursor: String, $first: Int = 10) {
    viewer {
      starredRepositories(first: $first, after: $cursor) {
        totalCount
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            id
            name: nameWithOwner
            owner {
              login
              avatarUrl
            }
            forkCount
            description
            url
            stargazerCount
          }
        }
      }
    }
  }
`;

function StarredRepositories() {
  const [total, setTotal] = useState(0);
  const [variables, setVariables] = useState({ first: 10 });
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const { data, loading } = useQuery(GET_STARRED_REPOSITORIES, { variables });

  const handleLoadMore = useCallback(() => {
    if (data?.viewer?.starredRepositories) {
      const { totalCount = 0, pageInfo } = data.viewer.starredRepositories;
      setVariables((prevVariables) => ({
        ...prevVariables,
        cursor: pageInfo.endCursor,
      }));
      setTotal(totalCount);
    }
  }, [data]);

  const handleSetStarred = useCallback((id) => {
    // setData((prevData: IRepository[]) => {
    //   const isFilled = prevData.find((item) => item.id === id);
    //   return {
    //     ...prevData,
    //     [id]: !isFilled,
    //   };
    // });
  }, []);

  useEffect(() => {
    if (Array.isArray(data?.viewer?.starredRepositories?.edges)) {
      setRepositories((prevRepositories: IRepository[]) => {
        const nextRepositories = [...prevRepositories];
        for (const edges of data.viewer.starredRepositories.edges) {
          nextRepositories.push({
            ...((edges && edges.node) || {}),
            loading: false,
            starred: true,
          });
        }
        return nextRepositories;
      });
    }
  }, [data]);

  return (
    <Repositories
      data={repositories}
      total={total}
      loading={loading}
      onLoadMore={handleLoadMore}
      onSetStarred={handleSetStarred}
    />
  );
}

export default StarredRepositories;
