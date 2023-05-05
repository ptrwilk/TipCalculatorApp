import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";
import TipCalculatorPage from "./Pages/TipCalculatorPage";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 24,
    },
    fontFamily: "Space Mono",
  },
  components: {
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <TipCalculatorPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
