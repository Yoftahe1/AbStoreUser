import { Flex, Typography } from "antd";

const { Title } = Typography;

interface iColorPicker {
  selectedIndex: number;
  types: [{ color: string; }];
  setIndex: (index: number) => void;
  setQuantity: (quantity: number) => void;
}

const ColorPicker = ({
  selectedIndex,
  setIndex,
  setQuantity,
  types,
}: iColorPicker) => {
  return (
    <Flex gap={5}>
      <Title level={5}>Select color :</Title>
      <Flex gap={5} align="center">
        {types.map((type, index) => {
          return (
            <div
              key={index}
              style={{
                padding: 3,
                border:
                  selectedIndex === index ? `1.5px solid ${type.color}` : 0,
                borderRadius: "50%",
                width: "min-content",
              }}
            >
              <div
                onClick={() => {
                  setIndex(index);
                  setQuantity(1);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: type.color,
                  borderRadius: "50%",
                }}
              />
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ColorPicker;
