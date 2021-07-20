import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, None, SV_Layout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import ListSinhVien from "./views/SinhVien/ListSinhVien";
import EditSinhVienPage from './views/SinhVien/EditSinhVienPage';
// import GiangVien from "./views/GiangVien";
import ListGiangVien from "./views/GiangVien/ListGiangVien";
import EditGiangVienPage from './views/GiangVien/EditGiangVienPage';
import ListBaiDang from './views/BaiDang/ListBaiDang';
import NewBaiDang from './views/BaiDang/NewBaiDang';
import ListDeTai from './views/DeTai/ListDeTai';
import EditDeTaiPage from './views/DeTai/EditDeTaiPage';
import CreateOrEditBaiDang from './views/BaiDang/CreateOrEditBaiDang';
import PreviewBaiDang from './views/BaiDang/PreviewBaiDang';
import TestPage from './views/TestPage/TestPage';
import TestGAPI from './views/TestPage/TestGAPI';
import LoginPage from './views/Login/LoginPage';
import ListThuMuc from './views/ThuMuc/ListThuMuc';
import ListFile from './views/ThuMuc/ListFile';
import ListBieuMau from './views/BieuMau/ListBieuMau';
import ListKyThucHien from './views/KyThucHien/ListKyThucHien';
import ListDeTaisOfKTH from './views/KyThucHien/ListDeTaisOfKTH';
import ListHoiDong from './views/HoiDong/ListHoiDong';
import CreateOrEditHoiDongPage from './views/HoiDong/CreateOrEditHoiDongPage';
import ListUser from './views/User/ListUser';
import SV_TinTuc from './views/SV_TinTuc/SV_TinTuc';
import SV_ChiTietTinTuc from './views/SV_TinTuc/SV_ChiTietTinTuc';
import SV_LogTime from './views/SV_LogTime/SV_LogTime';
import DetailDeTaiPage from './views/DeTai/DetailDeTaiPage';
import ListCurrentDeTaisOfGVPage from './views/GV_DeTais/ListCurrentDeTaisOfGVPage';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/thong-bao" />
  },
  {
    path: "/sinh-vien",
    layout: DefaultLayout,
    exact: true,
    component: ListSinhVien
  },
  {
    path: "/sinh-vien/edit/:id",
    layout: DefaultLayout,
    component: EditSinhVienPage
  },
  {
    path: "/giang-vien",
    layout: DefaultLayout,
    exact: true,
    component: ListGiangVien
  },
  {
    path: "/giang-vien/edit/:id",
    layout: DefaultLayout,
    component: EditGiangVienPage
  },
  {
    path: "/bai-dang",
    layout: DefaultLayout,
    exact: true,
    component: ListBaiDang
  },
  {
    path: "/bai-dang/new",
    layout: DefaultLayout,
    component: NewBaiDang
  },
  {
    path: "/bai-dang/create-or-edit",
    layout: DefaultLayout,
    exact: true,
    component: CreateOrEditBaiDang
  },
  {
    path: "/bai-dang/create-or-edit/:id",
    layout: DefaultLayout,
    component: CreateOrEditBaiDang
  },
  {
    path: "/bai-dang/preview/:id",
    layout: DefaultLayout,
    component: PreviewBaiDang
  },
  {
    path: "/de-tai",
    layout: DefaultLayout,
    exact: true,
    component: ListDeTai
  },
  {
    path: "/de-tai/detail/:id",
    layout: DefaultLayout,
    exact: true,
    component: DetailDeTaiPage
  },
  {
    path: "/de-tai/:id",
    layout: DefaultLayout,
    exact: true,
    component: EditDeTaiPage
  },
  {
    path: "/thu-muc",
    layout: DefaultLayout,
    exact: true,
    component: ListThuMuc
  },
  {
    path: "/thu-muc/:folderId/files",
    layout: DefaultLayout,
    component: ListFile
  },
  {
    path: "/thu-muc/get-by-kth/:kthId",
    layout: DefaultLayout,
    component: ListThuMuc
  },
  {
    path: "/bieu-mau",
    layout: DefaultLayout,
    component: ListBieuMau
  },
  {
    path: "/user",
    layout: DefaultLayout,
    component: ListUser
  },
  {
    path: "/ky-thuc-hien",
    layout: DefaultLayout,
    exact: true,
    component: ListKyThucHien
  },
  {
    path: "/ky-thuc-hien/:id",
    layout: DefaultLayout,
    component: ListDeTaisOfKTH
  },
  {
    path: "/hoi-dong",
    layout: DefaultLayout,
    exact: true,
    component: ListHoiDong
  },
  {
    path: "/hoi-dong/create-or-edit",
    layout: DefaultLayout,
    exact: true,
    component: CreateOrEditHoiDongPage
  },
  {
    path: "/hoi-dong/create-or-edit/:id",
    layout: DefaultLayout,
    component: CreateOrEditHoiDongPage
  },
  {
    path: "/thong-bao",
    layout: SV_Layout,
    exact: true,
    component: SV_TinTuc
  },
  {
    path: "/thong-bao/:id",
    layout: SV_Layout,
    component: SV_ChiTietTinTuc
  },
  {
    path: "/de-tai-thuc-hien",
    layout: SV_Layout,
    component: SV_LogTime
  },
  {
    path: "/de-tai-huong-dan",
    layout: SV_Layout,
    exact: true,
    component: ListCurrentDeTaisOfGVPage
  },
  {
    path: "/de-tai-huong-dan/:id",
    layout: SV_Layout,
    component: DetailDeTaiPage
  },
  {
    path: "/test",
    layout: DefaultLayout,
    exact: true,
    component: TestPage
  },
  {
    path: "/test-gapi",
    exact: true,
    layout: DefaultLayout,
    component: TestGAPI
  },
  {
    path: "/login",
    layout: None,
    component: LoginPage
  }
];
