
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as v}from"./index-lOg4UVoT.js";import{_ as S}from"./index.vue_vue_type_script_setup_true_lang-BYjOVmS1.js";import{_ as w}from"./index.vue_vue_type_script_setup_true_lang-CjtEiaWg.js";import{d as B,u as E,k as M,l as N,r as $,L as l,o as z,b as L,j as e,w as t,x as _,f as m,N as T,_ as R}from"./index-putfknEa.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-CEFDhpyO.js";import{u as j}from"./useTabbar-CyYdn1mD.js";const F=B({name:"StandardModuleExampleEdit",__name:"detail",setup(H){const i=E(),n=M(),c=N(),f=j(),u=$();function p(){var s;(s=u.value)==null||s.submit(()=>{T.emit("get-data-list"),a()})}function d(){a()}function a(){i.settings.tabbar.enable&&i.settings.tabbar.mergeTabsBy!=="activeMenu"?f.close({name:"standardModuleExampleList"}):c.push({name:"standardModuleExampleList"})}return(s,o)=>{const b=R,r=l("el-button"),g=w,k=l("el-col"),x=l("el-row"),y=S,C=v;return z(),L("div",null,[e(g,{title:m(n).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(r,{size:"default",round:"",onClick:a},{icon:t(()=>[e(b,{name:"ep:arrow-left"})]),default:t(()=>[o[0]||(o[0]=_(" 返回 "))]),_:1})]),_:1},8,["title"]),e(y,null,{default:t(()=>[e(x,null,{default:t(()=>[e(k,{md:24,lg:16},{default:t(()=>[e(V,{id:m(n).params.id,ref_key:"form",ref:u,type:m(n).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:p},{default:t(()=>o[1]||(o[1]=[_(" 提交 ")])),_:1}),e(r,{size:"large",onClick:d},{default:t(()=>o[2]||(o[2]=[_(" 取消 ")])),_:1})]),_:1})])}}});export{F as default};
