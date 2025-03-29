import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchInput from "./components/SearchInput";
import { useChatbotResponse, useSuggestions } from "./hooks/useChatbotResponse";
import ColorModeSwitch from "./components/ColorModeSwitch";

const MotionGridItem = motion(GridItem);
const MotionVStack = motion(VStack);

function App() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const suggestions = useSuggestions();
  const resultReady = !!messages[0];

  useEffect(() => {
    if (!searchPrompt[0]) return setSubmitted(false);
    if (!submitted) return;

    setMessages([...messages, { role: "user", content: searchPrompt }]);
  }, [searchPrompt[0] && submitted]);

  useEffect(() => {
    if (!searchPrompt || !submitted) return;

    const result = useChatbotResponse(searchPrompt);
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: result.data || "No response found" },
    ]);

    setSearchPrompt("");
    setSubmitted(false);
  }, [submitted]);

  return (
    <>
      <>
        <Box position={"absolute"} right={3} top={3}>
          <ColorModeSwitch singleIcon={true} />
        </Box>
        <Grid
          h="100vh"
          width={"100vw"}
          templateRows="repeat(7, 1fr)"
          display={"grid"}
          paddingX={{ base: "1", md: "10" }}
        >
          <MotionGridItem
            rowSpan={7}
            display={"flex"}
            alignItems={"center"}
            animate={{
              height: resultReady ? "0vh" : "100vh",
            }} // Adjusted height per row
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <MotionVStack
              boxSize={"100%"}
              display={resultReady ? "none" : "flex"}
              alignItems={resultReady ? "flex-start" : "center"}
              justifyContent={"center"}
            >
              <HStack fontSize={"sm"} spaceX={1} opacity={0.8}>
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    colorPalette="teal"
                    variant="outline"
                    onClick={() => {
                      setSearchPrompt(suggestion);
                      setSubmitted(true);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </HStack>
              {/* )} */}

              <SearchInput
                placeholder="What can I find for you today?"
                readOnly={!!resultReady}
                prompt={searchPrompt}
                handleSubmit={() => setSubmitted(true)}
                setPrompt={setSearchPrompt}
              />
            </MotionVStack>
          </MotionGridItem>

          <MotionGridItem
            rowSpan={0}
            display={resultReady ? "flex" : "none"}
            animate={{ height: resultReady ? "85.71vh" : "0vh" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            overflow={"scroll"}
            paddingY={{ base: "1", md: "10" }}
          >
            <VStack boxSize={"100%"}>
              {messages.map((message, index) => (
                <HStack key={index} width={"100%"}>
                  <Avatar.Root size={"xs"} variant={"subtle"}>
                    <Avatar.Fallback
                      name={message.role === "ai" ? "A I" : ""}
                    />
                  </Avatar.Root>
                  <Box>{message.content}</Box>
                </HStack>
              ))}
            </VStack>
            {/* <ListCards data={data?.results} /> */}
          </MotionGridItem>

          <MotionGridItem
            rowSpan={0}
            display={resultReady ? "flex" : "none"}
            animate={{ height: resultReady ? "14.29vh" : "0vh" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <SearchInput
              placeholder="Refine your search?"
              prompt={searchPrompt}
              handleSubmit={() => setSubmitted(true)}
              setPrompt={setSearchPrompt}
            />
          </MotionGridItem>
        </Grid>
      </>
    </>
  );
}

export default App;
