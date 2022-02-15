
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as D,H as C}from"./index.94e839d6.js";import{d as z,g as $,e as H,c as J,_ as te,a as le,b as se,f as ae,h as ne}from"./write.74214fac.js";import{_ as ie,C as oe,a as re}from"./index.41459e6c.js";import{_ as Y}from"./plugin-vue_export-helper.21dcd24c.js";import{a as r,q as c,y as _,Q as ue,I as de,w as K,r as k,t as n,L as l,J as x,z as m,R as T,S as O,c as y,D as g,F as G,G as q,K as X,E as _e,A as M,H as F}from"./vendor.d2559d84.js";import{C as Q}from"./index.384ab11c.js";import{_ as ce}from"./index.f1e12eef.js";import"./word-img.bb3865fc.js";import"./drag.56588ea6.js";import"./sortable.esm.81321d43.js";import"./index.5931791c.js";import"./index.a3c908a5.js";import"./formValidate.137fd30a.js";const W=function(t){switch(t){case"BOOLEAN":return[{label:"\u662F",value:"TRUE"},{label:"\u5426",value:"FALSE"},{label:"\u7A7A\u503C",value:"EMPTY"},{label:"\u975E\u7A7A",value:"NOT_EMPTY"}];case"NUMBER":return[{label:"\u7B49\u4E8E",value:"EQ"},{label:"\u4E0D\u7B49\u4E8E",value:"NE"},{label:"\u5927\u4E8E",value:"GT"},{label:"\u5927\u4E8E\u7B49\u4E8E",value:"GE"},{label:"\u5C0F\u4E8E",value:"LS"},{label:"\u5C0F\u4E8E\u7B49\u4E8E",value:"LE"},{label:"\u533A\u95F4",value:"BETWEEN"},{label:"\u7A7A\u503C",value:"EMPTY"},{label:"\u975E\u7A7A",value:"NOT_EMPTY"}];case"DATETIME":return[{label:"\u7EDD\u5BF9\u65F6\u95F4\u533A\u95F4",value:"BETWEEN"},{label:"\u76F8\u5BF9\u65F6\u95F4\u533A\u95F4",value:"RELATIVE"},{label:"\u5FEB\u6377\u76F8\u5BF9\u65F6\u95F4",value:"SHORTCUT_RELATIVE"}];case"TIMEUNIT":return[{label:"\u5929\u524D",value:"BEFORE_DAY"},{label:"\u5F53\u5929",value:"TODAY"},{label:"\u5929\u540E",value:"AFTER_DAY"}];case"TEXT":return[{label:"\u7B49\u4E8E",value:"EQ"},{label:"\u4E0D\u7B49\u4E8E",value:"NE"},{label:"\u5305\u542B",value:"INC"},{label:"\u4E0D\u5305\u542B",value:"NINC"},{label:"\u7A7A\u503C",value:"EMPTY"},{label:"\u975E\u7A7A",value:"NOT_EMPTY"}];case"OPTIONS":return[{label:"\u7B49\u4E8E",value:"EQ"},{label:"\u4E0D\u7B49\u4E8E",value:"NE"},{label:"\u5728\xB7\xB7\xB7\u5185",value:"IN"},{label:"\u5728\xB7\xB7\xB7\u5916",value:"NOT_IN"},{label:"\u7A7A\u503C",value:"EMPTY"},{label:"\u975E\u7A7A",value:"NOT_EMPTY"}]}};const me={name:"SelectVariable",components:{"select-block":()=>D(()=>import("./index.41459e6c.js").then(function(t){return t.s}),["assets/index.41459e6c.js","assets/index.140f4b00.css","assets/word-img.bb3865fc.js","assets/drag.56588ea6.js","assets/plugin-vue_export-helper.21dcd24c.js","assets/vendor.d2559d84.js","assets/index.94e839d6.js","assets/index.ea28890e.css","assets/sortable.esm.81321d43.js"])},model:{prop:"taskVariable",event:"changeTaskVariable"},props:{taskVariable:{type:[String,Number],default:""},isInputShow:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},eventsId:{type:[String,Number],default:""}},emits:["changeObj","changeTaskVariable","updata:taskVariable"],data(){return{value:"",defaultProps:{valueKey:"element_key",labelKey:"element_name",groupLabelKey:"subject_name",childrenKey:"son"},optionGroup:[]}},computed:{},watch:{taskVariable:{async handler(t){this.value=t},immediate:!0},eventsId:{handler(){this.getOptionData()},immediate:!0}},created(){this.getOptionData()},mounted(){},methods:{openPopover(){this.$refs.variableSelectBlock.openPopover()},handleChangeObj(t,o){this.$emit("changeObj",t,o),this.$emit("updata:taskVariable",t)},handleChangeTaskVariable(t){this.$emit("changeTaskVariable",t)},getOptionData(){if(this.eventsId){let t={events_id:parseInt(this.eventsId)};C.getEventsElementsOptions(t).then(o=>{this.optionGroup=o.data||[],this.$nextTick(()=>{})}).catch(()=>{})}},filterMethod(t){return new Promise(o=>{let a={events_id:1,keyword:t};C.getEventsElementsOptions(a).then(s=>{o(s.data)}).catch(()=>{})})}}};function pe(t,o,a,s,e,f){const w=ie;return r(),c("div",null,[_(w,{ref:"variableSelectBlock",modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=R=>e.value=R),"option-group":e.optionGroup,"filter-method":f.filterMethod,props:e.defaultProps,"popper-class":"select-variable-popover",placeholder:"\u8BF7\u9009\u62E9","is-input-show":a.isInputShow,disabled:a.disabled,onChange:f.handleChangeTaskVariable,onChangeObj:f.handleChangeObj},null,8,["modelValue","option-group","filter-method","props","is-input-show","disabled","onChange","onChangeObj"])])}var fe=Y(me,[["render",pe]]);const B=t=>(G("data-v-f877f230"),t=t(),q(),t),be={class:"rule-row-item flex flex-justify-start"},he={class:"rule-box"},ge={class:"rule-box"},ve={key:0,class:"rule-box-time"},ye={key:1,class:"rule-box-time-relative"},we=B(()=>n("span",null,"\xA0\u81F3\xA0",-1)),Ie={key:0,class:"rule-box-tip"},Re=B(()=>n("div",{class:"rule-box-tip-txt"},"\u65F6\u95F4\u533A\u95F4\u914D\u7F6E\u6709\u8BEF",-1)),ke=[Re],Te={key:1,class:"rule-box-number-range"},Ee=B(()=>n("span",null,"\xA0\u81F3\xA0",-1)),xe={key:0,class:"rule-box-tip"},Oe=B(()=>n("div",{class:"rule-box-tip-txt"},"\u6570\u503C\u533A\u95F4\u914D\u7F6E\u6709\u8BEF",-1)),Ve=[Oe],Ne={key:2,class:"rule-box"},je={key:3,class:"rule-item-btn-group flex flex-justify-start"},Me=B(()=>n("img",{src:z,alt:"+"},null,-1)),Ue=[Me],Se=B(()=>n("img",{src:$,alt:"-"},null,-1)),Pe=[Se],Ce={props:{disabled:{type:Boolean,default:!1},ruleItem:{type:Object,default:function(){return{}}},ruleList:{type:Array,default:()=>[]},eventsId:{type:[String,Number],default:""},index:{type:Number}},emits:["addRuleItem","delRuleItem","updateValue"],setup(t,{expose:o,emit:a}){const s=t,e=ue({newRuleItem:{},pickerOptions:{shortcuts:[{text:"\u6700\u8FD1\u4E00\u5468",onClick(u){const i=new Date,b=new Date;b.setTime(b.getTime()-3600*1e3*24*7),u.$emit("pick",[b,i])}},{text:"\u6700\u8FD1\u4E00\u4E2A\u6708",onClick(u){const i=new Date,b=new Date;b.setTime(b.getTime()-3600*1e3*24*30),u.$emit("pick",[b,i])}}]}}),f=de(()=>{let u=e.newRuleItem,i=u.field_type,b=JSON.parse(JSON.stringify(u.params));if(b&&i){if(i==="NUMBER"&&u.opreator==="BETWEEN"){if(b[0]>b[1])return!0}else if(i==="DATETIME"&&u.opreator==="RELATIVE"&&u.params_unit&&u.params_unit[0]&&u.params_unit[1]){let V=w(u.params_unit[0]),S=w(u.params_unit[1])*u.params[1]-V*u.params[0];return parseInt(S)<0}}return!1});K(()=>s.ruleItem,u=>{if(JSON.stringify(e.newRuleItem)=="{}")e.newRuleItem=u;else return},{immediate:!0,deep:!0}),K(()=>e.newRuleItem,u=>{JSON.stringify(e.newRuleItem)!=="{}"&&a("updateValue",u,s.index)},{immediate:!0,deep:!0});function w(u){switch(u){case"AFTER_DAY":return 1;case"BEFORE_DAY":return-1;case"TODAY":return 0;default:return 0}}function R(u,i,b){if(u==="TODAY"){let V=i.params;V[b]=0,i.params=V}}function I(u,i){j(i)}async function v(u,i,b){b.opreator="",b.params=["",""],b.field_type=i.element_type,b.target_type=i.target_type,e.newRuleItem.field_key=u,i.element_type==="OPTIONS"&&i.element_key&&(b.option_json=i.element_option_json)}async function j(u){if(u.options=[],u.params=["",""],u.field_type==="OPTIONS"){let i=u.option_json.map(b=>{if(b)return{label:b,value:b}});["IN","NOT_IN"].includes(u.opreator)?(u.options=i,u.params=[]):(u.options=i,u.params=["",""]),console.log(u.params)}else u.field_type==="DATETIME"&&(u.opreator==="RELATIVE"?u.params_unit=["",""]:u.opreator==="SHORTCUT_RELATIVE"&&(u.options=[{label:"\u5F53\u6708",value:"CURRENT_MONTH"}],u.params=["CURRENT_MONTH",""]))}function h(u,i){let b=E("SINGLE");u.splice(i+1,0,b[0])}function U(u,i){u.splice(i,1)}function E(u){switch(u){case"SINGLE":return[{target_type:"SUBJECT",type:"SINGLE",condition:"AND",field_type:"",opreator:"",params:["",""]}];case"GROUP":return[{type:"GROUP",condition:"OR",rule_set:[{target_type:"EVENT",field_type:"NUMBER",opreator:"GE",params:["",""]},{target_type:"EVENT",field_type:"NUMBER",opreator:"LS",params:[10]}]}]}}return o({addRuleItem:h,delRuleItem:U}),(u,i)=>{const b=k("el-option"),V=k("el-select"),L=k("el-date-picker"),S=k("el-input-number"),p=k("el-input");return r(),c("div",be,[n("div",he,[_(fe,{"task-variable":l(e).newRuleItem.field_key,"events-id":s.eventsId,disabled:s.disabled,class:x([l(e).newRuleItem.field_key||s.disabled?"":"rule-item-err"]),onChangeObj:i[0]||(i[0]=(d,P)=>v(d,P,l(e).newRuleItem))},null,8,["task-variable","events-id","disabled","class"])]),n("div",ge,[_(V,{modelValue:l(e).newRuleItem.opreator,"onUpdate:modelValue":i[1]||(i[1]=d=>l(e).newRuleItem.opreator=d),style:{width:"100%"},size:"mini",disabled:s.disabled,class:x([l(e).newRuleItem.opreator||s.disabled?"":"rule-item-err"]),onChange:i[2]||(i[2]=d=>j(l(e).newRuleItem))},{default:m(()=>[(r(!0),c(T,null,O(l(W)(l(e).newRuleItem.field_type),d=>(r(),y(b,{key:d.value,label:d.label,value:d.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","class"])]),l(e).newRuleItem.field_type==="DATETIME"&&(l(e).newRuleItem.opreator==="BETWEEN"||l(e).newRuleItem.opreator==="RELATIVE")?(r(),c("div",ve,[l(e).newRuleItem.opreator==="BETWEEN"?(r(),y(L,{key:0,modelValue:l(e).newRuleItem.params,"onUpdate:modelValue":i[3]||(i[3]=d=>l(e).newRuleItem.params=d),"value-format":"YYYY-MM-DD HH:mm:ss",type:"datetimerange","picker-options":l(e).pickerOptions,"range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F",align:"right",clearable:!1,disabled:s.disabled,class:x([l(e).newRuleItem.params[0]&&l(e).newRuleItem.params[1]||s.disabled?"":"rule-item-err"])},null,8,["modelValue","picker-options","disabled","class"])):g("",!0),l(e).newRuleItem.opreator==="RELATIVE"?(r(),c("div",ye,[_(S,{modelValue:l(e).newRuleItem.params[0],"onUpdate:modelValue":i[4]||(i[4]=d=>l(e).newRuleItem.params[0]=d),style:{width:"80px"},placeholder:"\u8BF7\u8F93\u5165",controls:!1,step:1,min:0,"step-strictly":"",disabled:s.disabled||l(e).newRuleItem.params_unit[0]==="TODAY",class:x([l(e).newRuleItem.params[0]||l(e).newRuleItem.params[0]===0||s.disabled||l(e).newRuleItem.params_unit[0]==="TODAY"?"":"rule-item-err","mr4"])},null,8,["modelValue","disabled","class"]),_(V,{modelValue:l(e).newRuleItem.params_unit[0],"onUpdate:modelValue":i[5]||(i[5]=d=>l(e).newRuleItem.params_unit[0]=d),placeholder:"\u8BF7\u9009\u62E9",style:{width:"80px"},disabled:s.disabled,class:x([l(e).newRuleItem.params_unit[0]||s.disabled?"":"rule-item-err"]),onChange:i[6]||(i[6]=d=>R(d,l(e).newRuleItem,0))},{default:m(()=>[(r(!0),c(T,null,O(l(W)("TIMEUNIT"),(d,P)=>(r(),y(b,{key:d.value+`${P}S`,label:d.label,value:d.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","class"]),we,_(S,{modelValue:l(e).newRuleItem.params[1],"onUpdate:modelValue":i[7]||(i[7]=d=>l(e).newRuleItem.params[1]=d),style:{width:"80px"},placeholder:"\u8BF7\u8F93\u5165",controls:!1,step:1,min:0,"step-strictly":"",disabled:s.disabled||l(e).newRuleItem.params_unit[1]==="TODAY",class:x([l(e).newRuleItem.params[1]||l(e).newRuleItem.params[1]===0||s.disabled||l(e).newRuleItem.params_unit[1]==="TODAY"?"":"rule-item-err","mr4"])},null,8,["modelValue","disabled","class"]),_(V,{modelValue:l(e).newRuleItem.params_unit[1],"onUpdate:modelValue":i[8]||(i[8]=d=>l(e).newRuleItem.params_unit[1]=d),placeholder:"\u8BF7\u9009\u62E9",style:{width:"80px"},disabled:s.disabled,class:x([l(e).newRuleItem.params_unit[1]||s.disabled?"":"rule-item-err"]),onChange:i[9]||(i[9]=d=>R(d,l(e).newRuleItem,1))},{default:m(()=>[(r(!0),c(T,null,O(l(W)("TIMEUNIT"),(d,P)=>(r(),y(b,{key:d.value+`${P}E`,label:d.label,value:d.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","class"]),l(f)?(r(),c("div",Ie,ke)):g("",!0)])):g("",!0)])):l(e).newRuleItem.field_type==="NUMBER"&&l(e).newRuleItem.opreator==="BETWEEN"?(r(),c("div",Te,[_(S,{modelValue:l(e).newRuleItem.params[0],"onUpdate:modelValue":i[10]||(i[10]=d=>l(e).newRuleItem.params[0]=d),placeholder:"\u8BF7\u8F93\u5165",style:{width:"164px"},size:"mini",controls:!1,disabled:s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator),class:x([l(e).newRuleItem.params[0]||s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)?"":"rule-item-err"])},null,8,["modelValue","disabled","class"]),Ee,_(S,{modelValue:l(e).newRuleItem.params[1],"onUpdate:modelValue":i[11]||(i[11]=d=>l(e).newRuleItem.params[1]=d),placeholder:"\u8BF7\u8F93\u5165",style:{width:"164px"},size:"mini",controls:!1,disabled:s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator),class:x([l(e).newRuleItem.params[1]||s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)?"":"rule-item-err"])},null,8,["modelValue","disabled","class"]),l(f)?(r(),c("div",xe,Ve)):g("",!0)])):(r(),c("div",Ne,[l(e).newRuleItem.field_type==="DATETIME"&&l(e).newRuleItem.opreator==="SHORTCUT_RELATIVE"||l(e).newRuleItem.field_type==="OPTIONS"&&!["IN","NOT_IN"].includes(l(e).newRuleItem.opreator)?(r(),y(V,{key:0,modelValue:l(e).newRuleItem.params[0],"onUpdate:modelValue":i[12]||(i[12]=d=>l(e).newRuleItem.params[0]=d),disabled:s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator),placeholder:"\u8BF7\u9009\u62E9\u5355\u9009",style:{width:"100%"},class:x([l(e).newRuleItem.params[0]||s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)?"":"rule-item-err"]),onFocus:i[13]||(i[13]=d=>I(d,l(e).newRuleItem))},{default:m(()=>[(r(!0),c(T,null,O(l(e).newRuleItem.options,(d,P)=>(r(),y(b,{key:d.label+`${P}`,label:d.label,value:d.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","class"])):l(e).newRuleItem.field_type==="OPTIONS"&&["IN","NOT_IN"].includes(l(e).newRuleItem.opreator)?(r(),y(V,{key:l(e).newRuleItem.opreator,modelValue:l(e).newRuleItem.params,"onUpdate:modelValue":i[14]||(i[14]=d=>l(e).newRuleItem.params=d),disabled:s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator),placeholder:"\u8BF7\u9009\u62E9\u591A\u9009",style:{width:"100%"},multiple:!0,class:x([l(e).newRuleItem.params.length!==0||s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)?"":"rule-item-err"]),onFocus:i[15]||(i[15]=d=>I(d,l(e).newRuleItem))},{default:m(()=>[l(e).newRuleItem.options&&l(e).newRuleItem.options.length?(r(!0),c(T,{key:0},O(l(e).newRuleItem.options,(d,P)=>(r(),y(b,{key:d.label+`${P}${l(e).newRuleItem.opreator}`,label:d.label,value:d.value},null,8,["label","value"]))),128)):g("",!0)]),_:1},8,["modelValue","disabled","class"])):l(e).newRuleItem.field_type==="NUMBER"&&l(e).newRuleItem.opreator!=="BETWEEN"?(r(),y(S,{key:l(e).newRuleItem.opreator,modelValue:l(e).newRuleItem.params[0],"onUpdate:modelValue":i[16]||(i[16]=d=>l(e).newRuleItem.params[0]=d),style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165",size:"mini",controls:!1,disabled:s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator),class:x([l(e).newRuleItem.params[0]||s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)?"":"rule-item-err","mr4"])},null,8,["modelValue","disabled","class"])):(r(),y(p,{key:3,modelValue:l(e).newRuleItem.params[0],"onUpdate:modelValue":i[17]||(i[17]=d=>l(e).newRuleItem.params[0]=d),class:x(["mr4",[l(e).newRuleItem.params[0]||s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)||l(e).newRuleItem.field_type==="BOOLEAN"?"":"rule-item-err"]]),style:{width:"100%"},placeholder:"\u8BF7\u8F93\u5165",size:"mini",disabled:s.disabled||["EMPTY","NOT_EMPTY"].includes(l(e).newRuleItem.opreator)||l(e).newRuleItem.field_type==="BOOLEAN"},null,8,["modelValue","disabled","class"]))])),s.disabled?g("",!0):(r(),c("div",je,[n("div",{class:"add-rule-btn rule-row-item-btn flex flex-justify-center flex-align-center",onClick:i[18]||(i[18]=d=>a("addRuleItem"))},Ue),n("div",{class:"add-rule-btn rule-row-item-btn flex flex-justify-center flex-align-center",onClick:i[19]||(i[19]=d=>a("delRuleItem"))},Pe)]))])}}};var Z=Y(Ce,[["__scopeId","data-v-f877f230"]]),Ae=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Z});const Be={components:{"rule-item":()=>D(()=>Promise.resolve().then(function(){return Ae}),void 0)},props:{disabled:{type:Boolean,default:!1},baseCombineRules:{type:Object,default:function(){return{}}},eventsId:{type:[String,Number],default:""}},data(){return{combineRules:{},condition:"",taskVariable:"",conditionOption:[{label:"AND",value:"AND"},{label:"OR",value:"OR"}],pickerOptions:{shortcuts:[{text:"\u6700\u8FD1\u4E00\u5468",onClick(t){const o=new Date,a=new Date;a.setTime(a.getTime()-3600*1e3*24*7),t.$emit("pick",[a,o])}},{text:"\u6700\u8FD1\u4E00\u4E2A\u6708",onClick(t){const o=new Date,a=new Date;a.setTime(a.getTime()-3600*1e3*24*30),t.$emit("pick",[a,o])}}]}}},computed:{},watch:{baseCombineRules:{async handler(t){console.log("rule==",t),this.combineRules=JSON.parse(JSON.stringify(t))},immediate:!0}},created(){},mounted(){},methods:{getElementOptions(t){return console.log({key:t}),new Promise(a=>{a({pay_type:["\u652F\u4ED8\u5B9D","\u5FAE\u4FE1"],card_type:["\u94BB\u77F3","\u91D1\u5361","\u94F6\u5361","\u666E\u5361"]})})},changeRuleItem(t,o,a){a[o]=t,console.log("\u4FEE\u554Ahi\u6539",a)},addRuleItem(t,o){let a=this.getRuleBase("SINGLE");t.splice(o+1,0,a[0])},delRuleItem(t,o,a,s,e){t.splice(o,1),a==="group"&&!t.length&&this.delRuleItem(s,e)},addRule(t){let o=this.getRuleBase(t);this.combineRules&&this.combineRules.rule_set?this.combineRules.rule_set=this.combineRules.rule_set.concat(o):this.combineRules={condition:"AND",type:t,rule_set:o}},getRuleBase(t){switch(t){case"SINGLE":return[{target_type:"SUBJECT",type:"SINGLE",condition:"AND",field_type:"",opreator:"",params:["",""]}];case"GROUP":return[{type:"GROUP",condition:"AND",rule_set:[{target_type:"",field_type:"",opreator:"",params:["",""],options:[]},{target_type:"",field_type:"",opreator:"",params:["",""],options:[]}]}]}}}},A=t=>(G("data-v-e45eb00e"),t=t(),q(),t),Le={class:"combination-rule-wrap",style:{"min-width":"80vw"}},De={class:"rule-group-container"},Ye={class:"rule-condition-wrap condition flex flex-direction-column flex-justify-center"},Ge=A(()=>n("div",{class:"rule-condition-link rule-condition-link-up"},null,-1)),qe=A(()=>n("div",{class:"rule-condition-link rule-condition-link-down"},null,-1)),Fe={class:"rule-item-wrap flex-1"},We={key:0,class:"flex flex-justify-between rule-item-group-wrap of00 flex-1"},ze={class:"flex flex-justify-start"},$e={class:"rule-condition-wrap flex flex-direction-column flex-justify-center"},He={class:"rule-group-item-btn-group flex flex-justify-start flex-align-center"},Je=["onClick"],Ke=A(()=>n("i",{class:"el-icon-circle-close"},null,-1)),Xe=[Ke],Qe={key:1},Ze={key:0,class:"flex flex-justify-start pr24 pr8 pl8"},et=A(()=>n("img",{src:H},null,-1)),tt=A(()=>n("span",null,"\u6DFB\u52A0\u6761\u4EF6",-1)),lt=[et,tt],st=A(()=>n("img",{src:J},null,-1)),at=A(()=>n("span",null,"\u6DFB\u52A0\u6761\u4EF6\u7EC4",-1)),nt=[st,at];function it(t,o,a,s,e,f){const w=k("el-option"),R=k("el-select"),I=Z;return r(),c("div",null,[n("div",Le,[n("div",De,[(r(!0),c(T,null,O([e.combineRules],(v,j)=>(r(),c("div",{key:j,class:"flex flex-justify-start"},[n("div",Ye,[v.rule_set&&v.rule_set.length&&v.rule_set.length>1?(r(),c(T,{key:0},[Ge,_(R,{modelValue:v.condition,"onUpdate:modelValue":h=>v.condition=h,style:{width:"80px"},size:"mini",disabled:a.disabled,class:"mr12"},{default:m(()=>[(r(!0),c(T,null,O(e.conditionOption,h=>(r(),y(w,{key:h.value,label:h.label,value:h.value},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","disabled"]),qe],64)):g("",!0)]),n("div",Fe,[(r(!0),c(T,null,O(v.rule_set,(h,U)=>(r(),c("div",{key:U,class:"rule flex flex-justify-start"},[h.type==="GROUP"&&h.rule_set&&h.rule_set.length?(r(),c("div",We,[n("div",ze,[n("div",$e,[h.rule_set&&h.rule_set.length&&h.rule_set.length>1?(r(),c(T,{key:0},[n("div",{class:"rule-condition-link flex flex-direction-column rule-condition-link-up",style:X({height:(h.rule_set.length*46-70)*.5+"px"})},null,4),_(R,{modelValue:h.condition,"onUpdate:modelValue":E=>h.condition=E,style:{width:"80px"},size:"mini",disabled:a.disabled,class:"mr12"},{default:m(()=>[(r(!0),c(T,null,O(e.conditionOption,(E,u)=>(r(),y(w,{key:E.value+`${u}`,label:E.label,value:E.value},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","disabled"]),n("div",{class:"rule-condition-link rule-condition-link-down",style:X({height:(h.rule_set.length*46-70)*.5+"px"})},null,4)],64)):g("",!0)]),n("div",null,[(r(!0),c(T,null,O(h.rule_set,(E,u)=>(r(),c("div",{key:u,class:"rule flex flex-justify-start"},[_(I,{"rule-item":E,index:u,"events-id":a.eventsId,disabled:a.disabled,"is-operate":!0,"rule-list":h.rule_set,onUpdateValue:(i,b)=>f.changeRuleItem(i,b,h.rule_set),onAddRuleItem:i=>f.addRuleItem(h.rule_set,u),onDelRuleItem:i=>f.delRuleItem(h.rule_set,u,"group",v.rule_set,U)},null,8,["rule-item","index","events-id","disabled","rule-list","onUpdateValue","onAddRuleItem","onDelRuleItem"])]))),128))])]),n("div",He,[a.disabled?g("",!0):(r(),c("div",{key:0,class:"rule-group-item-btn-del",onClick:E=>f.delRuleItem(v.rule_set,U)},Xe,8,Je))])])):h.type==="SINGLE"?(r(),c("div",Qe,[_(I,{"events-id":a.eventsId,disabled:a.disabled,"rule-item":h,"rule-list":v.rule_set,"is-operate":!1,index:U,onUpdateValue:(E,u)=>f.changeRuleItem(E,u,v.rule_set),onAddRuleItem:E=>f.addRuleItem(v.rule_set,U),onDelRuleItem:E=>f.delRuleItem(v.rule_set,U)},null,8,["events-id","disabled","rule-item","rule-list","index","onUpdateValue","onAddRuleItem","onDelRuleItem"])])):g("",!0)]))),128))])]))),128))])]),a.disabled?g("",!0):(r(),c("div",Ze,[n("div",{class:"add-rule-btn flex flex-justify-start flex-align-center",onClick:o[0]||(o[0]=v=>f.addRule("SINGLE",1))},lt),n("div",{class:"add-rule-btn flex flex-justify-start flex-align-center",onClick:o[1]||(o[1]=v=>f.addRule("GROUP",1))},nt)]))])}var ee=Y(Be,[["render",it],["__scopeId","data-v-e45eb00e"]]),ot=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ee});const rt={name:"EventTaskUpdate",components:{"combination-rule":()=>D(()=>Promise.resolve().then(function(){return ot}),void 0),"select-event":()=>D(()=>import("./index.41459e6c.js").then(function(t){return t.b}),["assets/index.41459e6c.js","assets/index.140f4b00.css","assets/word-img.bb3865fc.js","assets/drag.56588ea6.js","assets/plugin-vue_export-helper.21dcd24c.js","assets/vendor.d2559d84.js","assets/index.94e839d6.js","assets/index.ea28890e.css","assets/sortable.esm.81321d43.js"]),CustomerMedia:Q,CustomerMediaListElse:oe},props:{},data(){return{pageType:"add",id:"",form:{end_time:"",end_time_unit:"HOURS",events_id:"",name:"",task_category_id:"",end_time_type:1,writeBackWelcome:{content:"",emojiPopoverVisible:!1,other_content_list:[]},task_rule_json:{}},endTimeUnitOptions:[{label:"\u5C0F\u65F6",value:"HOURS"},{label:"\u5929",value:"DAY"}],rules:{name:[{required:!0,message:"\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0",trigger:"blur"},{max:20,message:"\u957F\u5EA6\u6700\u957F20\u4E2A\u5B57\u7B26",trigger:"blur"}],task_category_id:[{required:!0,message:"\u8BF7\u9009\u62E9\u5206\u7EC4",trigger:["blur","change"]}],events_id:[{required:!0,message:"\u8BF7\u9009\u62E9\u4E8B\u4EF6",trigger:["blur","change"]}],subject_id:[{required:!0,message:"\u8BF7\u9009\u62E9\u4E3B\u4F53",trigger:"blur"}],task_type:[{required:!0,message:"\u8BF7\u9009\u62E9\u4EFB\u52A1\u52A8\u4F5C",trigger:"blur"}],end_time:[{required:!0,message:"\u8BF7\u9009\u62E9\u8F93\u5165\u7ED3\u675F\u65F6\u95F4",trigger:"blur"}]},subjectOptions:[],groupOptions:[],actionOptions:[],isRuleErr:!1,mediaBoxWidth:720}},computed:{showMorerule(){return this.form.events_id&&["edit","add"].includes(this.pageType)?!0:!!(this.form.events_id&&["detail"].includes(this.pageType)&&this.form.task_rule_json.length!==0)}},watch:{},mounted(){console.log("\u8DEF\u7531",this.$route),this.$route&&this.$route.query&&(this.id=this.$route.query.id||"",this.pageType=this.$route.query.type||"add"),["add"].includes(this.pageType)&&(this.form.end_time_unit=this.endTimeUnitOptions[0]&&this.endTimeUnitOptions[0].value,this.form.writeBackWelcome.other_content_list[0]={type:"TEXT",content:""}),["detail","edit"].includes(this.pageType)&&this.getTaskEventForm(),["add","edit"].includes(this.pageType)&&(this.getGroupOptions(),this.getSubjectOptions(),this.getAcionOptions()),this.mediaBoxWidth=document.querySelector(".computed-width").offsetWidth-98},methods:{getImageUrl(t){return new URL({"../../../../assets/images/eventManage/BUSINESS.svg":te,"../../../../assets/images/eventManage/THIRD.svg":le,"../../../../assets/images/eventManage/YOUZAN.svg":se,"../../../../assets/images/eventManage/addGroup.svg":J,"../../../../assets/images/eventManage/addInGroup.svg":z,"../../../../assets/images/eventManage/addItem.svg":H,"../../../../assets/images/eventManage/doc_code.svg":ae,"../../../../assets/images/eventManage/minusInGroup.svg":$,"../../../../assets/images/eventManage/write.svg":ne}[`../../../../assets/images/eventManage/${t}.svg`],self.location).href},subjectChange(){let t=this.form.subject_id,o=this.subjectOptions.filter(a=>a.id===t);o&&o[0]&&(this.form.platform_type=o[0].platform_type)},changeTaskEvent(t){this.form.events_id=t;let o=this.$refs.taskEventCombinationRule&&this.$refs.taskEventCombinationRule.combineRules;o&&o.rule_set&&o.rule_set.length&&this.$confirm("\u53D8\u66F4\u4E8B\u4EF6\u4F1A\u5BFC\u81F4\u66F4\u591A\u6761\u4EF6\u6E05\u7A7A\uFF0C\u8BF7\u786E\u8BA4\u662F\u5426\u53D8\u66F4\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{this.form.task_rule_json={}}).catch(()=>{})},async confirm(){const{mediaList:t,content:o}=await this.paramsFormat(this.form.writeBackWelcome.other_content_list);if(!o){_e.warning("\u6D88\u606F\u5185\u5BB9\u4E0D\u53EF\u4E3A\u7A7A");return}if(!document.querySelector(".rule-box-tip-txt")){if(console.log("\u65E7\u5A92\u4F53\u7EC4\u4EF6\u53C2\u6570",this.form.writeBackWelcome.other_content_list),this.$refs.taskEventCombinationRule){let a=this.$refs.taskEventCombinationRule.combineRules;if(document.querySelector(".rule-item-err")){this.$message.error("\u66F4\u591A\u6761\u4EF6\u9700\u586B\u5145\u5B8C\u6574");return}this.form.task_rule_json=a,console.log(a,"\u6761\u4EF6-----------")}this.$refs.infoForm.validate(a=>{if(a)this.$confirm("\u786E\u8BA4\u63D0\u4EA4\u5185\u5BB9\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{let s=this.form;s.content=o,s.annex_content_json=t,console.log("save====",s),this.pageType=="add"?C.addTaskAdd(s).then(()=>{this.$router.push({name:"eventTask",query:{back_tree_id:this.form.task_category_id}})}).catch(e=>{console.log(e)}):C.updateTask(s).then(()=>{this.$router.push({name:"eventTask"})}).catch(()=>{})}).catch(()=>{});else return!1})}},paramsFormat(t){let o=[],a="";return t.length||Promise.resolve({mediaList:o,content:a}),console.log("\u521D\u59CB\u5316\u524D\u53C2\u6570",t),t.forEach(s=>{let e={};switch(s.type){case"IMAGE":e.type="images",e.source_id=s.file_id,e.upload_url=s.file_url;break;case"VIDEO":e.type="video",e.source_id=s.file_id,e.media_url=s.file_url,e.title=s.title;break;case"LINK":e.type="web_page",e.file_id=s.file_id,e.upload_url=s.file_url,e.url=s.url+s.qw_link_url,e.title=s.qw_link_title,e.description=s.qw_link_desc;break;case"MINIPROGRAM":e.type="we_applets",e.appid=s.qw_miniprogram_appid,e.source_id=s.file_id,e.title=s.qw_miniprogram_title,e.url=s.qw_miniprogram_page,e.upload_url=s.file_url;break;case"FILE":e=s;break;case"TEXT":a=a+s.content;break}JSON.stringify(e)!=="{}"&&o.push(e)}),Promise.resolve({mediaList:o,content:a})},mediaResFormat(t){let o=[];if(t.content){let a={type:"TEXT",content:t.content};o.push(a)}if(console.log("\u5904\u7406\u524D\u6570\u636E",t.annex_content_json),t.annex_content_json&&t.annex_content_json.length){let a=t.annex_content_json;for(let s=0;s<a.length;s++){let e={},f="";switch(a[s].type){case"images":e.type="IMAGE",e.file_id=a[s].source_id,e.sort=s,e.file_url=a[s].upload_url;break;case"web_page":e.type="LINK",e.sort=s,e.file_id=a[s].source_id,e.qw_link_title=a[s].title,e.file_url=a[s].upload_url,e.qw_link_desc=a[s].description,f=a[s].url.split("://"),e.qw_link_url=f[1],e.url=f[0]+"://";break;case"we_applets":e.type="MINIPROGRAM",e.sort=s,e.file_id=a[s].source_id,e.qw_miniprogram_title=a[s].title,e.qw_miniprogram_appid=a[s].appid,e.qw_miniprogram_page=a[s].url,e.file_url=a[s].upload_url;break;case"video":e.sort=s,e.type="VIDEO",e.file_id=a[s].source_id,e.title=a[s].title||"",e.file_url=a[s].media_url;break;case"FILE":e=a[s];break}o.push(e)}}return console.log("\u56DE\u663E\u6570\u636E",o),o},backToList(){this.$confirm("\u5F53\u524D\u9875\u9762\u672A\u4FDD\u5B58\uFF0C\u786E\u5B9A\u79BB\u5F00\u5F53\u524D\u9875\u9762\u5417\uFF1F","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{this.$router.go(-1)}).catch(()=>{})},updateWelcome(){let t=this.$refs.welcomeTextAndFile.info;this.form.writeBackWelcome=t},async getTaskEventForm(){C.getUpdateTask({id:this.$route.query.id}).then(t=>{t.data.author=t.data.creator_name,t.data.subject_id_txt=t.data.subject_name,t.data.task_category_id_txt=t.data.task_category_name,t.data.task_type_txt=t.data.task_type_name,t.data.task_rule_json=t.data&&t.data.task_rule_json,t.data.task_type=parseInt(t.data.task_type);const o=this.mediaResFormat(t.data);t.data.writeBackWelcome={content:t.data.content,content_id:t.data.task_content_id,emojiPopoverVisible:!1,other_content_list:o};let a=t.data,s=this.endTimeUnitOptions.filter(f=>f.value===a.end_time_unit);a.end_time_unit_txt=s[0]&&s[0].label||"";let e=a.task_rule_json||{};if(Object.keys(e)&&Object.keys(e).length&&e.rule_set&&e.rule_set.length){let f=e.rule_set;f=f.map(w=>{if(w.type==="SINGLE"){if(w.field_type!=="OPTIONS"){let[R="",I=""]=w.params||[];w.params=[R,I]}return w}else if(w.type==="GROUP"&&w.rule_set&&w.rule_set.length){let R=w.rule_set.map(I=>{let[v="",j=""]=I.params||[];return I.params=[v,j],I});return w.rule_set=R,w}}),console.log(f)}a.task_rule_json=e,this.form=a,console.log(this.form,"******************")}).catch(()=>{})},getGroupOptions(){C.getListSon().then(t=>{this.groupOptions=t.data||[]}).catch(()=>{})},getSubjectOptions(){C.getTagSubject().then(t=>{this.subjectOptions=t.data||[],this.subjectOptions.length&&["add"].includes(this.pageType)&&(this.form.subject_id=this.subjectOptions[0]&&this.subjectOptions[0].id,this.form.platform_type=this.subjectOptions[0]&&this.subjectOptions[0].platform_type)}).catch(()=>{})},getAcionOptions(){C.getTaskType().then(t=>{this.actionOptions=t.data||[],this.actionOptions.length&&["add"].includes(this.pageType)&&(this.form.task_type=this.actionOptions[0]?this.actionOptions[0].key:"")}).catch(()=>{})}}},N=t=>(G("data-v-7b6eeed0"),t=t(),q(),t),ut={class:"edit-page"},dt={key:0,class:"edit-content-head flex flex-justify-start flex-align-center flex-align-center pl24 pr24"},_t={class:"edit-content-head-item"},ct={class:"edit-content-head-item"},mt={class:"edit-content-head-item"},pt={class:"event-task-detail-wrap"},ft={class:"edit-content-wrap task-event-edit-content-wrap pb24"},bt=N(()=>n("div",{class:"list-title"},[n("div",{class:"list-title-left"},[n("div",{class:"list-title-left-icon mr8"},"1"),n("div",{class:"list-title-left-txt"},"\u57FA\u7840\u4FE1\u606F")])],-1)),ht={class:"list-content pr24"},gt=N(()=>n("span",{class:"mr12"},"\u4EFB\u52A1\u5C06\u5728",-1)),vt=N(()=>n("span",null,"\u540E\u7ED3\u675F",-1)),yt={key:1,class:"list-content-detail"},wt={class:"r-title"},It={class:"r-text"},Rt=N(()=>n("span",{class:"color-label"},"\u9009\u62E9\u5206\u7EC4\uFF1A",-1)),kt={class:"color-txt mr32"},Tt=N(()=>n("span",null,"\u6267\u884C\u7ED3\u675F\u65F6\u95F4\uFF1A",-1)),Et=N(()=>n("span",{class:"color-txt"},"\u6267\u884C\u65F6\u95F4\u5C06\u5728",-1)),xt={class:"color-label"},Ot=N(()=>n("span",{class:"color-txt"},"\u7ED3\u675F",-1)),Vt=N(()=>n("div",{class:"list-title"},[n("div",{class:"list-title-left"},[n("div",{class:"list-title-left-icon mr8"},"2"),n("div",{class:"list-title-left-txt"},"\u89E6\u53D1\u6761\u4EF6")])],-1)),Nt={class:"list-content pr24"},jt={class:"flex"},Mt=N(()=>n("span",null,"\u9ED8\u8BA4\u4E8B\u4EF6\u53D1\u751F\u5219\u89E6\u53D1\u4EFB\u52A1",-1)),Ut={key:1,class:"list-content-detail"},St={class:"r-text mb24"},Pt=N(()=>n("span",{class:"color-label"},"\u4E8B\u4EF6\uFF1A",-1)),Ct={class:"color-txt"},At={class:"task-combination-rule-wrap"},Bt={key:0,class:"el-form-item__error"},Lt=N(()=>n("div",{class:"list-title"},[n("div",{class:"list-title-left"},[n("div",{class:"list-title-left-icon mr8"},"3"),n("div",{class:"list-title-left-txt"},"\u4EFB\u52A1\u52A8\u4F5C")])],-1)),Dt={class:"list-content pr24"},Yt={key:0,class:"custom-subject-el-select-input-icon flex flex-justify-center flex-align-center"},Gt=["src"],qt={class:"custom-subject-option flex flex-justify-start flex-align-center"},Ft={class:"custom-subject-option-img-wrap flex flex-align-center"},Wt=["src"],zt={class:"pl8"},$t={key:1,class:"list-content-detail"},Ht={class:"r-text flex flex-justify-start flex-align-center"},Jt=N(()=>n("span",{class:"color-label"},"\u5E73\u53F0\u6E20\u9053\uFF1A",-1)),Kt=["src"],Xt={class:"color-txt mr"},Qt=N(()=>n("span",{class:"color-label"},"\u4EFB\u52A1\u52A8\u4F5C\uFF1A",-1)),Zt={class:"color-txt"},el=F(" P "),tl={class:"flex flex-justify-end mt16"},ll=F("\u53D6\u6D88"),sl=F(" \u63D0\u4EA4 ");function al(t,o,a,s,e,f){const w=k("el-input"),R=k("el-form-item"),I=k("el-col"),v=k("el-option"),j=k("el-select"),h=k("el-row"),U=k("el-input-number"),E=re,u=ee,i=Q,b=k("CustomerMediaListElse"),V=k("el-button"),L=k("el-form"),S=ce;return r(),c("div",ut,[["edit","detail"].includes(e.pageType)?(r(),c("div",dt,[n("div",_t," \u521B\u5EFA\u6210\u5458\uFF1A"+M(e.form.author||"\u2014"),1),n("div",ct," \u521B\u5EFA\u65F6\u95F4\uFF1A"+M(e.form.create_time||"\u2014"),1),n("div",mt," \u66F4\u65B0\u65F6\u95F4\uFF1A"+M(e.form.update_time||"\u2014"),1)])):g("",!0),_(S,null,{default:m(()=>[n("div",pt,[n("div",ft,[_(L,{ref:"infoForm","label-position":"top","label-width":"80px",model:e.form,rules:e.rules,size:"mini"},{default:m(()=>[bt,n("div",ht,[["edit","add"].includes(e.pageType)?(r(),c(T,{key:0},[_(h,{gutter:20},{default:m(()=>[_(I,{sm:12,md:6,lg:6},{default:m(()=>[_(R,{label:"\u4EFB\u52A1\u540D\u79F0",prop:"name"},{default:m(()=>[_(w,{modelValue:e.form.name,"onUpdate:modelValue":o[0]||(o[0]=p=>e.form.name=p),maxlength:"20","show-word-limit":"",placeholder:"\u8BF7\u8F93\u5165"},null,8,["modelValue"])]),_:1})]),_:1}),_(I,{sm:12,md:6,lg:6},{default:m(()=>[_(R,{label:"\u9009\u62E9\u5206\u7EC4",prop:"task_category_id"},{default:m(()=>[_(j,{modelValue:e.form.task_category_id,"onUpdate:modelValue":o[1]||(o[1]=p=>e.form.task_category_id=p),placeholder:"\u8BF7\u9009\u62E9",style:{width:"100%"}},{default:m(()=>[(r(!0),c(T,null,O(e.groupOptions,p=>(r(),y(v,{key:p.id,label:p.name,value:p.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),_(h,{gutter:20},{default:m(()=>[_(I,{sm:24,md:12,lg:12},{default:m(()=>[_(R,{label:"\u6267\u884C\u7ED3\u675F\u65F6\u95F4",prop:"end_time"},{default:m(()=>[gt,_(U,{modelValue:e.form.end_time,"onUpdate:modelValue":o[2]||(o[2]=p=>e.form.end_time=p),class:"mr4",style:{width:"100px"},placeholder:"\u8BF7\u8F93\u5165",controls:!1,step:1,min:1,"step-strictly":""},null,8,["modelValue"]),_(j,{modelValue:e.form.end_time_unit,"onUpdate:modelValue":o[3]||(o[3]=p=>e.form.end_time_unit=p),placeholder:"\u8BF7\u9009\u62E9",style:{width:"80px"},class:"mr12"},{default:m(()=>[(r(!0),c(T,null,O(e.endTimeUnitOptions,p=>(r(),y(v,{key:p.value,label:p.label,value:p.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),vt]),_:1})]),_:1})]),_:1})],64)):(r(),c("div",yt,[n("div",wt,M(e.form.name||"\u2014"),1),n("div",It,[Rt,n("span",kt,M(e.form.task_category_id_txt||"\u2014"),1),Tt,Et,n("span",xt," \xA0"+M(e.form.end_time)+M(e.form.end_time_unit_txt)+"\xA0 ",1),Ot])]))]),Vt,n("div",Nt,[["edit","add"].includes(e.pageType)?(r(),y(h,{key:0,gutter:20},{default:m(()=>[_(I,{sm:24,md:12,lg:12},{default:m(()=>[_(R,{label:"\u4E8B\u4EF6",prop:"events_id"},{default:m(()=>[n("div",jt,[_(E,{modelValue:e.form.events_id,"onUpdate:modelValue":o[4]||(o[4]=p=>e.form.events_id=p),class:"mr12",onChangeTaskEvent:f.changeTaskEvent},null,8,["modelValue","onChangeTaskEvent"]),Mt])]),_:1})]),_:1})]),_:1})):g("",!0),["detail"].includes(e.pageType)?(r(),c("div",Ut,[n("div",St,[Pt,n("span",Ct,M(e.form.events_name||"\u2014"),1)])])):g("",!0),f.showMorerule?(r(),y(h,{key:2,gutter:20},{default:m(()=>[_(I,{sm:24,md:24,lg:24},{default:m(()=>[_(R,{label:"\u66F4\u591A\u6761\u4EF6"},{default:m(()=>[n("div",At,[_(u,{ref:"taskEventCombinationRule",modelValue:e.form.task_rule_json,"onUpdate:modelValue":o[5]||(o[5]=p=>e.form.task_rule_json=p),disabled:["detail"].includes(e.pageType),"base-combine-rules":e.form.task_rule_json,"events-id":e.form.events_id},null,8,["modelValue","disabled","base-combine-rules","events-id"])]),e.isRuleErr?(r(),c("div",Bt," \u66F4\u591A\u6761\u4EF6\u9700\u586B\u5145\u5B8C\u6574 ")):g("",!0)]),_:1})]),_:1})]),_:1})):g("",!0)]),Lt,n("div",Dt,[["edit","add"].includes(e.pageType)?(r(),y(h,{key:0,gutter:20},{default:m(()=>[_(I,{sm:12,md:6,lg:6},{default:m(()=>[_(R,{label:"\u9009\u62E9\u4E3B\u4F53",prop:"subject_id"},{default:m(()=>[_(j,{modelValue:e.form.subject_id,"onUpdate:modelValue":o[6]||(o[6]=p=>e.form.subject_id=p),placeholder:"\u8BF7\u9009\u62E9",style:{width:"100%"},class:x(["custom-subject-el-select",e.form.subject_id?"select-text":"select-empty"]),onChange:f.subjectChange},{prefix:m(()=>[e.form.subject_id?(r(),c("div",Yt,[e.form.platform_type?(r(),c("img",{key:0,class:"img",src:f.getImageUrl(e.form.platform_type),alt:""},null,8,Gt)):g("",!0)])):g("",!0)]),default:m(()=>[(r(!0),c(T,null,O(e.subjectOptions,p=>(r(),y(v,{key:p.id,label:p.name,value:p.id},{default:m(()=>[n("div",qt,[n("div",Ft,[p.platform_type?(r(),c("img",{key:0,class:"img",src:f.getImageUrl(p.platform_type),alt:""},null,8,Wt)):g("",!0)]),n("div",zt,M(p.name),1)])]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue","class","onChange"])]),_:1})]),_:1}),_(I,{sm:12,md:6,lg:6},{default:m(()=>[_(R,{label:"\u4EFB\u52A1\u52A8\u4F5C",prop:"task_type"},{default:m(()=>[_(j,{modelValue:e.form.task_type,"onUpdate:modelValue":o[7]||(o[7]=p=>e.form.task_type=p),placeholder:"\u8BF7\u9009\u62E9",style:{width:"100%"}},{default:m(()=>[(r(!0),c(T,null,O(e.actionOptions,p=>(r(),y(v,{key:p.key,label:p.value,value:p.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})):g("",!0),["detail"].includes(e.pageType)?(r(),c("div",$t,[n("div",Ht,[Jt,e.form.platform_type?(r(),c("img",{key:0,class:"r-text-img",src:f.getImageUrl(e.form.platform_type)},null,8,Kt)):g("",!0),n("span",Xt,M(e.form.subject_id_txt),1),Qt,n("span",Zt,M(e.form.task_type_txt),1),el])])):g("",!0),_(h,{gutter:20},{default:m(()=>[_(I,{sm:24,md:12,lg:12,class:"computed-width"},{default:m(()=>[_(R,{label:"\u6D88\u606F\u5185\u5BB9"},{default:m(()=>[["add","edit"].includes(e.pageType)?(r(),y(i,{key:0,modelValue:e.form.writeBackWelcome.other_content_list,"onUpdate:modelValue":o[8]||(o[8]=p=>e.form.writeBackWelcome.other_content_list=p),"event-select-show":!0,"events-id":e.form.events_id,"media-content-width":e.mediaBoxWidth,"page-type":"taskEdit","hidden-btns":["TEXT","FILE"],"text-limit":800},null,8,["modelValue","events-id","media-content-width"])):g("",!0),["detail"].includes(e.pageType)?(r(),y(b,{key:1,list:e.form.writeBackWelcome.other_content_list,"check-list":!0},null,8,["list"])):g("",!0)]),_:1})]),_:1})]),_:1}),["edit","add"].includes(e.pageType)?(r(),y(h,{key:2,gutter:20},{default:m(()=>[_(I,{sm:24,md:12,lg:12},{default:m(()=>[n("div",tl,[_(V,{size:"mini",onClick:f.backToList},{default:m(()=>[ll]),_:1},8,["onClick"]),_(V,{size:"mini",type:"primary",onClick:f.confirm},{default:m(()=>[sl]),_:1},8,["onClick"])])]),_:1})]),_:1})):g("",!0)])]),_:1},8,["model","rules"])])])]),_:1})])}var gl=Y(rt,[["render",al],["__scopeId","data-v-7b6eeed0"]]);export{gl as default};
