import React from "react";
//redux-toolKit
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchState,
  searchEnd,
} from "../store/counterSearch/counterSearch";
import { Button } from "antd";
const TestNode: React.FC = () => {
  const val = useSelector((store: { search }) => store.search);
  const dispatch = useDispatch();
  return <div></div>;
};
export default TestNode;
