
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as w,bl as x,r as I,aP as N,A as P,O as _,D as d,o as r,c as U,j as t,w as e,s as c,f as n,h as y,Y as A,i as D,e as f,bm as F,_ as M,N as S,Q as m}from"./index-nFO8NRRw.js";import{_ as T}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";const j=f("p",{class:"mt-0"}," 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 ",-1),H=f("p",{class:"mt-0"}," 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。 ",-1),O=w({__name:"vueuse",setup(Q){function p(){_.success({message:"恭喜你，这是一条成功消息"})}const k=F(()=>{p()},1e3),C=x(()=>{p()},1e3),s=I(""),{text:V,copy:b,copied:v,isSupported:g}=N();P(v,a=>{a&&_.success(`复制成功：${V.value}`)});function B(a){window.open(a,"_blank")}return(a,o)=>{const E=M,l=d("ElButton"),$=T,u=S,h=d("ElInput");return r(),U("div",null,[t($,{title:"VueUse",content:"VueUse 是一个 Vue Composition API 实用程序的集合，更多 API 和例子请查看 VueUse 官网。"},{default:e(()=>[t(l,{onClick:o[0]||(o[0]=i=>B("https://vueuse.org/"))},{icon:e(()=>[t(E,{name:"i-ep:link"})]),default:e(()=>[c(" VueUse 官网 ")]),_:1})]),_:1}),t(u,{title:"防抖：debounce"},{default:e(()=>[j,t(l,{onClick:n(k)},{default:e(()=>[c(" 连续点击我，只会执行最后一次点击事件 ")]),_:1},8,["onClick"])]),_:1}),t(u,{title:"节流：throttle"},{default:e(()=>[H,t(l,{onClick:n(C)},{default:e(()=>[c(" 连续点击我，每一秒只会执行一次点击事件 ")]),_:1},8,["onClick"])]),_:1}),n(g)?(r(),y(u,{key:0,title:"复制：clipboard"},{default:e(()=>[t(h,{modelValue:n(s),"onUpdate:modelValue":o[2]||(o[2]=i=>A(s)?s.value=i:null),placeholder:"输入内容，并点击复制按钮"},{append:e(()=>[t(l,{onClick:o[1]||(o[1]=i=>n(b)(n(s)))},{default:e(()=>[c(" 复制 ")]),_:1})]),_:1},8,["modelValue"])]),_:1})):D("",!0)])}}});typeof m=="function"&&m(O);export{O as default};
