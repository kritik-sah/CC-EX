import {
  Box,
  Button,
  HStack,
  Heading,
  Text,
  Link,
  useDisclosure,
  VStack,
  StackDivider,
  useToast,
  Portal,
  Avatar,
  Flex,
  Input,
  useClipboard,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { FaCopy, FaRegCopy } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";



const Layout = function ({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { address, isConnected, connector } = useAccount();

  const { hasCopied, onCopy } = useClipboard(address);
  const [isSSR, setIsSSR] = useState(true);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <Box>
      <HStack
        paddingX="8"
        paddingY="4"
        backgroundColor={"cyan.700"}
        display="flex"
        justifyContent="space-between"
      >
        <Heading color={"white"}>Carbon Credit</Heading>
        {!isSSR && isConnected ? (
          <>
            <Menu>
              <MenuButton>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem>
                    <Flex
                      mb={2}
                      align="center"
                      justify="space-between"
                      w="full"
                    >
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
        ) : (
          <>
            
            <Button
              onClick={onOpen}
              
            >
              Connect
            </Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                    Connect your wallet
                  </Text>
                  <div>
                    {connectors.map((connector) => (
                      <>
                        <VStack
                          divider={<StackDivider borderColor="gray.200" />}
                          spacing={4}
                          align="stretch"
                        >
                          <Button
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect({ connector })}
                            colorScheme="teal"
                            variant="ghost"
                          >
                            {connector.name}
                            {isLoading &&
                              connector.id === pendingConnector?.id &&
                              " (connecting)"}
                          </Button>
                          
                          
                        </VStack>
                        {/* {error && (
                              <div>
                              {toast({
                                title: error.message,
                                status: "error",
                                isClosable: true,
                              })}
                              </div>
                            
                          )} */}
                      </>
                    ))}
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </HStack>
      {children}
      <HStack
        paddingX="8"
        paddingY="4"
        backgroundColor={"cyan.700"}
        display="flex"
        justifyContent="center"
      >
        <Text color={"white"}>Footer</Text>
      </HStack>
    </Box>
  );
};

export default Layout;
