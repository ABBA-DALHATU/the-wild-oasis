import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Full name" errors={errors}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow labelName="Email address" errors={errors}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: "/S+@S+.S+/",
              message: "Please provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Password (min 8 characters)" errors={errors}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow labelName="Repeat password" errors={errors}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
