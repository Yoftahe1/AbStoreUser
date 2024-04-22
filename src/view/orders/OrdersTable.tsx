import { useEffect } from "react";

import {
  Space,
  Tag,
  Table,
  Typography,
  Button,
  Tooltip,
  notification,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getOrders } from "../../api/order";

const { Column } = Table;
const { Text } = Typography;
const { useNotification } = notification;

const OrderTable = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const [searchParams,setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "Processing";

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }

  const filter = {
    page: searchParams.get("page") || "1",
    orderStatus: status,
  };

  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Orders", { ...filter }],
    queryFn: () => getOrders(filter),
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      showNotification(error.message);
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Table
        dataSource={isSuccess ? data.data.orders : []}
        scroll={{ x: 800}}
        loading={isLoading}
        pagination={{
          onChange: (newPage: number) => {
            setSearchParams(
              (prev) => {
                prev.set("page", newPage.toString());
                return prev;
              },
              { replace: true }
            );
          },
          total: isSuccess ? data.data.totalCount : 10,
          pageSize: 10,
          current: Number(searchParams.get("page")) || 1,
        }}
      >
        <Column
          title="Order Id"
          dataIndex="key"
          key="key"
          render={(text: string) => (
            <Space>
              <Text>{text}</Text>
            </Space>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text: string) => (
            <Space>
              <Tag color="warning">{text}</Tag>
            </Space>
          )}
        />
        <Column
          title="Product Count"
          dataIndex="productCount"
          key="productCount"
          render={(text: string) => <Text>{text}</Text>}
        />
        <Column
          title="Total Price"
          dataIndex="totalPrice"
          key="totalPrice"
          render={(text: string) => (
            <Space>
              <Tag color="green">{text} ETB</Tag>
            </Space>
          )}
        />
        <Column
          title="View"
          key="view"
          dataIndex="key"
          width={150}
          render={(key: string) => (
            <Tooltip title="Detail">
              <Button
                icon={<EyeOutlined />}
                onClick={() => navigate(`./${key}`)}
              />
            </Tooltip>
          )}
        />
      </Table>
    </>
  );
};

export default OrderTable;
