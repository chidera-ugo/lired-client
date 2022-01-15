import { Box, Button } from "@chakra-ui/react"
import { Formik, Form, FormikProps } from "formik"
import { useRouter } from "next/router"

import InputField from "components/InputField"
import { useLoginMutation } from "generated/graphql"

import { generateErrorMap } from "./utils/generateErrorMap"

function Login() {
  const [, login] = useLoginMutation()
  const router = useRouter()

  return (
    <Box mt={8}>
      <h1>Login</h1>
      <Box mt={12} mx="auto">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values)
            if (response.data?.login.errors) {
              setErrors(generateErrorMap(response.data.login.errors))
            } else if (response.data?.login.accessToken) {
              router.push("/")
            }
          }}
        >
          {({
            isSubmitting,
          }: FormikProps<{
            username: string
            password: string
          }>) => (
            <Form>
              <InputField
                name="username"
                label="Username"
                type="text"
                autoComplete="username"
              />
              <Box mt={4} />
              <InputField
                name="password"
                label="Password"
                autoComplete="current-password"
                type="password"
              />

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Login
