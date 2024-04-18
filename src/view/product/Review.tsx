import { useEffect, useState } from "react";

import {
  Tag,
  Modal,
  Input,
  Flex,
  Avatar,
  Typography,
  Button,
  Form,
  notification,
  List,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRightOutlined, MessageOutlined } from "@ant-design/icons";

import { getReviews, reviewProduct } from "../../api/product";
import useUserStore from "../../store/User";

const { Text } = Typography;
const { useNotification } = notification;

const Review = ({ id, reviewCount }: { id: string; reviewCount: number }) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [api, contextHolder] = useNotification();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  function showModal() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }
  const { mutate, isPending } = useMutation({
    mutationFn: reviewProduct,
    onSuccess: (response) => {
      form.resetFields();
      showNotification("success", response.message);
      queryClient.invalidateQueries({
        queryKey: ["Product", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["Reviews", { id }],
      });
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

  const onFinish = ({ review }: { review: string }) => {
    if (user) mutate({ id, review });
    else showNotification("error", "Please sign in first.");
  };
  return (
    <>
      {contextHolder}
      <Tag
        color="blue"
        style={{ padding: "5px 10px", borderRadius: 20, cursor: "pointer" }}
        onClick={showModal}
      >
        <MessageOutlined /> {reviewCount} Reviews
      </Tag>
      <Modal
        title="Review"
        open={isOpen}
        onCancel={hideModal}
        footer={[
          <Form
            key="reviewForm"
            form={form}
            name="reviewForm"
            onFinish={onFinish}
          >
            <Flex>
              <Form.Item
                name="review"
                rules={[
                  { required: true, message: "Please input your review!" },
                ]}
                style={{ margin: 0, flex: 1 }}
              >
                <Input placeholder="Enter what you think" />
              </Form.Item>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isPending}
                  loading={isPending}
                >
                  <ArrowRightOutlined />
                </Button>
              </Form.Item>
            </Flex>
          </Form>,
        ]}
      >
        <div style={{ maxHeight: "calc(70vh - 64px)", overflowY: "scroll" }}>
          <ReviewList id={id} />
        </div>
      </Modal>
    </>
  );
};

export default Review;

interface IReview {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  message: string;
}

const ReviewList = ({ id }: { id: string }) => {
  const [api, contextHolder] = useNotification();
  const { error, isLoading, isSuccess, data } = useQuery({
    queryKey: ["Reviews", { id }],
    queryFn: () => getReviews(id),
  });

  useEffect(() => {
    if (error) {
      showNotification(error.message);
    }
  }, [error]);

  function showNotification(description: string) {
    api.error({
      message: "Error",
      description,
    });
  }
  return (
    <>
      {contextHolder}
      <List
        loading={isLoading}
        dataSource={isSuccess ? data.data.reviews : []}
        renderItem={(review: IReview) => (
          <List.Item>
            <Flex gap={10} align="center" style={{ width: "100%" }}>
              <Avatar size={"large"}>
                {review.userId ? review.userId.firstName[0] : "."}
              </Avatar>
              <Flex vertical flex={1}>
                <Flex justify="space-between">
                  <Text>
                    {review.userId
                      ? `${review.userId.firstName} ${review.userId.lastName}`
                      : "..."}
                  </Text>
                </Flex>
                <Text type="secondary">{review.message}</Text>
              </Flex>
            </Flex>
          </List.Item>
        )}
      />
    </>
  );
};
