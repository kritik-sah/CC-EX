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
  Spinner,
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
import Navigation from './Navbar/Navigation';
import DropMenu from './Navbar/DropMenu';

const Layout = function ({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { address, isConnected, connector } = useAccount();
  const { hasCopied, onCopy } = useClipboard(address ?? "");
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
        display="flex"
        justifyContent="space-between"
      >
        <Heading color={"teal.500"} as='h2' size='lg'>Carbon Credit</Heading>
        <HStack display="flex"
        justifyContent="end">
          {!isSSR && isConnected ? (
          <>
          <DropMenu/>
            
          </>
        ) : (
          <>
            <Button onClick={onOpen}>Connect</Button>
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
                    <VStack
                      divider={<StackDivider borderColor="gray.200" />}
                      spacing={4}
                      align="stretch"
                    >
                    {connectors.map((connector) => (
                      <>
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
                              <Spinner />}
                          </Button>
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
                    </VStack>
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

        <Navigation/>

        </HStack>
        
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
