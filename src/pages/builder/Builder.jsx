import { useReducer, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Minimalist from "../../components/templates/Minimalist";
import Modern from "../../components/templates/Modern";
import { MdOutlineCancel } from "react-icons/md";
import { formReducer, initialState } from "../../reducers/formReducer";
import { NavLink } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../utils/firebase";

function Builder() {
  const { templateId } = useParams(); // <<-- gets 'minimalist'
  const previewRef = useRef(null); // for export
  const nav = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const lastWork = state.work[state.work.length - 1] || {};

  useEffect(() => {
    let mounted = true;
    async function loadResume() {
      const user = auth.currentUser;
      if (!user) return; // not signed in: optionally nav('/login')
      const ref = doc(db, "users", user.uid, "resumes", templateId);
      const snap = await getDoc(ref);
      if (mounted && snap.exists()) {
        const payload = snap.data().data || {};
        dispatch({ type: "SET_STATE", payload });
      }
    }
    loadResume();
    return () => {
      mounted = false;
    };
  }, [templateId]);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.id,
      value: e.target.value,
    });
  };

  const handleSubmitEdu = (e) => {
    e.preventDefault();
    if (state.editingIndex !== null) {
      dispatch({ type: "SAVE_EDIT" });
    } else {
      dispatch({ type: "ADD_EDUCATION" });
    }
  };

  async function saveResume(e) {
    e?.preventDefault?.();
    const user = auth.currentUser;
    if (!user) {
      nav("/login");
      return;
    }
    const ref = doc(db, "users", user.uid, "resumes", templateId);
    try {
      await setDoc(ref, {
        templateId,
        updatedAt: serverTimestamp(),
        data: state,
      });
      // keep state as is (no auto-reset) so preview stays visible
      alert("Resume saved successfully!");
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed");
    }
  }

  async function handleExportPdf() {
    const html2canvas = (await import("html2canvas-pro")).default;
    const { jsPDF } = await import("jspdf");
    const node = previewRef.current;
    if (!node) return;
    const canvas = await html2canvas(node, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${templateId}-resume.pdf`);
  }

  return (
    <div className="flex">
      {/* left */}
      <div className="flex-1 p-2  overflow-y-scroll max-h-screen bg-[#e5e7eb]">
        <div className="flex my-4 ">
          <div className="flex-1">
            <NavLink to="/dashboard" className="text-lg underline">
              &larr; Go Back
            </NavLink>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
        </div>
        <form className="p-4 border border-[#9ca3af] rounded-md bg-[#ffffff] shadow-md">
          {/* profile fields */}
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex-1">
              <label className="text-sm text-[#9ca3af]" htmlFor="name">
                Enter name
              </label>
              <input
                className="border border-[#9ca3af] rounded-md p-2 w-full focus:outline-none"
                type="text"
                value={state.name}
                onChange={handleChange}
                id="name"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-[#9ca3af]" htmlFor="title">
                Professional Title
              </label>
              <input
                className="border border-[#9ca3af] rounded-md p-2 w-full focus:outline-none"
                type="text"
                value={state.title}
                onChange={handleChange}
                id="title"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-col  gap-2">
            <div className="flex-1">
              <label className="text-sm text-[#9ca3af]" htmlFor="email">
                Email
              </label>
              <input
                className="border border-[#9ca3af] rounded-md p-2 w-full focus:outline-none"
                type="email"
                value={state.email}
                onChange={handleChange}
                id="email"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-[#9ca3af]" htmlFor="phone">
                Phone
              </label>
              <input
                className="border border-[#9ca3af] rounded-md p-2 w-full focus:outline-none"
                type="text"
                value={state.phone}
                onChange={handleChange}
                id="phone"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-col  gap-2">
            <div className="flex-1">
              <label className="text-sm text-[#9ca3af]" htmlFor="location">
                Location
              </label>
              <input
                className="border border-[#9ca3af] rounded-md p-2 w-full focus:outline-none"
                type="text"
                value={state.location}
                onChange={handleChange}
                id="location"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-[#9ca3af]" htmlFor="website">
                Website
              </label>
              <input
                className="border border-[#9ca3af] rounded-md p-2 w-full focus:outline-none"
                type="text"
                value={state.website}
                onChange={handleChange}
                id="website"
              />
            </div>
          </div>

          <hr className="my-4 border-[#9ca3af]" />
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-sm text-[#9ca3af]" htmlFor="summary">
              Summary
            </label>
            <textarea
              className="border border-[#9ca3af] rounded-md p-2 w-full h-40 focus:outline-none"
              id="summary"
              value={state.summary}
              onChange={handleChange}
            ></textarea>
          </div>

          <hr className="my-4 border-[#9ca3af]" />

          {/* Education form */}
          <h2 className="text-xl font-bold mb-2">Education</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              className="border border-[#9ca3af] rounded-md p-2 "
              type="month"
              placeholder="Start Year"
              value={state.form.start}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FORM",
                  field: "start",
                  value: e.target.value,
                })
              }
            />
            <input
              className="border border-[#9ca3af] rounded-md p-2"
              type="month"
              placeholder="End Year"
              value={state.form.end}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FORM",
                  field: "end",
                  value: e.target.value,
                })
              }
            />
            <input
              className="border border-[#9ca3af] rounded-md p-2"
              type="text"
              placeholder="School/University"
              value={state.form.school}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FORM",
                  field: "school",
                  value: e.target.value,
                })
              }
            />
            <input
              className="border border-[#9ca3af] rounded-md p-2 "
              type="text"
              placeholder="Degree"
              value={state.form.degree}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FORM",
                  field: "degree",
                  value: e.target.value,
                })
              }
            />
            <input
              className="border border-[#9ca3af] rounded-md p-2 "
              type="text"
              placeholder="Extra info (e.g. GPA)"
              value={state.form.gpa}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FORM",
                  field: "gpa",
                  value: e.target.value,
                })
              }
            />

            <button
              onClick={handleSubmitEdu}
              className="border border-[#9ca3af] rounded-md py-2 px-6 text-[#ffffff] bg-gradient-to-bl from-[#9ca3af] to-[#374151]"
            >
              {state.editingIndex !== null ? "Save Changes" : "Add Education"}
            </button>
          </div>

          {/* List of saved educations */}
          <ul>
            {state.education.map((edu, i) => (
              <li key={i} className="border border-[#9ca3af] p-2 rounded mb-2">
                <p>
                  Edu Date: {edu.start} - {edu.end}
                </p>
                <p>School: {edu.school}</p>
                <p>Degree: {edu.degree}</p>
                <p>{edu.gpa && `GPA: ${edu.gpa}`}</p>
                <button
                  type="button"
                  className="border border-[#9ca3af] rounded-md py-1 px-3 bg-gradient-to-bl from-[#9ca3af] to-[#374151] text-[#ffffff] mt-2 mr-2"
                  onClick={() => dispatch({ type: "START_EDIT", index: i })}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="border border-[#9ca3af] rounded-md py-1 px-3 bg-gradient-to-bl from-red-300 to-red-500 text-[#ffffff] mt-2 mr-2"
                  onClick={() =>
                    dispatch({ type: "DELETE_EDUCATION", index: i })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* skills */}

          <hr className="my-4 border-[#9ca3af]" />
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter a skill"
                className="border border-[#9ca3af] rounded-md p-2 flex-1"
                id="new-skill"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    dispatch({
                      type: "ADD_SKILL",
                      value: e.target.value.trim(),
                    });
                    e.target.value = "";
                  }
                }}
              />
              <button
                type="button"
                className="bg-gradient-to-bl from-[#9ca3af] to-[#374151] text-[#ffffff] px-4 py-2 rounded-md"
                onClick={() => {
                  const input = document.getElementById("new-skill");
                  if (input.value.trim()) {
                    dispatch({ type: "ADD_SKILL", value: input.value.trim() });
                    input.value = "";
                  }
                }}
              >
                Add
              </button>
            </div>

            <ul className="flex gap-4 flex-wrap">
              {state.skills.map((skill, i) => (
                <li key={i} className="flex gap-1">
                  <p className="flex items-center gap-2 justify-between p-2 border bg-gradient-to-bl from-[#9ca3af] to-[#374151]  text-[#ffffff] border-[#9ca3af] rounded-md font-semibold">
                    {skill}
                    <MdOutlineCancel
                      onClick={() =>
                        dispatch({ type: "DELETE_SKILL", index: i })
                      }
                      className="text-[#ffffff] text-xl"
                    />
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* languages */}
          <hr className="my-4 border-[#9ca3af]" />
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Languages</h2>
            <button
              type="button"
              className="bg-gradient-to-bl from-[#9ca3af] to-[#374151] text-[#ffffff] px-4 py-2 rounded-md mb-4"
              onClick={() => dispatch({ type: "ADD_LANGUAGE" })}
            >
              Add Language
            </button>

            <ul className="flex flex-col gap-4">
              {state.languages.map((lang, i) => (
                <li key={i} className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Language"
                    value={lang.name}
                    className="border border-[#9ca3af] rounded-md p-2 flex-1"
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LANGUAGE",
                        index: i,
                        field: "name",
                        value: e.target.value,
                      })
                    }
                  />
                  <select
                    value={lang.level}
                    className="border border-[#9ca3af] rounded-md p-2 flex-1"
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LANGUAGE",
                        index: i,
                        field: "level",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="">Select level</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button
                    type="button"
                    className="border border-[#9ca3af] rounded-md py-1 px-3 bg-gradient-to-bl from-red-300 to-red-500 text-[#ffffff] mt-2 mr-2"
                    onClick={() =>
                      dispatch({ type: "DELETE_LANGUAGE", index: i })
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Experience */}
          <div className="mb-4 border border-[#9ca3af] p-3 rounded  gap-2">
            {state.work.map((job, i) => (
              <div key={i} className=" rounded flex flex-col gap-2 py-2">
                <input
                  type="text"
                  placeholder="Company"
                  value={job.company}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_WORK",
                      index: i,
                      field: "company",
                      value: e.target.value,
                    })
                  }
                  className="border border-[#9ca3af] rounded-md p-2"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={job.role}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_WORK",
                      index: i,
                      field: "role",
                      value: e.target.value,
                    })
                  }
                  className="border border-[#9ca3af] rounded-md p-2"
                />
                <div className="flex gap-2">
                  <input
                    type="month"
                    placeholder="Start Year"
                    value={job.start}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_WORK",
                        index: i,
                        field: "start",
                        value: e.target.value,
                      })
                    }
                    className="border border-[#9ca3af] rounded-md py-2 flex-1"
                  />
                  <input
                    type="month"
                    placeholder="End Year"
                    value={job.end}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_WORK",
                        index: i,
                        field: "end",
                        value: e.target.value,
                      })
                    }
                    className="border border-[#9ca3af] rounded-md py-2 flex-1"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#9ca3af]">
                    Responsibilities
                  </label>
                  {job.responsibilities.map((res, j) => (
                    <div key={j} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={res}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_RESPONSIBILITY",
                            jobIndex: i,
                            resIndex: j,
                            value: e.target.value,
                          })
                        }
                        className="border border-[#9ca3af] rounded-md p-2 flex-1"
                      />
                      <button
                        type="button"
                        className="border border-[#9ca3af] rounded-md py-1 px-3 bg-gradient-to-bl from-red-300 to-red-500 text-[#ffffff] mt-2 mr-2"
                        onClick={() =>
                          dispatch({
                            type: "DELETE_RESPONSIBILITY",
                            jobIndex: i,
                            resIndex: j,
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-gradient-to-bl from-[#9ca3af] to-[#374151] text-[#ffffff] px-3 py-1 rounded"
                    onClick={() =>
                      dispatch({ type: "ADD_RESPONSIBILITY", index: i })
                    }
                  >
                    + Add Duties
                  </button>
                </div>

                <button
                  type="button"
                  className="bg-gradient-to-bl from-[#9ca3af] to-[#374151] text-[#ffffff] px-3 py-1 rounded mt-2"
                  onClick={() => dispatch({ type: "DELETE_WORK", index: i })}
                >
                  Delete Work
                </button>
              </div>
            ))}

            <button
              type="button"
              className="bg-gradient-to-bl from-[#9ca3af] to-[#374151] text-[#ffffff] px-4 py-2 rounded"
              onClick={() => dispatch({ type: "ADD_WORK" })}
              disabled={!(lastWork.company && lastWork.role && lastWork.start)}
            >
              + Add Work Experience
            </button>
          </div>
          {/* submit */}
          <div className="flex gap-4">
            <button
              className="border border-[#9ca3af] rounded-md py-2 px-6 text-xl text-[#ffffff] bg-gradient-to-bl from-green-500 to-green-700 mt-4"
              type="button"
              onClick={saveResume}
            >
              Save
            </button>
            <button
              className="border border-[#9ca3af] rounded-md py-2 px-6 text-xl text-[#ffffff] bg-gradient-to-bl from-[#9ca3af] to-orange-500 mt-4"
              type="button"
              onClick={handleExportPdf}
            >
              Export PDF
            </button>
          </div>
        </form>
      </div>

      {/* right */}
      <div className="flex-2 min-h-full p-2 overflow-y-scroll bg-[#374151] max-h-screen rounded-md">
        <div className="text-center my-4">
          <h2 className="text-2xl font-bold">Preview</h2>
        </div>
        <div className=" border bg-[#ffffff] border-[#9ca3af] rounded-md shadow-md min-h-[1122px]">
          {/* <Minimalist state={state} /> */}
          {templateId === "minimalist" && (
            <Minimalist ref={previewRef} state={state} />
          )}
          {templateId === "modern" && <Modern ref={previewRef} state={state} />}
        </div>
      </div>
    </div>
  );
}

export default Builder;
