import React, { ReactElement } from "react";
const container = function (props: {
  children: React.ReactElement;
  isShow: boolean;
  style?:{}
}) {
  if (props.isShow) {
    return <div style={props.style}>{props.children}</div>;
  } else {
    return null;
  }
};
export default container;
