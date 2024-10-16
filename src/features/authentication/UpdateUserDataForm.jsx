import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUserData } from "./useUpdateUserData";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    userData: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUserData, isUpdatingUserData } = useUpdateUserData();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUserData({ fullName, avatar });
  }

  function handleCancel(e) {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow labelName="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow labelName="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUserData}
        />
      </FormRow>
      <FormRow labelName="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdatingUserData}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdatingUserData}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUserData}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
