import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useLogoutMutation, useMeQuery } from "generated/graphql"

import ThemeToggle from "./ThemeToggle"

const Header = () => {
  const [{ data, fetching }] = useMeQuery()
  const [, logout] = useLogoutMutation()
  const router = useRouter()
  let body = null

  if (fetching) {
    // do nothing
  } else if (!data?.me) {
    body = (
      <>
        <Heading as="h1" size="md">
          <Link href="/">nextarter-chakra</Link>
        </Heading>

        <Flex marginLeft="auto">
          <NextLink href="/register">
            <Link px={4} my="auto">
              Register
            </Link>
          </NextLink>
          <NextLink href="/login">
            <Link px={4} my="auto">
              Login
            </Link>
          </NextLink>

          <Box ml={5}>
            <ThemeToggle />
          </Box>
        </Flex>
      </>
    )
  } else {
    body = (
      <>
        <Heading as="h1" size="md">
          <Link href="/">{data.me.username}</Link>
        </Heading>

        <Flex marginLeft="auto">
          <Button
            onClick={async () => {
              await logout()
              router.push("/")
            }}
            px={4}
            my="auto"
          >
            Logout
          </Button>

          <Box ml={5}>
            <ThemeToggle />
          </Box>
        </Flex>
      </>
    )
  }

  return (
    <Flex as="header" width="full" align="center">
      {body}
    </Flex>
  )
}

export default Header
