import heroImg01 from "../assets/images/hero.png";
import plumbingMan from "../assets/images/canvas/plumbing-man.png";
import plumbingService from "../assets/images/canvas/plumbing-service.png";
import icon03 from "../assets/images/canvas/icon03.png";
import faqImg from "../assets/images/faq-img.png";

import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import ServiceList from "../components/Services/ServiceList";

import FaqList from "../components/Faq/FaqList";
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <>
        <section className="hero__section pt-[60px] 2xl:h-[700px]">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              {/*========= hero section ========= */}
              <div>
                <div className="lg:w-[570px]">
                  <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[54px] md:leading-[65px]">
                    We help clients find plumbing experts they can count on
                  </h1>
                  <p className="text__para">
                    Are you tired of dealing with plumbing issues that interrupt
                    your everyday life? We present to you an extensive selection
                    of plumbing solutions tailored to suit your specific needs.
                  </p>
                  <div>
                    <button
                      className=" outlined me-4"
                      // onClick={() => navigate("plumbers")}
                    >
                      {" "}
                      Create Appointment
                    </button>{" "}
                    <button
                      className="btn"
                      onClick={() => navigate("plumbers")}
                    >
                      {" "}
                      Find a plumber
                    </button>
                  </div>
                </div>
              </div>
              {/*========= hero section ========= */}

              <div className="  xl:w-[650px] ">
                <img
                  className="w-full rounded-3xl"
                  style={{}}
                  src={heroImg01}
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/*========= hero section end ========= */}
        <section>
          <div className="container">
            <div className="lg:w-[470px] mx-auto">
              <h2 className="heading text-center">
                Providing the best plumbing services
              </h2>
              <p className="text__para text-center">
                Your satisfaction is our top priority, and we are eager to prove
                it.
              </p>
            </div>
            <div className="flex flex-wrap items-center flex-col md:flex-row gap-5 lg:gap-[30px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] ">
                <div className="py-[30px] px-5">
                  <div className="flex items-center justify-center h-[200px]">
                    <img src={plumbingService} alt="" />
                  </div>
                  <div className="mt-[30px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Select a service
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      World-class service for everyone. Our experts offer
                      unmatched quality service that you can count on
                    </p>

                    <Link
                      to="/services"
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px]
                    mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </div>
                <div className="py-[30px] px-5">
                  <div className="flex items-center justify-center h-[200px]">
                    <img src={plumbingMan} alt="" className="" />
                  </div>
                  <div className="mt-[30px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Find a plumber
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      World-class service for everyone. Our experts offer
                      unmatched quality service that you can count on
                    </p>

                    <Link
                      to="/plumbers"
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px]
                    mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </div>

                <div className="py-[30px] px-5 ">
                  <div className="flex items-center justify-center h-[200px]">
                    <img src={icon03} alt="" />
                  </div>
                  <div className="mt-[30px]">
                    <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                      Book Appointment
                    </h2>
                    <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                      World-class service for everyone. Our experts offer
                      unmatched quality service that you can count on
                    </p>

                    <Link
                      to="/plumbers"
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px]
                    mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*========= Services Section ========= */}
        <section>
          <div className="container">
            <div className="xl:w-[470px] mx-auto">
              <h2 className="heading text-center  ">Plumbing services</h2>
              <p className="text__para text-center">
                World-class service for everyone. Our experts offer unmatched
                quality service that you can count on
              </p>
            </div>
            <ServiceList />
          </div>
        </section>

        {/*-----------FAQ-----------*/}
        <section>
          <div className="container">
            <div className="xl:w-[500px] mx-auto">
              <h2 className="heading text-center">
                Most questions asked by our clients
              </h2>
              <p></p>
            </div>
            <div className="flex justify-between gap-[50px] lg:gap-0 ">
              <div className="w-1/3 hidden md:block  mx-auto pt-10">
                <img src={faqImg} alt="" className="w-full" />
              </div>

              <div className="w-full md:w-1/2">
                <FaqList />
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
}
