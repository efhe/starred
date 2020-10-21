import React from "react";
import { Button, List } from "antd";
import { Repository, IRepository } from "./Repository";

interface IRepositories {
  total: number,
  data: IRepository[];
  loading: boolean;
  onLoadMore: () => void;
  onSetStarred: (id: string, starred: boolean) => void;
}

function Repositories({
  data,
  total,
  loading,
  onSetStarred,
  onLoadMore,
}: IRepositories) {
  const loadMore = total !== data.length && !loading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={onLoadMore}>+mas</Button>
    </div>
  ) : null;

  return (
    <List
      dataSource={data}
      loadMore={loadMore}
      itemLayout="horizontal"
      renderItem={(item) => (
        <Repository {...item} onSetStar={onSetStarred} />
      )}
    />
  );
}

export default Repositories;
