
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{r as g,G as ne,H as j,bj as Ie,bk as Ce,d as we,bl as Me,B as Pe,ak as $e,e as O,o as x,f as $,h as u,w as h,i as D,t as ie,M as I,Q as ae,N as ue,j as l,q as G,Y as S,O as B,X as W,_ as ke,U as Ae,V as re}from"./index-DWg0Z22n.js";import{_ as Ge}from"./index.vue_vue_type_script_setup_true_lang-JUFD8zZa.js";import{i as Le}from"./index.es-DITh6tFD.js";import Ue from"./alert-DN0pv3DV.js";/**
 * Vue Currency Input 3.1.0
 * (c) 2018-2024 Matthias Stiller
 * @license MIT
 */var A;(function(r){r.symbol="symbol",r.narrowSymbol="narrowSymbol",r.code="code",r.name="name",r.hidden="hidden"})(A||(A={}));var k;(function(r){r.precision="precision",r.thousands="thousands",r.millions="millions",r.billions="billions"})(k||(k={}));const Z=r=>r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),me=r=>r.replace(/^0+(0$|[^0])/,"$1"),te=(r,e)=>(r.match(new RegExp(Z(e),"g"))||[]).length,Te=(r,e)=>r.substring(0,r.indexOf(e)),de=[",",".","٫","。"],ce="(0|[1-9]\\d*)";class ze{constructor(e){var i,n,o,v,d,f;const{currency:y,currencyDisplay:F,locale:a,precision:c,accountingSign:p,useGrouping:V}=e;this.locale=a,this.options={currency:y,useGrouping:V,style:"currency",currencySign:p?"accounting":void 0,currencyDisplay:F!==A.hidden?F:void 0};const b=new Intl.NumberFormat(a,this.options),E=b.formatToParts(123456);this.currency=(i=E.find(({type:m})=>m==="currency"))===null||i===void 0?void 0:i.value,this.digits=[0,1,2,3,4,5,6,7,8,9].map(m=>m.toLocaleString(a)),this.decimalSymbol=(n=E.find(({type:m})=>m==="decimal"))===null||n===void 0?void 0:n.value,this.groupingSymbol=(o=E.find(({type:m})=>m==="group"))===null||o===void 0?void 0:o.value,this.minusSign=(v=b.formatToParts(-1).find(({type:m})=>m==="minusSign"))===null||v===void 0?void 0:v.value,this.decimalSymbol===void 0?this.minimumFractionDigits=this.maximumFractionDigits=0:typeof c=="number"?this.minimumFractionDigits=this.maximumFractionDigits=c:(this.minimumFractionDigits=(d=c==null?void 0:c.min)!==null&&d!==void 0?d:b.resolvedOptions().minimumFractionDigits,this.maximumFractionDigits=(f=c==null?void 0:c.max)!==null&&f!==void 0?f:b.resolvedOptions().maximumFractionDigits);const N=m=>Te(m,this.digits[1]),R=m=>m.substring(m.lastIndexOf(this.decimalSymbol?this.digits[0]:this.digits[1])+1);this.prefix=N(b.format(1)),this.suffix=R(b.format(1)),this.negativePrefix=N(b.format(-1)),this.negativeSuffix=R(b.format(-1))}parse(e){if(e){const i=this.isNegative(e);e=this.normalizeDigits(e),e=this.stripCurrency(e,i),e=this.stripSignLiterals(e);const n=this.decimalSymbol?`(?:${Z(this.decimalSymbol)}(\\d*))?`:"",o=this.stripGroupingSeparator(e).match(new RegExp(`^${ce}${n}$`));if(o&&this.isValidIntegerFormat(this.decimalSymbol?e.split(this.decimalSymbol)[0]:e,Number(o[1])))return+`${i?"-":""}${this.onlyDigits(o[1])}.${this.onlyDigits(o[2]||"")}`}return null}isValidIntegerFormat(e,i){const n={...this.options,minimumFractionDigits:0};return[this.stripCurrency(this.normalizeDigits(i.toLocaleString(this.locale,{...n,useGrouping:!0})),!1),this.stripCurrency(this.normalizeDigits(i.toLocaleString(this.locale,{...n,useGrouping:!1})),!1)].includes(e)}format(e,i={minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits}){return e!=null?e.toLocaleString(this.locale,{...this.options,...i}):""}toFraction(e){return`${this.digits[0]}${this.decimalSymbol}${this.onlyLocaleDigits(e.substring(1)).substring(0,this.maximumFractionDigits)}`}isFractionIncomplete(e){return!!this.normalizeDigits(this.stripGroupingSeparator(e)).match(new RegExp(`^${ce}${Z(this.decimalSymbol)}$`))}isNegative(e){return e.startsWith(this.negativePrefix)||this.minusSign===void 0&&(e.startsWith("(")||e.startsWith("-"))||this.minusSign!==void 0&&e.replace("-",this.minusSign).startsWith(this.minusSign)}insertCurrency(e,i){return`${i?this.negativePrefix:this.prefix}${e}${i?this.negativeSuffix:this.suffix}`}stripGroupingSeparator(e){return this.groupingSymbol!==void 0?e.replace(new RegExp(Z(this.groupingSymbol),"g"),""):e}stripSignLiterals(e){return this.minusSign!==void 0?e.replace("-",this.minusSign).replace(this.minusSign,""):e.replace(/[-()]/g,"")}stripCurrency(e,i){return e.replace(i?this.negativePrefix:this.prefix,"").replace(i?this.negativeSuffix:this.suffix,"")}normalizeDecimalSeparator(e,i){return de.forEach(n=>{e=e.substring(0,i)+e.substring(i).replace(n,this.decimalSymbol)}),e}normalizeDigits(e){return this.digits[0]!=="0"&&this.digits.forEach((i,n)=>{e=e.replace(new RegExp(i,"g"),String(n))}),e}onlyDigits(e){return this.normalizeDigits(e).replace(/\D+/g,"")}onlyLocaleDigits(e){return e.replace(new RegExp(`[^${this.digits.join("")}]*`,"g"),"")}}class he{constructor(e){this.currencyFormat=e}}class Be extends he{conformToMask(e,i=""){const n=this.currencyFormat.isNegative(e),o=b=>b===""&&n&&!(this.currencyFormat.minusSign===void 0?i===this.currencyFormat.negativePrefix+this.currencyFormat.negativeSuffix:i===this.currencyFormat.negativePrefix),v=b=>{if(o(b))return"";if(this.currencyFormat.maximumFractionDigits>0){if(this.currencyFormat.isFractionIncomplete(b))return b;if(b.startsWith(this.currencyFormat.decimalSymbol))return this.currencyFormat.toFraction(b)}return null};let d=e;d=this.currencyFormat.stripCurrency(d,n),d=this.currencyFormat.stripSignLiterals(d);const f=v(d);if(f!=null)return this.currencyFormat.insertCurrency(f,n);const[y,...F]=d.split(this.currencyFormat.decimalSymbol),a=me(this.currencyFormat.onlyDigits(y)),c=this.currencyFormat.onlyDigits(F.join("")).substring(0,this.currencyFormat.maximumFractionDigits),p=F.length>0&&c.length===0,V=a===""&&n&&(this.currencyFormat.minusSign===void 0?i===e.slice(0,-2)+this.currencyFormat.negativeSuffix:i===e.slice(0,-1));return p||V||o(a)?i:a.match(/\d+/)?{numberValue:+`${n?"-":""}${a}.${c}`,fractionDigits:c}:""}}class We extends he{conformToMask(e,i=""){if(e===""||this.currencyFormat.parse(i)===0&&this.currencyFormat.stripCurrency(i,!0).slice(0,-1)===this.currencyFormat.stripCurrency(e,!0))return"";const n=this.currencyFormat.isNegative(e),o=this.currencyFormat.stripSignLiterals(e)===""?-0:+`${n?"-":""}${me(this.currencyFormat.onlyDigits(e))}`/Math.pow(10,this.currencyFormat.maximumFractionDigits);return{numberValue:o,fractionDigits:o.toFixed(this.currencyFormat.maximumFractionDigits).slice(-this.currencyFormat.maximumFractionDigits)}}}const je={locale:void 0,currency:void 0,currencyDisplay:void 0,hideGroupingSeparatorOnFocus:!0,hideCurrencySymbolOnFocus:!0,hideNegligibleDecimalDigitsOnFocus:!0,precision:void 0,autoDecimalDigits:!1,valueRange:void 0,useGrouping:void 0,valueScaling:void 0};class He{constructor(e){this.el=e.el,this.onInput=e.onInput,this.onChange=e.onChange,this.addEventListener(),this.init(e.options)}setOptions(e){this.init(e),this.format(this.currencyFormat.format(this.validateValueRange(this.numberValue))),this.onChange(this.getValue())}getValue(){return{number:this.valueScaling&&this.numberValue!=null?this.toInteger(this.numberValue,this.valueScaling):this.numberValue,formatted:this.formattedValue}}setValue(e){const i=this.valueScaling!==void 0&&e!=null?this.toFloat(e,this.valueScaling):e;i!==this.numberValue&&(this.format(this.currencyFormat.format(this.validateValueRange(i))),this.onChange(this.getValue()))}init(e){this.options={...je,...e},this.options.autoDecimalDigits&&(this.options.hideNegligibleDecimalDigitsOnFocus=!1),this.el.getAttribute("inputmode")||this.el.setAttribute("inputmode",this.options.autoDecimalDigits?"numeric":"decimal"),this.currencyFormat=new ze(this.options),this.numberMask=this.options.autoDecimalDigits?new We(this.currencyFormat):new Be(this.currencyFormat);const i={[k.precision]:this.currencyFormat.maximumFractionDigits,[k.thousands]:3,[k.millions]:6,[k.billions]:9};this.valueScaling=this.options.valueScaling?i[this.options.valueScaling]:void 0,this.valueScalingFractionDigits=this.valueScaling!==void 0&&this.options.valueScaling!==k.precision?this.valueScaling+this.currencyFormat.maximumFractionDigits:this.currencyFormat.maximumFractionDigits,this.minValue=this.getMinValue(),this.maxValue=this.getMaxValue()}getMinValue(){var e,i;let n=this.toFloat(-Number.MAX_SAFE_INTEGER);return((e=this.options.valueRange)===null||e===void 0?void 0:e.min)!==void 0&&(n=Math.max((i=this.options.valueRange)===null||i===void 0?void 0:i.min,this.toFloat(-Number.MAX_SAFE_INTEGER))),n}getMaxValue(){var e,i;let n=this.toFloat(Number.MAX_SAFE_INTEGER);return((e=this.options.valueRange)===null||e===void 0?void 0:e.max)!==void 0&&(n=Math.min((i=this.options.valueRange)===null||i===void 0?void 0:i.max,this.toFloat(Number.MAX_SAFE_INTEGER))),n}toFloat(e,i){return e/Math.pow(10,i??this.valueScalingFractionDigits)}toInteger(e,i){return Number(e.toFixed(i??this.valueScalingFractionDigits).split(".").join(""))}validateValueRange(e){return e!=null?Math.min(Math.max(e,this.minValue),this.maxValue):e}format(e,i=!1){if(e!=null){this.decimalSymbolInsertedAt!==void 0&&(e=this.currencyFormat.normalizeDecimalSeparator(e,this.decimalSymbolInsertedAt),this.decimalSymbolInsertedAt=void 0);const n=this.numberMask.conformToMask(e,this.formattedValue);let o;if(typeof n=="object"){const{numberValue:v,fractionDigits:d}=n;let{maximumFractionDigits:f,minimumFractionDigits:y}=this.currencyFormat;this.focus?y=i?d.replace(/0+$/,"").length:Math.min(f,d.length):Number.isInteger(v)&&!this.options.autoDecimalDigits&&(this.options.precision===void 0||y===0)&&(y=f=0),o=this.toInteger(Math.abs(v))>Number.MAX_SAFE_INTEGER?this.formattedValue:this.currencyFormat.format(v,{useGrouping:this.options.useGrouping!==!1&&!(this.focus&&this.options.hideGroupingSeparatorOnFocus),minimumFractionDigits:y,maximumFractionDigits:f})}else o=n;this.maxValue<=0&&!this.currencyFormat.isNegative(o)&&this.currencyFormat.parse(o)!==0&&(o=o.replace(this.currencyFormat.prefix,this.currencyFormat.negativePrefix)),this.minValue>=0&&(o=o.replace(this.currencyFormat.negativePrefix,this.currencyFormat.prefix)),(this.options.currencyDisplay===A.hidden||this.focus&&this.options.hideCurrencySymbolOnFocus)&&(o=o.replace(this.currencyFormat.negativePrefix,this.currencyFormat.minusSign!==void 0?this.currencyFormat.minusSign:"(").replace(this.currencyFormat.negativeSuffix,this.currencyFormat.minusSign!==void 0?"":")").replace(this.currencyFormat.prefix,"").replace(this.currencyFormat.suffix,"")),this.el.value=o,this.numberValue=this.currencyFormat.parse(o)}else this.el.value="",this.numberValue=null;this.formattedValue=this.el.value,this.onInput(this.getValue())}addEventListener(){this.el.addEventListener("input",e=>{const{value:i,selectionStart:n}=this.el,o=e;if(n&&o.data&&de.includes(o.data)&&(this.decimalSymbolInsertedAt=n-1),this.format(i),this.focus&&n!=null){const v=()=>{const{prefix:d,suffix:f,decimalSymbol:y,maximumFractionDigits:F,groupingSymbol:a}=this.currencyFormat;let c=i.length-n;const p=this.formattedValue.length;if(this.currencyFormat.minusSign===void 0&&(i.startsWith("(")||i.startsWith("-"))&&!i.endsWith(")"))return p-this.currencyFormat.negativeSuffix.length>1?this.formattedValue.substring(n).length:1;if(this.formattedValue.substring(n,1)===a&&te(this.formattedValue,a)===te(i,a)+1)return p-c-1;if(p<c)return n;if(y!==void 0&&i.indexOf(y)!==-1){const V=i.indexOf(y)+1;if(Math.abs(p-i.length)>1&&n<=V)return this.formattedValue.indexOf(y)+1;!this.options.autoDecimalDigits&&n>V&&this.currencyFormat.onlyDigits(i.substring(V)).length-1===F&&(c-=1)}return this.options.hideCurrencySymbolOnFocus||this.options.currencyDisplay===A.hidden?p-c:Math.max(p-Math.max(c,f.length),d.length)};this.setCaretPosition(v())}}),this.el.addEventListener("focus",()=>{this.focus=!0,this.numberValueOnFocus=this.numberValue,setTimeout(()=>{const{value:e,selectionStart:i,selectionEnd:n}=this.el;if(this.format(e,this.options.hideNegligibleDecimalDigitsOnFocus),i!=null&&n!=null&&Math.abs(i-n)>0)this.setCaretPosition(0,this.el.value.length);else if(i!=null){const o=this.getCaretPositionOnFocus(e,i);this.setCaretPosition(o)}})}),this.el.addEventListener("blur",()=>{this.focus=!1,this.format(this.currencyFormat.format(this.validateValueRange(this.numberValue))),this.numberValueOnFocus!==this.numberValue&&this.onChange(this.getValue())})}getCaretPositionOnFocus(e,i){if(this.numberValue==null)return i;const{prefix:n,negativePrefix:o,suffix:v,negativeSuffix:d,groupingSymbol:f,currency:y}=this.currencyFormat,F=this.numberValue<0,a=F?o:n,c=a.length;if(this.options.hideCurrencySymbolOnFocus||this.options.currencyDisplay===A.hidden){if(F){if(i<=1)return 1;if(e.endsWith(")")&&i>e.indexOf(")"))return this.formattedValue.length-1}}else{const V=F?d.length:v.length;if(i>=e.length-V)return this.formattedValue.length-V;if(i<c)return c}let p=i;return this.options.hideCurrencySymbolOnFocus&&this.options.currencyDisplay!==A.hidden&&i>=c&&y!==void 0&&a.includes(y)&&(p-=c,F&&(p+=1)),this.options.hideGroupingSeparatorOnFocus&&f!==void 0&&(p-=te(e.substring(0,i),f)),p}setCaretPosition(e,i=e){this.el.setSelectionRange(e,i)}}const Xe=r=>r!=null&&r.matches("input")?r:r==null?void 0:r.querySelector("input");function Ye(r,e){var i,n,o,v;let d;const f=g(null),y=g(null),F=g(null),a=Ie(),c=(a==null?void 0:a.emit)||((n=(i=a==null?void 0:a.proxy)===null||i===void 0?void 0:i.$emit)===null||n===void 0?void 0:n.bind(a==null?void 0:a.proxy)),p=(a==null?void 0:a.props)||((o=a==null?void 0:a.proxy)===null||o===void 0?void 0:o.$props),V=Ce.startsWith("3"),b=V&&((v=a==null?void 0:a.attrs.modelModifiers)===null||v===void 0?void 0:v.lazy),E=ne(()=>p==null?void 0:p[V?"modelValue":"value"]),N=V?"update:modelValue":"input",R=b?"update:modelValue":"change";return j(f,m=>{var C;if(m){const w=Xe((C=m==null?void 0:m.$el)!==null&&C!==void 0?C:m);w?(d=new He({el:w,options:r,onInput:M=>{!b&&e!==!1&&E.value!==M.number&&(c==null||c(N,M.number)),F.value=M.number,y.value=M.formatted},onChange:M=>{c==null||c(R,M.number)}}),d.setValue(E.value)):console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')}else d=null}),{inputRef:f,numberValue:F,formattedValue:y,setValue:m=>d==null?void 0:d.setValue(m),setOptions:m=>d==null?void 0:d.setOptions(m)}}const Je={class:"mb-6 min-w-0"},Ze={class:"mb-2 flex items-center justify-between"},qe={class:"text-xl font-medium"},Qe={key:0,class:"mb-2 text-sm opacity-30"},Ke={style:{"margin-bottom":"0"}},ei={class:"grid items-center gap-y-4 md-grid-cols-2 md-gap-x-8"},ii={class:"ml-2"},ti={class:"flex items-center justify-between"},ni={class:"grid grid-cols-1 gap-x-8 md-grid-cols-2"},li={class:"flex items-center space-x-4"},si=D("span",{class:"text-center"},"to",-1),oi=we({__name:"currency.input",setup(r){const e=Me(),i=g(!1),n=g("zh-ZH"),o=g(["de-DE","de-CH","en-US","en-IN","nl-NL","sv-SE","fr-FR","es-ES","pt-PT","pt-BR","zh-ZH","ja-JP","ar-SA","fa-IR","bg-BG"]),v=g("CNY"),d=g(["EUR","USD","GBP","BRL","INR","CNY","JPY","SAR","IRR","BGN"]),f=g("symbol"),y=g([{value:"symbol",label:"Symbol"},{value:"narrowSymbol",label:"Narrow symbol"},{value:"code",label:"Code"},{value:"name",label:"Name"},{value:"hidden",label:"Hidden"}]),F=g(!1),a=g(!0),c=g(!0),p=g(!0),V=g(!0),b=g(!0),E=g(!1),N=g(void 0),R=g(void 0),m=g(!1),C=g(!1),w=g([2,5]);function M(_,s){return Array(s-_).fill(_).map((K,ee)=>K+ee)}const H=g(2),ge=ne(()=>M(1,16)),L=g(!1),X=g("precision"),pe=g([{value:"precision",label:"Precision"},{value:"thousands",label:"Thousands"},{value:"millions",label:"Millions"},{value:"billions",label:"Billions"}]),U=g(!1);j(U,_=>{b.value=!_,V.value=!_});const q=ne(()=>({locale:i.value?n.value:void 0,currency:v.value,currencyDisplay:f.value,valueRange:E.value?{min:N.value===""?void 0:N.value,max:R.value===""?void 0:R.value}:void 0,precision:m.value?C.value?{min:w.value[0],max:w.value[1]}:H.value:void 0,hideCurrencySymbolOnFocus:c.value,hideGroupingSeparatorOnFocus:p.value,hideNegligibleDecimalDigitsOnFocus:V.value,autoDecimalDigits:U.value,valueScaling:L.value?X.value:void 0,useGrouping:a.value,accountingSign:F.value})),{inputRef:fe,setValue:ve,setOptions:be,numberValue:Y,formattedValue:Q}=Ye(q.value);j(q,_=>{be(_)}),j(Y,_=>{ve(_)},{immediate:!0}),Pe(()=>{Y.value=1234.5});const{copy:ye,copied:Fe,isSupported:Ve}=$e();j(Fe,_=>{_&&Le.success("复制成功",{zIndex:2e3})});function Se(){ye(JSON.stringify(q.value,null,2))}function xe(_){window.open(_,"_blank")}return(_,s)=>{const K=O("ElTag"),ee=ke,De=O("ElButton"),_e=Ge,Ee=O("el-input"),le=Ae,Ne=O("el-button"),P=O("el-switch"),T=O("el-option"),z=O("el-select"),J=O("el-checkbox"),se=O("el-input-number"),Re=O("el-slider");return x(),$("div",null,[u(l(e).define,null,{default:h(({$slots:t,label:Oe,description:oe})=>[D("section",Je,[D("div",Ze,[D("span",qe,ie(Oe),1),(x(),I(ae(t.switch)))]),oe?(x(),$("div",Qe,ie(oe),1)):ue("",!0),(x(),I(ae(t.default)))])]),_:1}),u(Ue),u(_e,{title:"货币格式输入"},{content:h(()=>[D("p",Ke,[G(" 安装命令："),u(K,null,{default:h(()=>[G("pnpm add vue-currency-input")]),_:1})])]),default:h(()=>[u(De,{onClick:s[0]||(s[0]=t=>xe("https://github.com/dm4t2/vue-currency-input"))},{icon:h(()=>[u(ee,{name:"i-ep:link"})]),default:h(()=>[G(" 访问 vue-currency-input ")]),_:1})]),_:1}),u(le,null,{default:h(()=>[D("div",ei,[u(Ee,{ref_key:"inputRef",ref:fe,modelValue:l(Q),"onUpdate:modelValue":s[1]||(s[1]=t=>S(Q)?Q.value=t:null)},null,8,["modelValue"]),D("div",null,[G(" 数值："),D("code",ii,ie(l(Y)!=null?l(Y):"null"),1)])])]),_:1}),u(le,{title:"选项"},{title:h(()=>[D("div",ti,[G(" 选项 "),l(Ve)?(x(),I(Ne,{key:0,size:"small",onClick:Se},{default:h(()=>[G(" 复制选项 ")]),_:1})):ue("",!0)])]),default:h(()=>[D("div",ni,[D("div",null,[u(l(e).reuse,{label:"地理位置"},{switch:h(()=>[u(P,{modelValue:l(i),"onUpdate:modelValue":s[2]||(s[2]=t=>S(i)?i.value=t:null)},null,8,["modelValue"])]),default:h(()=>[u(z,{modelValue:l(n),"onUpdate:modelValue":s[3]||(s[3]=t=>S(n)?n.value=t:null),disabled:!l(i)},{default:h(()=>[(x(!0),$(B,null,W(l(o),t=>(x(),I(T,{key:t,value:t,label:t},null,8,["value","label"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),u(l(e).reuse,{label:"货币"},{default:h(()=>[u(z,{modelValue:l(v),"onUpdate:modelValue":s[4]||(s[4]=t=>S(v)?v.value=t:null)},{default:h(()=>[(x(!0),$(B,null,W(l(d),t=>(x(),I(T,{key:t,value:t,label:t},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),u(l(e).reuse,{label:"货币显示",description:"如何在格式化中显示货币"},{default:h(()=>[u(z,{modelValue:l(f),"onUpdate:modelValue":s[5]||(s[5]=t=>S(f)?f.value=t:null)},{default:h(()=>[(x(!0),$(B,null,W(l(y),t=>(x(),I(T,{key:t.value,value:t.value,label:t.label},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),u(l(e).reuse,{label:"会计标志",description:"是否使用会计符号格式化"},{switch:h(()=>[u(P,{modelValue:l(F),"onUpdate:modelValue":s[6]||(s[6]=t=>S(F)?F.value=t:null)},null,8,["modelValue"])]),_:1}),u(l(e).reuse,{label:"使用分组",description:"是否使用分组分隔符，如千/万/千万分隔符"},{switch:h(()=>[u(P,{modelValue:l(a),"onUpdate:modelValue":s[7]||(s[7]=t=>S(a)?a.value=t:null)},null,8,["modelValue"])]),_:1}),u(l(e).reuse,{label:"无干扰输入",description:"对焦时隐藏格式的不同部分，以方便输入"},{default:h(()=>[D("div",null,[u(J,{modelValue:l(c),"onUpdate:modelValue":s[8]||(s[8]=t=>S(c)?c.value=t:null),label:"隐藏货币符号"},null,8,["modelValue"])]),D("div",null,[u(J,{modelValue:l(p),"onUpdate:modelValue":s[9]||(s[9]=t=>S(p)?p.value=t:null),label:"隐藏分组分隔符"},null,8,["modelValue"])]),D("div",null,[u(J,{modelValue:l(V),"onUpdate:modelValue":s[10]||(s[10]=t=>S(V)?V.value=t:null),disabled:!l(b),label:"隐藏可忽略的小数位数"},null,8,["modelValue","disabled"])])]),_:1})]),D("div",null,[u(l(e).reuse,{label:"数值范围",description:"验证在模糊时触发，并在超出范围时自动设置相应的阈值"},{switch:h(()=>[u(P,{modelValue:l(E),"onUpdate:modelValue":s[11]||(s[11]=t=>S(E)?E.value=t:null)},null,8,["modelValue"])]),default:h(()=>[D("div",li,[u(se,{modelValue:l(N),"onUpdate:modelValue":s[12]||(s[12]=t=>S(N)?N.value=t:null),disabled:!l(E),placeholder:"最小值",class:"flex-1"},null,8,["modelValue","disabled"]),si,u(se,{modelValue:l(R),"onUpdate:modelValue":s[13]||(s[13]=t=>S(R)?R.value=t:null),disabled:!l(E),placeholder:"最大值",class:"flex-1"},null,8,["modelValue","disabled"])])]),_:1}),u(l(e).reuse,{label:"精确度",description:"覆盖显示的小数位数，仅适用于支持小数位的货币"},{switch:h(()=>[u(P,{modelValue:l(m),"onUpdate:modelValue":s[14]||(s[14]=t=>S(m)?m.value=t:null)},null,8,["modelValue"])]),default:h(()=>[D("div",null,[u(J,{modelValue:l(C),"onUpdate:modelValue":s[15]||(s[15]=t=>S(C)?C.value=t:null),disabled:!l(m),label:"使用范围"},null,8,["modelValue","disabled"]),l(C)?(x(),I(Re,{key:0,modelValue:l(w),"onUpdate:modelValue":s[16]||(s[16]=t=>S(w)?w.value=t:null),range:"","show-stops":"",min:1,max:15},null,8,["modelValue"])):(x(),I(z,{key:1,modelValue:l(H),"onUpdate:modelValue":s[17]||(s[17]=t=>S(H)?H.value=t:null),disabled:!l(m)},{default:h(()=>[(x(!0),$(B,null,W(l(ge),t=>(x(),I(T,{key:t,value:t,label:t},null,8,["value","label"]))),128))]),_:1},8,["modelValue","disabled"]))])]),_:1}),u(l(e).reuse,{label:"数值缩放",description:"对输出值进行缩放"},{switch:h(()=>[u(P,{modelValue:l(L),"onUpdate:modelValue":s[18]||(s[18]=t=>S(L)?L.value=t:null)},null,8,["modelValue"])]),default:h(()=>[u(z,{modelValue:l(X),"onUpdate:modelValue":s[19]||(s[19]=t=>S(X)?X.value=t:null),disabled:!l(L)},{default:h(()=>[(x(!0),$(B,null,W(l(pe),t=>(x(),I(T,{key:t.value,value:t.value,label:t.label},null,8,["value","label"]))),128))]),_:1},8,["modelValue","disabled"])]),_:1}),u(l(e).reuse,{label:"自动小数位",description:"是否自动插入小数符号，将最后输入的数字作为小数位"},{switch:h(()=>[u(P,{modelValue:l(U),"onUpdate:modelValue":s[20]||(s[20]=t=>S(U)?U.value=t:null)},null,8,["modelValue"])]),_:1})])])]),_:1})])}}});typeof re=="function"&&re(oi);export{oi as default};