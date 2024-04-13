import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Modal,
  Input,
  Form,
  notification,
  InputNumber,
  Select,
} from "antd";

import { userUpdate } from "../../api/user";
import useUserStore from "../../store/User";
import { locations } from "../../constant/constant";

const { useNotification } = notification;

const UpdateButton = () => {
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = useNotification();
  const user = useUserStore((state) => state.user);
  const sign = useUserStore((state) => state.sign);

  const { mutate, isPending } = useMutation({
    mutationFn: userUpdate,
    onSuccess: ({ message, data }) => {
      showNotification("success", message);
      sign({
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        location: data.location,
        phoneNumber: data.phoneNumber,
      });
      setOpen(false);
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  function showNotification(message: "success" | "error", description: string) {
    api[message]({
      message: message.toUpperCase(),
      description,
    });
  }

  const onCreate = (values: Values) => {
    mutate({ ...values, id: user?.id || "" });
  };

  return (
    <div>
      {contextHolder}
      <Button
        style={{ width: 140 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Update Profile
      </Button>
      <NameForm
        open={open}
        isPending={isPending}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default UpdateButton;
interface Values {
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: number;
}

interface INameFormProps {
  open: boolean;
  isPending: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const NameForm: React.FC<INameFormProps> = ({
  open,
  isPending,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Update Profile"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{ disabled: isPending, loading: isPending }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="name">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input the first name!",
            },
          ]}
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: "Please input the location!",
            },
          ]}
        >
          <Select options={locations} />
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
        >
          <InputNumber
            addonBefore="+251"
            min={900000000}
            max={999999999}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
