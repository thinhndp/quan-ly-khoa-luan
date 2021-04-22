import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

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
import CreateOrEditBaiDang from './views/BaiDang/CreateOrEditBaiDang';
import PreviewBaiDang from './views/BaiDang/PreviewBaiDang';

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
    component: CreateOrEditBaiDang
  },
  {
    path: "/bai-dang/preview",
    layout: DefaultLayout,
    component: PreviewBaiDang
  }
];
