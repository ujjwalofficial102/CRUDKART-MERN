import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../app/productSlice";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleCreateProduct = async () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.price ||
      !newProduct.image.trim()
    ) {
      return toast({
        title: "Error",
        status: "error",
        description: "Please fill in all fields.",
        isClosable: true,
      });
    }
    const toastId = "creating-product";
    try {
      toast({
        id: toastId,
        title: "Creating",
        status: "loading",
        description: "Creating your product...",
        isClosable: true,
      });
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      setNewProduct({ name: "", price: "", image: "" });
      dispatch(createProduct(data.data));

      navigate("/");
      toast.close(toastId);
      toast({
        title: "Successful",
        status: "success",
        description: "Product created successfully",
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
    <Container>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={6} mt={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "#27272a")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              focusBorderColor="purple.500"
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              focusBorderColor="purple.500"
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              focusBorderColor="purple.500"
            />

            <Button colorScheme="purple" onClick={handleCreateProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
