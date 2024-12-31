import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Sidebar from "./components/Sidebar.jsx";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function Main() {
  const { theme } = useTheme(); // Access theme from ThemeContext

  return (
    <div className={`main ${theme}`}>
      {" "}
      {/* Apply theme class dynamically */}
      <Sidebar />
      <App />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  </Provider>
);
