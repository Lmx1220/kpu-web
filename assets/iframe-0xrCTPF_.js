
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as x,u as v,b,aM as S,v as k,r as I,y as P,aJ as T,o as l,c as i,F as L,Q as C,n as M,f as t,j as u,w as V,D as d,G as m,e as p,T as y,_ as z}from"./index-vu1a6MAo.js";import{u as B}from"./useMainPage-DxOIyT2M.js";import{_ as R}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./useTabbar-dPwJjLUD.js";const D={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},E=["data-path","src"],F={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark-bg-stone-8/75"},N=x({name:"IframeView",__name:"iframe",setup(j){const o=v(),f=b(),n=S(),{generateI18nTitle:_}=k(),{setCustomTitle:h}=B(),c=I();return P(()=>o.fullPath,a=>{T(()=>{var r;(r=c.value)==null||r.forEach(s=>{if(s.dataset.path===a){const e=n.openedList.find(w=>w.path===a),g=e==null?void 0:e.title;h(_(g)),s.onload=()=>{n.closeLoading(a)}}})})},{immediate:!0}),(a,r)=>{const s=z;return l(),i("div",D,[(l(!0),i(L,null,C(t(n).openedList,e=>(l(),i("div",{key:e.path,class:M(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":t(o).fullPath===e.path}])},[u(y,{name:t(f).settings.mainPage.enableTransition?t(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:V(()=>[d(p("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,E),[[m,t(o).fullPath===e.path]])]),_:2},1032,["name"]),d(p("div",F,[u(s,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[m,e.isLoading]])],2))),128))])}}}),q=R(N,[["__scopeId","data-v-e6517686"]]);export{q as default};
