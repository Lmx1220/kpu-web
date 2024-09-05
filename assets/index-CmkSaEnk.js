
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as _,o as r,c as l,a6 as k,bd as A,a as O,b as q,N as z,B as v,S as P,j as o,w as s,f as w,e as i,p as n,t as F,D as g,M as y,L as I,O as V}from"./index-DJ7wkSlE.js";import{_ as J}from"./index.vue_vue_type_script_setup_true_lang-jbc8PKER.js";import{u as K}from"./useMainPage-BcN4AFBU.js";import"./useTabbar-jQvOKNdq.js";const Q=_({name:"AuthAll",__name:"index",props:{value:{}},setup(b){const p=b;function m(){return A().authAll(p.value)}return(t,E)=>(r(),l("div",null,[m()?k(t.$slots,"default",{key:0}):k(t.$slots,"no-auth",{key:1})]))}}),W=_({name:"Auth",__name:"index",props:{value:{}},setup(b){const p=b;function m(){return A().auth(p.value)}return(t,E)=>(r(),l("div",null,[m()?k(t.$slots,"default",{key:0}):k(t.$slots,"no-auth",{key:1})]))}}),X={key:0},Y={key:1},Z=_({__name:"index",setup(b){const p=O(),m=q(),t=z(),{auth:E,authAll:R}=A(),T=K();async function D(a){await t.login({username:a,password:""}),await t.getPermissions(),T.reload()}function G(){p.push({name:"permissionExampleTest"})}function C(a){E(a)?y.success("校验通过"):y.error("校验不通过")}function M(a){R(a)?y.success("校验通过"):y.error("校验不通过")}return(a,e)=>{const N=J,$=v("ElRadioButton"),j=v("ElRadioGroup"),d=v("ElButton"),u=v("ElTag"),x=W,U=Q,S=v("ElButtonGroup"),H=I,B=P("auth"),L=P("auth-all");return r(),l("div",null,[o(N,{title:"权限验证"}),o(H,null,{default:s(()=>[w(m).settings.app.enablePermission?(r(),l("div",Y,[e[25]||(e[25]=i("h3",null,"切换帐号",-1)),o(j,{modelValue:w(t).account,"onUpdate:modelValue":e[0]||(e[0]=f=>w(t).account=f),onChange:D},{default:s(()=>[o($,{value:"admin"},{default:s(()=>e[5]||(e[5]=[n(" admin ")])),_:1}),o($,{value:"test"},{default:s(()=>e[6]||(e[6]=[n(" test ")])),_:1}),o($,{value:"hooray"},{default:s(()=>e[7]||(e[7]=[n(" hooray(无权限) ")])),_:1})]),_:1},8,["modelValue"]),e[26]||(e[26]=i("h3",null,"帐号权限",-1)),i("div",null,F(w(t).permissions),1),e[27]||(e[27]=i("h3",null,"访问鉴权页面",-1)),i("div",null,[o(d,{onClick:G},{default:s(()=>e[8]||(e[8]=[n(" 点击访问 ")])),_:1})]),e[28]||(e[28]=i("h3",null,"鉴权组件（请对照代码查看）",-1)),i("div",null,[o(x,{value:"permission.browse",style:{"margin-bottom":"10px"}},{"no-auth":s(()=>[o(u,{type:"danger"},{default:s(()=>e[10]||(e[10]=[n(" 你没有 permission.browse 权限 ")])),_:1})]),default:s(()=>[o(u,null,{default:s(()=>e[9]||(e[9]=[n("你有 permission.browse 权限")])),_:1})]),_:1}),o(x,{value:"permission.create",style:{"margin-bottom":"10px"}},{"no-auth":s(()=>[o(u,{type:"danger"},{default:s(()=>e[12]||(e[12]=[n(" 你没有 permission.create 权限 ")])),_:1})]),default:s(()=>[o(u,null,{default:s(()=>e[11]||(e[11]=[n("你有 permission.create 权限")])),_:1})]),_:1}),o(x,{value:["permission.browse","permission.create"],style:{"margin-bottom":"10px"}},{"no-auth":s(()=>[o(u,{type:"danger"},{default:s(()=>e[14]||(e[14]=[n(" 你没有 permission.browse 或 permission.create 权限 ")])),_:1})]),default:s(()=>[o(u,null,{default:s(()=>e[13]||(e[13]=[n("你有 permission.browse 或 permission.create 权限")])),_:1})]),_:1}),o(U,{value:["permission.browse","permission.create"]},{"no-auth":s(()=>[o(u,{type:"danger"},{default:s(()=>e[16]||(e[16]=[n(" 你没有 permission.browse 和 permission.create 权限 ")])),_:1})]),default:s(()=>[o(u,null,{default:s(()=>e[15]||(e[15]=[n("你有 permission.browse 和 permission.create 权限")])),_:1})]),_:1})]),e[29]||(e[29]=i("h3",null,"鉴权指令（请对照代码查看）",-1)),i("div",null,[g((r(),l("div",null,e[17]||(e[17]=[n(" 如果你有 permission.browse 权限则能看到这句话 ")]))),[[B,"permission.browse"]]),g((r(),l("div",null,e[18]||(e[18]=[n(" 如果你有 permission.create 权限则能看到这句话 ")]))),[[B,"permission.create"]]),g((r(),l("div",null,e[19]||(e[19]=[n(" 如果你有 permission.browse 或 permission.create 权限则能看到这句话 ")]))),[[B,["permission.browse","permission.create"]]]),g((r(),l("div",null,e[20]||(e[20]=[n(" 如果你有 permission.browse 和 permission.create 权限则能看到这句话 ")]))),[[L,["permission.browse","permission.create"]]])]),e[30]||(e[30]=i("h3",null,"鉴权函数（请对照代码查看）",-1)),i("div",null,[o(S,{style:{display:"block","margin-bottom":"10px"}},{default:s(()=>[o(d,{onClick:e[1]||(e[1]=f=>C("permission.browse"))},{default:s(()=>e[21]||(e[21]=[n(" 校验 permission.browse 权限 ")])),_:1}),o(d,{onClick:e[2]||(e[2]=f=>C("permission.create"))},{default:s(()=>e[22]||(e[22]=[n(" 校验 permission.create 权限 ")])),_:1})]),_:1}),o(S,null,{default:s(()=>[o(d,{onClick:e[3]||(e[3]=f=>C(["permission.browse","permission.create"]))},{default:s(()=>e[23]||(e[23]=[n(" 校验 permission.browse 或 permission.create 权限 ")])),_:1}),o(d,{onClick:e[4]||(e[4]=f=>M(["permission.browse","permission.create"]))},{default:s(()=>e[24]||(e[24]=[n(" 校验 permission.browse 和 permission.create 权限 ")])),_:1})]),_:1})])])):(r(),l("div",X," 请到 seeting.js 里打开权限功能，再进入该页面查看演示 "))]),_:1})])}}});typeof V=="function"&&V(Z);export{Z as default};
