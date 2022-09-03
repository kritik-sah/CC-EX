import {
  Box,
  Button,
  HStack,
  Heading,
  Text,

  useDisclosure,
  VStack,
  StackDivider,

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


import { } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Navigation from './Navbar/Navigation';
import Footer from './Footer';
import DropMenu from './Navbar/DropMenu';
import Toasts from './toasts/Toasts';

const Layout = function ({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { address, isConnected, connector } = useAccount();

  const [isSSR, setIsSSR] = useState(true);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();


 

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
        <Heading color={"teal.500"} as='h2' size='lg'>CC-EX</Heading>
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
                      <div key={connector.id}>
                            
                          <Button
                            disabled={!connector.ready}
                            onClick={() => connect({ connector })}
                            colorScheme="teal"
                            variant="ghost"
                          >
                            {connector.name}
                            {isLoading &&
                              connector.id === pendingConnector?.id &&
                              <Spinner />}
                          </Button>
                        
                      </div>
                    ))}
                    </VStack>
                    {error && <Toasts message={error.message}  status='error'/>}
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
      

      <Footer/>
    </Box>
  );
};

export default Layout;
