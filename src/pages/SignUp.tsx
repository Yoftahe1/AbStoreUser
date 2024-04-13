import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  notification,
  theme,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { userSignUp } from "../api/user";
import image from "../assets/sign/signup.jpg";
import { locations } from "../constant/constant";
import useUserStore from "../store/User";

const { useToken } = theme;
const { Title, Text } = Typography;
const { useNotification } = notification;

type FieldType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  location: string;
};

const SignUp = () => {
  const { token } = useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const sign = useUserStore((state) => state.sign);

  const { mutate,isPending } = useMutation({
    mutationFn: userSignUp,
    onSuccess: ({
      data,
    }: {
      data: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        token: string;
        phoneNumber: number;
        location: string;
      };
    }) => {
      form.resetFields();
      sign({
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        location: data.location,
        role: data.role,
      });

      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("phoneNumber", data.phoneNumber.toString());
      localStorage.setItem("location", data.location);

      Cookies.set("token", data.token);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      showNotification(error.message);
    },
  });

  const onFinish = (values: FieldType) => {
    mutate(values);
  };

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }
  return (
    <div style={{ maxHeight: "100vh", overflow: "hidden", paddingTop: "0px" }}>
      {contextHolder}
      <Flex
        gap={50}
        style={{
          minHeight: "100vh",
          padding: 50,
          backgroundColor: token.colorBgLayout,
        }}
        justify="center"
        align="stretch"
      >
        <Flex
          style={{
            width: 550,
            borderRadius: 50,
            padding: 50,
            backgroundColor: token.colorBgContainer,
          }}
          vertical
        >
          <Title level={2} style={{ textAlign: "center" }}>
            AB Store
          </Title>
          <Title level={2}>Sign up</Title>
          <Text>Let's get started in your journey</Text>
          <br />
          <br />
          <Form form={form} name="signUp" onFinish={onFinish} layout="vertical">
            <Flex gap={10}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the first name!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the last name!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
            </Flex>
            <Flex gap={10}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input the email!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input the password!",
                  },
                  {
                    pattern: /[a-z]/,
                    message: "Password should contain lowercase letter!",
                  },
                  {
                    pattern: /[A-Z]/,
                    message: "Password should contain uppercase letter!",
                  },
                  {
                    pattern: /\d/,
                    message: "Password should contain number!",
                  },
                  {
                    pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                    message: "Password should special character!",
                  },
                  { min: 8, message: "Password should be min of eight character!" },
                ]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
            </Flex>
            <Flex gap={10}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input the phone number!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  addonBefore="+251"
                  min={900000000}
                  max={999999999}
                />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  { required: true, message: "Please input your location!" },
                ]}
                style={{ flex: 1 }}
              >
                <Select options={locations} />
              </Form.Item>
            </Flex>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isPending} loading={isPending}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Flex>

        <Flex style={{ width: 500, position: "relative" }}>
          <img src={image} style={{ width: "100%", borderRadius: 50 }} />
          <Button
            onClick={() => navigate("/auth/signin")}
            style={{ position: "absolute", right: 50, top: 50 }}
          >
            Sign In
          </Button>
          <div
            style={{
              position: "absolute",
              right: 50,
              bottom: 50,
            }}
          >
            <Title level={2} style={{ color: token.colorTextLightSolid }}>
              Welcome to
            </Title>
            <Title level={4} style={{ color: token.colorTextLightSolid }}>
              Ab Store
            </Title>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default SignUp;
