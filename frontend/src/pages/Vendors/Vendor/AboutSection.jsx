import { formateDate } from "#lib/utils";
import _ from "lodash";

export default function AboutSection({ vendor }) {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leadin-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor  font-bold text-[24px] leading-9">
            {_.capitalize(vendor.name)}
          </span>
        </h3>
        <p className="text__para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab placeat
          temporibus est quisquam ad iure eligendi aut saepe quis, nobis
          cupiditate animi, eos dolor enim deserunt ut odit fuga et!
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leadin-[30px] text-headingColor font-semibold-">
          Qualifications{" "}
        </h3>

        <ul className="pt-4 md:p-5">
          {vendor.qualifications &&
            vendor.qualifications.map((item) => {
              <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mt-[30px]">
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6  font-semibold">
                    {formateDate("12-04-2010")}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    Phd in Cs
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  Budapest, Hungary
                </p>
              </li>;
            })}
        </ul>
      </div>
      <div className="mt-12 hidden">
        <h3 className="text-[20px] leadin-[30px] text-headingColor font-semibold-">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6  font-semibold">
              {formateDate("12-04-2010")} - {formateDate("12-04-2010")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Software Enginer
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Budapest, Hungary
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6  font-semibold">
              {formateDate("12-04-2010")} - {formateDate("12-04-2010")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Software Enginer
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Budapest, Hungary
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
