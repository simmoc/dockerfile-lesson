
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as U}from"./select-member.d05cd3eb.js";import{_ as $}from"./index.fece4a24.js";import{_ as B}from"./index.333b158c.js";import{_ as E}from"./index.6ba23372.js";import{_ as R}from"./index.f1e12eef.js";import{H as T}from"./index.94e839d6.js";import{P as L,Q as Y,M as A,r as i,a as H,q as I,t as u,y as r,z as l,L as m,H as f,A as q,E as F}from"./vendor.d2559d84.js";import{_ as G}from"./plugin-vue_export-helper.21dcd24c.js";import"./tick@2x.1e6bc440.js";import"./vuedraggable.umd.56963d08.js";import"./sortable.esm.81321d43.js";import"./contant.2e72a177.js";import"./error.32433a76.js";const P={class:"search-form"},Q={class:"pagoda-button-group"},J=f("\u91CD\u7F6E"),K=f("\u67E5\u8BE2"),O={class:"flex flex-align-center color-primary"},W={setup(X){const b=L(),e=Y({formData:{page:1,page_size:10,search_department_id_arr:[],search_member_id_arr:[]},tableData:[],totalDataNum:0,isTableLoading:!1,tableTitle:[{label:"\u5BA2\u6237\u7FA4\u540D",prop:"group_name",type:"slot"},{label:"\u7FA4\u4EBA\u6570",prop:"group_member_num"},{label:"\u7FA4\u4E3B",prop:"group_leader",type:"slot"},{label:"\u521B\u5EFA\u65F6\u95F4",prop:"add_time"}]}),p=A(null);function D(o){return h(o,3)||""}function h(o,a){return`${o.slice(0,a).map(n=>n.member_name||n.department_name).join("\uFF0C")}${o.length>a?"...":""}`}function v(o,a){const n=200;return a>=n?(F({message:`\u6700\u591A\u652F\u6301\u5BA2\u6237\u4EBA\u6570${n}\u4EBA`,type:"error"}),!1):!0}function x(){p.value&&(p.value.dialogVisible=!1),e.formData.page=1,e.formData.page_size=10,_()}function _(){const o=e.formData;T.getGroupChatList(o).then(a=>{e.tableData=a.data.list||[],e.totalDataNum=a.data.total_num||0}).catch(()=>{})}function y(){p.value.resetSelect(),e.formData={page:1,page_size:10},_()}_();function V(o){b.push({name:"customerBaseDetail",query:{chatId:o}})}function j(o=[]){e.formData.start_time=o[0],e.formData.end_time=o[1]}function k(o){const a=[],n=[];for(let s=0;s<o.length;s++){const d=o[s];d.type=="MEMBER"?n.push(d.id):a.push(d.id)}e.formData.search_department_id_arr=a,e.formData.search_member_id_arr=n}return(o,a)=>{const n=i("el-input"),s=i("el-form-item"),d=U,C=i("el-date-picker"),c=i("el-button"),M=i("el-form"),z=$,w=B,N=E,S=R;return H(),I("div",null,[u("div",P,[r(M,{inline:"",size:"small"},{default:l(()=>[r(s,{label:"\u7FA4\u540D",prop:"keyword"},{default:l(()=>[r(n,{modelValue:m(e).formData.keyword,"onUpdate:modelValue":a[0]||(a[0]=t=>m(e).formData.keyword=t),placeholder:"\u8BF7\u8F93\u5165\u7FA4\u540D"},null,8,["modelValue"])]),_:1}),r(s,{label:"\u7FA4\u4E3B\u9009\u62E9",prop:"members"},{default:l(()=>[r(d,{ref_key:"addMemberDialogRef",ref:p,"input-placeholder":"\u8BF7\u9009\u62E9\u4F01\u5FAE\u6210\u5458","is-group":!0,"is-multiple-selected":!0,"custom-input-value-fn":D,"custom-selected-fn":v,style:{width:"200px"},onConfirm:k},{default:l(t=>[u("span",null,[r(n,{modelValue:t.data,"onUpdate:modelValue":g=>t.data=g,placeholder:"\u8BF7\u9009\u62E9","suffix-icon":"el-icon-caret-bottom",readonly:""},null,8,["modelValue","onUpdate:modelValue"])])]),_:1},512)]),_:1}),r(s,{label:"\u521B\u5EFA\u65F6\u95F4",prop:"addDate"},{default:l(()=>[r(C,{modelValue:m(e).formData.addDate,"onUpdate:modelValue":a[1]||(a[1]=t=>m(e).formData.addDate=t),type:"daterange","range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65F6\u95F4","end-placeholder":"\u7ED3\u675F\u65F6\u95F4","value-format":"YYYY-MM-DD",onChange:j},null,8,["modelValue"])]),_:1}),u("div",Q,[r(c,{onClick:y},{default:l(()=>[J]),_:1}),r(c,{type:"primary",onClick:x},{default:l(()=>[K]),_:1})])]),_:1})]),r(S,null,{default:l(()=>[r(w,{"table-title":m(e).tableTitle,"table-data":m(e).tableData},{group_name:l(t=>[r(c,{type:"text",onClick:g=>V(t.data.chat_id)},{default:l(()=>[f(q(t.data.group_name),1)]),_:2},1032,["onClick"])]),group_leader:l(t=>[u("div",O,[r(z,{class:"table-member-card","member-id":t.data.member_id,avatar:t.data.group_leader_avatar,name:t.data.group_leader,"department-name":t.data.group_leader_department},null,8,["member-id","avatar","name","department-name"])])]),_:1},8,["table-title","table-data"]),r(N,{page:m(e).formData.page,"onUpdate:page":a[2]||(a[2]=t=>m(e).formData.page=t),limit:m(e).formData.page_size,"onUpdate:limit":a[3]||(a[3]=t=>m(e).formData.page_size=t),total:m(e).totalDataNum,"get-data":_},null,8,["page","limit","total"])]),_:1})])}}};var _e=G(W,[["__scopeId","data-v-33751120"]]);export{_e as default};
