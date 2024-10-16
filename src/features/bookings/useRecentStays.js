import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stays", `last ${numDays} days`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (cur) => cur.status === "checked-in" || cur.status === "checked-out"
  );

  return {
    stays,
    confirmedStays,
    isLoading,
    numDays,
  };
}
