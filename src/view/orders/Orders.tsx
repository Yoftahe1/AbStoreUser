import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Navigate, useSearchParams } from "react-router-dom";

import OrdersTable from "./OrdersTable";
import useUserStore from "../../store/User";

const items: TabsProps["items"] = [
  {
    key: "Processing",
    label: "Processing",
    children: <OrdersTable />,
  },
  {
    key: "Delivering",
    label: "Delivering",
    children: <OrdersTable />,
  },
  {
    key: "Delivered",
    label: "Delivered",
    children: <OrdersTable />,
  },
];

const Orders = () => {
  const user = useUserStore((state) => state.user);
  const [_, setSearchParams] = useSearchParams({
    status: "",
    page: "",
  });

  const onChange = (key: string) => {
    setSearchParams(
      (prev) => {
        prev.set("status", key);
        prev.set("page", "1");
        return prev;
      },
      { replace: true }
    );
  };


  if (!user)return <Navigate to={"/auth/signin"} />;

  return (
    <div>
      <Tabs defaultActiveKey="Processing" items={items} onChange={onChange} />
    </div>
  );
};

export default Orders;
