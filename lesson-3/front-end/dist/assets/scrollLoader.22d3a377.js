
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{a as n,q as r,D as d,t as i,V as l}from"./vendor.d2559d84.js";const c={name:"ScrollLoader",props:{minHeight:{type:Number,default:800}},data(){return{topLoading:!1,bottonLoading:!1,stopTopLoading:!1,stopBottonLoading:!1}},computed:{realMinHeight(){return this.minHeight+30}},mounted(){this.listenScroll()},methods:{listenScroll(){var o=this,t=e=>{o.topLoading=!1,e&&(o.stopTopLoading=!0)};setTimeout(function(){var e=document.getElementById("scrollLoader-container");e.onscroll=function(){if(e.scrollTop<=0&&!o.stopTopLoading){if(o.topLoading)return;o.topLoading=!0,o.$emit("scroll-to-top",t)}}},50)}}},p={id:"scrollLoader-container",class:"container-main"},u={key:0,class:"loading"},_={style:{"overflow-x":"hidden"}};function f(o,t,e,m,a,g){return n(),r("div",p,[a.topLoading?(n(),r("div",u)):d("",!0),i("div",_,[l(o.$slots,"default",{},void 0,!0)])])}var h=s(c,[["render",f],["__scopeId","data-v-4c6d2cd3"]]);export{h as default};
