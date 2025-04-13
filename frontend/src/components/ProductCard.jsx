import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateProduct } from "../app/productSlice";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const bg = useColorModeValue("gray.200", "#272735");
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productData, setProductData] = useState(product);

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
      toast.close(toastId);
      toast({
        title: "Error",
        status: "error",
        description: error.message,
        isClosable: true,
      });
    }
  };

  const onUpdateHandler = async (pid) => {
    // setProductData()
    if (!productData.name || !productData.price || !productData.image) {
      return toast({
        title: "Error",
        status: "error",
        description: "Empty Field",
        isClosable: true,
      });
    }
    const toastId = "updating-product";
    onClose();
    try {
      toast({
        id: toastId,
        title: "Updating",
        status: "loading",
        description: "Updating product...",
        isClosable: true,
      });
      const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      const newData = data.data;

      toast.close(toastId);
      if (!data.success) {
        return toast({
          title: "Error",
          status: "error",
          description: data.message,
          isClosable: true,
        });
      }
      dispatch(updateProduct({ pid, newData }));

      toast({
        title: "Updated",
        status: "success",
        description: "Product Updated Successfully",
        isClosable: true,
      });
    } catch (error) {
      toast.close(toastId);
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
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="purple"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDeleteHandler(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={productData.name}
                onChange={(e) => {
                  setProductData({ ...productData, name: e.target.value });
                }}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={productData.price}
                onChange={(e) => {
                  setProductData({ ...productData, price: e.target.value });
                }}
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={productData.image}
                onChange={(e) => {
                  setProductData({ ...productData, image: e.target.value });
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => onUpdateHandler(product._id)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
