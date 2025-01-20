
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as x,k as b,u as v,aW as k,B as I,r as S,C as P,aw as T,o as r,b as i,F as C,m as L,f as t,n as B,j as u,w as V,H as d,e as m,I as p,T as z,_ as M,s as R}from"./index-putfknEa.js";import{u as y}from"./useMainPage-B_1Q84YL.js";import"./useTabbar-CyYdn1mD.js";const E={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},F=["data-path","src"],N={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark-bg-stone-8/75"},j=x({name:"IframeView",__name:"iframe",setup(D){const o=b(),f=v(),n=k(),{generateI18nTitle:_}=I(),{setCustomTitle:h}=y(),c=S();return P(()=>o.fullPath,a=>{T(()=>{var l;(l=c.value)==null||l.forEach(s=>{if(s.dataset.path===a){const e=n.openedList.find(w=>w.path===a),g=e==null?void 0:e.title;h(_(g)),s.onload=()=>{n.closeLoading(a)}}})})},{immediate:!0}),(a,l)=>{const s=M;return r(),i("div",E,[(r(!0),i(C,null,L(t(n).openedList,e=>(r(),i("div",{key:e.path,class:B(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":t(o).fullPath===e.path}])},[u(z,{name:t(f).settings.mainPage.enableTransition?t(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:V(()=>[d(m("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,F),[[p,t(o).fullPath===e.path]])]),_:2},1032,["name"]),d(m("div",N,[u(s,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[p,e.isLoading]])],2))),128))])}}}),q=R(j,[["__scopeId","data-v-e6517686"]]);export{q as default};
