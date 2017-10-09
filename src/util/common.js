/**
 * Created by Administrator on 2017/9/7.
 */
//git commit -m 'zym' --no-verify
// https://rsuitejs.com/getting-started
import React from 'react';
import Layer from 'react-layer';
import {Modal} from 'antd';
console.log(process.env.NODE_ENV)
let imgUrl = require('../../images/loading1.gif');
// https://github.com/BruceCham/react-cli/tree/master/src
export const api = 'http://120.25.247.79';

// 转化时间
export function getLocalTime (dataTime) {
  let oDate = new Date(dataTime);
  let iY = oDate.getFullYear();
  let iMonth = oDate.getMonth() + 1;
  let iD = oDate.getDate();
  return `${iY}-${toDou(iMonth)}-${toDou(iD)}`;
}

// 加0
export function toDou (num) {
  return num < 10 ? '0' + num : '' + num;
}

// loading
export function alertLoading () {
  let layer = new Layer(document.body, function renderModal () {
    return (
      <div className="loadingMask"><img src={imgUrl}/></div>
    )
  });
  layer.render();
  return layer;
}

export function showSuccess (content,title='提示') {
  let modal = Modal.success({
    title: title,
    content: content
  });
  setTimeout(() => modal.destroy(), 800);
}

export function showInfo (content,title='提示') {
  let modal = Modal.info({
    title: title,
    content: content
  });
  setTimeout(() => modal.destroy(), 800);
}

//获取url参数
export function getFromUrl(key) {
  var urlInfo = location.search.substring(1).split('&');
  for (var i = 0; i < urlInfo.length; i++) {
    var name = urlInfo[i].split('=')[0];
    var value = urlInfo[i].split('=')[1];
    if (key === name) {
      return value;
      break;
    }
  }
  return '';
}

export function createData(type,id){
  if(type==0){
    return {
      id:id
    };
  }else if(type==1){
    return {
      recordCode:id
    };
  }else if(type==2){
    return {
      openCode:id
    };
  }else if(type==3){
    return {
      graduationCode:id
    };
  }
}
