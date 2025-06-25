import logo from "./logo.svg";
import "./App.css";
import { Table } from "./Table";
import { ThemeProvider } from "./themeContext";
import { useState } from "react";
import { DragAndDrop } from "./DragAndDrop";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <>
      <ThemeProvider>
        <DragAndDrop />
        <input
          type="checkbox"
          onChange={() => {
            if (theme === "dark") setTheme("light");
            else setTheme("dark");
          }}
        />
        <div className={`App ${theme}`}>
          <Table />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
