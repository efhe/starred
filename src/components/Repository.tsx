import React, { useCallback } from "react";
import { List, Skeleton } from "antd";
import { ForkOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Action } from "./Action";
const { Item } = List;

export interface IRepository {
  id: string;
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  url?: string;
  image?: string;
  starred?: boolean;
}

export interface IRepositoryItem extends IRepository {
  loading?: boolean;
  onSetStar: (id: string, starred: boolean) => void;
}

export function Repository({
  id,
  name,
  description,
  stargazerCount,
  forkCount,
  url = "",
  image = "",
  loading = false,
  starred = false,
  onSetStar,
}: IRepositoryItem) {
  const handleSetStar = useCallback(() => {
    onSetStar(id, !starred);
  }, [onSetStar, id, starred]);

  return (
    <Item
      actions={[
        <Action
          label={stargazerCount}
          renderIcon={() => (starred ? <StarFilled /> : <StarOutlined />)}
          onClick={handleSetStar}
        />,
        <Action
          label={forkCount}
          renderIcon={() => <ForkOutlined />}
          onClick={handleSetStar}
        />,
      ]}
    >
      <Skeleton avatar title={false} loading={loading} active>
        <Item.Meta title={<a href={url}>{name}</a>} description={description} />
      </Skeleton>
    </Item>
  );
}
