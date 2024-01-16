import { useState } from "react";

import { services } from "../../assets/data/services1";
import ServiceCard from "./ServiceCard";

import emergency from "../../assets/images/services/emergency.png";

export default function ServiceList() {
  const [service, setService] = useState("");
  return (
    <section className="container px-10 pt-5">
      <h2 className="heading text-center text-[40px]"> Select your service</h2>
      <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between ">
        <img src={emergency} className="h-[55px]" />
        <input
          type="text"
          onChange={(e) => setService(e.target.value)}
          className="py-4 pl-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
          placeholder="Enter your custom service"
        />
        <button className="btn mt-0 rounded-[0px] rounded-r-md">Next</button>
      </div>
      <div className="text-headingColor text-[24px] font-[600] mt-6">
        Main services selected by our clients:{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-[30px] mt-[20px]">
        {services.map((item, index) => (
          <>{index > 0 && <ServiceCard item={item} key={index} />}</>
        ))}
      </div>
    </section>
  );
}
