import { Box, VStack, Link, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

const articles = [
  {
    id: 1,
    title: "Top 10 Qualities to Look for in Medical Job Candidates",
    description:
      "Key attributes that recruiters should prioritize when hiring medical professionals, including soft skills and certifications.",
    link: "https://www.glnkco.com/",
  },
  {
    id: 2,
    title: "How to Conduct Effective Medical Job Interviews",
    description:
      "Best practices for interviewing medical personnel, including sample questions and evaluation criteria.",
    link: "https://www.glnkco.com/",
  },
];

const ListCards = () => {
  return (
    <VStack p={1} gap={2} w={{ base: "auto", md: "2xl" }}>
      {articles.map((article, index) => (
        <>
          <Box
            textAlign="left"
            key={index}
            direction="column"
            gap={4}
            p={4}
            cursor={"pointer"}
            borderColor="blue.100"
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
            <Link
              fontSize="xl"
              lineHeight={1.2}
              fontWeight="bold"
              w="100%"
              _hover={{ textDecor: "none" }}
            >
              {article.title}
            </Link>
            <Text
              fontSize="md"
              color="gray.500"
              lineClamp={2}
              lineHeight="normal"
            >
              {article.description}
            </Text>
          </Box>
          <Box width={"98%"} border={".1px solid"} borderBottom={"none"} />
        </>
      ))}
    </VStack>
  );
};

export default ListCards;
