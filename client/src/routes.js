import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, None } from "./layouts";

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
import CreateOrEditBaiDang from './views/BaiDang/CreateOrEditBaiDang';
import PreviewBaiDang from './views/BaiDang/PreviewBaiDang';
import TestPage from './views/TestPage/TestPage';
import TestGAPI from './views/TestPage/TestGAPI';
import LoginPage from './views/Login/LoginPage';
import ListThuMuc from './views/ThuMuc/ListThuMuc';
import ListFile from './views/ThuMuc/ListFile';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/sinh-vien" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
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
