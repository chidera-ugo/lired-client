import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react"

const defaultState = {
  accessToken: "",
}
export type DispatchType = Dispatch<SetStateAction<typeof defaultState>>
const defaultDispatch: DispatchType = () => defaultState
export type State = typeof defaultState

const UserContext = createContext<{
  state: State
  dispatch: DispatchType
}>({
  state: defaultState,
  dispatch: defaultDispatch,
})

export const UserProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const [state, dispatch] = useState(defaultState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined)
    throw new Error("useUser must be inside a Provider with a value")

  return context
}
