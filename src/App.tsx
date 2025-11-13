import { ThemeProvider } from "@emotion/react";
import TasksPage from "./pages/tasks-page";
import { theme } from "../src/styles/theme";
import { GlobalStyles } from "./styles/global";

function App() {
  const user = { name: "Vlad", age: 19, student: true };
  const jsonUser = JSON.stringify(user);
  localStorage.setItem("user", jsonUser);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TasksPage />
    </ThemeProvider>
  );
}

export default App;
