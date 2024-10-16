import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, handleCloseModal }) {
  //this is for if the component actually gets a cabin to edit as a prop.
  const { id: editId, ...editValues } = cabinToEdit;

  //this is for checking to know if we are are actually editing not creating a cabin
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { createCabin, isCreating } = useCreateCabin(handleCloseModal);
  const { editCabin, isEditing } = useEditCabin(handleCloseModal);

  //this for a fn for the handleSubmit fn to call with that data that is from the form(::handleSubmit is a fn from hook forms :))
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else createCabin({ ...data, image });
  }

  //the actually form
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={handleCloseModal ? "modal" : "regular"}
    >
      <FormRow labelName={"Cabin name"} errors={errors}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This is required", minLength: 1 })}
        />
      </FormRow>
      <FormRow labelName={"Maximum capacity"} errors={errors}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This is required", min: 1 })}
        />
      </FormRow>
      <FormRow labelName={"Regular Price"} errors={errors}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This is required",
            min: 1,
          })}
        />
      </FormRow>
      <FormRow labelName={"Discount"} errors={errors}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This is required",
            validate: (value) =>
              getValues("regularPrice") > value ||
              "discount must be lower than regualar price",
          })}
        />
      </FormRow>
      <FormRow labelName={"Description"} errors={errors}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This is required" })}
        />
      </FormRow>

      <FormRow labelName={"Cabin Photo"} errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

//trust me. commenting helps 0_0.
