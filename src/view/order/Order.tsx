import { Breadcrumb, Typography } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import OrderTable from "./OrderTable";
import useUserStore from "../../store/User";

const { Text } = Typography;

const Order = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  if (!user)return <Navigate to={"/auth/signin"} />;

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <Text
                type="secondary"
                onClick={() => navigate("/orders")}
                style={{ cursor: "pointer" }}
              >
                orders
              </Text>
            ),
          },
          { title: params.id },
        ]}
      />
      <br />
      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default Order;
