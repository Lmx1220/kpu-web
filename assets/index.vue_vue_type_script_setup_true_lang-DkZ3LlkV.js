
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as h}from"./HDialog.vue_vue_type_script_setup_true_lang-CIHmOHLC.js";import p from"./HKbd-BMTpGbSy.js";import{d as g,r as y,c as b,B as x,S as k,o as i,M as v,w as s,i as o,h as l,q as t,t as _,j as n,f as d,N as u,Y as A}from"./index-RH8yPTKC.js";const S={class:"px-4"},H={class:"grid gap-2 sm-grid-cols-2"},V=o("h2",{class:"m-0 text-lg font-bold"}," 全局 ",-1),B={class:"list-none ps-4 text-sm"},N={class:"py-1"},w={key:0,class:"py-1"},C={key:0},D=o("h2",{class:"m-0 text-lg font-bold"}," 主导航 ",-1),I={class:"list-none ps-4 text-sm"},M={class:"py-1"},j={key:1},q=o("h2",{class:"m-0 text-lg font-bold"}," 标签栏 ",-1),E={class:"list-none ps-4 text-sm"},K={class:"py-1"},P={class:"py-1"},R={class:"py-1"},T={class:"py-1"},U={class:"py-1"},W={key:2},Y=o("h2",{class:"m-0 text-lg font-bold"}," 页面 ",-1),$={class:"list-none ps-4 text-sm"},z={class:"py-1"},F={class:"py-1"},X=g({name:"HotkeysIntro",__name:"index",setup(G){const c=y(!1),a=b();return x(()=>{k.on("global-hotkeys-intro-toggle",()=>{c.value=!c.value})}),(J,m)=>{const e=p,r=h;return i(),v(r,{modelValue:n(c),"onUpdate:modelValue":m[0]||(m[0]=f=>A(c)?c.value=f:null),title:"快捷键介绍"},{default:s(()=>[o("div",S,[o("div",H,[o("div",null,[V,o("ul",B,[o("li",N,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("I")]),_:1}),t(" 查看系统信息 ")]),n(a).settings.toolbar.navSearch&&n(a).settings.navSearch.enableHotkeys?(i(),d("li",w,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("S")]),_:1}),t(" 唤起导航搜索 ")])):u("",!0)])]),n(a).settings.menu.enableHotkeys&&["side","head"].includes(n(a).settings.menu.mode)?(i(),d("div",C,[D,o("ul",I,[o("li",M,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("`")]),_:1}),t(" 激活下一个主导航 ")])])])):u("",!0),n(a).settings.tabbar.enable&&n(a).settings.tabbar.enableHotkeys?(i(),d("div",j,[q,o("ul",E,[o("li",K,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("←")]),_:1}),t(" 切换到上一个标签页 ")]),o("li",P,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("→")]),_:1}),t(" 切换到下一个标签页 ")]),o("li",R,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("W")]),_:1}),t(" 关闭当前标签页 ")]),o("li",T,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("1~9")]),_:1}),t(" 切换到第 n 个标签页 ")]),o("li",U,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("0")]),_:1}),t(" 切换到最后一个标签页 ")])])])):u("",!0),n(a).settings.mainPage.enableHotkeys?(i(),d("div",W,[Y,o("ul",$,[o("li",z,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("↑")]),_:1}),t(" 最大化 ")]),o("li",F,[l(e,null,{default:s(()=>[t(_(n(a).os==="mac"?"⌥":"Alt"),1)]),_:1}),l(e,null,{default:s(()=>[t("↓")]),_:1}),t(" 退出最大化 ")])])])):u("",!0)])])]),_:1},8,["modelValue"])}}});export{X as _};