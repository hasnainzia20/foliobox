import { formatMonthYear } from "../utils/utilFunctions";

export const initialState = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  education: [],
  form: { start: "", end: "", school: "", degree: "", gpa: "" },
  editingIndex: null,
  skills: [],
  languages: [],
  work: [
    {
      company: "",
      role: "",
      start: "",
      end: "",
      responsibilities: [],
    },
  ],
};

export function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "UPDATE_FORM":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...state.education, state.form],
        form: { start: "", end: "", school: "", degree: "", gpa: "" },
      };

    case "START_EDIT":
      return {
        ...state,
        form: state.education[action.index],
        editingIndex: action.index,
      };

    case "SAVE_EDIT":
      return {
        ...state,
        education: state.education.map((edu, i) =>
          i === state.editingIndex ? state.form : edu
        ),
        form: { start: "", end: "", school: "", degree: "", gpa: "" },
        editingIndex: null,
      };
    case "DELETE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.index),
      };

    // skills
    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.value],
      };

    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.index),
      };

    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill, index) =>
          index === action.index ? action.value : skill
        ),
      };
    // languages
    case "ADD_LANGUAGE":
      return {
        ...state,
        languages: [...state.languages, { name: "", level: "" }],
      };

    case "DELETE_LANGUAGE":
      return {
        ...state,
        languages: state.languages.filter((_, index) => index !== action.index),
      };

    case "UPDATE_LANGUAGE":
      return {
        ...state,
        languages: state.languages.map((lang, index) =>
          index === action.index
            ? { ...lang, [action.field]: action.value }
            : lang
        ),
      };

    case "ADD_WORK":
      return {
        ...state,
        work: [
          ...state.work,
          { company: "", role: "", start: "", end: "", responsibilities: [""] },
        ],
      };

    case "UPDATE_WORK":
      return {
        ...state,
        work: state.work.map((job, index) =>
          index === action.index
            ? { ...job, [action.field]: action.value }
            : job
        ),
      };

    case "DELETE_WORK":
      return {
        ...state,
        work: state.work.filter((_, index) => index !== action.index),
      };

    case "ADD_RESPONSIBILITY":
      return {
        ...state,
        work: state.work.map((job, index) =>
          index === action.index
            ? { ...job, responsibilities: [...job.responsibilities, ""] }
            : job
        ),
      };

    case "UPDATE_RESPONSIBILITY":
      return {
        ...state,
        work: state.work.map((job, jobIndex) =>
          jobIndex === action.jobIndex
            ? {
                ...job,
                responsibilities: job.responsibilities.map((res, resIndex) =>
                  resIndex === action.resIndex ? action.value : res
                ),
              }
            : job
        ),
      };

    case "DELETE_RESPONSIBILITY":
      return {
        ...state,
        work: state.work.map((job, jobIndex) =>
          jobIndex === action.jobIndex
            ? {
                ...job,
                responsibilities: job.responsibilities.filter(
                  (_, resIndex) => resIndex !== action.resIndex
                ),
              }
            : job
        ),
      };

    case "SET_STATE":
      // payload should be the saved `data` object
      return {
        ...state,
        ...action.payload,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
