
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{g as R}from"./index.94e839d6.js";import{_ as $}from"./plugin-vue_export-helper.21dcd24c.js";import{M as m,r as d,a5 as j,a as t,q as o,v as z,c as i,z as s,D as w,R as _,S as F,a9 as L,V as h,y as v,H as K,A as r,L as P,t as W}from"./vendor.d2559d84.js";const q={class:"customer-table"},E={key:1},M={key:2},G={key:0},J={class:"overflow-ellipsis",style:{display:"inline-block",width:"100%"}},O={key:1},Q={key:3},U={key:4},X={key:5},Y={key:6},Z={props:{tableTitle:{type:Array,default:()=>[]},tableData:{type:Array,default:()=>[]},loading:{type:Boolean,default:!1},needSelect:{type:Boolean,default:!1},needIndex:{type:Boolean,default:!1},headerAlign:{type:String,default:"left"},align:{type:String,default:"left"},needPagination:{type:Boolean,default:!0},showSummary:{type:Boolean,default:!1},checkSelectable:{type:Function,default:null},getSummaries:{type:Function,default:null},maxHeight:{type:[String,Number],default:null},height:{type:[String,Number],default:null},emptyText:{type:String,default:"\u6682\u65E0\u6570\u636E"},reserveSelection:{type:Boolean,default:!1},rowKey:{type:String,default:""}},emits:["handleClick","handleSelect"],setup(l,{expose:b,emit:y}){const f=l,u=m(null),g=m([]);b({clearTableSelect:C,selecteList:g,handleToggleRowSelection:B});function k(n){return n+(f.page-1)*parseInt(f.page_size)+1}function S(n,c){y("handleClick",{data:n,prop:c})}function x(n){g.value=n,y("handleSelect",n)}function B(n,c){u.value.toggleRowSelection(n,c)}function C(){u.value.clearSelection()}function T(n){return n.id}return(n,c)=>{const p=d("el-table-column"),D=d("el-button"),N=d("el-tooltip"),A=d("el-popover"),I=d("el-table"),V=j("loading");return t(),o("div",q,[z((t(),i(I,{ref_key:"customerTable",ref:u,"header-cell-style":{background:"#f4f4f5"},size:"small","tooltip-effect":"dark",data:l.tableData,"max-height":l.maxHeight,height:l.height,style:{width:"100%","margin-bottom":"16px","margin-top":"16px"},"summary-method":l.getSummaries,"show-summary":l.showSummary,"empty-text":l.emptyText,"row-key":T,onSelectionChange:x},{default:s(()=>[l.needIndex?(t(),i(p,{key:0,type:"index",index:k,width:"50",label:"\u5E8F\u53F7","header-align":"center",align:"center"})):w("",!0),l.needSelect?(t(),i(p,{key:1,type:"selection",width:"55",selectable:l.checkSelectable,"reserve-selection":l.reserveSelection},null,8,["selectable","reserve-selection"])):w("",!0),(t(!0),o(_,null,F(l.tableTitle,(e,H)=>(t(),i(p,{key:H,prop:e.prop,label:e.label,"header-align":l.headerAlign,align:l.align,fixed:e.fixed,width:e.width,"min-width":e.minWidth},L({default:s(a=>[e.type==="slot"?h(n.$slots,e.prop,{key:0,data:a.row,width:e.width},void 0,!0):e.type==="button"?(t(),o("div",E,[v(D,{type:"text ",onClick:ee=>S(a.row,e.prop)},{default:s(()=>[K(r(a.row[e.prop]),1)]),_:2},1032,["onClick"])])):e.type==="tooltip"?(t(),o("div",M,[a.row[e.prop]?(t(),o(_,{key:0},[P(R)(a.row[e.prop])<e.width-20?(t(),o("span",G,r(a.row[e.prop]),1)):(t(),i(N,{key:1,content:a.row[e.prop],placement:"bottom",effect:"light"},{default:s(()=>[W("span",J,r(a.row[e.prop]),1)]),_:2},1032,["content"]))],64)):(t(),o("div",O,"--"))])):e.type==="popover"?(t(),o("div",Q,[v(A,{placement:"top-start",title:"",width:"300",trigger:"hover"})])):e.type==="merge"?(t(),o("div",U,r(a.row[e.prop])+"/"+r(a.row[e.mergeProp]),1)):a.row[e.prop]===""?(t(),o("div",X,"-")):(t(),o("div",Y,r(a.row[e.prop]),1))]),_:2},[e.cusHeader?{name:"header",fn:s(a=>[h(n.$slots,e.prop,{data:a.row},void 0,!0)])}:void 0]),1032,["prop","label","header-align","align","fixed","width","min-width"]))),128)),h(n.$slots,"default",{},void 0,!0)]),_:3},8,["data","max-height","height","summary-method","show-summary","empty-text"])),[[V,l.loading]])])}}};var ae=$(Z,[["__scopeId","data-v-dd791868"]]);export{ae as _};