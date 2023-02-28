import React, { ReactElement } from "react";
const container = function (props: {
  children: React.ReactElement;
  isShow: boolean;
}) {
  if (props.isShow) {
    return <div>{props.children}</div>;
  } else {
    return null;
  }
};
export default container;
