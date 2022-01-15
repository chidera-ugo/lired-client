import { ChakraProvider } from "@chakra-ui/react"
import { makeOperation } from "@urql/core"
import { authExchange } from "@urql/exchange-auth"
import decode from "jwt-decode"
import { DefaultSeo } from "next-seo"
import { AppProps } from "next/app"
import Head from "next/head"
import {
  cacheExchange,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  Provider,
} from "urql"

import defaultSEOConfig from "../../next-seo.config"
import Layout from "components/layout"
import customTheme from "styles/customTheme"

const Root = ({ Component, pageProps }: AppProps) => {
  type AuthConfig = Parameters<typeof authExchange>[0]
  type AuthState = {
    accessToken: string
    expiration: number
  }

  const refreshMutation = `
        mutation RefreshToken {
          refreshToken {
            accessToken
          }
        }
      `

  const logoutMutation = `
      mutation Logout {
        logout
      }
  `

  const getAuth: AuthConfig["getAuth"] = async ({ authState, mutate }) => {
    if (!authState) {
      const response = await mutate(refreshMutation)
      const { accessToken } = response.data.refreshToken
      if (accessToken) {
        try {
          const { exp } = decode(accessToken) as { exp: number }
          return { accessToken, expiration: exp * 1000 }
        } catch (err) {
          return null
        }
      }

      return null
    }

    const response = await mutate(refreshMutation)
    const { accessToken } = response.data.refreshToken
    if (accessToken) {
      try {
        const { exp } = decode(accessToken) as { exp: number }
        return { accessToken, expiration: exp * 1000 }
      } catch (err) {
        await mutate(logoutMutation)
      }
    } else {
      await mutate(logoutMutation)
    }

    return null
  }

  const addAuthToOperation: AuthConfig["addAuthToOperation"] = ({
    authState,
    operation,
  }) => {
    if (!authState || !(authState as AuthState).accessToken) {
      return operation
    }
    const fetchOptions =
      typeof operation.context.fetchOptions === "function"
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {}

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${(authState as AuthState).accessToken}`,
        },
      },
    })
  }

  const didAuthError: AuthConfig["didAuthError"] = ({ error }) => {
    return error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN")
  }

  const willAuthError: AuthConfig["willAuthError"] = ({
    operation,
    authState,
  }) => {
    if (!authState) {
      return !(
        operation.kind === "mutation" &&
        operation.query.definitions.some((definition) => {
          return (
            definition.kind === "OperationDefinition" &&
            definition.selectionSet.selections.some((node) => {
              return (
                node.kind === "Field" &&
                (node.name.value === "login" || node.name.value === "register")
              )
            })
          )
        })
      )
    }
    if (Date.now() >= (authState as AuthState).expiration) {
      return true
    }
    return false
  }

  const client = createClient({
    url: "http://localhost:4000/graphql",
    exchanges: [
      dedupExchange,
      cacheExchange,
      errorExchange({
        onError: (error) => {
          const isAuthError = error.graphQLErrors.some(
            (e) => e.extensions?.code === "FORBIDDEN"
          )
          if (isAuthError) {
            // logout
          }
        },
      }),
      authExchange({
        getAuth,
        willAuthError,
        didAuthError,
        addAuthToOperation,
      }),
      fetchExchange,
    ],
    fetchOptions: {
      credentials: "include",
    },
  })

  return (
    <Provider value={client}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <Layout>
          <div>
            <Component {...pageProps} />
          </div>
        </Layout>
      </ChakraProvider>
    </Provider>
  )
}

export default Root
