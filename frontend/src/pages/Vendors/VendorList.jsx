import { useBackendGet } from "../../lib/hooks";
import VendorCard from "./Vendor/VendorCard";

export default function VendorList() {
  const [vendors, fetchVendors] = useBackendGet("vendors", []);

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
          </div>
        </div>
        <br />

        <div className="container">
          <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mx-auto ">
            {vendors.map((vendor) => (
              <VendorCard key={vendor._id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
