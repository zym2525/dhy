import * as actionTypes from '../constants/userinfo'

export function update (data) {
  return {
    type: actionTypes.USERINFO_UPDATE,
    data
  }
}

export function getUserName(username){
  return {
    type: actionTypes.userInfo_name,
    username
  }
}

export function getUserType(usertype){
  return {
    type: actionTypes.userInfo_type,
    usertype
  }
}
