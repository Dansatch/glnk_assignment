import { Box, Button, Field, Input } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa6";
import { floatingStyles } from "../styles";

interface Props {
  placeholder: string;
  prompt: string;
  setPrompt: (targetValue: string) => void;
  handleSubmit: () => void;
}
function SearchInput({ placeholder, prompt, setPrompt, handleSubmit }: Props) {
  return (
    <Field.Root>
      <Box
        borderRadius={"md"}
        alignSelf={"center"}
        pos="relative"
        w="full"
        maxW="400px"
        display={"flex"}
      >
        {" "}
        <Input
          className="peer"
          placeholder=""
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Field.Label css={floatingStyles}>{placeholder}</Field.Label>
        <Button
          border="none"
          variant="solid"
          size="sm"
          onClick={() => handleSubmit()}
          disabled={!prompt}
        >
          <FaArrowUp />
        </Button>
      </Box>
    </Field.Root>
  );
}

export default SearchInput;
