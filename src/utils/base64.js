/*
 * @Author: yuguangzhou
 * @Date: 2021-04-24 12:17:57
 * @LastEditTime: 2021-04-24 12:18:08
 * @LastEditors: yuguangzhou
 * @Description: 
 */
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);

}