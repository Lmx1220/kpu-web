import { createContext, useContext } from '@/hooks/core/useContext'

export interface DialogContextProps {
  redoDialogHeight: () => void
}

// eslint-disable-next-line symbol-description
const key: InjectionKey<DialogContextProps> = Symbol()

export function createDialogContext(context: DialogContextProps) {
  return createContext<DialogContextProps>(context, key)
}

export function useDialogContext() {
  return useContext<DialogContextProps>(key)
}
