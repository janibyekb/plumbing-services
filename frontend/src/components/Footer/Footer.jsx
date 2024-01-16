import { Link } from "react-router-dom";

import { RiLinkedinFill } from "react-icons/ri";

import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
export default function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = [];
  const quickLinks01 = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/plumbers",
      display: "Plumbers",
    },
    {
      path: "/services",
      display: "Services",
    },
  ];
  return (
    <footer className="pb-16 pt-10 bg-slate-200">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <Link to="/">
              <h1 className="font-bold flex flex-wrap text-[21px]">
                <span className="text-blue-700">Service</span>
                <span className="text-slate-700">Hub</span>
              </h1>
            </Link>
            <p className="text-[16px] leading-9 font-[400] text-textColor mt-4">
              © Copyright {year} developed by Janiyek Bolatkhan all right
              reserved
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center
                justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
              Quick Links
              <ul>
                {quickLinks01.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      to={item.path}
                      className="text-[16px] leading-7 font-400 text-textColor"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
