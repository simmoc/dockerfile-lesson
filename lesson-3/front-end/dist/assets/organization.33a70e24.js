
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
var ze=Object.defineProperty;var W=Object.getOwnPropertySymbols;var $e=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable;var O=(c,u,d)=>u in c?ze(c,u,{enumerable:!0,configurable:!0,writable:!0,value:d}):c[u]=d,Q=(c,u)=>{for(var d in u||(u={}))$e.call(u,d)&&O(c,d,u[d]);if(W)for(var d of W(u))De.call(u,d)&&O(c,d,u[d]);return c};import{_ as Se}from"./index.333b158c.js";import{_ as Ue}from"./index.6ba23372.js";import{_ as Ie}from"./index.5931791c.js";import{_ as Te}from"./index.f1e12eef.js";import{U as Me,M as i,o as X,W as Re,r as g,a as w,q as k,t as s,y as a,z as n,a6 as je,B as H,R as Z,S as ee,c as le,L as te,J as T,A as C,D as ae,H as M,F as Ee,G as Ae,E as K}from"./vendor.d2559d84.js";import{H as b,b as oe}from"./index.94e839d6.js";import{_ as Be}from"./plugin-vue_export-helper.21dcd24c.js";const se=c=>(Ee("data-v-783e09cc"),c=c(),Ae(),c),Ne={class:"search-form"},He={class:"search-form-margin"},Ke=M("\u91CD\u7F6E"),Le=M("\u67E5\u8BE2"),Pe={class:"flex"},Ye={class:"table-search-box"},Fe={class:"flex-1"},Ge={class:"table-top-area"},Je=M(),We=se(()=>s("span",{class:"fs14 vtm"},"\u540C\u6B65\u4F01\u4E1A\u5FAE\u4FE1",-1)),Oe={class:"table-top-tip"},Qe={class:""},Xe={class:"mr8"},Ze=se(()=>s("span",null,"...",-1)),el={key:1},ll={key:2},tl={class:"flex flex-align-center"},al=["src"],ol={class:"pt24 pl24 pr24 pb16"},sl=["onClick"],nl={class:"is-checked"},rl={key:0,class:"el-icon-check"},il=M(" \u5206\u914D\u89D2\u8272 "),dl={setup(c){const{proxy:u}=Me(),d=i(!1),R=i(!1),r=i({role_id:"",qw_name:"",qw_email:"",qw_phone:"",qw_status:"",qw_department_id:"",time:[],page:1,page_size:10}),v=i({name:"",page:1,page_size:10}),ne=i([{label:"\u6210\u5458\u59D3\u540D",prop:"qw_name",width:100,type:"slot"},{label:"\u6210\u5458\u90AE\u7BB1",prop:"qw_email",width:170},{label:"\u624B\u673A\u53F7",prop:"qw_phone",width:100},{label:"\u90E8\u95E8",prop:"department",width:220},{label:"\u89D2\u8272",prop:"roles",width:200,type:"slot"},{label:"\u72B6\u6001",prop:"status",width:80},{label:"\u52A0\u5165\u4F01\u4E1A\u65F6\u95F4",prop:"create_time",width:150}]),L=i([]),q=i([]),z=i(""),re=i({children:"children",label:"qw_department_name"}),P=i(0),x=i([]),Y=i([]),F=i(""),G=i(0);let y=i(null);const j=i("");X(()=>{B(),y.value?clearInterval(y.value):y.value=setInterval(()=>{B()},1e3)}),Re(()=>{y.value&&clearInterval(y.value)});const ie=(t,{node:e,data:o})=>t("span",{class:"custom-tree-node"},t("span",null,e.label),t("span",null,R.value||z.value?t("span",{class:"custom-tree-node-num"},o.member_count):null)),de=()=>{r.value={role_id:"",qw_name:"",qw_email:"",qw_phone:"",qw_status:"",qw_department_id:"",time:[],page:1,page_size:10},z.value="",j.value="",h()},S=i(!0),h=async t=>{await E(),await V(t)},ue=t=>{r.value.qw_department_id=t.qw_department_id,V()},pe=()=>{d.value=!1},ce=()=>{},J=()=>{let{page:t,page_size:e,qw_name:o,qw_email:_,qw_phone:p,qw_status:$,time:f,qw_department_id:D,role_id:U}=r.value,N=f&&f.length>0?f[0]:"",I=f&&f.length>0?f[1]:"";return R.value=o||_||p||$||f&&f.length>0||U,{page:t,page_size:e,qw_name:o,qw_email:_,qw_phone:p,qw_status:$,start_time:N,letend_time:I,qw_department_id:D,role_id:U}},V=async t=>{let e=J();t&&q.value[0]&&(e.qw_department_id=q.value[0].qw_department_id),console.log("getSystemMembers",e);let{data:o}=await b.systemMembers(e);L.value=o.list,P.value=o.count},E=async()=>{let t=J(),{data:e}=await b.systemDepartments(Q({qw_department_name:z.value},t));q.value=e,je(()=>{console.log(u.$refs.elTree),q.value[0]&&u.$refs.elTree.setCurrentKey(q.value[0].id)})},_e=oe(()=>E());(async()=>{let{data:t}=await b.systemRoles({page:1,page_size:200});t.list.forEach(e=>{Y.value.push({label:e.name,id:e.id,checked:!1})})})();const A=async t=>{let{data:e}=await b.systemRoles({page:v.value.page,page_size:v.value.page_size,name:v.value.name});if(G.value=e.count,v.value.page===1&&(x.value=[]),e.list.forEach(o=>{x.value.push({label:o.name,id:o.id,checked:!1})}),t){let o=t&&t.split(",");o&&o.forEach(_=>{x.value.forEach(p=>{_===p.label&&(p.checked=!0)})})}},me=oe(()=>(v.value.page=1,x.value=[],A())),ve=t=>{let e=t.target.scrollHeight,o=t.target.scrollTop;x.value.length!==G.value&&(console.log(o),e>=o+150&&(v.value.page++,A(j.value)))},fe=(t,e)=>{let o={member_ids:[e],role_id:t.id};t.checked?we(o).then(()=>{t.checked=!t.checked}):ge(o).then(()=>{t.checked=!t.checked})},ge=async t=>new Promise(e=>{b.roleAllocate(t).then(o=>{o.code===0&&(K.success(o.data),V(),e())})}),we=async t=>new Promise(e=>{b.roleDrop(t).then(o=>{o.code===0&&(K.success(o.data),V(),e())})}),B=async()=>{S.value||clearInterval(y.value);let{data:t}=await b.getSyncTime({type:"department"});F.value=t.time,S.value=t.status},he=async t=>{let e=await b[t]().finally(()=>{});e.code===0&&(K.success(e.data),y.value=setInterval(()=>{B()},1e3))},be=t=>{v.value.name="",v.value.page=1,j.value=t.roles,A(t.roles)};return X(async()=>{await E(),await V()}),(t,e)=>{const o=g("el-input"),_=g("el-form-item"),p=g("el-option"),$=g("el-select"),f=g("el-date-picker"),D=g("el-button"),U=g("el-form"),N=g("el-tree"),I=g("el-popover"),ye=g("el-table-column"),ke=Se,qe=Ue,xe=Ie,Ve=Te;return w(),k("div",null,[s("div",Ne,[s("div",He,[a(U,{inline:!0,model:r.value,"label-position":"right","label-width":"120px",size:"small"},{default:n(()=>[a(_,{label:"\u6210\u5458\u59D3\u540D\uFF1A",onKeyup:e[1]||(e[1]=H(l=>h(!0),["enter"]))},{default:n(()=>[a(o,{modelValue:r.value.qw_name,"onUpdate:modelValue":e[0]||(e[0]=l=>r.value.qw_name=l),placeholder:"\u8BF7\u8F93\u5165\u6210\u5458\u59D3\u540D",style:{width:"274px"}},null,8,["modelValue"])]),_:1}),a(_,{label:"\u6210\u5458\u90AE\u7BB1\uFF1A",onKeyup:e[3]||(e[3]=H(l=>h(!0),["enter"]))},{default:n(()=>[a(o,{modelValue:r.value.qw_email,"onUpdate:modelValue":e[2]||(e[2]=l=>r.value.qw_email=l),placeholder:"\u8BF7\u8F93\u5165\u6210\u5458\u90AE\u7BB1",style:{width:"274px"}},null,8,["modelValue"])]),_:1}),a(_,{label:"\u6210\u5458\u624B\u673A\u53F7\uFF1A",onKeyup:e[5]||(e[5]=H(l=>h(!0),["enter"]))},{default:n(()=>[a(o,{modelValue:r.value.qw_phone,"onUpdate:modelValue":e[4]||(e[4]=l=>r.value.qw_phone=l),placeholder:"\u8BF7\u8F93\u5165\u6210\u5458\u624B\u673A\u53F7",style:{width:"274px"}},null,8,["modelValue"])]),_:1}),a(_,{label:"\u89D2\u8272\uFF1A"},{default:n(()=>[a($,{modelValue:r.value.role_id,"onUpdate:modelValue":e[6]||(e[6]=l=>r.value.role_id=l),placeholder:"\u8BF7\u9009\u62E9",style:{width:"274px"},onChange:e[7]||(e[7]=l=>h(!0))},{default:n(()=>[a(p,{label:"\u5168\u90E8",value:""}),(w(!0),k(Z,null,ee(Y.value,l=>(w(),le(p,{key:l.id,label:l.label,value:l.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(_,{label:"\u72B6\u6001\uFF1A"},{default:n(()=>[a($,{modelValue:r.value.qw_status,"onUpdate:modelValue":e[8]||(e[8]=l=>r.value.qw_status=l),placeholder:"\u8BF7\u9009\u62E9",style:{width:"274px"},onChange:e[9]||(e[9]=l=>h(!0))},{default:n(()=>[a(p,{label:"\u5168\u90E8",value:""}),a(p,{label:"\u5DF2\u6FC0\u6D3B",value:"1"}),a(p,{label:"\u5DF2\u7981\u7528",value:"2"}),a(p,{label:"\u672A\u6FC0\u6D3B",value:"4"}),a(p,{label:"\u9000\u51FA\u4F01\u4E1A",value:"5"})]),_:1},8,["modelValue"])]),_:1}),a(_,{label:"\u52A0\u5165\u4F01\u4E1A\u65F6\u95F4\uFF1A"},{default:n(()=>[a(f,{modelValue:r.value.time,"onUpdate:modelValue":e[10]||(e[10]=l=>r.value.time=l),type:"daterange","range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65F6\u95F4","end-placeholder":"\u7ED3\u675F\u65F6\u95F4","value-format":"YYYY-MM-DD","prefix-icon":"el-icon-time",onChange:e[11]||(e[11]=l=>h(!0))},null,8,["modelValue"])]),_:1}),a(_,null,{default:n(()=>[a(D,{type:"default",onClick:de},{default:n(()=>[Ke]),_:1}),a(D,{type:"primary",onClick:e[12]||(e[12]=l=>h(!0))},{default:n(()=>[Le]),_:1})]),_:1})]),_:1},8,["model"])])]),a(Ve,{class:"flex flex-direction-column"},{default:n(()=>[s("div",Pe,[s("div",Ye,[a(o,{modelValue:z.value,"onUpdate:modelValue":e[13]||(e[13]=l=>z.value=l),"prefix-icon":"el-icon-search",placeholder:"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0",size:"small",class:"table-search-input",onInput:e[14]||(e[14]=l=>te(_e)(l))},null,8,["modelValue"]),a(N,{ref:"elTree",data:q.value,props:re.value,"render-content":R.value?ie:null,"default-expand-all":!0,class:"organization-tree","expand-on-click-node":!1,"node-key":"id",onNodeClick:ue},null,8,["data","props","render-content"])]),s("div",Fe,[s("div",Ge,[s("div",null,[s("div",{class:T(["sync-btn",{"sync-disabled":S.value}]),onClick:e[15]||(e[15]=l=>he("syncDepartment"))},[s("i",{class:T(["icon el-icon-refresh",{"is-loading":S.value}])},null,2),Je,We],2),s("span",Oe,"\u6700\u8FD1\u4E00\u6B21\u540C\u6B65\u65F6\u95F4 "+C(F.value),1)])]),a(ke,{"table-title":ne.value,"table-data":L.value,"need-pagination":!0,class:T(["customer-tree",{"is-collapse":t.$store.state.settings.mode==="pc"&&t.$store.state.settings.sidebarCollapse}])},{roles:n(l=>[l.data.roles&&l.data.roles.length>10?(w(),le(I,{key:0,placement:"bottom",trigger:"hover","popper-class":"key-word-pop",height:"325",width:"542"},{reference:n(()=>[s("div",null,[s("span",Xe,C(l.data.roles&&l.data.roles.substring(0,10)),1),Ze])]),default:n(()=>[s("div",Qe,C(l.data.roles),1)]),_:2},1024)):ae("",!0),l.data.roles&&l.data.roles.length<=10?(w(),k("div",el,C(l.data.roles),1)):(w(),k("div",ll,"-"))]),qw_name:n(l=>[s("div",tl,[s("img",{src:l.data.qw_thumb_avatar,alt:"",class:"member-avatar"},null,8,al),s("span",null,C(l.data.qw_name),1)])]),default:n(()=>[a(ye,{label:"\u64CD\u4F5C",width:"150px",fixed:"right"},{default:n(l=>[s("div",null,[a(I,{"popper-class":"crud-classify-tree-operate-popover oranization-popover",placement:"top-start",width:300,trigger:"click",onShow:m=>be(l.row)},{reference:n(()=>[a(D,{type:"text"},{default:n(()=>[il]),_:1})]),default:n(()=>[s("div",null,[s("div",ol,[a(o,{modelValue:v.value.name,"onUpdate:modelValue":e[16]||(e[16]=m=>v.value.name=m),placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0",size:"small","prefix-icon":"el-icon-search",onInput:e[17]||(e[17]=m=>te(me)(m))},null,8,["modelValue"])]),s("div",{class:"distribution-role-list",onScroll:e[18]||(e[18]=m=>ve(m))},[(w(!0),k(Z,null,ee(x.value,(m,Ce)=>(w(),k("div",{key:Ce,class:T({"pop-checked":m.checked}),onClick:pl=>fe(m,l.row.qw_userid)},[s("span",nl,C(m.label),1),m.checked?(w(),k("i",rl)):ae("",!0)],10,sl))),128))],32)])]),_:2},1032,["onShow"])])]),_:1})]),_:1},8,["table-title","table-data","class"]),a(qe,{page:r.value.page,"onUpdate:page":e[19]||(e[19]=l=>r.value.page=l),limit:r.value.page_size,"onUpdate:limit":e[20]||(e[20]=l=>r.value.page_size=l),total:P.value,"get-data":V},null,8,["page","limit","total"])])]),a(xe,{ref:"dialog",dialogVisible:d.value,"onUpdate:dialogVisible":e[21]||(e[21]=l=>d.value=l),confirm:ce,onCancel:pe},null,8,["dialogVisible"])]),_:1})])}}};var bl=Be(dl,[["__scopeId","data-v-783e09cc"]]);export{bl as default};