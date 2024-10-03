
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as $,r as T,a2 as j,a3 as J,a4 as Q,y as x,a5 as F,a6 as G,m as M,z as U,a7 as X,a8 as c,a9 as V,aa as Y,F as R,ab as Z,B as ee,ac as W,ad as C,ae as h,af as O,ag as ae,ah as te,ai as P,aj as y,ak as z,al as le,o as _,h as L,w as N,j as ne,c as re,U as ue,f as B,e as se,i as oe,q as ie,t as de,n as ce,_ as ve}from"./index-BSkZKgnl.js";import{s as pe}from"./use-resolve-button-type-BsZ6shIT.js";let fe=$({props:{onFocus:{type:Function,required:!0}},setup(e){let v=T(!0);return()=>v.value?j(Q,{as:"button",type:"button",features:J.Focusable,onFocus(d){d.preventDefault();let p,f=50;function u(){var l;if(f--<=0){p&&cancelAnimationFrame(p);return}if((l=e.onFocus)!=null&&l.call(e)){v.value=!1,cancelAnimationFrame(p);return}p=requestAnimationFrame(u)}p=requestAnimationFrame(u)}}):null}});var me=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(me||{}),be=(e=>(e[e.Less=-1]="Less",e[e.Equal=0]="Equal",e[e.Greater=1]="Greater",e))(be||{});let H=Symbol("TabsContext");function q(e){let v=W(H,null);if(v===null){let d=new Error(`<${e} /> is missing a parent <TabGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(d,q),d}return v}let K=Symbol("TabsSSRContext"),xe=$({name:"TabGroup",emits:{change:e=>!0},props:{as:{type:[Object,String],default:"template"},selectedIndex:{type:[Number],default:null},defaultIndex:{type:[Number],default:0},vertical:{type:[Boolean],default:!1},manual:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(e,{slots:v,attrs:d,emit:p}){var f;let u=T((f=e.selectedIndex)!=null?f:e.defaultIndex),l=T([]),n=T([]),I=x(()=>e.selectedIndex!==null),S=x(()=>I.value?e.selectedIndex:u.value);function g(t){var r;let o=F(s.tabs.value,c),a=F(s.panels.value,c),i=o.filter(m=>{var b;return!((b=c(m))!=null&&b.hasAttribute("disabled"))});if(t<0||t>o.length-1){let m=C(u.value===null?0:Math.sign(t-u.value),{[-1]:()=>1,0:()=>C(Math.sign(t),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0}),b=C(m,{0:()=>o.indexOf(i[0]),1:()=>o.indexOf(i[i.length-1])});b!==-1&&(u.value=b),s.tabs.value=o,s.panels.value=a}else{let m=o.slice(0,t),b=[...o.slice(t),...m].find(D=>i.includes(D));if(!b)return;let w=(r=o.indexOf(b))!=null?r:s.selectedIndex.value;w===-1&&(w=s.selectedIndex.value),u.value=w,s.tabs.value=o,s.panels.value=a}}let s={selectedIndex:x(()=>{var t,r;return(r=(t=u.value)!=null?t:e.defaultIndex)!=null?r:null}),orientation:x(()=>e.vertical?"vertical":"horizontal"),activation:x(()=>e.manual?"manual":"auto"),tabs:l,panels:n,setSelectedIndex(t){S.value!==t&&p("change",t),I.value||g(t)},registerTab(t){var r;if(l.value.includes(t))return;let o=l.value[u.value];if(l.value.push(t),l.value=F(l.value,c),!I.value){let a=(r=l.value.indexOf(o))!=null?r:u.value;a!==-1&&(u.value=a)}},unregisterTab(t){let r=l.value.indexOf(t);r!==-1&&l.value.splice(r,1)},registerPanel(t){n.value.includes(t)||(n.value.push(t),n.value=F(n.value,c))},unregisterPanel(t){let r=n.value.indexOf(t);r!==-1&&n.value.splice(r,1)}};G(H,s);let k=T({tabs:[],panels:[]}),E=T(!1);M(()=>{E.value=!0}),G(K,x(()=>E.value?null:k.value));let A=x(()=>e.selectedIndex);return M(()=>{U([A],()=>{var t;return g((t=e.selectedIndex)!=null?t:e.defaultIndex)},{immediate:!0})}),X(()=>{if(!I.value||S.value==null||s.tabs.value.length<=0)return;let t=F(s.tabs.value,c);t.some((r,o)=>c(s.tabs.value[o])!==c(r))&&s.setSelectedIndex(t.findIndex(r=>c(r)===c(s.tabs.value[S.value])))}),()=>{let t={selectedIndex:u.value};return j(R,[l.value.length<=0&&j(fe,{onFocus:()=>{for(let r of l.value){let o=c(r);if((o==null?void 0:o.tabIndex)===0)return o.focus(),!0}return!1}}),V({theirProps:{...d,...Y(e,["selectedIndex","defaultIndex","manual","vertical","onChange"])},ourProps:{},slot:t,slots:v,attrs:d,name:"TabGroup"})])}}}),ge=$({name:"TabList",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:v,slots:d}){let p=q("TabList");return()=>{let f={selectedIndex:p.selectedIndex.value},u={role:"tablist","aria-orientation":p.orientation.value};return V({ourProps:u,theirProps:e,slot:f,attrs:v,slots:d,name:"TabList"})}}}),he=$({name:"Tab",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:null}},setup(e,{attrs:v,slots:d,expose:p}){var f;let u=(f=e.id)!=null?f:`headlessui-tabs-tab-${Z()}`,l=q("Tab"),n=T(null);p({el:n,$el:n}),M(()=>l.registerTab(n)),ee(()=>l.unregisterTab(n));let I=W(K),S=x(()=>{if(I.value){let a=I.value.tabs.indexOf(u);return a===-1?I.value.tabs.push(u)-1:a}return-1}),g=x(()=>{let a=l.tabs.value.indexOf(n);return a===-1?S.value:a}),s=x(()=>g.value===l.selectedIndex.value);function k(a){var i;let m=a();if(m===O.Success&&l.activation.value==="auto"){let b=(i=te(n))==null?void 0:i.activeElement,w=l.tabs.value.findIndex(D=>c(D)===b);w!==-1&&l.setSelectedIndex(w)}return m}function E(a){let i=l.tabs.value.map(m=>c(m)).filter(Boolean);if(a.key===h.Space||a.key===h.Enter){a.preventDefault(),a.stopPropagation(),l.setSelectedIndex(g.value);return}switch(a.key){case h.Home:case h.PageUp:return a.preventDefault(),a.stopPropagation(),k(()=>P(i,y.First));case h.End:case h.PageDown:return a.preventDefault(),a.stopPropagation(),k(()=>P(i,y.Last))}if(k(()=>C(l.orientation.value,{vertical(){return a.key===h.ArrowUp?P(i,y.Previous|y.WrapAround):a.key===h.ArrowDown?P(i,y.Next|y.WrapAround):O.Error},horizontal(){return a.key===h.ArrowLeft?P(i,y.Previous|y.WrapAround):a.key===h.ArrowRight?P(i,y.Next|y.WrapAround):O.Error}}))===O.Success)return a.preventDefault()}let A=T(!1);function t(){var a;A.value||(A.value=!0,!e.disabled&&((a=c(n))==null||a.focus({preventScroll:!0}),l.setSelectedIndex(g.value),ae(()=>{A.value=!1})))}function r(a){a.preventDefault()}let o=pe(x(()=>({as:e.as,type:v.type})),n);return()=>{var a,i;let m={selected:s.value,disabled:(a=e.disabled)!=null?a:!1},{...b}=e,w={ref:n,onKeydown:E,onMousedown:r,onClick:t,id:u,role:"tab",type:o.value,"aria-controls":(i=c(l.panels.value[g.value]))==null?void 0:i.id,"aria-selected":s.value,tabIndex:s.value?0:-1,disabled:e.disabled?!0:void 0};return V({ourProps:w,theirProps:b,slot:m,attrs:v,slots:d,name:"Tab"})}}});const ke=$({__name:"HTabList",props:z({options:{}},{modelValue:{},modelModifiers:{}}),emits:z(["change"],["update:modelValue"]),setup(e,{emit:v}){const d=e,p=v,f=le(e,"modelValue"),u=x({get(){return d.options.findIndex(n=>n.value===f.value)},set(n){f.value=d.options[n].value}});U(f,n=>{n&&p("change",n)});function l(n){f.value=d.options[n].value}return(n,I)=>{const S=ve;return _(),L(B(xe),{"selected-index":B(u),onChange:l},{default:N(()=>[ne(B(ge),{class:"inline-flex select-none items-center justify-center rounded-md bg-stone-1 p-1 ring-1 ring-stone-2 dark-bg-stone-9 dark-ring-stone-8"},{default:N(()=>[(_(!0),re(R,null,ue(n.options,(g,s)=>(_(),L(B(he),{key:s,as:"template"},{default:N(({selected:k})=>[se("button",{class:ce(["w-full inline-flex items-center justify-center gap-1 whitespace-nowrap border-size-0 rounded-md bg-inherit px-2 py-1.5 text-sm text-dark ring-stone-2 ring-inset dark-text-white focus-outline-none focus-ring-2 dark-ring-stone-8",{"cursor-default bg-white dark-bg-dark-9":k,"cursor-pointer opacity-50 hover-opacity-100":!k}])},[g.icon?(_(),L(S,{key:0,name:g.icon,class:"flex-shrink-0"},null,8,["name"])):oe("",!0),ie(" "+de(g.label),1)],2)]),_:2},1024))),128))]),_:1})]),_:1},8,["selected-index"])}}});export{ke as _};
