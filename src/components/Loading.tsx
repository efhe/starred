import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const indicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Loading() {
  return <Spin indicator={indicator} />;
}

export { Loading };
