
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as B}from"./index-DB2b0aaG.js";import{_ as v}from"./index.vue_vue_type_script_setup_true_lang-CIbUvFbs.js";import{_ as w}from"./index.vue_vue_type_script_setup_true_lang-DBwRDeli.js";import{d as E,u as M,j as S,k as $,r as z,aJ as l,o as N,a as T,i as e,w as t,M as m,e as i,aB as K,m as L}from"./bootstrap-BlzOfB9o.js";import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-B_-RjQM1.js";import{u as V}from"./useTabbar-DWC3z1rM.js";import"./index-Df4aL-PJ.js";import"./index-DERO0-td.js";import"./standardModuleExample-Ez0k0aJh.js";const O=E({name:"StandardModuleExampleEdit",__name:"detail",setup(j){const u=M(),n=S(),p=$(),c=V(),_=z();function d(){var s;(s=_.value)==null||s.submit(()=>{K.emit("get-data-list"),a()})}function f(){a()}function a(){u.settings.tabbar.enable&&u.settings.tabbar.mergeTabsBy!=="activeMenu"?c.close({name:"standardModuleExampleList"}):p.push({name:"standardModuleExampleList"})}return(s,o)=>{const b=L,r=l("el-button"),g=w,k=l("el-col"),x=l("el-row"),y=v,C=B;return N(),T("div",null,[e(g,{title:i(n).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(r,{size:"default",round:"",onClick:a},{icon:t(()=>[e(b,{name:"ep:arrow-left"})]),default:t(()=>[o[0]||(o[0]=m(" 返回 "))]),_:1})]),_:1},8,["title"]),e(y,null,{default:t(()=>[e(x,null,{default:t(()=>[e(k,{md:24,lg:16},{default:t(()=>[e(R,{id:i(n).params.id,ref_key:"form",ref:_,type:i(n).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:d},{default:t(()=>o[1]||(o[1]=[m(" 提交 ")])),_:1}),e(r,{size:"large",onClick:f},{default:t(()=>o[2]||(o[2]=[m(" 取消 ")])),_:1})]),_:1})])}}});export{O as default};
