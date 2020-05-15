import * as actionTypes from "~/utils/action-types";
import Lesson from "~/services/elearning/creating/Lesson";
import Progress from "~/services/elearning/creating/Progress";
import General from "~/services/elearning/creating/General";
import Chapter from "~/services/elearning/creating/Chapter";
import Setting from "~/services/elearning/creating/Setting";
import Exercise from "~/services/elearning/creating/Exercise";

export async function getExams($axios, options) {
  try {
    const result = await new Exercise($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return null;
  }
}

export async function getLessons($axios, options) {
  try {
    const result = await new Lesson($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return [];
  }
}

export async function getSetting($axios, options) {
  try {
    const result = await new Setting($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return null;
  }
}

export async function getChaptersOfElearning($axios, options) {
  try {
    const result = await new Chapter($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return [];
  }
}

export async function getLessonsOfLecture($axios, options) {
  try {
    const result = await new Lesson($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return [];
  }
}

export async function getGeneral($axios, options) {
  try {
    const result = await new General($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return null;
  }
}

export async function getLesson($axios, lesson_id) {
  try {
    const result = await new Lesson($axios)[actionTypes.BASE.DETAIL](lesson_id);
    if (result.success) return result.data;
  } catch (error) {
    return null;
  }
}

export async function getProgress($axios, options) {
  try {
    const result = await new Progress($axios)[actionTypes.BASE.LIST](options);
    if (result.success) return result.data;
  } catch (error) {
    return null;
  }
}
