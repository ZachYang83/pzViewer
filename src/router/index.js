import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: "首页", icon: "el-icon-house" },
    component: Home,
    meta: {
      requireAuth: false
    },
    children: [
      {
        path: '/population',
        name: '人口感知',
        meta: { title: "人口感知", icon: "wlsys-renkou" },
        component: () => import('@/views/population/index.vue'),
        children: [
          {
            path: '/population/queryMap',
            meta: { title: "人口画像", icon: "el-icon-position" },
            component: () => import('@/views/population/QueryMap.vue'),
          },
          {
            path: '/population/zzbh',
            meta: { title: "人口普查", icon: "el-icon-position" },
            component: () => import('@/views/population/workLive/WorkLive.vue'),
          },
          {
            path: '/population/zzfb',
            meta: { title: "职住分布", icon: "el-icon-position" },
            component: () => import('@/views/population/Zhizhu.vue'),
          },
        ]
      },
      {
        path: '/industry',
        name: '产业监测',
        meta: { title: "产业信息", icon: "wlsys-qiyechaxun" },
        component: () => import('@/views/industry/index.vue'),
        children:[
          {
            path: '/industry/qiye',
            meta: { title: "企业概况", icon: "el-icon-position" },
            component: () => import('@/views/industry/Qiye.vue'),
          },
          {
            path: '/industry/dynamic',
            meta: { title: "企业动态", icon: "el-icon-position" },
            component: () => import('@/views/industry/dynamic/Dynamic.vue'),
          },
          {
            path: '/industry/shuishou',
            meta: { title: "企业税收", icon: "el-icon-position" },
            component: () => import('@/views/industry/Shuishou.vue'),
          },
        ]
      },
      {
        path: '/landuse',
        name: '土地信息',
        meta: { title: "土地信息", icon: "wlsys-tudi" },
        component: () => import('@/views/landuse/index.vue'),
        children: [
          {
            path: '/landuse/konggui',
            meta: { title: "控规", icon: "el-icon-position" },
            component: () => import('@/views/landuse/Konggui.vue'),
          },
          {
            path: '/landuse/sandiao',
            meta: { title: "三调现状", icon: "el-icon-position" },
            component: () => import('@/views/landuse/Sandiao.vue'),
          },
          {
            path: '/landuse/yongdizheng',
            meta: { title: "用地证", icon: "el-icon-position" },
            component: () => import('@/views/landuse/Yongdizheng.vue'),
          },
          {
            path: '/landuse/building3d',
            meta: { title: "建筑面", icon: "el-icon-position" },
            component: () => import('@/views/landuse/Building3d.vue'),
          },
          {
            path: '/landuse/imgae',
            meta: { title: "历史影像", icon: "el-icon-position" },
            component: () => import('@/views/landuse/image/Image.vue'),
          },
        ]
      },
      {
        path: '/houseInfo',
        name: '房屋信息',
        meta: { title: "房屋信息", icon: "wlsys-fangwu2" },
        component: () => import('@/views/landuse/index.vue'),
        children: [
          {
            path: '/houseInfo/housePrice',
            meta: { title: "新房", icon: "el-icon-position" },
            component: () => import('@/views/houseInfo/HousePrice.vue'),
          },
          {
            path: '/houseInfo/secendHouse',
            meta: { title: "二手房", icon: "el-icon-position" },
            component: () => import('@/views/houseInfo/SecendHouse.vue'),
          },
          {
            path: '/houseInfo/zufang',
            meta: { title: "租房", icon: "el-icon-position" },
            component: () => import('@/views/houseInfo/Zufang.vue'),
          },
        ]
      },
      {
        path: '/publicInfo',
        name: '基础设施',
        meta: { title: "基础设施", icon: "wlsys-nav_jijiandangan" },
        component: () => import('@/views/publicInfo/index.vue'),
        children: [
          {
            path: '/publicInfo/eduInfo',
            meta: { title: "教育设施", icon: "el-icon-position" },
            component: () => import('@/views/publicInfo/EduInfo.vue'),
          },
          {
            path: '/publicInfo/medInfo',
            meta: { title: "医疗设施", icon: "el-icon-position" },
            component: () => import('@/views/publicInfo/MedInfo.vue'),
          },
          {
            path: '/publicInfo/civInfo',
            meta: { title: "行政设施", icon: "el-icon-position" },
            component: () => import('@/views/publicInfo/CivInfo.vue'),
          },
          {
            path: '/publicInfo/palInfo',
            meta: { title: "政法设施", icon: "el-icon-position" },
            component: () => import('@/views/publicInfo/PalInfo.vue'),
          },
          {
            path: '/publicInfo/culInfo',
            meta: { title: "文化设施", icon: "el-icon-position" },
            component: () => import('@/views/publicInfo/CulInfo.vue'),
          },
          {
            path: '/publicInfo/spoInfo',
            meta: { title: "体育设施", icon: "el-icon-position" },
            component: () => import('@/views/publicInfo/SportInfo.vue'),
          },
        ]
      },
      {
        path: '/traffic',
        name: '交通运行',
        meta: { title: "交通运行", icon: "wlsys-daolujiaotong" },
        component: () => import('@/views/traffic/index.vue'),
        children: [
          {
            path: '/traffic/huoyunOD',
            meta: { title: "货运OD", icon: "el-icon-position" },
            component: () => import('@/views/traffic/TrafficAreaOD.vue'),
          },
          {
            path: '/traffic/timeCircle',
            meta: { title: "交通等时圈", icon: "el-icon-position" },
            component: () => import('@/views/traffic/TimeCircle.vue'),
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  // mode:'history',
  routes
})

export default router




