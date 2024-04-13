import { Breadcrumb, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import Desc from "./Desc";
import Related from "./Related";

const { Text } = Typography;

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <Text
                type="secondary"
                onClick={() => navigate("/products")}
                style={{ cursor: "pointer" }}
              >
                products
              </Text>
            ),
          },
          { title: params.id },
        ]}
      />
      <br />
      <Desc />
      <br />
      <br />
      <Related/>
    </div>
  );
};

export default Product;
