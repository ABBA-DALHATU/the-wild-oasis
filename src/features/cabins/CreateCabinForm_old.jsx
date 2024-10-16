import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow2 from "../../ui/FormRow";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ cabinToEdit = {} }) {
  //this is for if the component actually gets a cabin to edit as a prop.
  const { id: editId, ...editValues } = cabinToEdit;

  //this is for checking to know if we are are actually editing not creating a cabin
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  //only here so we can invalidate on success to reload the page
  const queryClient = useQueryClient();

  //mutate fn for creating a cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //mutate fn for editing a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //this for a fn for the handleSubmit fn to call with that data that is from the form(::handleSubmit is a fn from hook forms :))
  function onSubmit(data) {
    console.log(data);
    console.log({ ...data, image: data.image[0] });

    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else createCabin({ ...data, image });
  }

  //the actually form
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow2 labelName={"Cabin name"} errors={errors}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This is required", minLength: 1 })}
        />
      </FormRow2>
      <FormRow2 labelName={"Maximum capacity"} errors={errors}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This is required", min: 1 })}
        />
      </FormRow2>
      <FormRow2 labelName={"Regular Price"} errors={errors}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This is required",
            min: 1,
          })}
        />
      </FormRow2>
      <FormRow2 labelName={"Discount"} errors={errors}>
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
      </FormRow2>
      <FormRow2 labelName={"Description"} errors={errors}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This is required" })}
        />
      </FormRow2>

      <FormRow2 labelName={"Cabin Photo"} errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This is required",
          })}
        />
      </FormRow2>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset ">
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
