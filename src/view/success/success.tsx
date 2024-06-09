import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import axiosInstance from "./../../api/main";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const token = Cookies.get("token");
    axiosInstance
      .patch(`/orders/verifyOrder/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => res.data)
      .catch((error: any) => {
        throw error.response.data;
      });
  }, []);

  return (
    <Result
      status="success"
      title="Successfully Purchased Products!"
      subTitle={`Order id: ${params.id} your order will be delivered as soon as possible.`}
      extra={[
        <Button type="primary" key="console" onClick={() => navigate(`/`)}>
          Go Home
        </Button>,
      ]}
    />
  );
};

export default Success;
