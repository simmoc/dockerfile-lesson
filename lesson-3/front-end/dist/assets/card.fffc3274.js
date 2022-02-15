
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{e as _,r as h,a as o,q as c,R as f,t as a,A as m,D as d,c as y,K as k,F as v,G as b}from"./vendor.d2559d84.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";const I=t=>{let s=t.lastIndexOf("/");return decodeURIComponent(t.slice(s+1))},x=[{msgtype:"text",showType:"text"},{msgtype:"image",showType:"pictrue"},{msgtype:"revoke",showType:"revoke"},{msgtype:"agree/disagree",showType:"system"},{msgtype:"voice",showType:"filename"},{msgtype:"news",showType:"news"},{msgtype:"emotion",showType:"pictrue"},{msgtype:"video",showType:"filename"},{msgtype:"file",showType:"filename"},{msgtype:"link",showType:"web_link"},{msgtype:"weapp",showType:"weapp"}],O=[{msgtype:"location",msg:"\u4F4D\u7F6E\u6D88\u606F"},{msgtype:"card",msg:"\u540D\u7247\u6D88\u606F"},{msgtype:"chatrecord",msg:"\u4F1A\u8BDD\u8BB0\u5F55\u6D88\u606F"},{msgtype:"ChatRecord",msg:"\u4F1A\u8BDD\u8BB0\u5F55\u6D88\u606Fitem"},{msgtype:"todo",msg:"\u5F85\u529E\u6D88\u606F"},{msgtype:"vote",msg:"\u6295\u7968\u6D88\u606F"},{msgtype:"collect",msg:"\u586B\u8868\u6D88\u606F"},{msgtype:"redpacket",msg:"\u7EA2\u5305\u6D88\u606F"},{msgtype:"meeting",msg:"\u4F1A\u8BAE\u9080\u8BF7\u6D88\u606F"},{msgtype:"change",msg:"\u5207\u6362\u4F01\u4E1A\u65E5\u5FD7"},{msgtype:"docmsg",msg:"\u5728\u7EBF\u6587\u6863\u6D88\u606F"},{msgtype:"markdown",msg:"MarkDown\u683C\u5F0F\u6D88\u606F"},{msgtype:"calendar",msg:"\u65E5\u7A0B\u6D88\u606F"},{msgtype:"markdown",msg:"MarkDown\u683C\u5F0F\u6D88\u606F"},{msgtype:"mixed",msg:"\u6DF7\u5408\u6D88\u606F"},{msgtype:"meeting_voice_call",msg:"\u97F3\u9891\u5B58\u6863\u6D88\u606F"},{msgtype:"voip_doc_share",msg:"\u97F3\u9891\u5171\u4EAB\u6587\u6863\u6D88\u606F"},{msgtype:"external_redpacket",msg:"\u4E92\u901A\u7EA2\u5305\u6D88\u606F"}],L=t=>{if(!t)return"";let s=parseInt(`${t}000`),i=new Date(s);var n=i.getFullYear(),r=i.getMonth()+1,e=i.getDate(),l=i.getHours(),p=i.getMinutes(),w=i.getSeconds();return`${n}-${r}-${e} ${l}:${p}:${w}`};class T{constructor(s={}){this.defaultConfig={position:{},type:"bottom",runtime:300,speed:10,element:null};let{position:i,runtime:n,speed:r,element:e}=this.defaultConfig;if(this.element=document.querySelector(s.element||e),console.log("option.element",s.element),!s.element||!this.element){console.warn("element is required");return}this.position=s.position||i,this.runtime=s.runtime||n,this.speed=s.speed||r,this.thisScrolltop=this.element.scrollTop,this.position.y=this.position.y||this.element.scrollHeight,this.distance=Math.abs(this.position.y-this.thisScrolltop),this.diffDistance=0,this.delayt=this.thisScrolltop,this.step=this.distance/(this.runtime/this.speed),this.upOrDown=this.thisScrolltop>this.position.y,this.timer=null,this.startTime=Date.now(),this.endTime=Date.now(),this.init()}init(){this.timer=setInterval(()=>{let{step:s,delayt:i,upOrDown:n}=this;this.endTime=Date.now(),this.delayt=n?i-s:i+s,this.diffDistance=Math.abs(this.position.y-this.delayt),this.diffDistance<this.step&&(clearInterval(this.timer),this.delayt=this.position.y),this.endTime-this.startTime>10*1e3&&clearInterval(this.timer),this.element.scrollTo(0,this.delayt)},this.speed)}}var g={getFileName:I,getFormatTime:L,typeList:x,addtionList:O,AnimationScrollPosition:T},u="data:image/png;base64,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";const S={name:"Card",props:{attributes:{type:Object,default:()=>{}},isRevoke:{type:Boolean,default:()=>!1}},data(){return{cardStyle:{imageStyle:{maxWidth:"300px",minWidth:"10px",maxHeight:"300px",minHeight:"10px"}}}},computed:{showType(){return this.attributes.showType},content(){return this.attributes.content||{}},fileName(){let t=this.content;return g.getFileName(t.url)}},mounted(){let t=this.attributes,s=t.msgtype||t.msg_type,i=g.typeList.find(l=>l.msgtype.indexOf(s)>-1)||{},{showType:n}=i,e=(g.addtionList.find(l=>l.msgtype.indexOf(s)>-1)||{}).msg;t.msgName=e?`\u3010${e}\u3011`:"",t.showType=n||"text"},methods:{download(t,s){_.get(t,{responseType:"blob",headers:new Headers({Origin:location.origin}),mode:"cors"}).then(i=>{const n=document.createElement("a"),r=new Blob([i],{type:"application/octet-stream"});n.download=s,n.href=window.URL.createObjectURL(r),document.body.appendChild(n),n.click(),n.remove()})}}},A=t=>(v("data-v-04b3ac53"),t=t(),b(),t),D={class:"card-box"},C={key:0,class:"card-text"},F=["innerHTML"],V={key:1,class:"card-text"},E={key:2},G=["href"],M={key:3,class:"card-message"},N={key:4},z=["href"],U={key:5,class:"weapp-box"},Y={class:"weapp-name"},J=A(()=>a("img",{class:"icon",src:u},null,-1)),R={class:"weapp-title"},q={class:"weapp-desc"},X=A(()=>a("div",{class:"weapp-bottom"},[a("img",{class:"icon",src:u}),a("span",null,"\u5C0F\u7A0B\u5E8F")],-1));function H(t,s,i,n,r,e){const l=h("el-image"),p=h("Card",!0);return o(),c("div",D,[e.showType=="text"?(o(),c(f,{key:0},[e.content.content?(o(),c("div",C,[a("div",{innerHTML:e.content.content},null,8,F)])):(o(),c("div",V,m(`\u6682\u4E0D\u652F\u6301\u8BE5\u79CD\u7C7B\u578B\u6D88\u606F${i.attributes.msgName||""}`),1))],64)):d("",!0),e.showType=="pictrue"?(o(),y(l,{key:1,style:k(r.cardStyle.imageStyle),src:e.content.url,"preview-src-list":[e.content.url]},null,8,["style","src","preview-src-list"])):d("",!0),e.showType=="filename"?(o(),c("div",E,[a("a",{href:e.content.url},m(e.fileName),9,G)])):d("",!0),e.showType=="news"?(o(),c("div",M,m(e.content.corpname),1)):d("",!0),e.showType=="web_link"?(o(),c("div",N,[a("a",{href:e.content.link_url,target:"_blank"},m(e.content.link_url),9,z)])):d("",!0),e.showType=="weapp"?(o(),c("div",U,[a("div",Y,[J,a("span",null,m(e.content.displayname),1)]),a("div",R,m(e.content.title),1),a("div",q,[a("span",null,m(e.content.description),1)]),X])):d("",!0),e.showType=="revoke"?(o(),y(p,{key:6,attributes:e.content,"is-revoke":!0},null,8,["attributes"])):d("",!0)])}var W=B(S,[["render",H],["__scopeId","data-v-04b3ac53"]]),Q=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:W});export{g as a,Q as b,W as c};