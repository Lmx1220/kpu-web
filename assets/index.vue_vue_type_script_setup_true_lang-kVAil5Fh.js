
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as g}from"./HDialog.vue_vue_type_script_setup_true_lang-CNISfjOJ.js";import y from"./HKbd-CtvIHQnC.js";import{d as b,r as x,b as k,l as v,J as A,o as m,h as S,w as l,e,j as n,p as s,t as i,f as u,c as f,i as r,W as H}from"./index-D4b_dGnp.js";const V={class:"px-4"},B={class:"grid gap-2 sm-grid-cols-2"},N={class:"list-none ps-4 text-sm"},w={class:"py-1"},C={key:0,class:"py-1"},D={class:"py-1"},I={key:0},W={class:"list-none ps-4 text-sm"},j={class:"py-1"},E={key:1},J={class:"list-none ps-4 text-sm"},K={class:"py-1"},L={class:"py-1"},M={class:"py-1"},P={class:"py-1"},R={class:"py-1"},T={key:2},U={class:"list-none ps-4 text-sm"},$={class:"py-1"},q={class:"py-1"},X=b({name:"HotkeysIntro",__name:"index",setup(z){const a=x(!1),d=k();return v(()=>{A.on("global-hotkeys-intro-toggle",()=>{a.value=!a.value})}),(F,t)=>{const o=y,p=g;return m(),S(p,{modelValue:u(a),"onUpdate:modelValue":t[0]||(t[0]=_=>H(a)?a.value=_:null),title:"快捷键介绍"},{default:l(()=>[e("div",V,[e("div",B,[e("div",null,[t[7]||(t[7]=e("h2",{class:"m-0 text-lg font-bold"}," 全局 ",-1)),e("ul",N,[e("li",w,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[1]||(t[1]=[s("I")])),_:1}),t[2]||(t[2]=s(" 查看系统信息 "))]),u(d).settings.toolbar.navSearch&&u(d).settings.navSearch.enableHotkeys?(m(),f("li",C,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[3]||(t[3]=[s("S")])),_:1}),t[4]||(t[4]=s(" 唤起导航搜索 "))])):r("",!0),e("li",D,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[5]||(t[5]=[s("L")])),_:1}),t[6]||(t[6]=s(" 锁屏 "))])])]),u(d).settings.menu.enableHotkeys&&["side","head"].includes(u(d).settings.menu.mode)?(m(),f("div",I,[t[10]||(t[10]=e("h2",{class:"m-0 text-lg font-bold"}," 主导航 ",-1)),e("ul",W,[e("li",j,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[8]||(t[8]=[s("`")])),_:1}),t[9]||(t[9]=s(" 激活下一个主导航 "))])])])):r("",!0),u(d).settings.tabbar.enable&&u(d).settings.tabbar.enableHotkeys?(m(),f("div",E,[t[21]||(t[21]=e("h2",{class:"m-0 text-lg font-bold"}," 标签栏 ",-1)),e("ul",J,[e("li",K,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[11]||(t[11]=[s("←")])),_:1}),t[12]||(t[12]=s(" 切换到上一个标签页 "))]),e("li",L,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[13]||(t[13]=[s("→")])),_:1}),t[14]||(t[14]=s(" 切换到下一个标签页 "))]),e("li",M,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[15]||(t[15]=[s("W")])),_:1}),t[16]||(t[16]=s(" 关闭当前标签页 "))]),e("li",P,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[17]||(t[17]=[s("1~9")])),_:1}),t[18]||(t[18]=s(" 切换到第 n 个标签页 "))]),e("li",R,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[19]||(t[19]=[s("0")])),_:1}),t[20]||(t[20]=s(" 切换到最后一个标签页 "))])])])):r("",!0),u(d).settings.mainPage.enableHotkeys?(m(),f("div",T,[t[26]||(t[26]=e("h2",{class:"m-0 text-lg font-bold"}," 页面 ",-1)),e("ul",U,[e("li",$,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[22]||(t[22]=[s("↑")])),_:1}),t[23]||(t[23]=s(" 最大化 "))]),e("li",q,[n(o,null,{default:l(()=>[s(i(u(d).os==="mac"?"⌥":"Alt"),1)]),_:1}),n(o,null,{default:l(()=>t[24]||(t[24]=[s("↓")])),_:1}),t[25]||(t[25]=s(" 退出最大化 "))])])])):r("",!0)])])]),_:1},8,["modelValue"])}}});export{X as _};
