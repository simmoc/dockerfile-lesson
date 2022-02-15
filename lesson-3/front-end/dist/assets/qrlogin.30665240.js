
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
var Z=Object.defineProperty;var T=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var R=(o,s,t)=>s in o?Z(o,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[s]=t,U=(o,s)=>{for(var t in s||(s={}))$.call(s,t)&&R(o,t,s[t]);if(T)for(var t of T(s))ee.call(s,t)&&R(o,t,s[t]);return o};import{M as l,O as te,P as ae,Q as se,o as ie,w as oe,r as C,a as u,q as m,t as a,A as B,L as le,y as x,z as I,D as L,R as ce,S as ne,c as de,F as re,G as ue,H as _,T as ve,E as P}from"./vendor.d2559d84.js";import{s as v,r as fe,H as c,a as E}from"./index.94e839d6.js";import{_ as pe}from"./plugin-vue_export-helper.21dcd24c.js";var me="./assets/login-logo.976ae825.png",_e="./assets/login-icon01.ed55e45e.png",ge="./assets/login-icon02.28ce0631.png",he="./assets/login-icon03.1717c5b1.png",we="./assets/login-icon04.f9127c5a.png";const g=o=>(re("data-v-0f8ce5f8"),o=o(),ue(),o),ye={class:"qr-login"},be={key:0,class:"setting"},xe={class:"setting-admin"},qe={class:"fs36 mb40 title-color"},ke=g(()=>a("div",{class:"fs24 mb40 text-color"}," \u786E\u8BA4\u540E\uFF0C\u5F53\u524D\u4F01\u4E1A\u5FAE\u4FE1\u8D26\u53F7\u5C06\u6210\u4E3A\u8D85\u7EA7\u7BA1\u7406\u5458 ",-1)),Ce={class:""},Ie=_("\u53D6\u6D88"),Le=_("\u786E\u5B9A"),Se={key:1,class:"setting"},Ve={class:"setting-admin"},Ae=g(()=>a("div",{class:"fs36 mb40 title-color"}," \u8BBE\u7F6E\u5BA2\u6237\u79F0\u547C ",-1)),je=g(()=>a("div",{class:"fs24 mb40 text-color"}," \u9700\u8981\u60A8\u586B\u5199\u5BA2\u6237\u79F0\u547C\u7528\u4E8E\u914D\u7F6E\u540E\u53F0\u6216\u4F01\u5FAE\u5BFC\u8D2D\u7AEF\u7684 \u5BA2\u6237\u76F8\u5173\u9875\u9762\u914D\u7F6E\uFF0C\u6BD4\u5982\u7269\u4E1A\u79F0\u5BA2\u6237\u4E3A\u201C\u4E1A\u4E3B\u201D\uFF0C \u4E2D\u4ECB\u79F0\u79DF\u6237\u4E3A\u201C\u79DF\u5BA2\u201D ",-1)),De=_("\u5F00\u59CB\u521D\u59CB\u5316"),Ue={key:2,class:"login-form"},ze={class:"flex"},Me=ve('<div class="login-bg-left" data-v-0f8ce5f8><img src="'+me+'" alt="" class="logo-img" data-v-0f8ce5f8><div class="login-title" data-v-0f8ce5f8> \u6B22\u8FCE\u767B\u5F55\uFF0C\u5FAE\u5BA2SCRM </div><div class="fs14 fw300" data-v-0f8ce5f8> \u57FA\u4E8E\u4F01\u4E1A\u5FAE\u4FE1\u7684\u79C1\u57DF\u6D41\u91CF\u8FD0\u8425\u5E73\u53F0 </div><div class="login-content-list" data-v-0f8ce5f8><div class="login-content" data-v-0f8ce5f8><img src="'+_e+'" alt="" width="50" height="50" data-v-0f8ce5f8><div data-v-0f8ce5f8><p class="fs18 fwb mb8" data-v-0f8ce5f8>\u5168\u6E20\u9053\u83B7\u5BA2</p><p class="fs14 fw400 c9" data-v-0f8ce5f8>\u591A\u4E1A\u52A1\u573A\u666F\u5F15\u6D41\u83B7\u5BA2</p></div></div><div class="login-content" data-v-0f8ce5f8><img src="'+ge+'" alt="" width="50" height="50" data-v-0f8ce5f8><div data-v-0f8ce5f8><p class="fs18 fwb mb8" data-v-0f8ce5f8>\u5BA2\u6237\u6807\u7B7E</p><p class="fs14 fw400 c9" data-v-0f8ce5f8>\u6D1E\u5BDF\u5BA2\u6237\u771F\u5B9E\u8BC9\u6C42</p></div></div><div class="login-content" data-v-0f8ce5f8><img src="'+he+'" alt="" width="50" height="50" data-v-0f8ce5f8><div data-v-0f8ce5f8><p class="fs18 fwb mb8" data-v-0f8ce5f8>\u8FD0\u8425\u8F6C\u5316</p><p class="fs14 fw400 c9" data-v-0f8ce5f8>\u63D0\u5347\u5BA2\u6237\u8FD0\u8425\u6548\u7387</p></div></div><div class="login-content" data-v-0f8ce5f8><img src="'+we+'" alt="" width="50" height="50" data-v-0f8ce5f8><div data-v-0f8ce5f8><p class="fs18 fwb mb8" data-v-0f8ce5f8>\u5206\u6790\u6D1E\u5BDF</p><p class="fs14 fw400 c9" data-v-0f8ce5f8>\u4EE5\u6570\u636E\u9A71\u52A8\u8FD0\u8425</p></div></div></div></div>',1),Ne={class:"qr-content"},Te={key:0,class:"compony-box flex flex-align-center mb12"},Re=g(()=>a("div",{class:"c55flex-g0 flex-s0"},"\u9009\u62E9\u4F01\u4E1A\uFF1A",-1)),Be={class:"fs18 fwb c0"},Pe=g(()=>a("div",{class:"qr-code"},[a("div",{id:"wx_reg"})],-1)),Ee=g(()=>a("div",{class:"fs14 text-color fw300"},[a("div",null,[_(" \u6253\u5F00"),a("span",{class:"color-primary"},"\u4F01\u4E1A\u5FAE\u4FE1"),_("\u626B\u63CF\u4E8C\u7EF4\u7801 ")]),_(" \u70B9\u51FB\u300E\u9996\u9875\u300F-\u300E\u6DFB\u52A0\u300F-\u300E\u626B\u4E00\u626B\u300F ")],-1)),He={setup(o){const s=l(!0),t=l({}),z=te(),d=ae(),h=l(!1),q=l(!1);let n=se({});const S=l(""),w=l({}),M=l(""),r=l(1),k=l({}),V=l(0),f=l([]),p=l({});ie(()=>{v.commit("user/removeMenus"),fe("token")});const H=async()=>{try{const{data:e}=await c.getloginComponys();f.value=e.list||[],V.value=0,k.value=f.value[0]}finally{A()}},F=e=>{k.value=f.value[e-0],d.push({query:{}}),A()},A=async()=>{if(k.value.agentid)t.value=k.value;else{let{data:i}=await c.getLoginParam();t.value=i}p.value.appid=t.value.appid,p.value.agentid=t.value.agentid,p.value.type=t.value.type;let e=window.location.origin;new window.WwLogin({id:"wx_reg",appid:t.value.appid,agentid:t.value.agentid,redirect_uri:encodeURIComponent(e+"/#/qrLogin?connect_redirect=1"),state:t.value.state,href:e+"/qrload.css",lang:"zh"})},G=async()=>{let{data:e}=await c.initializeAdmin();s.value=e.admin};(async()=>{let{data:e}=await c.accomplishInit();w.value=e})();const O=async e=>{let i=await c.qrLogin(e,[],!0),{data:y}=await c.initializeAdmin(),j=await c.accomplishInit();w.value=j.data,s.value=y.admin,i.code===0?s.value?w.value.accomplish_init_subject?w.value.accomplish_init?(v.commit("user/setUserData",U(U({},i.data),w.value)),v.dispatch("user/getMenus").then(D=>{D.length===0?(P.error("\u6682\u65E0\u9875\u9762\u6743\u9650\uFF0C\u8BF7\u7BA1\u7406\u5458\u914D\u7F6E\u6743\u9650"),d.push({query:{}}),r.value=1):(P.success("\u767B\u5F55\u6210\u529F"),v.dispatch("user/getSubjectName").then(()=>{d.push({path:z.query.redirect||"/"})}))})):(n=i.data,v.commit("user/setUserData",n),d.push({path:"/init"})):(q.value=!0,n=i.data,v.commit("user/setUserData",n)):(h.value=!0,n=i.data,Q(),v.commit("user/setUserData",n)):(d.push({query:{}}),r.value=1)},Q=async()=>{let{data:e}=await c.getAdminToken();M.value=e},W=(e,i)=>{d.push({name:e,query:i})},J=()=>{r.value=1,h.value=!1,d.push({name:"qrLogin"}),A()},K=async()=>{(await c.setAdmin({qw_userid:n.qw_userid,admin_token:M.value},[],!0)).code===0&&(q.value=!0,h.value=!1)},X=async()=>{(await c.addSubject({subject:S.value},[],!0)).code===0&&W("init")};return oe(z,e=>{console.log("before",r.value),e.query.code&&e.query.state&&r.value==1&&(p.value.code=e.query.code,p.value.state=e.query.state,O(p.value),E("code",e.query.code),E("state",e.query.state),r.value++,console.log("after",r.value))}),H(),G(),(e,i)=>{const y=C("el-button"),j=C("el-input"),D=C("el-option"),Y=C("el-select");return u(),m("div",ye,[h.value?(u(),m("div",be,[a("div",xe,[a("div",qe," \u786E\u8BA4 "+B(le(n).username)+" \u6210\u4E3A\u8D85\u7EA7\u7BA1\u7406\u5458\uFF1F ",1),ke,a("div",Ce,[x(y,{style:{width:"240px"},onClick:J},{default:I(()=>[Ie]),_:1}),x(y,{type:"primary",style:{width:"240px"},onClick:K},{default:I(()=>[Le]),_:1})])])])):L("",!0),q.value?(u(),m("div",Se,[a("div",Ve,[Ae,je,x(j,{modelValue:S.value,"onUpdate:modelValue":i[0]||(i[0]=b=>S.value=b),class:"mb40",maxlength:"5","show-word-limit":""},null,8,["modelValue"]),x(y,{type:"primary",style:{width:"100%"},onClick:X},{default:I(()=>[De]),_:1})])])):L("",!0),!h.value&&!q.value?(u(),m("div",Ue,[a("div",ze,[Me,a("div",Ne,[f.value&&f.value.length>1?(u(),m("div",Te,[Re,x(Y,{modelValue:V.value,"onUpdate:modelValue":i[1]||(i[1]=b=>V.value=b),placeholder:"\u8BF7\u9009\u62E9\u4F01\u4E1A",class:"width-class flex-g1 flex-s1",size:"small",onChange:F},{default:I(()=>[(u(!0),m(ce,null,ne(f.value,(b,N)=>(u(),de(D,{key:N,label:b.name,value:N},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])])):L("",!0),a("div",Be,B(s.value?"\u4F01\u4E1A\u5FAE\u4FE1\u626B\u7801\u767B\u5F55":"\u8BBE\u7F6E\u8D85\u7EA7\u7BA1\u7406\u5458"),1),Pe,Ee])])])):L("",!0)])}}};var Je=pe(He,[["__scopeId","data-v-0f8ce5f8"]]);export{Je as default};