import { Box, Button, Field, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { floatingStyles } from "../styles";

interface Props {
  placeholder: string;
  handleSubmit: () => void;
}
function SearchPrompt({ placeholder, handleSubmit }: Props) {
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

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
          onChange={handleInputChange}
        />
        <Field.Label css={floatingStyles}>{placeholder}</Field.Label>
        <Button
          border="none"
          variant="solid"
          size="sm"
          onClick={handleSubmit}
          disabled={!prompt}
        >
          <FaArrowUp />
        </Button>
      </Box>
    </Field.Root>
  );
}

export default SearchPrompt;
