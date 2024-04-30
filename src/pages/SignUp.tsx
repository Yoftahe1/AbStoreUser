import {
  Flex,
  Form,
  Input,
  theme,
  Select,
  Button,
  Typography,
  InputNumber,
  notification,
} from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { userSignUp } from "../api/user";
import useUserStore from "../store/User";
import image from "../assets/sign/signup.jpg";
import { locations } from "../constant/constant";

import classes from "./sign.module.css";

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

  const { mutate, isPending } = useMutation({
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
    <>
      {contextHolder}
      <Flex
        className={classes.sign}
        style={{ backgroundColor: token.colorBgLayout }}
        gap={50}
        align="stretch"
        justify="center"
      >
        <div
          className={classes.form}
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <Title
            level={3}
            style={{
              textAlign: "center",
              color: "#1677FF",
              fontWeight: 600,
            }}
          >
            AB STORE
          </Title>
          <Title level={5} style={{ textAlign: "center" }}>
            Sign-Up
          </Title>

          <Form form={form} name="signUp" onFinish={onFinish} layout="vertical">
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
              <Input placeholder="john" />
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
              <Input placeholder="doe" />
            </Form.Item>
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
                {
                  min: 8,
                  message: "Password should be min of eight character!",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input.Password placeholder="Johndoe_1234" />
            </Form.Item>
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
                placeholder="912345678"
                style={{ width: "100%" }}
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
              <Select options={locations} placeholder="05" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isPending}
                loading={isPending}
                className={classes.button}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Flex justify="flex-start" align="center" className={classes.mobile}>
              <Text>Already have an account ?</Text>
              <Button
                type="link"
                size="small"
                onClick={() => navigate("/auth/signin", { replace: true })}
              >
                Sign-In
              </Button>
            </Flex>
        </div>
        <div className={classes.imgContainer}>
          <img src={image} className={classes.img} />
          <Button
            onClick={() => navigate("/auth/signin", { replace: true })}
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
            <Title level={4} style={{ color: token.colorTextLightSolid }}>
              Welcome to
            </Title>
            <Title
              level={2}
              style={{ color: token.colorTextLightSolid, margin: 0 }}
            >
              Ab Store
            </Title>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default SignUp;
