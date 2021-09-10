// import { ADD_ARTICLE } from "../constants/action-types";
import * as actions from '../constants/action-types.js'

export function addBug(desc) {
  return{
    type:actions.ADD_BUG,
    payload:{
      description: desc
    }
  }
}

export function editBug(i) {
  return{
    type:actions.EDIT_BUG,
    payload:{
      id:i
    }
  }
}

export function deleteBug(i) {
  return{
    type:actions.DELETE_BUG,
    payload:{
      id:i
    }
  }
}