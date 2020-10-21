import React, { useCallback } from "react";
import { List, Skeleton } from "antd";
import { ForkOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { Action } from "./Action";

const { Item } = List;

export interface IRepository {
  id: string;
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  owner: {
    avatarUrl?: string;
  };
  url?: string;
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
  owner,
  url = "",
  loading = false,
  starred = false,
  onSetStar,
}: IRepositoryItem) {
  const handleSetStar = useCallback(() => {
    // onSetStar(id, !starred);
  }, []);

  const handleForkRepository = useCallback(() => {
    // onSetStar(id, !starred);
  }, []);

  return (
    <Item
      key={id}
      actions={[
        <Action
          label={stargazerCount}
          renderIcon={() => (starred ? <StarFilled /> : <StarOutlined />)}
          onClick={handleSetStar}
        />,
        <Action
          label={forkCount}
          renderIcon={() => <ForkOutlined />}
          onClick={handleForkRepository}
        />,
      ]}
    >
      <Skeleton avatar title={false} loading={loading} active>
        <Item.Meta
          avatar={<Avatar src={owner.avatarUrl} />}
          title={<a href={url}>{name}</a>}
          description={description}
        />
      </Skeleton>
    </Item>
  );
}
