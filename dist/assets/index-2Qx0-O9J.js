(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const ft={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},yt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},O={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function vt(t,i=1){const e=[];let a=i,o=t;for(let r=0;r<12;r++)e.push(`${o}-${String(a).padStart(2,"0")}`),a++,a>12&&(a=1,o++);return e}function lt(t,i){if(t.months[i])Object.keys(O).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(O[e]).forEach(a=>{t.months[i].budget[e][a]===void 0&&(t.months[i].budget[e][a]=O[e][a]),t.months[i].actual[e][a]===void 0&&(t.months[i].actual[e][a]=O[e][a])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},a={};Object.keys(O).forEach(o=>{e[o]={},a[o]={},Object.keys(O[o]).forEach(r=>{e[o][r]=O[o][r],a[o][r]=O[o][r]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:a}}}const Pt="rohmee_budget_live",Kt=2,Nt=108e3;function Vt(){let t=localStorage.getItem(Pt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Ht(e),(!e.order||!e.order.length)&&(e.order=vt(2025,9)),e.order.forEach(a=>lt(e,a)),e.icons=e.icons||ft,e.tags=e.tags||yt,e}catch{}const i={defaultIncome:Nt,target:25e4,cpi:1,order:vt(2025,9),months:{},icons:ft,tags:yt,selected:null,version:Kt};return i.order.forEach(e=>lt(i,e)),mt(i),i}function mt(t){localStorage.setItem(Pt,JSON.stringify(t))}function Gt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Dt(t,i){const e=new FileReader;e.onload=()=>{try{const a=JSON.parse(e.result);Ht(a),mt(a),i(a)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Ht(t){t.version<2&&(t.defaultIncome=t.income||Nt,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Kt}function K(t,i){lt(t,i);const e=t.months[i],a=xt(e.budget),o=xt(e.actual);let r=0,n=0;return Object.keys(a).forEach(s=>{r+=a[s],n+=o[s]||0}),{bParents:a,aParents:o,bTotal:r,aTotal:n}}function qt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function B(t,i){return i/(t.cpi||1)}function Wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function xt(t){let i={};return Object.keys(t).forEach(e=>i[e]=Wt(t[e])),i}function Ut(t,i){const e=document.getElementById("controls"),a=t.order[t.order.length-1];e.innerHTML=`
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
  `;const o=e.querySelector("#monthSel"),r=a.slice(5,7),n=a.slice(0,4),s=[];if(parseInt(r)>=9){for(let h=9;h<=12;h++){const y=`${n}-${h.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}const p=(parseInt(n)+1).toString();for(let h=1;h<=8;h++){const y=`${p}-${h.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}}else{const p=(parseInt(n)-1).toString();for(let h=9;h<=12;h++){const y=`${p}-${h.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}for(let h=1;h<=8;h++){const y=`${n}-${h.toString().padStart(2,"0")}`;t.order.includes(y)&&s.push(y)}}t.order.forEach(p=>{s.includes(p)||s.push(p)}),s.forEach(p=>{const h=document.createElement("option");h.value=p,h.textContent=p,o.appendChild(h)}),o.value=a;const A=e.querySelector("#netIncome"),x=e.querySelector("#savTarget"),S=e.querySelector("#cpiFactor");function $(p){return Math.round(p).toLocaleString("sv-SE")}function L(p){return parseFloat(p.replace(/\s/g,"").replace(",","."))||0}o.addEventListener("change",p=>{A.value=$(t.months[o.value].income||0),x.value=$(t.target),S.value=t.cpi,i()}),A.addEventListener("input",p=>{const h=p.target.value.replace(/\s/g,""),y=L(h);isNaN(y)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[o.value].income=y,p.target.value=$(y),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),x.addEventListener("input",p=>{const h=p.target.value.replace(/\s/g,""),y=L(h);isNaN(y)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=y,p.target.value=$(y),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),S.addEventListener("input",p=>{const h=parseFloat(p.target.value);isNaN(h)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=h,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>Gt(t)),e.querySelector("#loadJsonInput").addEventListener("change",p=>{const h=p.target.files[0];h&&Dt(h,y=>{Object.assign(t,y),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const p=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(T=>{const v=t.months[T];Object.keys(v.budget).forEach(C=>Object.keys(v.budget[C]).forEach(M=>{p.push([T,C,M,v.budget[C][M],v.actual[C][M]])}))});const h=p.map(T=>T.map(v=>`"${String(v).replace('"','""')}"`).join(",")).join(`
`),y=document.createElement("a");y.href=URL.createObjectURL(new Blob([h],{type:"text/csv"})),y.download="budget.csv",y.click(),setTimeout(()=>URL.revokeObjectURL(y.href),1e3)}),e.querySelector("#clearMonth").addEventListener("click",()=>{const p=o.value,h=t.months[p];confirm(`Clear all budget and actual amounts for ${p}?`)&&(Object.keys(h.budget).forEach(y=>{Object.keys(h.budget[y]).forEach(T=>{h.budget[y][T]=0})}),Object.keys(h.actual).forEach(y=>{Object.keys(h.actual[y]).forEach(T=>{h.actual[y][T]=0})}),i())}),e.querySelector("#copyBudget").addEventListener("click",()=>{const p=o.value,h=t.order.indexOf(p);if(h>0){const y=t.order[h-1],T=t.months[p],v=t.months[y];confirm(`Copy budget amounts from ${y} to ${p}?`)&&(Object.keys(v.budget).forEach(C=>{T.budget[C]||(T.budget[C]={}),Object.keys(v.budget[C]).forEach(M=>{T.budget[C][M]=v.budget[C][M]})}),i())}else alert("No previous month available to copy from.")})}let _={};function gt(t,i){const e=document.getElementById("monthSel").value,a=document.querySelector("#dataTable tbody");a.innerHTML="";const o=t.months[e];Object.keys(O).forEach(n=>{const s=wt(o.budget[n]||{}),A=wt(o.actual[n]||{}),x=document.createElement("tr");x.className="parent"+(A>s?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(x.style.backgroundColor="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const S=document.createElement("td"),$=document.createElement("span");$.textContent=_[n]?"▾":"▸",$.className="toggle",$.title="Collapse/expand",$.onclick=()=>{_[n]=!_[n],gt(t,i)};const L=document.createElement("span");L.className="icon",L.textContent=t.icons[n]||"",L.title="Click to set emoji",L.style.cursor="pointer",L.onclick=()=>{const u=prompt("Set emoji for "+n+":",t.icons[n]||"");u&&(t.icons[n]=u,i&&i())};const p=document.createElement("span");p.textContent=n,p.style.cursor="pointer",p.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},p.ondblclick=()=>{const u=prompt("Rename parent:",n);!u||O[u]||(O[u]=O[n],delete O[n],t.icons[u]=t.icons[n],delete t.icons[n],t.tags[u]=t.tags[n],delete t.tags[n],t.order.forEach(b=>{const d=t.months[b];d.budget[u]=d.budget[n],d.actual[u]=d.actual[n],delete d.budget[n],delete d.actual[n]}),i&&i())},x.onclick=u=>{u.target.closest(".rowtools")||u.target.closest(".toggle")||u.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(x.style.background="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const h=document.createElement("span");h.className="rowtools";const y=document.createElement("span");y.className="chip",y.textContent=t.tags[n]==="F"?"Fixed":"Variable",y.title="Toggle Fixed/Variable",y.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",i&&i()};const T=document.createElement("span");T.className="chip",T.textContent="+",T.title="Add subcategory",T.onclick=()=>{const u=prompt("New subcategory under "+n+":");u&&(O[n][u]=0,t.order.forEach(b=>{const d=t.months[b];d.budget[n][u]=0,d.actual[n][u]=0}),i&&i())};const v=document.createElement("span");v.className="chip",v.textContent="−",v.title="Delete parent",v.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete O[n],delete t.icons[n],delete t.tags[n],t.order.forEach(u=>{const b=t.months[u];delete b.budget[n],delete b.actual[n]}),i&&i())},h.appendChild(y),h.appendChild(T),h.appendChild(v),S.appendChild($),S.appendChild(L),S.appendChild(p),S.appendChild(h),x.appendChild(S);const C=document.createElement("td");C.className="num",C.textContent=Z(B(t,s)),x.appendChild(C);const M=document.createElement("td");M.className="num",M.textContent=Z(B(t,A)),x.appendChild(M);const k=document.createElement("td");k.className="num",k.textContent=Z(B(t,s-A)),x.appendChild(k),a.appendChild(x),_[n]&&Object.keys(O[n]).forEach(u=>{const b=document.createElement("tr");(o.actual[n]||{})[u]>(o.budget[n]||{})[u]&&(b.className="over");const d=document.createElement("td"),c=document.createElement("span");c.textContent="• "+u,c.title="Double-click to rename",c.style.cursor="text",c.ondblclick=()=>{const m=prompt("Rename subcategory:",u);m&&(O[n][m]=O[n][u],delete O[n][u],t.order.forEach(I=>{const E=t.months[I];E.budget[n][m]=E.budget[n][u],E.actual[n][m]=E.actual[n][u],delete E.budget[n][u],delete E.actual[n][u]}),i&&i())},d.appendChild(c);const l=document.createElement("span");l.className="chip",l.textContent="−",l.title="Delete subcategory",l.style.marginLeft="8px",l.onclick=()=>{confirm("Delete "+u+"?")&&(delete O[n][u],t.order.forEach(m=>{const I=t.months[m];delete I.budget[n][u],delete I.actual[n][u]}),i&&i())},d.appendChild(l),b.appendChild(d);const f=document.createElement("td");f.className="num",f.appendChild(At(t,e,n,u,"budget",(o.budget[n]||{})[u]||0,i)),b.appendChild(f);const w=document.createElement("td");w.className="num",w.appendChild(At(t,e,n,u,"actual",(o.actual[n]||{})[u]||0,i)),b.appendChild(w);const g=document.createElement("td");g.className="num",g.textContent=Z(B(t,((o.budget[n]||{})[u]||0)-((o.actual[n]||{})[u]||0))),b.appendChild(g),a.appendChild(b)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(O[n]){alert("Parent already exists");return}O[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(s=>{const A=t.months[s];A.budget[n]={},A.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function At(t,i,e,a,o,r,n){const s=document.createElement("input");s.type="number",s.value=r,s.step="100",s.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const A=x=>{const S=+s.value||0;t.months[i][o][e][a]=S,n&&n()};return s.addEventListener("keydown",x=>{x.key==="Enter"?(A(x.shiftKey?"up":"down"),x.preventDefault()):x.key==="Escape"&&(s.value=r,s.blur())}),s.addEventListener("blur",()=>A()),s}function wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function Z(t){return Math.round(t).toLocaleString("sv-SE")}class Xt{constructor(i){this.state=i}generateInsights(i){const e=[],a=this.getRecentMonths(i,6);if(a.length<3)return e;const o=this.analyzeTrend(a);o&&e.push(o);const r=this.analyzeBudgetVariance(a);r&&e.push(r);const n=this.analyzeCategorySpending(a);e.push(...n);const s=this.analyzeSavingsRate(a);s&&e.push(s);const A=this.analyzeSeasonalPatterns(i);return A&&e.push(A),e.slice(0,8)}getRecentMonths(i,e){const a=parseInt(i.slice(0,4)),o=parseInt(i.slice(5,7)),r=[];for(let n=0;n<e;n++){let s=o-n,A=a;s<=0&&(s+=12,A-=1);const x=`${A}-${s.toString().padStart(2,"0")}`;this.state.months[x]&&r.unshift({key:x,data:K(this.state,x),income:this.state.months[x].income||0})}return r}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(o=>o.data.aTotal)),a=i.reduce((o,r)=>o+r.data.aTotal,0)/i.length;if(Math.abs(e)<a*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const o=e/a*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${o.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:o>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/a*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],a=e.data.aTotal-e.data.bTotal,o=a/e.data.bTotal*100;return Math.abs(o)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(o).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:a>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(a)} SEK (${o.toFixed(1)}%).`,impact:o>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(a))} SEK (${Math.abs(o).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],a=i[i.length-1];if(i.length>=2){const o=i[i.length-2];Object.keys(a.data.aParents).forEach(r=>{const n=a.data.aParents[r]||0,s=o.data.aParents[r]||0;if(s>0){const A=(n-s)/s*100;if(Math.abs(A)>20&&Math.abs(n-s)>1e3){const x=this.getCategoryIcon(r);A>0?e.push({type:"warning",category:"spending",title:`${r} Spending Increased`,message:`${r} spending increased by ${A.toFixed(1)}% (${this.fmt(n-s)} SEK).`,impact:A>50?"high":"medium",icon:x,recommendation:`Review your ${r.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${r} Spending Decreased`,message:`Great! ${r} spending decreased by ${Math.abs(A).toFixed(1)}% (${this.fmt(Math.abs(n-s))} SEK).`,impact:"positive",icon:x})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],a=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return a<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${a.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:a>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${a.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${a.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,a=e*(e-1)/2,o=i.reduce((s,A)=>s+A,0),r=i.reduce((s,A,x)=>s+x*A,0),n=i.reduce((s,A,x)=>s+x*x,0);return(e*r-a*o)/(e*n-a*a)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],a=this.getRecentMonths(i,3);if(a.length===0)return e;const o=a[a.length-1],s=a.reduce((x,S)=>x+S.data.aTotal,0)/a.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(s)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(o.income>0?(o.income-o.data.aTotal)/o.income*100:0)>15){const x=(o.income-o.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(x)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Rt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const a=new Xt(t),o=a.generateInsights(i),r=a.generateRecommendations(i);if(e.innerHTML="",o.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const s=document.getElementById("insightsGrid");o.forEach((A,x)=>{const S=Jt(A);s.appendChild(S)})}if(r.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const s=document.getElementById("recommendationsList");r.forEach((A,x)=>{const S=_t(A);s.appendChild(S)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((s,A)=>{setTimeout(()=>{s.style.opacity="1",s.style.transform="translateY(0)"},A*100)})})}function Jt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function X(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=D("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function St(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(D("defs")),r=D("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=D("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function Qt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=i.slice(0,4),o=parseInt(i.slice(5,7)),r=[];if(o>=9){for(let E=9;E<=12;E++){const F=`${a}-${E.toString().padStart(2,"0")}`;r.push(F)}const I=(parseInt(a)+1).toString();for(let E=1;E<=8;E++){const F=`${I}-${E.toString().padStart(2,"0")}`;r.push(F)}}else{const I=(parseInt(a)-1).toString();for(let E=9;E<=12;E++){const F=`${I}-${E.toString().padStart(2,"0")}`;r.push(F)}for(let E=1;E<=8;E++){const F=`${a}-${E.toString().padStart(2,"0")}`;r.push(F)}}const n=t.order.indexOf(i),A=r.filter(I=>{const E=t.order.indexOf(I);return E>=0&&E<=n}).map(I=>{const E=t.months[I];if(!E)return 0;const F=E.income||0,H=K(t,I).aTotal||0;return Math.max(0,F-H)}).reduce((I,E)=>I+E,0),x=t.target||0,S=x>0?Math.min(1,A/x):0,$=St(e,"gaugeProgress","#10b981","#059669"),L=St(e,"gaugeBg","#1e293b","#0f172a"),p=X(380,150,`${Math.round(S*100)}%`,"middle","#10b981",80,"900");e.appendChild(p);const h=X(380,240,`${Et(B(t,A))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(h);const y=X(380,290,`of ${Et(B(t,x))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(y);const T=S>=1?"#10b981":S>=.8?"#f59e0b":"#ef4444",v=S>=1?"✓ Target Achieved":S>=.8?"⚡ On Track":"⚠ Behind Target",C=X(380,350,v,"middle",T,24,"600");e.appendChild(C);const M=500,k=30,u=380-M/2,b=380,d=D("rect");d.setAttribute("x",u),d.setAttribute("y",b),d.setAttribute("width",M),d.setAttribute("height",k),d.setAttribute("fill",L),d.setAttribute("rx",10),d.setAttribute("opacity","0.3"),e.appendChild(d);const c=D("rect");c.setAttribute("x",u),c.setAttribute("y",b),c.setAttribute("width",0),c.setAttribute("height",k),c.setAttribute("fill",$),c.setAttribute("rx",10),c.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),c.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",M*S)},100)}),["0%","25%","50%","75%","100%"].forEach((I,E)=>{const F=u+M*E/4,H=X(F,b+60,I,"middle","#64748b",30,"500");e.appendChild(H)});let f=0;const w=Math.round(S*100),g=w/60;function m(){f<w&&(f+=g,p.textContent=Math.round(Math.min(f,w))+"%",requestAnimationFrame(m))}setTimeout(m,200)}function Et(t){return Math.round(t).toLocaleString("sv-SE")}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function V(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=z("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Ct(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(z("defs")),r=z("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=z("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=z("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function te(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const a=K(t,i);let o=0,r=0;Object.keys(a.aParents).forEach(R=>{t.tags[R]==="F"?o+=a.aParents[R]||0:r+=a.aParents[R]||0});const n=o+r||1,s=Math.round(o/n*100),A=Math.round(r/n*100),x=Ct(e,"fixedGrad","#8b5cf6","#7c3aed"),S=Ct(e,"variableGrad","#06b6d4","#0891b2"),$=200,L=V($,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(L);const p=V($,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(p);const h=V($,280,`${$t(B(t,o))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(h);const y=560,T=V(y,150,"0%","middle","#06b6d4",60,"900");e.appendChild(T);const v=V(y,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(v);const C=V(y,280,`${$t(B(t,r))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(C);const M=320,k=40,u=600,b=380-u/2,d=u*(o/n),c=z("rect");c.setAttribute("x",b),c.setAttribute("y",M),c.setAttribute("width",0),c.setAttribute("height",k),c.setAttribute("fill",x),c.setAttribute("rx",15),c.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),c.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c);const l=u*(r/n),f=z("rect");f.setAttribute("x",b+d),f.setAttribute("y",M),f.setAttribute("width",0),f.setAttribute("height",k),f.setAttribute("fill",S),f.setAttribute("rx",15),f.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),f.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(f);const w=z("rect");w.setAttribute("x",b),w.setAttribute("y",M),w.setAttribute("width",u),w.setAttribute("height",k),w.setAttribute("fill","#1e293b"),w.setAttribute("rx",15),w.setAttribute("opacity","0.3"),e.insertBefore(w,c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",d)},200),setTimeout(()=>{f.setAttribute("x",b+d),f.setAttribute("width",l)},400)});const g=V(380,140,"VS","middle","#64748b",32,"600");e.appendChild(g);const m=z("line");m.setAttribute("x1",380),m.setAttribute("y1",60),m.setAttribute("x2",380),m.setAttribute("y2",230),m.setAttribute("stroke","#374151"),m.setAttribute("stroke-width",2),m.setAttribute("opacity","0.5"),e.appendChild(m);let I=0,E=0;const F=s/50,H=A/50;function N(){(I<s||E<A)&&(I<s&&(I+=F,L.textContent=Math.round(Math.min(I,s))+"%"),E<A&&(E+=H,T.textContent=Math.round(Math.min(E,A))+"%"),requestAnimationFrame(N))}setTimeout(N,300),c.style.cursor="pointer",f.style.cursor="pointer",c.addEventListener("mouseenter",()=>{c.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),c.addEventListener("mouseleave",()=>{c.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),f.addEventListener("mouseenter",()=>{f.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),f.addEventListener("mouseleave",()=>{f.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function $t(t){return Math.round(t).toLocaleString("sv-SE")}class ee{constructor(){this.tooltip=null,this.createTooltip()}createTooltip(){const i=document.getElementById("chart-tooltip");i&&i.remove(),this.tooltip=document.createElement("div"),this.tooltip.id="chart-tooltip",this.tooltip.style.cssText=`
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
    `,document.body.appendChild(this.tooltip)}show(i,e){this.tooltip||this.createTooltip(),this.tooltip.textContent=i,this.tooltip.style.opacity="1";const a=e.pageX+10,o=e.pageY-10,r=this.tooltip.getBoundingClientRect(),n=window.innerWidth;let s=a,A=o;a+r.width>n&&(s=e.pageX-r.width-10),o<0&&(A=e.pageY+20),this.tooltip.style.left=s+"px",this.tooltip.style.top=A+"px"}hide(){this.tooltip&&(this.tooltip.style.opacity="0")}}const ot=new ee;function U(t,i){t.addEventListener("mouseenter",e=>{ot.show(i,e)}),t.addEventListener("mousemove",e=>{ot.show(i,e)}),t.addEventListener("mouseleave",()=>{ot.hide()})}const ut=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ut("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ne(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const a=600,o=250,r=50,n=20,s=20,A=40,x=a-r-n,S=o-s-A,$=i.slice(0,4),L=parseInt(i.slice(5,7)),p=[];if(L>=9){for(let m=9;m<=12;m++){const I=`${$}-${m.toString().padStart(2,"0")}`;p.push(I)}const g=(parseInt($)+1).toString();for(let m=1;m<=8;m++){const I=`${g}-${m.toString().padStart(2,"0")}`;p.push(I)}}else{const g=(parseInt($)-1).toString();for(let m=9;m<=12;m++){const I=`${g}-${m.toString().padStart(2,"0")}`;p.push(I)}for(let m=1;m<=8;m++){const I=`${$}-${m.toString().padStart(2,"0")}`;p.push(I)}}const h=t.order.indexOf(i),T=p.filter(g=>{const m=t.order.indexOf(g);return m>=0&&m<=h}).map(g=>{const m=t.months[g];if(!m)return 0;const I=m.income||0,E=K(t,g).aTotal||0;return Math.max(0,I-E)}).reduce((g,m)=>g+m,0),v=p.filter(g=>{const m=t.order.indexOf(g);return m<0||m>h}).length,C=t.target||0,M=Math.max(0,C-T),k=v>0?M/v:0,u=C/12,b=[];p.forEach(g=>{const m=t.order.indexOf(g);if(m>=0&&m<=h){const I=t.months[g],E=I&&I.income||0,F=I?K(t,g).aTotal:0,H=Math.max(0,E-F);b.push({m:g,v:H,t:"actual"})}else b.push({m:g,v:k,t:"required"})});const d=Math.max(u,...b.map(g=>g.v),1),c=x/p.length*.65;b.forEach((g,m)=>{const I=g.v/d*S,E=r+m*(x/p.length)+(x/p.length-c)/2,F=s+S-I;let H;g.t==="actual"?H=g.v>=u?"#10b981":"#ef4444":H="#f59e0b";const N=ut("rect");N.setAttribute("x",E),N.setAttribute("y",F),N.setAttribute("width",c),N.setAttribute("height",I),N.setAttribute("fill",H),N.style.cursor="pointer";const R=g.t==="actual"?`${g.m}: ${Q(B(t,g.v))} SEK saved (${g.v>=u?"Above":"Below"} target)`:`${g.m}: ${Q(B(t,g.v))} SEK required to hit target`;U(N,R),e.appendChild(N),e.appendChild(Tt(E+c/2,o-12,g.m.slice(5),"middle","#9aa3b2",12))});const l=s+S-u/d*S,f=ut("line");f.setAttribute("x1",r),f.setAttribute("x2",r+x),f.setAttribute("y1",l),f.setAttribute("y2",l),f.setAttribute("stroke","#93c5fd"),f.setAttribute("stroke-dasharray","5,5"),e.appendChild(f),e.appendChild(Tt(r+x-6,l-6,"Monthly target "+Q(B(t,u)),"end","#cfe4ff",16));const w=document.getElementById("glidePill");w&&(M<=0?(w.textContent="On track ✔",w.classList.add("ok")):(w.textContent="From now: need "+Q(B(t,k))+" SEK / month",w.classList.remove("ok")))}function Q(t){return Math.round(t).toLocaleString("sv-SE")}const pt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),It=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=pt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ie(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const a=760,o=320,r=110,n=20,s=20,A=40,x=a-r-n,S=o-s-A,$=K(t,i),L=t.months[i].income||0,p=[{lab:"Income",val:L,c:"#60a5fa"},{lab:"Budget",val:$.bTotal,c:"#3b82f6"},{lab:"Actual",val:$.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,L-$.aTotal),c:"#34d399"}],h=Math.max(...p.map(v=>v.val),1),y=S/p.length*.55;p.forEach((v,C)=>{const M=s+C*(S/p.length)+(S/p.length-y)/2,k=v.val/h*x,u=pt("rect");u.setAttribute("x",r),u.setAttribute("y",M),u.setAttribute("width",k),u.setAttribute("height",y),u.setAttribute("fill",v.c),e.appendChild(u),e.appendChild(It(r-10,M+y/2+4,v.lab,"end","#cbd5e1",16)),e.appendChild(It(r+k+6,M+y/2+4,re(B(t,v.val)),"start","#cbd5e1",16))});const T=pt("line");T.setAttribute("x1",r),T.setAttribute("x2",r),T.setAttribute("y1",s),T.setAttribute("y2",s+S),T.setAttribute("stroke","#243049"),e.appendChild(T)}function re(t){return Math.round(t).toLocaleString("sv-SE")}const ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function se(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=700,r=280,n=40,s=30,A=60,x=a-r-n,S=o-s-A,$=K(t,i),L=Object.keys(O).map(v=>({p:v,v:$.aParents[v]||0})).sort((v,C)=>C.v-v.v),p=L.reduce((v,C)=>v+C.v,0)||1,h=L.length,y=S/h*.75;L.forEach((v,C)=>{const M=s+C*(S/h)+(S/h-y)/2,k=v.v/p*x,u=t.highlightedCategory===v.p,b=t.highlightedCategory&&t.highlightedCategory!==null,d=u?"#f59e0b":"#3b82f6",c=b&&!u?.3:1,l=ht("rect");l.setAttribute("x",r),l.setAttribute("y",M),l.setAttribute("width",k),l.setAttribute("height",y),l.setAttribute("fill",d),l.setAttribute("opacity",c),l.style.cursor="pointer";const f=`${v.p}: ${(v.v/p*100).toFixed(1)}% (${kt(B(t,v.v))} SEK)`;U(l,f),u&&l.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(l);const w=b&&!u?.5:1,g=(t.icons[v.p]||"")+" "+v.p,m=Mt(r-16,M+y/2+6,g,"end","#cbd5e1",15);m.setAttribute("opacity",w),e.appendChild(m);const I=Math.min(r+k+12,a-n-250),E=Mt(I,M+y/2+6,(v.v/p*100).toFixed(1)+"%  ·  "+kt(B(t,v.v))+" SEK","start","#cbd5e1",14);E.setAttribute("opacity",w),e.appendChild(E)});const T=ht("line");T.setAttribute("x1",r),T.setAttribute("x2",r),T.setAttribute("y1",s),T.setAttribute("y2",s+S),T.setAttribute("stroke","#243049"),e.appendChild(T)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}const it=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Lt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=it("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function oe(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=460,r=260,n=40,s=20,A=60,x=a-r-n,S=o-s-A,$=K(t,i),L=Object.keys(O).map(C=>({p:C,b:$.bParents[C]||0,a:$.aParents[C]||0})).sort((C,M)=>M.a-C.a),p=L.length,h=S/p,y=h*.35,T=Math.max(...L.map(C=>Math.max(C.a,C.b)),1);L.forEach((C,M)=>{const k=s+M*h+h/2,u=C.b/T*x,b=C.a/T*x,d=t.highlightedCategory===C.p,c=t.highlightedCategory&&t.highlightedCategory!==null,l=d?"#f59e0b":"#3b82f6",f=d?"#f97316":"#10b981",w=c&&!d?.3:1,g=c&&!d?.5:1,m=it("rect");m.setAttribute("x",r),m.setAttribute("y",k-y-3),m.setAttribute("width",u),m.setAttribute("height",y),m.setAttribute("fill",l),m.setAttribute("opacity",w),m.style.cursor="pointer";const I=`${C.p} Budget: ${tt(B(t,C.b))} SEK`;U(m,I),d&&m.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(m);const E=it("rect");E.setAttribute("x",r),E.setAttribute("y",k+3),E.setAttribute("width",b),E.setAttribute("height",y),E.setAttribute("fill",f),E.setAttribute("opacity",w),E.style.cursor="pointer";const F=`${C.p} Actual: ${tt(B(t,C.a))} SEK`;U(E,F),d&&E.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(E);const H=(t.icons[C.p]||"")+" "+C.p,N=Lt(r-14,k+4,H,"end","#cbd5e1",14);N.setAttribute("opacity",g),e.appendChild(N);const R=Math.max(u,b),j=Math.min(r+R+10,a-n-200),q=Lt(j,k+4,"B "+tt(B(t,C.b))+"  A "+tt(B(t,C.a)),"start","#cbd5e1",12);q.setAttribute("opacity",g),e.appendChild(q)});const v=it("line");v.setAttribute("x1",r),v.setAttribute("x2",r),v.setAttribute("y1",s),v.setAttribute("y2",s+S),v.setAttribute("stroke","#243049"),e.appendChild(v)}function tt(t){return Math.round(t).toLocaleString("sv-SE")}const Yt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Bt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=Yt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ae(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=440,r=260,n=40,s=20,A=40,x=a-r-n,S=o-s-A,$=i.slice(0,4),L=parseInt(i.slice(5,7)),p=[];if(L>=9){for(let c=9;c<=12;c++){const l=`${$}-${c.toString().padStart(2,"0")}`;p.push(l)}const d=(parseInt($)+1).toString();for(let c=1;c<=8;c++){const l=`${d}-${c.toString().padStart(2,"0")}`;p.push(l)}}else{const d=(parseInt($)-1).toString();for(let c=9;c<=12;c++){const l=`${d}-${c.toString().padStart(2,"0")}`;p.push(l)}for(let c=1;c<=8;c++){const l=`${$}-${c.toString().padStart(2,"0")}`;p.push(l)}}const h=Object.keys(O),y=p.length,T=[],v=[];h.forEach(d=>{const c=[];p.forEach(l=>{const f=K(t,l),w=f.bParents[d]||0,g=f.aParents[d]||0,m=w?(g-w)/w:0;c.push({p:d,b:w,a:g,v:m,m:l}),v.push(m)}),T.push(c)});const C=Math.min(...v),M=Math.max(...v),k=x/y,u=S/h.length;function b(d){const c=d<=0?150:0,l=d<=0?C===0?1:-C:M===0?1:M,w=30+30*Math.min(1,Math.abs(d)/l||0);return`hsl(${c},70%,${w}%)`}T.forEach((d,c)=>{d.forEach((f,w)=>{const g=Yt("rect");g.setAttribute("x",r+w*k),g.setAttribute("y",s+c*u),g.setAttribute("width",k-2),g.setAttribute("height",u-2),g.setAttribute("fill",b(f.v)),t.highlightedCategory&&f.p===t.highlightedCategory&&(g.setAttribute("stroke","#3b82f6"),g.setAttribute("stroke-width","3")),g.addEventListener("mouseenter",m=>{const I=document.getElementById("tooltip"),E=f.a-f.b,F=E>=0?"+":"";I.innerHTML=`<div><b>${f.p}</b> · <span class='t'>${f.m}</span></div>
                        <div>Budget: <b>${at(B(t,f.b))}</b> SEK</div>
                        <div>Actual: <b>${at(B(t,f.a))}</b> SEK</div>
                        <div>Variance: <b>${F+at(B(t,E))}</b> (${f.b?(E/f.b*100).toFixed(1):"0.0"}%)</div>`,I.style.left=m.clientX+12+"px",I.style.top=m.clientY+12+"px",I.style.display="block"}),g.addEventListener("mousemove",m=>{const I=document.getElementById("tooltip");I.style.left=m.clientX+12+"px",I.style.top=m.clientY+12+"px"}),g.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(g)});const l=(t.icons[h[c]]||"")+" "+h[c];e.appendChild(Bt(r-14,s+c*u+u/2+4,l,"end",t.highlightedCategory===h[c]?"#ffffff":"#cbd5e1",18))}),p.forEach((d,c)=>e.appendChild(Bt(r+c*k+k/2,o-12,d.slice(5),"middle","#9aa3b2",16)))}function at(t){return Math.round(t).toLocaleString("sv-SE")}const J=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=J("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ce(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=qt(t,i);if(!a){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const o=1200,r=420,n=80,s=40,A=30,x=60,S=o-n-s,$=r-A-x,L=K(t,i),p=K(t,a),h=p.aTotal,y=L.aTotal,T=Object.keys(O).map(w=>({p:w,icon:t.icons[w]||"",delta:(L.aParents[w]||0)-(p.aParents[w]||0)})).sort((w,g)=>Math.abs(g.delta)-Math.abs(w.delta)),v=T.slice(0,Math.min(10,T.length)),C=T.slice(v.length).reduce((w,g)=>w+g.delta,0);Math.abs(C)>.5&&v.push({p:"Others",icon:"",delta:C});const M=S/(v.length+3),k=A+$;let u=n+M;function b(w){const g=Math.max(h,y,Math.max(...v.map(m=>Math.abs(m.delta)))+Math.max(h,y));return A+$-w/g*$}const d=J("rect");d.setAttribute("x",u-24),d.setAttribute("y",b(h)),d.setAttribute("width",48),d.setAttribute("height",k-b(h)),d.setAttribute("fill","#64748b"),e.appendChild(d),e.appendChild(G(u,r-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(u,b(h)-6,ct(B(t,h)),"middle","#cbd5e1",16));let c=h;u+=M,v.forEach(w=>{const g=w.delta,m=g>=0,I=b(c),E=b(c+g),F=Math.min(I,E),H=Math.abs(E-I);let N=m?"#ef4444":"#10b981",R=1;t.highlightedCategory&&(w.p===t.highlightedCategory?(N=m?"#dc2626":"#059669",R=1):R=.3);const j=J("rect");j.setAttribute("x",u-24),j.setAttribute("y",F),j.setAttribute("width",48),j.setAttribute("height",H),j.setAttribute("fill",N),j.setAttribute("opacity",R),e.appendChild(j);const q=(w.icon?w.icon+" ":"")+w.p;e.appendChild(G(u,r-18,q.length>14?q.slice(0,14)+"…":q,"middle",t.highlightedCategory===w.p?"#ffffff":"#9aa3b2",16));const zt=(m?"+":"")+ct(B(t,g));e.appendChild(G(u,F-6,zt,"middle",t.highlightedCategory===w.p?"#ffffff":"#cbd5e1",16)),c+=g,u+=M});const l=J("rect");l.setAttribute("x",u-24),l.setAttribute("y",b(y)),l.setAttribute("width",48),l.setAttribute("height",k-b(y)),l.setAttribute("fill","#64748b"),e.appendChild(l),e.appendChild(G(u,r-18,"End","middle","#9aa3b2",16)),e.appendChild(G(u,b(y)-6,ct(B(t,y)),"middle","#cbd5e1",16));const f=J("line");f.setAttribute("x1",n*.6),f.setAttribute("x2",o-s),f.setAttribute("y1",k),f.setAttribute("y2",k),f.setAttribute("stroke","#243049"),e.appendChild(f)}function ct(t){return Math.round(t).toLocaleString("sv-SE")}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function et(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=Y("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Ot(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(Y("defs")),r=Y("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","0%"),r.setAttribute("y2","100%");const n=Y("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=Y("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function de(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r={top:40,right:60,bottom:60,left:80},n=a-r.left-r.right,s=o-r.top-r.bottom,A=i.slice(0,4),x=parseInt(i.slice(5,7)),S=[];if(x>=9){for(let c=9;c<=12;c++){const l=`${A}-${c.toString().padStart(2,"0")}`;S.push({key:l,label:l.slice(5,7),data:t.months[l]?K(t,l):{aTotal:0,bTotal:0}})}const d=(parseInt(A)+1).toString();for(let c=1;c<=8;c++){const l=`${d}-${c.toString().padStart(2,"0")}`;S.push({key:l,label:l.slice(5,7),data:t.months[l]?K(t,l):{aTotal:0,bTotal:0}})}}else{const d=(parseInt(A)-1).toString();for(let c=9;c<=12;c++){const l=`${d}-${c.toString().padStart(2,"0")}`;S.push({key:l,label:l.slice(5,7),data:t.months[l]?K(t,l):{aTotal:0,bTotal:0}})}for(let c=1;c<=8;c++){const l=`${A}-${c.toString().padStart(2,"0")}`;S.push({key:l,label:l.slice(5,7),data:t.months[l]?K(t,l):{aTotal:0,bTotal:0}})}}if(S.length===0)return;const $=Math.max(...S.map(d=>d.data.aTotal),1),L=n/(S.length-1),p=s/$,h=Ot(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),y=Ot(e,"trendLine","#3b82f6","#1d4ed8"),T=Y("rect");T.setAttribute("x",r.left),T.setAttribute("y",r.top),T.setAttribute("width",n),T.setAttribute("height",s),T.setAttribute("fill","rgba(15, 23, 42, 0.5)"),T.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),T.setAttribute("rx",8),e.appendChild(T);for(let d=0;d<=5;d++){const c=r.top+s/5*d,l=Y("line");l.setAttribute("x1",r.left),l.setAttribute("y1",c),l.setAttribute("x2",r.left+n),l.setAttribute("y2",c),l.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),l.setAttribute("stroke-width",1),l.setAttribute("stroke-dasharray","2,2"),e.appendChild(l);const f=$-$/5*d,w=et(r.left-10,c+4,dt(f),"end","#94a3b8",14);e.appendChild(w)}let v=`M ${r.left} ${r.top+s}`,C="M";S.forEach((d,c)=>{const l=r.left+c*L,f=r.top+s-d.data.aTotal*p;c===0?(C+=` ${l} ${f}`,v+=` L ${l} ${f}`):(C+=` L ${l} ${f}`,v+=` L ${l} ${f}`)}),v+=` L ${r.left+(S.length-1)*L} ${r.top+s} Z`;const M=Y("path");M.setAttribute("d",v),M.setAttribute("fill",h),M.setAttribute("opacity","0"),e.appendChild(M);const k=Y("path");k.setAttribute("d",C),k.setAttribute("fill","none"),k.setAttribute("stroke",y),k.setAttribute("stroke-width",3),k.setAttribute("stroke-linecap","round"),k.setAttribute("stroke-linejoin","round"),k.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),k.style.strokeDasharray=k.getTotalLength(),k.style.strokeDashoffset=k.getTotalLength(),e.appendChild(k),S.forEach((d,c)=>{const l=r.left+c*L,f=r.top+s-d.data.aTotal*p,w=Y("circle");w.setAttribute("cx",l),w.setAttribute("cy",f),w.setAttribute("r",6),w.setAttribute("fill","rgba(15, 23, 42, 0.9)"),w.setAttribute("stroke","#3b82f6"),w.setAttribute("stroke-width",2),w.setAttribute("opacity","0"),e.appendChild(w);const g=Y("circle");g.setAttribute("cx",l),g.setAttribute("cy",f),g.setAttribute("r",4),g.setAttribute("fill","#3b82f6"),g.setAttribute("opacity","0"),g.style.cursor="pointer",e.appendChild(g);const m=et(l,r.top+s+20,d.label,"middle","#94a3b8",14);e.appendChild(m);const I=`Month ${d.label}: ${dt(d.data.aTotal)} SEK spent (Budget: ${dt(d.data.bTotal)} SEK)`;U(g,I)}),requestAnimationFrame(()=>{setTimeout(()=>{M.style.transition="opacity 1s ease-out",M.setAttribute("opacity","1")},200),setTimeout(()=>{k.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",k.style.strokeDashoffset="0"},400),setTimeout(()=>{S.forEach((d,c)=>{setTimeout(()=>{const l=e.querySelectorAll("circle"),f=c*2+2;l[f]&&(l[f].style.transition="opacity 0.3s ease-out",l[f].setAttribute("opacity","1")),l[f+1]&&(l[f+1].style.transition="opacity 0.3s ease-out",l[f+1].setAttribute("opacity","1"))},c*100)})},1e3)});const u=et(a/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(u);const b=et(20,o/2,"Spending (SEK)","middle","#94a3b8",12,"500");b.setAttribute("transform",`rotate(-90, 20, ${o/2})`),e.appendChild(b)}function dt(t){return Math.round(t).toLocaleString("sv-SE")}function W(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function nt(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=W("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function le(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r=60,n=20,s=40,A=60,x=a-r-n,S=o-s-A,$=i.slice(0,4),L=parseInt(i.slice(5,7)),p=[];if(L>=9){for(let d=9;d<=12;d++){const c=`${$}-${d.toString().padStart(2,"0")}`;p.push(c)}const b=(parseInt($)+1).toString();for(let d=1;d<=8;d++){const c=`${b}-${d.toString().padStart(2,"0")}`;p.push(c)}}else{const b=(parseInt($)-1).toString();for(let d=9;d<=12;d++){const c=`${b}-${d.toString().padStart(2,"0")}`;p.push(c)}for(let d=1;d<=8;d++){const c=`${$}-${d.toString().padStart(2,"0")}`;p.push(c)}}if(p.length===0)return;const h=p.map(b=>{const d=t.months[b];if(!d||!d.income)return{month:b,percentage:0};const c=d.income||0,l=Object.keys(d.actual||{}).reduce((w,g)=>w+Object.values(d.actual[g]||{}).reduce((m,I)=>m+(I||0),0),0),f=c>0?l/c*100:0;return{month:b,percentage:f}}),y=Math.max(...h.map(b=>b.percentage)),T=Math.max(100,Math.ceil(y/50)*50),v=b=>r+b/(p.length-1)*x,C=b=>s+S-b/T*S,M=W("rect");M.setAttribute("width",a),M.setAttribute("height",o),M.setAttribute("fill","transparent"),e.appendChild(M);for(let b=0;b<=5;b++){const d=s+b/5*S,c=W("line");c.setAttribute("x1",r),c.setAttribute("y1",d),c.setAttribute("x2",r+x),c.setAttribute("y2",d),c.setAttribute("stroke","#374151"),c.setAttribute("stroke-width",.5),e.appendChild(c);const l=(T-b/5*T).toFixed(0)+"%";e.appendChild(nt(r-10,d+4,l,"end","#9ca3af",11))}if(p.forEach((b,d)=>{const c=v(d),l=b.slice(5,7);e.appendChild(nt(c,o-A+20,l,"middle","#9ca3af",11))}),h.length>1){const b=W("path");let d=`M ${v(0)} ${C(h[0].percentage)}`;for(let c=1;c<h.length;c++)d+=` L ${v(c)} ${C(h[c].percentage)}`;b.setAttribute("d",d),b.setAttribute("stroke","#f59e0b"),b.setAttribute("stroke-width",3),b.setAttribute("fill","none"),b.setAttribute("stroke-linecap","round"),b.setAttribute("stroke-linejoin","round"),e.appendChild(b)}h.forEach((b,d)=>{const c=W("circle");c.setAttribute("cx",v(d)),c.setAttribute("cy",C(b.percentage)),c.setAttribute("r",4),c.setAttribute("fill","#f59e0b"),c.setAttribute("stroke","#1f2937"),c.setAttribute("stroke-width",2),c.style.cursor="pointer";const l=`${b.month}: ${b.percentage.toFixed(1)}% of income spent`;U(c,l),e.appendChild(c)}),e.appendChild(nt(r,25,"Percentage of Income Spent","start","#e5e7eb",14,"bold"));const k=s+10;e.appendChild(nt(r+x-200,k,"% of Income Spent","start","#f59e0b",12));const u=W("line");u.setAttribute("x1",r+x-220),u.setAttribute("y1",k-4),u.setAttribute("x2",r+x-210),u.setAttribute("y2",k-4),u.setAttribute("stroke","#f59e0b"),u.setAttribute("stroke-width",3),e.appendChild(u)}let P=Vt();P.highlightedCategory=null;const ue=document.getElementById("app");ue.innerHTML=`
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
`;Ut(P,st);jt(P,rt());Zt();bt();Rt(P,rt());gt(P,st);window.state=P;window.drawAll=bt;window.monthTotals=t=>K(P,t);function rt(){return P.order[P.order.length-1]}function st(){mt(P),jt(P,rt()),bt(),Rt(P,rt()),gt(P,st)}function jt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const a=K(t,i),o=t.months[i].income||0,r=B(t,o-a.aTotal),n=o>0?(o-a.aTotal)/o:0,s=a.bTotal>0?a.aTotal/a.bTotal:0,x=t.order.filter($=>$.slice(0,4)===i.slice(0,4)&&$<=i).map($=>(t.months[$].income||0)-K(t,$).aTotal).reduce(($,L)=>$+L,0);[{lab:"Monthly Savings (real SEK)",val:Ft(r)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(s*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Ft(B(t,x))+" SEK"}].forEach($=>{const L=document.createElement("div");L.className="kpi",L.innerHTML=`<div class="lab">${$.lab}</div><div class="val">${$.val}</div>`,L.onclick=()=>{P.highlightedCategory=$.lab,st()},e.appendChild(L)})}function bt(){const t=document.getElementById("monthSel").value;Qt(P,t),te(P,t),ne(P,t),ie(P,t),de(P,t),le(P,t),se(P,t),oe(P,t),ae(P,t),ce(P,t)}function Ft(t){return Math.round(t).toLocaleString("sv-SE")}
