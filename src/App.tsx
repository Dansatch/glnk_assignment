import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SearchInput from "./components/SearchInput";
import ColorModeSwitch from "./components/ColorModeSwitch";
import { useColorModeValue } from "./components/ui/color-mode";
import useChatbotResponse, { useSuggestions } from "./hooks/useChatbotResponse";
import EmptyResult from "./components/EmptyResult";

const MotionGridItem = motion(GridItem);
const MotionVStack = motion(VStack);

function App() {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string; timestamp: Date }[]
  >([]);
  const suggestions = useSuggestions();
  const resultReady = !!messages[0];
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useChatbotResponse(searchPrompt);

  // Add user message to state
  useEffect(() => {
    if (!searchPrompt[0]) return;

    setMessages([
      ...messages,
      { role: "user", content: searchPrompt, timestamp: new Date() },
    ]);
  }, [searchPrompt]);

  // Add ai message to state
  useEffect(() => {
    if (!searchPrompt[0]) return;

    setMessages([
      ...messages,
      { role: "ai", content: data, timestamp: new Date() },
    ]);
  }, [data]);

  // Scroll to end of chat automatically
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (error)
    return (
      <EmptyResult description="An error occured, please try again later" />
    );

  return (
    <>
      <Box position={"absolute"} right={3} top={3}>
        <ColorModeSwitch singleIcon={true} />
      </Box>
      <Grid
        h="100vh"
        width={"100vw"}
        templateRows="repeat(7, 1fr)"
        display={"grid"}
        paddingX={{ base: "4", md: "10" }}
      >
        <MotionGridItem
          rowSpan={7}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          animate={{
            height: resultReady ? "0vh" : "100vh",
          }} // Adjusted height per row
          transition={{ duration: 0.5, ease: "easeInOut" }}
          maxWidth={"100vw"}
        >
          <MotionVStack
            boxSize={"80%"}
            display={resultReady ? "none" : "flex"}
            alignItems={resultReady ? "flex-start" : "center"}
            justifyContent={"center"}
          >
            <Box fontSize={"sm"} spaceX={1} opacity={0.8}>
              <Flex wrap={"wrap"} justifyContent={"center"} gap={2}>
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    colorPalette="teal"
                    variant="outline"
                    onClick={() => {
                      setSearchPrompt(suggestion);
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </Flex>
            </Box>

            <SearchInput
              placeholder="What can I find for you today?"
              readOnly={!!resultReady}
              setPrompt={setSearchPrompt}
            />
          </MotionVStack>
        </MotionGridItem>

        <MotionGridItem
          ref={scrollRef}
          rowSpan={0}
          display={resultReady ? "flex" : "none"}
          alignItems={"center"}
          justifyContent={"center"}
          animate={{ height: resultReady ? "85.71vh" : "0vh" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          overflow={"scroll"}
          paddingY={{ base: "8", md: "10" }}
        >
          <VStack
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            width={{ base: "100%", md: "70vw" }}
          >
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <HStack
                    paddingY={1}
                    alignItems={"flex-start"}
                    float={"left"}
                    color={useColorModeValue("gray.600", "gray.400")}
                  >
                    <Avatar.Root
                      size={"xs"}
                      variant={"subtle"}
                      colorPalette={message.role === "ai" ? "teal" : ""}
                    >
                      <Avatar.Fallback
                        name={message.role === "ai" ? "A I" : ""}
                      />
                    </Avatar.Root>
                    <Box>
                      <Text
                        paddingY={1}
                        paddingX={2}
                        backgroundColor={useColorModeValue(
                          "gray.200",
                          "gray.800"
                        )}
                        fontFamily={"serif"}
                        borderRadius={"sm"}
                        maxWidth={{
                          base: "100%",
                          md: "500px",
                          lg: "600px",
                        }}
                        fontSize={"lg"}
                      >
                        {message.content}
                      </Text>

                      <Text fontSize={"2xs"} float={"right"} marginTop={"1"}>
                        {message.timestamp.toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </Text>
                    </Box>
                  </HStack>
                </li>
              ))}
              {loading ? (
                <HStack width="full">
                  <SkeletonCircle size="10" />
                  <SkeletonText noOfLines={2} />
                </HStack>
              ) : (
                <Box />
              )}
            </ul>
          </VStack>
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
            setPrompt={setSearchPrompt}
          />
        </MotionGridItem>
      </Grid>
    </>
  );
}

export default App;
