import {
  Button,
  HStack,
  Input,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaGithub } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <FaBars />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carbon Credit</DrawerHeader>

          <DrawerBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Button colorScheme="teal" variant="ghost">
                Home
              </Button>
              <Button colorScheme="teal" variant="ghost">
                About
              </Button>
              <Button colorScheme="teal" variant="ghost">
                Docs
              </Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <HStack>
              <IconButton aria-label="Github" icon={<FaGithub />} />
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;
