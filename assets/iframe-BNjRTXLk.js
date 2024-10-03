
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as x,u as b,b as v,aN as k,x as S,r as I,z as P,aK as T,o as r,c as i,F as L,U as z,n as C,f as t,j as u,w as V,G as d,H as m,e as p,T as B,_ as M,k as N}from"./index-BSkZKgnl.js";import{u as R}from"./useMainPage-CvfdzSP3.js";import"./useTabbar-BB78WUEB.js";const y={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},E=["data-path","src"],F={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark-bg-stone-8/75"},j=x({name:"IframeView",__name:"iframe",setup(D){const o=b(),f=v(),n=k(),{generateI18nTitle:_}=S(),{setCustomTitle:h}=R(),c=I();return P(()=>o.fullPath,a=>{T(()=>{var l;(l=c.value)==null||l.forEach(s=>{if(s.dataset.path===a){const e=n.openedList.find(w=>w.path===a),g=e==null?void 0:e.title;h(_(g)),s.onload=()=>{n.closeLoading(a)}}})})},{immediate:!0}),(a,l)=>{const s=M;return r(),i("div",y,[(r(!0),i(L,null,z(t(n).openedList,e=>(r(),i("div",{key:e.path,class:C(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":t(o).fullPath===e.path}])},[u(B,{name:t(f).settings.mainPage.enableTransition?t(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:V(()=>[d(p("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,E),[[m,t(o).fullPath===e.path]])]),_:2},1032,["name"]),d(p("div",F,[u(s,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[m,e.isLoading]])],2))),128))])}}}),U=N(j,[["__scopeId","data-v-e6517686"]]);export{U as default};
