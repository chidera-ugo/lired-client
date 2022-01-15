import gql from "graphql-tag"
import * as Urql from "urql"

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  createPost: Post
  deletePost: Scalars["Boolean"]
  login: UserResponse
  logout: Scalars["Boolean"]
  refreshToken: RefreshTokenResponse
  register: UserResponse
  updatePost?: Maybe<Post>
}

export type MutationCreatePostArgs = {
  title: Scalars["String"]
}

export type MutationDeletePostArgs = {
  id: Scalars["Float"]
}

export type MutationLoginArgs = {
  options: UsernamePassword
}

export type MutationRegisterArgs = {
  options: UsernamePassword
}

export type MutationUpdatePostArgs = {
  id: Scalars["Float"]
  title: Scalars["String"]
}

export type Post = {
  __typename?: "Post"
  createdAt: Scalars["String"]
  id: Scalars["Int"]
  title: Scalars["String"]
  updatedAt: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  me?: Maybe<User>
  post?: Maybe<Post>
  posts: Array<Post>
  users: Array<User>
}

export type QueryPostArgs = {
  id: Scalars["Int"]
}

export type RefreshTokenResponse = {
  __typename?: "RefreshTokenResponse"
  accessToken: Scalars["String"]
}

export type User = {
  __typename?: "User"
  createdAt: Scalars["String"]
  id: Scalars["Int"]
  updatedAt: Scalars["String"]
  username: Scalars["String"]
}

export type UserResponse = {
  __typename?: "UserResponse"
  accessToken?: Maybe<Scalars["String"]>
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type UsernamePassword = {
  password: Scalars["String"]
  username: Scalars["String"]
}

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]
  password: Scalars["String"]
}>

export type LoginMutation = {
  __typename?: "Mutation"
  login: {
    __typename?: "UserResponse"
    accessToken?: string | null | undefined
    errors?:
      | Array<{ __typename?: "FieldError"; field: string; message: string }>
      | null
      | undefined
    user?:
      | { __typename?: "User"; id: number; username: string }
      | null
      | undefined
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean }

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"]
  password: Scalars["String"]
}>

export type RegisterMutation = {
  __typename?: "Mutation"
  register: {
    __typename?: "UserResponse"
    errors?:
      | Array<{ __typename?: "FieldError"; field: string; message: string }>
      | null
      | undefined
    user?:
      | { __typename?: "User"; id: number; username: string }
      | null
      | undefined
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: "Query"
  me?: { __typename?: "User"; id: number; username: string } | null | undefined
}

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
      accessToken
    }
  }
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  )
}
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  )
}
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}
