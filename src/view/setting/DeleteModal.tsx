import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { Button, Modal, Typography, notification } from "antd";

import useUserStore from "../../store/User";
import { userDelete } from "../../api/user";

const { useNotification } = notification;
const { Text } = Typography;

const DeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, contextHolder] = useNotification();

  const user = useUserStore((state) => state.user);
  const sign = useUserStore((state) => state.sign);

  const { mutate, isPending } = useMutation({
    mutationFn: userDelete,
    onSuccess: (response) => {
      showNotification("success", response.message);
      sign(null);
      setIsOpen(false);
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

  const onDelete = () => {
    mutate(user?.id || "");
  };

  return (
    <>
      {contextHolder}
      <Button danger onClick={() => setIsOpen(true)} style={{ width: 140 }}>
        Deactivate
      </Button>
      <Modal
        title="Delete Account"
        open={isOpen}
        onOk={onDelete}
        onCancel={() => setIsOpen(false)}
        okText="Delete"
        okButtonProps={{
          danger: true,
          disabled: isPending,
          loading: isPending,
        }}
      >
        <Text>This action can't be undone </Text>
        <br />
        <Text>Are you sure you want to delete your account ?</Text>
      </Modal>
    </>
  );
};

export default DeleteModal;
