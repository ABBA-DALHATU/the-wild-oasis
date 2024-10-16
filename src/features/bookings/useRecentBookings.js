import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();
  console.log("data in ISO", queryDate);
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", `last ${numDays} days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isLoading };
}
