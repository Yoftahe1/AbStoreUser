import React, { useEffect, useState } from "react";
import { Button, Result, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import axiosInstance from "./../../api/main";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  function verify() {
    setIsLoading(true)
    const token = Cookies.get("token");
    axiosInstance
      .patch(`/orders/verifyOrder/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => {
        setIsLoading(false);
        navigate("/")
      })
      .catch((_) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <Result
      status={isLoading ? "info" : "error"}
      title={isLoading ? "Please Wait While We Verify Payment" : "Verification Failed"}
      subTitle={isLoading ? `You will be redirected shortly.` : "You can retry verification or contact customer support."}
      extra={[isLoading ? <Spin key="spin"/> : <Button onClick={verify} key="retry">Retry</Button>]}
    />
  );
};

export default Success;
