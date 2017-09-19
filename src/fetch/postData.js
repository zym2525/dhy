/**
 * Created by Administrator on 2017/9/7.
 */
import {post} from './post'
import {alertLoading} from '../util/common'
export function postData (url, data, successfn, isLoadingShow) {
  if (isLoadingShow == undefined || isLoadingShow == true) {
    var layer = alertLoading()
  }
  let result = post(url, data)
  result.then(res => {
    return res.text()
  }).then(text => {
    let reData = JSON.parse(JSON.parse(text))
    console.log(reData)
    if (reData.retCode == '0000') {
      successfn && successfn(reData)
    } else {
      alert(reData.retMsg)
    }
    // if(oDiv) document.getElementsByTagName('body')[0].removeChild(oDiv);
    layer && layer.destroy()
  }).catch(err => {
    alert('出错了！请刷新页面试试~')
    layer && layer.destroy()
  })
}
