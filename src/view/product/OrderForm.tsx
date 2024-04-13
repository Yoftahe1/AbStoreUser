import { useState } from "react";

import { Button, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import ColorPicker from "./ColorPicker";
import QuantityPicker from "./QuantityPicker";
import useOrderStore from "../../store/Order";

interface IOrderForm {
  types: [{ color: string; quantity: number }];
  price: number;
  name: string;
  img: string;
  id: string;
}

const OrderForm = ({ types, price, img, name, id }: IOrderForm) => {
  const [selectedIndex, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addProduct = useOrderStore((state) => state.addProduct);

  function changeQuantity(inc: boolean) {
    if (inc) setQuantity((prev) => prev + 1);
    else if (quantity > 1) setQuantity((prev) => prev - 1);
  }

  return (
    <Flex vertical gap={10} align="flex-start">
      <ColorPicker
        types={types}
        setIndex={setIndex}
        selectedIndex={selectedIndex}
        setQuantity={setQuantity}
      />
      <Flex align="center" gap={20}>
        <QuantityPicker
          maxQuantity={types[selectedIndex].quantity}
          quantity={quantity}
          changeQuantity={changeQuantity}
        />
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            addProduct({
              id,
              name,
              img,
              color: types[selectedIndex].color,
              quantity,
              maxQuantity: types[selectedIndex].quantity,
              price,
            });
          }}
        >
          Add to cart
        </Button>
      </Flex>
    </Flex>
  );
};

export default OrderForm;
