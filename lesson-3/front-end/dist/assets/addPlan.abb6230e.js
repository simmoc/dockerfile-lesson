
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as Fe}from"./select-member.d05cd3eb.js";import{_ as Je}from"./index.f1e12eef.js";import{b as he,H as Y,e as ze}from"./index.94e839d6.js";import{O as ye,M as v,w as _e,o as ke,a as i,q as d,t as p,R as K,S as W,J as de,A as c,F as Ve,G as we,P as Ke,Q as We,r as y,y as a,z as u,L as h,E as m,h as I,c as F,D as w,H as _}from"./vendor.d2559d84.js";import xe from"./calendarDialog.cba14238.js";import Me from"./calendarSelect.44eb066d.js";import{C as Xe}from"./index.384ab11c.js";import{C as Qe}from"./index.86b73b96.js";import{_ as ce}from"./index.60aa6862.js";import{_ as Ce}from"./plugin-vue_export-helper.21dcd24c.js";import"./tick@2x.1e6bc440.js";import"./vuedraggable.umd.56963d08.js";import"./sortable.esm.81321d43.js";import"./index.a5dee889.js";import"./index.41459e6c.js";import"./word-img.bb3865fc.js";import"./drag.56588ea6.js";import"./index.5931791c.js";import"./index.a3c908a5.js";import"./formValidate.137fd30a.js";const Ze=x=>(Ve("data-v-7229f105"),x=x(),we(),x),et=Ze(()=>p("span",{class:"title-class"},"\u6BCF\u6708\u7684",-1)),tt=["onClick"],at={props:{modelValue:{type:Array}},emits:["update:modelValue","selectMonth"],setup(x,{emit:N}){const f=x,X=ye(),D=v(!1),M=()=>{X.query.type=="edit"&&(D.value=!0)},b=v(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]),k=v([]);_e(()=>f.modelValue,()=>{f.modelValue!=""&&(k.value=f.modelValue)},{deep:!0,immediate:!0});function j(C){k.value.includes(C)?k.value.splice(k.value.indexOf(C),1):k.value.push(C),N("selectMonth",k.value),console.log("update:modelValue",k.value),N("update:modelValue",k.value)}return ke(()=>{M()}),(C,Q)=>(i(),d("div",{class:de(["mt24 mb24",{cursor:D.value}])},[et,p("div",{class:de(["date-box flex flex-wrap p20 mt8",{editDisabled:D.value}])},[(i(!0),d(K,null,W(b.value,T=>(i(),d("div",{key:T,class:de(["day-item","ml14","mt6",k.value.includes(T)?"day-item-selected":""]),onClick:R=>j(T)},c(T),11,tt))),128))],2)],2))}};var lt=Ce(at,[["__scopeId","data-v-7229f105"]]);const q=x=>(Ve("data-v-7a5f9694"),x=x(),we(),x),ut={class:"tagClass flex flex-align-center"},ot=_("\u7ACB\u5373\u5F00\u59CB"),st=_(" \u81EA\u5B9A\u4E49\u65F6\u95F4 "),rt=q(()=>p("span",{class:"tips-class"},"\u5EFA\u8BAE\u6267\u884C\u65F6\u957F \u5927\u4E8E 10 \u5206\u949F\uFF0C\u4FDD\u8BC1\u4EFB\u52A1\u6B63\u5E38\u751F\u6210\u4E0B\u53D1\u7EDF\u8BA1\u3002",-1)),nt=_("\u4E0D\u91CD\u590D"),it=_(" \u91CD\u590D "),_t={key:0},dt={key:0},ct={key:1},pt={key:0},vt={key:1,class:"repeatClass mb24 p20"},mt={key:0,class:"selectClass flex flex-align-center"},ft=_(" \u6BCF "),gt=_(" \u65E5 "),bt={key:1,class:"selectClass flex flex-align-center"},ht=_("\u661F\u671F\u4E00"),yt=_("\u661F\u671F\u4E8C"),kt=_("\u661F\u671F\u4E09"),Vt=_("\u661F\u671F\u56DB"),wt=_("\u661F\u671F\u4E94"),xt=_("\u661F\u671F\u516D"),Mt=_("\u661F\u671F\u65E5"),Ct={key:2},jt={class:"flex flex-align-center"},Ot=_(" \u6BCF "),St=_(" \u6708 "),Dt={class:"tagClass flex flex-align-center"},Tt=_("\u53D1\u9001\u7ED9\u5BA2\u6237"),Ut=_("\u53D1\u9001\u7ED9\u5BA2\u6237\u7FA4"),Et=_("\u53D1\u9001\u5230\u670B\u53CB\u5708"),It={key:0},qt=_("\u6309\u6761\u4EF6\u7B5B\u9009\u5BA2\u6237"),Nt=_("\u5168\u90E8"),Rt={key:1},$t=q(()=>p("label",{class:"el-form-item__label"},[p("i",{class:"color-red"},"*"),_(" \u7B5B\u9009\u7FA4\u4E3B ")],-1)),Ht={key:2},Pt=_("\u6309\u6761\u4EF6\u7B5B\u9009\u5BA2\u6237"),Lt=_("\u5168\u90E8"),Gt={class:"tagClass flex flex-align-center"},At={key:0,class:"search-head-wrap"},Bt=_("\u4F01\u4E1A\u7FA4\u53D1"),Yt=_("\u6210\u5458\u5355\u53D1"),Ft={key:0},Jt={key:0},zt={key:1},Kt={key:1},Wt={key:0},Xt={key:0},Qt={key:1},Zt={key:1},ea={key:0},ta={key:1},aa={class:"known"},la={class:"el-form-item__label"},ua=q(()=>p("i",{class:"color-red"},"*",-1)),oa=_(" \u6D88\u606F\u5185\u5BB9 "),sa={class:"el-form-item_label-span"},ra={class:"item-button tr"},na=_("\u53D6\u6D88"),ia=_("\u63D0\u4EA4"),_a={key:1,class:"search-head-wrap"},da=_("\u4F01\u4E1A\u53D1\u8868\u5BA2\u6237\u670B\u53CB\u5708"),ca=_("\u6210\u5458\u53D1\u8868\u5BA2\u6237\u670B\u53CB\u5708"),pa={key:0},va={key:1},ma={key:0},fa={key:1},ga={class:"known"},ba={class:"el-form-item__label"},ha=q(()=>p("i",{class:"color-red"},"*",-1)),ya=_(" \u6D88\u606F\u5185\u5BB9 "),ka={class:"el-form-item_label-span"},Va={class:"item-button tr"},wa=_("\u53D6\u6D88"),xa=_("\u63D0\u4EA4"),Ma=q(()=>p("div",{class:"group_name"},"\u5F53\u524D\u9875\u9762\u4E3A\u4FDD\u5B58\uFF0C\u8BF7\u786E\u8BA4\u662F\u5426\u5173\u95ED\u8BE5\u9875\u9762",-1)),Ca=q(()=>p("div",{class:"group_name"},"\u4EC5\u4FEE\u6539\u6B64\u4EFB\u52A1\uFF0C\u8FD8\u662F\u4FEE\u6539\u5C06\u6765\u7684\u6240\u6709\u4EFB\u52A1?",-1)),ja=q(()=>p("span",{class:"group_name"}," \u5207\u6362\u76EE\u6807\u5BF9\u8C61\uFF0C\u4F1A\u5BFC\u81F4\u5DF2\u7F16\u8F91\u7684\u89E6\u8FBE\u52A8\u4F5C\u5185\u5BB9\u6E05\u7A7A\u3002\u786E\u8BA4\u662F\u5426\u7EE7\u7EED\u5207\u6362\uFF1F ",-1)),Oa={class:"dialog-footer"},Sa=_("\u53D6\u6D88"),Da=_("\u786E\u8BA4"),Ta={setup(x){const N=Ke(),f=ye(),X=v([]),D=v([]),M=v(""),b=v([]),k=v([]),j=v({}),C=v(!1),Q=v(!1),T=v(!1),R=v(null),U=v(!1),Z=v(!1),$=v(!1),ee=v(0),A=v(!1),te=v(!1),pe=v(!1),H=v(!1),e=v({name:"",end_time:"",start_time:"",touch_object:"",receive_type:"",task_type:"",is_repeat:"",repeat_type:"",repeat_deadline:"",repeat_space:"",receive_group:[],repeat_node:[],content_arr:[],all_customer_num:0,no_touch_num:0,can_touch_num:0,select_receiver_num:0,repeat_task_num:0,start_type:""}),O=v([]),V=We({taskTitle:"",manualTask:"",planTask:"",writeBackSelectedMemberOrg:[],customInputValueFn:r=>Ie(r,3)||"",rules:{name:[{required:!0,message:"\u4EFB\u52A1\u540D\u79F0\u662F\u5FC5\u586B\u9879"},{max:10,message:"\u4EFB\u52A1\u540D\u79F0\u957F\u5EA6\u4EC5\u4E3A10\u4E2A\u5B57",trigger:"blur"}],end_time:[{required:!0,message:"\u4EFB\u52A1\u622A\u6B62\u6267\u884C\u65F6\u95F4\u662F\u5FC5\u586B\u9879",trigger:"blur"}],start_type:[{required:!0,message:"\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4\u662F\u5FC5\u9009\u9879",trigger:"change"}],touch_object:[{required:!0,message:"\u9009\u62E9\u5BF9\u8C61\u7C7B\u578B\u662F\u5FC5\u586B\u9879",trigger:"change"}],receive_type:[{required:!0,message:"\u7B5B\u9009\u5BA2\u6237\u662F\u5FC5\u586B\u9879",trigger:"change"}],task_type:[{required:!0,message:"\u89E6\u8FBE\u65B9\u5F0F\u662F\u5FC5\u586B\u9879",trigger:"change"}],is_repeat:[{required:!0,message:"\u4EFB\u52A1\u662F\u5426\u91CD\u590D\u662F\u5FC5\u586B\u9879",trigger:"blur"}]},options:[{value:"DAY",label:"\u6309\u65E5\u91CD\u590D"},{value:"WEEK",label:"\u6309\u5468\u91CD\u590D"},{value:"MONTH",label:"\u6309\u6708\u91CD\u590D"}]}),je=()=>{pe.value&&(te.value=!0),te.value?A.value=!0:te.value=!0,O.value.push(e.value.touch_object)},Oe=()=>{O.value=[],O.value.push(e.value.touch_object),e.value.content_arr=[],A.value=!1,S()},ve=()=>{for(let r=1;r<O.value.length;r++)O.value.slice(r,O.value.length-1),e.value.touch_object=O.value[0];A.value=!1},Se=()=>{e.value.content_arr=[],S()},ae=()=>{S()},De=()=>{if(I(e.value.start_time).unix()*1e3-1<new Date-1){m.error({message:"\u6240\u9009\u4EFB\u52A1\u5F00\u59CB\u65F6\u957F\u5C0F\u4E8E\u5F53\u524D\u65F6\u95F4\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u5927\u4E8E\u5F53\u524D\u65F6\u957F\u7684\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4!"}),e.value.start_time="";return}P(e.value.repeat_type)},le=()=>{const r=1*60*1e3;if(I(e.value.end_time).unix()*1e3-1<new Date-1)return m.error({message:"\u6240\u9009\u4EFB\u52A1\u622A\u6B62\u65F6\u957F\u5C0F\u4E8E\u5F53\u524D\u65F6\u95F4\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u5927\u4E8E\u5F53\u524D\u65F6\u957F\u7684\u4EFB\u52A1\u622A\u6B62\u65F6\u95F4!"}),e.value.end_time="",!0;if(I(e.value.end_time).unix()*1e3-1<I(e.value.start_time).unix()*1e3-1+r)return m.error({message:"\u6240\u9009\u4EFB\u52A1\u622A\u6B62\u65F6\u957F\u5C0F\u4E8E\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4\uFF0C\u8BF7\u9009\u62E9\u8D85\u8D8A\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F41\u5206\u949F\u4EE5\u4E0A\u7684\u65F6\u957F!"}),e.value.end_time="",!0},Te=()=>{e.value.start_type=="CUSTOM"&&(e.value.end_time="",f.query.type=="add"?e.value.is_repeat="0":e.value.is_repeat="1"),e.value.start_type=="IMMEDI"&&(e.value.start_time="",e.value.end_time="")};function Ue(r){const t=24*60*60*1e3;return r.getTime()<Date.now()-t}function Ee(r){const t=24*60*60*1e3;let n=0;e.value.start_type=="CUSTOM"&&e.value.start_time?n=I(e.value.start_time).unix()*1e3-t:n=Date.now()-t;const l=n+t*30;return r.getTime()<n||r.getTime()>l}function Ie(r,t){return`${r.slice(0,t).map(n=>n.member_name||n.department_name).join("\uFF0C")}${r.length>t?"...":""}`}function ue(r,t){const n=200;return t>=n?(m({message:`\u6700\u591A\u652F\u6301\u5BA2\u6237\u4EBA\u6570${n}\u4EBA`,type:"error"}),!1):!0}const qe=r=>{e.value.repeat_node=[],X.value=[],e.value.repeat_deadline="",e.value.repeat_space="",P(r)},P=r=>{D.value=[];let{start_time:t,repeat_space:n,repeat_node:l}=e.value;(r=="DAY"||r=="MONTH")&&n==""||(D.value=ze(r,n,l,t,"MM-DD dddd HH:mm"))};function Ne(r){e.value.repeat_node=r,P("MONTH")}function me(){T.value=!0,C.value=!1,$.value=!0}const Re=()=>{N.push({name:"calendar"})},$e=()=>{$.value=!1},oe=he(async r=>{const{mediaList:t,content:n}=await ge(e.value.content_arr);let l=[];if(b.value.length==0&&JSON.stringify(e.value.receive_group)!="[]"?e.value.receive_group[0].tag_ids=l:b.value.forEach(L=>{l.push(L.tag_id),e.value.receive_group[0].tag_ids=l}),e.value.receive_type=="1"&&(!V.writeBackSelectedMemberOrg||!V.writeBackSelectedMemberOrg[0])&&b.value.length==0){m.error("\u6761\u4EF6\u7EC4\u90FD\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u4E00\u79CD\u6761\u4EF6");return}if(e.value.name==""){m.error("\u4EFB\u52A1\u540D\u79F0\u4E3A\u7A7A\uFF0C\u8BF7\u8BBE\u7F6E\u4EFB\u52A1\u540D\u79F0");return}if(e.value.touch_object==""){m.error("\u76EE\u6807\u5BF9\u8C61\u672A\u9009\u62E9\uFF0C\u8BF7\u9009\u62E9\u76EE\u6807\u5BF9\u8C61");return}if(e.value.task_type==""){m.error("\u89E6\u8FBE\u52A8\u4F5C\u65B9\u5F0F\u672A\u9009\u62E9\uFF0C\u8BF7\u9009\u62E9\u89E6\u8FBE\u52A8\u4F5C\u65B9\u5F0F");return}if(le())return;j.value=e.value,j.value.update_type=r,j.value.id=f.query.id,j.value.content=n,j.value.annex_content_json=t;let g="";H.value=!0,$.value=!1;try{g=await Y.updateTaskSave(j.value),g.code===200&&(m.success({message:"\u4FEE\u6539\u6210\u529F"}),N.push({name:"calendar"}))}finally{H.value=!1}}),fe=he(async()=>{const{mediaList:r,content:t}=await ge(e.value.content_arr);if(t==""&&r==""){m.error("\u8BF7\u8F93\u5165\u8981\u53D1\u9001\u7684\u6D88\u606F\u5185\u5BB9\u548C\u5BF9\u5E94\u9644\u4EF6");return}if(e.value.start_type==""){m.error("\u8BF7\u9009\u62E9\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4");return}if(e.value.start_type=="IMMEDI"&&!e.value.end_time){m.error("\u8BF7\u586B\u5199\u4EFB\u52A1\u65F6\u95F4");return}if(e.value.start_type=="CUSTOM"&&(!e.value.start_time||!e.value.end_time)){m.error("\u8BF7\u586B\u5199\u4EFB\u52A1\u65F6\u95F4");return}if(!le()){if(f.query.type=="add"){if(f.query.title=="\u8BA1\u5212\u4EFB\u52A1"){if(e.value.task_property="PLAN",e.value.touch_object=="GROUP"&&(e.value.receive_type="1"),e.value.repeat_space==""&&(e.value.repeat_space="1"),e.value.name==""){m.error("\u4EFB\u52A1\u540D\u79F0\u4E3A\u7A7A\uFF0C\u8BF7\u8BBE\u7F6E\u4EFB\u52A1\u540D\u79F0");return}if(e.value.task_type==""){m.error("\u76EE\u6807\u5BF9\u8C61\u672A\u9009\u62E9\uFF0C\u8BF7\u9009\u62E9\u76EE\u6807\u5BF9\u8C61");return}if(e.value.receive_type==""){m.error("\u7B5B\u9009\u5BA2\u6237\u672A\u9009\u62E9\uFF0C\u8BF7\u7B5B\u9009\u5BA2\u6237");return}}let l=[];if(JSON.stringify(e.value.receive_group)!="[]"&&(b.value.length==0?e.value.receive_group[0].tag_ids=l:b.value.forEach(L=>{l.push(L.tag_id),e.value.receive_group[0].tag_ids=l}),JSON.stringify(e.value.receive_group[0])=="{}"&&e.value.receive_type=="1")){m.error("\u6761\u4EF6\u7EC4\u90FD\u4E3A\u7A7A\uFF0C\u8BF7\u9009\u62E9\u4E00\u79CD\u6761\u4EF6");return}S();let s=e.value;s=e.value,s.content=t,s.annex_content_json=r;let g="";H.value=!0;try{g=await Y.addTask(s),g.code===200&&(m.success({message:"\u63D0\u4EA4\u6210\u529F"}),N.push({name:"calendar"}))}finally{H.value=!1}}f.query.type=="edit"&&(e.value.is_repeat=="1"?(Q.value=!0,$.value=!0,C.value=!0):oe("1"))}}),He=async r=>{U.value=!0;let{data:t}=await Y.editOrDetailTask({id:r});e.value=t,e.value.is_repeat=="1"&&be(),Pe(e.value.repeat_deadline),e.value.repeat_deadline=I(e.value.repeat_deadline).format(`MM-DD ${M.value} HH:mm`),e.value.content_arr=Le(t),JSON.stringify(e.value.receive_group)!="[]"&&(e.value.receive_group[0].tag_arr&&(k.value=e.value.receive_group[0].tag_arr),e.value.receive_group[0].select_members_info&&(V.writeBackSelectedMemberOrg=e.value.receive_group[0].select_members_info))};function Pe(r){switch(I(r).day()){case 1:return M.value="\u661F\u671F\u4E00";case 2:return M.value="\u661F\u671F\u4E8C";case 3:return M.value="\u661F\u671F\u4E09";case 4:return M.value="\u661F\u671F\u56DB";case 5:return M.value="\u661F\u671F\u4E94";case 6:return M.value="\u661F\u671F\u516D";case 0:return M.value="\u661F\u671F\u65E5"}}const ge=r=>{let t=[],n="";return console.log("\u521D\u59CB\u5316\u524D\u53C2\u6570",r),r.length||Promise.resolve({mediaList:t,content:n}),console.log("\u521D\u59CB\u5316\u524D\u53C2\u6570",r),r.forEach(l=>{let s={};switch(l.type){case"IMAGE":s.type="images",s.source_id=l.file_id,s.upload_url=l.file_url;break;case"VIDEO":s.type="video",s.source_id=l.file_id,s.media_url=l.file_url,s.title=l.title;break;case"LINK":s.type="web_page",s.file_id=l.file_id,s.upload_url=l.file_url,s.url=l.url+l.qw_link_url,s.title=l.qw_link_title,s.description=l.qw_link_desc;break;case"MINIPROGRAM":s.type="we_applets",s.appid=l.qw_miniprogram_appid,s.source_id=l.file_id,s.title=l.qw_miniprogram_title,s.url=l.qw_miniprogram_page,s.upload_url=l.file_url;break;case"FILE":s=l;break;case"TEXT":n=n+l.content;break}JSON.stringify(s)!=="{}"&&t.push(s)}),Promise.resolve({mediaList:t,content:n})},Le=r=>{let t=[];if(r.content){let n={type:"TEXT",content:r.content};t.push(n)}if(console.log("\u5904\u7406\u524D\u6570\u636E",r.annex_content_json),r.annex_content_json&&r.annex_content_json.length){let n=r.annex_content_json;for(let l=0;l<n.length;l++){let s={},g="";switch(n[l].type){case"images":s.type="IMAGE",s.file_id=n[l].source_id,s.sort=l,s.file_url=n[l].upload_url;break;case"web_page":s.type="LINK",s.sort=l,s.file_id=n[l].source_id,s.qw_link_title=n[l].title,s.file_url=n[l].upload_url,s.qw_link_desc=n[l].description,g=n[l].url.split("://"),s.qw_link_url=g[1],s.url=g[0]+"://";break;case"we_applets":s.type="MINIPROGRAM",s.sort=l,s.file_id=n[l].source_id,s.qw_miniprogram_title=n[l].title,s.qw_miniprogram_appid=n[l].appid,s.qw_miniprogram_page=n[l].url,s.file_url=n[l].upload_url;break;case"video":s.sort=l,s.type="VIDEO",s.file_id=n[l].source_id,s.title=n[l].title||"",s.file_url=n[l].media_url;break;case"FILE":s=n[l];break}t.push(s)}}return console.log("\u56DE\u663E\u6570\u636E",t),t},be=async()=>{if(e.value.repeat_space==""&&e.value.repeat_type=="WEEK"&&(e.value.repeat_space="1"),e.value.start_time==""||e.value.end_time==""){m.error("\u4EFB\u52A1\u65F6\u95F4\u672A\u586B\u5199\uFF0C\u8BF7\u586B\u5199\u4EFB\u52A1\u65F6\u95F4");return}let r={};r.start_time=e.value.start_time,r.end_time=e.value.end_time,r.repeat_type=e.value.repeat_type,r.repeat_space=e.value.repeat_space,r.repeat_node=e.value.repeat_node,r.repeat_deadline=e.value.repeat_deadline;let{data:t}=await Y.getTaskRepeatNum(r);ee.value=t.num},S=async()=>{if(console.log("xx\u6807\u7B7E\u6709\u6CA1\u6709\u8FDB\u6765\uFF1F"),e.value.start_type==""){m.warning("\u8BF7\u9009\u62E9\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4");return}if(e.value.start_type=="IMMEDI"&&!e.value.end_time){m.error("\u8BF7\u586B\u5199\u4EFB\u52A1\u65F6\u95F4");return}if(e.value.start_type=="CUSTOM"&&(!e.value.start_time||!e.value.end_time)){m.error("\u8BF7\u586B\u5199\u4EFB\u52A1\u65F6\u95F4");return}if(e.value.name==""||e.value.task_type==""){e.value.all_customer_num=0,e.value.no_touch_num=0,e.value.can_touch_num=0;return}else if(e.value.receive_group==""&&JSON.stringify(b.value)=="[]"&&JSON.stringify(e.value.receive_group[0].select_members)=="{}"){e.value.all_customer_num=0,e.value.no_touch_num=0,e.value.can_touch_num=0;return}else{let r={};f.query.title=="\u8BA1\u5212\u4EFB\u52A1"&&(r.task_property="PLAN"),e.value.task_type==""&&(e.value.task_type="3"),e.value.touch_object=="GROUP"&&(e.value.receive_type="1"),console.log("treeChecked",b.value);let t=[];if(b.value!=""?(b.value.forEach(l=>{t.push(l.tag_id)}),f.query.type=="edit"&&!e.value.receive_group[0]&&e.value.receive_group.push({}),e.value.receive_group[0].tag_ids=t):(console.log("tag_ids",e.value.receive_group[0]),e.value.receive_group[0].tag_ids=t),e.value.receive_type==""){m.error("\u7B5B\u9009\u5BA2\u6237\u672A\u9009\u62E9\uFF0C\u8BF7\u7B5B\u9009\u5BA2\u6237");return}r.start_type=e.value.start_type,r.touch_object=e.value.touch_object,r.task_type=e.value.task_type,r.start_time=e.value.start_time,r.receive_type=e.value.receive_type,r.receive_group=e.value.receive_group;let{data:n}=await Y.getTouchNum(r);e.value.all_customer_num=n.all_customer_num,e.value.no_touch_num=n.no_touch_num,e.value.can_touch_num=n.can_touch_num}};_e(()=>e.value,()=>{e.value.repeat_deadline!=""&&e.value.is_repeat!="0"&&e.value.repeat_space>="1"&&be()},{immediate:!0,deep:!0}),_e(()=>e.value.start_type,()=>{e.value.start_type=="IMMEDI"?(Z.value=!0,e.value.is_repeat="0"):Z.value=!1},{immediate:!0,deep:!0});function se(r){console.log("rrrrr",r),V.writeBackSelectedMemberOrg=r;let t=[];r&&Array.isArray(r)&&r.map(n=>{t.push(n.id)}),R.value&&(R.value.dialogVisible=!1),f.query.type=="edit"&&!e.value.receive_group[0]&&e.value.receive_group.push({}),JSON.stringify(r)!="[]"?e.value.receive_group[0].select_members=t:e.value.receive_group[0].select_members=[],S()}return ke(async()=>{f.query.type=="edit"&&(await He(f.query.id),pe.value=!0,O.value.push(e.value.touch_object)),f.query.type=="add"&&(e.value.content_arr[0]={type:"TEXT",content:""},e.value.receive_group[0]={})}),(r,t)=>{const n=y("el-input"),l=y("el-form-item"),s=y("el-radio"),g=y("el-radio-group"),L=y("el-date-picker"),re=y("el-option"),ne=y("el-select"),E=y("el-checkbox"),Ge=y("el-checkbox-group"),J=y("el-col"),ie=Fe,z=y("el-row"),G=y("el-button"),Ae=y("el-form"),Be=Je,Ye=y("el-dialog");return i(),d("div",null,[a(Be,{class:"page-scroll"},{default:u(()=>[a(Ae,{size:"small","label-position":"top",model:e.value,rules:h(V).rules},{default:u(()=>[p("div",ut,[a(ce,{title:"\u57FA\u7840\u4FE1\u606F"})]),p("div",null,[a(l,{label:"\u4EFB\u52A1\u540D\u79F0",prop:"name"},{default:u(()=>[a(n,{modelValue:e.value.name,"onUpdate:modelValue":t[0]||(t[0]=o=>e.value.name=o),type:"text",placeholder:"\u8BF7\u8F93\u5165",class:"known",maxlength:"10","show-word-limit":""},null,8,["modelValue"])]),_:1}),a(l,{label:"\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4",prop:"start_type"},{default:u(()=>[a(g,{modelValue:e.value.start_type,"onUpdate:modelValue":t[1]||(t[1]=o=>e.value.start_type=o),onChange:t[2]||(t[2]=o=>Te())},{default:u(()=>[a(s,{label:"IMMEDI"},{default:u(()=>[ot]),_:1}),a(s,{label:"CUSTOM"},{default:u(()=>[st]),_:1})]),_:1},8,["modelValue"])]),_:1}),e.value.start_type=="CUSTOM"?(i(),F(l,{key:0,label:"\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4",prop:"start_time"},{default:u(()=>[a(L,{modelValue:e.value.start_time,"onUpdate:modelValue":t[3]||(t[3]=o=>e.value.start_time=o),type:"datetime",format:"MM-DD dddd HH:mm","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"\u8BF7\u9009\u62E9\u4EFB\u52A1\u5F00\u59CB\u6267\u884C\u65F6\u95F4",style:{width:"520px"},"disabled-date":Ue,onChange:t[4]||(t[4]=o=>De())},null,8,["modelValue"])]),_:1})):w("",!0),a(l,{label:"\u622A\u6B62\u6267\u884C\u65F6\u95F4",prop:"end_time"},{default:u(()=>[rt,a(L,{modelValue:e.value.end_time,"onUpdate:modelValue":t[5]||(t[5]=o=>e.value.end_time=o),type:"datetime",format:"MM-DD dddd HH:mm","value-format":"YYYY-MM-DD HH:mm:ss",placeholder:"\u8BF7\u9009\u62E9\u4EFB\u52A1\u622A\u6B62\u6267\u884C\u65F6\u95F4",style:{width:"520px"},"disabled-date":Ee,onChange:t[6]||(t[6]=o=>le())},null,8,["modelValue"])]),_:1}),a(l,{label:"\u91CD\u590D",prop:"is_repeat"},{default:u(()=>[a(g,{modelValue:e.value.is_repeat,"onUpdate:modelValue":t[7]||(t[7]=o=>e.value.is_repeat=o),disabled:U.value||Z.value},{default:u(()=>[a(s,{label:"0"},{default:u(()=>[nt]),_:1}),a(s,{label:"1"},{default:u(()=>[it,h(f).query.type=="add"?(i(),d("span",_t,[e.value.is_repeat=="1"&&ee.value>=0?(i(),d("span",dt,"\u5171\u8BA1\u8BE5\u4EFB\u52A1\u4F1A\u91CD\u590D"+c(ee.value)+"\u6B21\uFF08\u5305\u62EC\u5F53\u524D\u4EFB\u52A1\uFF09",1)):w("",!0)])):(i(),d("span",ct,[e.value.is_repeat=="1"?(i(),d("span",pt,"\u5171\u8BA1\u8BE5\u4EFB\u52A1\u4F1A\u91CD\u590D"+c(e.value.repeat_task_num)+"\u6B21\uFF08\u5305\u62EC\u5F53\u524D\u4EFB\u52A1\uFF09",1)):w("",!0)]))]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1}),e.value.is_repeat=="1"?(i(),d("div",vt,[a(l,{label:"\u9891\u7387",prop:"repeat_type"},{default:u(()=>[a(ne,{modelValue:e.value.repeat_type,"onUpdate:modelValue":t[8]||(t[8]=o=>e.value.repeat_type=o),placeholder:"\u8BF7\u9009\u62E9",class:"selectClass",disabled:U.value,onChange:t[9]||(t[9]=o=>qe(e.value.repeat_type))},{default:u(()=>[(i(!0),d(K,null,W(h(V).options,o=>(i(),F(re,{key:o.value,label:o.label,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),e.value.repeat_type=="DAY"?(i(),d("div",mt,[ft,a(n,{modelValue:e.value.repeat_space,"onUpdate:modelValue":t[10]||(t[10]=o=>e.value.repeat_space=o),placeholder:"\u8BF7\u8F93\u5165",size:"small",disabled:U.value,onChange:t[11]||(t[11]=o=>P("DAY"))},null,8,["modelValue","disabled"]),gt])):w("",!0),e.value.repeat_type=="WEEK"?(i(),d("div",bt,[a(l,{label:"\u6BCF\u5468\u7684"},{default:u(()=>[a(Ge,{modelValue:e.value.repeat_node,"onUpdate:modelValue":t[12]||(t[12]=o=>e.value.repeat_node=o),disabled:U.value,onChange:t[13]||(t[13]=o=>P("WEEK"))},{default:u(()=>[a(E,{label:"1"},{default:u(()=>[ht]),_:1}),a(E,{label:"2"},{default:u(()=>[yt]),_:1}),a(E,{label:"3"},{default:u(()=>[kt]),_:1}),a(E,{label:"4"},{default:u(()=>[Vt]),_:1}),a(E,{label:"5"},{default:u(()=>[wt]),_:1}),a(E,{label:"6"},{default:u(()=>[xt]),_:1}),a(E,{label:"0"},{default:u(()=>[Mt]),_:1})]),_:1},8,["modelValue","disabled"])]),_:1})])):w("",!0),e.value.repeat_type=="MONTH"?(i(),d("div",Ct,[p("div",jt,[Ot,a(ne,{modelValue:e.value.repeat_space,"onUpdate:modelValue":t[14]||(t[14]=o=>e.value.repeat_space=o),placeholder:"\u8BF7\u9009\u62E9",size:"small",disabled:U.value,class:"selectClass",onChange:t[15]||(t[15]=o=>P("MONTH"))},{default:u(()=>[(i(),d(K,null,W(12,o=>a(re,{key:o,value:o,label:o},null,8,["value","label"])),64))]),_:1},8,["modelValue","disabled"]),St]),a(lt,{modelValue:e.value.repeat_node,"onUpdate:modelValue":t[16]||(t[16]=o=>e.value.repeat_node=o),onSelectMonth:Ne},null,8,["modelValue"])])):w("",!0),a(l,{label:"\u91CD\u590D\u81F3",prop:"repeat_deadline",class:"mt12"},{default:u(()=>[a(ne,{modelValue:e.value.repeat_deadline,"onUpdate:modelValue":t[17]||(t[17]=o=>e.value.repeat_deadline=o),placeholder:"\u8BF7\u9009\u62E9",class:"selectClass",disabled:U.value},{default:u(()=>[(i(!0),d(K,null,W(D.value,o=>(i(),F(re,{key:o,label:o.label,value:o.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1})])):w("",!0)]),p("div",Dt,[a(ce,{title:"\u76EE\u6807\u5BF9\u8C61"})]),p("div",null,[a(l,{label:"\u9009\u62E9\u5BF9\u8C61\u7C7B\u578B",prop:"touch_object"},{default:u(()=>[a(g,{modelValue:e.value.touch_object,"onUpdate:modelValue":t[18]||(t[18]=o=>e.value.touch_object=o),onChange:t[19]||(t[19]=o=>je())},{default:u(()=>[a(s,{label:"SINGLE"},{default:u(()=>[Tt]),_:1}),a(s,{label:"GROUP"},{default:u(()=>[Ut]),_:1}),a(s,{label:"MOMENTS"},{default:u(()=>[Et]),_:1})]),_:1},8,["modelValue"])]),_:1}),e.value.touch_object=="SINGLE"?(i(),d("div",It,[a(l,{label:"\u7B5B\u9009\u5BA2\u6237",prop:"receive_type",onChange:S},{default:u(()=>[a(g,{modelValue:e.value.receive_type,"onUpdate:modelValue":t[20]||(t[20]=o=>e.value.receive_type=o)},{default:u(()=>[a(s,{label:"1"},{default:u(()=>[qt]),_:1}),a(s,{label:"0"},{default:u(()=>[Nt]),_:1})]),_:1},8,["modelValue"])]),_:1}),e.value.receive_type=="1"?(i(),F(z,{key:0},{default:u(()=>[a(J,{span:11,class:"mr24"},{default:u(()=>[a(l,{label:"\u6807\u7B7E\u7B5B\u9009",prop:"receive_group",onChange:ae},{default:u(()=>[a(Me,{modelValue:b.value,"onUpdate:modelValue":t[21]||(t[21]=o=>b.value=o),"edit-select-list":k.value,onCloseTag:ae},null,8,["modelValue","edit-select-list"])]),_:1})]),_:1}),a(J,{span:12},{default:u(()=>[a(l,{label:"\u6210\u5458\u7B5B\u9009",prop:"receive_group"},{default:u(()=>[a(ie,{ref_key:"addMemberDialogRef",ref:R,"input-placeholder":"\u8BF7\u9009\u62E9\u4F01\u5FAE\u6210\u5458","is-group":e.value.touch_object=="GROUP","is-multiple-selected":!0,"custom-input-value-fn":h(V).customInputValueFn,"custom-selected-fn":ue,"write-back-selected-member-org":h(V).writeBackSelectedMemberOrg,onConfirm:se},{default:u(o=>[p("span",null,[a(n,{modelValue:o.data,"onUpdate:modelValue":B=>o.data=B,placeholder:"\u8BF7\u9009\u62E9","suffix-icon":"el-icon-caret-bottom",readonly:""},null,8,["modelValue","onUpdate:modelValue"])])]),_:1},8,["is-group","custom-input-value-fn","write-back-selected-member-org"])]),_:1})]),_:1})]),_:1})):w("",!0)])):w("",!0),e.value.touch_object=="GROUP"?(i(),d("div",Rt,[$t,a(l,{label:"\u6210\u5458\u7B5B\u9009",prop:"receive_group"},{default:u(()=>[a(ie,{ref_key:"addMemberDialogRef",ref:R,"input-placeholder":"\u8BF7\u9009\u62E9\u4F01\u5FAE\u6210\u5458","is-group":e.value.touch_object=="GROUP","is-multiple-selected":!0,"custom-input-value-fn":h(V).customInputValueFn,"custom-selected-fn":ue,"write-back-selected-member-org":h(V).writeBackSelectedMemberOrg,onConfirm:se},{default:u(o=>[p("span",null,[a(n,{modelValue:o.data,"onUpdate:modelValue":B=>o.data=B,placeholder:"\u8BF7\u9009\u62E9","suffix-icon":"el-icon-caret-bottom",readonly:""},null,8,["modelValue","onUpdate:modelValue"])])]),_:1},8,["is-group","custom-input-value-fn","write-back-selected-member-org"])]),_:1})])):w("",!0),e.value.touch_object=="MOMENTS"?(i(),d("div",Ht,[a(l,{label:"\u53EF\u89C1\u5BA2\u6237",prop:"receive_type",onChange:S},{default:u(()=>[a(g,{modelValue:e.value.receive_type,"onUpdate:modelValue":t[22]||(t[22]=o=>e.value.receive_type=o)},{default:u(()=>[a(s,{label:"1"},{default:u(()=>[Pt]),_:1}),a(s,{label:"0"},{default:u(()=>[Lt]),_:1})]),_:1},8,["modelValue"])]),_:1}),e.value.receive_type=="1"?(i(),F(z,{key:0},{default:u(()=>[a(J,{class:"mr24",span:11},{default:u(()=>[a(l,{label:"\u6807\u7B7E\u7B5B\u9009",prop:"receive_group",onChange:ae},{default:u(()=>[a(Me,{modelValue:b.value,"onUpdate:modelValue":t[23]||(t[23]=o=>b.value=o),"edit-select-list":k.value},null,8,["modelValue","edit-select-list"])]),_:1})]),_:1}),a(J,{span:12},{default:u(()=>[a(l,{label:"\u6210\u5458\u7B5B\u9009",prop:"receive_group"},{default:u(()=>[a(ie,{ref_key:"addMemberDialogRef",ref:R,"input-placeholder":"\u8BF7\u9009\u62E9\u4F01\u5FAE\u6210\u5458","is-group":e.value.touch_object=="GROUP","is-multiple-selected":!0,"custom-input-value-fn":h(V).customInputValueFn,"custom-selected-fn":ue,"write-back-selected-member-org":h(V).writeBackSelectedMemberOrg,onConfirm:se},{default:u(o=>[p("span",null,[a(n,{modelValue:o.data,"onUpdate:modelValue":B=>o.data=B,placeholder:"\u8BF7\u9009\u62E9","suffix-icon":"el-icon-caret-bottom",readonly:""},null,8,["modelValue","onUpdate:modelValue"])])]),_:1},8,["is-group","custom-input-value-fn","write-back-selected-member-org"])]),_:1})]),_:1})]),_:1})):w("",!0)])):w("",!0)]),p("div",Gt,[a(ce,{title:"\u89E6\u8FBE\u52A8\u4F5C"})]),e.value.touch_object!="MOMENTS"?(i(),d("div",At,[a(l,{label:"\u89E6\u8FBE\u65B9\u5F0F",prop:"task_type",onChange:S},{default:u(()=>[a(g,{modelValue:e.value.task_type,"onUpdate:modelValue":t[24]||(t[24]=o=>e.value.task_type=o)},{default:u(()=>[a(s,{label:"3"},{default:u(()=>[Bt]),_:1}),a(s,{label:"1"},{default:u(()=>[Yt]),_:1})]),_:1},8,["modelValue"]),h(f).query.type=="add"?(i(),d("div",Ft,[e.value.touch_object!="GROUP"?(i(),d("span",Jt,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u6570\uFF1A"+c(e.value.can_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u6570\uFF1A"+c(e.value.all_customer_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1)):(i(),d("span",zt,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u7FA4\u6570\uFF1A"+c(e.value.can_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u7FA4\u6570\uFF1A"+c(e.value.all_customer_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1))])):(i(),d("div",Kt,[e.value.can_touch_num>=0?(i(),d("div",Wt,[e.value.touch_object!="GROUP"?(i(),d("span",Xt,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u6570\uFF1A"+c(e.value.can_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u6570\uFF1A"+c(e.value.all_customer_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1)):(i(),d("span",Qt,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u7FA4\u6570\uFF1A"+c(e.value.can_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u7FA4\u6570\uFF1A"+c(e.value.all_customer_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1))])):(i(),d("div",Zt,[e.value.touch_object!="GROUP"?(i(),d("span",ea,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u6570\uFF1A"+c(e.value.select_receiver_num-e.value.no_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u6570\uFF1A"+c(e.value.select_receiver_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1)):(i(),d("span",ta,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u7FA4\u6570\uFF1A"+c(e.value.select_receiver_num-e.value.no_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u7FA4\u6570\uFF1A"+c(e.value.select_receiver_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1))]))]))]),_:1}),a(z,null,{default:u(()=>[p("div",aa,[a(l,{required:""},{default:u(()=>[p("label",la,[ua,oa,p("span",sa," \u53EF\u6DFB\u52A0\u7D20\u6750\u6570\u91CF "+c(e.value.content_arr.length)+"/10 ",1)]),a(Xe,{modelValue:e.value.content_arr,"onUpdate:modelValue":t[25]||(t[25]=o=>e.value.content_arr=o),"text-limit":800},null,8,["modelValue"])]),_:1})])]),_:1}),p("div",ra,[a(G,{onClick:me},{default:u(()=>[na]),_:1}),a(G,{type:"primary",loading:H.value,onClick:t[26]||(t[26]=o=>h(fe)())},{default:u(()=>[ia]),_:1},8,["loading"])])])):(i(),d("div",_a,[a(l,{label:"\u89E6\u8FBE\u65B9\u5F0F",prop:"task_type"},{default:u(()=>[a(g,{modelValue:e.value.task_type,"onUpdate:modelValue":t[27]||(t[27]=o=>e.value.task_type=o),onChange:Se},{default:u(()=>[a(s,{label:"4"},{default:u(()=>[da]),_:1}),a(s,{label:"5"},{default:u(()=>[ca]),_:1})]),_:1},8,["modelValue"]),h(f).query.type=="add"?(i(),d("div",pa,[p("span",null,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u6570\uFF1A"+c(e.value.can_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u6570\uFF1A"+c(e.value.all_customer_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1)])):(i(),d("div",va,[e.value.can_touch_num>=0?(i(),d("div",ma,[p("span",null,"\u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u6570\uFF1A"+c(e.value.can_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u6570\uFF1A"+c(e.value.all_customer_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1)])):(i(),d("div",fa," \u9884\u4F30\u89E6\u8FBE\u5BA2\u6237\u6570\uFF1A"+c(e.value.select_receiver_num-e.value.no_touch_num)+"\uFF0C\u7B5B\u9009\u5BA2\u6237\u6570\uFF1A"+c(e.value.select_receiver_num)+"\uFF0C\u4E0D\u53EF\u89E6\u8FBE\u6570\uFF1A"+c(e.value.no_touch_num),1))]))]),_:1}),a(z,null,{default:u(()=>[p("div",ga,[a(l,{required:""},{default:u(()=>[p("label",ba,[ha,ya,p("span",ka," \u53EF\u6DFB\u52A0\u7D20\u6750\u6570\u91CF "+c(e.value.content_arr.length)+"/10 ",1)]),a(Qe,{modelValue:e.value.content_arr,"onUpdate:modelValue":t[28]||(t[28]=o=>e.value.content_arr=o),"text-limit":800,"task-type":e.value.task_type},null,8,["modelValue","task-type"])]),_:1})])]),_:1}),p("div",Va,[a(G,{onClick:me},{default:u(()=>[wa]),_:1}),a(G,{type:"primary",loading:H.value,onClick:t[29]||(t[29]=o=>h(fe)())},{default:u(()=>[xa]),_:1},8,["loading"])])]))]),_:1},8,["model","rules"])]),_:1}),a(xe,{title:"\u63D0\u793A","dialog-button":T.value,"dialog-visible":$.value&&!C.value,width:"400px","confirm-fn":()=>Re(),onCancel:$e},{default:u(()=>[Ma]),_:1},8,["dialog-button","dialog-visible","confirm-fn"]),a(xe,{title:"\u63D0\u793A","dialog-edit-text":Q.value,"dialog-visible":$.value&&C.value,width:"400px","confirm-fn":()=>h(oe)("2"),"confirm-fn-type":()=>h(oe)("1")},{default:u(()=>[Ca]),_:1},8,["dialog-edit-text","dialog-visible","confirm-fn","confirm-fn-type"]),a(Ye,{modelValue:A.value,"onUpdate:modelValue":t[30]||(t[30]=o=>A.value=o),title:"\u6E29\u99A8\u63D0\u793A",width:"400px","before-close":ve},{footer:u(()=>[p("span",Oa,[a(G,{size:"small",onClick:ve},{default:u(()=>[Sa]),_:1}),a(G,{type:"primary",size:"small",onClick:Oe},{default:u(()=>[Da]),_:1})])]),default:u(()=>[ja]),_:1},8,["modelValue"])])}}};var Qa=Ce(Ta,[["__scopeId","data-v-7a5f9694"]]);export{Qa as default};
