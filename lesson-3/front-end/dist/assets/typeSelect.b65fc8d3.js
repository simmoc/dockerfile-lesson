
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as D}from"./index.5931791c.js";import{a as J}from"./drag.56588ea6.js";import{H as U}from"./index.94e839d6.js";import{d as z}from"./vuedraggable.umd.56963d08.js";import{_ as O}from"./plugin-vue_export-helper.21dcd24c.js";import{M as v,w as $,r as u,a as r,q as f,y as i,z as d,t,R as A,S as F,J as h,A as b,D as w,L as G,c as H,F as M,G as q,E as S}from"./vendor.d2559d84.js";import"./sortable.esm.81321d43.js";const c=o=>(M("data-v-1b261554"),o=o(),q(),o),R={class:"cate-manage"},K={class:"col-width"},P={class:"cate-list flex flex-wrap"},Q=["onClick"],W={class:"item-title c26 fs16 fwb"},X={class:"item-type c8c fs14"},Y=c(()=>t("div",{class:"select-cate"},[t("i",{class:"el-icon-check fs12 cfff"})],-1)),Z=c(()=>t("div",{class:"item-title"},[t("i",{class:"el-icon-plus fs20 fwb c8c"})],-1)),ee=c(()=>t("div",{class:"item-type c8c fs14"},"\u5546\u54C1\u7C7B\u76EE",-1)),te=[Z,ee],se={class:"cate-select-box"},le=c(()=>t("div",{class:"can-drag-icon flex flex-align-center flex-justify-center"},[t("img",{style:{width:"12px",height:"12px","vertical-align":"middle"},src:J,alt:"drag"})],-1)),ae={class:"cate-create-input flex flex-align-center"},oe=["onClick"],ie=c(()=>t("i",{class:"el-icon-delete-solid fs16"},null,-1)),de=[ie],ce=c(()=>t("i",{class:"el-icon-plus fs14"},null,-1)),ne=c(()=>t("span",null,"\u6DFB\u52A0\u7C7B\u76EE\u5546\u54C1",-1)),re={props:{typeList:{type:[Array],defalut:[]},typeId:{type:[String,Number],defalut:""},goodsType:{type:[String],defalut:""},canSelect:{type:[Boolean],defalut:!0},disabled:{type:[Boolean],defalut:!1}},emits:["update:typeId","update:goodsType","getTypeList"],setup(o,{emit:m}){const n=o,l=v([]),_=v(!1),C=v({});$(()=>n.typeList,a=>{l.value=JSON.parse(JSON.stringify(a)),l.value.forEach(s=>{s.goods_category_id==n.typeId&&(C.value=s)})},{deep:!0,immediate:!0});const V=a=>{m("update:typeId",a.goods_category_id),m("update:goodsType",a.type)},k=()=>{if(l.value.length==5){S.warning({message:"\u6700\u591A\u6DFB\u52A05\u4E2A\u7C7B\u76EE"});return}let a={name:"",sort:0,type:"arrival",goods_category_id:""};l.value.push(a)},I=(a,s)=>{a.is_exist_goods||a.is_exist_order||l.value.splice(s,1)},j=()=>{},L=async()=>{for(let s=0;s<l.value.length;s++)if(l.value[s].sort=200-s,!l.value[s].name){S.warning({message:"\u8BF7\u586B\u5199\u7C7B\u76EE\u540D\u79F0\u518D\u8FDB\u884C\u4FDD\u5B58"});return}const{code:a}=await U.updateGoodsTypes({goods_category_list:l.value});a==200&&(_.value=!1),m("getTypeList",!0)},T=()=>{_.value=!1,l.value=JSON.parse(JSON.stringify(n.typeList))};return console.log(n),(a,s)=>{const g=u("el-row"),y=u("el-option"),N=u("el-select"),B=u("el-input"),E=D;return r(),f("div",R,[i(g,null,{default:d(()=>[t("div",K,[t("div",P,[(r(!0),f(A,null,F(o.typeList,e=>(r(),f("div",{key:e.goods_category_id,class:h(["cate-item mr8 flex flex-direction-column flex-align-center mt12",[e.goods_category_id==o.typeId?"cate-item-active":""]]),onClick:x=>V(e)},[t("div",W,b(e.name),1),t("div",X,"("+b(e.type=="arrival"?"\u5230\u5E97\u4F7F\u7528":"\u5FEB\u9012\u53D1\u8D27")+")",1),Y],10,Q))),128)),n.canSelect?w("",!0):(r(),f("div",{key:0,class:"cate-item mr8 flex flex-direction-column flex-align-center mt12",onClick:s[0]||(s[0]=e=>_.value=!0)},te))])])]),_:1}),i(E,{title:"\u5546\u54C1\u7C7B\u76EE","dialog-visible":_.value,width:"560px","confirm-fn":L,onCancel:T},{default:d(()=>[i(G(z),{modelValue:l.value,"onUpdate:modelValue":s[1]||(s[1]=e=>l.value=e),disabled:o.disabled,onEnd:j},{item:d(({element:e,index:x})=>[t("div",se,[i(g,{class:"cate-create-item flex flex-align-center mb8"},{default:d(()=>[le,t("div",ae,[i(B,{modelValue:e.name,"onUpdate:modelValue":p=>e.name=p,size:"small","show-word-limit":"",maxlength:4,placeholder:"\u8BF7\u8F93\u5165\u7C7B\u76EE\u540D\u79F0",class:"input-with-select",style:{width:"441px"}},{prepend:d(()=>[i(N,{modelValue:e.type,"onUpdate:modelValue":p=>e.type=p,placeholder:"\u8BF7\u9009\u62E9",disabled:e.is_exist_goods||e.is_exist_order,size:"small",style:{width:"120px"}},{default:d(()=>[i(y,{label:"\u5230\u5E97\u4F7F\u7528",value:"arrival"}),i(y,{label:"\u5FEB\u9012\u53D1\u8D27",value:"logistics"})]),_:2},1032,["modelValue","onUpdate:modelValue","disabled"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),t("div",{class:h(["delete-box flex flex-align-center c32 flex-justify-center",[e.is_exist_goods||e.is_exist_order?"del-disable":""]]),onClick:p=>I(e,x)},de,10,oe)]),_:2},1024)])]),_:1},8,["modelValue","disabled"]),l.value.length!=5?(r(),H(g,{key:0,class:"add-cate-btn flex flex-align-center flex-justify-center",onClick:k},{default:d(()=>[ce,ne]),_:1})):w("",!0)]),_:1},8,["dialog-visible"])])}}};var ye=O(re,[["__scopeId","data-v-1b261554"]]);export{ye as default};
