
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as C,b,G as S,o as g,c as B,j as e,w as t,t as l,f as a,e as s,O as P,R as d}from"./index-fOXGxjjY.js";import{_ as I}from"./index.vue_vue_type_script_setup_true_lang-B6BWcwhA.js";import{u as x}from"./useTabbar-CtenUHdD.js";const y=s("p",null,"如果目标地址已在标签栏存在，则直接切换并访问。如果目标地址在标签栏不存在，则会在当前标签页后面插入新的标签页。",-1),O=s("p",null,"关闭当前标签页，同时跳转到新页面。",-1),R=s("p",null,"如果当前只有一个标签时，则无法关闭。",-1),E=s("p",null,"如果关闭的是当前标签页，则会在关闭后跳转至紧邻的标签页。",-1),L=s("p",null,"如果关闭的目标页面不存在，则无法关闭。",-1),N=s("p",null,"除了提供关闭非当前标签页的 API 外，还提供了校验 API 。",-1),V=C({__name:"index",setup(v){const i=b(),o=x();function _(){o.open(i.settings.home.fullPath)}function u(){o.close(i.settings.home.fullPath)}function f(){o.closeById()}function r(){o.closeById(i.settings.home.fullPath)}function h(){o.closeOtherSide()}function p(){o.closeLeftSide()}function m(){o.closeRightSide()}return(w,A)=>{const k=I,n=S("ElButton"),c=P;return g(),B("div",null,[e(k,{title:"标签栏",content:"功能类似于浏览器的标签栏，支持右键操作"}),e(c,{title:"打开新标签页"},{default:t(()=>[y,e(n,{onClick:_},{default:t(()=>[l(" 打开主页 ")]),_:1})]),_:1}),e(c,{title:"关闭当前标签页并跳转"},{default:t(()=>[O,e(n,{onClick:u},{default:t(()=>[l(" 关闭当前标签页，并跳转到主页 ")]),_:1})]),_:1}),e(c,{title:"关闭指定标签页"},{default:t(()=>[R,E,L,e(n,{onClick:f},{default:t(()=>[l(" 关闭当前页面 ")]),_:1}),e(n,{onClick:r},{default:t(()=>[l(" 关闭主页 ")]),_:1})]),_:1}),e(c,{title:"关闭非当前标签页"},{default:t(()=>[N,e(n,{disabled:!a(o).checkCloseOtherSide(),onClick:h},{default:t(()=>[l(" 关闭两侧标签页 ")]),_:1},8,["disabled"]),e(n,{disabled:!a(o).checkCloseLeftSide(),onClick:p},{default:t(()=>[l(" 关闭左侧标签页 ")]),_:1},8,["disabled"]),e(n,{disabled:!a(o).checkCloseRightSide(),onClick:m},{default:t(()=>[l(" 关闭右侧标签页 ")]),_:1},8,["disabled"])]),_:1})])}}});typeof d=="function"&&d(V);export{V as default};
