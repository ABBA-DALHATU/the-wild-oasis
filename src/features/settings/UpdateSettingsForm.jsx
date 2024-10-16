import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings = {} } = useSettings();
  const { newSettings } = useUpdateSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPricing,
  } = settings;
  const { register } = useForm();

  function handleUpdateSetting(e, field) {
    const value = e.target.value;
    if (!value || !field) return;
    console.log(field, value);
    newSettings({ [field]: value });
  }
  return (
    <Form>
      <FormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("min-nights", {
            onBlur: (e) => handleUpdateSetting(e, "minBookingLength"),
          })}
        />
      </FormRow>
      <FormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register("max-nights", {
            onBlur: (e) => handleUpdateSetting(e, "maxBookingLength"),
          })}
        />
      </FormRow>
      <FormRow labelName="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          {...register("max-guests", {
            onBlur: (e) => handleUpdateSetting(e, "maxGuestsPerBooking"),
          })}
        />
      </FormRow>
      <FormRow labelName="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPricing}
          {...register("breakfast-price", {
            onBlur: (e) => handleUpdateSetting(e, "breakfastPricing"),
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
