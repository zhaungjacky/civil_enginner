import React, { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import { ProjectPlanStatusType } from "./project-file/ProjectPlanDetail";
import { ContractDataProps } from "./ContractPage";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

type StatisticProps = {
  contractData: ContractDataProps[];
  planStatusData: ProjectPlanStatusType & { [index: string]: any }[];
};

type statisticsColsType = {
  progressState: string;
  id: string;
  label: string;
  groupInCharge: string;
  departmentInCharge?: string;
};

type YDataType = {
  id: string;
  label: string;
  data: number[];
  stack: string;
  area: boolean;
};

const statisticsCols: statisticsColsType[] = [
  {
    progressState: "决策阶段",
    id: "gongsilixiang",
    label: "立项",
    departmentInCharge: "需求部门",
    groupInCharge: "需求部门/项目公司",
  },
  {
    progressState: "决策阶段",
    id: "gongyibujudingban",
    label: "工艺布局",
    departmentInCharge: "资源/研究院-业务人员",
    groupInCharge: "资源与工程事业部",
  },
  {
    progressState: "决策阶段",
    id: "keyanzhaobiao",
    label: "可研招标",
    departmentInCharge: "业务人员",
    groupInCharge: "资源与工程事业部/项目公司",
  },
  {
    progressState: "决策阶段",
    id: "touweihui",
    label: "投委会",
    departmentInCharge: "运营-业务人员",
    groupInCharge: "运营中心",
  },
  {
    progressState: "决策阶段",
    id: "gongsijuece",
    label: "公司总办/党委/董事会决策完成",
    departmentInCharge: "运营-业务人员",
    groupInCharge: "运营中心",
  },
  {
    progressState: "决策阶段",
    id: "gudong_jituanbeian",
    label: "集团备案",
    departmentInCharge: "运营-业务人员",
    groupInCharge: "运营中心",
  },
  {
    progressState: "准备阶段",
    id: "zhengfulixiang",
    label: "发改委立项",
    departmentInCharge: "业务人员",
    groupInCharge: "资源与工程事业部/项目公司",
  },
  {
    progressState: "准备阶段",
    id: "dikancehui",
    label: "地勘测绘",
    departmentInCharge: "地勘单位",
    groupInCharge: "资源与工程事业部/项目公司",
  },
  {
    progressState: "准备阶段",
    id: "tudizheng",
    label: "土地证办理",
    departmentInCharge: "业务人员/项管公司",
    groupInCharge: "项目公司",
  },
  {
    progressState: "准备阶段",
    id: "yongdiguihua",
    label: "用地规划证",
    departmentInCharge: "业务人员/项管公司",
    groupInCharge: "项目公司",
  },
  {
    progressState: "准备阶段",
    id: "zhaobiaodaili",
    label: "招标代理单位",
    departmentInCharge: "业务人员",
    groupInCharge: "资源与工程事业部/项目公司",
  },
  {
    progressState: "准备阶段",
    id: "shigongfang_zhaobiao",
    label: "设计/施工方招标",
    departmentInCharge: "业务人员",
    groupInCharge: "源与工程事业部/项目公司",
  },
  {
    progressState: "准备阶段",
    id: "chubusheji",
    label: "初步设计",
    departmentInCharge: "业务人员",
    groupInCharge: "设计院",
  },
  {
    progressState: "准备阶段",
    id: "shigongtu",
    label: "施工图设计",
    departmentInCharge: "业务人员",
    groupInCharge: "设计院",
  },
  {
    progressState: "准备阶段",
    id: "gongchengguihua",
    label: "项目规划证",
    departmentInCharge: "业务人员/项管公司",
    groupInCharge: "项目公司",
  },
  {
    progressState: "准备阶段",
    id: "jianlizhaobiao",
    label: "监理招标",
    departmentInCharge: "业务人员",
    groupInCharge: "源与工程事业部/项目公司",
  },
  {
    progressState: "准备阶段",
    id: "xiangguanzhaobiao",
    label: "项管招标",
    departmentInCharge: "业务人员",
    groupInCharge: "源与工程事业部/项目公司",
  },
  {
    progressState: "准备阶段",
    id: "shigongxukezheng",
    label: "施工许可证",
    departmentInCharge: "业务人员/项管公司",
    groupInCharge: "项目公司",
  },
  {
    progressState: "施工阶段",
    id: "jichu",
    label: "基础处理",
    departmentInCharge: "施工方",
    groupInCharge: "施工方",
  },
  {
    progressState: "施工阶段",
    id: "gangjiegou_zhizuo",
    label: "钢结构制作",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "gangjiegou_anzhuang",
    label: "钢结构安装",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "gangjiegou_weihu",
    label: "钢结构维护",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "diping_chuli",
    label: "地坪处理",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "diaochejichu_chuli",
    label: "吊车基础处理",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "angmian_wumianban",
    label: "墙面/屋面安装",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "peidianxitong",
    label: "配电系统",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "xiaofangxitong",
    label: "消防系统",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "yuwuchulixitong",
    label: "雨水/污水处理系统",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "gufeizhan",
    label: "固废站",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "qitafushu_sheshi",
    label: "其他附属设施",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
  {
    progressState: "施工阶段",
    id: "diaoche_shebei_anzhuang",
    label: "吊车/设备安装",
    departmentInCharge: "施工方",
    groupInCharge: "施工方/资源/项目公司",
  },
];

const StatisticsChart = () => {
  const { data } = useFetch<StatisticProps>("api/statistics");
  const [planYData, setPlanYData] = useState<YDataType[] | null>(null);
  const [xlabels, setXlabels] = useState<string[] | null>(null);

  useEffect(() => {
    let tmpXlabels: string[] = [];

    statisticsCols.forEach((col, index) => {
      tmpXlabels.push(col.label);
      return null;
    });
    setXlabels(tmpXlabels);

    let yData: YDataType[] = [];

    if (data?.planStatusData) {
      data.planStatusData.forEach((item, index) => {
        let sum: YDataType = {
          id: index.toString(),
          label: item.project_name,
          data: [],
          stack: "",
          area: false,
        };

        Object.keys(item).forEach((key) => {
          if (key.includes("_status")) {
            // console.log(item[key])
            if (item[key]) {
              sum.data.push(1);
            } else {
              sum.data.push(0);
            }
          }
          return null;
        });
        yData.push(sum);
        return null;
      });
    }
    setPlanYData(yData);
  }, [data?.planStatusData]);

  // console.log(planYData)
  // console.log(xlabels)
  return (
    <Container>
      <Typography sx={{ mt: 2 }}>基地建设进度表</Typography>
      {planYData ? (
        <BarChart
          xAxis={[
            {
              id: "step",
              data: xlabels ? xlabels : ["", ""],
              scaleType: "band",
            },
          ]}
          series={planYData}
          sx={{
            "--ChartsLegend-itemWidth": "200px",
          }}
          width={800}
          height={400}
          margin={{ left: 30 }}
        />
      ) : null}
    </Container>
  );
};

export default StatisticsChart;
