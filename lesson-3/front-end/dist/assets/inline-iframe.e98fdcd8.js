
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as v}from"./index.f1e12eef.js";import{M as n,O as g,o as h,w as i,a as o,c as R,z as x,t as L,q as c,S as k,R as y}from"./vendor.d2559d84.js";import{f as j}from"./index.94e839d6.js";import"./plugin-vue_export-helper.21dcd24c.js";const w={class:"mvp-inline-iframe"},B=["src"],M={props:{include:{type:Array,default:()=>[]}},setup(l){const u=l;let m="https://we-customer-api.freshgood.cn";const t=n({src:"",iframeRouteList:[]}),s=n(""),f=g();function d(e){t.value.src=e.meta&&e.meta.iframeSrc||""}const p=()=>{let e="";t.value.iframeRouteList.forEach(r=>{e=r,console.log("iframeRou",e),e.src.match(/https/g)?(console.log("1111111",e.src),s.value=e.src):(console.log("2222222"),s.value=m+e.src+(e.src.indexOf("?")!==-1?"&":"?")+"token="+j("token"))})};return h(()=>{p()}),i(f,e=>{const r=e.name;console.log(e),d(e),t.value.src&&!t.value.iframeRouteList.find(a=>a.name===r)&&t.value.iframeRouteList.push({src:t.value.src,name:r})},{immediate:!0}),i(u.include,e=>{t.value.iframeRouteList=t.value.iframeRouteList.filter(r=>e.indexOf(r.name)!==-1)}),(e,r)=>{const a=v;return o(),R(a,null,{default:x(()=>[L("div",w,[(o(!0),c(y,null,k(t.value.iframeRouteList,_=>(o(),c("iframe",{key:_.src,src:s.value,frameborder:"0"},null,8,B))),128))])]),_:1})}}};export{M as default};
