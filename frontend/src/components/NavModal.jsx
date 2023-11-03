import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody } from "@chakra-ui/react";
import { useState } from "react";

const SlidingComponent = ({ isOpen, onClose }) => {
  return (
    <>
     

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        size="full"
        zIndex="1" // Set a higher z-index to position it below your navbar
      >
        <DrawerOverlay />
        <DrawerContent
          style={{
            position: "absolute",
            top: "56px", // Adjust this value to match your navbar's height
            width: "100%",
            height: "calc(100vh - 56px)", // Ensure the modal covers 100% of the viewport height, excluding the navbar
          }}
        >
          <DrawerHeader>Sliding Component</DrawerHeader>
          <DrawerBody>
            {/* Your sliding component content goes here */}
            This is the content of your sliding component.
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SlidingComponent;
