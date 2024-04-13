import {
  Button,
  Flex,
  Form,
  Input,
  Typography,
  theme,
  notification,
} from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {  forgotPasswordUser, userSignIn } from "../api/user";
import image from "../assets/sign/signin.jpg";
import useUserStore from "../store/User";

const { useToken } = theme;
const { Title, Text } = Typography;
const { useNotification } = notification;

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { token } = useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = useNotification();
  const sign = useUserStore((state) => state.sign);

  const { mutate ,isPending} = useMutation({
    mutationFn: userSignIn,
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
      showNotification("error",error.message);
    },
  });

  const { mutate: forgotMutate, isPending: forgetIsPending } = useMutation({
    mutationFn: forgotPasswordUser,
    onSuccess: (data) => {
      showNotification("success",data.message)
    },
    onError: (error) => showNotification("error",error.message),
  });

  const onFinish = (values: FieldType) => {
    mutate(values);
  };

  function showNotification(message: "success" | "error", description: string) {
    api[message]({
      message: message.toUpperCase(),
      description,
    });
  }

  function handleForgot() {
    if (form.getFieldError("email").length === 0) {
      const email = form.getFieldValue("email");
      forgotMutate(email);
    } else showNotification("error","Please input valid email address!");
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
        <Flex style={{ width: 550, position: "relative" }}>
          <img
            src={image}
            style={{ width: "100%", borderRadius: 50, objectFit: "cover" }}
          />
          <Button
            onClick={() => navigate("/auth/signup")}
            style={{ position: "absolute", right: 50, top: 50 }}
          >
            Sign Up
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
          <Title level={2}>Sign in</Title>
          <Text>Let's get started in your journey</Text>
          <br />
          <Form form={form} name="signUp" onFinish={onFinish} layout="vertical">
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
              <Input placeholder="johndoe@gmail.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input.Password placeholder="Johndoe_1234" />
            </Form.Item>
            <Flex justify="flex-start" align="center">
              <Text>Forgot password ?</Text>
              <Button
                type="link"
                onClick={handleForgot}
                disabled={forgetIsPending}
                loading={forgetIsPending}
              >
                Get one Time Password
              </Button>
            </Flex>
            <br />
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isPending} loading={isPending}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </div>
  );
};

export default SignIn;
