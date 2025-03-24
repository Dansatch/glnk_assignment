import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { Switch } from "./ui/switch";
import { BiMoon, BiSun } from "react-icons/bi";

interface Props {
  singleIcon?: boolean;
  displayOnly?: boolean;
}

const ColorModeSwitch = ({ singleIcon, displayOnly }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();

  if (displayOnly)
    return (
      <HStack gap={2}>
        {colorMode === "light" ? (
          <Icon>
            <BiMoon />
          </Icon>
        ) : (
          <Icon>
            <BiSun />
          </Icon>
        )}
        <Text whiteSpace={"nowrap"}>
          {colorMode === "light" ? "Dark mode" : "Light mode"}
        </Text>
      </HStack>
    );

  if (singleIcon)
    return (
      <Button variant={"ghost"} colorScheme={"dark"} onClick={toggleColorMode}>
        {colorMode === "light" ? <BiMoon /> : <BiSun />}
      </Button>
    );

  return (
    <HStack>
      <Switch checked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text whiteSpace={"nowrap"}>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
