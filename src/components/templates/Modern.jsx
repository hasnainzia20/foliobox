import { forwardRef } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { FaAddressBook } from "react-icons/fa";
import "./modern.css";

import "./minimalist.css";

const Modern = forwardRef(({ state }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="h-[1122px] bg-gradient-to-r from-white from-[33%] to-gray-100 to-[33%] rounded-md"
      >
        {/* <hr /> */}
        <div className="flex flex-col items-center justify-between gap-2 rounded-md">
          <div className="mt-4 resume  text-black w-full p-4">
            <div className="flex flex-col  gap-1">
              <div>
                <h1 className="text-5xl font-bold">
                  {state.name ? state.name : "John Doe"}
                </h1>
              </div>
              <div>
                <span className="text-sm font-semi-bold">
                  {state.title ? state.title : "Military Social Worker"}
                </span>
              </div>
              <div>
                <p className="text-xs">
                  {state.summary
                    ? state.summary
                    : "Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives. Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <hr /> */}
        <div className="flex">
          {/* left side */}
          <div className="w-1/3 pr-3 pt-3 pb-3 pl-0">
            {/* contact */}
            <div>
              <div className="bg-[#795200] p-2 text-white mr-10">
                <h2 className="text-xl text-white font-bold uppercase">
                  Contact
                </h2>
              </div>
              <div className="p-4">
                <ul className="flex flex-col ">
                  <li className="flex items-center gap-2 my-2">
                    <span className="text-xl">
                      <FaPhoneAlt />
                    </span>
                    <span className="text-sm">
                      {state.phone ? state.phone : "+123456789"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 my-2">
                    <span>
                      <MdEmail className="text-xl" />
                    </span>
                    <span className="text-sm">
                      {state.email ? state.email : "adam@gmail.com"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 my-2">
                    <span>
                      <CiGlobe className="text-xl" />
                    </span>
                    <span className="text-sm">
                      {state.website ? state.website : "adam.website.com"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2 my-2">
                    <span>
                      <FaAddressBook className="text-xl" />
                    </span>
                    <span className="text-sm text-wrap ">
                      {state.location ? state.location : "New York"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* education */}
            <div>
              <div className="bg-[#795200] p-2 text-white mr-10">
                <h2 className="text-xl text-white font-bold uppercase   ">
                  Education
                </h2>
              </div>
              <div className="p-4">
                <ul className="flex flex-col gap-2 list-none">
                  {/* <li className="text-sm">Master of Social Work (MSW)</li>
                  <li className="text-sm">
                    University of Colorado, Colorado Springs, CO
                  </li>
                  <li className="text-sm">Bachelor of Social Work (BSW)</li>
                  <li className="text-sm">
                    University of Northern Colorado, Greeley, CO
                  </li> */}

                  {state.education.length > 0 ? (
                    state.education.map((edu, i) => {
                      return (
                        <li key={i} className="text-sm">
                          <div className="flex flex-col justify-between items-baseline mb-1">
                            <p className="text-xl font-semibold">
                              <span className="capitalize">
                                {edu.school
                                  ? edu.school
                                  : "Borcelle University"}
                              </span>
                            </p>
                            <p className="text-[12px] font-normal">
                              <span>{edu.start ? edu.start : "2022"}</span> to
                              &nbsp;
                              <span>{edu.end ? edu.end : "2025"}</span>
                            </p>
                          </div>
                          <ul className=" exp-list list-disc list-inside">
                            <li className="text-sm">
                              {edu.degree
                                ? edu.degree
                                : "Bchelors of Computer Science"}
                            </li>
                            {edu.gpa && (
                              <li className="text-sm">
                                GPA: {edu.gpa ? `${edu.gpa}/4.0` : "3.5/4.0"}
                              </li>
                            )}
                          </ul>
                        </li>
                      );
                    })
                  ) : (
                    <li className="flex flex-col mb-3">
                      <p className="text-[12px] font-semibold">
                        <span>2022-02</span>&nbsp;to&nbsp;
                        <span>2025-04</span>
                      </p>
                      <p className="font-semibold">
                        <span>Borcelle University</span>
                      </p>
                      <ul className="list-disc list-inside">
                        <li className="text-sm">
                          Bchelors of Computer Science
                        </li>
                        <li className="text-sm">GPA: 3.3/4.0</li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* Skills */}
            <div>
              <div className="bg-[#795200] p-2 text-white mr-10">
                <h2 className="text-xl text-white font-bold uppercase   ">
                  Skills
                </h2>
              </div>
              <div className="p-4">
                <ul className="flex flex-col gap-2">
                  <ul className="exp-list list-disc list-inside">
                    {state.skills.length > 0 ? (
                      state.skills.map((skill, i) => {
                        return <li key={i}>{skill}</li>;
                      })
                    ) : (
                      <>
                        <li>Project Management</li>
                        <li>Time Management</li>
                        <li>Leadership</li>
                        <li>Critical Thinking</li>
                      </>
                    )}
                  </ul>
                </ul>
              </div>
            </div>
            {/* Languages */}
            <div>
              <div className="bg-[#795200] p-2 text-white mr-10">
                <h2 className="text-xl text-white font-bold uppercase   ">
                  Skills
                </h2>
              </div>
              <div className="p-4">
                <ul>
                  {state.languages.length > 0 ? (
                    state.languages.map((lang, i) => {
                      return (
                        <li key={i}>
                          <span className="font-semibold">{lang.name} : </span>
                          {lang.level}
                        </li>
                      );
                    })
                  ) : (
                    <li>
                      <span className="font-semibold">ENGLISH:</span> Fluent
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex-1 py-3">
            {/* Professional Experience */}
            <div>
              <div className="exp-div bg-gray-300 p-2 text-black">
                <h2 className="ml-7 text-xl font-bold">
                  Professional Experience
                </h2>
              </div>
              {/* <div className="p-4">
                <ul className="flex flex-col gap-4 text-sm">
                  <li>
                    <div className="font-semibold">
                      <span>Military Social Worker</span>
                      <span>
                        {"\u00A0"}|{"\u00A0"}
                      </span>
                      <span>Fort Carson Army Base</span>
                      <span>
                        {"\u00A0"}|{"\u00A0"}
                      </span>
                      <span>Colorado Springs, CO</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-[12px] font-semibold">
                        June 2020 - Present
                      </span>
                    </div>
                    <div>
                      <ul className="exp-list list-disc list-inside text-[13px]">
                        <li>
                          Provide counseling services for soldiers facing
                          deployment, reintegration, and trauma recovery
                        </li>
                        <li>
                          Provide counseling services for soldiers facing
                          deployment, reintegration, and trauma recovery
                        </li>
                        <li>
                          Provide counseling services for soldiers facing
                          deployment, reintegration, and trauma recovery
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="font-semibold">
                      <span>Military Social Worker</span>
                      <span>
                        {"\u00A0"}|{"\u00A0"}
                      </span>
                      <span>Fort Carson Army Base</span>
                      <span>
                        {"\u00A0"}|{"\u00A0"}
                      </span>
                      <span>Colorado Springs, CO</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-[12px] font-semibold">
                        June 2020 - Present
                      </span>
                    </div>
                    <div>
                      <ul className="exp-list list-disc list-inside text-[13px]">
                        <li>
                          Provide counseling services for soldiers facing
                          deployment, reintegration, and trauma recovery
                        </li>
                        <li>
                          Provide counseling services for soldiers facing
                          deployment, reintegration, and trauma recovery
                        </li>
                        <li>
                          Provide counseling services for soldiers facing
                          deployment, reintegration, and trauma recovery
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div> */}
              <div>
                <ul className="flex flex-col gap-4 list-none p-2 m-0">
                  {state.work.length > 0 && state.work.start !== "" ? (
                    state.work.map((job, i) => {
                      return (
                        <li key={i}>
                          <div>
                            <div className="mb-2">
                              <p className="flex justify-between">
                                <span className="font-semibold text-xl">
                                  {job.company && job.company}
                                </span>
                                <span className="text-[12px] font-semibold">
                                  {job.start && job.end && `${job.start}`}
                                  {job.start && job.end && (
                                    <span>
                                      {"\u00A0"}to{"\u00A0"}
                                    </span>
                                  )}
                                  {job.end && job.start && `${job.end}`}
                                </span>
                              </p>
                              <p className="font-semibold text-[12px]">
                                {job.role && job.role}
                              </p>
                            </div>
                            <div>
                              <ul className="exp-list list-disc list-inside text-sm">
                                {state.work[i].responsibilities.length > 0 ? (
                                  state.work[i].responsibilities.map(
                                    (exp, j) => {
                                      return <li key={j}>{exp}</li>;
                                    }
                                  )
                                ) : (
                                  <>
                                    <span>No Work Experience</span>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <span>No Work Experience</span>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Modern;
