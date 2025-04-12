import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../app/productSlice";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const bg = useColorModeValue("gray.200", "#272735");
  const toast = useToast();
  const dispatch = useDispatch();

  const onDeleteHandler = async (pid) => {
    const toastId = "deleting-product";
    try {
      toast({
        id: toastId,
        title: "Deleting",
        status: "loading",
        description: "Deleting product...",
        isClosable: true,
      });

      const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      toast.close(toastId);
      if (!data.success) {
        return toast({
          title: "Error",
          status: "error",
          description: data.message,
          isClosable: true,
        });
      }
      dispatch(deleteProduct(pid));
      toast({
        title: "Deleted",
        status: "success",
        description: data.message,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        description: error.message,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"300px"}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ₹{product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDeleteHandler(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default ProductCard;
