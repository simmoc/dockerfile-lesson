
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
var me=Object.defineProperty,_e=Object.defineProperties;var he=Object.getOwnPropertyDescriptors;var oe=Object.getOwnPropertySymbols;var ge=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var ne=(m,p,u)=>p in m?me(m,p,{enumerable:!0,configurable:!0,writable:!0,value:u}):m[p]=u,re=(m,p)=>{for(var u in p||(p={}))ge.call(p,u)&&ne(m,u,p[u]);if(oe)for(var u of oe(p))ye.call(p,u)&&ne(m,u,p[u]);return m},ie=(m,p)=>_e(m,he(p));import{_ as ve}from"./index.333b158c.js";import{_ as be}from"./index.f1e12eef.js";import{O as se,M as G,Q as de,w as xe,I as Ce,o as ce,a6 as U,s as J,E as I,r as _,a as h,q as N,t as i,y as s,z as r,v as ke,x as Te,L as n,J as De,c as O,A as j,D as W,C as P,R as we,S as $e,B as ue,H as D,U as Se,P as ze,W as Ne,K as Ae,F as Be,G as Ve}from"./vendor.d2559d84.js";import{H as A}from"./index.94e839d6.js";import{N as Ie}from"./index.4c9825d9.js";import{_ as je}from"./plugin-vue_export-helper.21dcd24c.js";const He={class:"crud-classify-tree flex flex-direction-column flex flex-justify-start"},Re={class:"crud-classify-tree-head flex flex-justify-between mb24"},Le=i("i",{class:"el-input__icon el-icon-search"},null,-1),Ue=D("\u65B0\u5EFA\u5206\u7EC4"),Oe={class:"crud-classify-tree-wrap flex-1"},Pe={class:"custom-tree-node flex-1 flex flex-justify-between"},Ee=["id","label","onMouseover"],Fe={class:"overflow-ellipsis pr8 left-label-txt"},Ke={key:1,class:"overflow-ellipsis pr8 left-label-txt"},Me={key:2,class:"mock-info-badge"},qe=["onClick"],Ge=i("i",{class:"el-icon-more fs-14"},null,-1),Je=[Ge],We={class:"right-operate-wrap"},Qe=["onClick"],Xe=i("i",{class:"el-icon-more fs-14"},null,-1),Ye=[Xe],Ze={class:"dialog-footer"},et=D("\u53D6 \u6D88"),tt=D(" \u786E \u5B9A "),at={props:{parentSearchParams:{type:Object,default:()=>({})},isSelectAllBtn:{type:Boolean,default:!1},beforeAddChildren:{type:Function,default:()=>!0},parentGetTree:{type:Boolean,default:!1},parentAdd:{type:Boolean,default:!1},parentReset:{type:Boolean,default:!1}},emits:["updatecurrenttreedata"],setup(m,{expose:p,emit:u}){const f=m,t=se(),g=G(""),B=G(!1),H=G(null),{proxy:b}=Se(),a=de({operateList:[{name:"\u65B0\u589E\u5B50\u7EA7",methods:e=>R(e)},{name:"\u7F16\u8F91\u540D\u79F0",methods:e=>Y(e)},{name:"\u5220\u9664",methods:e=>d(e)}],treeData:[],dialog:{visible:!1,title:"",type:"add",name:""},form:{name:"",parentId:0},activeData:null,treeProps:{label:"name",children:"childlist"}});xe(()=>[f.parentGetTree,f.parentAdd,f.parentReset,g.value],([e,l,y,v],[c,k,L,le])=>{e!==c?C():l!==k?w():y!==L?z():v!==le&&C()});const E=Ce(()=>{if(!f.isSelectAllBtn||g.value)return!1;let e=Object.keys(f.parentSearchParams);return e.length&&(e=e.filter(l=>f.parentSearchParams[l])),a.treeData&&a.treeData.length&&!e.length});ce(()=>{C()});const F=()=>{b.$refs.filterTree.setCurrentKey(null),a.activeData={},B.value=!0,u("updatecurrenttreedata",{id:"ALL",label:"\u5168\u90E8"})},K=(e,l,y)=>{for(let v=0;v<y.length;v++){let c=y[v];if(c[l]==e)return c;if(c.childlist&&c.childlist.length>0){let k=K(e,l,c.childlist);if(k)return k}}},Q=e=>{H.value=e.id},S=()=>{H.value=null},M=e=>t.query&&t.query[e]||"",X=(e,l)=>{let{target:y}=e;y.scrollWidth>y.clientWidth&&(l.isPopover=!0)},Y=e=>{a.form.id=e.id||0,a.dialog.title="\u7F16\u8F91\u5206\u7EC4\u540D\u79F0",a.form.name=e.name,a.form.mark="update",a.dialog.visible=!0},R=async e=>{let l=!0;f.beforeAddChildren&&(l=await f.beforeAddChildren(e)),l&&(a.dialog.title="\u65B0\u5EFA\u5206\u7EC4\u540D\u79F0",a.form.name="",a.form.mark="add",a.form.parentId=e.id||0,a.dialog.visible=!0,U(()=>{b.$refs.crudClassifyForm&&b.$refs.crudClassifyForm.clearValidate()}))},o=e=>{A.getTaskCategoryDel({},[e.id]).then(()=>{C()}).catch(l=>{console.log(l)})},d=e=>{J.confirm("\u786E\u8BA4\u662F\u5426\u5220\u9664\u8BE5\u5206\u7EC4\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{o(e)}).catch(()=>{I({type:"info",message:"\u5DF2\u53D6\u6D88\u5220\u9664"})})},w=e=>{console.log(e),a.form={name:"",parentId:0,mark:"add"},a.dialog.type="add",a.dialog.title="\u65B0\u5EFA\u5206\u7EC4\u540D\u79F0",a.dialog.visible=!0,U(()=>{b.$refs.crudClassifyForm&&b.$refs.crudClassifyForm.clearValidate()})},z=()=>{g.value="",C()},$=()=>{a.dialog.visible=!1},q=()=>{b.$refs.crudClassifyForm.validate(e=>{e&&(a.form.mark=="add"&&ee(),a.form.mark=="update"&&Z(),a.dialog.visible=!1)})},Z=()=>{A.getTaskCategoryUpdate({id:a.form.id,name:a.form.name}).then(e=>{e.code==200&&C()}).catch(e=>{console.log(e)})},ee=()=>{A.getTaskCategoryAdd({pid:a.form.parentId,name:a.form.name}).then(e=>{e.code==200&&(e.data&&e.data.id&&(a.activeData=e.data),C())}).catch(e=>{console.log(e)})},te=(e,l)=>{e.methods(l)},ae=e=>{B.value=!1,u("updatecurrenttreedata",e),a.activeData=JSON.parse(JSON.stringify(e))},C=async()=>{let e={};g.value&&(e.search_name=g.value),f.parentSearchParams.code_name?e.task_key=f.parentSearchParams.code_name:e.task_key="";try{let l=await A.getTaskCategory(e);a.treeData=l.data;let y=M("back_tree_id"),v=M("back_table_page_no")||1;if(a.treeData.length<=0){u("updatecurrenttreedata",a.treeData,v);return}let c=null,k=(a.activeData?a.activeData.id:y)||"",L=K(k,"id",a.treeData);U(()=>{if(L&&k)b.$refs.filterTree.setCurrentKey(k),c=b.$refs.filterTree.getCurrentNode(),B.value=!1;else if(f.isSelectAllBtn&&E.value){F();return}else c||(c=a.treeData[0],b.$refs.filterTree.setCurrentKey(c.id));c=JSON.parse(JSON.stringify(c)),delete c.childlist,a.activeData=c,c.keyword=g.value,u("updatecurrenttreedata",c,v)})}catch(l){console.log(l)}};return p({getTreeData:C,resetTree:z,handleClickAdd:w}),(e,l)=>{const y=_("el-input"),v=_("el-button"),c=_("el-tooltip"),k=_("el-popover"),L=_("el-tree"),le=_("el-form-item"),pe=_("el-form"),fe=_("el-dialog");return h(),N("div",He,[i("div",Re,[s(y,{modelValue:g.value,"onUpdate:modelValue":l[0]||(l[0]=x=>g.value=x),modelModifiers:{trim:!0},class:"flex-1 mr8",placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9",size:"mini"},{prefix:r(()=>[Le]),_:1},8,["modelValue"]),s(v,{size:"mini",onClick:l[1]||(l[1]=x=>w())},{default:r(()=>[Ue]),_:1})]),i("div",Oe,[ke(i("div",{class:De([B.value?"tree-select-all tree-select-all-active":"tree-select-all"]),onClick:F}," \u5168\u90E8 ",2),[[Te,f.isSelectAllBtn&&n(E)]]),s(L,{ref:"filterTree",class:"filter-tree",data:n(a).treeData,"node-key":"id","highlight-current":"","default-expand-all":"","expand-on-click-node":!1,indent:8,props:n(a).treeProps,onNodeClick:ae},{default:r(({node:x,data:T})=>[i("div",Pe,[i("div",{id:x.id,class:"left-label",label:T.label,onMouseover:V=>X(V,T)},[T.isPopover?(h(),O(c,{key:0,"popper-class":"crud-classify-tree-label-popover",content:x.label,placement:"top-start"},{default:r(()=>[i("div",Fe,j(x.label),1)]),_:2},1032,["content"])):(h(),N("div",Ke,j(x.label),1)),T.hits_num?(h(),N("div",Me,j(T.hits_num>99?"99+":T.hits_num),1)):W("",!0)],40,Ee),H.value!==T.id?(h(),N("span",{key:0,class:"right-operate-btn",onClick:P(V=>Q(T),["stop"])},Je,8,qe)):(h(),O(k,{key:T.id,"popper-class":"crud-classify-tree-operate-popover",placement:"right-start",trigger:"hover","visible-arrow":!1,onHide:S},{reference:r(()=>[i("span",{class:"right-operate-btn",onClick:l[2]||(l[2]=P(()=>{},["stop"]))},Ye)]),default:r(()=>[i("div",We,[(h(!0),N(we,null,$e(n(a).operateList,V=>(h(),N("div",{key:V.name,class:"right-operate-item",onClick:P(wt=>te(V,T),["stop"])},j(V.name),9,Qe))),128))])]),_:2},1024))])]),_:1},8,["data","props"])]),s(fe,{modelValue:n(a).dialog.visible,"onUpdate:modelValue":l[5]||(l[5]=x=>n(a).dialog.visible=x),width:"418px","custom-class":"crud-classify-tree-dialog","append-to-body":!0,"modal-append-to-body":!0,"destroy-on-close":!0,"close-on-click-modal":!0},{title:r(()=>[i("div",null,j(n(a).dialog.title),1)]),footer:r(()=>[i("span",Ze,[s(v,{size:"mini",onClick:$},{default:r(()=>[et]),_:1}),s(v,{size:"mini",type:"primary",onClick:q},{default:r(()=>[tt]),_:1})])]),default:r(()=>[s(pe,{ref:"crudClassifyForm",size:"mini","label-position":"top",model:n(a).form,onSubmit:l[4]||(l[4]=P(()=>{},["prevent"]))},{default:r(()=>[s(le,{label:"\u5206\u7EC4\u540D\u79F0",prop:"name",rules:[{required:!0,message:"\u5206\u7EC4\u540D\u79F0\u4E0D\u53EF\u4E3A\u7A7A"},{max:10,message:"\u957F\u5EA6\u6700\u591A 10 \u4E2A\u5B57",trigger:"blur"}]},{default:r(()=>[s(y,{modelValue:n(a).form.name,"onUpdate:modelValue":l[3]||(l[3]=x=>n(a).form.name=x),placeholder:"\u8BF7\u8F93\u5165\u5206\u7EC4\u540D\u79F0",maxlength:"10","show-word-limit":"",clearable:"",onKeyup:ue(P(q,["prevent"]),["enter"])},null,8,["modelValue","onKeyup"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"])])}}};const lt=m=>(Be("data-v-7038a0b4"),m=m(),Ve(),m),ot={class:"search-form pb24"},nt=D("\u91CD\u7F6E"),rt=D("\u67E5\u8BE2"),it={class:"event-task-list-page search-tree-table-page flex flex-direction-column"},st={class:"page search-tree-table flex flex-direction-column flex-1"},dt={class:"content-wrap flex flex-direction-column flex-1"},ct={class:"content-main flex flex-justify-start flex-1"},ut={class:"left pb16 content-main-left bdr mr16 pr16"},pt={class:"right flex-1 flex flex-direction-column content-main-right"},ft={class:"table-head flex-row flex flex-justify-between"},mt={class:"table-head-left overflow-ellipsis"},_t={class:"table-head-right"},ht=D(" \u65B0\u589E\u4E8B\u4EF6\u4EFB\u52A1 "),gt={class:"table-body content-main-right-table-body"},yt=D(" \u67E5\u770B "),vt=D(" \u7F16\u8F91 "),bt=D(" \u5220\u9664 "),xt={key:1,class:"empty-tree-data"},Ct=lt(()=>i("div",null,"\u6682\u65E0\u5206\u7EC4\uFF01",-1)),kt=D("\u65B0\u5EFA\u5206\u7EC4"),Tt={class:"table-pagination-wrap flex flex-justify-end"},Dt={setup(m){const p=se(),u=ze(),f=G(null),t=de({previewDialog:{dialogVisible:!1,title:"\u4E8C\u7EF4\u7801",imgUrl:"",imgName:""},search:{},tableData:[],pageSize:10,pageNo:1,pageSizes:[5,10,15,20],totalNo:0,param:{},currentTreeData:{},treeHeight:"400px",doGetTree:!1,doAddTree:!1,doResetTree:!1,tableTitle:[{label:"\u4EFB\u52A1\u540D\u79F0",prop:"name"},{label:"\u5206\u7EC4\u540D\u79F0",prop:"group_name"},{label:"\u662F\u5426\u5F00\u542F",prop:"active",type:"slot"},{label:"\u521B\u5EFA\u65F6\u95F4",prop:"create_time"},{label:"\u66F4\u65B0\u65F6\u95F4",prop:"update_time"},{label:"\u521B\u5EFA\u4EBA",prop:"operator_name"}]});ce(()=>{S(),window.addEventListener("resize",g)}),Ne(()=>{window.removeEventListener("resize",g)});function g(){let o=document.querySelector(".right.content-main-right .content-main-right-table-body");o&&(t.treeHeight=o.clientHeight+112+"px")}function B(o){return new Promise(d=>{o.is_leaf?J.confirm("\u662F\u5426\u5C06\u540C\u7EA7\u7684\u4EFB\u52A1\u79FB\u5165\u5230\u8BE5\u65B0\u5EFA\u5206\u7EC4\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{d(!0)}).catch(()=>{I({type:"info",message:"\u5DF2\u53D6\u6D88\u65B0\u589E"}),d(!1)}):d(!0)})}function H(o,d){let w=!d;o.active=w,J.confirm(`\u786E\u8BA4${w?"\u5173\u95ED":"\u5F00\u542F"}${o.name}\u4E8B\u4EF6\u4EFB\u52A1\u5417\uFF1F`,"\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{A.getTaskStatus({id:o.id}).then(z=>{(z.code==0||z.code==200)&&(I({type:"success",message:`${w?"\u5173\u95ED":"\u5F00\u542F"}\u6210\u529F!`}),o.active=d)}).catch(()=>{})}).catch(()=>{})}function b(){u.push({name:"addEvent",query:{type:"add",page_no:t.pageNo,from_page:p.name}})}function a(o){u.push({name:"editEvent",query:{type:"edit",id:o.id,page_no:t.pageNo,from_page:p.name}})}function E(o){u.push({name:"eventDetail",query:{type:"detail",id:o.id,page_no:t.pageNo,from_page:p.name}})}function F(o){if(o.active){I({type:"error",message:"\u8BE5\u4E8B\u4EF6\u4EFB\u52A1\u4E0D\u53EF\u5220\u9664"});return}J.confirm("\u786E\u8BA4\u662F\u5426\u5220\u9664\u8BE5\u4E8B\u4EF6\u4EFB\u52A1?","\u63D0\u793A",{confirmButtonText:"\u786E\u8BA4",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{A.deleteTask({id:o.id}).then(d=>{(d.code==0||d.code==200)&&(I({type:"success",message:"\u5220\u9664\u6210\u529F!"}),S())}).catch(()=>{})}).catch(()=>{I({type:"info",message:"\u5DF2\u53D6\u6D88\u5220\u9664"})})}function K(o,d){t.currentTreeData=o.id?JSON.parse(JSON.stringify(o)):{},t.pageNo=parseInt(d)||1,S()}function Q(){f.value.handleClickAdd(),t.doAddTree=!t.doAddTree}function S(){if(!t.currentTreeData.id){t.tableData=[];return}let o=ie(re({},t.search),{page:t.pageNo,page_size:t.pageSize,id:t.currentTreeData.id,search_name:t.currentTreeData.keyword,task_key:t.search.code_name||""});A.getTask(o).then(d=>{t.tableData=d.data&&d.data.list,t.totalNo=d.data&&d.data.count,U(()=>{g()})}).catch(()=>{})}function M(o){t.pageSize=o,t.pageNo=1,S()}function X(o){t.pageNo=o,S()}function Y(){t.search={code_name:""},U(()=>{f.value.resetTree(),t.doResetTree=!t.doResetTree})}function R(){console.log("crudClassifyTree.value",f.value),f.value.getTreeData(),t.doGetTree=!t.doGetTree,S()}return(o,d)=>{const w=_("el-input"),z=_("el-form-item"),$=_("el-button"),q=_("el-form"),Z=_("el-switch"),ee=_("el-table-column"),te=ve,ae=_("el-pagination"),C=be;return h(),N("div",null,[i("div",ot,[s(q,{inline:!0,class:"flex flex-justify-between",model:n(t).form,"label-position":"right","label-width":"120px",size:"small"},{default:r(()=>[s(z,{label:"\u4E8B\u4EF6\u4EFB\u52A1\u540D\u79F0\uFF1A",class:"mb0"},{default:r(()=>[s(w,{modelValue:n(t).search.code_name,"onUpdate:modelValue":d[0]||(d[0]=e=>n(t).search.code_name=e),modelModifiers:{trim:!0},style:{width:"210px"},size:"small",placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0","show-word-limit":"",clearable:"",onClear:R,onKeyup:ue(R,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),s(z,{class:"mb0 mr0"},{default:r(()=>[s($,{type:"default",onClick:Y},{default:r(()=>[nt]),_:1}),s($,{type:"primary",onClick:R},{default:r(()=>[rt]),_:1})]),_:1})]),_:1},8,["model"])]),s(C,null,{default:r(()=>[i("div",it,[i("div",st,[i("div",dt,[i("div",ct,[i("div",ut,[s(at,{ref_key:"crudClassifyTree",ref:f,"parent-search-params":n(t).search,"is-select-all-btn":!0,"before-add-children":B,"parent-get-tree":n(t).doGetTree,"parent-add":o.doAddTree,"parent-reset":n(t).doResetTree,style:Ae({minHeight:"calc(100vh - 287px)",height:o.treeHeight}),onUpdatecurrenttreedata:K},null,8,["parent-search-params","parent-get-tree","parent-add","parent-reset","style"])]),i("div",pt,[i("div",ft,[i("div",mt,j(n(t).currentTreeData.name||""),1),i("div",_t,[n(t).currentTreeData&&n(t).currentTreeData.id?(h(),O($,{key:0,type:"primary",size:"mini",icon:"el-icon-plus",onClick:b},{default:r(()=>[ht]),_:1})):W("",!0)])]),i("div",gt,[n(t).currentTreeData&&n(t).currentTreeData.id?(h(),O(te,{key:0,"table-title":n(t).tableTitle,"table-data":n(t).tableData,"need-pagination":!0},{active:r(e=>[s(Z,{modelValue:e.data.active,"onUpdate:modelValue":l=>e.data.active=l,onChange:l=>H(e.data,l)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),default:r(()=>[s(ee,{label:"\u64CD\u4F5C",width:"160px",fixed:"right"},{default:r(e=>[s($,{type:"text",size:"mini",onClick:l=>E(e.row,e.index)},{default:r(()=>[yt]),_:2},1032,["onClick"]),s($,{type:"text",size:"mini",onClick:l=>a(e.row,e.index)},{default:r(()=>[vt]),_:2},1032,["onClick"]),s($,{type:"text",size:"mini",onClick:l=>F(e.row,e.index)},{default:r(()=>[bt]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["table-title","table-data"])):n(t).tableData&&!n(t).tableData.length?(h(),N("div",xt,[s(Ie,null,{content:r(()=>[Ct]),button:r(()=>[s($,{size:"small",type:"primary",onClick:Q},{default:r(()=>[kt]),_:1})]),_:1})])):W("",!0)]),i("div",Tt,[n(t).tableData.length?(h(),O(ae,{key:0,"current-page":n(t).pageNo,"page-sizes":n(t).pageSizes,"page-size":n(t).pageSize,layout:"total, sizes, prev, pager, next, jumper",total:n(t).totalNo,onSizeChange:M,onCurrentChange:X},null,8,["current-page","page-sizes","page-size","total"])):W("",!0)])])])])])])]),_:1})])}}};var It=je(Dt,[["__scopeId","data-v-7038a0b4"]]);export{It as default};
