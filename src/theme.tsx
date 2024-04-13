import { ConfigProvider, theme } from "antd";

import useThemeStore from "./store/Store";

interface IProps {
  children: React.ReactNode;
}

const ThemeConfig = ({ children }: IProps) => {
  const mode = useThemeStore((state) => state.mode);
  const isDarkMode = mode === "dark";

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
