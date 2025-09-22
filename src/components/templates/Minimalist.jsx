import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

function Minimalist({ state }) {
  return (
    <>
      <div className="text-gray-600">
        {/* <hr /> */}
        <div className="flex flex-col items-center justify-between p-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold">
              {state.name ? state.name : "John Doe"}
            </h1>
          </div>
          <div>
            <span className="text-lg font-semi-bold text-gray-500">
              {state.title ? state.title : "Software Engineer"}
            </span>
          </div>
        </div>

        {/* <hr /> */}
        <div className="flex border-y">
          {/* left side */}
          <div className=" border-r">
            {/* contact */}
            <div className="flex flex-col gap-3  border-b py-4 px-2">
              <div>
                <h1 className="text-xl font-bold">CONTACT</h1>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>{state.phone ? state.phone : "+123456789"}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoMdMail />
                <p className="text-sm text-wrap ">
                  {state.email ? state.email : "adam@gmail.com"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot />
                <span>{state.location ? state.location : "New York"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CiGlobe />
                <span>
                  {state.website ? state.website : "adam.website.com"}
                </span>
              </div>
            </div>

            {/* education */}

            <div className="flex flex-col gap-3  border-b py-4 px-2">
              <div>
                <h1 className="text-xl font-bold">EDUCATION</h1>
              </div>
              <div>
                <ul>
                  {state.education.length > 0 ? (
                    state.education.map((edu, i) => {
                      return (
                        <li key={i} className="flex flex-col mb-3">
                          <p className="font-semibold">
                            <span>{edu.start ? edu.start : "2022"}</span> to
                            <span>{edu.end ? edu.end : "2025"}</span>
                          </p>
                          <p className="font-semibold">
                            <span>
                              {edu.school ? edu.school : "Borcelle University"}
                            </span>
                          </p>
                          <ul className="list-disc list-inside">
                            <li>
                              {edu.degree
                                ? edu.degree
                                : "Bchelors of Computer Science"}
                            </li>
                            {edu.gpa && (
                              <li>
                                GPA: {edu.gpa ? `${edu.gpa}/4.0` : "3.5/4.0"}
                              </li>
                            )}
                          </ul>
                        </li>
                      );
                    })
                  ) : (
                    <li className="flex flex-col mb-3">
                      <p className="font-semibold">
                        <span>2022-02</span>&nbsp;to&nbsp;
                        <span>2025-04</span>
                      </p>
                      <p className="font-semibold">
                        <span>Borcelle University</span>
                      </p>
                      <ul className="list-disc list-inside">
                        <li>Bchelors of Computer Science</li>
                        <li>GPA: 3.3/4.0</li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* skills */}
            <div className="flex flex-col gap-3  border-b py-4 px-2">
              <div>
                <h1 className="text-xl font-bold">SKILLS</h1>
              </div>
              <div>
                <ul className="list-disc list-inside">
                  {state.skills.length > 0 ? (
                    state.skills.map((skill, i) => {
                      return <li key={i}>{skill}</li>;
                    })
                  ) : (
                    <li>Project Management</li>
                  )}

                  <li>Time Management</li>
                  <li>Leadership</li>
                  <li>Critical Thinking</li>
                </ul>
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-3 py-4 px-2">
              <div>
                <h1 className="text-xl font-bold">LANGUAGES</h1>
              </div>
              <div>
                <ul>
                  {state.languages.length > 0 ? (
                    state.languages.map((lang, i) => {
                      return (
                        <li key={i}>
                          <span className="font-semibold">{lang.name} : </span>{" "}
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
          <div className="flex-1">
            {/* profile Summary */}
            <div className="flex flex-col  border-b py-4 px-2">
              <div>
                <h2 className="text-xl font-bold">PROFILE SUMMARY</h2>
              </div>
              <div>
                <p>
                  {state.summary
                    ? state.summary
                    : "Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives."}
                </p>
              </div>
            </div>
            <div className="flex flex-col  py-4 px-2">
              <div className="text-xl font-bold">
                <h2>WORK EXPERIENCE</h2>
              </div>
              <div>
                <ul className="flex flex-col gap-4 list-none">
                  {state.work.length > 0 && state.work.start !== "" ? (
                    state.work.map((job, i) => {
                      return (
                        <li key={i}>
                          <div>
                            <div className="mb-2">
                              <p className="flex justify-between">
                                <span className="font-semibold">
                                  {job.company && job.company}
                                </span>
                                <span>
                                  {job.start && job.end && `${job.start}`}
                                  {job.start && job.end && (
                                    <span>
                                      {"\u00A0"}to{"\u00A0"}
                                    </span>
                                  )}
                                  {job.end && job.start && `${job.end}`}
                                </span>
                              </p>
                              <p className="font-semibold">
                                {job.role && job.role}
                              </p>
                            </div>
                            <div>
                              <ul className="list-disc list-inside text-sm">
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
}

export default Minimalist;
