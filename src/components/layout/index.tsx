import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

import Header from "./Header"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main">{children}</Box>
      </Box>
    </Box>
  )
}

export default Layout
