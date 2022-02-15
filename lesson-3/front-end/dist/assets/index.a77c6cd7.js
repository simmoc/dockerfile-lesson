
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
var ce=Object.defineProperty,de=Object.defineProperties;var ue=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var W=(t,a,e)=>a in t?ce(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,q=(t,a)=>{for(var e in a||(a={}))pe.call(a,e)&&W(t,e,a[e]);if(P)for(var e of P(a))ge.call(a,e)&&W(t,e,a[e]);return t},I=(t,a)=>de(t,ue(a));import{_ as me}from"./index.a5dee889.js";import{_ as ve}from"./index.333b158c.js";import{_ as fe}from"./index.6ba23372.js";import{_ as he}from"./index.f1e12eef.js";import{r as k,a as r,q as d,t as _,K as ye,J as D,A as C,R as F,S as E,c as T,D as X,y as c,P as xe,O as ke,M as u,o as be,a6 as J,L as m,z as i,E as Ce,B as Te,H as b,F as Se,G as Ne}from"./vendor.d2559d84.js";import{H,b as we}from"./index.94e839d6.js";import{N as ze}from"./index.4c9825d9.js";import{_ as R}from"./plugin-vue_export-helper.21dcd24c.js";import{_ as Le}from"./index.5931791c.js";const je={name:"CustomerTreeNode",inject:["RootTree"],props:{node:{type:Object,default(){return{}}},level:{type:Number,default(){return 1}},index:{type:Number,default:0},parent:{type:Object,default(){return{}}},cancelChecked:{type:Function,default:()=>{}}},data(){return{}},computed:{},watch:{},created(){},methods:{async toggleExpand(t){t.tag_value_arr||this.cancelChecked(),this.$nextTick(()=>{t.expand=!t.expand,t.expand&&!t.tag_value_arr&&this.RootTree.handleTreeLeafClick(I(q({},t),{tag_group_name:this.parent.tag_group_name,tag_type:this.parent.tag_type}))})}}},De={class:"customer-tree-node"},Fe={key:0,class:"node-leaf"},Ee={class:"node_name"},Ve={class:"ml-20 node_num"},$e={key:1},Oe={class:"node_name"};function qe(t,a,e,l,y,S){const f=k("customer-tree-node",!0);return r(),d("div",De,[_("div",{class:D(["p-l-16",{is_checked:e.node.expand&&!e.node.tag_value_arr,"second-level":e.level===1}])},[_("div",{class:"customer-tree-level",style:ye({"padding-left":e.level*10+"px"}),onClick:a[0]||(a[0]=p=>S.toggleExpand(e.node,e.level))},[_("i",{ref:"icon",class:D(["el-tree-expand-icon el-icon-caret-right",{"icon-visibility":!e.node.tag_value_arr,expand:e.node.expand}])},null,2),e.node.tag_value_arr?(r(),d("div",$e,[_("span",Oe,C(e.node.tag_group_name||e.node.name),1)])):(r(),d("div",Fe,[_("span",Ee,C(e.node.tag_group_name||e.node.name),1),_("span",Ve,C(e.node.sale_script_num),1)]))],4)],2),(r(!0),d(F,null,E(e.node.tag_value_arr,(p,v)=>(r(),d("div",{key:v},[e.node.expand?(r(),T(f,{key:p.name||p.tag_group_name+v,node:p,parent:e.node,level:e.level+1,index:v,"cancel-checked":e.cancelChecked},null,8,["node","parent","level","index","cancel-checked"])):X("",!0)]))),128))])}var Y=R(je,[["render",qe],["__scopeId","data-v-70295e5c"]]);const Ie={name:"CustomerTree",components:{CustomerTreeNode:Y},provide(){return{RootTree:{handleTreeLeafClick:this.handleTreeLeafClick}}},props:{data:{type:Array,default:()=>[]},select:{type:Boolean,default:!0}},emits:["handle-tree-leaf-click","handle-tree-click"],data(){return{treeData:[]}},watch:{data:{handler(t){let a=JSON.parse(JSON.stringify(t));a.length>0&&this.initExpand(a,0),this.treeData=a},deep:!0}},methods:{handleTreeLeafClick(t){this.$emit("handle-tree-leaf-click",t)},initExpand(t,a,e){t.forEach(l=>{l.expand=!1,a===0&&(l.expand=!0),l.tag_value_arr&&l.tag_value_arr.length>0?this.initExpand(l.tag_value_arr,a+1,e):l.expand=!1})},recursiveNode(t,a,e){t.forEach(l=>{l.tag_value_arr&&l.tag_value_arr.length>0?this.recursiveNode(l.tag_value_arr,a,l):a(l,e)})},cancelLeafChecked(t){this.recursiveNode(this.treeData,a=>{a.expand=t})},selectItem(t,a){this.$nextTick(()=>{this.recursiveNode(this.treeData,(e,l)=>{e.tag_id===t.tag_id&&(e.expand=a,l.expand=a,this.handleTreeLeafClick(I(q({},t),{tag_group_name:l.tag_group_name,tag_type:l.tag_type})))})})}}},Je={key:0},He={key:1,class:"no-data"};function Re(t,a,e,l,y,S){const f=Y;return r(),d("div",null,[y.treeData.length>0?(r(),d("div",Je,[(r(!0),d(F,null,E(y.treeData,(p,v)=>(r(),d("div",{key:v},[c(f,{ref_for:!0,ref:"customerTreeNode",node:p,level:0,index:v,class:D(["custom-tree",{"color-orange":v===1}]),"cancel-checked":()=>S.cancelLeafChecked(!1)},null,8,["node","index","class","cancel-checked"])]))),128))])):(r(),d("div",He," \u6682\u65E0\u6570\u636E "))])}var Be=R(Ie,[["render",Re],["__scopeId","data-v-2ae5879b"]]);const B=t=>(Se("data-v-09f23952"),t=t(),Ne(),t),Ke={class:"search-form"},Ue=b("\u91CD\u7F6E"),Ae=b("\u67E5\u8BE2"),Me={class:"flex"},Qe={class:"table-search-box"},Ge={class:"table-tree"},Pe={class:"",style:{"flex-grow":"1","flex-shrink":"1"}},We={class:"table-top-area"},Xe={class:"tr"},Ye=b(" \u6DFB\u52A0\u6807\u7B7E\u8425\u9500 "),Ze={key:0},et={key:0},tt={class:"member-info-content"},at={key:0},lt={class:"member-tag-pop"},nt=B(()=>_("span",null,"...",-1)),st=b(" \u7F16\u8F91 "),ot=b(" \u5220\u9664 "),rt={key:1,class:"table-blank"},it=B(()=>_("div",null,"\u6682\u65E0\u6807\u7B7E\uFF0C\u8BF7\u53BB\u6807\u7B7E\u5E93\u6DFB\u52A0\u6807\u7B7E\uFF01",-1)),_t=b(" \u53BB\u603B\u90E8\u6807\u7B7E\u5E93 "),ct=b(" \u53BB\u670D\u52A1\u6807\u7B7E\u5E93 "),dt=B(()=>_("div",{class:"group_name"},"\u662F\u5426\u5220\u9664\u8BE5\u6807\u7B7E\u8425\u9500?",-1)),ut={setup(t){const a=xe(),e=ke();let l=u({search_content:"",page_num:1,page_size:10});const y=u(""),S=u([{label:"\u5185\u5BB9",prop:"content",type:"slot",width:500},{label:"\u6807\u7B7E",prop:"tag_arr",type:"slot",width:500}]);let f=u([]);const p=u(""),v=u(0);let N=u([]);const z=u(null);let L=u(!1);const V=u(!0),h=u({}),$=u({}),K=u("");be(()=>{$.value=e.query.selected?JSON.parse(e.query.selected)[0]:{},w()});const Z=()=>{L.value=!1},w=async()=>{N.value=[];let{data:n}=await H.getTagScriptList({search_content:l.value.search_content,search_tag_name:p.value});if(n.hq_list&&N.value.push({id:"\u603B\u90E8\u6807\u7B7E",name:"\u603B\u90E8\u6807\u7B7E",tag_value_arr:n.hq_list}),n.service_list&&N.value.push({id:"\u670D\u52A1\u6807\u7B7E",name:"\u670D\u52A1\u6807\u7B7E",tag_value_arr:n.service_list}),console.log(N.value),n.hq_list.length===0&&n.service_list.length===0&&(V.value=!1),console.log("111",h.value),h.value.tag_id)J(()=>{z.value.selectItem(h.value,!0,!0)});else if(p.value||l.value.search_content){let o=null;n.hq_list&&n.hq_list.length>0?o=n.hq_list[0].tag_value_arr[0]:n.service_list&&n.service_list.length>0&&(o=n.service_list[0].tag_value_arr[0]),console.log(111,o),o&&J(()=>{z.value.selectItem(o,!0,!0)})}else JSON.stringify($.value)!=="{}"&&J(()=>{z.value.selectItem($.value,!0,!0)})},ee=()=>{l.value={search_content:"",tag_id:"",page_num:1,page_size:10},p.value="",w(),f.value=[],h.value={},a.replace({name:"labelSale"})},U=()=>{w()},te=we(()=>w()),A=async()=>{f.value=[];let n=await H.getSaleTagScriptList({page_num:l.value.page_num,page_size:l.value.page_size,search_content:l.value.search_content,tag_id:l.value.tag_id});n.code===200&&(f.value=n.data.list,v.value=n.data.total_num,f.value.length===0?y.value="\u6682\u65E0\u6570\u636E":y.value="\u8BF7\u9009\u62E9\u5DE6\u4FA7\u6807\u7B7E")},j=(n,o)=>{console.log(o),a.push({name:n,query:o})},ae=n=>{h.value=n,l.value.tag_id=n.tag_id,A()},le=n=>{L.value=!0,console.log(n),K.value=n},ne=async n=>{(await H.deleteTagSaleScript({sale_script_id:n})).code===200&&(L.value=!1,Ce.success("\u5220\u9664\u6210\u529F"),w())};return(n,o)=>{const M=k("el-input"),Q=k("el-form-item"),x=k("el-button"),se=k("el-form"),G=k("el-popover"),O=me,oe=k("el-table-column"),re=ve,ie=fe,_e=he;return r(),d("div",null,[_("div",Ke,[c(se,{inline:!0,model:m(l),"label-position":"right","label-width":"120px",size:"small",class:"search-form-margin"},{default:i(()=>[c(Q,{label:"\u6587\u672C\u5185\u5BB9\uFF1A"},{default:i(()=>[c(M,{modelValue:m(l).search_content,"onUpdate:modelValue":o[0]||(o[0]=s=>m(l).search_content=s),placeholder:"\u8BF7\u8F93\u5165\u6587\u672C\u5185\u5BB9",style:{width:"274px"},onKeyup:Te(U,["enter"])},null,8,["modelValue","onKeyup"])]),_:1}),c(Q,null,{default:i(()=>[c(x,{type:"default",onClick:ee},{default:i(()=>[Ue]),_:1}),c(x,{type:"primary",onClick:U},{default:i(()=>[Ae]),_:1})]),_:1})]),_:1},8,["model"])]),c(_e,{class:"flex flex-direction-column"},{default:i(()=>[_("div",Me,[_("div",Qe,[c(M,{modelValue:p.value,"onUpdate:modelValue":o[1]||(o[1]=s=>p.value=s),placeholder:"\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0",size:"small",class:"table-search-input",onInput:o[2]||(o[2]=s=>m(te)(s))},null,8,["modelValue"]),_("div",Ge,[c(Be,{ref_key:"customerTree",ref:z,data:m(N),onHandleTreeLeafClick:ae},null,8,["data"])])]),_("div",Pe,[_("div",We,[_("div",Xe,[V.value?(r(),T(x,{key:0,icon:"el-icon-plus",type:"primary",size:"small","data-isSet":"1",onClick:o[3]||(o[3]=s=>j("labelSaleAdd",{selected:JSON.stringify(h.value)==="{}"?"":JSON.stringify(h.value)}))},{default:i(()=>[Ye]),_:1})):X("",!0)])]),V.value?(r(),d("div",Ze,[c(re,{"table-title":S.value,"table-data":m(f),"need-pagination":!0,class:D(["customer-tree",{"is-collapse":n.$store.state.settings.mode==="pc"&&n.$store.state.settings.sidebarCollapse}]),"empty-text":y.value},{content:i(s=>[s.data.content.length<=34?(r(),d("div",et,C(s.data.content),1)):(r(),T(G,{key:1,placement:"bottom",width:"400",trigger:"hover","popper-class":"member-info-pop"},{reference:i(()=>[_("div",tt,C(s.data.content.substring(0,40))+"... ",1)]),default:i(()=>[_("span",null,C(s.data.content),1)]),_:2},1024))]),tag_arr:i(s=>[s.data.tag_arr.length<=1?(r(),d("div",at,[(r(!0),d(F,null,E(s.data.tag_arr,g=>(r(),T(O,{key:g.tag_name,"left-title":g.tag_group_name,"right-title":g.tag_name,color:g.tag_group_type==="HQ"?"#409eff":"#FF6F00","customer-style":{"margin-bottom":0}},null,8,["left-title","right-title","color"]))),128))])):(r(),T(G,{key:1,placement:"bottom",trigger:"hover","popper-class":"key-word-pop",height:"325",width:"542"},{reference:i(()=>[_("div",null,[c(O,{"left-title":s.data.tag_arr[0].tag_group_name,"right-title":s.data.tag_arr[0].tag_name,color:s.data.tag_arr[0].tag_group_type==="HQ"?"#409eff":"#FF6F00","customer-style":{"margin-bottom":0}},null,8,["left-title","right-title","color"]),nt])]),default:i(()=>[_("div",lt,[(r(!0),d(F,null,E(s.data.tag_arr,g=>(r(),T(O,{key:g.tag_name,"left-title":g.tag_group_name,"right-title":g.tag_name,color:g.tag_group_type==="HQ"?"#409eff":"#FF6F00","right-text-break":!1,"right-text-auto":!0},null,8,["left-title","right-title","color"]))),128))])]),_:2},1024))]),default:i(()=>[c(oe,{label:"\u64CD\u4F5C",prop:"","show-overflow-tooltip":"",fixed:"right",width:"200px"},{default:i(({row:s})=>[c(x,{type:"text",size:"mini",onClick:g=>j("labelSaleEdit",{sale_script_id:s.sale_scrip_id,selected:JSON.stringify(h.value)})},{default:i(()=>[st]),_:2},1032,["onClick"]),c(x,{type:"text",size:"mini",onClick:g=>le(s.sale_scrip_id)},{default:i(()=>[ot]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["table-title","table-data","empty-text","class"]),c(ie,{page:m(l).page_num,"onUpdate:page":o[4]||(o[4]=s=>m(l).page_num=s),limit:m(l).page_size,"onUpdate:limit":o[5]||(o[5]=s=>m(l).page_size=s),total:v.value,"get-data":A},null,8,["page","limit","total"])])):(r(),d("div",rt,[c(ze,null,{content:i(()=>[it]),button:i(()=>[c(x,{type:"primary",size:"small",onClick:o[6]||(o[6]=s=>j("iframe-customer-hq_tags"))},{default:i(()=>[_t]),_:1}),c(x,{type:"primary",size:"small",onClick:o[7]||(o[7]=s=>j("iframe-customer-service_tags"))},{default:i(()=>[ct]),_:1})]),_:1})]))])])]),_:1}),c(Le,{title:"\u63D0\u793A","dialog-visible":m(L),width:"400px","confirm-fn":()=>ne(K.value),onCancel:Z},{default:i(()=>[dt]),_:1},8,["dialog-visible","confirm-fn"])])}}};var Ct=R(ut,[["__scopeId","data-v-09f23952"]]);export{Ct as default};