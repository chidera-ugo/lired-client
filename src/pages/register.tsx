import { Box, Button } from "@chakra-ui/react"
import { Formik, Form, FormikProps } from "formik"
import { useRouter } from "next/router"

import { generateErrorMap } from "../utils/generateErrorMap"
import InputField from "components/InputField"
import { useRegisterMutation } from "generated/graphql"

function Register() {
  const [, register] = useRegisterMutation()
  const router = useRouter()

  return (
    <Box mt={8}>
      <h1>Register</h1>
      <Box mt={12} mx="auto">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register(values)
            if (response.data?.register.errors) {
              setErrors(generateErrorMap(response.data.register.errors))
            } else if (response.data?.register.user) {
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
                autoComplete="new-password"
                type="password"
              />

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Register
