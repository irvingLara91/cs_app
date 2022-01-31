import { Center, Heading, FormControl, Input, Stack, VStack, Button } from "native-base";
import { useForm, Controller } from "react-hook-form";

const PasswordRecovery =  () => {
  return (
    <Center>
      <Stack mt={3} space={4} w="75%" maxW="300px">
        <Heading>Help with password</Heading>
        <PasswordRecoveryForm />
      </Stack>
    </Center>
  )
}

const PasswordRecoveryForm = () => {


  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit= (values) => {
    console.log({values})
  }

  return (
    <VStack space={2} alignItems="center"> 
      <FormControl isRequired isInvalid={"email" in errors}>
        <FormControl.Label>Email address</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              variant="outline"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: 'Field is required', minLength: 3 }}
          defaultValue=""
        />
        <FormControl.ErrorMessage>
          {errors?.email?.message}
        </FormControl.ErrorMessage>
      </FormControl>
        <Button onPress={handleSubmit(onSubmit)} size="lg" style={{width: "100%"}}>
        Recover password
      </Button>
    </VStack>
  )
}

export default PasswordRecovery;