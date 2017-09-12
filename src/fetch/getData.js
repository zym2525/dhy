import {get} from './get';
import {alertLoading} from '../util/common';

export function getData(url,data,successfn, isLoadingShow){
    if (isLoadingShow == undefined || isLoadingShow == true) {
        var layer=alertLoading();
    }

    let result= get(url+'?'+obj2params(data));
    result.then(res=>{
        return res.text();
    }).then(text=>{
        let reData=JSON.parse(JSON.parse(text));
        if(reData.retCode==0){
            successfn&&successfn(reData);
        }else{
            alert(reData.retMsg);
        }
        layer&&layer.destroy();
    }).catch(err=>{
        alert('出错了！请刷新页面试试~');
        layer&&layer.destroy();
    })
}

function obj2params(obj) {
    var result = '';
    var item;
    for(item in obj){
        result += '&' + item + '=' + encodeURIComponent(obj[item])
    }

    if(result){
        result = result.slice(1)
    }
    return result;
}