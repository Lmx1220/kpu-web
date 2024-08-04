
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import u from"./HDropdown-vCTFsmE2.js";import{_ as h}from"./HTabList.vue_vue_type_script_setup_true_lang-b-H45Vfq.js";import{d as _,c as g,o as f,M as w,w as m,h as p,j as c,_ as x}from"./index-B3Xk5Nw4.js";function S(r){function e(){if(!document.startViewTransition||window.matchMedia("(prefers-reduced-motion: reduce)").matches){r();return}return document.startViewTransition(async()=>{await Promise.resolve(r())})}return{startViewTransition:e}}const v=_({name:"ColorScheme",__name:"index",setup(r){const e=g();function d(a){var i;const{startViewTransition:t}=S(()=>{e.currentColorScheme&&e.setColorScheme(e.currentColorScheme==="dark"?"light":"dark")});(i=t())==null||i.ready.then(()=>{const o=a.clientX,n=a.clientY,s=Math.hypot(Math.max(o,innerWidth-o),Math.max(n,innerHeight-n)),l=[`circle(0px at ${o}px ${n}px)`,`circle(${s}px at ${o}px ${n}px)`];document.documentElement.animate({clipPath:e.settings.app.colorScheme!=="dark"?l:l.reverse()},{duration:300,easing:"ease-out",pseudoElement:e.settings.app.colorScheme!=="dark"?"::view-transition-new(root)":"::view-transition-old(root)"})})}return(a,t)=>{const i=x,o=h,n=u;return f(),w(n,{class:"flex-center cursor-pointer px-2 py-1"},{dropdown:m(()=>[p(o,{modelValue:c(e).settings.app.colorScheme,"onUpdate:modelValue":t[0]||(t[0]=s=>c(e).settings.app.colorScheme=s),options:[{icon:"i-ri:sun-line",label:"",value:"light"},{icon:"i-ri:moon-line",label:"",value:"dark"},{icon:"i-codicon:color-mode",label:"",value:""}],class:"m-3"},null,8,["modelValue"])]),default:m(()=>[p(i,{name:{light:"i-ri:sun-line",dark:"i-ri:moon-line","":"i-codicon:color-mode"}[c(e).settings.app.colorScheme],onClick:d},null,8,["name"])]),_:1})}}});export{v as _};
