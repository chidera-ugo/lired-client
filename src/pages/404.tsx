import {
  Box,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  useColorMode,
  Flex,
} from "@chakra-ui/react"
import Link from "next/link"

const Page404 = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <Text textAlign="center" fontSize="xs">
        <ChakraLink
          href="https://stories.freepik.com/web"
          isExternal
          rel="noopener noreferrer"
        >
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>It&apos;s Okay!</Text>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              Let&apos;s Head Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  )
}

export default Page404
