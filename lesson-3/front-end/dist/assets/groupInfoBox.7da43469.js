
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as d}from"./index.fece4a24.js";import{_ as f}from"./plugin-vue_export-helper.21dcd24c.js";import{r,a as m,q as u,t as e,A as o,y as n,z as l,H as c,F as x,G as g}from"./vendor.d2559d84.js";import"./contant.2e72a177.js";import"./error.32433a76.js";import"./index.94e839d6.js";const a=t=>(x("data-v-58a4c1f6"),t=t(),g(),t),h={class:"menber-info-item pb16 mb16"},v={class:"mb8 flex flex-align-center fs16"},I=c(" \u3010"),b=["title"],w=c("\u3011 "),j=["title"],q=c(" \uFF08"),y={class:"color-primary"},B=c(" \uFF09 "),S={class:"lh32 mb8 flex flex-align-center"},N=a(()=>e("div",{class:"c55 flex-g0 flex-s0"},"\u7FA4\u4E3B\uFF1A",-1)),V={class:"mb8 flex lh22"},k=a(()=>e("span",{class:"c55 flex-g0 flex-s0"},"\u5165\u7FA4\u65F6\u95F4\uFF1A",-1)),C={class:"c26 flex-s1 overflow-ellipsis"},z={class:"lh32 mb8 flex"},A=a(()=>e("span",{class:"c55 flex-g0 flex-s0"},"\u662F\u5426\u5728\u7FA4\u5185\uFF1A",-1)),D={class:"c26 overflow-ellipsis"},E={class:"mb8 flex lh22"},F=a(()=>e("span",{class:"c55 flex-g0 flex-s0"},"\u9000\u7FA4\u65F6\u95F4\uFF1A",-1)),G={class:"c26 overflow-ellipsis"},H={class:"flex flex-align-center lh22"},M=a(()=>e("span",{class:"c55 flex-g0 flex-s0"},"\u5165\u7FA4\u65B9\u5F0F\uFF1A",-1)),O={class:"c26 flex-g1 flex-s1"},T={props:{groupInfo:{type:Object,default:()=>{}}},setup(t){const s=t;return($,J)=>{const i=d,_=r("el-col"),p=r("el-row");return m(),u("div",h,[e("div",v,[I,e("div",{class:"max-group-name overflow-ellipsis",title:s.groupInfo.qw_department_name},o(s.groupInfo.qw_department_name),9,b),w,e("div",{class:"max-group-name overflow-ellipsis",title:s.groupInfo.group_name},o(s.groupInfo.group_name),9,j),q,e("span",y,o(s.groupInfo.count),1),B]),n(p,{gutter:8},{default:l(()=>[n(_,{span:12,class:""},{default:l(()=>[e("div",S,[N,n(i,{class:"table-member-card","member-id":s.groupInfo.member_id,avatar:s.groupInfo.qw_avatar,name:s.groupInfo.qw_name,"department-name":s.groupInfo.qw_department_name},null,8,["member-id","avatar","name","department-name"])]),e("div",V,[k,e("span",C,o(s.groupInfo.create_time),1)])]),_:1}),n(_,{span:12,class:"lh22"},{default:l(()=>[e("div",z,[A,e("span",D,o(s.groupInfo.is_in||"--"),1)]),e("div",E,[F,e("span",G,o(s.groupInfo.delete_time||"--"),1)])]),_:1})]),_:1}),e("div",H,[M,e("span",O,o(s.groupInfo.into_group.content||"--"),1)])])}}};var W=f(T,[["__scopeId","data-v-58a4c1f6"]]);export{W as default};
