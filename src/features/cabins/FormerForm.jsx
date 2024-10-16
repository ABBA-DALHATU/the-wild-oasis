//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", { required: "This is required", min: 1 })}
//         />
//         <Error>{errors?.maxCapacity?.message}</Error>
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This is required",
//             min: 1,
//           })}
//         />
//         <Error>{errors?.regularPrice?.message}</Error>
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This is required",
//             validate: (value) =>
//               getValues("regularPrice")[0] > value ||
//               "discount must be lower than regualar price",
//           })}
//         />

//         <Error>{errors?.discount?.message}</Error>
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This is required" })}
//         />
//         <Error>{errors?.description?.message}</Error>
//       </FormRow>
//    <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>
