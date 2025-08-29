(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();const ft={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},yt={Housing:"F",Insurance:"F",Investments:"FS",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function vt(t,i=1){const e=[];let a=i,o=t;for(let s=0;s<12;s++)e.push(`${o}-${String(a).padStart(2,"0")}`),a++,a>12&&(a=1,o++);return e}function lt(t,i){if(t.months[i])Object.keys(B).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(B[e]).forEach(a=>{a in t.months[i].budget[e]||(t.months[i].budget[e][a]=B[e][a]),a in t.months[i].actual[e]||(t.months[i].actual[e][a]=B[e][a])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},a={};Object.keys(B).forEach(o=>{e[o]={},a[o]={},Object.keys(B[o]).forEach(s=>{e[o][s]=B[o][s],a[o][s]=B[o][s]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:a}}}const Nt="rohmee_budget_live",Pt=2,Kt=108e3;function zt(){let t=localStorage.getItem(Nt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Ht(e),(!e.order||!e.order.length)&&(e.order=vt(2025,9)),e.order.forEach(a=>lt(e,a)),e.icons=e.icons||ft,e.tags=e.tags||yt,e.categories=e.categories||JSON.parse(JSON.stringify(B)),Object.assign(B,e.categories),e}catch{}const i={defaultIncome:Kt,target:25e4,cpi:1,order:vt(2025,9),months:{},icons:ft,tags:yt,selected:null,version:Pt,categories:JSON.parse(JSON.stringify(B))};return i.order.forEach(e=>lt(i,e)),mt(i),i}function mt(t){t.categories=JSON.parse(JSON.stringify(B)),localStorage.setItem(Nt,JSON.stringify(t))}function Gt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Dt(t,i){const e=new FileReader;e.onload=()=>{try{const a=JSON.parse(e.result);Ht(a),a.categories&&(Object.keys(B).forEach(o=>delete B[o]),Object.assign(B,a.categories)),mt(a),i(a)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Ht(t){t.version<2&&(t.defaultIncome=t.income||Kt,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Pt}function P(t,i){lt(t,i);const e=t.months[i],a=xt(e.budget),o=xt(e.actual);let s=0,n=0,r=0;return Object.keys(a).forEach(v=>{s+=a[v];const y=o[v]||0;(t.tags[v]||"V").includes("S")?r+=y:n+=y}),{bParents:a,aParents:o,bTotal:s,aTotal:n,aSavings:r}}function Jt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function F(t,i){return i/(t.cpi||1)}function qt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function xt(t){let i={};return Object.keys(t).forEach(e=>i[e]=qt(t[e])),i}function Wt(t,i){const e=document.getElementById("controls"),a=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${C(t.months[a].income||0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${C(t.target)}">
        <span id="savTargetFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>CPI factor (real SEK toggle)</label>
        <input id="cpiFactor" type="number" step="0.01" value="${t.cpi}">
        <span id="cpiFactorFeedback" class="feedback-icon"></span>
      </div>
      <div class="row">
        <button class="btn ghost" id="exportCSV">Export CSV</button>
        <button class="btn" id="saveJSON">Save JSON</button>
        <label for="loadJsonInput" class="chip">Load JSON</label>
        <input id="loadJsonInput" type="file" accept="application/json" style="display:none">
      </div>
      <div class="row">
        <button class="btn ghost" id="clearMonth">Clear Month</button>
        <button class="btn ghost" id="copyBudget">Copy Last Budget</button>
      </div>
      <div class="help" style="color:var(--muted)">Tip: double‑click names to rename; +/− to add/remove; click parent to highlight; ▸ to collapse/expand; F/V to toggle fixed vs variable.</div>
    </div>
  `;const o=e.querySelector("#monthSel"),s=a.slice(5,7),n=a.slice(0,4),r=[];if(parseInt(s)>=9){for(let h=9;h<=12;h++){const m=`${n}-${h.toString().padStart(2,"0")}`;t.order.includes(m)&&r.push(m)}const p=(parseInt(n)+1).toString();for(let h=1;h<=8;h++){const m=`${p}-${h.toString().padStart(2,"0")}`;t.order.includes(m)&&r.push(m)}}else{const p=(parseInt(n)-1).toString();for(let h=9;h<=12;h++){const m=`${p}-${h.toString().padStart(2,"0")}`;t.order.includes(m)&&r.push(m)}for(let h=1;h<=8;h++){const m=`${n}-${h.toString().padStart(2,"0")}`;t.order.includes(m)&&r.push(m)}}t.order.forEach(p=>{r.includes(p)||r.push(p)}),r.forEach(p=>{const h=document.createElement("option");h.value=p,h.textContent=p,o.appendChild(h)}),o.value=a;const v=e.querySelector("#netIncome"),y=e.querySelector("#savTarget"),S=e.querySelector("#cpiFactor");function C(p){return Math.round(p).toLocaleString("sv-SE")}function L(p){return parseFloat(p.replace(/\s/g,"").replace(",","."))||0}o.addEventListener("change",p=>{v.value=C(t.months[o.value].income||0),y.value=C(t.target),S.value=t.cpi,i()}),v.addEventListener("input",p=>{const h=p.target.value.replace(/\s/g,""),m=L(h);isNaN(m)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[o.value].income=m,p.target.value=C(m),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),y.addEventListener("input",p=>{const h=p.target.value.replace(/\s/g,""),m=L(h);isNaN(m)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=m,p.target.value=C(m),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),S.addEventListener("input",p=>{const h=parseFloat(p.target.value);isNaN(h)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=h,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>Gt(t)),e.querySelector("#loadJsonInput").addEventListener("change",p=>{const h=p.target.files[0];h&&Dt(h,m=>{Object.assign(t,m),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const p=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(T=>{const x=t.months[T];Object.keys(x.budget).forEach(w=>Object.keys(x.budget[w]).forEach(M=>{p.push([T,w,M,x.budget[w][M],x.actual[w][M]])}))});const h=p.map(T=>T.map(x=>`"${String(x).replace('"','""')}"`).join(",")).join(`
`),m=document.createElement("a");m.href=URL.createObjectURL(new Blob([h],{type:"text/csv"})),m.download="budget.csv",m.click(),setTimeout(()=>URL.revokeObjectURL(m.href),1e3)}),e.querySelector("#clearMonth").addEventListener("click",()=>{const p=o.value,h=t.months[p];confirm(`Clear all budget and actual amounts for ${p}?`)&&(Object.keys(h.budget).forEach(m=>{Object.keys(h.budget[m]).forEach(T=>{h.budget[m][T]=0})}),Object.keys(h.actual).forEach(m=>{Object.keys(h.actual[m]).forEach(T=>{h.actual[m][T]=0})}),i())}),e.querySelector("#copyBudget").addEventListener("click",()=>{const p=o.value,h=t.order.indexOf(p);if(h>0){const m=t.order[h-1],T=t.months[p],x=t.months[m];confirm(`Copy budget amounts from ${m} to ${p}?`)&&(Object.keys(x.budget).forEach(w=>{T.budget[w]||(T.budget[w]={}),Object.keys(x.budget[w]).forEach(M=>{T.budget[w][M]=x.budget[w][M]})}),i())}else alert("No previous month available to copy from.")})}let _={};function gt(t,i){const e=document.getElementById("monthSel").value,a=document.querySelector("#dataTable tbody");a.innerHTML="";const o=t.months[e];Object.keys(B).forEach(n=>{const r=St(o.budget[n]||{}),v=St(o.actual[n]||{}),y=document.createElement("tr");y.className="parent"+(v>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(y.style.backgroundColor="rgba(59, 130, 246, 0.2)",y.style.borderLeft="4px solid #3b82f6");const S=document.createElement("td"),C=document.createElement("span");C.textContent=_[n]?"▾":"▸",C.className="toggle",C.title="Collapse/expand",C.onclick=()=>{_[n]=!_[n],gt(t,i)};const L=document.createElement("span");L.className="icon",L.textContent=t.icons[n]||"",L.title="Click to set emoji",L.style.cursor="pointer",L.onclick=()=>{const d=prompt("Set emoji for "+n+":",t.icons[n]||"");d&&(t.icons[n]=d,i&&i())};const p=document.createElement("span");p.textContent=n,p.style.cursor="pointer",p.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},p.ondblclick=()=>{const d=prompt("Rename parent:",n);!d||B[d]||(B[d]=B[n],delete B[n],t.icons[d]=t.icons[n],delete t.icons[n],t.tags[d]=t.tags[n],delete t.tags[n],t.order.forEach(l=>{const c=t.months[l];c.budget[d]=c.budget[n],c.actual[d]=c.actual[n],delete c.budget[n],delete c.actual[n]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},y.onclick=d=>{d.target.closest(".rowtools")||d.target.closest(".toggle")||d.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(y.style.background="rgba(59, 130, 246, 0.2)",y.style.borderLeft="4px solid #3b82f6");const h=document.createElement("span");h.className="rowtools";const m=document.createElement("span");m.className="chip";const T=t.tags[n]||"V";T==="FS"?(m.textContent="Fixed+Savings",m.style.backgroundColor="#10b981",m.style.color="white"):T==="VS"?(m.textContent="Variable+Savings",m.style.backgroundColor="#10b981",m.style.color="white"):m.textContent=T==="F"?"Fixed":"Variable",m.title="Toggle Fixed/Variable/Savings",m.onclick=()=>{const d=t.tags[n]||"V";d==="F"?t.tags[n]="FS":d==="FS"?t.tags[n]="V":d==="V"?t.tags[n]="VS":d==="VS"&&(t.tags[n]="F"),i&&i()};const x=document.createElement("span");x.className="chip",x.textContent="+",x.title="Add subcategory",x.onclick=()=>{const d=prompt("New subcategory under "+n+":");d&&(B[n][d]=0,t.order.forEach(l=>{const c=t.months[l];c.budget[n][d]=0,c.actual[n][d]=0}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())};const w=document.createElement("span");w.className="chip",w.textContent="−",w.title="Delete parent",w.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(d=>{const l=t.months[d];delete l.budget[n],delete l.actual[n]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},h.appendChild(m),h.appendChild(x),h.appendChild(w),S.appendChild(C),S.appendChild(L),S.appendChild(p),S.appendChild(h),y.appendChild(S);const M=document.createElement("td");M.className="num",M.textContent=Z(F(t,r)),y.appendChild(M);const k=document.createElement("td");k.className="num",k.textContent=Z(F(t,v)),y.appendChild(k);const I=document.createElement("td");I.className="num",I.textContent=Z(F(t,r-v)),y.appendChild(I),a.appendChild(y),_[n]&&Object.keys(B[n]).forEach(d=>{const l=document.createElement("tr");(o.actual[n]||{})[d]>(o.budget[n]||{})[d]&&(l.className="over");const c=document.createElement("td"),u=document.createElement("span");u.textContent="• "+d,u.title="Double-click to rename",u.style.cursor="pointer",u.ondblclick=()=>{const $=prompt("Rename subcategory:",d);!$||B[n][$]||(B[n][$]=B[n][d],delete B[n][d],t.order.forEach(E=>{const O=t.months[E];O.budget[n][$]=O.budget[n][d],O.actual[n][$]=O.actual[n][d],delete O.budget[n][d],delete O.actual[n][d]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},c.appendChild(u);const b=document.createElement("span");b.className="chip",b.textContent="−",b.title="Delete subcategory",b.style.marginLeft="8px",b.onclick=()=>{confirm("Delete "+d+"?")&&(delete B[n][d],t.order.forEach($=>{const E=t.months[$];delete E.budget[n][d],delete E.actual[n][d]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},c.appendChild(b),l.appendChild(c);const A=document.createElement("td");A.className="num",A.appendChild(At(t,e,n,d,"budget",(o.budget[n]||{})[d]||0,i)),l.appendChild(A);const g=document.createElement("td");g.className="num",g.appendChild(At(t,e,n,d,"actual",(o.actual[n]||{})[d]||0,i)),l.appendChild(g);const f=document.createElement("td");f.className="num",f.textContent=Z(F(t,((o.budget[n]||{})[d]||0)-((o.actual[n]||{})[d]||0))),l.appendChild(f),a.appendChild(l)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const v=t.months[r];v.budget[n]={},v.actual[n]={}}),document.getElementById("newParentName").value="",t.categories=JSON.parse(JSON.stringify(B)),i&&i()}}}function At(t,i,e,a,o,s,n){const r=document.createElement("input");r.type="number",r.value=s,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const v=y=>{const S=+r.value||0;t.months[i][o][e][a]=S,n&&n()};return r.addEventListener("keydown",y=>{y.key==="Enter"?(v(y.shiftKey?"up":"down"),y.preventDefault()):y.key==="Escape"&&(r.value=s,r.blur())}),r.addEventListener("blur",()=>v()),r}function St(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function Z(t){return Math.round(t).toLocaleString("sv-SE")}class Ut{constructor(i){this.state=i}generateInsights(i){const e=[],a=this.getRecentMonths(i,6);if(a.length<3)return e;const o=this.analyzeTrend(a);o&&e.push(o);const s=this.analyzeBudgetVariance(a);s&&e.push(s);const n=this.analyzeCategorySpending(a);e.push(...n);const r=this.analyzeSavingsRate(a);r&&e.push(r);const v=this.analyzeSeasonalPatterns(i);return v&&e.push(v),e.slice(0,8)}getRecentMonths(i,e){const a=parseInt(i.slice(0,4)),o=parseInt(i.slice(5,7)),s=[];for(let n=0;n<e;n++){let r=o-n,v=a;r<=0&&(r+=12,v-=1);const y=`${v}-${r.toString().padStart(2,"0")}`;this.state.months[y]&&s.unshift({key:y,data:P(this.state,y),income:this.state.months[y].income||0})}return s}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(o=>o.data.aTotal)),a=i.reduce((o,s)=>o+s.data.aTotal,0)/i.length;if(Math.abs(e)<a*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const o=e/a*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${o.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:o>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/a*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],a=e.data.aTotal-e.data.bTotal,o=a/e.data.bTotal*100;return Math.abs(o)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(o).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:a>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(a)} SEK (${o.toFixed(1)}%).`,impact:o>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(a))} SEK (${Math.abs(o).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],a=i[i.length-1];if(i.length>=2){const o=i[i.length-2];Object.keys(a.data.aParents).forEach(s=>{const n=a.data.aParents[s]||0,r=o.data.aParents[s]||0;if(r>0){const v=(n-r)/r*100;if(Math.abs(v)>20&&Math.abs(n-r)>1e3){const y=this.getCategoryIcon(s);v>0?e.push({type:"warning",category:"spending",title:`${s} Spending Increased`,message:`${s} spending increased by ${v.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:v>50?"high":"medium",icon:y,recommendation:`Review your ${s.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${s} Spending Decreased`,message:`Great! ${s} spending decreased by ${Math.abs(v).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:y})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],a=e.income>0?(e.income-e.data.aTotal+(e.data.aSavings||0))/e.income*100:0;return a<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${a.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:a>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${a.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${a.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,a=e*(e-1)/2,o=i.reduce((r,v)=>r+v,0),s=i.reduce((r,v,y)=>r+y*v,0),n=i.reduce((r,v,y)=>r+y*y,0);return(e*s-a*o)/(e*n-a*a)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],a=this.getRecentMonths(i,3);if(a.length===0)return e;const o=a[a.length-1],r=a.reduce((y,S)=>y+S.data.aTotal,0)/a.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(o.income>0?(o.income-o.data.aTotal+(o.data.aSavings||0))/o.income*100:0)>15){const y=(o.income-o.data.aTotal+(o.data.aSavings||0))*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(y)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Rt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const a=new Ut(t),o=a.generateInsights(i),s=a.generateRecommendations(i);if(e.innerHTML="",o.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");o.forEach((v,y)=>{const S=Xt(v);r.appendChild(S)})}if(s.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");s.forEach((v,y)=>{const S=_t(v);r.appendChild(S)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,v)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},v*100)})})}function Xt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
    <div class="insight-header">
      <div class="insight-icon-wrapper">
        <span class="insight-emoji">${t.icon}</span>
      </div>
      <div class="insight-meta">
        <h4 class="insight-title">${t.title}</h4>
        ${o.text?`<span class="insight-badge" style="color: ${o.color}">${o.text}</span>`:""}
      </div>
    </div>
    <p class="insight-message">${t.message}</p>
    ${t.recommendation?`
      <div class="insight-recommendation">
        <span class="recommendation-label">💡 Recommendation:</span>
        <p>${t.recommendation}</p>
      </div>
    `:""}
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-4px)",e.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),e}function _t(t,i){const e=document.createElement("div");e.className=`recommendation-card recommendation-${t.priority}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return e.innerHTML=`
    <div class="recommendation-header">
      <span class="recommendation-icon">${t.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${t.title}</h4>
        <span class="recommendation-priority" style="color: ${a[t.priority]}">
          ${t.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${t.message}</p>
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateX(8px)",e.style.borderLeftColor=a[t.priority]}),e.addEventListener("mouseleave",()=>{e.style.transform="translateX(0)",e.style.borderLeftColor="var(--panel-border)"}),e}function Zt(){const t=document.createElement("style");t.textContent=`
    .insights-section {
      margin-bottom: var(--gap-lg);
    }

    .insights-title {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--gap);
      padding-bottom: var(--gap-sm);
      border-bottom: 2px solid var(--panel-border);
    }

    .insights-icon {
      font-size: 1.5rem;
    }

    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--gap);
    }

    .insight-card {
      background: rgba(10, 18, 36, 0.8);
      backdrop-filter: blur(15px);
      border: 1px solid var(--panel-border);
      border-radius: var(--radius-sm);
      padding: var(--pad);
      box-shadow: var(--shadow-md);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .insight-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient-primary);
      opacity: 0.7;
    }

    .insight-card.insight-positive::before {
      background: var(--gradient-success);
    }

    .insight-card.insight-warning::before {
      background: var(--gradient-warning);
    }

    .insight-header {
      display: flex;
      align-items: flex-start;
      gap: var(--gap-sm);
      margin-bottom: var(--gap-sm);
    }

    .insight-icon-wrapper {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: rgba(59, 130, 246, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .insight-emoji {
      font-size: 1.25rem;
    }

    .insight-meta {
      flex: 1;
    }

    .insight-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .insight-badge {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .insight-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 var(--gap-sm) 0;
    }

    .insight-recommendation {
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: var(--radius-sm);
      padding: var(--pad-sm);
      margin-top: var(--gap-sm);
    }

    .recommendation-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-primary);
      display: block;
      margin-bottom: 4px;
    }

    .insight-recommendation p {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .recommendations-list {
      display: flex;
      flex-direction: column;
      gap: var(--gap-sm);
    }

    .recommendation-card {
      background: rgba(10, 18, 36, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid var(--panel-border);
      border-left: 4px solid var(--panel-border);
      border-radius: var(--radius-sm);
      padding: var(--pad);
      transition: all var(--transition-normal);
      cursor: pointer;
    }

    .recommendation-header {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      margin-bottom: var(--gap-sm);
    }

    .recommendation-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .recommendation-content {
      flex: 1;
    }

    .recommendation-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .recommendation-priority {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .recommendation-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }

    @media (max-width: 768px) {
      .insights-grid {
        grid-template-columns: 1fr;
      }
      
      .insight-card {
        padding: var(--pad-sm);
      }
      
      .insights-title {
        font-size: 1.125rem;
      }
    }
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function U(t,i,e,a="start",o="#cbd5e1",s=12,n="normal"){const r=D("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",a),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function wt(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(D("defs")),s=D("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=D("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",a),s.appendChild(n),s.appendChild(r),o.appendChild(s),`url(#${i})`}function Qt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=i.slice(0,4),o=parseInt(i.slice(5,7)),s=[];if(o>=9){for(let E=9;E<=12;E++){const O=`${a}-${E.toString().padStart(2,"0")}`;s.push(O)}const $=(parseInt(a)+1).toString();for(let E=1;E<=8;E++){const O=`${$}-${E.toString().padStart(2,"0")}`;s.push(O)}}else{const $=(parseInt(a)-1).toString();for(let E=9;E<=12;E++){const O=`${$}-${E.toString().padStart(2,"0")}`;s.push(O)}for(let E=1;E<=8;E++){const O=`${a}-${E.toString().padStart(2,"0")}`;s.push(O)}}const n=t.order.indexOf(i),v=s.filter($=>{const E=t.order.indexOf($);return E>=0&&E<=n}).map($=>{const E=t.months[$];if(!E)return 0;const O=E.income||0,H=P(t,$).aTotal||0;return Math.max(0,O-H)}).reduce(($,E)=>$+E,0),y=t.target||0,S=y>0?Math.min(1,v/y):0,C=wt(e,"gaugeProgress","#10b981","#059669"),L=wt(e,"gaugeBg","#1e293b","#0f172a"),p=U(380,150,`${Math.round(S*100)}%`,"middle","#10b981",80,"900");e.appendChild(p);const h=U(380,240,`${Et(F(t,v))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(h);const m=U(380,290,`of ${Et(F(t,y))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(m);const T=S>=1?"#10b981":S>=.8?"#f59e0b":"#ef4444",x=S>=1?"✓ Target Achieved":S>=.8?"⚡ On Track":"⚠ Behind Target",w=U(380,350,x,"middle",T,24,"600");e.appendChild(w);const M=500,k=30,I=380-M/2,d=380,l=D("rect");l.setAttribute("x",I),l.setAttribute("y",d),l.setAttribute("width",M),l.setAttribute("height",k),l.setAttribute("fill",L),l.setAttribute("rx",10),l.setAttribute("opacity","0.3"),e.appendChild(l);const c=D("rect");c.setAttribute("x",I),c.setAttribute("y",d),c.setAttribute("width",0),c.setAttribute("height",k),c.setAttribute("fill",C),c.setAttribute("rx",10),c.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),c.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",M*S)},100)}),["0%","25%","50%","75%","100%"].forEach(($,E)=>{const O=I+M*E/4,H=U(O,d+60,$,"middle","#64748b",30,"500");e.appendChild(H)});let b=0;const A=Math.round(S*100),g=A/60;function f(){b<A&&(b+=g,p.textContent=Math.round(Math.min(b,A))+"%",requestAnimationFrame(f))}setTimeout(f,200)}function Et(t){return Math.round(t).toLocaleString("sv-SE")}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function z(t,i,e,a="start",o="#cbd5e1",s=12,n="normal"){const r=Y("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",a),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Ct(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(Y("defs")),s=Y("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=Y("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=Y("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",a),s.appendChild(n),s.appendChild(r),o.appendChild(s),`url(#${i})`}function te(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const a=P(t,i);let o=0,s=0;Object.keys(a.aParents).forEach(R=>{t.tags[R]==="F"?o+=a.aParents[R]||0:s+=a.aParents[R]||0});const n=o+s||1,r=Math.round(o/n*100),v=Math.round(s/n*100),y=Ct(e,"fixedGrad","#8b5cf6","#7c3aed"),S=Ct(e,"variableGrad","#06b6d4","#0891b2"),C=200,L=z(C,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(L);const p=z(C,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(p);const h=z(C,280,`${$t(F(t,o))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(h);const m=560,T=z(m,150,"0%","middle","#06b6d4",60,"900");e.appendChild(T);const x=z(m,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(x);const w=z(m,280,`${$t(F(t,s))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(w);const M=320,k=40,I=600,d=380-I/2,l=I*(o/n),c=Y("rect");c.setAttribute("x",d),c.setAttribute("y",M),c.setAttribute("width",0),c.setAttribute("height",k),c.setAttribute("fill",y),c.setAttribute("rx",15),c.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),c.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c);const u=I*(s/n),b=Y("rect");b.setAttribute("x",d+l),b.setAttribute("y",M),b.setAttribute("width",0),b.setAttribute("height",k),b.setAttribute("fill",S),b.setAttribute("rx",15),b.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),b.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(b);const A=Y("rect");A.setAttribute("x",d),A.setAttribute("y",M),A.setAttribute("width",I),A.setAttribute("height",k),A.setAttribute("fill","#1e293b"),A.setAttribute("rx",15),A.setAttribute("opacity","0.3"),e.insertBefore(A,c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",l)},200),setTimeout(()=>{b.setAttribute("x",d+l),b.setAttribute("width",u)},400)});const g=z(380,140,"VS","middle","#64748b",32,"600");e.appendChild(g);const f=Y("line");f.setAttribute("x1",380),f.setAttribute("y1",60),f.setAttribute("x2",380),f.setAttribute("y2",230),f.setAttribute("stroke","#374151"),f.setAttribute("stroke-width",2),f.setAttribute("opacity","0.5"),e.appendChild(f);let $=0,E=0;const O=r/50,H=v/50;function K(){($<r||E<v)&&($<r&&($+=O,L.textContent=Math.round(Math.min($,r))+"%"),E<v&&(E+=H,T.textContent=Math.round(Math.min(E,v))+"%"),requestAnimationFrame(K))}setTimeout(K,300),c.style.cursor="pointer",b.style.cursor="pointer",c.addEventListener("mouseenter",()=>{c.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),c.addEventListener("mouseleave",()=>{c.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),b.addEventListener("mouseenter",()=>{b.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),b.addEventListener("mouseleave",()=>{b.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function $t(t){return Math.round(t).toLocaleString("sv-SE")}class ee{constructor(){this.tooltip=null,this.createTooltip()}createTooltip(){const i=document.getElementById("chart-tooltip");i&&i.remove(),this.tooltip=document.createElement("div"),this.tooltip.id="chart-tooltip",this.tooltip.style.cssText=`
      position: absolute;
      background: rgba(15, 23, 42, 0.95);
      color: #e2e8f0;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: Inter, system-ui, sans-serif;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.2s ease;
      border: 1px solid #334155;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      max-width: 200px;
      white-space: nowrap;
    `,document.body.appendChild(this.tooltip)}show(i,e){this.tooltip||this.createTooltip(),this.tooltip.textContent=i,this.tooltip.style.opacity="1";const a=e.pageX+10,o=e.pageY-10,s=this.tooltip.getBoundingClientRect(),n=window.innerWidth;let r=a,v=o;a+s.width>n&&(r=e.pageX-s.width-10),o<0&&(v=e.pageY+20),this.tooltip.style.left=r+"px",this.tooltip.style.top=v+"px"}hide(){this.tooltip&&(this.tooltip.style.opacity="0")}}const ot=new ee;function W(t,i){t.addEventListener("mouseenter",e=>{ot.show(i,e)}),t.addEventListener("mousemove",e=>{ot.show(i,e)}),t.addEventListener("mouseleave",()=>{ot.hide()})}const ut=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,a="start",o="#cbd5e1",s=12)=>{const n=ut("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function ne(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const a=600,o=250,s=50,n=20,r=20,v=40,y=a-s-n,S=o-r-v,C=i.slice(0,4),L=parseInt(i.slice(5,7)),p=[];if(L>=9){for(let f=9;f<=12;f++){const $=`${C}-${f.toString().padStart(2,"0")}`;p.push($)}const g=(parseInt(C)+1).toString();for(let f=1;f<=8;f++){const $=`${g}-${f.toString().padStart(2,"0")}`;p.push($)}}else{const g=(parseInt(C)-1).toString();for(let f=9;f<=12;f++){const $=`${g}-${f.toString().padStart(2,"0")}`;p.push($)}for(let f=1;f<=8;f++){const $=`${C}-${f.toString().padStart(2,"0")}`;p.push($)}}const h=t.order.indexOf(i),T=p.filter(g=>{const f=t.order.indexOf(g);return f>=0&&f<=h}).map(g=>{const f=t.months[g];if(!f)return 0;const $=f.income||0,E=P(t,g).aTotal||0;return Math.max(0,$-E)}).reduce((g,f)=>g+f,0),x=p.filter(g=>{const f=t.order.indexOf(g);return f<0||f>h}).length,w=t.target||0,M=Math.max(0,w-T),k=x>0?M/x:0,I=w/12,d=[];p.forEach(g=>{const f=t.order.indexOf(g);if(f>=0&&f<=h){const $=t.months[g],E=$&&$.income||0,O=$?P(t,g).aTotal:0,H=Math.max(0,E-O);d.push({m:g,v:H,t:"actual"})}else d.push({m:g,v:k,t:"required"})});const l=Math.max(I,...d.map(g=>g.v),1),c=y/p.length*.65;d.forEach((g,f)=>{const $=g.v/l*S,E=s+f*(y/p.length)+(y/p.length-c)/2,O=r+S-$;let H;g.t==="actual"?H=g.v>=I?"#10b981":"#ef4444":H="#f59e0b";const K=ut("rect");K.setAttribute("x",E),K.setAttribute("y",O),K.setAttribute("width",c),K.setAttribute("height",$),K.setAttribute("fill",H),K.style.cursor="pointer";const R=g.t==="actual"?`${g.m}: ${Q(F(t,g.v))} SEK saved (${g.v>=I?"Above":"Below"} target)`:`${g.m}: ${Q(F(t,g.v))} SEK required to hit target`;W(K,R),e.appendChild(K),e.appendChild(Tt(E+c/2,o-12,g.m.slice(5),"middle","#9aa3b2",12))});const u=r+S-I/l*S,b=ut("line");b.setAttribute("x1",s),b.setAttribute("x2",s+y),b.setAttribute("y1",u),b.setAttribute("y2",u),b.setAttribute("stroke","#93c5fd"),b.setAttribute("stroke-dasharray","5,5"),e.appendChild(b),e.appendChild(Tt(s+y-6,u-6,"Monthly target "+Q(F(t,I)),"end","#cfe4ff",16));const A=document.getElementById("glidePill");A&&(M<=0?(A.textContent="On track ✔",A.classList.add("ok")):(A.textContent="From now: need "+Q(F(t,k))+" SEK / month",A.classList.remove("ok")))}function Q(t){return Math.round(t).toLocaleString("sv-SE")}const pt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),It=(t,i,e,a="start",o="#cbd5e1",s=12)=>{const n=pt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function ie(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const a=760,o=320,s=110,n=20,r=20,v=40,y=a-s-n,S=o-r-v,C=P(t,i),L=t.months[i].income||0,p=[{lab:"Income",val:L,c:"#60a5fa"},{lab:"Budget",val:C.bTotal,c:"#3b82f6"},{lab:"Actual",val:C.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,L-C.aTotal),c:"#34d399"}],h=Math.max(...p.map(x=>x.val),1),m=S/p.length*.55;p.forEach((x,w)=>{const M=r+w*(S/p.length)+(S/p.length-m)/2,k=x.val/h*y,I=pt("rect");I.setAttribute("x",s),I.setAttribute("y",M),I.setAttribute("width",k),I.setAttribute("height",m),I.setAttribute("fill",x.c),e.appendChild(I),e.appendChild(It(s-10,M+m/2+4,x.lab,"end","#cbd5e1",16)),e.appendChild(It(s+k+6,M+m/2+4,se(F(t,x.val)),"start","#cbd5e1",16))});const T=pt("line");T.setAttribute("x1",s),T.setAttribute("x2",s),T.setAttribute("y1",r),T.setAttribute("y2",r+S),T.setAttribute("stroke","#243049"),e.appendChild(T)}function se(t){return Math.round(t).toLocaleString("sv-SE")}const ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,a="start",o="#cbd5e1",s=12)=>{const n=ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function re(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=700,s=280,n=40,r=30,v=60,y=a-s-n,S=o-r-v,C=P(t,i),L=Object.keys(B).map(x=>({p:x,v:C.aParents[x]||0})).sort((x,w)=>w.v-x.v),p=L.reduce((x,w)=>x+w.v,0)||1,h=L.length,m=S/h*.75;L.forEach((x,w)=>{const M=r+w*(S/h)+(S/h-m)/2,k=x.v/p*y,I=t.highlightedCategory===x.p,d=t.highlightedCategory&&t.highlightedCategory!==null,l=I?"#f59e0b":"#3b82f6",c=d&&!I?.3:1,u=ht("rect");u.setAttribute("x",s),u.setAttribute("y",M),u.setAttribute("width",k),u.setAttribute("height",m),u.setAttribute("fill",l),u.setAttribute("opacity",c),u.style.cursor="pointer";const b=`${x.p}: ${(x.v/p*100).toFixed(1)}% (${kt(F(t,x.v))} SEK)`;W(u,b),I&&u.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(u);const A=d&&!I?.5:1,g=(t.icons[x.p]||"")+" "+x.p,f=Mt(s-16,M+m/2+6,g,"end","#cbd5e1",15);f.setAttribute("opacity",A),e.appendChild(f);const $=Math.min(s+k+12,a-n-250),E=Mt($,M+m/2+6,(x.v/p*100).toFixed(1)+"%  ·  "+kt(F(t,x.v))+" SEK","start","#cbd5e1",14);E.setAttribute("opacity",A),e.appendChild(E)});const T=ht("line");T.setAttribute("x1",s),T.setAttribute("x2",s),T.setAttribute("y1",r),T.setAttribute("y2",r+S),T.setAttribute("stroke","#243049"),e.appendChild(T)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}const it=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Lt=(t,i,e,a="start",o="#cbd5e1",s=12)=>{const n=it("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function oe(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=460,s=260,n=40,r=20,v=60,y=a-s-n,S=o-r-v,C=P(t,i),L=Object.keys(B).map(w=>({p:w,b:C.bParents[w]||0,a:C.aParents[w]||0})).sort((w,M)=>M.a-w.a),p=L.length,h=S/p,m=h*.35,T=Math.max(...L.map(w=>Math.max(w.a,w.b)),1);L.forEach((w,M)=>{const k=r+M*h+h/2,I=w.b/T*y,d=w.a/T*y,l=t.highlightedCategory===w.p,c=t.highlightedCategory&&t.highlightedCategory!==null,u=l?"#f59e0b":"#3b82f6",b=l?"#f97316":"#10b981",A=c&&!l?.3:1,g=c&&!l?.5:1,f=it("rect");f.setAttribute("x",s),f.setAttribute("y",k-m-3),f.setAttribute("width",I),f.setAttribute("height",m),f.setAttribute("fill",u),f.setAttribute("opacity",A),f.style.cursor="pointer";const $=`${w.p} Budget: ${tt(F(t,w.b))} SEK`;W(f,$),l&&f.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(f);const E=it("rect");E.setAttribute("x",s),E.setAttribute("y",k+3),E.setAttribute("width",d),E.setAttribute("height",m),E.setAttribute("fill",b),E.setAttribute("opacity",A),E.style.cursor="pointer";const O=`${w.p} Actual: ${tt(F(t,w.a))} SEK`;W(E,O),l&&E.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(E);const H=(t.icons[w.p]||"")+" "+w.p,K=Lt(s-14,k+4,H,"end","#cbd5e1",14);K.setAttribute("opacity",g),e.appendChild(K);const R=Math.max(I,d),V=Math.min(s+R+10,a-n-200),J=Lt(V,k+4,"B "+tt(F(t,w.b))+"  A "+tt(F(t,w.a)),"start","#cbd5e1",12);J.setAttribute("opacity",g),e.appendChild(J)});const x=it("line");x.setAttribute("x1",s),x.setAttribute("x2",s),x.setAttribute("y1",r),x.setAttribute("y2",r+S),x.setAttribute("stroke","#243049"),e.appendChild(x)}function tt(t){return Math.round(t).toLocaleString("sv-SE")}const jt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Bt=(t,i,e,a="start",o="#cbd5e1",s=12)=>{const n=jt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function ae(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=440,s=260,n=40,r=20,v=40,y=a-s-n,S=o-r-v,C=i.slice(0,4),L=parseInt(i.slice(5,7)),p=[];if(L>=9){for(let c=9;c<=12;c++){const u=`${C}-${c.toString().padStart(2,"0")}`;p.push(u)}const l=(parseInt(C)+1).toString();for(let c=1;c<=8;c++){const u=`${l}-${c.toString().padStart(2,"0")}`;p.push(u)}}else{const l=(parseInt(C)-1).toString();for(let c=9;c<=12;c++){const u=`${l}-${c.toString().padStart(2,"0")}`;p.push(u)}for(let c=1;c<=8;c++){const u=`${C}-${c.toString().padStart(2,"0")}`;p.push(u)}}const h=Object.keys(B),m=p.length,T=[],x=[];h.forEach(l=>{const c=[];p.forEach(u=>{const b=P(t,u),A=b.bParents[l]||0,g=b.aParents[l]||0,f=A?(g-A)/A:0;c.push({p:l,b:A,a:g,v:f,m:u}),x.push(f)}),T.push(c)});const w=Math.min(...x),M=Math.max(...x),k=y/m,I=S/h.length;function d(l){const c=l<=0?150:0,u=l<=0?w===0?1:-w:M===0?1:M,A=30+30*Math.min(1,Math.abs(l)/u||0);return`hsl(${c},70%,${A}%)`}T.forEach((l,c)=>{l.forEach((b,A)=>{const g=jt("rect");g.setAttribute("x",s+A*k),g.setAttribute("y",r+c*I),g.setAttribute("width",k-2),g.setAttribute("height",I-2),g.setAttribute("fill",d(b.v)),t.highlightedCategory&&b.p===t.highlightedCategory&&(g.setAttribute("stroke","#3b82f6"),g.setAttribute("stroke-width","3")),g.addEventListener("mouseenter",f=>{const $=document.getElementById("tooltip"),E=b.a-b.b,O=E>=0?"+":"";$.innerHTML=`<div><b>${b.p}</b> · <span class='t'>${b.m}</span></div>
                        <div>Budget: <b>${at(F(t,b.b))}</b> SEK</div>
                        <div>Actual: <b>${at(F(t,b.a))}</b> SEK</div>
                        <div>Variance: <b>${O+at(F(t,E))}</b> (${b.b?(E/b.b*100).toFixed(1):"0.0"}%)</div>`,$.style.left=f.clientX+12+"px",$.style.top=f.clientY+12+"px",$.style.display="block"}),g.addEventListener("mousemove",f=>{const $=document.getElementById("tooltip");$.style.left=f.clientX+12+"px",$.style.top=f.clientY+12+"px"}),g.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(g)});const u=(t.icons[h[c]]||"")+" "+h[c];e.appendChild(Bt(s-14,r+c*I+I/2+4,u,"end",t.highlightedCategory===h[c]?"#ffffff":"#cbd5e1",18))}),p.forEach((l,c)=>e.appendChild(Bt(s+c*k+k/2,o-12,l.slice(5),"middle","#9aa3b2",16)))}function at(t){return Math.round(t).toLocaleString("sv-SE")}const X=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,a="start",o="#cbd5e1",s=12)=>{const n=X("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function ce(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=Jt(t,i);if(!a){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const o=1200,s=420,n=80,r=40,v=30,y=60,S=o-n-r,C=s-v-y,L=P(t,i),p=P(t,a),h=p.aTotal,m=L.aTotal,T=Object.keys(B).map(A=>({p:A,icon:t.icons[A]||"",delta:(L.aParents[A]||0)-(p.aParents[A]||0)})).sort((A,g)=>Math.abs(g.delta)-Math.abs(A.delta)),x=T.slice(0,Math.min(10,T.length)),w=T.slice(x.length).reduce((A,g)=>A+g.delta,0);Math.abs(w)>.5&&x.push({p:"Others",icon:"",delta:w});const M=S/(x.length+3),k=v+C;let I=n+M;function d(A){const g=Math.max(h,m,Math.max(...x.map(f=>Math.abs(f.delta)))+Math.max(h,m));return v+C-A/g*C}const l=X("rect");l.setAttribute("x",I-24),l.setAttribute("y",d(h)),l.setAttribute("width",48),l.setAttribute("height",k-d(h)),l.setAttribute("fill","#64748b"),e.appendChild(l),e.appendChild(G(I,s-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(I,d(h)-6,ct(F(t,h)),"middle","#cbd5e1",16));let c=h;I+=M,x.forEach(A=>{const g=A.delta,f=g>=0,$=d(c),E=d(c+g),O=Math.min($,E),H=Math.abs(E-$);let K=f?"#ef4444":"#10b981",R=1;t.highlightedCategory&&(A.p===t.highlightedCategory?(K=f?"#dc2626":"#059669",R=1):R=.3);const V=X("rect");V.setAttribute("x",I-24),V.setAttribute("y",O),V.setAttribute("width",48),V.setAttribute("height",H),V.setAttribute("fill",K),V.setAttribute("opacity",R),e.appendChild(V);const J=(A.icon?A.icon+" ":"")+A.p;e.appendChild(G(I,s-18,J.length>14?J.slice(0,14)+"…":J,"middle",t.highlightedCategory===A.p?"#ffffff":"#9aa3b2",16));const Yt=(f?"+":"")+ct(F(t,g));e.appendChild(G(I,O-6,Yt,"middle",t.highlightedCategory===A.p?"#ffffff":"#cbd5e1",16)),c+=g,I+=M});const u=X("rect");u.setAttribute("x",I-24),u.setAttribute("y",d(m)),u.setAttribute("width",48),u.setAttribute("height",k-d(m)),u.setAttribute("fill","#64748b"),e.appendChild(u),e.appendChild(G(I,s-18,"End","middle","#9aa3b2",16)),e.appendChild(G(I,d(m)-6,ct(F(t,m)),"middle","#cbd5e1",16));const b=X("line");b.setAttribute("x1",n*.6),b.setAttribute("x2",o-r),b.setAttribute("y1",k),b.setAttribute("y2",k),b.setAttribute("stroke","#243049"),e.appendChild(b)}function ct(t){return Math.round(t).toLocaleString("sv-SE")}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function et(t,i,e,a="start",o="#cbd5e1",s=12,n="normal"){const r=j("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",a),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Ot(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(j("defs")),s=j("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","0%"),s.setAttribute("y2","100%");const n=j("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=j("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",a),s.appendChild(n),s.appendChild(r),o.appendChild(s),`url(#${i})`}function de(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,s={top:40,right:60,bottom:60,left:80},n=a-s.left-s.right,r=o-s.top-s.bottom,v=i.slice(0,4),y=parseInt(i.slice(5,7)),S=[];if(y>=9){for(let c=9;c<=12;c++){const u=`${v}-${c.toString().padStart(2,"0")}`;S.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}const l=(parseInt(v)+1).toString();for(let c=1;c<=8;c++){const u=`${l}-${c.toString().padStart(2,"0")}`;S.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}}else{const l=(parseInt(v)-1).toString();for(let c=9;c<=12;c++){const u=`${l}-${c.toString().padStart(2,"0")}`;S.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}for(let c=1;c<=8;c++){const u=`${v}-${c.toString().padStart(2,"0")}`;S.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}}if(S.length===0)return;const C=Math.max(...S.map(l=>l.data.aTotal),1),L=n/(S.length-1),p=r/C,h=Ot(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),m=Ot(e,"trendLine","#3b82f6","#1d4ed8"),T=j("rect");T.setAttribute("x",s.left),T.setAttribute("y",s.top),T.setAttribute("width",n),T.setAttribute("height",r),T.setAttribute("fill","rgba(15, 23, 42, 0.5)"),T.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),T.setAttribute("rx",8),e.appendChild(T);for(let l=0;l<=5;l++){const c=s.top+r/5*l,u=j("line");u.setAttribute("x1",s.left),u.setAttribute("y1",c),u.setAttribute("x2",s.left+n),u.setAttribute("y2",c),u.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),u.setAttribute("stroke-width",1),u.setAttribute("stroke-dasharray","2,2"),e.appendChild(u);const b=C-C/5*l,A=et(s.left-10,c+4,dt(b),"end","#94a3b8",14);e.appendChild(A)}let x=`M ${s.left} ${s.top+r}`,w="M";S.forEach((l,c)=>{const u=s.left+c*L,b=s.top+r-l.data.aTotal*p;c===0?(w+=` ${u} ${b}`,x+=` L ${u} ${b}`):(w+=` L ${u} ${b}`,x+=` L ${u} ${b}`)}),x+=` L ${s.left+(S.length-1)*L} ${s.top+r} Z`;const M=j("path");M.setAttribute("d",x),M.setAttribute("fill",h),M.setAttribute("opacity","0"),e.appendChild(M);const k=j("path");k.setAttribute("d",w),k.setAttribute("fill","none"),k.setAttribute("stroke",m),k.setAttribute("stroke-width",3),k.setAttribute("stroke-linecap","round"),k.setAttribute("stroke-linejoin","round"),k.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),k.style.strokeDasharray=k.getTotalLength(),k.style.strokeDashoffset=k.getTotalLength(),e.appendChild(k),S.forEach((l,c)=>{const u=s.left+c*L,b=s.top+r-l.data.aTotal*p,A=j("circle");A.setAttribute("cx",u),A.setAttribute("cy",b),A.setAttribute("r",6),A.setAttribute("fill","rgba(15, 23, 42, 0.9)"),A.setAttribute("stroke","#3b82f6"),A.setAttribute("stroke-width",2),A.setAttribute("opacity","0"),e.appendChild(A);const g=j("circle");g.setAttribute("cx",u),g.setAttribute("cy",b),g.setAttribute("r",4),g.setAttribute("fill","#3b82f6"),g.setAttribute("opacity","0"),g.style.cursor="pointer",e.appendChild(g);const f=et(u,s.top+r+20,l.label,"middle","#94a3b8",14);e.appendChild(f);const $=`Month ${l.label}: ${dt(l.data.aTotal)} SEK spent (Budget: ${dt(l.data.bTotal)} SEK)`;W(g,$)}),requestAnimationFrame(()=>{setTimeout(()=>{M.style.transition="opacity 1s ease-out",M.setAttribute("opacity","1")},200),setTimeout(()=>{k.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",k.style.strokeDashoffset="0"},400),setTimeout(()=>{S.forEach((l,c)=>{setTimeout(()=>{const u=e.querySelectorAll("circle"),b=c*2+2;u[b]&&(u[b].style.transition="opacity 0.3s ease-out",u[b].setAttribute("opacity","1")),u[b+1]&&(u[b+1].style.transition="opacity 0.3s ease-out",u[b+1].setAttribute("opacity","1"))},c*100)})},1e3)});const I=et(a/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(I);const d=et(20,o/2,"Spending (SEK)","middle","#94a3b8",12,"500");d.setAttribute("transform",`rotate(-90, 20, ${o/2})`),e.appendChild(d)}function dt(t){return Math.round(t).toLocaleString("sv-SE")}function q(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function nt(t,i,e,a="start",o="#cbd5e1",s=12,n="normal"){const r=q("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",a),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function le(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,s=60,n=20,r=40,v=60,y=a-s-n,S=o-r-v,C=i.slice(0,4),L=parseInt(i.slice(5,7)),p=[];if(L>=9){for(let l=9;l<=12;l++){const c=`${C}-${l.toString().padStart(2,"0")}`;p.push(c)}const d=(parseInt(C)+1).toString();for(let l=1;l<=8;l++){const c=`${d}-${l.toString().padStart(2,"0")}`;p.push(c)}}else{const d=(parseInt(C)-1).toString();for(let l=9;l<=12;l++){const c=`${d}-${l.toString().padStart(2,"0")}`;p.push(c)}for(let l=1;l<=8;l++){const c=`${C}-${l.toString().padStart(2,"0")}`;p.push(c)}}if(p.length===0)return;const h=p.map(d=>{const l=t.months[d];if(!l||!l.income)return{month:d,percentage:0};const c=l.income||0,u=Object.keys(l.actual||{}).reduce((A,g)=>A+Object.values(l.actual[g]||{}).reduce((f,$)=>f+($||0),0),0),b=c>0?u/c*100:0;return{month:d,percentage:b}}),m=Math.max(...h.map(d=>d.percentage)),T=Math.max(100,Math.ceil(m/50)*50),x=d=>s+d/(p.length-1)*y,w=d=>r+S-d/T*S,M=q("rect");M.setAttribute("width",a),M.setAttribute("height",o),M.setAttribute("fill","transparent"),e.appendChild(M);for(let d=0;d<=5;d++){const l=r+d/5*S,c=q("line");c.setAttribute("x1",s),c.setAttribute("y1",l),c.setAttribute("x2",s+y),c.setAttribute("y2",l),c.setAttribute("stroke","#374151"),c.setAttribute("stroke-width",.5),e.appendChild(c);const u=(T-d/5*T).toFixed(0)+"%";e.appendChild(nt(s-10,l+4,u,"end","#9ca3af",11))}if(p.forEach((d,l)=>{const c=x(l),u=d.slice(5,7);e.appendChild(nt(c,o-v+20,u,"middle","#9ca3af",11))}),h.length>1){const d=q("path");let l=`M ${x(0)} ${w(h[0].percentage)}`;for(let c=1;c<h.length;c++)l+=` L ${x(c)} ${w(h[c].percentage)}`;d.setAttribute("d",l),d.setAttribute("stroke","#f59e0b"),d.setAttribute("stroke-width",3),d.setAttribute("fill","none"),d.setAttribute("stroke-linecap","round"),d.setAttribute("stroke-linejoin","round"),e.appendChild(d)}h.forEach((d,l)=>{const c=q("circle");c.setAttribute("cx",x(l)),c.setAttribute("cy",w(d.percentage)),c.setAttribute("r",4),c.setAttribute("fill","#f59e0b"),c.setAttribute("stroke","#1f2937"),c.setAttribute("stroke-width",2),c.style.cursor="pointer";const u=`${d.month}: ${d.percentage.toFixed(1)}% of income spent`;W(c,u),e.appendChild(c)}),e.appendChild(nt(s,25,"Percentage of Income Spent","start","#e5e7eb",14,"bold"));const k=r+10;e.appendChild(nt(s+y-200,k,"% of Income Spent","start","#f59e0b",12));const I=q("line");I.setAttribute("x1",s+y-220),I.setAttribute("y1",k-4),I.setAttribute("x2",s+y-210),I.setAttribute("y2",k-4),I.setAttribute("stroke","#f59e0b"),I.setAttribute("stroke-width",3),e.appendChild(I)}let N=zt();N.highlightedCategory=null;const ue=document.getElementById("app");ue.innerHTML=`
  <div class="panel kpis" id="kpiStrip"></div>

  <div class="panel controlsArea">
    <div class="controls" id="controls"></div>
    <div class="stack" id="rightStack">
      <div class="subpanel grid2">
        <div>
          <div class="legend"><span><i class="sw" style="background:#34d399"></i>R12M Saved vs Year Target</span></div>
          <svg id="ytdGauge" class="chart tiny" viewBox="0 0 760 450" aria-label="R12M gauge"></svg>
        </div>
        <div>
          <div class="legend"><span><i class="sw" style="background:#06b6d4"></i>Fixed vs Variable (donut)</span></div>
          <svg id="fixedVarMini" class="chart tiny" viewBox="0 0 760 450" aria-label="Fixed vs Variable donut"></svg>
        </div>
      </div>

      <div class="subpanel" style="position:relative">
        <div class="legend"><span><i class="sw" style="background:#f59e0b"></i>Glidepath — required per month to hit target</span></div>
        <div id="glidePill" class="pill"></div>
        <svg id="glidepath" class="chart small" viewBox="0 0 600 250" aria-label="Glidepath"></svg>
      </div>

      <div class="subpanel">
        <div class="legend"><span><i class="sw" style="background:#93c5fd"></i>Current Month: Income / Budget / Actual / Savings</span></div>
        <svg id="barSummary" class="chart small" viewBox="0 0 760 320" aria-label="Summary bars"></svg>
      </div>
    </div>
  </div>

  <div class="panel">
    <div id="insightsPanel" class="insights-panel"></div>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background:#3b82f6"></i>Rolling 12-Month: Percentage of Income Spent</span>
    </div>
    <svg id="monthlyTrends" class="chart" viewBox="0 0 1200 400" aria-label="Percentage of Income Spent Over Time"></svg>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);"></i>Rolling 12-Month: Spending Trends by Category</span>
    </div>
    <svg id="spendingTrends" class="chart" viewBox="0 0 1200 400" aria-label="Spending trends"></svg>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#fbbf24"></i>Current Month: Share of Total Spend (by category)</span></div>
    <svg id="shareBars" class="chart tall" viewBox="0 0 1200 700" aria-label="Share bars"></svg>
  </div>

  <div class="panel">
    <table id="dataTable">
      <thead><tr><th>▸ Category</th><th class="num">Budget</th><th class="num">Actual</th><th class="num">Var</th></tr></thead>
      <tbody></tbody>
    </table>
    <div class="addrow">
      <span style="color:var(--muted)">Add new parent category</span>
      <input id="newParentName" class="mini" placeholder="e.g., Pets" />
      <button class="btn" id="btnAddParentInline">+ Add</button>
    </div>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#3b82f6"></i>Budget</span><span><i class="sw" style="background:#10b981"></i>Actual</span></div>
    <svg id="baParents" class="chart" viewBox="0 0 1200 460" aria-label="Budget vs Actual per parent"></svg>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#ef4444"></i>Over</span><span><i class="sw" style="background:#22c55e"></i>Under</span></div>
    <svg id="heatmapVar" class="chart" viewBox="0 0 1200 440" aria-label="Variance heatmap"></svg>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background:#64748b"></i>Start/End</span>
      <span><i class="sw" style="background:#ef4444"></i>Increase</span>
      <span><i class="sw" style="background:#10b981"></i>Decrease</span>
    </div>
    <div class="help" style="color:var(--muted);font-size:12px;">Current vs Previous Month: Explains why this month's total changed vs last month. Bars are labeled; red = categories that got more expensive, green = cheaper.</div>
    <svg id="bridge" class="chart" viewBox="0 0 1200 420" aria-label="Bridge"></svg>
  </div>
`;Wt(N,rt);Vt(N,st());Zt();bt();Rt(N,st());gt(N,rt);window.state=N;window.drawAll=bt;window.monthTotals=t=>P(N,t);function st(){return N.order[N.order.length-1]}function rt(){mt(N),Vt(N,st()),bt(),Rt(N,st()),gt(N,rt)}function Vt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const a=P(t,i),o=t.months[i].income||0,s=F(t,o-a.aTotal+(a.aSavings||0)),n=o>0?(o-a.aTotal+(a.aSavings||0))/o:0,r=a.bTotal>0?a.aTotal/a.bTotal:0,y=t.order.filter(C=>C.slice(0,4)===i.slice(0,4)&&C<=i).map(C=>{const L=P(t,C);return(t.months[C].income||0)-L.aTotal+(L.aSavings||0)}).reduce((C,L)=>C+L,0);[{lab:"Monthly Savings (real SEK)",val:Ft(s)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Ft(F(t,y))+" SEK"}].forEach(C=>{const L=document.createElement("div");L.className="kpi",L.innerHTML=`<div class="lab">${C.lab}</div><div class="val">${C.val}</div>`,L.onclick=()=>{N.highlightedCategory=C.lab,rt()},e.appendChild(L)})}function bt(){const t=document.getElementById("monthSel").value;Qt(N,t),te(N,t),ne(N,t),ie(N,t),de(N,t),le(N,t),re(N,t),oe(N,t),ae(N,t),ce(N,t)}function Ft(t){return Math.round(t).toLocaleString("sv-SE")}
