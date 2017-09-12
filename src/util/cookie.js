export function setCookie(name,value,timeout){
    var d=new Date();
    d.setDate(d.getDate()+timeout);
    document.cookie= name+'='+value+'; path=/;  expires='+d;
}
export function getCookie(name){
    var str = document.cookie;
    var arr=str.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}
export function removeCookie(name){
    setCookie(name,1,-1);
}

export function setCookies(json,timeout=30){
    for(let key in json){
        setCookie(key,json[key],timeout);
    }
}

export function removeCookies(arr){
    for(let i=0;i<arr.length;i++){
        setCookie(arr[i],1,-1);
    }
}