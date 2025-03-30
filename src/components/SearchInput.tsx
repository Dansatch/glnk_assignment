import { Box, Button, Field, Input } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa6";
import { floatingStyles } from "../styles";

interface Props {
  placeholder: string;
  prompt: string;
  readOnly?: boolean;
  setPrompt: (targetValue: string) => void;
  handleSubmit: () => void;
}
function SearchInput({
  placeholder,
  prompt,
  setPrompt,
  handleSubmit,
  readOnly = false,
}: Props) {
  return (
    <Field.Root width={{ base: "80vw", md: "400px" }}>
      <Box
        borderRadius={"md"}
        alignSelf={"center"}
        pos="relative"
        w="full"
        display={"flex"}
      >
        {" "}
        <Input
          className="peer"
          placeholder=""
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={readOnly}
        />
        <Field.Label
          css={floatingStyles}
          visibility={readOnly ? "hidden" : "visible"}
        >
          {placeholder}
        </Field.Label>
        <Button
          border="none"
          size="sm"
          onClick={() => handleSubmit()}
          disabled={!prompt}
          display={readOnly ? "none" : "flex"}
          variant="ghost"
          marginLeft={-10}
          marginTop={0.3}
          _hover={{
            backgroundColor: "transparent",
          }}
        >
          <FaArrowUp />
        </Button>
      </Box>
    </Field.Root>
  );
}

export default SearchInput;
