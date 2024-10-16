import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUserData } from "./useUpdateUserData";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUserData, isUpdatingUserData } = useUpdateUserData();

  function onSubmit({ password }) {
    updateUserData({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Password (min 8 characters)" errors={errors}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdatingUserData}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Confirm password" errors={errors}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdatingUserData}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdatingUserData}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
