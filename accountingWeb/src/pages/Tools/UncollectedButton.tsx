/**
 * @param {string} isShow - 依赖于redux中uncollected的isShow
 * @param {string} data - 依赖于redux中uncollected的data
 */
import PropTypes from "prop-types";
import { Button } from "antd";
import Container from "./Container";
import { useDispatch } from "react-redux";
import { setUncollected } from "../../store/UncolletControl/index";
interface items {
  isShow: boolean;
  data: any[];
  name: string;
  exit: boolean;
}

const UncollectedButton: React.FC<items> = ({ isShow, data, name, exit }) => {
  const dispatch = useDispatch();
  return (
    <Container isShow={exit}>
      <div>
        <Button
          onClick={() => {
            dispatch(setUncollected({ data, name }));
          }}
          style={{
            position: "absolute",
            top: "11.9%",
          }}
        >
          {isShow ? "点击展示全部数据" : "点击展示未收款"}·
        </Button>
        <Container isShow={isShow}>
          <span style={{ position: "absolute", top: "13%", left: "24%",fontSize:'12px',color:'red'}}>
            全部未收款金额是
            {name=='oil'?(data.reduce((previousVal, currentVal) => {
              return (previousVal += currentVal.Uncollected_amount);
            }, 0)):data.reduce((previousVal, currentVal) => {
              return (previousVal += currentVal.Collection -currentVal.cost);
            }, 0)}
          </span>
        </Container>
      </div>
    </Container>
  );
};
UncollectedButton.propTypes = {
  /** 传入isShow redux对应的isShow */
  isShow: PropTypes.bool,
  /** 传入data redux对应的data */
  data: PropTypes.array,
  /** 传入name redux对应的name */
  name: PropTypes.string,
  /** 传入exit redux对应的exit */
  exit: PropTypes.bool,
};
export default UncollectedButton;
