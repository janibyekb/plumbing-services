import { useNavigate } from "react-router-dom";

export default function ServiceCard({ item }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="inline-flex gap-5 px-5 "
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/plumbers", { state: { name: item.name } })}
      >
        <div className="w-[250px]">
          <img src={item.img} alt="..." className="mx-auto " />
          <h5 className="text-center text-headingColor font-[700] mt-2">
            {item.name}
          </h5>
        </div>
        <div className="">{item.desc}</div>
      </div>
    </>
  );
}
