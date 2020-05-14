import * as actionTypes from "~/utils/action-types";
import Lesson from "~/services/elearning/creating/Lesson";
import Progress from "~/services/elearning/creating/Progress";
import General from "~/services/elearning/creating/General";
import Chapter from "~/services/elearning/creating/Chapter";

export async function getChaptersOfElearning($axios, options) {
  let res = null;
  try {
    const result = await new Chapter($axios)[actionTypes.BASE.LIST](options);
    if (result.success) res = result.data;
  } catch (error) {
    console.log(error);
  }
  return res;
}

export async function getLessonsOfLecture($axios, options) {
  let res = null;
  try {
    const result = await new Lesson($axios)[actionTypes.BASE.LIST](options);
    if (result.success) res = result.data;
  } catch (error) {
    console.log(error);
  }
  return res;
}

export async function getGeneral($axios, options) {
  let res = null;
  try {
    const result = await new General($axios)[actionTypes.BASE.LIST](options);
    if (result.success) res = result.data;
  } catch (error) {
    console.log(error);
  }
  return res;
}

export async function getLesson($axios, lesson_id) {
  let res = null;
  try {
    const result = await new Lesson($axios)[actionTypes.BASE.DETAIL](lesson_id);
    if (result.success) res = result.data;
  } catch (error) {
    console.log(error);
  }
  return res;
}

export async function getProgress($axios, options) {
  let res = null;
  try {
    const result = await new Progress($axios)[actionTypes.BASE.LIST](options);
    if (result.success) res = result.data;
  } catch (error) {
    console.log(error);
  }
  return res;
}
