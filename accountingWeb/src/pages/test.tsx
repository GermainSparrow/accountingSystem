import React from "react";
//redux-toolKit
import { useSelector, useDispatch } from "react-redux";
import { setSearchState,searchEnd } from "../store/counterSearch/counterSearch";
import { Button } from "antd";
const TestNode: React.FC = () => {
  const val = useSelector((store: { search }) => store.search);
  const dispatch = useDispatch();
  return (
    <div>
      {val[0].data}
      <Button
        onClick={() => {
          dispatch(
            setSearchState({ name: "financial", data: [1, 2, 3, 4, 5] })
          );
        }}
      >
        点击修改正负
      </Button>
    </div>
  );
};
export default TestNode;
