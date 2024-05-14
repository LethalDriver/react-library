import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

type BookCardProps = {
  title: string;
  author: string;
  imageUrl: string;
};

export default function BookCard({ title, author, imageUrl }: BookCardProps) {
  return (
    <Center my={6}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        transition={"all 0.3s ease"} // Add a transition effect
        _hover={{
          transform: "scale(1.05)", // Scale the component on hover
          boxShadow: "2xl", // Increase the shadow on hover
        }}
      >
        <Center rounded={"lg"} pos={"relative"} height={"192px"}>
          <Image
            rounded={"lg"}
            height={192}
            width={128}
            objectFit={"cover"}
            src={imageUrl}
            alt="#"
          />
        </Center>
        <Stack pt={10} align={"center"} height={"148px"} overflow={"hidden"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {author}
          </Text>
          <Heading
            fontSize={"2xl"}
            fontFamily={"body"}
            fontWeight={500}
            lineHeight={"1.2"}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {title}
          </Heading>
        </Stack>
      </Box>
    </Center>
  );
}
