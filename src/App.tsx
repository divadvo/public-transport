import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Overview from "./Overview";
import OverviewNew from "./OverviewNew";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <OverviewNew />
    </MantineProvider>
  );
}
