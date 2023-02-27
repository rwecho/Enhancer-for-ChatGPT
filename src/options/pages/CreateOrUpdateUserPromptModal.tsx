import { CreateAndUpdateModalProps } from '@/hooks/useCreateAndUpdateModal'
import { Prompt } from '@/services/PromptsService'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Spacer,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'

export type CreateOrUpdateUserPromptModalProps = {} & CreateAndUpdateModalProps
export const CreateOrUpdateUserPromptModal = (
  props: CreateOrUpdateUserPromptModalProps
) => {
  const { postCancel, postOk, item } = props

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const initialValues = item ?? ({} as Prompt)

  const onSubmit = (values: Prompt) => {
    postOk(values)
  }
  const handleCancel = () => {
    postCancel()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={{ base: '3xl' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {item?.act === undefined
            ? 'Add User Custom Prompt'
            : 'Edit User Custom Prompt'}
        </ModalHeader>
        <ModalBody>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(props: any) => (
              <Form>
                <SimpleGrid columns={{ base: 1 }} spacing={4}>
                  <Field name="act">
                    {({ field, form }: any) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.act && form.touched.act}
                      >
                        <FormLabel htmlFor="act">Act</FormLabel>
                        <Input {...field} id="act" placeholder="Act" />
                        <FormErrorMessage>{form.errors.Act}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="prompt">
                    {({ field, form }: any) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.prompt && form.touched.prompt}
                      >
                        <FormLabel htmlFor="prompt">Prompt</FormLabel>
                        <Input {...field} id="prompt" placeholder="Prompt" />
                        <FormErrorMessage>
                          {form.errors.prompt}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </SimpleGrid>

                <HStack my={4}>
                  <Spacer></Spacer>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
