import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import LoginPage from "./views/LoginPage.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Qna from "./views/Qna.vue";

import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

import NoticeBoardList from "@/views/notice/NoticeBoardList.vue";
import NoticeBoardWrite from "@/views/notice/NoticeBoardWrite.vue";
import NoticeBoardView from "@/views/notice/child/NoticeBoardView.vue";
import NoticeBoardUpdate from "@/views/notice/child/NoticeBoardUpdate.vue";

import QnaList from "@/views/qna/QnaList.vue";
import QnaWrite from "@/views/qna/QnaWrite.vue";
import QnaView from "@/views/qna/QnaView.vue";
import QnaUpdate from "@/views/qna/QnaUpdate.vue";
import QnaDelete from "@/views/qna/QnaDelete.vue";
import MemoModifyForm from "@/views/qna/child/MemoModifyForm.vue";

import House from "@/views/apt/House.vue";

import SignUpPage from "@/views/user/SignUp.vue";
import UpdateAndDelete from "@/views/user/UpdateAndDelete.vue";
import MemberMyPage from "@/views/user/MemberMyPage.vue";

import Admin from "@/views/Admin.vue";
import AdminList from "@/views/admin/MemberList.vue";

Vue.use(Router);

const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "SignIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};

const onlyAdmin = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null || checkUserInfo.admin == 0) {
    alert("관리자만 접근 가능한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "Home" });
  } else {
    next();
  }
};

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/qna",
      name: "qna",
      components: { default: Qna, header: MainNavbar, footer: MainFooter },
      redirect: "/qna/qnalist",
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
      children: [
        {
          path: "qnalist",
          name: "qnalist",
          component: QnaList,
        },
        {
          path: "qnawrite",
          name: "qnawrite",
          component: QnaWrite,
        },
        {
          path: "qnaview/:articleno",
          name: "qnaview",
          component: QnaView,
        },
        {
          path: "qnaupdate/:articleno",
          name: "qnaupdate",
          component: QnaUpdate,
        },
        {
          path: "qnadelete/:articleno",
          name: "qnadelete",
          component: QnaDelete,
        },
        {
          path: "memomodifyform/:memono",
          name: "memomodifyform",
          component: MemoModifyForm,
        },
      ],
    },
    {
      path: "/loginpage",
      name: "loginpage",
      components: {
        default: LoginPage,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: SignUpPage,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/admin",
      name: "admin",
      components: {
        default: Admin,
        header: MainNavbar,
        footer: MainFooter,
      },
      redirect: "/admin/list",
      children: [
        {
          path: "list",
          name: "AdminList",
          component: AdminList,
        },
      ],
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/qnalist",
      name: "qnalist",
      components: { default: QnaList, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/membermypage",
      name: "membermypage",
      components: { default: MemberMyPage, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/house",
      name: "house",
      components: { default: House, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/updateanddelete",
      name: "updateanddelete",
      components: { default: UpdateAndDelete, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/noticeboardlist",
      name: "noticeboardlist",
      components: {
        default: NoticeBoardList,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/noticeboardwrite",
      name: "noticeboardwrite",
      components: {
        default: NoticeBoardWrite,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/noticeboardview/:articleno",
      name: "noticeboardview",
      components: {
        default: NoticeBoardView,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/noticeboardupdate/:articleno",
      name: "noticeboardupdate",
      components: {
        default: NoticeBoardUpdate,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   components: { default: Login, header: MainNavbar, footer: MainFooter },
    //   props: {
    //     header: { colorOnScroll: 400 }
    //   }
    // },
    {
      path: "/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
