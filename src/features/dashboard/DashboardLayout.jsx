import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "../bookings/useRecentBookings";
import useCabins from "../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "../bookings/useRecentStays";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading2 } = useCabins();

  if (isLoading || isLoadingStays || isLoading2) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
