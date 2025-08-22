(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const ft={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},yt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},O={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function vt(t,i=1){const e=[];let a=i,o=t;for(let r=0;r<12;r++)e.push(`${o}-${String(a).padStart(2,"0")}`),a++,a>12&&(a=1,o++);return e}function lt(t,i){if(t.months[i])Object.keys(O).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(O[e]).forEach(a=>{t.months[i].budget[e][a]===void 0&&(t.months[i].budget[e][a]=O[e][a]),t.months[i].actual[e][a]===void 0&&(t.months[i].actual[e][a]=O[e][a])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},a={};Object.keys(O).forEach(o=>{e[o]={},a[o]={},Object.keys(O[o]).forEach(r=>{e[o][r]=O[o][r],a[o][r]=O[o][r]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:a}}}const Pt="rohmee_budget_live",Nt=2,Kt=108e3;function Vt(){let t=localStorage.getItem(Pt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Ht(e),(!e.order||!e.order.length)&&(e.order=vt(2025,9)),e.order.forEach(a=>lt(e,a)),e.icons=e.icons||ft,e.tags=e.tags||yt,e}catch{}const i={defaultIncome:Kt,target:25e4,cpi:1,order:vt(2025,9),months:{},icons:ft,tags:yt,selected:null,version:Nt};return i.order.forEach(e=>lt(i,e)),mt(i),i}function mt(t){localStorage.setItem(Pt,JSON.stringify(t))}function Gt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Dt(t,i){const e=new FileReader;e.onload=()=>{try{const a=JSON.parse(e.result);Ht(a),mt(a),i(a)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Ht(t){t.version<2&&(t.defaultIncome=t.income||Kt,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Nt}function H(t,i){lt(t,i);const e=t.months[i],a=xt(e.budget),o=xt(e.actual);let r=0,n=0;return Object.keys(a).forEach(s=>{r+=a[s],n+=o[s]||0}),{bParents:a,aParents:o,bTotal:r,aTotal:n}}function qt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function B(t,i){return i/(t.cpi||1)}function Wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function xt(t){let i={};return Object.keys(t).forEach(e=>i[e]=Wt(t[e])),i}function Ut(t,i){const e=document.getElementById("controls"),a=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${$(t.months[a].income||0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${$(t.target)}">
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
  `;const o=e.querySelector("#monthSel"),r=a.slice(5,7),n=a.slice(0,4),s=[];if(parseInt(r)>=9){for(let p=9;p<=12;p++){const y=`${n}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}const u=(parseInt(n)+1).toString();for(let p=1;p<=8;p++){const y=`${u}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}}else{const u=(parseInt(n)-1).toString();for(let p=9;p<=12;p++){const y=`${u}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}for(let p=1;p<=8;p++){const y=`${n}-${p.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}}t.order.forEach(u=>{s.includes(u)||s.push(u)}),s.forEach(u=>{const p=document.createElement("option");p.value=u,p.textContent=u,o.appendChild(p)}),o.value=a;const w=e.querySelector("#netIncome"),x=e.querySelector("#savTarget"),C=e.querySelector("#cpiFactor");function $(u){return Math.round(u).toLocaleString("sv-SE")}function L(u){return parseFloat(u.replace(/\s/g,"").replace(",","."))||0}o.addEventListener("change",u=>{w.value=$(t.months[o.value].income||0),x.value=$(t.target),C.value=t.cpi,i()}),w.addEventListener("input",u=>{const p=u.target.value.replace(/\s/g,""),y=L(p);isNaN(y)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[o.value].income=y,u.target.value=$(y),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),x.addEventListener("input",u=>{const p=u.target.value.replace(/\s/g,""),y=L(p);isNaN(y)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=y,u.target.value=$(y),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),C.addEventListener("input",u=>{const p=parseFloat(u.target.value);isNaN(p)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=p,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>Gt(t)),e.querySelector("#loadJsonInput").addEventListener("change",u=>{const p=u.target.files[0];p&&Dt(p,y=>{Object.assign(t,y),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const u=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(T=>{const v=t.months[T];Object.keys(v.budget).forEach(S=>Object.keys(v.budget[S]).forEach(M=>{u.push([T,S,M,v.budget[S][M],v.actual[S][M]])}))});const p=u.map(T=>T.map(v=>`"${String(v).replace('"','""')}"`).join(",")).join(`
`),y=document.createElement("a");y.href=URL.createObjectURL(new Blob([p],{type:"text/csv"})),y.download="budget.csv",y.click(),setTimeout(()=>URL.revokeObjectURL(y.href),1e3)}),e.querySelector("#clearMonth").addEventListener("click",()=>{const u=o.value,p=t.months[u];confirm(`Clear all budget and actual amounts for ${u}?`)&&(Object.keys(p.budget).forEach(y=>{Object.keys(p.budget[y]).forEach(T=>{p.budget[y][T]=0})}),Object.keys(p.actual).forEach(y=>{Object.keys(p.actual[y]).forEach(T=>{p.actual[y][T]=0})}),i())}),e.querySelector("#copyBudget").addEventListener("click",()=>{const u=o.value,p=t.order.indexOf(u);if(p>0){const y=t.order[p-1],T=t.months[u],v=t.months[y];confirm(`Copy budget amounts from ${y} to ${u}?`)&&(Object.keys(v.budget).forEach(S=>{T.budget[S]||(T.budget[S]={}),Object.keys(v.budget[S]).forEach(M=>{T.budget[S][M]=v.budget[S][M]})}),i())}else alert("No previous month available to copy from.")})}let _={};function gt(t,i){const e=document.getElementById("monthSel").value,a=document.querySelector("#dataTable tbody");a.innerHTML="";const o=t.months[e];Object.keys(O).forEach(n=>{const s=wt(o.budget[n]||{}),w=wt(o.actual[n]||{}),x=document.createElement("tr");x.className="parent"+(w>s?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(x.style.backgroundColor="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const C=document.createElement("td"),$=document.createElement("span");$.textContent=_[n]?"▾":"▸",$.className="toggle",$.title="Collapse/expand",$.onclick=()=>{_[n]=!_[n],gt(t,i)};const L=document.createElement("span");L.className="icon",L.textContent=t.icons[n]||"",L.title="Click to set emoji",L.style.cursor="pointer",L.onclick=()=>{const l=prompt("Set emoji for "+n+":",t.icons[n]||"");l&&(t.icons[n]=l,i&&i())};const u=document.createElement("span");u.textContent=n,u.style.cursor="pointer",u.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},u.ondblclick=()=>{const l=prompt("Rename parent:",n);!l||O[l]||(O[l]=O[n],delete O[n],t.icons[l]=t.icons[n],delete t.icons[n],t.tags[l]=t.tags[n],delete t.tags[n],t.order.forEach(f=>{const d=t.months[f];d.budget[l]=d.budget[n],d.actual[l]=d.actual[n],delete d.budget[n],delete d.actual[n]}),i&&i())},x.onclick=l=>{l.target.closest(".rowtools")||l.target.closest(".toggle")||l.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(x.style.background="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const p=document.createElement("span");p.className="rowtools";const y=document.createElement("span");y.className="chip",y.textContent=t.tags[n]==="F"?"Fixed":"Variable",y.title="Toggle Fixed/Variable",y.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",i&&i()};const T=document.createElement("span");T.className="chip",T.textContent="+",T.title="Add subcategory",T.onclick=()=>{const l=prompt("New subcategory under "+n+":");l&&(O[n][l]=0,t.order.forEach(f=>{const d=t.months[f];d.budget[n][l]=0,d.actual[n][l]=0}),i&&i())};const v=document.createElement("span");v.className="chip",v.textContent="−",v.title="Delete parent",v.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete O[n],delete t.icons[n],delete t.tags[n],t.order.forEach(l=>{const f=t.months[l];delete f.budget[n],delete f.actual[n]}),i&&i())},p.appendChild(y),p.appendChild(T),p.appendChild(v),C.appendChild($),C.appendChild(L),C.appendChild(u),C.appendChild(p),x.appendChild(C);const S=document.createElement("td");S.className="num",S.textContent=Z(B(t,s)),x.appendChild(S);const M=document.createElement("td");M.className="num",M.textContent=Z(B(t,w)),x.appendChild(M);const k=document.createElement("td");k.className="num",k.textContent=Z(B(t,s-w)),x.appendChild(k),a.appendChild(x),_[n]&&Object.keys(O[n]).forEach(l=>{const f=document.createElement("tr");(o.actual[n]||{})[l]>(o.budget[n]||{})[l]&&(f.className="over");const d=document.createElement("td"),c=document.createElement("span");c.textContent="• "+l,c.title="Double-click to rename",c.style.cursor="text",c.ondblclick=()=>{const m=prompt("Rename subcategory:",l);m&&(O[n][m]=O[n][l],delete O[n][l],t.order.forEach(I=>{const E=t.months[I];E.budget[n][m]=E.budget[n][l],E.actual[n][m]=E.actual[n][l],delete E.budget[n][l],delete E.actual[n][l]}),i&&i())},d.appendChild(c);const h=document.createElement("span");h.className="chip",h.textContent="−",h.title="Delete subcategory",h.style.marginLeft="8px",h.onclick=()=>{confirm("Delete "+l+"?")&&(delete O[n][l],t.order.forEach(m=>{const I=t.months[m];delete I.budget[n][l],delete I.actual[n][l]}),i&&i())},d.appendChild(h),f.appendChild(d);const g=document.createElement("td");g.className="num",g.appendChild(At(t,e,n,l,"budget",(o.budget[n]||{})[l]||0,i)),f.appendChild(g);const A=document.createElement("td");A.className="num",A.appendChild(At(t,e,n,l,"actual",(o.actual[n]||{})[l]||0,i)),f.appendChild(A);const b=document.createElement("td");b.className="num",b.textContent=Z(B(t,((o.budget[n]||{})[l]||0)-((o.actual[n]||{})[l]||0))),f.appendChild(b),a.appendChild(f)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(O[n]){alert("Parent already exists");return}O[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(s=>{const w=t.months[s];w.budget[n]={},w.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function At(t,i,e,a,o,r,n){const s=document.createElement("input");s.type="number",s.value=r,s.step="100",s.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const w=x=>{const C=+s.value||0;t.months[i][o][e][a]=C,n&&n()};return s.addEventListener("keydown",x=>{x.key==="Enter"?(w(x.shiftKey?"up":"down"),x.preventDefault()):x.key==="Escape"&&(s.value=r,s.blur())}),s.addEventListener("blur",()=>w()),s}function wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function Z(t){return Math.round(t).toLocaleString("sv-SE")}class Xt{constructor(i){this.state=i}generateInsights(i){const e=[],a=this.getRecentMonths(i,6);if(a.length<3)return e;const o=this.analyzeTrend(a);o&&e.push(o);const r=this.analyzeBudgetVariance(a);r&&e.push(r);const n=this.analyzeCategorySpending(a);e.push(...n);const s=this.analyzeSavingsRate(a);s&&e.push(s);const w=this.analyzeSeasonalPatterns(i);return w&&e.push(w),e.slice(0,8)}getRecentMonths(i,e){const a=parseInt(i.slice(0,4)),o=parseInt(i.slice(5,7)),r=[];for(let n=0;n<e;n++){let s=o-n,w=a;s<=0&&(s+=12,w-=1);const x=`${w}-${s.toString().padStart(2,"0")}`;this.state.months[x]&&r.unshift({key:x,data:H(this.state,x),income:this.state.months[x].income||0})}return r}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(o=>o.data.aTotal)),a=i.reduce((o,r)=>o+r.data.aTotal,0)/i.length;if(Math.abs(e)<a*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const o=e/a*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${o.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:o>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/a*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],a=e.data.aTotal-e.data.bTotal,o=a/e.data.bTotal*100;return Math.abs(o)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(o).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:a>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(a)} SEK (${o.toFixed(1)}%).`,impact:o>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(a))} SEK (${Math.abs(o).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],a=i[i.length-1];if(i.length>=2){const o=i[i.length-2];Object.keys(a.data.aParents).forEach(r=>{const n=a.data.aParents[r]||0,s=o.data.aParents[r]||0;if(s>0){const w=(n-s)/s*100;if(Math.abs(w)>20&&Math.abs(n-s)>1e3){const x=this.getCategoryIcon(r);w>0?e.push({type:"warning",category:"spending",title:`${r} Spending Increased`,message:`${r} spending increased by ${w.toFixed(1)}% (${this.fmt(n-s)} SEK).`,impact:w>50?"high":"medium",icon:x,recommendation:`Review your ${r.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${r} Spending Decreased`,message:`Great! ${r} spending decreased by ${Math.abs(w).toFixed(1)}% (${this.fmt(Math.abs(n-s))} SEK).`,impact:"positive",icon:x})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],a=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return a<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${a.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:a>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${a.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${a.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,a=e*(e-1)/2,o=i.reduce((s,w)=>s+w,0),r=i.reduce((s,w,x)=>s+x*w,0),n=i.reduce((s,w,x)=>s+x*x,0);return(e*r-a*o)/(e*n-a*a)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],a=this.getRecentMonths(i,3);if(a.length===0)return e;const o=a[a.length-1],s=a.reduce((x,C)=>x+C.data.aTotal,0)/a.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(s)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(o.income>0?(o.income-o.data.aTotal)/o.income*100:0)>15){const x=(o.income-o.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(x)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Rt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const a=new Xt(t),o=a.generateInsights(i),r=a.generateRecommendations(i);if(e.innerHTML="",o.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const s=document.getElementById("insightsGrid");o.forEach((w,x)=>{const C=Jt(w);s.appendChild(C)})}if(r.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const s=document.getElementById("recommendationsList");r.forEach((w,x)=>{const C=_t(w);s.appendChild(C)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((s,w)=>{setTimeout(()=>{s.style.opacity="1",s.style.transform="translateY(0)"},w*100)})})}function Jt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function X(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=D("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Et(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(D("defs")),r=D("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=D("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function Qt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=i.slice(0,4),o=parseInt(i.slice(5,7)),r=[];if(o>=9){for(let E=9;E<=12;E++){const F=`${a}-${E.toString().padStart(2,"0")}`;r.push(F)}const I=(parseInt(a)+1).toString();for(let E=1;E<=8;E++){const F=`${I}-${E.toString().padStart(2,"0")}`;r.push(F)}}else{const I=(parseInt(a)-1).toString();for(let E=9;E<=12;E++){const F=`${I}-${E.toString().padStart(2,"0")}`;r.push(F)}for(let E=1;E<=8;E++){const F=`${a}-${E.toString().padStart(2,"0")}`;r.push(F)}}const n=t.order.indexOf(i),w=r.filter(I=>{const E=t.order.indexOf(I);return E>=0&&E<=n}).map(I=>{const E=t.months[I];if(!E)return 0;const F=E.income||0,K=H(t,I).aTotal||0;return Math.max(0,F-K)}).reduce((I,E)=>I+E,0),x=t.target||0,C=x>0?Math.min(1,w/x):0,$=Et(e,"gaugeProgress","#10b981","#059669"),L=Et(e,"gaugeBg","#1e293b","#0f172a"),u=X(380,150,`${Math.round(C*100)}%`,"middle","#10b981",80,"900");e.appendChild(u);const p=X(380,240,`${St(B(t,w))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(p);const y=X(380,290,`of ${St(B(t,x))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(y);const T=C>=1?"#10b981":C>=.8?"#f59e0b":"#ef4444",v=C>=1?"✓ Target Achieved":C>=.8?"⚡ On Track":"⚠ Behind Target",S=X(380,350,v,"middle",T,24,"600");e.appendChild(S);const M=500,k=30,l=380-M/2,f=380,d=D("rect");d.setAttribute("x",l),d.setAttribute("y",f),d.setAttribute("width",M),d.setAttribute("height",k),d.setAttribute("fill",L),d.setAttribute("rx",10),d.setAttribute("opacity","0.3"),e.appendChild(d);const c=D("rect");c.setAttribute("x",l),c.setAttribute("y",f),c.setAttribute("width",0),c.setAttribute("height",k),c.setAttribute("fill",$),c.setAttribute("rx",10),c.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),c.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",M*C)},100)}),["0%","25%","50%","75%","100%"].forEach((I,E)=>{const F=l+M*E/4,K=X(F,f+60,I,"middle","#64748b",30,"500");e.appendChild(K)});let g=0;const A=Math.round(C*100),b=A/60;function m(){g<A&&(g+=b,u.textContent=Math.round(Math.min(g,A))+"%",requestAnimationFrame(m))}setTimeout(m,200)}function St(t){return Math.round(t).toLocaleString("sv-SE")}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function V(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=z("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Ct(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(z("defs")),r=z("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=z("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=z("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function te(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const a=H(t,i);let o=0,r=0;Object.keys(a.aParents).forEach(R=>{t.tags[R]==="F"?o+=a.aParents[R]||0:r+=a.aParents[R]||0});const n=o+r||1,s=Math.round(o/n*100),w=Math.round(r/n*100),x=Ct(e,"fixedGrad","#8b5cf6","#7c3aed"),C=Ct(e,"variableGrad","#06b6d4","#0891b2"),$=200,L=V($,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(L);const u=V($,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(u);const p=V($,280,`${$t(B(t,o))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(p);const y=560,T=V(y,150,"0%","middle","#06b6d4",60,"900");e.appendChild(T);const v=V(y,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(v);const S=V(y,280,`${$t(B(t,r))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(S);const M=320,k=40,l=600,f=380-l/2,d=l*(o/n),c=z("rect");c.setAttribute("x",f),c.setAttribute("y",M),c.setAttribute("width",0),c.setAttribute("height",k),c.setAttribute("fill",x),c.setAttribute("rx",15),c.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),c.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c);const h=l*(r/n),g=z("rect");g.setAttribute("x",f+d),g.setAttribute("y",M),g.setAttribute("width",0),g.setAttribute("height",k),g.setAttribute("fill",C),g.setAttribute("rx",15),g.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),g.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(g);const A=z("rect");A.setAttribute("x",f),A.setAttribute("y",M),A.setAttribute("width",l),A.setAttribute("height",k),A.setAttribute("fill","#1e293b"),A.setAttribute("rx",15),A.setAttribute("opacity","0.3"),e.insertBefore(A,c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",d)},200),setTimeout(()=>{g.setAttribute("x",f+d),g.setAttribute("width",h)},400)});const b=V(380,140,"VS","middle","#64748b",32,"600");e.appendChild(b);const m=z("line");m.setAttribute("x1",380),m.setAttribute("y1",60),m.setAttribute("x2",380),m.setAttribute("y2",230),m.setAttribute("stroke","#374151"),m.setAttribute("stroke-width",2),m.setAttribute("opacity","0.5"),e.appendChild(m);let I=0,E=0;const F=s/50,K=w/50;function N(){(I<s||E<w)&&(I<s&&(I+=F,L.textContent=Math.round(Math.min(I,s))+"%"),E<w&&(E+=K,T.textContent=Math.round(Math.min(E,w))+"%"),requestAnimationFrame(N))}setTimeout(N,300),c.style.cursor="pointer",g.style.cursor="pointer",c.addEventListener("mouseenter",()=>{c.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),c.addEventListener("mouseleave",()=>{c.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),g.addEventListener("mouseenter",()=>{g.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),g.addEventListener("mouseleave",()=>{g.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function $t(t){return Math.round(t).toLocaleString("sv-SE")}class ee{constructor(){this.tooltip=null,this.createTooltip()}createTooltip(){const i=document.getElementById("chart-tooltip");i&&i.remove(),this.tooltip=document.createElement("div"),this.tooltip.id="chart-tooltip",this.tooltip.style.cssText=`
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
    `,document.body.appendChild(this.tooltip)}show(i,e){this.tooltip||this.createTooltip(),this.tooltip.textContent=i,this.tooltip.style.opacity="1";const a=e.pageX+10,o=e.pageY-10,r=this.tooltip.getBoundingClientRect(),n=window.innerWidth;let s=a,w=o;a+r.width>n&&(s=e.pageX-r.width-10),o<0&&(w=e.pageY+20),this.tooltip.style.left=s+"px",this.tooltip.style.top=w+"px"}hide(){this.tooltip&&(this.tooltip.style.opacity="0")}}const ot=new ee;function U(t,i){t.addEventListener("mouseenter",e=>{ot.show(i,e)}),t.addEventListener("mousemove",e=>{ot.show(i,e)}),t.addEventListener("mouseleave",()=>{ot.hide()})}const ut=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ut("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ne(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const a=600,o=250,r=50,n=20,s=20,w=40,x=a-r-n,C=o-s-w,$=i.slice(0,4),L=parseInt(i.slice(5,7)),u=[];if(L>=9){for(let m=9;m<=12;m++){const I=`${$}-${m.toString().padStart(2,"0")}`;u.push(I)}const b=(parseInt($)+1).toString();for(let m=1;m<=8;m++){const I=`${b}-${m.toString().padStart(2,"0")}`;u.push(I)}}else{const b=(parseInt($)-1).toString();for(let m=9;m<=12;m++){const I=`${b}-${m.toString().padStart(2,"0")}`;u.push(I)}for(let m=1;m<=8;m++){const I=`${$}-${m.toString().padStart(2,"0")}`;u.push(I)}}const p=t.order.indexOf(i),T=u.filter(b=>{const m=t.order.indexOf(b);return m>=0&&m<=p}).map(b=>{const m=t.months[b];if(!m)return 0;const I=m.income||0,E=H(t,b).aTotal||0;return Math.max(0,I-E)}).reduce((b,m)=>b+m,0),v=u.filter(b=>{const m=t.order.indexOf(b);return m<0||m>p}).length,S=t.target||0,M=Math.max(0,S-T),k=v>0?M/v:0,l=S/12,f=[];u.forEach(b=>{const m=t.order.indexOf(b);if(m>=0&&m<=p){const I=t.months[b],E=I&&I.income||0,F=I?H(t,b).aTotal:0,K=Math.max(0,E-F);f.push({m:b,v:K,t:"actual"})}else f.push({m:b,v:k,t:"required"})});const d=Math.max(l,...f.map(b=>b.v),1),c=x/u.length*.65;f.forEach((b,m)=>{const I=b.v/d*C,E=r+m*(x/u.length)+(x/u.length-c)/2,F=s+C-I;let K;b.t==="actual"?K=b.v>=l?"#10b981":"#ef4444":K="#f59e0b";const N=ut("rect");N.setAttribute("x",E),N.setAttribute("y",F),N.setAttribute("width",c),N.setAttribute("height",I),N.setAttribute("fill",K),N.style.cursor="pointer";const R=b.t==="actual"?`${b.m}: ${Q(B(t,b.v))} SEK saved (${b.v>=l?"Above":"Below"} target)`:`${b.m}: ${Q(B(t,b.v))} SEK required to hit target`;U(N,R),e.appendChild(N),e.appendChild(Tt(E+c/2,o-12,b.m.slice(5),"middle","#9aa3b2",12))});const h=s+C-l/d*C,g=ut("line");g.setAttribute("x1",r),g.setAttribute("x2",r+x),g.setAttribute("y1",h),g.setAttribute("y2",h),g.setAttribute("stroke","#93c5fd"),g.setAttribute("stroke-dasharray","5,5"),e.appendChild(g),e.appendChild(Tt(r+x-6,h-6,"Monthly target "+Q(B(t,l)),"end","#cfe4ff",16));const A=document.getElementById("glidePill");A&&(M<=0?(A.textContent="On track ✔",A.classList.add("ok")):(A.textContent="From now: need "+Q(B(t,k))+" SEK / month",A.classList.remove("ok")))}function Q(t){return Math.round(t).toLocaleString("sv-SE")}const pt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),It=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=pt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ie(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const a=760,o=320,r=110,n=20,s=20,w=40,x=a-r-n,C=o-s-w,$=H(t,i),L=t.months[i].income||0,u=[{lab:"Income",val:L,c:"#60a5fa"},{lab:"Budget",val:$.bTotal,c:"#3b82f6"},{lab:"Actual",val:$.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,L-$.aTotal),c:"#34d399"}],p=Math.max(...u.map(v=>v.val),1),y=C/u.length*.55;u.forEach((v,S)=>{const M=s+S*(C/u.length)+(C/u.length-y)/2,k=v.val/p*x,l=pt("rect");l.setAttribute("x",r),l.setAttribute("y",M),l.setAttribute("width",k),l.setAttribute("height",y),l.setAttribute("fill",v.c),e.appendChild(l),e.appendChild(It(r-10,M+y/2+4,v.lab,"end","#cbd5e1",16)),e.appendChild(It(r+k+6,M+y/2+4,re(B(t,v.val)),"start","#cbd5e1",16))});const T=pt("line");T.setAttribute("x1",r),T.setAttribute("x2",r),T.setAttribute("y1",s),T.setAttribute("y2",s+C),T.setAttribute("stroke","#243049"),e.appendChild(T)}function re(t){return Math.round(t).toLocaleString("sv-SE")}const ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function se(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=700,r=280,n=40,s=30,w=60,x=a-r-n,C=o-s-w,$=H(t,i),L=Object.keys(O).map(v=>({p:v,v:$.aParents[v]||0})).sort((v,S)=>S.v-v.v),u=L.reduce((v,S)=>v+S.v,0)||1,p=L.length,y=C/p*.75;L.forEach((v,S)=>{const M=s+S*(C/p)+(C/p-y)/2,k=v.v/u*x,l=t.highlightedCategory===v.p,f=t.highlightedCategory&&t.highlightedCategory!==null,d=l?"#f59e0b":"#3b82f6",c=f&&!l?.3:1,h=ht("rect");h.setAttribute("x",r),h.setAttribute("y",M),h.setAttribute("width",k),h.setAttribute("height",y),h.setAttribute("fill",d),h.setAttribute("opacity",c),h.style.cursor="pointer";const g=`${v.p}: ${(v.v/u*100).toFixed(1)}% (${kt(B(t,v.v))} SEK)`;U(h,g),l&&h.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(h);const A=f&&!l?.5:1,b=(t.icons[v.p]||"")+" "+v.p,m=Mt(r-16,M+y/2+6,b,"end","#cbd5e1",15);m.setAttribute("opacity",A),e.appendChild(m);const I=Math.min(r+k+12,a-n-250),E=Mt(I,M+y/2+6,(v.v/u*100).toFixed(1)+"%  ·  "+kt(B(t,v.v))+" SEK","start","#cbd5e1",14);E.setAttribute("opacity",A),e.appendChild(E)});const T=ht("line");T.setAttribute("x1",r),T.setAttribute("x2",r),T.setAttribute("y1",s),T.setAttribute("y2",s+C),T.setAttribute("stroke","#243049"),e.appendChild(T)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}const it=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Lt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=it("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function oe(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=460,r=260,n=40,s=20,w=60,x=a-r-n,C=o-s-w,$=H(t,i),L=Object.keys(O).map(S=>({p:S,b:$.bParents[S]||0,a:$.aParents[S]||0})).sort((S,M)=>M.a-S.a),u=L.length,p=C/u,y=p*.35,T=Math.max(...L.map(S=>Math.max(S.a,S.b)),1);L.forEach((S,M)=>{const k=s+M*p+p/2,l=S.b/T*x,f=S.a/T*x,d=t.highlightedCategory===S.p,c=t.highlightedCategory&&t.highlightedCategory!==null,h=d?"#f59e0b":"#3b82f6",g=d?"#f97316":"#10b981",A=c&&!d?.3:1,b=c&&!d?.5:1,m=it("rect");m.setAttribute("x",r),m.setAttribute("y",k-y-3),m.setAttribute("width",l),m.setAttribute("height",y),m.setAttribute("fill",h),m.setAttribute("opacity",A),m.style.cursor="pointer";const I=`${S.p} Budget: ${tt(B(t,S.b))} SEK`;U(m,I),d&&m.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(m);const E=it("rect");E.setAttribute("x",r),E.setAttribute("y",k+3),E.setAttribute("width",f),E.setAttribute("height",y),E.setAttribute("fill",g),E.setAttribute("opacity",A),E.style.cursor="pointer";const F=`${S.p} Actual: ${tt(B(t,S.a))} SEK`;U(E,F),d&&E.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(E);const K=(t.icons[S.p]||"")+" "+S.p,N=Lt(r-14,k+4,K,"end","#cbd5e1",14);N.setAttribute("opacity",b),e.appendChild(N);const R=Math.max(l,f),Y=Math.min(r+R+10,a-n-200),q=Lt(Y,k+4,"B "+tt(B(t,S.b))+"  A "+tt(B(t,S.a)),"start","#cbd5e1",12);q.setAttribute("opacity",b),e.appendChild(q)});const v=it("line");v.setAttribute("x1",r),v.setAttribute("x2",r),v.setAttribute("y1",s),v.setAttribute("y2",s+C),v.setAttribute("stroke","#243049"),e.appendChild(v)}function tt(t){return Math.round(t).toLocaleString("sv-SE")}const jt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Bt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=jt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ae(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=440,r=260,n=40,s=20,w=40,x=a-r-n,C=o-s-w,$=i.slice(0,4),L=parseInt(i.slice(5,7)),u=[];if(L>=9){for(let c=9;c<=12;c++){const h=`${$}-${c.toString().padStart(2,"0")}`;u.push(h)}const d=(parseInt($)+1).toString();for(let c=1;c<=8;c++){const h=`${d}-${c.toString().padStart(2,"0")}`;u.push(h)}}else{const d=(parseInt($)-1).toString();for(let c=9;c<=12;c++){const h=`${d}-${c.toString().padStart(2,"0")}`;u.push(h)}for(let c=1;c<=8;c++){const h=`${$}-${c.toString().padStart(2,"0")}`;u.push(h)}}const p=Object.keys(O),y=u.length,T=[],v=[];p.forEach(d=>{const c=[];u.forEach(h=>{const g=H(t,h),A=g.bParents[d]||0,b=g.aParents[d]||0,m=A?(b-A)/A:0;c.push({p:d,b:A,a:b,v:m,m:h}),v.push(m)}),T.push(c)});const S=Math.min(...v),M=Math.max(...v),k=x/y,l=C/p.length;function f(d){const c=d<=0?150:0,h=d<=0?S===0?1:-S:M===0?1:M,A=30+30*Math.min(1,Math.abs(d)/h||0);return`hsl(${c},70%,${A}%)`}T.forEach((d,c)=>{d.forEach((g,A)=>{const b=jt("rect");b.setAttribute("x",r+A*k),b.setAttribute("y",s+c*l),b.setAttribute("width",k-2),b.setAttribute("height",l-2),b.setAttribute("fill",f(g.v)),t.highlightedCategory&&g.p===t.highlightedCategory&&(b.setAttribute("stroke","#3b82f6"),b.setAttribute("stroke-width","3")),b.addEventListener("mouseenter",m=>{const I=document.getElementById("tooltip"),E=g.a-g.b,F=E>=0?"+":"";I.innerHTML=`<div><b>${g.p}</b> · <span class='t'>${g.m}</span></div>
                        <div>Budget: <b>${at(B(t,g.b))}</b> SEK</div>
                        <div>Actual: <b>${at(B(t,g.a))}</b> SEK</div>
                        <div>Variance: <b>${F+at(B(t,E))}</b> (${g.b?(E/g.b*100).toFixed(1):"0.0"}%)</div>`,I.style.left=m.clientX+12+"px",I.style.top=m.clientY+12+"px",I.style.display="block"}),b.addEventListener("mousemove",m=>{const I=document.getElementById("tooltip");I.style.left=m.clientX+12+"px",I.style.top=m.clientY+12+"px"}),b.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(b)});const h=(t.icons[p[c]]||"")+" "+p[c];e.appendChild(Bt(r-14,s+c*l+l/2+4,h,"end",t.highlightedCategory===p[c]?"#ffffff":"#cbd5e1",18))}),u.forEach((d,c)=>e.appendChild(Bt(r+c*k+k/2,o-12,d.slice(5),"middle","#9aa3b2",16)))}function at(t){return Math.round(t).toLocaleString("sv-SE")}const J=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=J("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ce(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=qt(t,i);if(!a){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const o=1200,r=420,n=80,s=40,w=30,x=60,C=o-n-s,$=r-w-x,L=H(t,i),u=H(t,a),p=u.aTotal,y=L.aTotal,T=Object.keys(O).map(A=>({p:A,icon:t.icons[A]||"",delta:(L.aParents[A]||0)-(u.aParents[A]||0)})).sort((A,b)=>Math.abs(b.delta)-Math.abs(A.delta)),v=T.slice(0,Math.min(10,T.length)),S=T.slice(v.length).reduce((A,b)=>A+b.delta,0);Math.abs(S)>.5&&v.push({p:"Others",icon:"",delta:S});const M=C/(v.length+3),k=w+$;let l=n+M;function f(A){const b=Math.max(p,y,Math.max(...v.map(m=>Math.abs(m.delta)))+Math.max(p,y));return w+$-A/b*$}const d=J("rect");d.setAttribute("x",l-24),d.setAttribute("y",f(p)),d.setAttribute("width",48),d.setAttribute("height",k-f(p)),d.setAttribute("fill","#64748b"),e.appendChild(d),e.appendChild(G(l,r-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(l,f(p)-6,ct(B(t,p)),"middle","#cbd5e1",16));let c=p;l+=M,v.forEach(A=>{const b=A.delta,m=b>=0,I=f(c),E=f(c+b),F=Math.min(I,E),K=Math.abs(E-I);let N=m?"#ef4444":"#10b981",R=1;t.highlightedCategory&&(A.p===t.highlightedCategory?(N=m?"#dc2626":"#059669",R=1):R=.3);const Y=J("rect");Y.setAttribute("x",l-24),Y.setAttribute("y",F),Y.setAttribute("width",48),Y.setAttribute("height",K),Y.setAttribute("fill",N),Y.setAttribute("opacity",R),e.appendChild(Y);const q=(A.icon?A.icon+" ":"")+A.p;e.appendChild(G(l,r-18,q.length>14?q.slice(0,14)+"…":q,"middle",t.highlightedCategory===A.p?"#ffffff":"#9aa3b2",16));const zt=(m?"+":"")+ct(B(t,b));e.appendChild(G(l,F-6,zt,"middle",t.highlightedCategory===A.p?"#ffffff":"#cbd5e1",16)),c+=b,l+=M});const h=J("rect");h.setAttribute("x",l-24),h.setAttribute("y",f(y)),h.setAttribute("width",48),h.setAttribute("height",k-f(y)),h.setAttribute("fill","#64748b"),e.appendChild(h),e.appendChild(G(l,r-18,"End","middle","#9aa3b2",16)),e.appendChild(G(l,f(y)-6,ct(B(t,y)),"middle","#cbd5e1",16));const g=J("line");g.setAttribute("x1",n*.6),g.setAttribute("x2",o-s),g.setAttribute("y1",k),g.setAttribute("y2",k),g.setAttribute("stroke","#243049"),e.appendChild(g)}function ct(t){return Math.round(t).toLocaleString("sv-SE")}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function et(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=j("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Ot(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(j("defs")),r=j("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","0%"),r.setAttribute("y2","100%");const n=j("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=j("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function de(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r={top:40,right:60,bottom:60,left:80},n=a-r.left-r.right,s=o-r.top-r.bottom,w=i.slice(0,4),x=parseInt(i.slice(5,7)),C=[];for(let d=11;d>=0;d--){let c=x-d,h=parseInt(w);c<=0&&(c+=12,h-=1);const g=`${h}-${c.toString().padStart(2,"0")}`;t.months[g]&&C.push({key:g,label:g.slice(5,7),data:H(t,g)})}if(C.length===0)return;const $=Math.max(...C.map(d=>d.data.aTotal)),L=n/(C.length-1),u=s/$,p=Ot(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),y=Ot(e,"trendLine","#3b82f6","#1d4ed8"),T=j("rect");T.setAttribute("x",r.left),T.setAttribute("y",r.top),T.setAttribute("width",n),T.setAttribute("height",s),T.setAttribute("fill","rgba(15, 23, 42, 0.5)"),T.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),T.setAttribute("rx",8),e.appendChild(T);for(let d=0;d<=5;d++){const c=r.top+s/5*d,h=j("line");h.setAttribute("x1",r.left),h.setAttribute("y1",c),h.setAttribute("x2",r.left+n),h.setAttribute("y2",c),h.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),h.setAttribute("stroke-width",1),h.setAttribute("stroke-dasharray","2,2"),e.appendChild(h);const g=$-$/5*d,A=et(r.left-10,c+4,dt(g),"end","#94a3b8",14);e.appendChild(A)}let v=`M ${r.left} ${r.top+s}`,S="M";C.forEach((d,c)=>{const h=r.left+c*L,g=r.top+s-d.data.aTotal*u;c===0?(S+=` ${h} ${g}`,v+=` L ${h} ${g}`):(S+=` L ${h} ${g}`,v+=` L ${h} ${g}`)}),v+=` L ${r.left+(C.length-1)*L} ${r.top+s} Z`;const M=j("path");M.setAttribute("d",v),M.setAttribute("fill",p),M.setAttribute("opacity","0"),e.appendChild(M);const k=j("path");k.setAttribute("d",S),k.setAttribute("fill","none"),k.setAttribute("stroke",y),k.setAttribute("stroke-width",3),k.setAttribute("stroke-linecap","round"),k.setAttribute("stroke-linejoin","round"),k.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),k.style.strokeDasharray=k.getTotalLength(),k.style.strokeDashoffset=k.getTotalLength(),e.appendChild(k),C.forEach((d,c)=>{const h=r.left+c*L,g=r.top+s-d.data.aTotal*u,A=j("circle");A.setAttribute("cx",h),A.setAttribute("cy",g),A.setAttribute("r",6),A.setAttribute("fill","rgba(15, 23, 42, 0.9)"),A.setAttribute("stroke","#3b82f6"),A.setAttribute("stroke-width",2),A.setAttribute("opacity","0"),e.appendChild(A);const b=j("circle");b.setAttribute("cx",h),b.setAttribute("cy",g),b.setAttribute("r",4),b.setAttribute("fill","#3b82f6"),b.setAttribute("opacity","0"),b.style.cursor="pointer",e.appendChild(b);const m=et(h,r.top+s+20,d.label,"middle","#94a3b8",14);e.appendChild(m);const I=`Month ${d.label}: ${dt(d.data.aTotal)} SEK spent (Budget: ${dt(d.data.bTotal)} SEK)`;U(b,I)}),requestAnimationFrame(()=>{setTimeout(()=>{M.style.transition="opacity 1s ease-out",M.setAttribute("opacity","1")},200),setTimeout(()=>{k.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",k.style.strokeDashoffset="0"},400),setTimeout(()=>{C.forEach((d,c)=>{setTimeout(()=>{const h=e.querySelectorAll("circle"),g=c*2+2;h[g]&&(h[g].style.transition="opacity 0.3s ease-out",h[g].setAttribute("opacity","1")),h[g+1]&&(h[g+1].style.transition="opacity 0.3s ease-out",h[g+1].setAttribute("opacity","1"))},c*100)})},1e3)});const l=et(a/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(l);const f=et(20,o/2,"Spending (SEK)","middle","#94a3b8",12,"500");f.setAttribute("transform",`rotate(-90, 20, ${o/2})`),e.appendChild(f)}function dt(t){return Math.round(t).toLocaleString("sv-SE")}function W(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function nt(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=W("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function le(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r=60,n=20,s=40,w=60,x=a-r-n,C=o-s-w,$=i.slice(0,4),L=parseInt(i.slice(5,7)),u=[];if(L>=9){for(let d=9;d<=12;d++){const c=`${$}-${d.toString().padStart(2,"0")}`;u.push(c)}const f=(parseInt($)+1).toString();for(let d=1;d<=8;d++){const c=`${f}-${d.toString().padStart(2,"0")}`;u.push(c)}}else{const f=(parseInt($)-1).toString();for(let d=9;d<=12;d++){const c=`${f}-${d.toString().padStart(2,"0")}`;u.push(c)}for(let d=1;d<=8;d++){const c=`${$}-${d.toString().padStart(2,"0")}`;u.push(c)}}if(u.length===0)return;const p=u.map(f=>{const d=t.months[f];if(!d)return{month:f,percentage:0};const c=d.income||0,h=Object.keys(d.actual||{}).reduce((A,b)=>A+Object.values(d.actual[b]||{}).reduce((m,I)=>m+(I||0),0),0),g=c>0?h/c*100:0;return{month:f,percentage:g}}),y=Math.max(...p.map(f=>f.percentage)),T=Math.max(100,Math.ceil(y/50)*50),v=f=>r+f/(u.length-1)*x,S=f=>s+C-f/T*C,M=W("rect");M.setAttribute("width",a),M.setAttribute("height",o),M.setAttribute("fill","transparent"),e.appendChild(M);for(let f=0;f<=5;f++){const d=s+f/5*C,c=W("line");c.setAttribute("x1",r),c.setAttribute("y1",d),c.setAttribute("x2",r+x),c.setAttribute("y2",d),c.setAttribute("stroke","#374151"),c.setAttribute("stroke-width",.5),e.appendChild(c);const h=(T-f/5*T).toFixed(0)+"%";e.appendChild(nt(r-10,d+4,h,"end","#9ca3af",11))}if(u.forEach((f,d)=>{const c=v(d),h=f.slice(5,7);e.appendChild(nt(c,o-w+20,h,"middle","#9ca3af",11))}),p.length>1){const f=W("path");let d=`M ${v(0)} ${S(p[0].percentage)}`;for(let c=1;c<p.length;c++)d+=` L ${v(c)} ${S(p[c].percentage)}`;f.setAttribute("d",d),f.setAttribute("stroke","#f59e0b"),f.setAttribute("stroke-width",3),f.setAttribute("fill","none"),f.setAttribute("stroke-linecap","round"),f.setAttribute("stroke-linejoin","round"),e.appendChild(f)}p.forEach((f,d)=>{const c=W("circle");c.setAttribute("cx",v(d)),c.setAttribute("cy",S(f.percentage)),c.setAttribute("r",4),c.setAttribute("fill","#f59e0b"),c.setAttribute("stroke","#1f2937"),c.setAttribute("stroke-width",2),c.style.cursor="pointer";const h=`${f.month}: ${f.percentage.toFixed(1)}% of income spent`;U(c,h),e.appendChild(c)}),e.appendChild(nt(r,25,"Percentage of Income Spent","start","#e5e7eb",14,"bold"));const k=s+10;e.appendChild(nt(r+x-200,k,"% of Income Spent","start","#f59e0b",12));const l=W("line");l.setAttribute("x1",r+x-220),l.setAttribute("y1",k-4),l.setAttribute("x2",r+x-210),l.setAttribute("y2",k-4),l.setAttribute("stroke","#f59e0b"),l.setAttribute("stroke-width",3),e.appendChild(l)}let P=Vt();P.highlightedCategory=null;const ue=document.getElementById("app");ue.innerHTML=`
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
`;Ut(P,st);Yt(P,rt());Zt();bt();Rt(P,rt());gt(P,st);window.state=P;window.drawAll=bt;window.monthTotals=t=>H(P,t);function rt(){return P.order[P.order.length-1]}function st(){mt(P),Yt(P,rt()),bt(),Rt(P,rt()),gt(P,st)}function Yt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const a=H(t,i),o=t.months[i].income||0,r=B(t,o-a.aTotal),n=o>0?(o-a.aTotal)/o:0,s=a.bTotal>0?a.aTotal/a.bTotal:0,x=t.order.filter($=>$.slice(0,4)===i.slice(0,4)&&$<=i).map($=>(t.months[$].income||0)-H(t,$).aTotal).reduce(($,L)=>$+L,0);[{lab:"Monthly Savings (real SEK)",val:Ft(r)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(s*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Ft(B(t,x))+" SEK"}].forEach($=>{const L=document.createElement("div");L.className="kpi",L.innerHTML=`<div class="lab">${$.lab}</div><div class="val">${$.val}</div>`,L.onclick=()=>{P.highlightedCategory=$.lab,st()},e.appendChild(L)})}function bt(){const t=document.getElementById("monthSel").value;Qt(P,t),te(P,t),ne(P,t),ie(P,t),de(P,t),le(P,t),se(P,t),oe(P,t),ae(P,t),ce(P,t)}function Ft(t){return Math.round(t).toLocaleString("sv-SE")}
