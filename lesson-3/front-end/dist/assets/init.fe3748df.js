
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{i as b}from"./logo.3d550c45.js";import{H as d,s as _}from"./index.94e839d6.js";import{_ as y}from"./plugin-vue_export-helper.21dcd24c.js";import{E as f,r as S,a as c,q as a,t,A as r,J as o,D as u,y as p,z as g,F as I,G as k,H as v}from"./vendor.d2559d84.js";const x={name:"Login",data(){return{form:{},imgLogo:b,showSuccess:!1,disabled:!1,loading:!1,timer:null,accomplishInitData:{}}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},created(){this.doInit()},methods:{async accomplishInit(){let e=await d.accomplishInit();e.code===0&&(this.accomplishInitData=e.data,_.commit("user/setInit",e.data))},goTo(){clearInterval(this.timer),setTimeout(()=>{_.dispatch("user/getMenus").then(e=>{e.length===0?f.error("\u6682\u65E0\u9875\u9762\u6743\u9650\uFF0C\u8BF7\u7BA1\u7406\u5458\u914D\u7F6E\u6743\u9650"):(f.success("\u767B\u5F55\u6210\u529F"),_.dispatch("user/getSubjectName").then(()=>{this.$router.push("/")}))})},500)},async doInit(){clearInterval(this.timer),this.loading=!0,await d.doInit().finally(()=>{this.loading=!1}),this.initStatus(),this.timer=setInterval(()=>{this.initStatus()},5e3)},async initStatus(){let e=await d.initStatus();this.form=e.data;let n=1;for(let m in this.form)n=n&&this.form[m].status;this.disabled=n===0,this.disabled||(console.log("accomplishInit \u5F00\u59CB"),this.accomplishInit())},filterStatus(e){let n="";switch(e){case 0:n="el-icon-refresh";break;case 1:n="el-icon-circle-check";break;case 2:n="el-icon-circle-close";break}return n}}},l=e=>(I("data-v-fe316224"),e=e(),k(),e),w={class:"qr-login"},C={class:"setting"},j={class:"setting-success"},N={class:"setting-success-title"},q={class:"mb24 setting-item"},D=l(()=>t("span",null,"\u540C\u6B65\u7EC4\u7EC7\u67B6\u6784",-1)),T={key:0,class:"flex-1 tr"},V={class:"mb24 setting-item"},B=l(()=>t("span",null,"\u540C\u6B65\u5BA2\u6237",-1)),E={key:0,class:"flex-1 tr"},H={class:"mb24 setting-item"},L=l(()=>t("span",null,"\u540C\u6B65\u7FA4\u6570\u636E",-1)),z={key:0,class:"flex-1 tr"},M={class:"mb24"},A=l(()=>t("span",null,"\u521D\u59CB\u5316\u5185\u5BB9\u5E93",-1)),F={class:"mb24"},G=l(()=>t("span",null,"\u521D\u59CB\u8BDD\u5185\u5BB9\u5E93\u5206\u7EC4",-1)),J={class:"mb24"},K=l(()=>t("span",null,"\u521D\u59CB\u5316\u8DDF\u8FDB\u8BB0\u5F55\u7C7B\u578B",-1)),O={class:"mb24"},P=l(()=>t("span",null,"\u521D\u59CB\u5316\u8DDF\u8FDB\u8BB0\u5F55\u6587\u672C",-1)),Q={class:"mb24"},R=l(()=>t("span",null,"\u521D\u59CB\u5316\u89E6\u8FBE\u7C7B\u578B",-1)),U={class:"mt24 flex flex-justify-between"},W=v("\u91CD\u65B0\u521D\u59CB\u5316"),X=v("\u5F00\u542F\u5FAE\u5BA2\u4E4B\u65C5");function Y(e,n,m,Z,s,i){const h=S("el-button");return c(),a("div",w,[t("div",C,[t("div",j,[t("div",N,r(s.loading?"\u7CFB\u7EDF\u521D\u59CB\u5316\u4E2D\u2026":s.disabled?"\u7CFB\u7EDF\u521D\u59CB\u5316\u4E2D":"\u7CFB\u7EDF\u521D\u59CB\u5316\u6210\u529F"),1),t("div",q,[t("div",null,[t("i",{class:o(["icon",i.filterStatus(s.form.init_department.status)])},null,2),D]),s.form.init_department.status==1?(c(),a("div",T,r(s.form.init_department.msg),1)):u("",!0)]),t("div",V,[t("div",null,[t("i",{class:o(["icon",i.filterStatus(s.form.init_customer.status)])},null,2),B]),s.form.init_customer.status==1?(c(),a("div",E,r(s.form.init_customer.msg),1)):u("",!0)]),t("div",H,[t("div",null,[t("i",{class:o(["icon",i.filterStatus(s.form.init_group.status)])},null,2),L]),s.form.init_group.status==1?(c(),a("div",z,r(s.form.init_group.msg),1)):u("",!0)]),t("div",M,[t("i",{class:o(["icon",i.filterStatus(s.form.init_content.status)])},null,2),A]),t("div",F,[t("i",{class:o(["icon",i.filterStatus(s.form.init_content_group.status)])},null,2),G]),t("div",J,[t("i",{class:o(["icon",i.filterStatus(s.form.init_follow_type.status)])},null,2),K]),t("div",O,[t("i",{class:o(["icon",i.filterStatus(s.form.init_setting_content.status)])},null,2),P]),t("div",Q,[t("i",{class:o(["icon",i.filterStatus(s.form.init_trigger_type.status)])},null,2),R]),t("div",U,[p(h,{disabled:!s.disabled,type:"primary",class:"icon-btn mr60",plain:"",icon:"el-icon-refresh",onClick:i.doInit},{default:g(()=>[W]),_:1},8,["disabled","onClick"]),p(h,{type:"primary",disabled:s.disabled,class:"icon-btn",onClick:i.goTo},{default:g(()=>[X]),_:1},8,["disabled","onClick"])])])])])}var it=y(x,[["render",Y],["__scopeId","data-v-fe316224"]]);export{it as default};
