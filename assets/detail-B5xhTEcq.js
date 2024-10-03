
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as v}from"./index-BPe9gTgL.js";import{d as w,b as B,u as E,a as M,r as S,C as l,o as $,c as z,j as e,w as t,q as _,f as i,L,_ as N,M as T}from"./index-BSkZKgnl.js";import{_ as R}from"./index.vue_vue_type_script_setup_true_lang-DpWBfo0M.js";import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-CDz-Mxwf.js";import{u as j}from"./useTabbar-BB78WUEB.js";const I=w({name:"StandardModuleExampleEdit",__name:"detail",setup(q){const m=B(),o=E(),c=M(),p=j(),u=S();function d(){var s;(s=u.value)==null||s.submit(()=>{L.emit("get-data-list"),a()})}function f(){a()}function a(){m.settings.tabbar.enable&&m.settings.tabbar.mergeTabsBy!=="activeMenu"?p.close({name:"standardModuleExampleList"}):c.push({name:"standardModuleExampleList"})}return(s,n)=>{const b=N,r=l("el-button"),g=R,x=l("el-col"),C=l("el-row"),k=T,y=v;return $(),z("div",null,[e(g,{title:i(o).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(r,{size:"default",round:"",onClick:a},{icon:t(()=>[e(b,{name:"ep:arrow-left"})]),default:t(()=>[n[0]||(n[0]=_(" 返回 "))]),_:1})]),_:1},8,["title"]),e(k,null,{default:t(()=>[e(C,null,{default:t(()=>[e(x,{md:24,lg:16},{default:t(()=>[e(V,{id:i(o).params.id,ref_key:"form",ref:u,type:i(o).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(y,null,{default:t(()=>[e(r,{type:"primary",size:"large",onClick:d},{default:t(()=>n[1]||(n[1]=[_(" 提交 ")])),_:1}),e(r,{size:"large",onClick:f},{default:t(()=>n[2]||(n[2]=[_(" 取消 ")])),_:1})]),_:1})])}}});export{I as default};
