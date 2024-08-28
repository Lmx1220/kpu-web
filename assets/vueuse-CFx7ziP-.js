
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as h,bm as w,r as x,aP as I,B as U,P as _,G as d,o as r,c as N,j as t,w as e,t as c,f as n,h as y,Z as A,i as F,e as f,bn as M,_ as R,O as S,R as m}from"./index-D8CVJ9uq.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-CwqCei2-.js";const j=f("p",{class:"mt-0"}," 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 ",-1),D=f("p",{class:"mt-0"}," 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。 ",-1),G=h({__name:"vueuse",setup(H){function p(){_.success({message:"恭喜你，这是一条成功消息"})}const k=M(()=>{p()},1e3),C=w(()=>{p()},1e3),s=x(""),{text:V,copy:b,copied:v,isSupported:g}=I();U(v,a=>{a&&_.success(`复制成功：${V.value}`)});function B(a){window.open(a,"_blank")}return(a,o)=>{const E=R,l=d("ElButton"),P=T,u=S,$=d("ElInput");return r(),N("div",null,[t(P,{title:"VueUse",content:"VueUse 是一个 Vue Composition API 实用程序的集合，更多 API 和例子请查看 VueUse 官网。"},{default:e(()=>[t(l,{onClick:o[0]||(o[0]=i=>B("https://vueuse.org/"))},{icon:e(()=>[t(E,{name:"i-ep:link"})]),default:e(()=>[c(" VueUse 官网 ")]),_:1})]),_:1}),t(u,{title:"防抖：debounce"},{default:e(()=>[j,t(l,{onClick:n(k)},{default:e(()=>[c(" 连续点击我，只会执行最后一次点击事件 ")]),_:1},8,["onClick"])]),_:1}),t(u,{title:"节流：throttle"},{default:e(()=>[D,t(l,{onClick:n(C)},{default:e(()=>[c(" 连续点击我，每一秒只会执行一次点击事件 ")]),_:1},8,["onClick"])]),_:1}),n(g)?(r(),y(u,{key:0,title:"复制：clipboard"},{default:e(()=>[t($,{modelValue:n(s),"onUpdate:modelValue":o[2]||(o[2]=i=>A(s)?s.value=i:null),placeholder:"输入内容，并点击复制按钮"},{append:e(()=>[t(l,{onClick:o[1]||(o[1]=i=>n(b)(n(s)))},{default:e(()=>[c(" 复制 ")]),_:1})]),_:1},8,["modelValue"])]),_:1})):F("",!0)])}}});typeof m=="function"&&m(G);export{G as default};
