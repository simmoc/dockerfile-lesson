
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{H as j}from"./index.94e839d6.js";import B from"./calendar-org-tab.5145aaad.js";import{Q as F,M as N,w,o as A,r as c,a as u,q as b,t as d,V as I,L as r,y as i,z as s,c as f,R as J,S as H,D,H as g,U}from"./vendor.d2559d84.js";import"./tick@2x.1e6bc440.js";import"./vuedraggable.umd.56963d08.js";import"./sortable.esm.81321d43.js";import"./plugin-vue_export-helper.21dcd24c.js";const $={class:"add-member-dialog-com"},L={class:"add-member-dialog-main-wrap"},q={class:"dialog-footer"},z=g("\u53D6 \u6D88"),E=g(" \u786E \u5B9A "),Y={props:{inputPlaceholder:{type:String,default:"\u8BF7\u9009\u62E9"},isMultipleSelected:{type:Boolean,default:!0},isMultipleCheckBox:{type:Boolean,default:!1},writeBackSelectedMemberOrg:{type:Array,default:function(){return[]}},customSelectedFn:{type:Function},customInputValueFn:{type:Function},touchObject:{type:String},title:{type:String,default:""}},emits:["confirm"],setup(_,{expose:y,emit:m}){const t=_,e=F({headTypeArr:[],activeTab:"",selectedMemberOrg:[],inputValue:""}),o=N(!1),{proxy:v}=U();y({dialogVisible:o,resetSelect:V}),w(()=>t.writeBackSelectedMemberOrg,a=>{a&&(e.selectedMemberOrg=JSON.parse(JSON.stringify(a)),t.customInputValueFn&&(e.inputValue=t.customInputValueFn(a)))},{deep:!0,immediate:!0}),A(async()=>{await k()});function h(){o.value=!0}function V(){e.inputValue=[],m("confirm",[])}function M(){o.value=!1,e.selectedMemberOrg=JSON.parse(JSON.stringify(t.writeBackSelectedMemberOrg))}function S(){e.selectedMemberOrg=v.$refs[`member-org-tab-${e.activeTab}`].selectedMembers||[];let a=JSON.parse(JSON.stringify(e.selectedMemberOrg));console.log("\u663E\u793A\u503C====",a),m("confirm",a),t.customInputValueFn&&(e.inputValue=t.customInputValueFn(a)),o.value=!1}async function k(){j.getMemberType().then(a=>{e.headTypeArr=a.data,e.activeTab=e.headTypeArr[0].value}).catch(()=>{})}function O(){}return(a,n)=>{const T=c("el-tab-pane"),C=c("el-tabs"),p=c("el-button"),x=c("el-dialog");return u(),b("div",$,[d("div",{class:"slot-box-pre-calendar",onClick:h},[I(a.$slots,"default",{data:r(e).inputValue})]),i(x,{modelValue:o.value,"onUpdate:modelValue":n[1]||(n[1]=l=>o.value=l),"append-to-body":"","lock-scroll":"","custom-class":"add-member-dialog",title:t.title},{footer:s(()=>[d("span",q,[i(p,{onClick:M},{default:s(()=>[z]),_:1}),i(p,{type:"primary",onClick:S},{default:s(()=>[E]),_:1})])]),default:s(()=>[d("div",L,[r(e).headTypeArr&&r(e).headTypeArr.length?(u(),f(C,{key:0,modelValue:r(e).activeTab,"onUpdate:modelValue":n[0]||(n[0]=l=>r(e).activeTab=l),type:"card",onTabClick:O},{default:s(()=>[(u(!0),b(J,null,H(r(e).headTypeArr,l=>(u(),f(T,{key:l.value,label:l.label,name:l.value},{default:s(()=>[i(B,{ref_for:!0,ref:"member-org-tab-"+l.value,"is-multiple-selected":t.isMultipleSelected,"is-multiple-check-box":t.isMultipleCheckBox,param:{type:l.value},"selected-member-org":r(e).selectedMemberOrg,"dialog-visible":o.value,"custom-selected-fn":t.customSelectedFn,"touch-object":t.touchObject},null,8,["is-multiple-selected","is-multiple-check-box","param","selected-member-org","dialog-visible","custom-selected-fn","touch-object"])]),_:2},1032,["label","name"]))),128))]),_:1},8,["modelValue"])):D("",!0)])]),_:1},8,["modelValue","title"])])}}};export{Y as default};