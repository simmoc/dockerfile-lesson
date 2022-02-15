
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{r as d,a as r,c,z as l,t as y,V as n,y as g,H as f}from"./vendor.d2559d84.js";const _={class:"dialog-footer"},C=f("\u53D6\u6D88"),h=f("\u786E\u5B9A"),v={props:{title:{type:String,default:"\u5F39\u7A97\u6807\u9898"},dialogVisible:{type:Boolean,default:!1},confirmFn:{type:Function,default:()=>new Promise(e=>e())},width:{type:String,default:"500px"},top:{type:String,default:"15vh"},customConfirm:{type:Boolean,default:!1},cusHeader:{type:Boolean,default:!1}},emits:["cancel"],setup(e,{emit:a}){const t=e,p=async()=>{console.log(2222),t.confirmFn()};return(s,o)=>{const i=d("el-button"),u=d("el-dialog");return r(),c(u,{ref:"dialog","model-value":t.dialogVisible,title:t.title,width:e.width||"50%","close-on-click-modal":!1,top:e.top,"close-on-press-escape":!1,onClose:o[1]||(o[1]=m=>a("cancel"))},{footer:l(()=>[y("span",_,[n(s.$slots,"text"),g(i,{size:"small",onClick:o[0]||(o[0]=m=>a("cancel"))},{default:l(()=>[C]),_:1}),t.customConfirm?n(s.$slots,"confirm",{key:1}):(r(),c(i,{key:0,type:"primary",size:"small",onClick:p},{default:l(()=>[h]),_:1}))])]),default:l(()=>[n(s.$slots,"default")]),_:3},8,["model-value","title","width","top"])}}};export{v as _};
