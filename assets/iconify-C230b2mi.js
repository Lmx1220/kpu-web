
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as S,ak as U,r as H,G as j,H as q,y as z,e as l,o as i,f,h as e,w as o,q as d,O as x,X as y,M as g,j as t,Z as F,i as u,t as G,Y as L,_ as O,U as T,z as X,V as C}from"./index-RH8yPTKC.js";import{_ as Y}from"./index.vue_vue_type_script_setup_true_lang-CCZndBIO.js";const Z={class:"icon-box"},A={class:"icon-info"},J={class:"title"},K={class:"more-info"},$=S({__name:"iconify",setup(Q){const{text:w,copy:V,copied:k}=U(),a=H({visible:!1,iconName:""}),c=j(()=>`<SvgIcon name="i-${a.value.iconName}" />`);q(k,_=>{_&&z.success(`复制成功：${w.value}`)});function I(_){a.value.iconName=_,a.value.visible=!0}return(_,s)=>{const N=Y,m=O,b=l("ElCard"),r=l("ElCol"),p=l("ElRow"),h=T,v=l("ElButton"),B=l("ElInput"),D=l("ElDivider"),M=l("ElDialog");return i(),f("div",null,[e(N,{title:"Iconify"},{content:o(()=>[d(" 本框架支持使用 Iconify 的所有图标集，以下展示部分图标集。 ")]),_:1}),(i(!0),f(x,null,y(t(F),(n,P)=>(i(),g(h,{key:P,title:n.info.name},{default:o(()=>[e(p,{gutter:20},{default:o(()=>[(i(!0),f(x,null,y(n.info.samples,(E,R)=>(i(),g(r,{key:R,xs:6,sm:8,md:3,lg:2},{default:o(()=>[e(b,{shadow:"hover",onClick:W=>I(`${n.prefix}:${E}`)},{default:o(()=>[e(m,{name:`${n.prefix}:${E}`},null,8,["name"])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["title"]))),128)),e(M,{modelValue:t(a).visible,"onUpdate:modelValue":s[2]||(s[2]=n=>t(a).visible=n),"show-close":!1,width:"600px"},{default:o(()=>[e(p,{type:"flex"},{default:o(()=>[e(r,{style:{"max-width":"100px"}},{default:o(()=>[u("div",Z,[e(m,{name:t(a).iconName},null,8,["name"])])]),_:1}),e(r,{style:{flex:"1"}},{default:o(()=>[u("div",A,[u("div",J,G(t(a).iconName),1),e(B,{modelValue:t(c),"onUpdate:modelValue":s[1]||(s[1]=n=>L(c)?c.value=n:null),readonly:""},{append:o(()=>[e(v,{type:"primary",onClick:s[0]||(s[0]=n=>t(V)(t(c)))},{default:o(()=>[d(" 复制 ")]),_:1})]),_:1},8,["modelValue"])])]),_:1})]),_:1}),u("div",K,[e(D,{"content-position":"left"},{default:o(()=>[d(" 结合 Element Plus 使用场景 ")]),_:1}),e(v,null,{icon:o(()=>[e(m,{name:t(a).iconName},null,8,["name"])]),default:o(()=>[d(" Icon 按钮 ")]),_:1})])]),_:1},8,["modelValue"])])}}});typeof C=="function"&&C($);const ne=X($,[["__scopeId","data-v-a3597b18"]]);export{ne as default};