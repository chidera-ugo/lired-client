import { AppProps } from "next/app"
import "@fontsource/lexend/latin.css"
import "styles/globals.css"
import { PropsWithChildren } from "react"

import Root from "./_root"

const MyApp = (props: PropsWithChildren<AppProps>) => {
  return <Root {...props} />
}

export default MyApp
