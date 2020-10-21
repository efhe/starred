import React from "react";

export interface IAction {
  label: string | number;
  renderIcon: () => React.ReactElement,
  onClick: ()=> void;
}

export function Action({ label, renderIcon, onClick }: IAction) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
      onClick={onClick}
    >
      {renderIcon()}
      <h4 style={{ textAlign: "center" }}>{label}</h4>
    </div>
  );
}
