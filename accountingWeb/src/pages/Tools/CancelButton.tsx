import { Button } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchEnd } from "../../store/counterSearch/counterSearch";
import Container from "./Container";
interface item {
  isSow: boolean;
  name: string;
}
const CancelButton: React.FC<item> = ({ isSow, name }) => {
  const dispatch = useDispatch();
  return (
    <Container isShow={isSow}>
      <Button
        style={{ float: "left", translate: "0 -10%" }}
        type="text"
        danger
        onClick={() => {
          dispatch(searchEnd({ name: name, rule: "" })),
            console.log("search ENd");
        }}
      >
        取消查询
      </Button>
    </Container>
  );
};
export default CancelButton;
