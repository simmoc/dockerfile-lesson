
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{I as c,a as n,q as s,J as u,K as o,L as i,t as d}from"./vendor.d2559d84.js";const p=["xlink:href"],f={props:{name:{type:String,required:!0},flip:{type:String,validator(e){return["","horizontal","vertical","both"].includes(e)},default:""},rotate:{type:Number,validator(e){return e>=0&&e<=360},default:0}},setup(e){const a=e,r=c(()=>{let t=[];if(a.flip!="")switch(a.flip){case"horizontal":t.push("rotateY(180deg)");break;case"vertical":t.push("rotateX(180deg)");break;case"both":t.push("rotateX(180deg)"),t.push("rotateY(180deg)");break}return a.rotate!=0&&t.push(`rotate(${a.rotate}deg)`),`transform: ${t.join(" ")};`});return(t,m)=>e.name.indexOf("el-icon-")===0||e.name.indexOf("ri-")===0?(n(),s("i",{key:0,class:u(["svg-icon",e.name]),style:o(i(r))},null,6)):(n(),s("svg",{key:1,class:"svg-icon",style:o(i(r)),"aria-hidden":"true"},[d("use",{"xlink:href":`#icon-${e.name}`},null,8,p)],4))}};var g=l(f,[["__scopeId","data-v-19c3e522"]]);export{g as _};
