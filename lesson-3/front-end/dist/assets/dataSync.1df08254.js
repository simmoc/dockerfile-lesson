
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as S}from"./index.f1e12eef.js";import{H as h}from"./index.94e839d6.js";import{_ as x}from"./plugin-vue_export-helper.21dcd24c.js";import{M as o,o as I,W as k,a as w,q as C,y as T,z as j,t as e,A as _,J as n,F as B,G as H,H as m}from"./vendor.d2559d84.js";const c=r=>(B("data-v-a0b85578"),r=r(),H(),r),N={class:"dataSync-content"},V=c(()=>e("p",{class:"fs14 mb4 c3 fwb"}," \u540C\u6B65\u7EC4\u7EC7\u67B6\u6784 ",-1)),$={class:"fs12"},z=m(),D=c(()=>e("span",{class:"fs14 vtm"},"\u540C\u6B65\u4F01\u4E1A\u5FAE\u4FE1",-1)),G={class:"dataSync-content"},M=c(()=>e("p",{class:"fs14 mb4 c3 fwb"}," \u540C\u6B65\u5BA2\u6237 ",-1)),U={class:"fs12"},q=m(),A=c(()=>e("span",{class:"fs14 vtm"},"\u540C\u6B65\u4F01\u4E1A\u5FAE\u4FE1",-1)),E={class:"dataSync-content"},F=c(()=>e("p",{class:"fs14 mb4 c3 fwb"}," \u540C\u6B65\u7FA4\u6570\u636E ",-1)),J={class:"fs12"},W=m(),K=c(()=>e("span",{class:"fs14 vtm"},"\u540C\u6B65\u4F01\u4E1A\u5FAE\u4FE1",-1)),L={setup(r){const v=o(""),f=o(""),g=o("");var t=null;const p=async(l,s)=>{await h[l]().finally(()=>{t&&clearInterval(t),console.log(s),t=setInterval(()=>{a("department"),a("customer"),a("group")},1e3),console.log(t)})};I(()=>{t?clearInterval(t):t=setInterval(()=>{a("department"),a("customer"),a("group")},1e3)}),k(()=>{clearInterval(t)});const i=o(!0),d=o(!0),u=o(!0),a=async l=>{!d.value&&!u.value&&!i.value&&clearInterval(t);let{data:s}=await h.getSyncTime({type:l});switch(l){case"department":v.value=s.time,d.value=s.status;break;case"customer":f.value=s.time,u.value=s.status;break;case"group":g.value=s.time,i.value=s.status;break}};return a("department"),a("customer"),a("group"),(l,s)=>{const b=S;return w(),C("div",null,[T(b,{class:"flex flex-direction-column"},{default:j(()=>[e("div",N,[e("div",null,[V,e("p",$," \u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u65F6\u95F4 "+_(v.value),1)]),e("div",{class:n(["sync-btn",{"department-disabled":d.value}]),onClick:s[0]||(s[0]=y=>p("syncDepartment","department"))},[e("i",{class:n(["icon el-icon-refresh",{"department-loading":d.value}])},null,2),z,D],2)]),e("div",G,[e("div",null,[M,e("p",U," \u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u65F6\u95F4 "+_(f.value||"\u65E0"),1)]),e("div",{class:n(["sync-btn",{"customer-disabled":u.value}]),onClick:s[1]||(s[1]=y=>p("syncCustomer","customer"))},[e("i",{class:n(["icon el-icon-refresh",{"customer-loading":u.value}])},null,2),q,A],2)]),e("div",E,[e("div",null,[F,e("p",J," \u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u65F6\u95F4 "+_(g.value||"\u65E0"),1)]),e("div",{class:n(["sync-btn",{"group-disabled":i.value}]),onClick:s[2]||(s[2]=y=>p("syncGroup","group"))},[e("i",{class:n(["icon el-icon-refresh",{"group-loading":i.value}])},null,2),W,K],2)])]),_:1})])}}};var X=x(L,[["__scopeId","data-v-a0b85578"]]);export{X as default};
