import React, { ReactNode } from "react";
interface b {
  isShow: boolean;
  children: ReactNode;
}
const TestNode2: React.FC<b> = ({ isShow, children }) => {
  return isShow ? <>{children}</> : null;
};
const TestNode: React.FC = () => {
  return (
    <div>
      <TestNode2 isShow={true}>
        <div>x</div>
      </TestNode2>
    </div>
  );
};
export default TestNode;
