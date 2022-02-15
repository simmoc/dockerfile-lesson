
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as C}from"./index.a5dee889.js";import{r as g,a as r,q as n,t as i,A as h,D as m,R as d,S as u,c as x,z as p,H as q,J as k,y as f,C as v,F as N,G as b}from"./vendor.d2559d84.js";import{b as w,H as D}from"./index.94e839d6.js";import{_ as j}from"./plugin-vue_export-helper.21dcd24c.js";const B={name:"CustomerSelect",components:{customerTag:C},props:{modelValue:{type:Array},treeData:{type:Array,default:()=>[]},editSelectList:{type:Array,default:()=>[]}},emits:["update:modelValue","closeTag"],data(){return{expand:!1,leafShow:!1,selectList:[],searchContent:"",searchTreeData:[],hq_list:[],service_list:[],leafNode:{}}},computed:{},watch:{treeData:{handler(a){let e=JSON.parse(JSON.stringify(a));this.initSetChecked(e,0),this.$route.query.sale_script_id&&this.getLeafData(e[0].childrens[0])},deep:!0},editSelectList:{handler(a){console.log("\u83B7\u53D6\u5230\u7236\u5143\u7D20\u9009\u4E2D",a);let e=JSON.parse(JSON.stringify(a));this.selectList=e,this.initSetChecked(e,0),console.log(e),this.selectedParentChecked(),this.$emit("update:modelValue",e)},deep:!0,immediate:!0}},mounted(){let a=this;document.body.addEventListener("click",function(e){let t=document.getElementsByClassName("customer-select")[0];e.path.includes(t)?a.expand=!0:a.expand=!1})},created(){this.getTagSearch()},methods:{search:w(function(a){console.log("searchbounce val",a),this.getTagSearch(a)}),async getTagSearch(a){let{data:e}=await D.getCalendarTag({search_content:a});if(a){let t=[];e.hq_list&&(e.hq_list.length>0&&e.hq_list.forEach(c=>{c.tag_value_arr&&c.tag_value_arr.forEach(s=>{t.push({label:`\u603B\u90E8\u6807\u7B7E/${c.tag_group_name}/${s.name}`,tag_id:s.tag_id,name:s.name,tag_type:c.tag_type,tag_group_name:c.tag_group_name,checked:!1})})}),e.service_list.length>0&&e.service_list.forEach(c=>{c.tag_value_arr&&c.tag_value_arr.forEach(s=>{t.push({label:`\u670D\u52A1\u6807\u7B7E/${c.tag_group_name}/${s.name}`,tag_id:s.tag_id,name:s.name,tag_type:c.tag_type,tag_group_name:c.tag_group_name,checked:!1})})}),this.selectList.length>0&&this.selectList.forEach(c=>{t.forEach(s=>{c.tag_id===s.tag_id&&(s.checked=!0)})}),this.searchTreeData=t)}else this.hq_list=e.hq_list,this.service_list=e.service_list,this.selectList.forEach(t=>{this.changeChecked(this.hq_list,t.tag_id,!0)}),this.selectList.forEach(t=>{this.changeChecked(this.selectList,t.tag_id,!0)}),this.selectList.forEach(t=>{this.hq_list.forEach(c=>{t.tag_group_name===c.tag_group_name&&(c.checked=!0)}),this.service_list.forEach(c=>{t.tag_group_name===c.tag_group_name&&(c.checked=!0)})})},closeTag(a,e){this.selectList.splice(a,1),this.changeChecked(e.tag_type=="HQ"?this.hq_list:this.service_list,e.tag_id,!1),this.hq_list.forEach(t=>{t.checked=!1}),this.service_list.forEach(t=>{t.checked=!1}),this.selectList.forEach(t=>{this.hq_list.forEach(c=>{t.tag_group_name===c.tag_group_name&&(c.checked=!0)}),this.service_list.forEach(c=>{t.tag_group_name===c.tag_group_name&&(c.checked=!0)})}),console.log("closeTag",this.selectList),this.$emit("update:modelValue",this.selectList),this.$emit("closeTag")},getChecked(a,e,t,c){if(e.tag_group_name=t,e.tag_type=c,a)this.selectList.push(e);else{let s=this.getNodeKey(this.selectList,e.tag_id,"tag_id");this.selectList.splice(s,1)}this.hq_list.forEach(s=>{s.checked=!1}),this.service_list.forEach(s=>{s.checked=!1}),this.selectedParentChecked(),console.log("getChecked",this.selectList),this.$emit("update:modelValue",this.selectList)},selectedParentChecked(){this.selectList.forEach(a=>{this.hq_list.forEach(e=>{a.tag_group_name===e.tag_group_name&&(e.checked=!0),e.tag_value_arr.forEach(t=>{a.tag_id===t.tag_id&&(t.checked=!0)})}),this.service_list.forEach(e=>{a.tag_group_name===e.tag_group_name&&(e.checked=!0),e.tag_value_arr.forEach(t=>{a.tag_id===t.tag_id&&(t.checked=!0)})})})},getLeafData(a){this.initSetExpand(this.hq_list,!1),this.initSetExpand(this.service_list,!1),a.expand=!0,this.leafNode={tag_group_name:a.tag_group_name,tag_type:a.tag_type,tag_value_arr:a.tag_value_arr}},initSetExpand(a,e){a.forEach(t=>{t.expand=!1,t.tag_value_arr&&t.tag_value_arr.length>0&&this.initSetExpand(t.tag_value_arr,e)})},initSetChecked(a,e){a.forEach(t=>{t.expand=!1,e===0&&(t.expand=!0),t.childrens&&t.childrens.length>0?this.initSetChecked(t.childrens,e+1):t.checked=!1})},getNodeKey(a,e,t){let c="";return a.forEach((s,_)=>{s[t]===e&&(c=_),s.childrens&&s.childrens.length>0&&this.getNodeKey(s.childrens,e,t)}),c},changeChecked(a,e,t,c="tag_id"){a.forEach(s=>{s[c]===e?s.checked=t:s.tag_value_arr&&s.tag_value_arr.length>0&&this.changeChecked(s.tag_value_arr,e,t)})}}},E=a=>(N("data-v-13aea19e"),a=a(),b(),a),F={class:"customer-select"},H={key:0,class:"customer-placeholder"},I={class:"el-input__suffix"},J={class:"el-input__suffix-inner"},U={key:0,class:"select-content"},z={class:"select-bg"},A={key:0,class:"select-main"},O={class:"select-ul"},K=E(()=>i("div",{class:"head-level"},"\u603B\u90E8\u6807\u7B7E",-1)),P=["onClick"],Q={class:"tag-name"},G=E(()=>i("div",{class:"head-level"},"\u670D\u52A1\u6807\u7B7E",-1)),M=["onClick"],R={class:"tag-name"},W={class:"zw-content"},X={class:"leaf-name"},Y={key:1,class:"select-search-main"},Z={key:0,class:"select-search-ul"},$={class:"member-name"},ee={key:1};function te(a,e,t,c,s,_){const L=C,S=g("el-tag"),V=g("el-input"),y=g("el-checkbox"),T=g("el-collapse-transition");return r(),n("div",F,[i("div",null,[i("div",{class:"customer-input flex flex-align-center",onClick:e[0]||(e[0]=l=>s.expand=!s.expand)},[s.selectList.length===0?(r(),n("span",H," \u8BF7\u9009\u62E9\u6807\u7B7E"+h(a.treeChecked),1)):m("",!0),(r(!0),n(d,null,u(s.selectList.slice(0,1),(l,o)=>(r(),x(L,{key:l.id,"left-title":l.tag_group_name,"right-title":l.name,"show-close":!0,color:l.tag_type==="HQ"?"#409eff":"#FF6F00","customer-style":{"margin-bottom":"10px"},onCloseTag:se=>_.closeTag(o,l)},null,8,["left-title","right-title","color","onCloseTag"]))),128)),s.selectList.length>1?(r(),x(S,{key:1,type:"info",size:"mini"},{default:p(()=>[q(" +"+h(s.selectList.length-1),1)]),_:1})):m("",!0)]),i("span",I,[i("span",J,[i("i",{class:k(["el-select__caret el-input__icon el-icon-arrow-down",{expand:s.expand}])},null,2)])])]),f(T,null,{default:p(()=>[s.expand?(r(),n("div",U,[i("div",z,[f(V,{modelValue:s.searchContent,"onUpdate:modelValue":e[1]||(e[1]=l=>s.searchContent=l),class:"select-search",placeholder:"\u8BF7\u8F93\u5165",onInput:e[2]||(e[2]=l=>_.search(l))},null,8,["modelValue"]),s.searchContent?(r(),n("div",Y,[s.searchTreeData.length>0?(r(),n("ul",Z,[(r(!0),n(d,null,u(s.searchTreeData,l=>(r(),n("li",{key:l.id},[f(y,{modelValue:l.checked,"onUpdate:modelValue":o=>l.checked=o,onChange:o=>_.getChecked(o,l,l.tag_group_name,l.tag_type)},{default:p(()=>[i("span",$,h(l.label),1)]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]))),128))])):(r(),n("div",ee,"\u6682\u65E0\u6570\u636E"))])):(r(),n("div",A,[i("ul",O,[i("li",null,[K,i("ul",null,[(r(!0),n(d,null,u(s.hq_list,l=>(r(),n("li",{key:l.tag_group_id,class:"flex flex-justify-between flex-align-center tag-group",onClick:v(o=>_.getLeafData(l),["stop"])},[i("span",Q,h(l.tag_group_name),1),i("i",{class:k(["el-icon-arrow-right",{"tag-checked":l.checked}])},null,2)],8,P))),128))])]),i("li",null,[G,i("ul",null,[(r(!0),n(d,null,u(s.service_list,l=>(r(),n("li",{key:l.tag_group_id,class:"flex flex-align-center flex-justify-between tag-group",onClick:v(o=>_.getLeafData(l),["stop"])},[i("span",R,h(l.tag_group_name),1),i("i",{class:k(["el-icon-arrow-right",{"tag-checked":l.checked}])},null,2)],8,M))),128))])])]),i("ul",W,[(r(!0),n(d,null,u(s.leafNode.tag_value_arr,l=>(r(),n("li",{key:l.tag_id,onClick:e[3]||(e[3]=v(()=>{},["stop"]))},[f(y,{modelValue:l.checked,"onUpdate:modelValue":o=>l.checked=o,onChange:o=>_.getChecked(o,l,s.leafNode.tag_group_name,s.leafNode.tag_type)},{default:p(()=>[i("span",X,h(l.name),1)]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]))),128))])]))])])):m("",!0)]),_:1})])}var re=j(B,[["render",te],["__scopeId","data-v-13aea19e"]]);export{re as default};
