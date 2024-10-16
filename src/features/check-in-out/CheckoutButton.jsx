import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingout}
      onClick={() => checkout(bookingId)}
    >
      {isCheckingout ? <SpinnerMini /> : "Checkout"}
    </Button>
  );
}

export default CheckoutButton;
