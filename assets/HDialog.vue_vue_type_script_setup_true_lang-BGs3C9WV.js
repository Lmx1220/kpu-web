
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as h,aj as p,ak as w,aN as b,r as k,x as C,o as c,h as V,w as t,j as s,f as e,aC as f,U as u,e as o,n as B,aD as F,aO as T,p as j,t as N,aF as S,V as m,c as $,i as D,aH as M,aI as z,_ as H}from"./index-vu1a6MAo.js";const I={class:"fixed inset-0 overflow-y-auto"},O={class:"min-h-full flex items-end justify-center p-4 text-center lg-items-center"},E={flex:"~ items-center justify-between","px-4":"","py-3":"","border-b":"~ solid stone/15","text-6":""},G={key:0,flex:"~ items-center justify-end","px-4":"","py-3":"","border-t":"~ solid stone/15"},U=h({__name:"HDialog",props:p({appear:{type:Boolean,default:!1},title:{},preventClose:{type:Boolean,default:!1},overlay:{type:Boolean,default:!1}},{modelValue:{type:Boolean,default:!1},modelModifiers:{}}),emits:p(["close"],["update:modelValue"]),setup(y,{emit:v}){const g=v,l=w(y,"modelValue"),x=b(),r=k({enter:"ease-in-out duration-500",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in-out duration-500",leaveFrom:"opacity-100",leaveTo:"opacity-0"}),n=C(()=>({enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95",enterTo:"opacity-100 translate-y-0 lg-scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 lg-scale-100",leaveTo:"opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95"}));function i(){l.value=!1,g("close")}return(a,d)=>{const _=H;return c(),V(e(z),{as:"template",appear:a.appear,show:l.value},{default:t(()=>[s(e(M),{class:"fixed inset-0 z-2000 flex",onClose:d[0]||(d[0]=J=>!a.preventClose&&i())},{default:t(()=>[s(e(f),u({as:"template",appear:a.appear,class:e(r).enterFrom},e(r)),{default:t(()=>[o("div",{class:B(["fixed inset-0 bg-stone-2/75 transition-opacity dark-bg-stone-8/75",{"backdrop-blur-sm":a.overlay}])},null,2)]),_:1},16,["appear","class"]),o("div",I,[o("div",O,[s(e(f),u({class:e(n).enterFrom,as:"template",appear:a.appear},e(n)),{default:t(()=>[s(e(F),{class:"relative w-full flex flex-col overflow-hidden rounded-xl bg-white text-left shadow-xl lg-my-8 lg-max-w-lg dark-bg-stone-8"},{default:t(()=>[o("div",E,[s(e(T),{"m-0":"","text-lg":"","text-dark":"","dark-text-white":""},{default:t(()=>[j(N(a.title),1)]),_:1}),s(_,{name:"i-carbon:close","cursor-pointer":"",onClick:i})]),s(e(S),{"m-0":"","overflow-y-auto":"","p-4":"","text-start":""},{default:t(()=>[m(a.$slots,"default")]),_:3}),e(x).footer?(c(),$("div",G,[m(a.$slots,"footer")])):D("",!0)]),_:3})]),_:3},16,["class","appear"])])])]),_:3})]),_:3},8,["appear","show"])}}});export{U as _};
