import { useState } from "react";
import { Modal, Rate, Tag, notification } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { myRating, rateProduct } from "../../api/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../store/User";

const { useNotification } = notification;
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const Rating = ({ id, totalRating }: { id: string; totalRating: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [api, contextHolder] = useNotification();
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  const { isSuccess, data } = useQuery({
    queryKey: ["Product", { id }, "Rating"],
    queryFn: () => myRating(id),
    enabled: !!user,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: rateProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["Product", { id }],
      });
      showNotification("success", response.message);
      hideModal();
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

  function handelRating() {
    if (user) mutate({ rating, id });
    else showNotification("error", "Please sign in first.");
  }

  function showModal() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }
  return (
    <>
      {contextHolder}
      <Tag
        color="orange"
        style={{
          padding: "5px 10px",
          borderRadius: 20,
          cursor: "pointer",
          margin: 0,
        }}
        onClick={showModal}
      >
        <StarOutlined /> {totalRating.toFixed(2)} Starts
      </Tag>
      <Modal
        title="Rate Product"
        open={isOpen}
        onOk={handelRating}
        onCancel={hideModal}
        okText="Save Rating"
        okButtonProps={{ disabled: isPending, loading: isPending }}
      >
        <Rate
          tooltips={desc}
          allowHalf
          onChange={(e) => setRating(e)}
          defaultValue={isSuccess ? data.data.myRating : 0}
        />
      </Modal>
    </>
  );
};

export default Rating;
