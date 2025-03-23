import { Button } from "@chakra-ui/react";
import "./App.css";
import { useColorMode } from "./components/ui/color-mode";

function App() {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Button variant="outline" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </>
  );
}

export default App;
