import { extendTheme } from "@chakra-ui/react";
import components from "./components";
import foundations from "./foundations";
import styles from "./styles";
import layerStyles from "./LayerStyles";
import textStyles from "./textStyles";

const theme = extendTheme({
  components,
  ...foundations,
  styles,
  textStyles,
  layerStyles,
});

export default theme;
