import 'whatwg-fetch'
import 'es6-promise'
// let common_url = 'http://192.168.1.1:8080/'; //服务器地址
let token = '';  //用户登陆后返回的token
 
//  使用fetch实现图片上传
//   @param {string} url 接口地址
//   @param {JSON} params body的请求参数
//   @return 返回Promise 

//导出get请求
export function fetchget(url) {
    var result = fetch(url, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    });
    return result.then(response => response.json());
}


// 发送 post 请求
export function fetchpost(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });
    return result.then(response => response.json());
}

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}


export function uploadImage(url,params){
    // console.log(params)
    return new Promise(function (resolve, reject) {
      let formData = new FormData();
      console.log(params)
    //   formData.append('files',params)
    //    params.forEach((item)=>{
    //     formData.append(item)
    //    })
      for (var key in params){
        //console.log(key,params[key])
          for(var key1 in params[key]){
               formData.append('file', params[key][key1]);
          }
      }
    //for (var key in params){
    //     console.log(key,params[key])
    //   formData.append(key, params[key]);
    // }
    //   let file = {url: params.url, type: 'multipart/form-data', name: params.file.name};
    //   let file=params
    //   formData.append("files", file);
    //   console.log(formData)
      return fetch(url, {
        method: 'POST',        
        body: formData,
      }).then((response) => response.json())
        .then((responseData)=> {   
            console.log(responseData)       
          resolve(responseData);
        })
        .catch((err)=> {
          console.log('err', err);
          reject(err);
        });
    });
  }
