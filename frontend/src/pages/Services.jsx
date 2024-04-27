import { services } from "../assets/data/services1";

export default function Services() {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
    //   {services.map((item, index) => (
    //     <ServiceCard item={item} index={index} key={index} />
    //   ))}
    // </div>
    <section className="container px-10">
      <h4 className="mt-2">Main services selected by our clients: </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
        {services.map((item, index) => (
          <>
            <div
              className="border border-1 rounded-3xl items-center w-[200px] py-5 px-5"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/plumbers", { state: { name: item.name } })
              }
            >
              <img src={item.img} alt="..." className="mx-auto " />
              <h5 className="text-center text-headingColor font-[700] mt-2">
                {item.name}
              </h5>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
