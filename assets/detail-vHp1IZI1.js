
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as v}from"./index-B4ERXPZ3.js";import{_ as w}from"./index.vue_vue_type_script_setup_true_lang-CjgLcnfR.js";import{_ as B}from"./index.vue_vue_type_script_setup_true_lang-Cmc5FAQ9.js";import{d as E,u as M,j as S,k as $,r as z,aI as l,o as N,a as T,i as e,w as t,M as m,e as i,aA as I,m as K}from"./bootstrap-CFLGDgEx.js";import{_ as L}from"./index.vue_vue_type_script_setup_true_lang-B09bBRBe.js";import{u as R}from"./useTabbar-Bq6Kch4r.js";import"./index-Dh5LPACC.js";import"./index-CWw-wBac.js";import"./standardModuleExample-CiCLBJhs.js";const O=E({name:"StandardModuleExampleEdit",__name:"detail",setup(V){const u=M(),n=S(),p=$(),c=R(),_=z();function d(){var s;(s=_.value)==null||s.submit(()=>{I.emit("get-data-list"),a()})}function f(){a()}function a(){u.settings.tabbar.enable&&u.settings.tabbar.mergeTabsBy!=="activeMenu"?c.close({name:"standardModuleExampleList"}):p.push({name:"standardModuleExampleList"})}return(s,o)=>{const b=K,r=l("el-button"),g=B,k=l("el-col"),x=l("el-row"),y=w,C=v;return N(),T("div",null,[e(g,{title:i(n).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(r,{size:"default",round:"",onClick:a},{icon:t(()=>[e(b,{name:"ep:arrow-left"})]),default:t(()=>[o[0]||(o[0]=m(" 返回 "))]),_:1})]),_:1},8,["title"]),e(y,null,{default:t(()=>[e(x,null,{default:t(()=>[e(k,{md:24,lg:16},{default:t(()=>[e(L,{id:i(n).params.id,ref_key:"form",ref:_,type:i(n).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:d},{default:t(()=>o[1]||(o[1]=[m(" 提交 ")])),_:1}),e(r,{size:"large",onClick:f},{default:t(()=>o[2]||(o[2]=[m(" 取消 ")])),_:1})]),_:1})])}}});export{O as default};
