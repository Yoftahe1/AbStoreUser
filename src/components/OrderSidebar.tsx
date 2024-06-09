import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Flex,
  List,
  Typography,
  notification,
  theme,
} from "antd";

import useOrderStore from "../store/Order";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderProducts } from "../api/order";

const { useToken } = theme;
const { Text } = Typography;
const { useNotification } = notification;

const OrderSidebar = () => {
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = useNotification();

  const price = useOrderStore((state) => state.totalPrice);
  const products = useOrderStore((state) => state.products);
  const incProduct = useOrderStore((state) => state.incProduct);
  const decProduct = useOrderStore((state) => state.decProduct);
  const removeProducts = useOrderStore((state) => state.removeProducts);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: orderProducts,
    onSuccess: (response) => {
      console.log(response);
      // showNotification("success", response.message);
      queryClient.invalidateQueries({
        queryKey: ["Product"],
      });
      removeProducts();

      const checkOutUrl = response.data.data.checkout_url;
      window.location.replace(checkOutUrl);
    },
    onError: (error) => {
      console.log(error)
      showNotification("error", error.message);
    },
  });

  function showNotification(message: "success" | "error", description: string) {
    api[message]({
      message: message.toUpperCase(),
      description,
    });
  }

  return (
    <>
      {contextHolder}
      <Button
        type="text"
        icon={
          <Badge count={products.length} size="small">
            <ShoppingCartOutlined
              style={{
                fontSize: 17,
              }}
            />
          </Badge>
        }
        onClick={() => setOpen(true)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Drawer
        title="Order"
        onClose={() => setOpen(false)}
        open={open}
        footer={
          <Flex vertical gap={10}>
            <div
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: token.colorBgLayout,
              }}
            >
              <Text strong>Order Info</Text>
              <Flex justify="space-between">
                <Text>Subtotal</Text>
                <Text>{price} ETB</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Delivery cost</Text>
                <Text>+ 20 ETB </Text>
              </Flex>
              <Flex justify="space-between">
                <Text strong>Total</Text>
                <Text strong>{price + 20} ETB</Text>
              </Flex>
            </div>
            <Button
              type="primary"
              size="large"
              style={{ width: "100%" }}
              onClick={() => {
                mutate(products);
              }}
              loading={isPending}
              disabled={isPending}
            >
              Buy
            </Button>
          </Flex>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    src={`${import.meta.env.VITE_API_BACKEND_URL}${item.img}`}
                    size={58}
                    style={{ backgroundColor: token.colorBgContainer }}
                  />
                }
                title={
                  <Flex justify="space-between" align="center">
                    <Text strong>{item.name}</Text>
                    <div
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: item.color,
                        borderRadius: "50%",
                      }}
                    />
                  </Flex>
                }
                description={
                  <Flex justify="space-between" align="center">
                    <Flex
                      align="center"
                      style={{
                        padding: "0 10px",
                        borderRadius: 15,
                        backgroundColor: token.colorBgLayout,
                      }}
                    >
                      <Button
                        type="text"
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => decProduct(index)}
                        // disabled={item.quantity === 0}
                      />
                      <Text style={{ padding: "5px 7px" }}>
                        {item.quantity}
                      </Text>
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => incProduct(index)}
                        disabled={item.quantity === item.maxQuantity}
                      />
                    </Flex>
                    <Text type="success">{item.price} ETB</Text>
                  </Flex>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default OrderSidebar;
