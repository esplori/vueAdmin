import {get, post} from '@/utils/axios.js'
import contextPath from '@/config/context-path.js'

export async function getListByCateApi (data) {
  const url = `${contextPath}/admin/getList/cate/${data.cate}/page/${data.page || 1}`
  const options = {}
  return get(url, {}, options)
}
export async function getListApi (data) {
  const url = `${contextPath}/admin/getList/${data.page}`
  const options = {}
  return get(url, {}, options)
}
export async function getDetailApi (data) {
  const Url = `${contextPath}/pages/getDetail/${data.id}`
  const options = {}
  return get(Url, {}, options)
}
export async function getDetailByIdApi (data) {
  const Url = `${contextPath}/admin/getDetail/${data.id}`
  const options = {}
  return get(Url, {}, options)
}
export async function postPageApi (data) {
  const url = `${contextPath}/admin/insertItem`
  const options = {}
  return post(url, data, options)
}
export async function delApi (data) {
  const Url = `${contextPath}/admin/deleteItem`
  const options = {}
  return post(Url, data, options)
}
export async function editPageApi (data) {
  const url = `${contextPath}/admin/updateItem`
  const options = {}
  return post(url, data, options)
}
export async function getCateApi (data) {
  const url = `${contextPath}/pages/getCate`
  const options = {}
  return get(url, data, options)
}
export async function updateCateApi (data) {
  const url = `${contextPath}/admin/updateCate`
  const options = {}
  return post(url, data, options)
}
export async function delCateApi (data) {
  const Url = `${contextPath}/admin/delCate`
  const options = {}
  return post(Url, data, options)
}
export async function insertCateApi (data) {
  const url = `${contextPath}/admin/insertCate`
  const options = {}
  return post(url, data, options)
}
export async function getImageListApi (data) {
  const url = `${contextPath}/admin/getImageList`
  const options = {}
  return post(url, data, options)
}
export async function delFileApi (data) {
  const url = `${contextPath}/admin/delFile`
  const options = {}
  return post(url, data, options)
}
export async function updateUserInfoApi (data) {
  const url = `${contextPath}/account/updateUserInfo`
  const options = {}
  return post(url, data, options)
}
export async function getUserInfoApi (data) {
  const url = `${contextPath}/account/getUserInfo`
  const options = {}
  return get(url, data, options)
}
export async function getSourceListApi (data) {
  const url = `${contextPath}/admin/getSourceList`
  const options = {}
  return get(url, data, options)
}
export async function getTbkListApi (data) {
  const url = `${contextPath}/tbk/getList/${data.page}`
  const options = {}
  return get(url, {}, options)
}
export async function getTbkShopListApi (data) {
  const url = `${contextPath}/tbk/getShopList`
  const options = {}
  return get(url, data, options)
}
export async function getFundApi (data) {
  const url = `/fund/js/${data.code}.js?rt=1463558676006`
  const options = {}
  return get(url, data, options)
}
export async function getUserListApi (data) {
  const Url = `${contextPath}/admin/getUserList/${data.page}`
  const options = {}
  return post(Url, data, options)
}
export async function getRoleListApi (data) {
  const Url = `${contextPath}/admin/getRoleList`
  const options = {}
  return post(Url, data, options)
}
export async function updateRoleApi (data) {
  const Url = `${contextPath}/admin/updateRole`
  const options = {}
  return post(Url, data, options)
}
export async function insertUserApi (data) {
  const Url = `${contextPath}/admin/insertRole`
  const options = {}
  return post(Url, data, options)
}
export async function deleUserApi (data) {
  const Url = `${contextPath}/admin/deleUser`
  const options = {}
  return post(Url, data, options)
}
export async function getSiteInfoApi (data) {
  const url = `${contextPath}/admin/getSiteInfo`
  const options = {}
  return post(url, data, options)
}
export async function updateSiteInfoApi (data) {
  const url = `${contextPath}/account/updateSiteInfo`
  const options = {}
  return post(url, data, options)
}
export async function sendMailApi (data) {
  const url = `${contextPath}/admin/mail`
  const options = {}
  return post(url, data, options)
}

