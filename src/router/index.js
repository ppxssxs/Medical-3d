import { ElMessage } from "element-plus";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    //路由重定向
    // {
    //     path: '/',
    //     redirect: '/sign',
    // },
    {
        path: '/sign',
        name: 'sign',
        component: () => import('../pages/sign/sign.vue')
    },
    {
        path: '/center',
        name: 'center',
        component: () => import('../pages/center/center.vue')
    },
    // {
    //     path: '/medicalView',
    //     name: 'view',
    //     component: () => import('../pages/medicalView/medicalView.vue')
    // },
    {
        path: '/load',
        name: 'load',
        component: () => import('../pages/load/load.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//登录路由守卫  页面跳转时先判断登录状态是否存在
// router.beforeEach((to, from, next) => {
//     // 判断有没有登录
//     if (!sessionStorage.getItem('token')) {
//         if (to.name == 'sign') {    
//             next();
//         } else {
//             ElMessage.warning('请先登录!')
//             next({ name: 'sign' })
//         }
//     }
//     else {
//         if (to.name == 'sign') {
//             next({ name: 'center' });
//         }
//         next()
//     }

// });

//.nii文件展示路由守卫 在跳转到展示页面前先判断文件状态是否存在 存在才可以跳转展示出来
// router.beforeEach((to, from, next) => {
//     if (to.name == 'view') {
//         // 判断文件状态是否存在
//         if (!sessionStorage.getItem('fileStatus')) {
// 			ElMessage.warning('请先上传文件或打开一个文件!')
// 			next({name: 'load'})
// 		} else {
//             next()
//     	}
//     }
// 	else {
// 		next();
// 	}
// });



export default router