(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const ft={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},yt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},O={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function vt(t,i=1){const e=[];let a=i,o=t;for(let r=0;r<12;r++)e.push(`${o}-${String(a).padStart(2,"0")}`),a++,a>12&&(a=1,o++);return e}function lt(t,i){if(t.months[i])Object.keys(O).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(O[e]).forEach(a=>{t.months[i].budget[e][a]===void 0&&(t.months[i].budget[e][a]=O[e][a]),t.months[i].actual[e][a]===void 0&&(t.months[i].actual[e][a]=O[e][a])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},a={};Object.keys(O).forEach(o=>{e[o]={},a[o]={},Object.keys(O[o]).forEach(r=>{e[o][r]=O[o][r],a[o][r]=O[o][r]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:a}}}const Pt="rohmee_budget_live",Kt=2,Nt=108e3;function Vt(){let t=localStorage.getItem(Pt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Ht(e),(!e.order||!e.order.length)&&(e.order=vt(2025,9)),e.order.forEach(a=>lt(e,a)),e.icons=e.icons||ft,e.tags=e.tags||yt,e}catch{}const i={defaultIncome:Nt,target:25e4,cpi:1,order:vt(2025,9),months:{},icons:ft,tags:yt,selected:null,version:Kt};return i.order.forEach(e=>lt(i,e)),mt(i),i}function mt(t){localStorage.setItem(Pt,JSON.stringify(t))}function Gt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Dt(t,i){const e=new FileReader;e.onload=()=>{try{const a=JSON.parse(e.result);Ht(a),mt(a),i(a)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Ht(t){t.version<2&&(t.defaultIncome=t.income||Nt,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Kt}function H(t,i){lt(t,i);const e=t.months[i],a=xt(e.budget),o=xt(e.actual);let r=0,n=0;return Object.keys(a).forEach(s=>{r+=a[s],n+=o[s]||0}),{bParents:a,aParents:o,bTotal:r,aTotal:n}}function qt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function B(t,i){return i/(t.cpi||1)}function Wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function xt(t){let i={};return Object.keys(t).forEach(e=>i[e]=Wt(t[e])),i}function Ut(t,i){const e=document.getElementById("controls"),a=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${T(t.months[a].income||0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${T(t.target)}">
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
  `;const o=e.querySelector("#monthSel"),r=a.slice(5,7),n=a.slice(0,4),s=[];if(parseInt(r)>=9){for(let p=9;p<=12;p++){const y=`${n}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}const u=(parseInt(n)+1).toString();for(let p=1;p<=8;p++){const y=`${u}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}}else{const u=(parseInt(n)-1).toString();for(let p=9;p<=12;p++){const y=`${u}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}for(let p=1;p<=8;p++){const y=`${n}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}}t.order.forEach(u=>{s.includes(u)||s.push(u)}),s.forEach(u=>{const p=document.createElement("option");p.value=u,p.textContent=u,o.appendChild(p)}),o.value=a;const E=e.querySelector("#netIncome"),x=e.querySelector("#savTarget"),$=e.querySelector("#cpiFactor");function T(u){return Math.round(u).toLocaleString("sv-SE")}function k(u){return parseFloat(u.replace(/\s/g,"").replace(",","."))||0}o.addEventListener("change",u=>{E.value=T(t.months[o.value].income||0),x.value=T(t.target),$.value=t.cpi,i()}),E.addEventListener("input",u=>{const p=u.target.value.replace(/\s/g,""),y=k(p);isNaN(y)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[o.value].income=y,u.target.value=T(y),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),x.addEventListener("input",u=>{const p=u.target.value.replace(/\s/g,""),y=k(p);isNaN(y)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=y,u.target.value=T(y),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),$.addEventListener("input",u=>{const p=parseFloat(u.target.value);isNaN(p)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=p,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>Gt(t)),e.querySelector("#loadJsonInput").addEventListener("change",u=>{const p=u.target.files[0];p&&Dt(p,y=>{Object.assign(t,y),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const u=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(I=>{const v=t.months[I];Object.keys(v.budget).forEach(C=>Object.keys(v.budget[C]).forEach(M=>{u.push([I,C,M,v.budget[C][M],v.actual[C][M]])}))});const p=u.map(I=>I.map(v=>`"${String(v).replace('"','""')}"`).join(",")).join(`
`),y=document.createElement("a");y.href=URL.createObjectURL(new Blob([p],{type:"text/csv"})),y.download="budget.csv",y.click(),setTimeout(()=>URL.revokeObjectURL(y.href),1e3)}),e.querySelector("#clearMonth").addEventListener("click",()=>{const u=o.value,p=t.months[u];confirm(`Clear all budget and actual amounts for ${u}?`)&&(Object.keys(p.budget).forEach(y=>{Object.keys(p.budget[y]).forEach(I=>{p.budget[y][I]=0})}),Object.keys(p.actual).forEach(y=>{Object.keys(p.actual[y]).forEach(I=>{p.actual[y][I]=0})}),i())}),e.querySelector("#copyBudget").addEventListener("click",()=>{const u=o.value,p=t.order.indexOf(u);if(p>0){const y=t.order[p-1],I=t.months[u],v=t.months[y];confirm(`Copy budget amounts from ${y} to ${u}?`)&&(Object.keys(v.budget).forEach(C=>{I.budget[C]||(I.budget[C]={}),Object.keys(v.budget[C]).forEach(M=>{I.budget[C][M]=v.budget[C][M]})}),i())}else alert("No previous month available to copy from.")})}let _={};function gt(t,i){const e=document.getElementById("monthSel").value,a=document.querySelector("#dataTable tbody");a.innerHTML="";const o=t.months[e];Object.keys(O).forEach(n=>{const s=wt(o.budget[n]||{}),E=wt(o.actual[n]||{}),x=document.createElement("tr");x.className="parent"+(E>s?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(x.style.backgroundColor="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const $=document.createElement("td"),T=document.createElement("span");T.textContent=_[n]?"▾":"▸",T.className="toggle",T.title="Collapse/expand",T.onclick=()=>{_[n]=!_[n],gt(t,i)};const k=document.createElement("span");k.className="icon",k.textContent=t.icons[n]||"",k.title="Click to set emoji",k.style.cursor="pointer",k.onclick=()=>{const l=prompt("Set emoji for "+n+":",t.icons[n]||"");l&&(t.icons[n]=l,i&&i())};const u=document.createElement("span");u.textContent=n,u.style.cursor="pointer",u.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},u.ondblclick=()=>{const l=prompt("Rename parent:",n);!l||O[l]||(O[l]=O[n],delete O[n],t.icons[l]=t.icons[n],delete t.icons[n],t.tags[l]=t.tags[n],delete t.tags[n],t.order.forEach(f=>{const d=t.months[f];d.budget[l]=d.budget[n],d.actual[l]=d.actual[n],delete d.budget[n],delete d.actual[n]}),i&&i())},x.onclick=l=>{l.target.closest(".rowtools")||l.target.closest(".toggle")||l.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(x.style.background="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const p=document.createElement("span");p.className="rowtools";const y=document.createElement("span");y.className="chip",y.textContent=t.tags[n]==="F"?"Fixed":"Variable",y.title="Toggle Fixed/Variable",y.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",i&&i()};const I=document.createElement("span");I.className="chip",I.textContent="+",I.title="Add subcategory",I.onclick=()=>{const l=prompt("New subcategory under "+n+":");l&&(O[n][l]=0,t.order.forEach(f=>{const d=t.months[f];d.budget[n][l]=0,d.actual[n][l]=0}),i&&i())};const v=document.createElement("span");v.className="chip",v.textContent="−",v.title="Delete parent",v.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete O[n],delete t.icons[n],delete t.tags[n],t.order.forEach(l=>{const f=t.months[l];delete f.budget[n],delete f.actual[n]}),i&&i())},p.appendChild(y),p.appendChild(I),p.appendChild(v),$.appendChild(T),$.appendChild(k),$.appendChild(u),$.appendChild(p),x.appendChild($);const C=document.createElement("td");C.className="num",C.textContent=Z(B(t,s)),x.appendChild(C);const M=document.createElement("td");M.className="num",M.textContent=Z(B(t,E)),x.appendChild(M);const L=document.createElement("td");L.className="num",L.textContent=Z(B(t,s-E)),x.appendChild(L),a.appendChild(x),_[n]&&Object.keys(O[n]).forEach(l=>{const f=document.createElement("tr");(o.actual[n]||{})[l]>(o.budget[n]||{})[l]&&(f.className="over");const d=document.createElement("td"),c=document.createElement("span");c.textContent="• "+l,c.title="Double-click to rename",c.style.cursor="text",c.ondblclick=()=>{const g=prompt("Rename subcategory:",l);g&&(O[n][g]=O[n][l],delete O[n][l],t.order.forEach(S=>{const w=t.months[S];w.budget[n][g]=w.budget[n][l],w.actual[n][g]=w.actual[n][l],delete w.budget[n][l],delete w.actual[n][l]}),i&&i())},d.appendChild(c);const m=document.createElement("span");m.className="chip",m.textContent="−",m.title="Delete subcategory",m.style.marginLeft="8px",m.onclick=()=>{confirm("Delete "+l+"?")&&(delete O[n][l],t.order.forEach(g=>{const S=t.months[g];delete S.budget[n][l],delete S.actual[n][l]}),i&&i())},d.appendChild(m),f.appendChild(d);const b=document.createElement("td");b.className="num",b.appendChild(At(t,e,n,l,"budget",(o.budget[n]||{})[l]||0,i)),f.appendChild(b);const A=document.createElement("td");A.className="num",A.appendChild(At(t,e,n,l,"actual",(o.actual[n]||{})[l]||0,i)),f.appendChild(A);const h=document.createElement("td");h.className="num",h.textContent=Z(B(t,((o.budget[n]||{})[l]||0)-((o.actual[n]||{})[l]||0))),f.appendChild(h),a.appendChild(f)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(O[n]){alert("Parent already exists");return}O[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(s=>{const E=t.months[s];E.budget[n]={},E.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function At(t,i,e,a,o,r,n){const s=document.createElement("input");s.type="number",s.value=r,s.step="100",s.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const E=x=>{const $=+s.value||0;t.months[i][o][e][a]=$,n&&n()};return s.addEventListener("keydown",x=>{x.key==="Enter"?(E(x.shiftKey?"up":"down"),x.preventDefault()):x.key==="Escape"&&(s.value=r,s.blur())}),s.addEventListener("blur",()=>E()),s}function wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function Z(t){return Math.round(t).toLocaleString("sv-SE")}class Xt{constructor(i){this.state=i}generateInsights(i){const e=[],a=this.getRecentMonths(i,6);if(a.length<3)return e;const o=this.analyzeTrend(a);o&&e.push(o);const r=this.analyzeBudgetVariance(a);r&&e.push(r);const n=this.analyzeCategorySpending(a);e.push(...n);const s=this.analyzeSavingsRate(a);s&&e.push(s);const E=this.analyzeSeasonalPatterns(i);return E&&e.push(E),e.slice(0,8)}getRecentMonths(i,e){const a=parseInt(i.slice(0,4)),o=parseInt(i.slice(5,7)),r=[];for(let n=0;n<e;n++){let s=o-n,E=a;s<=0&&(s+=12,E-=1);const x=`${E}-${s.toString().padStart(2,"0")}`;this.state.months[x]&&r.unshift({key:x,data:H(this.state,x),income:this.state.months[x].income||0})}return r}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(o=>o.data.aTotal)),a=i.reduce((o,r)=>o+r.data.aTotal,0)/i.length;if(Math.abs(e)<a*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const o=e/a*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${o.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:o>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/a*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],a=e.data.aTotal-e.data.bTotal,o=a/e.data.bTotal*100;return Math.abs(o)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(o).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:a>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(a)} SEK (${o.toFixed(1)}%).`,impact:o>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(a))} SEK (${Math.abs(o).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],a=i[i.length-1];if(i.length>=2){const o=i[i.length-2];Object.keys(a.data.aParents).forEach(r=>{const n=a.data.aParents[r]||0,s=o.data.aParents[r]||0;if(s>0){const E=(n-s)/s*100;if(Math.abs(E)>20&&Math.abs(n-s)>1e3){const x=this.getCategoryIcon(r);E>0?e.push({type:"warning",category:"spending",title:`${r} Spending Increased`,message:`${r} spending increased by ${E.toFixed(1)}% (${this.fmt(n-s)} SEK).`,impact:E>50?"high":"medium",icon:x,recommendation:`Review your ${r.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${r} Spending Decreased`,message:`Great! ${r} spending decreased by ${Math.abs(E).toFixed(1)}% (${this.fmt(Math.abs(n-s))} SEK).`,impact:"positive",icon:x})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],a=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return a<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${a.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:a>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${a.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${a.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,a=e*(e-1)/2,o=i.reduce((s,E)=>s+E,0),r=i.reduce((s,E,x)=>s+x*E,0),n=i.reduce((s,E,x)=>s+x*x,0);return(e*r-a*o)/(e*n-a*a)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],a=this.getRecentMonths(i,3);if(a.length===0)return e;const o=a[a.length-1],s=a.reduce((x,$)=>x+$.data.aTotal,0)/a.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(s)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(o.income>0?(o.income-o.data.aTotal)/o.income*100:0)>15){const x=(o.income-o.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(x)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Rt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const a=new Xt(t),o=a.generateInsights(i),r=a.generateRecommendations(i);if(e.innerHTML="",o.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const s=document.getElementById("insightsGrid");o.forEach((E,x)=>{const $=Jt(E);s.appendChild($)})}if(r.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const s=document.getElementById("recommendationsList");r.forEach((E,x)=>{const $=_t(E);s.appendChild($)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((s,E)=>{setTimeout(()=>{s.style.opacity="1",s.style.transform="translateY(0)"},E*100)})})}function Jt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function U(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=D("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Et(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(D("defs")),r=D("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=D("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function Qt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=i.slice(0,4),o=parseInt(i.slice(5,7)),r=[];if(o>=9){for(let w=9;w<=12;w++){const F=`${a}-${w.toString().padStart(2,"0")}`;r.push(F)}const S=(parseInt(a)+1).toString();for(let w=1;w<=8;w++){const F=`${S}-${w.toString().padStart(2,"0")}`;r.push(F)}}else{const S=(parseInt(a)-1).toString();for(let w=9;w<=12;w++){const F=`${S}-${w.toString().padStart(2,"0")}`;r.push(F)}for(let w=1;w<=8;w++){const F=`${a}-${w.toString().padStart(2,"0")}`;r.push(F)}}const n=t.order.indexOf(i),E=r.filter(S=>{const w=t.order.indexOf(S);return w>=0&&w<=n}).map(S=>{const w=t.months[S];if(!w)return 0;const F=w.income||0,N=H(t,S).aTotal||0;return Math.max(0,F-N)}).reduce((S,w)=>S+w,0),x=t.target||0,$=x>0?Math.min(1,E/x):0,T=Et(e,"gaugeProgress","#10b981","#059669"),k=Et(e,"gaugeBg","#1e293b","#0f172a"),u=U(380,150,`${Math.round($*100)}%`,"middle","#10b981",80,"900");e.appendChild(u);const p=U(380,240,`${St(B(t,E))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(p);const y=U(380,290,`of ${St(B(t,x))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(y);const I=$>=1?"#10b981":$>=.8?"#f59e0b":"#ef4444",v=$>=1?"✓ Target Achieved":$>=.8?"⚡ On Track":"⚠ Behind Target",C=U(380,350,v,"middle",I,24,"600");e.appendChild(C);const M=500,L=30,l=380-M/2,f=380,d=D("rect");d.setAttribute("x",l),d.setAttribute("y",f),d.setAttribute("width",M),d.setAttribute("height",L),d.setAttribute("fill",k),d.setAttribute("rx",10),d.setAttribute("opacity","0.3"),e.appendChild(d);const c=D("rect");c.setAttribute("x",l),c.setAttribute("y",f),c.setAttribute("width",0),c.setAttribute("height",L),c.setAttribute("fill",T),c.setAttribute("rx",10),c.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),c.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",M*$)},100)}),["0%","25%","50%","75%","100%"].forEach((S,w)=>{const F=l+M*w/4,N=U(F,f+60,S,"middle","#64748b",30,"500");e.appendChild(N)});let b=0;const A=Math.round($*100),h=A/60;function g(){b<A&&(b+=h,u.textContent=Math.round(Math.min(b,A))+"%",requestAnimationFrame(g))}setTimeout(g,200)}function St(t){return Math.round(t).toLocaleString("sv-SE")}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function V(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=z("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Ct(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(z("defs")),r=z("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=z("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=z("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function te(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const a=H(t,i);let o=0,r=0;Object.keys(a.aParents).forEach(R=>{t.tags[R]==="F"?o+=a.aParents[R]||0:r+=a.aParents[R]||0});const n=o+r||1,s=Math.round(o/n*100),E=Math.round(r/n*100),x=Ct(e,"fixedGrad","#8b5cf6","#7c3aed"),$=Ct(e,"variableGrad","#06b6d4","#0891b2"),T=200,k=V(T,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(k);const u=V(T,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(u);const p=V(T,280,`${$t(B(t,o))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(p);const y=560,I=V(y,150,"0%","middle","#06b6d4",60,"900");e.appendChild(I);const v=V(y,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(v);const C=V(y,280,`${$t(B(t,r))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(C);const M=320,L=40,l=600,f=380-l/2,d=l*(o/n),c=z("rect");c.setAttribute("x",f),c.setAttribute("y",M),c.setAttribute("width",0),c.setAttribute("height",L),c.setAttribute("fill",x),c.setAttribute("rx",15),c.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),c.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c);const m=l*(r/n),b=z("rect");b.setAttribute("x",f+d),b.setAttribute("y",M),b.setAttribute("width",0),b.setAttribute("height",L),b.setAttribute("fill",$),b.setAttribute("rx",15),b.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),b.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(b);const A=z("rect");A.setAttribute("x",f),A.setAttribute("y",M),A.setAttribute("width",l),A.setAttribute("height",L),A.setAttribute("fill","#1e293b"),A.setAttribute("rx",15),A.setAttribute("opacity","0.3"),e.insertBefore(A,c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",d)},200),setTimeout(()=>{b.setAttribute("x",f+d),b.setAttribute("width",m)},400)});const h=V(380,140,"VS","middle","#64748b",32,"600");e.appendChild(h);const g=z("line");g.setAttribute("x1",380),g.setAttribute("y1",60),g.setAttribute("x2",380),g.setAttribute("y2",230),g.setAttribute("stroke","#374151"),g.setAttribute("stroke-width",2),g.setAttribute("opacity","0.5"),e.appendChild(g);let S=0,w=0;const F=s/50,N=E/50;function K(){(S<s||w<E)&&(S<s&&(S+=F,k.textContent=Math.round(Math.min(S,s))+"%"),w<E&&(w+=N,I.textContent=Math.round(Math.min(w,E))+"%"),requestAnimationFrame(K))}setTimeout(K,300),c.style.cursor="pointer",b.style.cursor="pointer",c.addEventListener("mouseenter",()=>{c.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),c.addEventListener("mouseleave",()=>{c.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),b.addEventListener("mouseenter",()=>{b.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),b.addEventListener("mouseleave",()=>{b.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function $t(t){return Math.round(t).toLocaleString("sv-SE")}class ee{constructor(){this.tooltip=null,this.createTooltip()}createTooltip(){const i=document.getElementById("chart-tooltip");i&&i.remove(),this.tooltip=document.createElement("div"),this.tooltip.id="chart-tooltip",this.tooltip.style.cssText=`
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
    `,document.body.appendChild(this.tooltip)}show(i,e){this.tooltip||this.createTooltip(),this.tooltip.textContent=i,this.tooltip.style.opacity="1";const a=e.pageX+10,o=e.pageY-10,r=this.tooltip.getBoundingClientRect(),n=window.innerWidth;let s=a,E=o;a+r.width>n&&(s=e.pageX-r.width-10),o<0&&(E=e.pageY+20),this.tooltip.style.left=s+"px",this.tooltip.style.top=E+"px"}hide(){this.tooltip&&(this.tooltip.style.opacity="0")}}const at=new ee;function J(t,i){t.addEventListener("mouseenter",e=>{at.show(i,e)}),t.addEventListener("mousemove",e=>{at.show(i,e)}),t.addEventListener("mouseleave",()=>{at.hide()})}const ut=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ut("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ne(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const a=600,o=250,r=50,n=20,s=20,E=40,x=a-r-n,$=o-s-E,T=i.slice(0,4),k=parseInt(i.slice(5,7)),u=[];if(k>=9){for(let g=9;g<=12;g++){const S=`${T}-${g.toString().padStart(2,"0")}`;u.push(S)}const h=(parseInt(T)+1).toString();for(let g=1;g<=8;g++){const S=`${h}-${g.toString().padStart(2,"0")}`;u.push(S)}}else{const h=(parseInt(T)-1).toString();for(let g=9;g<=12;g++){const S=`${h}-${g.toString().padStart(2,"0")}`;u.push(S)}for(let g=1;g<=8;g++){const S=`${T}-${g.toString().padStart(2,"0")}`;u.push(S)}}const p=t.order.indexOf(i),I=u.filter(h=>{const g=t.order.indexOf(h);return g>=0&&g<=p}).map(h=>{const g=t.months[h];if(!g)return 0;const S=g.income||0,w=H(t,h).aTotal||0;return Math.max(0,S-w)}).reduce((h,g)=>h+g,0),v=u.filter(h=>{const g=t.order.indexOf(h);return g<0||g>p}).length,C=t.target||0,M=Math.max(0,C-I),L=v>0?M/v:0,l=C/12,f=[];u.forEach(h=>{const g=t.order.indexOf(h);if(g>=0&&g<=p){const S=t.months[h],w=S&&S.income||0,F=S?H(t,h).aTotal:0,N=Math.max(0,w-F);f.push({m:h,v:N,t:"actual"})}else f.push({m:h,v:L,t:"required"})});const d=Math.max(l,...f.map(h=>h.v),1),c=x/u.length*.65;f.forEach((h,g)=>{const S=h.v/d*$,w=r+g*(x/u.length)+(x/u.length-c)/2,F=s+$-S;let N;h.t==="actual"?N=h.v>=l?"#10b981":"#ef4444":N="#f59e0b";const K=ut("rect");K.setAttribute("x",w),K.setAttribute("y",F),K.setAttribute("width",c),K.setAttribute("height",S),K.setAttribute("fill",N),K.style.cursor="pointer";const R=h.t==="actual"?`${h.m}: ${Q(B(t,h.v))} SEK saved (${h.v>=l?"Above":"Below"} target)`:`${h.m}: ${Q(B(t,h.v))} SEK required to hit target`;J(K,R),e.appendChild(K),e.appendChild(Tt(w+c/2,o-12,h.m.slice(5),"middle","#9aa3b2",12))});const m=s+$-l/d*$,b=ut("line");b.setAttribute("x1",r),b.setAttribute("x2",r+x),b.setAttribute("y1",m),b.setAttribute("y2",m),b.setAttribute("stroke","#93c5fd"),b.setAttribute("stroke-dasharray","5,5"),e.appendChild(b),e.appendChild(Tt(r+x-6,m-6,"Monthly target "+Q(B(t,l)),"end","#cfe4ff",16));const A=document.getElementById("glidePill");A&&(M<=0?(A.textContent="On track ✔",A.classList.add("ok")):(A.textContent="From now: need "+Q(B(t,L))+" SEK / month",A.classList.remove("ok")))}function Q(t){return Math.round(t).toLocaleString("sv-SE")}const pt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),It=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=pt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ie(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const a=760,o=320,r=110,n=20,s=20,E=40,x=a-r-n,$=o-s-E,T=H(t,i),k=t.months[i].income||0,u=[{lab:"Income",val:k,c:"#60a5fa"},{lab:"Budget",val:T.bTotal,c:"#3b82f6"},{lab:"Actual",val:T.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,k-T.aTotal),c:"#34d399"}],p=Math.max(...u.map(v=>v.val),1),y=$/u.length*.55;u.forEach((v,C)=>{const M=s+C*($/u.length)+($/u.length-y)/2,L=v.val/p*x,l=pt("rect");l.setAttribute("x",r),l.setAttribute("y",M),l.setAttribute("width",L),l.setAttribute("height",y),l.setAttribute("fill",v.c),e.appendChild(l),e.appendChild(It(r-10,M+y/2+4,v.lab,"end","#cbd5e1",16)),e.appendChild(It(r+L+6,M+y/2+4,re(B(t,v.val)),"start","#cbd5e1",16))});const I=pt("line");I.setAttribute("x1",r),I.setAttribute("x2",r),I.setAttribute("y1",s),I.setAttribute("y2",s+$),I.setAttribute("stroke","#243049"),e.appendChild(I)}function re(t){return Math.round(t).toLocaleString("sv-SE")}const ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function se(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=700,r=280,n=40,s=30,E=60,x=a-r-n,$=o-s-E,T=H(t,i),k=Object.keys(O).map(v=>({p:v,v:T.aParents[v]||0})).sort((v,C)=>C.v-v.v),u=k.reduce((v,C)=>v+C.v,0)||1,p=k.length,y=$/p*.75;k.forEach((v,C)=>{const M=s+C*($/p)+($/p-y)/2,L=v.v/u*x,l=t.highlightedCategory===v.p,f=t.highlightedCategory&&t.highlightedCategory!==null,d=l?"#f59e0b":"#3b82f6",c=f&&!l?.3:1,m=ht("rect");m.setAttribute("x",r),m.setAttribute("y",M),m.setAttribute("width",L),m.setAttribute("height",y),m.setAttribute("fill",d),m.setAttribute("opacity",c),m.style.cursor="pointer";const b=`${v.p}: ${(v.v/u*100).toFixed(1)}% (${Lt(B(t,v.v))} SEK)`;J(m,b),l&&m.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(m);const A=f&&!l?.5:1,h=(t.icons[v.p]||"")+" "+v.p,g=Mt(r-16,M+y/2+6,h,"end","#cbd5e1",15);g.setAttribute("opacity",A),e.appendChild(g);const S=Math.min(r+L+12,a-n-250),w=Mt(S,M+y/2+6,(v.v/u*100).toFixed(1)+"%  ·  "+Lt(B(t,v.v))+" SEK","start","#cbd5e1",14);w.setAttribute("opacity",A),e.appendChild(w)});const I=ht("line");I.setAttribute("x1",r),I.setAttribute("x2",r),I.setAttribute("y1",s),I.setAttribute("y2",s+$),I.setAttribute("stroke","#243049"),e.appendChild(I)}function Lt(t){return Math.round(t).toLocaleString("sv-SE")}const rt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),kt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=rt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function oe(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=460,r=260,n=40,s=20,E=60,x=a-r-n,$=o-s-E,T=H(t,i),k=Object.keys(O).map(C=>({p:C,b:T.bParents[C]||0,a:T.aParents[C]||0})).sort((C,M)=>M.a-C.a),u=k.length,p=$/u,y=p*.35,I=Math.max(...k.map(C=>Math.max(C.a,C.b)),1);k.forEach((C,M)=>{const L=s+M*p+p/2,l=C.b/I*x,f=C.a/I*x,d=t.highlightedCategory===C.p,c=t.highlightedCategory&&t.highlightedCategory!==null,m=d?"#f59e0b":"#3b82f6",b=d?"#f97316":"#10b981",A=c&&!d?.3:1,h=c&&!d?.5:1,g=rt("rect");g.setAttribute("x",r),g.setAttribute("y",L-y-3),g.setAttribute("width",l),g.setAttribute("height",y),g.setAttribute("fill",m),g.setAttribute("opacity",A),g.style.cursor="pointer";const S=`${C.p} Budget: ${tt(B(t,C.b))} SEK`;J(g,S),d&&g.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(g);const w=rt("rect");w.setAttribute("x",r),w.setAttribute("y",L+3),w.setAttribute("width",f),w.setAttribute("height",y),w.setAttribute("fill",b),w.setAttribute("opacity",A),w.style.cursor="pointer";const F=`${C.p} Actual: ${tt(B(t,C.a))} SEK`;J(w,F),d&&w.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(w);const N=(t.icons[C.p]||"")+" "+C.p,K=kt(r-14,L+4,N,"end","#cbd5e1",14);K.setAttribute("opacity",h),e.appendChild(K);const R=Math.max(l,f),j=Math.min(r+R+10,a-n-200),q=kt(j,L+4,"B "+tt(B(t,C.b))+"  A "+tt(B(t,C.a)),"start","#cbd5e1",12);q.setAttribute("opacity",h),e.appendChild(q)});const v=rt("line");v.setAttribute("x1",r),v.setAttribute("x2",r),v.setAttribute("y1",s),v.setAttribute("y2",s+$),v.setAttribute("stroke","#243049"),e.appendChild(v)}function tt(t){return Math.round(t).toLocaleString("sv-SE")}const Yt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Bt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=Yt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ae(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=440,r=260,n=40,s=20,E=40,x=a-r-n,$=o-s-E,T=i.slice(0,4),k=parseInt(i.slice(5,7)),u=[];if(k>=9){for(let c=9;c<=12;c++){const m=`${T}-${c.toString().padStart(2,"0")}`;u.push(m)}const d=(parseInt(T)+1).toString();for(let c=1;c<=8;c++){const m=`${d}-${c.toString().padStart(2,"0")}`;u.push(m)}}else{const d=(parseInt(T)-1).toString();for(let c=9;c<=12;c++){const m=`${d}-${c.toString().padStart(2,"0")}`;u.push(m)}for(let c=1;c<=8;c++){const m=`${T}-${c.toString().padStart(2,"0")}`;u.push(m)}}const p=Object.keys(O),y=u.length,I=[],v=[];p.forEach(d=>{const c=[];u.forEach(m=>{const b=H(t,m),A=b.bParents[d]||0,h=b.aParents[d]||0,g=A?(h-A)/A:0;c.push({p:d,b:A,a:h,v:g,m}),v.push(g)}),I.push(c)});const C=Math.min(...v),M=Math.max(...v),L=x/y,l=$/p.length;function f(d){const c=d<=0?150:0,m=d<=0?C===0?1:-C:M===0?1:M,A=30+30*Math.min(1,Math.abs(d)/m||0);return`hsl(${c},70%,${A}%)`}I.forEach((d,c)=>{d.forEach((b,A)=>{const h=Yt("rect");h.setAttribute("x",r+A*L),h.setAttribute("y",s+c*l),h.setAttribute("width",L-2),h.setAttribute("height",l-2),h.setAttribute("fill",f(b.v)),t.highlightedCategory&&b.p===t.highlightedCategory&&(h.setAttribute("stroke","#3b82f6"),h.setAttribute("stroke-width","3")),h.addEventListener("mouseenter",g=>{const S=document.getElementById("tooltip"),w=b.a-b.b,F=w>=0?"+":"";S.innerHTML=`<div><b>${b.p}</b> · <span class='t'>${b.m}</span></div>
                        <div>Budget: <b>${ct(B(t,b.b))}</b> SEK</div>
                        <div>Actual: <b>${ct(B(t,b.a))}</b> SEK</div>
                        <div>Variance: <b>${F+ct(B(t,w))}</b> (${b.b?(w/b.b*100).toFixed(1):"0.0"}%)</div>`,S.style.left=g.clientX+12+"px",S.style.top=g.clientY+12+"px",S.style.display="block"}),h.addEventListener("mousemove",g=>{const S=document.getElementById("tooltip");S.style.left=g.clientX+12+"px",S.style.top=g.clientY+12+"px"}),h.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(h)});const m=(t.icons[p[c]]||"")+" "+p[c];e.appendChild(Bt(r-14,s+c*l+l/2+4,m,"end",t.highlightedCategory===p[c]?"#ffffff":"#cbd5e1",18))}),u.forEach((d,c)=>e.appendChild(Bt(r+c*L+L/2,o-12,d.slice(5),"middle","#9aa3b2",16)))}function ct(t){return Math.round(t).toLocaleString("sv-SE")}const X=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=X("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ce(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=qt(t,i);if(!a){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const o=1200,r=420,n=80,s=40,E=30,x=60,$=o-n-s,T=r-E-x,k=H(t,i),u=H(t,a),p=u.aTotal,y=k.aTotal,I=Object.keys(O).map(A=>({p:A,icon:t.icons[A]||"",delta:(k.aParents[A]||0)-(u.aParents[A]||0)})).sort((A,h)=>Math.abs(h.delta)-Math.abs(A.delta)),v=I.slice(0,Math.min(10,I.length)),C=I.slice(v.length).reduce((A,h)=>A+h.delta,0);Math.abs(C)>.5&&v.push({p:"Others",icon:"",delta:C});const M=$/(v.length+3),L=E+T;let l=n+M;function f(A){const h=Math.max(p,y,Math.max(...v.map(g=>Math.abs(g.delta)))+Math.max(p,y));return E+T-A/h*T}const d=X("rect");d.setAttribute("x",l-24),d.setAttribute("y",f(p)),d.setAttribute("width",48),d.setAttribute("height",L-f(p)),d.setAttribute("fill","#64748b"),e.appendChild(d),e.appendChild(G(l,r-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(l,f(p)-6,dt(B(t,p)),"middle","#cbd5e1",16));let c=p;l+=M,v.forEach(A=>{const h=A.delta,g=h>=0,S=f(c),w=f(c+h),F=Math.min(S,w),N=Math.abs(w-S);let K=g?"#ef4444":"#10b981",R=1;t.highlightedCategory&&(A.p===t.highlightedCategory?(K=g?"#dc2626":"#059669",R=1):R=.3);const j=X("rect");j.setAttribute("x",l-24),j.setAttribute("y",F),j.setAttribute("width",48),j.setAttribute("height",N),j.setAttribute("fill",K),j.setAttribute("opacity",R),e.appendChild(j);const q=(A.icon?A.icon+" ":"")+A.p;e.appendChild(G(l,r-18,q.length>14?q.slice(0,14)+"…":q,"middle",t.highlightedCategory===A.p?"#ffffff":"#9aa3b2",16));const zt=(g?"+":"")+dt(B(t,h));e.appendChild(G(l,F-6,zt,"middle",t.highlightedCategory===A.p?"#ffffff":"#cbd5e1",16)),c+=h,l+=M});const m=X("rect");m.setAttribute("x",l-24),m.setAttribute("y",f(y)),m.setAttribute("width",48),m.setAttribute("height",L-f(y)),m.setAttribute("fill","#64748b"),e.appendChild(m),e.appendChild(G(l,r-18,"End","middle","#9aa3b2",16)),e.appendChild(G(l,f(y)-6,dt(B(t,y)),"middle","#cbd5e1",16));const b=X("line");b.setAttribute("x1",n*.6),b.setAttribute("x2",o-s),b.setAttribute("y1",L),b.setAttribute("y2",L),b.setAttribute("stroke","#243049"),e.appendChild(b)}function dt(t){return Math.round(t).toLocaleString("sv-SE")}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function et(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=Y("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Ot(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(Y("defs")),r=Y("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","0%"),r.setAttribute("y2","100%");const n=Y("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=Y("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function de(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r={top:40,right:60,bottom:60,left:80},n=a-r.left-r.right,s=o-r.top-r.bottom,E=i.slice(0,4),x=parseInt(i.slice(5,7)),$=[];for(let d=11;d>=0;d--){let c=x-d,m=parseInt(E);c<=0&&(c+=12,m-=1);const b=`${m}-${c.toString().padStart(2,"0")}`;t.months[b]&&$.push({key:b,label:b.slice(5,7),data:H(t,b)})}if($.length===0)return;const T=Math.max(...$.map(d=>d.data.aTotal)),k=n/($.length-1),u=s/T,p=Ot(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),y=Ot(e,"trendLine","#3b82f6","#1d4ed8"),I=Y("rect");I.setAttribute("x",r.left),I.setAttribute("y",r.top),I.setAttribute("width",n),I.setAttribute("height",s),I.setAttribute("fill","rgba(15, 23, 42, 0.5)"),I.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),I.setAttribute("rx",8),e.appendChild(I);for(let d=0;d<=5;d++){const c=r.top+s/5*d,m=Y("line");m.setAttribute("x1",r.left),m.setAttribute("y1",c),m.setAttribute("x2",r.left+n),m.setAttribute("y2",c),m.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),m.setAttribute("stroke-width",1),m.setAttribute("stroke-dasharray","2,2"),e.appendChild(m);const b=T-T/5*d,A=et(r.left-10,c+4,nt(b),"end","#94a3b8",14);e.appendChild(A)}let v=`M ${r.left} ${r.top+s}`,C="M";$.forEach((d,c)=>{const m=r.left+c*k,b=r.top+s-d.data.aTotal*u;c===0?(C+=` ${m} ${b}`,v+=` L ${m} ${b}`):(C+=` L ${m} ${b}`,v+=` L ${m} ${b}`)}),v+=` L ${r.left+($.length-1)*k} ${r.top+s} Z`;const M=Y("path");M.setAttribute("d",v),M.setAttribute("fill",p),M.setAttribute("opacity","0"),e.appendChild(M);const L=Y("path");L.setAttribute("d",C),L.setAttribute("fill","none"),L.setAttribute("stroke",y),L.setAttribute("stroke-width",3),L.setAttribute("stroke-linecap","round"),L.setAttribute("stroke-linejoin","round"),L.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),L.style.strokeDasharray=L.getTotalLength(),L.style.strokeDashoffset=L.getTotalLength(),e.appendChild(L),$.forEach((d,c)=>{const m=r.left+c*k,b=r.top+s-d.data.aTotal*u,A=Y("circle");A.setAttribute("cx",m),A.setAttribute("cy",b),A.setAttribute("r",6),A.setAttribute("fill","rgba(15, 23, 42, 0.9)"),A.setAttribute("stroke","#3b82f6"),A.setAttribute("stroke-width",2),A.setAttribute("opacity","0"),e.appendChild(A);const h=Y("circle");h.setAttribute("cx",m),h.setAttribute("cy",b),h.setAttribute("r",4),h.setAttribute("fill","#3b82f6"),h.setAttribute("opacity","0"),h.style.cursor="pointer",e.appendChild(h);const g=et(m,r.top+s+20,d.label,"middle","#94a3b8",14);e.appendChild(g),h.addEventListener("mouseenter",()=>{h.setAttribute("r",6),h.setAttribute("fill","#1d4ed8"),A.setAttribute("opacity","1");const S=document.getElementById("tooltip");S&&(S.style.display="block",S.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${d.label}</div>
          <div>Total Spending: ${nt(d.data.aTotal)} SEK</div>
          <div>Budget: ${nt(d.data.bTotal)} SEK</div>
          <div>Variance: ${nt(d.data.aTotal-d.data.bTotal)} SEK</div>
        `)}),h.addEventListener("mouseleave",()=>{h.setAttribute("r",4),h.setAttribute("fill","#3b82f6"),A.setAttribute("opacity","0");const S=document.getElementById("tooltip");S&&(S.style.display="none")}),h.addEventListener("mousemove",S=>{const w=document.getElementById("tooltip");w&&(w.style.left=S.pageX+10+"px",w.style.top=S.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{M.style.transition="opacity 1s ease-out",M.setAttribute("opacity","1")},200),setTimeout(()=>{L.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",L.style.strokeDashoffset="0"},400),setTimeout(()=>{$.forEach((d,c)=>{setTimeout(()=>{const m=e.querySelectorAll("circle"),b=c*2+2;m[b]&&(m[b].style.transition="opacity 0.3s ease-out",m[b].setAttribute("opacity","1")),m[b+1]&&(m[b+1].style.transition="opacity 0.3s ease-out",m[b+1].setAttribute("opacity","1"))},c*100)})},1e3)});const l=et(a/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(l);const f=et(20,o/2,"Spending (SEK)","middle","#94a3b8",12,"500");f.setAttribute("transform",`rotate(-90, 20, ${o/2})`),e.appendChild(f)}function nt(t){return Math.round(t).toLocaleString("sv-SE")}function W(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function it(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=W("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function le(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r=60,n=20,s=40,E=60,x=a-r-n,$=o-s-E,T=i.slice(0,4),k=parseInt(i.slice(5,7)),u=[];if(k>=9){for(let d=9;d<=12;d++){const c=`${T}-${d.toString().padStart(2,"0")}`;u.push(c)}const f=(parseInt(T)+1).toString();for(let d=1;d<=8;d++){const c=`${f}-${d.toString().padStart(2,"0")}`;u.push(c)}}else{const f=(parseInt(T)-1).toString();for(let d=9;d<=12;d++){const c=`${f}-${d.toString().padStart(2,"0")}`;u.push(c)}for(let d=1;d<=8;d++){const c=`${T}-${d.toString().padStart(2,"0")}`;u.push(c)}}if(u.length===0)return;const p=u.map(f=>{const d=t.months[f];if(!d)return{month:f,percentage:0};const c=d.income||0,m=Object.keys(d.actual||{}).reduce((A,h)=>A+Object.values(d.actual[h]||{}).reduce((g,S)=>g+(S||0),0),0),b=c>0?m/c*100:0;return{month:f,percentage:b}}),y=Math.max(...p.map(f=>f.percentage)),I=Math.max(100,Math.ceil(y/50)*50),v=f=>r+f/(u.length-1)*x,C=f=>s+$-f/I*$,M=W("rect");M.setAttribute("width",a),M.setAttribute("height",o),M.setAttribute("fill","transparent"),e.appendChild(M);for(let f=0;f<=5;f++){const d=s+f/5*$,c=W("line");c.setAttribute("x1",r),c.setAttribute("y1",d),c.setAttribute("x2",r+x),c.setAttribute("y2",d),c.setAttribute("stroke","#374151"),c.setAttribute("stroke-width",.5),e.appendChild(c);const m=(I-f/5*I).toFixed(0)+"%";e.appendChild(it(r-10,d+4,m,"end","#9ca3af",11))}if(u.forEach((f,d)=>{const c=v(d),m=f.slice(5,7);e.appendChild(it(c,o-E+20,m,"middle","#9ca3af",11))}),p.length>1){const f=W("path");let d=`M ${v(0)} ${C(p[0].percentage)}`;for(let c=1;c<p.length;c++)d+=` L ${v(c)} ${C(p[c].percentage)}`;f.setAttribute("d",d),f.setAttribute("stroke","#f59e0b"),f.setAttribute("stroke-width",3),f.setAttribute("fill","none"),f.setAttribute("stroke-linecap","round"),f.setAttribute("stroke-linejoin","round"),e.appendChild(f)}p.forEach((f,d)=>{const c=W("circle");c.setAttribute("cx",v(d)),c.setAttribute("cy",C(f.percentage)),c.setAttribute("r",4),c.setAttribute("fill","#f59e0b"),c.setAttribute("stroke","#1f2937"),c.setAttribute("stroke-width",2),c.style.cursor="pointer";const m=`${f.month}: ${f.percentage.toFixed(1)}% of income spent`;J(c,m),e.appendChild(c)}),e.appendChild(it(r,25,"Percentage of Income Spent","start","#e5e7eb",14,"bold"));const L=s+10;e.appendChild(it(r+x-200,L,"% of Income Spent","start","#f59e0b",12));const l=W("line");l.setAttribute("x1",r+x-220),l.setAttribute("y1",L-4),l.setAttribute("x2",r+x-210),l.setAttribute("y2",L-4),l.setAttribute("stroke","#f59e0b"),l.setAttribute("stroke-width",3),e.appendChild(l)}let P=Vt();P.highlightedCategory=null;const ue=document.getElementById("app");ue.innerHTML=`
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
`;Ut(P,ot);jt(P,st());Zt();bt();Rt(P,st());gt(P,ot);window.state=P;window.drawAll=bt;window.monthTotals=t=>H(P,t);function st(){return P.order[P.order.length-1]}function ot(){mt(P),jt(P,st()),bt(),Rt(P,st()),gt(P,ot)}function jt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const a=H(t,i),o=t.months[i].income||0,r=B(t,o-a.aTotal),n=o>0?(o-a.aTotal)/o:0,s=a.bTotal>0?a.aTotal/a.bTotal:0,x=t.order.filter(T=>T.slice(0,4)===i.slice(0,4)&&T<=i).map(T=>(t.months[T].income||0)-H(t,T).aTotal).reduce((T,k)=>T+k,0);[{lab:"Monthly Savings (real SEK)",val:Ft(r)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(s*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Ft(B(t,x))+" SEK"}].forEach(T=>{const k=document.createElement("div");k.className="kpi",k.innerHTML=`<div class="lab">${T.lab}</div><div class="val">${T.val}</div>`,k.onclick=()=>{P.highlightedCategory=T.lab,ot()},e.appendChild(k)})}function bt(){const t=document.getElementById("monthSel").value;Qt(P,t),te(P,t),ne(P,t),ie(P,t),de(P,t),le(P,t),se(P,t),oe(P,t),ae(P,t),ce(P,t)}function Ft(t){return Math.round(t).toLocaleString("sv-SE")}
