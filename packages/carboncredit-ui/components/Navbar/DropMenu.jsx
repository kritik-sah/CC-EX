import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
  Avatar,
  Flex,
  Text,
  Button,
  Portal,
  useClipboard,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FaCopy, FaRegCopy } from "react-icons/fa";

const DropMenu = () => {
  const { address, isConnected, connector } = useAccount();
  const { hasCopied, onCopy } = useClipboard(address ?? "");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { disconnect } = useDisconnect();
  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem>
              <Flex mb={2} align="center" justify="space-between" w="full">
                <Text>
                  {address?.toString().slice(0, -36)}...
                  {address?.toString().substring(38)}
                </Text>
                <Button onClick={onCopy} ml={2}>
                  {hasCopied ? <FaCopy /> : <FaRegCopy />}
                </Button>
              </Flex>
            </MenuItem>

            <MenuItem onClick={() => disconnect()}>Logout</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  );
};

export default DropMenu;
