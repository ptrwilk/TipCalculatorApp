import { ThemeProvider, createTheme } from "@mui/material";
import "./App.scss";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 18,
    },
    fontFamily: "xxxx",
  },
  components: {
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        // disablePadding: true,
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app"></div>
    </ThemeProvider>
  );
}

export default App;
