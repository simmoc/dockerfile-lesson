
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
var u=Object.defineProperty;var r=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var s=(t,e,l)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[e]=l,c=(t,e)=>{for(var l in e||(e={}))x.call(e,l)&&s(t,l,e[l]);if(r)for(var l of r(e))f.call(e,l)&&s(t,l,e[l]);return t};import{a as n,q as d,t as a,K as o,A as g,J as h,C as y,D as m}from"./vendor.d2559d84.js";import{_ as T}from"./plugin-vue_export-helper.21dcd24c.js";const v={class:"block"},S={props:{color:{type:String,default:"#409eff"},leftTitle:{type:String,default:"xxxx"},rightTitle:{type:String,default:"xxxx"},rightTitleWidth:{type:Number},fontSize:{type:[String,Number],default:12},showClose:{type:Boolean,default:()=>!1},customerStyle:{type:Object,default:()=>{}},rightTextBreak:{type:Boolean,default:!1},rightTextAuto:{type:Boolean,default:!1}},emits:["closeTag"],setup(t,{emit:e}){const l=t;return(k,i)=>(n(),d("div",v,[a("div",{class:"customer-tag",style:o(c({"font-size":t.fontSize+"px"},t.customerStyle))},[a("div",{class:"tag-left",style:o({"border-color":t.color,color:t.color})},g(t.leftTitle),5),a("div",{class:"tag-right",style:o({"background-color":t.color})},[a("span",{style:o({width:t.rightTitleWidth+"px"}),class:h({"tag-right-text":!t.rightTextAuto&&!t.rightTextBreak,"tag-right-text-wrap":!t.rightTextAuto&&t.rightTextBreak,"tag-right-text-auto":t.rightTextAuto})},g(t.rightTitle),7),l.showClose?(n(),d("i",{key:0,class:"el-icon-close",onClick:i[0]||(i[0]=y(B=>e("closeTag"),["stop"]))})):m("",!0)],4)],4)]))}};var w=T(S,[["__scopeId","data-v-621558d9"]]);export{w as _};
