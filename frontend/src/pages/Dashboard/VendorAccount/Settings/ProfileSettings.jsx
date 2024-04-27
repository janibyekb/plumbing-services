export default function ProfileSettings() {
  return (
    <div>
      {" "}
      <div className="mt-[50px] md:mt-[100px]">
        <button className="w-full bg-[#181a1e] p-3 text-[16px] leading-7 rounded-md text-white mb-2">
          Logout
        </button>
        <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
          Delete Account
        </button>
      </div>
    </div>
  );
}
