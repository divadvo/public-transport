import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Overview from "./Overview";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Overview></Overview>
    </MantineProvider>
  );
}
