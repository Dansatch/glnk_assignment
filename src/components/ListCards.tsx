import { Box, Link, Text, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { Result } from "../hooks/useSearchResults";
import EmptyResult from "./EmptyResult";

interface Props {
  data?: Result[];
}

const ListCards = ({ data }: Props) => {
  return data?.length == 0 ? (
    <Box boxSize={"100%"}>
      <EmptyResult description="Try adjusting your search" />
    </Box>
  ) : (
    <Flex
      gap={4}
      p={2}
      wrap={"wrap"}
      width={"100vw"}
      maxHeight={"100%"}
      overflowY={"scroll"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      {data?.map((option, index) => (
        <Box key={index} height={"150px"} width={"330px"}>
          <Box
            boxSize={"100%"}
            textAlign="left"
            direction="column"
            gap={4}
            p={4}
            cursor={"pointer"}
            borderColor="blue.100"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              boxShadow: useColorModeValue(
                "0 3px 5px 5px rgba(244, 244, 244, 0.6)",
                "0 3px 5px 5px rgba(10, 41, 16, 0.9)"
              ),
              bgColor: useColorModeValue(
                "rgba(245, 250, 246, 0.6)",
                "rgba(2, 2, 2, 0.6)"
              ),
            }}
            rounded="lg"
          >
            <Box>
              <Link
                fontSize="xl"
                lineHeight={1.2}
                fontWeight="bold"
                w="100%"
                _hover={{ textDecor: "none" }}
              >
                {option.title}
              </Link>
              <Text
                fontSize="md"
                color="gray.500"
                lineClamp={2}
                lineHeight="normal"
              >
                {option.description}
              </Text>
            </Box>
          </Box>
          <Box width={"98%"} border={".1px solid"} borderBottom={"none"} />
        </Box>
      ))}
    </Flex>
  );
};

export default ListCards;
