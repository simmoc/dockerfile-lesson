
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r,a as i,q as _,t as c,y as u}from"./vendor.d2559d84.js";const d={class:"list-control"},g={class:"list-pagination"},m={props:{page:{type:Number,default:1},limit:{type:Number,default:10},total:{type:Number,default:0},getData:{type:Function,default:()=>{}}},emits:["update:page","update:limit"],setup(o,{emit:a}){const e=o,n=t=>{console.log(t),a("update:page",t),e.getData()},p=t=>{a("update:page",1),a("update:limit",t),e.getData()};return(t,v)=>{const s=r("el-pagination");return i(),_("div",d,[c("div",g,[u(s,{small:"","current-page":e.page,"page-size":e.limit,layout:"total,sizes, prev, pager, next, jumper",total:e.total,onCurrentChange:n,onSizeChange:p},null,8,["current-page","page-size","total"])])])}}};var y=l(m,[["__scopeId","data-v-8896d3b6"]]);export{y as _};
