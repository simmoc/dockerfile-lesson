
/**
 * 由 Fantastic-admin 提供技术支持
 * https://hooray.gitee.io/fantastic-admin/
 * Powered by Fantastic-admin
 * https://hooray.github.io/fantastic-admin/
 */
    
import{_ as T}from"./index.a1b41888.js";import{_ as y}from"./plugin-vue_export-helper.21dcd24c.js";import{a as g,q as w,s as q,E as x,r as p,t as l,v,x as b,y as e,z as t,A as S,B as P,C as F,c as B,D as I,F as U,G as L,H as i}from"./vendor.d2559d84.js";const N={},j={class:"copyright"};function z(r,s){return g(),w("footer",j)}var A=y(N,[["render",z],["__scopeId","data-v-f60cc5dc"]]);const E={name:"Login",data(){return{title:"\u5FAE\u5BA2\u8FD0\u8425\u4E2D\u5FC3\u7BA1\u7406\u53F0",formType:"login",loginForm:{username:localStorage.login_account||"",password:"",remember:!!localStorage.login_account},loginRules:{username:[{required:!0,trigger:"blur",message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"}],password:[{required:!0,trigger:"blur",message:"\u8BF7\u8F93\u5165\u5BC6\u7801"},{min:6,max:18,trigger:"blur",message:"\u5BC6\u7801\u957F\u5EA6\u4E3A6\u523018\u4F4D"}]},resetForm:{account:localStorage.login_account||"",captcha:"",newPassword:""},resetRules:{account:[{required:!0,trigger:"blur",message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"}],captcha:[{required:!0,trigger:"blur",message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"}],newPassword:[{required:!0,trigger:"blur",message:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801"},{min:6,max:18,trigger:"blur",message:"\u5BC6\u7801\u957F\u5EA6\u4E3A6\u523018\u4F4D"}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(r){this.redirect=r.query&&r.query.redirect},immediate:!0}},created(){this.redirect=this.$route.query&&this.$route.query.redirect,this.redirect&&q.alert("\u767B\u5F55\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",type:"warning",callback:()=>{this.$store.dispatch("user/logout").then(()=>{this.$router.push({name:"login"})})}})},methods:{showPassword(){this.passwordType=this.passwordType==="password"?"":"password",this.$nextTick(()=>{this.$refs.password.focus()})},async handleLogin(){console.log(this.$refs.loginForm.validate(r=>console.log(r))),this.$store.dispatch("user/login",this.loginForm).then(()=>{this.loading=!1,this.loginForm.remember?localStorage.setItem("login_account",this.loginForm.username):localStorage.removeItem("login_account"),this.$store.dispatch("user/getMenus").then(r=>{r.length===0?x.error("\u6682\u65E0\u9875\u9762\u6743\u9650\uFF0C\u8BF7\u7BA1\u7406\u5458\u914D\u7F6E\u6743\u9650"):(x.success("\u767B\u5F55\u6210\u529F"),this.$store.dispatch("user/getSubjectName").then(()=>{this.$router.push({path:this.$route.query.redirect||"/"})}))})}).catch(()=>{this.loading=!1})},handleFind(){this.$message({message:"\u91CD\u7F6E\u5BC6\u7801\u4EC5\u63D0\u4F9B\u754C\u9762\u6F14\u793A\uFF0C\u65E0\u5B9E\u9645\u529F\u80FD\uFF0C\u9700\u5F00\u53D1\u8005\u81EA\u884C\u6269\u5C55",type:"info"}),this.$refs.resetForm.validate(r=>{})},testAccount(r){this.loginForm.username=r,this.loginForm.password="admin123.",console.log(r),this.handleLogin()}}},_=r=>(U("data-v-d67ef374"),r=r(),L(),r),M=_(()=>l("div",{class:"bg-banner"},null,-1)),R={id:"login-box"},D=_(()=>l("div",{class:"login-banner"},null,-1)),K={class:"title-container"},G={class:"title"},H={class:"flex-bar"},J=i("\u8BB0\u4F4F\u6211"),O=i("\u5FD8\u8BB0\u5BC6\u7801"),Q=i("\u767B \u5F55"),W={style:{"margin-top":"20px","margin-bottom":"-10px",color:"#666","font-size":"14px","text-align":"center","font-weight":"bold"}},X=_(()=>l("span",{style:{"margin-right":"5px"}},"\u6F14\u793A\u5E10\u53F7\u4E00\u952E\u767B\u5F55\uFF1A",-1)),Y=i(" admin "),Z=i(" test "),$=_(()=>l("div",{class:"title-container"},[l("h3",{class:"title"},"\u91CD\u7F6E\u5BC6\u7801")],-1)),ee=i("\u53D1\u9001\u9A8C\u8BC1\u7801"),oe=i("\u53BB\u767B\u5F55"),te=i("\u786E \u8BA4");function se(r,s,re,ne,o,a){const d=T,u=p("el-input"),m=p("el-form-item"),V=p("el-checkbox"),c=p("el-button"),h=p("el-form"),f=p("el-col"),k=p("el-row"),C=A;return g(),w("div",null,[M,l("div",R,[D,v(e(h,{ref:"loginForm",model:o.loginForm,rules:o.loginRules,class:"login-form",autocomplete:"on","label-position":"left"},{default:t(()=>[l("div",K,[l("h3",G,S(o.title)+"\u7BA1\u7406\u540E\u53F0",1)]),l("div",null,[e(m,{prop:"account"},{default:t(()=>[e(u,{ref:"name",modelValue:o.loginForm.username,"onUpdate:modelValue":s[0]||(s[0]=n=>o.loginForm.username=n),placeholder:"\u7528\u6237\u540D",type:"text",tabindex:"1",autocomplete:"on"},{prefix:t(()=>[e(d,{name:"user"})]),_:1},8,["modelValue"])]),_:1}),e(m,{prop:"password"},{default:t(()=>[e(u,{ref:"password",modelValue:o.loginForm.password,"onUpdate:modelValue":s[1]||(s[1]=n=>o.loginForm.password=n),type:o.passwordType,placeholder:"\u5BC6\u7801",tabindex:"2",autocomplete:"on",onKeyup:P(a.handleLogin,["enter"])},{prefix:t(()=>[e(d,{name:"password"})]),suffix:t(()=>[e(d,{name:o.passwordType==="password"?"eye":"eye-open",onClick:a.showPassword},null,8,["name","onClick"])]),_:1},8,["modelValue","type","onKeyup"])]),_:1})]),l("div",H,[e(V,{modelValue:o.loginForm.remember,"onUpdate:modelValue":s[2]||(s[2]=n=>o.loginForm.remember=n)},{default:t(()=>[J]),_:1},8,["modelValue"]),e(c,{type:"text",onClick:s[3]||(s[3]=n=>o.formType="reset")},{default:t(()=>[O]),_:1})]),e(c,{loading:o.loading,type:"primary",style:{width:"100%"},onClick:F(a.handleLogin,["prevent"])},{default:t(()=>[Q]),_:1},8,["loading","onClick"]),l("div",W,[X,e(c,{type:"danger",size:"mini",onClick:s[4]||(s[4]=n=>a.testAccount("admin"))},{default:t(()=>[Y]),_:1}),e(c,{type:"danger",size:"mini",plain:"",onClick:s[5]||(s[5]=n=>a.testAccount("test"))},{default:t(()=>[Z]),_:1})])]),_:1},8,["model","rules"]),[[b,o.formType=="login"]]),v(e(h,{ref:"resetForm",model:o.resetForm,rules:o.resetRules,class:"login-form","auto-complete":"on","label-position":"left"},{default:t(()=>[$,l("div",null,[e(m,{prop:"account"},{default:t(()=>[e(u,{ref:"name",modelValue:o.resetForm.account,"onUpdate:modelValue":s[6]||(s[6]=n=>o.resetForm.account=n),placeholder:"\u7528\u6237\u540D",type:"text",tabindex:"1",autocomplete:"on"},{prefix:t(()=>[e(d,{name:"user"})]),_:1},8,["modelValue"])]),_:1}),e(m,{prop:"captcha"},{default:t(()=>[e(u,{ref:"captcha",modelValue:o.resetForm.captcha,"onUpdate:modelValue":s[7]||(s[7]=n=>o.resetForm.captcha=n),placeholder:"\u9A8C\u8BC1\u7801",type:"text",tabindex:"2",autocomplete:"on"},{prefix:t(()=>[e(d,{name:"captcha"})]),append:t(()=>[e(c,null,{default:t(()=>[ee]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(m,{prop:"newPassword"},{default:t(()=>[e(u,{ref:"newPassword",modelValue:o.resetForm.newPassword,"onUpdate:modelValue":s[8]||(s[8]=n=>o.resetForm.newPassword=n),type:o.passwordType,placeholder:"\u65B0\u5BC6\u7801",tabindex:"3",autocomplete:"on"},{prefix:t(()=>[e(d,{name:"password"})]),suffix:t(()=>[e(d,{name:o.passwordType==="password"?"eye":"eye-open",onClick:a.showPassword},null,8,["name","onClick"])]),_:1},8,["modelValue","type"])]),_:1})]),e(k,{gutter:15,style:{"padding-top":"20px"}},{default:t(()=>[e(f,{md:6},{default:t(()=>[e(c,{style:{width:"100%"},onClick:s[9]||(s[9]=n=>o.formType="login")},{default:t(()=>[oe]),_:1})]),_:1}),e(f,{md:18},{default:t(()=>[e(c,{loading:o.loading,type:"primary",style:{width:"100%"},onClick:F(a.handleFind,["prevent"])},{default:t(()=>[te]),_:1},8,["loading","onClick"])]),_:1})]),_:1})]),_:1},8,["model","rules"]),[[b,o.formType=="reset"]])]),r.$store.state.settings.showCopyright?(g(),B(C,{key:0})):I("",!0)])}var de=y(E,[["render",se],["__scopeId","data-v-d67ef374"]]);export{de as default};