import { createSignal } from 'solid-js'

export const createSignalObject = (value) => {
  const [get, set] = createSignal(value)

  return { get, set }
}
