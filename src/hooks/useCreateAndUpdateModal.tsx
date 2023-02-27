import React, {
  ComponentType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

export type CreateAndUpdateModalProps = {
  postClose: () => void
  postCancel: () => void
  postOk: (item?: any) => void
  item?: any
}

export type CreateAndUpdateModalType = ComponentType<CreateAndUpdateModalProps>

export interface CreateAndUpdateModal {
  show: (
    modal: CreateAndUpdateModalType,
    item?: any
  ) => Promise<unknown | undefined>
}

const defaultContext: CreateAndUpdateModal = {
  show(createAndUpdateModalType: CreateAndUpdateModalType, item?: any) {
    throw new Error('<CreateAndUpdateModalProvider> is missing')
  },
}

export const CreateAndUpdateModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [modal, setModal] = useState<ReactNode | null>(null)
  const createOpener = useCallback(
    () => (CreateAndUpdateModalType: CreateAndUpdateModalType, item?: any) =>
      new Promise((resolve) => {
        const handleClose = () => {
          setModal(null)
          resolve(null)
        }

        const handleCancel = () => {
          setModal(null)
          resolve(null)
        }

        const handleOK = (item?: any) => {
          setModal(null)
          resolve(item)
        }

        setModal(
          <CreateAndUpdateModalType
            postClose={handleClose}
            postCancel={handleCancel}
            postOk={handleOK}
            item={item}
          ></CreateAndUpdateModalType>
        )
      }),
    []
  )

  return (
    <CreateAndUpdateModalContext.Provider
      value={{
        show: createOpener(),
      }}
    >
      {children}
      {modal}
    </CreateAndUpdateModalContext.Provider>
  )
}

const CreateAndUpdateModalContext =
  createContext<CreateAndUpdateModal>(defaultContext)

const useCreateAndUpdateModal = () => useContext(CreateAndUpdateModalContext)
export default useCreateAndUpdateModal
