import { Button, Flex, Typography, theme } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Text } = Typography;
const {useToken}=theme
interface IQuantityPicker {
  quantity: number;
  changeQuantity: (inc: boolean) => void;
  maxQuantity:number
}

const QuantityPicker = ({ quantity, changeQuantity,maxQuantity }: IQuantityPicker) => {
  const {token}=useToken()
  return (
    <Flex
      align="center"
      style={{
        height: "100%",
        backgroundColor: token.colorBgTextHover,
        padding: "0 20px",
        borderRadius: 20,
      }}
    >
      <Button
        type="text"
        icon={<LeftOutlined />}
        disabled={quantity === 1}
        onClick={() => changeQuantity(false)}
      />
      <Flex justify="center" style={{ minWidth: 30 }}>
        <Text>{quantity}</Text>
      </Flex>
      <Button
        type="text"
        icon={<RightOutlined />}
        disabled={quantity === maxQuantity}
        onClick={() => changeQuantity(true)}
      />
    </Flex>
  );
};

export default QuantityPicker;
