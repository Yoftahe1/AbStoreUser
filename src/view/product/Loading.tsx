import { Skeleton, Flex, Typography } from "antd";
import classes from "./product.module.css";

const { Title } = Typography;

const Loading = () => {
  return (
    <div className={classes.desc}>
      <Flex gap={16} className={classes.container}>
        <Skeleton title={{ className: classes.img }} paragraph={false} active />
        <Flex gap={16} style={{ width: "25%" }} vertical>
          <Skeleton
            title={{ className: classes.imgs }}
            paragraph={false}
            active
          />
          <Skeleton
            title={{ className: classes.imgs }}
            paragraph={false}
            active
          />
        </Flex>
      </Flex>
      <Flex vertical gap={14} className={classes.container}>
        <Skeleton
          active
          title={{ width: 250, style: { height: 40 } }}
          paragraph={false}
        />
        <Flex justify="space-between">
          <Skeleton
            active
            title={{ width: 150, style: { height: 30 } }}
            paragraph={false}
          />
          <Flex gap={10}>
            <Skeleton.Button active shape="round" style={{ width: 90 }} />
            <Skeleton.Button active shape="round" style={{ width: 90 }} />
          </Flex>
        </Flex>
        <Skeleton active paragraph={{ rows: 4 }} title={false} />
        <Flex gap={10}>
          <Title level={5} style={{ margin: 0 }}>
            Category:
          </Title>
          <Skeleton.Button active shape="round" style={{ width: 100 }} />
        </Flex>
        <Flex gap={10}>
          <Title level={5} style={{ margin: 0 }}>
            Select color:
          </Title>
          <Skeleton.Avatar active size={25} />
          <Skeleton.Avatar active size={25} />
        </Flex>
        <Flex gap={10}>
          <Skeleton.Button active shape="round" style={{ width: 120 }} />
          <Skeleton.Button active shape="round" style={{ width: 120 }} />
        </Flex>
      </Flex>
    </div>
  );
};

export default Loading;
