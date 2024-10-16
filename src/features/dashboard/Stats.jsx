import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";

import Stat from "./Stat";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const numBookings = bookings.length;

  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkin = confirmedStays.length;

  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);
  console.log(checkin, numDays, cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Checkins"
        color={"indigo"}
        icon={<HiOutlineCalendar />}
        value={checkin}
      />
      <Stat
        title="Occupancy rate"
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
