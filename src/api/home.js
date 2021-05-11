/*
 * @Author: yuguangzhou
 * @Date: 2021-04-23 09:56:50
 * @LastEditTime: 2021-04-25 16:03:46
 * @LastEditors: yuguangzhou
 * @Description:  首页配置模块
 */
import service from "./request"

// 获取轮播图数据
export function getCarouselsAjax(data) {
  return service({
    url: '/carousels',
    method: 'get',
    params: {
      pageNumber: data.pageNumber,
      pageSize: data.pageSize
    }
  })
}

// 添加轮播图
export function addCarouselsAjax(data) {
  return service({
    url: '/carousels',
    method: 'post',
    data
  })
}
// 修改轮播图
export function updateCarouselsAjax(data) {
  return service({
    url: '/carousels',
    method: 'put',
    data
  })
}
// 获取轮播图信息
export function getCarouselInfoAjax(id) {
  return service({
    url: `/carousels/${id}`,
    method: 'get',
  })
}
// 删除轮播图
export function delCarouselAjax(id) {
  return service({
    url: '/carousels',
    method: 'delete',
    data: {
      ids: id
    }
  })
}

// 单张图片上传
export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
// 多张图片上传
export const uploadImgsServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'
