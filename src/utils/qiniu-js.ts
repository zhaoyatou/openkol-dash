import * as qiniu from "qiniu-js";

/**
 * 向七牛提交图片
 * @param upToken   token
 * @param files     files
 */
export async function upQiniuImage(data: any, files: any) {
  const { key, token } = data;
  const file = files.file;
  const promise = new Promise((resolve, reject) => {
    files.content = ""; // 图片的展示的地址
    files.status = "uploading";
    const config = {
      useCdnDomain: true, // cdn加速
      retryCount: 5 // 上传错误重新上传次数
    };
    const putExtra = {
      fname: files,
      params: {}
    };
    const observer = {
      error(res: any) {
        reject(res);
      },
      complete(res: any) {
        resolve(res);
      }
    };
    const observable = qiniu.upload(file, key, token, putExtra, config); // 调用七牛的上传
    observable.subscribe(observer); // 上传监听
  });
  return promise;
}
