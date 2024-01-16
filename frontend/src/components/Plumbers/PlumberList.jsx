import { doctors } from "../../assets/data/doctors";
import PlumberCard from "./PlumberCard";
import { useBackendGet } from "../../lib/hooks";
import { Outlet } from "react-router-dom";

export default function PlumberList() {
  const [plumbers, fetchPlumbers] = useBackendGet("plumbers", []);
  console.log(plumbers);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {plumbers.map((plumber) => (
        <PlumberCard key={plumber.id} plumber={plumber} />
      ))}
    </div>
  );
}
