import { EmptyState, List, VStack } from "@chakra-ui/react";
import { HiColorSwatch } from "react-icons/hi";

interface Props {
  description: string;
  prompts?: string[];
}

const EmptyResult = ({ description, prompts }: Props) => {
  return (
    <EmptyState.Root
      size={"lg"}
      boxSize={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>No results found</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
        {prompts && (
          <List.Root variant="marker">
            {prompts.map((prompt, index) => (
              <List.Item key={index}>{prompt}</List.Item>
            ))}
          </List.Root>
        )}
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default EmptyResult;
