
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_}from"./index.f1e12eef.js";import d from"./title.67f3d96f.js";import h from"./organize.03d36c3a.js";import p from"./member.c37c8fa6.js";import u from"./test.c2b6cb85.js";import{_ as v}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,a as b,c as g,z as I,t,y as n}from"./vendor.d2559d84.js";import"./index.94e839d6.js";import"./card.fffc3274.js";import"./scrollLoader.22d3a377.js";const y={name:"",components:{aTitle:d,member:p,test:u,organize:h},data(){return{activeType:"0",staffInfo:{},filterText:"",selectDate:"",treeData:[],chatInfo:{},selectData:void 0,defaultProps:{children:"children",label:"department_name"},selectMember:null}},computed:{memberTitle(){let e=this.staffInfo.department_name;return e?`\u3010${e}\u3011`:"\u672A\u9009\u62E9\u4F01\u4E1A\u6210\u5458"},chatTitle(){let e=this.chatInfo.name;return e?`\u3010${e}\u3011`:"\u672A\u9009\u62E9\u804A\u5929\u5BF9\u8C61"},titleStyle(){return this.chatInfo.name?{}:{color:"red"}}},watch:{filterText(){}},methods:{changeCustomerInfo({staffInfo:e,chatInfo:l}){console.log(e),this.staffInfo=e,this.chatInfo=l},selectChat(e){this.chatInfo=e},selectNumber(){this.selectMember=null}}},x={class:"pagoda-add-layout-v1"},C={class:"pagoda-add-layout-v1__content"},T={class:"session-content"},j={class:"group-list"},N={class:"custom-list"},S={class:"chat-detail"},z={class:"chat-title"};function B(e,l,D,M,s,o){const c=a("aTitle"),r=a("organize"),i=a("member"),m=a("test"),f=_;return b(),g(f,null,{default:I(()=>[t("div",x,[t("div",C,[t("div",T,[t("div",j,[n(c,{title:"\u9009\u62E9\u4F01\u4E1A\u6210\u5458"}),n(r,{onChangeCustomerInfo:o.changeCustomerInfo},null,8,["onChangeCustomerInfo"])]),t("div",N,[n(c,{title:o.memberTitle},null,8,["title"]),n(i,{ref:"member","staff-info":s.staffInfo,class:"memeber-content","select-member":s.selectMember,onSelectChat:o.selectChat,onSelectNumber:o.selectNumber},null,8,["staff-info","select-member","onSelectChat","onSelectNumber"])]),t("div",S,[t("div",z,[n(c,{title:o.chatTitle,"title-style":o.titleStyle},null,8,["title","title-style"])]),n(m,{ref:"record",style:{height:"calc(100% - 55px)"},"staff-info":s.staffInfo,"active-type":s.activeType,"chat-info":s.chatInfo},null,8,["staff-info","active-type","chat-info"])])])])])]),_:1})}var H=v(y,[["render",B],["__scopeId","data-v-1867a2e4"]]);export{H as default};
