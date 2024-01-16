export default function ServiceCard({ item }) {
  return (
    <>
      <div
        class="inline-flex gap-5 px-5 "
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/plumbers", { state: { name: item.name } })}
      >
        <div className="w-[250px]">
          <img src={item.img} alt="..." className="mx-auto " />
          <h5 className="text-center text-headingColor font-[700] mt-2">
            {item.name}
          </h5>
        </div>
        <div class="">{item.desc}</div>
      </div>
    </>
  );
}
