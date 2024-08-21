
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as h,b7 as w,b8 as x,r as N,al as U,I as P,W as _,e as d,o as r,f as y,h as t,w as e,q as c,j as n,N as A,Z as F,O as M,i as f,_ as S,V as T,X as m}from"./index-D6ceO_Rb.js";import{_ as j}from"./index.vue_vue_type_script_setup_true_lang-bcVZrhLq.js";const q=f("p",{class:"mt-0"}," 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。 ",-1),D=f("p",{class:"mt-0"}," 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。 ",-1),H=h({__name:"vueuse",setup(O){function p(){_.success({message:"恭喜你，这是一条成功消息"})}const k=w(()=>{p()},1e3),V=x(()=>{p()},1e3),s=N(""),{text:C,copy:b,copied:v,isSupported:g}=U();P(v,a=>{a&&_.success(`复制成功：${C.value}`)});function B(a){window.open(a,"_blank")}return(a,o)=>{const E=S,l=d("ElButton"),I=j,u=T,$=d("ElInput");return r(),y("div",null,[t(I,{title:"VueUse",content:"VueUse 是一个 Vue Composition API 实用程序的集合，更多 API 和例子请查看 VueUse 官网。"},{default:e(()=>[t(l,{onClick:o[0]||(o[0]=i=>B("https://vueuse.org/"))},{icon:e(()=>[t(E,{name:"i-ep:link"})]),default:e(()=>[c(" VueUse 官网 ")]),_:1})]),_:1}),t(u,{title:"防抖：debounce"},{default:e(()=>[q,t(l,{onClick:n(k)},{default:e(()=>[c(" 连续点击我，只会执行最后一次点击事件 ")]),_:1},8,["onClick"])]),_:1}),t(u,{title:"节流：throttle"},{default:e(()=>[D,t(l,{onClick:n(V)},{default:e(()=>[c(" 连续点击我，每一秒只会执行一次点击事件 ")]),_:1},8,["onClick"])]),_:1}),n(g)?(r(),A(u,{key:0,title:"复制：clipboard"},{default:e(()=>[t($,{modelValue:n(s),"onUpdate:modelValue":o[2]||(o[2]=i=>F(s)?s.value=i:null),placeholder:"输入内容，并点击复制按钮"},{append:e(()=>[t(l,{onClick:o[1]||(o[1]=i=>n(b)(n(s)))},{default:e(()=>[c(" 复制 ")]),_:1})]),_:1},8,["modelValue"])]),_:1})):M("",!0)])}}});typeof m=="function"&&m(H);export{H as default};
