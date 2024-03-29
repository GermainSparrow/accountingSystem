import { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Radio, Spin } from "antd";
import useFetch, { CachePolicies } from 'use-http'
export const AntG2 = function () {
  const { get, post } = useFetch('', { cachePolicy: CachePolicies.NO_CACHE })
  //默认选中financial
  const [selectMenu, setSelectMenu] = useState("financial");
  //默认为空数组
  const [data, setData] = useState([]);
  //默认为显示正值
  const [selectedKey, setSelectedKey] = useState(1);
  //默认柱状图的设置应当如下
  const [config, setConfig]: any = useState({
    data: data,
    isGroup: true,
    xField: "month",
    yField: "count",
    seriesField: "name",

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "bottom",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  });
  useEffect(() => {
    getVisualData("financial", 1);
  }, []);

  //封装一下设置数据源的方法
  const getVisualData = (m: string, show: number) => {
    const promise = (() => {
      switch (m) {
        case 'oil':
          return get('/oil/getVisualData');
        case 'waveBox':
          return get('/waveBox/getVisualData');
        case 'financial':
          return get('/financial/getVisualData');
        default:
          return null;
      }
    })
    promise().then((res: { data: { count: number }[] }) => {
      //根据selectKey决定表格显示正负
      switch (show) {
        case 1:
          setConfig(() => {
            let temp = { ...config };
            temp.data = res.data.filter((item, index) => item.count > 0);
            return temp;
          });
          break;
        case 0: {
          setConfig(() => {
            let temp = { ...config };
            temp.data = res.data;
            return temp;
          });
          break;
        }
        case -1: {
          setConfig(() => {
            let temp = { ...config };
            temp.data = res.data.filter((item, index) => item.count < 0);
            return temp;
          });
          break;
        }
      }
    });
  };

  //切换表格
  async function changeMenu(e: string) {
    setSelectMenu(e);
    getVisualData(e, selectedKey);
  }
  //切换正反值
  function onChange(e: number) {
    setSelectedKey(e);
    getVisualData(selectMenu, e);
  }

  return (
    <div>
      {/* 选择显示的 */}
      <Radio.Group
        value={selectMenu}
        onChange={(e) => changeMenu(e.target.value)}
        style={{
          position: "relative",
          left: "50%",
          translate: "-70%",
          marginBottom: "16px",
        }}
      >
        <Radio.Button value="financial">备用金明细</Radio.Button>
        <Radio.Button value="oil">油品销售表</Radio.Button>
        <Radio.Button value="waveBox">波箱维修表</Radio.Button>
      </Radio.Group>
      {/* 表选择按钮 */}
      <Radio.Group
        value={selectedKey}
        onChange={(e) => onChange(e.target.value)}
        style={{
          display: "flex",
          marginRight: "10px",
          position: "absolute",
          top: "100px",
          left: "90%",
          width: "50px",
          zIndex: "99999",
        }}
      >
        <Radio.Button value={1}>+</Radio.Button>
        <Radio.Button value={-1}>-</Radio.Button>
        <Radio.Button value={0}>总</Radio.Button>
      </Radio.Group>
      <Column {...config} />{" "}
    </div>
  );
};


