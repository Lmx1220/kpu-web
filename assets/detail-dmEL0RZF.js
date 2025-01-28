
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as v}from"./index-CHjapE0X.js";import{_ as w}from"./index.vue_vue_type_script_setup_true_lang-ia1rdtXp.js";import{_ as B}from"./index.vue_vue_type_script_setup_true_lang-CJRusrx0.js";import{d as E,u as S,i as z,j as M,r as $,aH as l,o as L,a as N,h as e,w as t,L as i,e as m,az as T,l as H}from"./bootstrap-BssOdyNs.js";import{_ as K}from"./index.vue_vue_type_script_setup_true_lang-DR3a7vmf.js";import{u as R}from"./useTabbar-JflsEu91.js";import"./index-TlavjUWD.js";import"./index-CI4shd_A.js";import"./standardModuleExample-CQzOo0UJ.js";const O=E({name:"StandardModuleExampleEdit",__name:"detail",setup(V){const u=S(),n=z(),p=M(),c=R(),_=$();function d(){var s;(s=_.value)==null||s.submit(()=>{T.emit("get-data-list"),a()})}function f(){a()}function a(){u.settings.tabbar.enable&&u.settings.tabbar.mergeTabsBy!=="activeMenu"?c.close({name:"standardModuleExampleList"}):p.push({name:"standardModuleExampleList"})}return(s,o)=>{const b=H,r=l("el-button"),g=B,k=l("el-col"),x=l("el-row"),y=w,C=v;return L(),N("div",null,[e(g,{title:m(n).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(r,{size:"default",round:"",onClick:a},{icon:t(()=>[e(b,{name:"ep:arrow-left"})]),default:t(()=>[o[0]||(o[0]=i(" 返回 "))]),_:1})]),_:1},8,["title"]),e(y,null,{default:t(()=>[e(x,null,{default:t(()=>[e(k,{md:24,lg:16},{default:t(()=>[e(K,{id:m(n).params.id,ref_key:"form",ref:_,type:m(n).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:d},{default:t(()=>o[1]||(o[1]=[i(" 提交 ")])),_:1}),e(r,{size:"large",onClick:f},{default:t(()=>o[2]||(o[2]=[i(" 取消 ")])),_:1})]),_:1})])}}});export{O as default};
