
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as k,Y as C,r as c,C as l,o as I,h as R,w as s,e as f,t as d,f as e,j as o,q as w,a0 as B,a1 as L,_ as q}from"./index-BSkZKgnl.js";const z={class:"mb-8 text-xl color-[var(--el-text-color-primary)] font-bold"},N={class:"mt-4 flex-center gap-2 text-sm color-[var(--el-text-color-secondary)]"},U=k({name:"ResetPasswordForm",__name:"index",props:{account:{}},emits:["onLogin","onResetPassword"],setup(P,{emit:h}){const F=P,g=h,{t:r}=C(),y=c(!1),_=c(),a=c({account:F.account??localStorage.login_account??"",captcha:"",newPassword:""}),v=c({account:[{required:!0,trigger:"blur",message:r("resetPasswordForm.rules.account")}],captcha:[{required:!0,trigger:"blur",message:r("resetPasswordForm.rules.captcha")}],newPassword:[{required:!0,trigger:"blur",message:r("resetPasswordForm.rules.newPassword")},{min:6,max:18,trigger:"blur",message:r("resetPasswordForm.rules.newPasswordLength")}]});function V(){var m;L({message:"重置密码仅提供界面演示，无实际功能，需开发者自行扩展",type:"info"}),(m=_.value)==null||m.validate(t=>{t&&g("onResetPassword",a.value.account)})}return(m,t)=>{const i=q,p=l("ElInput"),u=l("ElFormItem"),x=l("ElButton"),b=l("ElLink"),E=l("ElForm");return I(),R(E,{ref_key:"formRef",ref:_,model:e(a),rules:e(v),class:"min-h-500px w-full flex-col-stretch-center p-12"},{default:s(()=>[f("h3",z,d(e(r)("resetPasswordForm.intro")),1),f("div",null,[o(u,{prop:"account"},{default:s(()=>[o(p,{modelValue:e(a).account,"onUpdate:modelValue":t[0]||(t[0]=n=>e(a).account=n),size:"large",placeholder:e(r)("resetPasswordForm.form.account"),type:"text",tabindex:"1"},{prefix:s(()=>[o(i,{name:"i-ri:user-3-fill"})]),_:1},8,["modelValue","placeholder"])]),_:1}),o(u,{prop:"captcha"},{default:s(()=>[o(p,{modelValue:e(a).captcha,"onUpdate:modelValue":t[1]||(t[1]=n=>e(a).captcha=n),size:"large",placeholder:e(r)("resetPasswordForm.form.captcha"),type:"text",tabindex:"2"},{prefix:s(()=>[o(i,{name:"i-ic:baseline-verified-user"})]),append:s(()=>[o(x,null,{default:s(()=>[w(d(e(r)("resetPasswordForm.form.sendCaptcha")),1)]),_:1})]),_:1},8,["modelValue","placeholder"])]),_:1}),o(u,{prop:"newPassword"},{default:s(()=>[o(p,{modelValue:e(a).newPassword,"onUpdate:modelValue":t[2]||(t[2]=n=>e(a).newPassword=n),type:"password",size:"large",placeholder:e(r)("resetPasswordForm.form.newPassword"),tabindex:"3","show-password":""},{prefix:s(()=>[o(i,{name:"i-ri:lock-2-fill"})]),_:1},8,["modelValue","placeholder"])]),_:1})]),o(x,{loading:e(y),type:"primary",size:"large",style:{width:"100%","margin-top":"20px"},onClick:B(V,["prevent"])},{default:s(()=>[w(d(e(r)("resetPasswordForm.form.confirm")),1)]),_:1},8,["loading"]),f("div",N,[o(b,{type:"primary",underline:!1,onClick:t[3]||(t[3]=n=>g("onLogin",e(a).account))},{default:s(()=>[w(d(e(r)("resetPasswordForm.login")),1)]),_:1})])]),_:1},8,["model","rules"])}}});export{U as _};
