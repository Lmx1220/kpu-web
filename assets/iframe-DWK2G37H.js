
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as x,u as b,b as v,aU as I,y as S,r as k,A as P,a1 as T,o as l,c as i,F as L,ac as C,n as V,f as t,j as u,w as y,H as d,I as m,e as p,T as z,_ as B}from"./index-nFO8NRRw.js";import{u as M}from"./useMainPage-CIIJrTG_.js";import{_ as R}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./useTabbar-B4O-lyC_.js";const E={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},F=["data-path","src"],N={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark-bg-stone-8/75"},j=x({name:"IframeView",__name:"iframe",setup(A){const o=b(),f=v(),n=I(),{generateI18nTitle:_}=S(),{setCustomTitle:h}=M(),c=k();return P(()=>o.fullPath,a=>{T(()=>{var r;(r=c.value)==null||r.forEach(s=>{if(s.dataset.path===a){const e=n.openedList.find(w=>w.path===a),g=e==null?void 0:e.title;h(_(g)),s.onload=()=>{n.closeLoading(a)}}})})},{immediate:!0}),(a,r)=>{const s=B;return l(),i("div",E,[(l(!0),i(L,null,C(t(n).openedList,e=>(l(),i("div",{key:e.path,class:V(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":t(o).fullPath===e.path}])},[u(z,{name:t(f).settings.mainPage.enableTransition?t(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:y(()=>[d(p("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,F),[[m,t(o).fullPath===e.path]])]),_:2},1032,["name"]),d(p("div",N,[u(s,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[m,e.isLoading]])],2))),128))])}}}),q=R(j,[["__scopeId","data-v-b4e41b97"]]);export{q as default};
