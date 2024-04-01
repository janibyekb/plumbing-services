import PlumberCard from "../../components/Plumbers/PlumberCard";
import { useBackendGet } from "../../lib/hooks";

export default function Plumbers() {
  const [plumbers, fetchPlumbers] = useBackendGet("vendors", []);
  console.log(plumbers);
  return (
    <>
      <section className="bg-[#ffff0ea] pt-5">
        <div className="container text-center">
          <h2 className="heading"> Find a Plumber</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Plumber"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
        <br />

        <div className="container ">
          <div className="grid grid-cold-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {plumbers.map((plumber) => (
              <PlumberCard key={plumber.id} plumber={plumber} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
