
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as $,o as r,f as a,a1 as w,bi as x,a as q,c as H,b as z,e as _,b4 as B,h as s,w as e,j as h,q as o,i as n,t as F,k as v,y as b,U as I,V as S}from"./index-RH8yPTKC.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-CCZndBIO.js";import{u as K}from"./useMainPage-DzCmlBAe.js";import"./useTabbar-D1GJj3hP.js";import"./index.es-DQP9qc4Z.js";const L=$({name:"AuthAll",__name:"index",props:{value:{}},setup(f){const p=f;function m(){return x().authAll(p.value)}return(t,g)=>(r(),a("div",null,[m()?w(t.$slots,"default",{key:0}):w(t.$slots,"no-auth",{key:1})]))}}),O=$({name:"Auth",__name:"index",props:{value:{}},setup(f){const p=f;function m(){return x().auth(p.value)}return(t,g)=>(r(),a("div",null,[m()?w(t.$slots,"default",{key:0}):w(t.$slots,"no-auth",{key:1})]))}}),Q={key:0},W={key:1},X=n("h3",null,"切换帐号",-1),Y=n("h3",null,"帐号权限",-1),Z=n("h3",null,"访问鉴权页面",-1),ee=n("h3",null,"鉴权组件（请对照代码查看）",-1),se=n("h3",null,"鉴权指令（请对照代码查看）",-1),oe=n("h3",null,"鉴权函数（请对照代码查看）",-1),te=$({__name:"index",setup(f){const p=q(),m=H(),t=z(),{auth:g,authAll:V}=x(),P=K();async function R(u){await t.login({username:u,password:""}),await t.getPermissions(),P.reload()}function T(){p.push({name:"permissionExampleTest"})}function y(u){g(u)?b.success("校验通过"):b.error("校验不通过")}function G(u){V(u)?b.success("校验通过"):b.error("校验不通过")}return(u,i)=>{const D=J,k=_("ElRadioButton"),M=_("ElRadioGroup"),c=_("ElButton"),l=_("ElTag"),E=O,N=L,A=_("ElButtonGroup"),U=I,C=B("auth"),j=B("auth-all");return r(),a("div",null,[s(D,{title:"权限验证"}),s(U,null,{default:e(()=>[h(m).settings.app.enablePermission?(r(),a("div",W,[X,s(M,{modelValue:h(t).account,"onUpdate:modelValue":i[0]||(i[0]=d=>h(t).account=d),onChange:R},{default:e(()=>[s(k,{value:"admin"},{default:e(()=>[o(" admin ")]),_:1}),s(k,{value:"test"},{default:e(()=>[o(" test ")]),_:1}),s(k,{value:"hooray"},{default:e(()=>[o(" hooray(无权限) ")]),_:1})]),_:1},8,["modelValue"]),Y,n("div",null,F(h(t).permissions),1),Z,n("div",null,[s(c,{onClick:T},{default:e(()=>[o(" 点击访问 ")]),_:1})]),ee,n("div",null,[s(E,{value:"permission.browse",style:{"margin-bottom":"10px"}},{"no-auth":e(()=>[s(l,{type:"danger"},{default:e(()=>[o(" 你没有 permission.browse 权限 ")]),_:1})]),default:e(()=>[s(l,null,{default:e(()=>[o("你有 permission.browse 权限")]),_:1})]),_:1}),s(E,{value:"permission.create",style:{"margin-bottom":"10px"}},{"no-auth":e(()=>[s(l,{type:"danger"},{default:e(()=>[o(" 你没有 permission.create 权限 ")]),_:1})]),default:e(()=>[s(l,null,{default:e(()=>[o("你有 permission.create 权限")]),_:1})]),_:1}),s(E,{value:["permission.browse","permission.create"],style:{"margin-bottom":"10px"}},{"no-auth":e(()=>[s(l,{type:"danger"},{default:e(()=>[o(" 你没有 permission.browse 或 permission.create 权限 ")]),_:1})]),default:e(()=>[s(l,null,{default:e(()=>[o("你有 permission.browse 或 permission.create 权限")]),_:1})]),_:1}),s(N,{value:["permission.browse","permission.create"]},{"no-auth":e(()=>[s(l,{type:"danger"},{default:e(()=>[o(" 你没有 permission.browse 和 permission.create 权限 ")]),_:1})]),default:e(()=>[s(l,null,{default:e(()=>[o("你有 permission.browse 和 permission.create 权限")]),_:1})]),_:1})]),se,n("div",null,[v((r(),a("div",null,[o(" 如果你有 permission.browse 权限则能看到这句话 ")])),[[C,"permission.browse"]]),v((r(),a("div",null,[o(" 如果你有 permission.create 权限则能看到这句话 ")])),[[C,"permission.create"]]),v((r(),a("div",null,[o(" 如果你有 permission.browse 或 permission.create 权限则能看到这句话 ")])),[[C,["permission.browse","permission.create"]]]),v((r(),a("div",null,[o(" 如果你有 permission.browse 和 permission.create 权限则能看到这句话 ")])),[[j,["permission.browse","permission.create"]]])]),oe,n("div",null,[s(A,{style:{display:"block","margin-bottom":"10px"}},{default:e(()=>[s(c,{onClick:i[1]||(i[1]=d=>y("permission.browse"))},{default:e(()=>[o(" 校验 permission.browse 权限 ")]),_:1}),s(c,{onClick:i[2]||(i[2]=d=>y("permission.create"))},{default:e(()=>[o(" 校验 permission.create 权限 ")]),_:1})]),_:1}),s(A,null,{default:e(()=>[s(c,{onClick:i[3]||(i[3]=d=>y(["permission.browse","permission.create"]))},{default:e(()=>[o(" 校验 permission.browse 或 permission.create 权限 ")]),_:1}),s(c,{onClick:i[4]||(i[4]=d=>G(["permission.browse","permission.create"]))},{default:e(()=>[o(" 校验 permission.browse 和 permission.create 权限 ")]),_:1})]),_:1})])])):(r(),a("div",Q," 请到 seeting.js 里打开权限功能，再进入该页面查看演示 "))]),_:1})])}}});typeof S=="function"&&S(te);export{te as default};
