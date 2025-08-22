(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const ht={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},pt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function gt(t,i=1){const e=[];let a=i,o=t;for(let r=0;r<12;r++)e.push(`${o}-${String(a).padStart(2,"0")}`),a++,a>12&&(a=1,o++);return e}function ot(t,i){if(t.months[i])Object.keys(B).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(B[e]).forEach(a=>{t.months[i].budget[e][a]===void 0&&(t.months[i].budget[e][a]=B[e][a]),t.months[i].actual[e][a]===void 0&&(t.months[i].actual[e][a]=B[e][a])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},a={};Object.keys(B).forEach(o=>{e[o]={},a[o]={},Object.keys(B[o]).forEach(r=>{e[o][r]=B[o][r],a[o][r]=B[o][r]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:a}}}const Bt="rohmee_budget_live",Ot=2,Ft=108e3;function jt(){let t=localStorage.getItem(Bt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Pt(e),(!e.order||!e.order.length)&&(e.order=gt(2025,9)),e.order.forEach(a=>ot(e,a)),e.icons=e.icons||ht,e.tags=e.tags||pt,e}catch{}const i={defaultIncome:Ft,target:25e4,cpi:1,order:gt(2025,9),months:{},icons:ht,tags:pt,selected:null,version:Ot};return i.order.forEach(e=>ot(i,e)),lt(i),i}function lt(t){localStorage.setItem(Bt,JSON.stringify(t))}function Yt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function zt(t,i){const e=new FileReader;e.onload=()=>{try{const a=JSON.parse(e.result);Pt(a),lt(a),i(a)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Pt(t){t.version<2&&(t.defaultIncome=t.income||Ft,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ot}function N(t,i){ot(t,i);const e=t.months[i],a=bt(e.budget),o=bt(e.actual);let r=0,n=0;return Object.keys(a).forEach(s=>{r+=a[s],n+=o[s]||0}),{bParents:a,aParents:o,bTotal:r,aTotal:n}}function Vt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function P(t,i){return i/(t.cpi||1)}function Gt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function bt(t){let i={};return Object.keys(t).forEach(e=>i[e]=Gt(t[e])),i}function Dt(t,i){const e=document.getElementById("controls"),a=t.order[t.order.length-1];e.innerHTML=`
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
  `;const o=e.querySelector("#monthSel"),r=a.slice(5,7),n=a.slice(0,4),s=[];if(parseInt(r)>=9){for(let m=9;m<=12;m++){const f=`${n}-${m.toString().padStart(2,"0")}`;t.order.includes(f)&&s.push(f)}const u=(parseInt(n)+1).toString();for(let m=1;m<=8;m++){const f=`${u}-${m.toString().padStart(2,"0")}`;t.order.includes(f)&&s.push(f)}}else{const u=(parseInt(n)-1).toString();for(let m=9;m<=12;m++){const f=`${u}-${m.toString().padStart(2,"0")}`;t.order.includes(f)&&s.push(f)}for(let m=1;m<=8;m++){const f=`${n}-${m.toString().padStart(2,"0")}`;t.order.includes(f)&&s.push(f)}}t.order.forEach(u=>{s.includes(u)||s.push(u)}),s.forEach(u=>{const m=document.createElement("option");m.value=u,m.textContent=u,o.appendChild(m)}),o.value=a;const E=e.querySelector("#netIncome"),y=e.querySelector("#savTarget"),S=e.querySelector("#cpiFactor");function C(u){return Math.round(u).toLocaleString("sv-SE")}function k(u){return parseFloat(u.replace(/\s/g,"").replace(",","."))||0}o.addEventListener("change",u=>{E.value=C(t.months[o.value].income||0),y.value=C(t.target),S.value=t.cpi,i()}),E.addEventListener("input",u=>{const m=u.target.value.replace(/\s/g,""),f=k(m);isNaN(f)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[o.value].income=f,u.target.value=C(f),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),y.addEventListener("input",u=>{const m=u.target.value.replace(/\s/g,""),f=k(m);isNaN(f)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=f,u.target.value=C(f),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),S.addEventListener("input",u=>{const m=parseFloat(u.target.value);isNaN(m)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=m,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>Yt(t)),e.querySelector("#loadJsonInput").addEventListener("change",u=>{const m=u.target.files[0];m&&zt(m,f=>{Object.assign(t,f),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const u=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(w=>{const x=t.months[w];Object.keys(x.budget).forEach(T=>Object.keys(x.budget[T]).forEach(L=>{u.push([w,T,L,x.budget[T][L],x.actual[T][L]])}))});const m=u.map(w=>w.map(x=>`"${String(x).replace('"','""')}"`).join(",")).join(`
`),f=document.createElement("a");f.href=URL.createObjectURL(new Blob([m],{type:"text/csv"})),f.download="budget.csv",f.click(),setTimeout(()=>URL.revokeObjectURL(f.href),1e3)}),e.querySelector("#clearMonth").addEventListener("click",()=>{const u=o.value,m=t.months[u];confirm(`Clear all budget and actual amounts for ${u}?`)&&(Object.keys(m.budget).forEach(f=>{Object.keys(m.budget[f]).forEach(w=>{m.budget[f][w]=0})}),Object.keys(m.actual).forEach(f=>{Object.keys(m.actual[f]).forEach(w=>{m.actual[f][w]=0})}),i())}),e.querySelector("#copyBudget").addEventListener("click",()=>{const u=o.value,m=t.order.indexOf(u);if(m>0){const f=t.order[m-1],w=t.months[u],x=t.months[f];confirm(`Copy budget amounts from ${f} to ${u}?`)&&(Object.keys(x.budget).forEach(T=>{w.budget[T]||(w.budget[T]={}),Object.keys(x.budget[T]).forEach(L=>{w.budget[T][L]=x.budget[T][L]})}),i())}else alert("No previous month available to copy from.")})}let J={};function ut(t,i){const e=document.getElementById("monthSel").value,a=document.querySelector("#dataTable tbody");a.innerHTML="";const o=t.months[e];Object.keys(B).forEach(n=>{const s=yt(o.budget[n]||{}),E=yt(o.actual[n]||{}),y=document.createElement("tr");y.className="parent"+(E>s?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(y.style.backgroundColor="rgba(59, 130, 246, 0.2)",y.style.borderLeft="4px solid #3b82f6");const S=document.createElement("td"),C=document.createElement("span");C.textContent=J[n]?"▾":"▸",C.className="toggle",C.title="Collapse/expand",C.onclick=()=>{J[n]=!J[n],ut(t,i)};const k=document.createElement("span");k.className="icon",k.textContent=t.icons[n]||"",k.title="Click to set emoji",k.style.cursor="pointer",k.onclick=()=>{const c=prompt("Set emoji for "+n+":",t.icons[n]||"");c&&(t.icons[n]=c,i&&i())};const u=document.createElement("span");u.textContent=n,u.style.cursor="pointer",u.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},u.ondblclick=()=>{const c=prompt("Rename parent:",n);!c||B[c]||(B[c]=B[n],delete B[n],t.icons[c]=t.icons[n],delete t.icons[n],t.tags[c]=t.tags[n],delete t.tags[n],t.order.forEach(g=>{const d=t.months[g];d.budget[c]=d.budget[n],d.actual[c]=d.actual[n],delete d.budget[n],delete d.actual[n]}),i&&i())},y.onclick=c=>{c.target.closest(".rowtools")||c.target.closest(".toggle")||c.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(y.style.background="rgba(59, 130, 246, 0.2)",y.style.borderLeft="4px solid #3b82f6");const m=document.createElement("span");m.className="rowtools";const f=document.createElement("span");f.className="chip",f.textContent=t.tags[n]==="F"?"Fixed":"Variable",f.title="Toggle Fixed/Variable",f.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",i&&i()};const w=document.createElement("span");w.className="chip",w.textContent="+",w.title="Add subcategory",w.onclick=()=>{const c=prompt("New subcategory under "+n+":");c&&(B[n][c]=0,t.order.forEach(g=>{const d=t.months[g];d.budget[n][c]=0,d.actual[n][c]=0}),i&&i())};const x=document.createElement("span");x.className="chip",x.textContent="−",x.title="Delete parent",x.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(c=>{const g=t.months[c];delete g.budget[n],delete g.actual[n]}),i&&i())},m.appendChild(f),m.appendChild(w),m.appendChild(x),S.appendChild(C),S.appendChild(k),S.appendChild(u),S.appendChild(m),y.appendChild(S);const T=document.createElement("td");T.className="num",T.textContent=X(P(t,s)),y.appendChild(T);const L=document.createElement("td");L.className="num",L.textContent=X(P(t,E)),y.appendChild(L);const M=document.createElement("td");M.className="num",M.textContent=X(P(t,s-E)),y.appendChild(M),a.appendChild(y),J[n]&&Object.keys(B[n]).forEach(c=>{const g=document.createElement("tr");(o.actual[n]||{})[c]>(o.budget[n]||{})[c]&&(g.className="over");const d=document.createElement("td"),l=document.createElement("span");l.textContent="• "+c,l.title="Double-click to rename",l.style.cursor="text",l.ondblclick=()=>{const b=prompt("Rename subcategory:",c);b&&(B[n][b]=B[n][c],delete B[n][c],t.order.forEach($=>{const I=t.months[$];I.budget[n][b]=I.budget[n][c],I.actual[n][b]=I.actual[n][c],delete I.budget[n][c],delete I.actual[n][c]}),i&&i())},d.appendChild(l);const A=document.createElement("span");A.className="chip",A.textContent="−",A.title="Delete subcategory",A.style.marginLeft="8px",A.onclick=()=>{confirm("Delete "+c+"?")&&(delete B[n][c],t.order.forEach(b=>{const $=t.months[b];delete $.budget[n][c],delete $.actual[n][c]}),i&&i())},d.appendChild(A),g.appendChild(d);const p=document.createElement("td");p.className="num",p.appendChild(ft(t,e,n,c,"budget",(o.budget[n]||{})[c]||0,i)),g.appendChild(p);const v=document.createElement("td");v.className="num",v.appendChild(ft(t,e,n,c,"actual",(o.actual[n]||{})[c]||0,i)),g.appendChild(v);const h=document.createElement("td");h.className="num",h.textContent=X(P(t,((o.budget[n]||{})[c]||0)-((o.actual[n]||{})[c]||0))),g.appendChild(h),a.appendChild(g)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(s=>{const E=t.months[s];E.budget[n]={},E.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function ft(t,i,e,a,o,r,n){const s=document.createElement("input");s.type="number",s.value=r,s.step="100",s.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const E=y=>{const S=+s.value||0;t.months[i][o][e][a]=S,n&&n()};return s.addEventListener("keydown",y=>{y.key==="Enter"?(E(y.shiftKey?"up":"down"),y.preventDefault()):y.key==="Escape"&&(s.value=r,s.blur())}),s.addEventListener("blur",()=>E()),s}function yt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function X(t){return Math.round(t).toLocaleString("sv-SE")}class qt{constructor(i){this.state=i}generateInsights(i){const e=[],a=this.getRecentMonths(i,6);if(a.length<3)return e;const o=this.analyzeTrend(a);o&&e.push(o);const r=this.analyzeBudgetVariance(a);r&&e.push(r);const n=this.analyzeCategorySpending(a);e.push(...n);const s=this.analyzeSavingsRate(a);s&&e.push(s);const E=this.analyzeSeasonalPatterns(i);return E&&e.push(E),e.slice(0,8)}getRecentMonths(i,e){const a=parseInt(i.slice(0,4)),o=parseInt(i.slice(5,7)),r=[];for(let n=0;n<e;n++){let s=o-n,E=a;s<=0&&(s+=12,E-=1);const y=`${E}-${s.toString().padStart(2,"0")}`;this.state.months[y]&&r.unshift({key:y,data:N(this.state,y),income:this.state.months[y].income||0})}return r}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(o=>o.data.aTotal)),a=i.reduce((o,r)=>o+r.data.aTotal,0)/i.length;if(Math.abs(e)<a*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const o=e/a*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${o.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:o>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/a*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],a=e.data.aTotal-e.data.bTotal,o=a/e.data.bTotal*100;return Math.abs(o)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(o).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:a>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(a)} SEK (${o.toFixed(1)}%).`,impact:o>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(a))} SEK (${Math.abs(o).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],a=i[i.length-1];if(i.length>=2){const o=i[i.length-2];Object.keys(a.data.aParents).forEach(r=>{const n=a.data.aParents[r]||0,s=o.data.aParents[r]||0;if(s>0){const E=(n-s)/s*100;if(Math.abs(E)>20&&Math.abs(n-s)>1e3){const y=this.getCategoryIcon(r);E>0?e.push({type:"warning",category:"spending",title:`${r} Spending Increased`,message:`${r} spending increased by ${E.toFixed(1)}% (${this.fmt(n-s)} SEK).`,impact:E>50?"high":"medium",icon:y,recommendation:`Review your ${r.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${r} Spending Decreased`,message:`Great! ${r} spending decreased by ${Math.abs(E).toFixed(1)}% (${this.fmt(Math.abs(n-s))} SEK).`,impact:"positive",icon:y})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],a=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return a<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${a.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:a>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${a.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${a.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,a=e*(e-1)/2,o=i.reduce((s,E)=>s+E,0),r=i.reduce((s,E,y)=>s+y*E,0),n=i.reduce((s,E,y)=>s+y*y,0);return(e*r-a*o)/(e*n-a*a)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],a=this.getRecentMonths(i,3);if(a.length===0)return e;const o=a[a.length-1],s=a.reduce((y,S)=>y+S.data.aTotal,0)/a.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(s)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(o.income>0?(o.income-o.data.aTotal)/o.income*100:0)>15){const y=(o.income-o.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(y)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Nt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const a=new qt(t),o=a.generateInsights(i),r=a.generateRecommendations(i);if(e.innerHTML="",o.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const s=document.getElementById("insightsGrid");o.forEach((E,y)=>{const S=Wt(E);s.appendChild(S)})}if(r.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const s=document.getElementById("recommendationsList");r.forEach((E,y)=>{const S=Ut(E);s.appendChild(S)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((s,E)=>{setTimeout(()=>{s.style.opacity="1",s.style.transform="translateY(0)"},E*100)})})}function Wt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-4px)",e.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),e}function Ut(t,i){const e=document.createElement("div");e.className=`recommendation-card recommendation-${t.priority}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return e.innerHTML=`
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
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateX(8px)",e.style.borderLeftColor=a[t.priority]}),e.addEventListener("mouseleave",()=>{e.style.transform="translateX(0)",e.style.borderLeftColor="var(--panel-border)"}),e}function Jt(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=D("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function vt(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(D("defs")),r=D("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=D("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function Xt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=i.slice(0,4),o=parseInt(i.slice(5,7)),r=[];if(o>=9){for(let I=9;I<=12;I++){const O=`${a}-${I.toString().padStart(2,"0")}`;r.push(O)}const $=(parseInt(a)+1).toString();for(let I=1;I<=8;I++){const O=`${$}-${I.toString().padStart(2,"0")}`;r.push(O)}}else{const $=(parseInt(a)-1).toString();for(let I=9;I<=12;I++){const O=`${$}-${I.toString().padStart(2,"0")}`;r.push(O)}for(let I=1;I<=8;I++){const O=`${a}-${I.toString().padStart(2,"0")}`;r.push(O)}}const n=t.order.indexOf(i),E=r.filter($=>{const I=t.order.indexOf($);return I>=0&&I<=n}).map($=>{const I=t.months[$];if(!I)return 0;const O=I.income||0,K=N(t,$).aTotal||0;return Math.max(0,O-K)}).reduce(($,I)=>$+I,0),y=t.target||0,S=y>0?Math.min(1,E/y):0,C=vt(e,"gaugeProgress","#10b981","#059669"),k=vt(e,"gaugeBg","#1e293b","#0f172a"),u=W(380,150,`${Math.round(S*100)}%`,"middle","#10b981",80,"900");e.appendChild(u);const m=W(380,240,`${xt(P(t,E))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(m);const f=W(380,290,`of ${xt(P(t,y))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(f);const w=S>=1?"#10b981":S>=.8?"#f59e0b":"#ef4444",x=S>=1?"✓ Target Achieved":S>=.8?"⚡ On Track":"⚠ Behind Target",T=W(380,350,x,"middle",w,24,"600");e.appendChild(T);const L=500,M=30,c=380-L/2,g=380,d=D("rect");d.setAttribute("x",c),d.setAttribute("y",g),d.setAttribute("width",L),d.setAttribute("height",M),d.setAttribute("fill",k),d.setAttribute("rx",10),d.setAttribute("opacity","0.3"),e.appendChild(d);const l=D("rect");l.setAttribute("x",c),l.setAttribute("y",g),l.setAttribute("width",0),l.setAttribute("height",M),l.setAttribute("fill",C),l.setAttribute("rx",10),l.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),l.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l),requestAnimationFrame(()=>{setTimeout(()=>{l.setAttribute("width",L*S)},100)}),["0%","25%","50%","75%","100%"].forEach(($,I)=>{const O=c+L*I/4,K=W(O,g+60,$,"middle","#64748b",30,"500");e.appendChild(K)});let p=0;const v=Math.round(S*100),h=v/60;function b(){p<v&&(p+=h,u.textContent=Math.round(Math.min(p,v))+"%",requestAnimationFrame(b))}setTimeout(b,200)}function xt(t){return Math.round(t).toLocaleString("sv-SE")}function j(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function V(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=j("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function At(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(j("defs")),r=j("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","100%"),r.setAttribute("y2","100%");const n=j("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=j("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function _t(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const a=N(t,i);let o=0,r=0;Object.keys(a.aParents).forEach(Y=>{t.tags[Y]==="F"?o+=a.aParents[Y]||0:r+=a.aParents[Y]||0});const n=o+r||1,s=Math.round(o/n*100),E=Math.round(r/n*100),y=At(e,"fixedGrad","#8b5cf6","#7c3aed"),S=At(e,"variableGrad","#06b6d4","#0891b2"),C=200,k=V(C,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(k);const u=V(C,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(u);const m=V(C,280,`${Et(P(t,o))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(m);const f=560,w=V(f,150,"0%","middle","#06b6d4",60,"900");e.appendChild(w);const x=V(f,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(x);const T=V(f,280,`${Et(P(t,r))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(T);const L=320,M=40,c=600,g=380-c/2,d=c*(o/n),l=j("rect");l.setAttribute("x",g),l.setAttribute("y",L),l.setAttribute("width",0),l.setAttribute("height",M),l.setAttribute("fill",y),l.setAttribute("rx",15),l.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),l.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l);const A=c*(r/n),p=j("rect");p.setAttribute("x",g+d),p.setAttribute("y",L),p.setAttribute("width",0),p.setAttribute("height",M),p.setAttribute("fill",S),p.setAttribute("rx",15),p.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),p.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(p);const v=j("rect");v.setAttribute("x",g),v.setAttribute("y",L),v.setAttribute("width",c),v.setAttribute("height",M),v.setAttribute("fill","#1e293b"),v.setAttribute("rx",15),v.setAttribute("opacity","0.3"),e.insertBefore(v,l),requestAnimationFrame(()=>{setTimeout(()=>{l.setAttribute("width",d)},200),setTimeout(()=>{p.setAttribute("x",g+d),p.setAttribute("width",A)},400)});const h=V(380,140,"VS","middle","#64748b",32,"600");e.appendChild(h);const b=j("line");b.setAttribute("x1",380),b.setAttribute("y1",60),b.setAttribute("x2",380),b.setAttribute("y2",230),b.setAttribute("stroke","#374151"),b.setAttribute("stroke-width",2),b.setAttribute("opacity","0.5"),e.appendChild(b);let $=0,I=0;const O=s/50,K=E/50;function H(){($<s||I<E)&&($<s&&($+=O,k.textContent=Math.round(Math.min($,s))+"%"),I<E&&(I+=K,w.textContent=Math.round(Math.min(I,E))+"%"),requestAnimationFrame(H))}setTimeout(H,300),l.style.cursor="pointer",p.style.cursor="pointer",l.addEventListener("mouseenter",()=>{l.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),l.addEventListener("mouseleave",()=>{l.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),p.addEventListener("mouseenter",()=>{p.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),p.addEventListener("mouseleave",()=>{p.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function Et(t){return Math.round(t).toLocaleString("sv-SE")}const at=t=>document.createElementNS("http://www.w3.org/2000/svg",t),wt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=at("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function Zt(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const a=600,o=250,r=50,n=20,s=20,E=40,y=a-r-n,S=o-s-E,C=i.slice(0,4),k=parseInt(i.slice(5,7)),u=[];if(k>=9){for(let b=9;b<=12;b++){const $=`${C}-${b.toString().padStart(2,"0")}`;u.push($)}const h=(parseInt(C)+1).toString();for(let b=1;b<=8;b++){const $=`${h}-${b.toString().padStart(2,"0")}`;u.push($)}}else{const h=(parseInt(C)-1).toString();for(let b=9;b<=12;b++){const $=`${h}-${b.toString().padStart(2,"0")}`;u.push($)}for(let b=1;b<=8;b++){const $=`${C}-${b.toString().padStart(2,"0")}`;u.push($)}}const m=t.order.indexOf(i),w=u.filter(h=>{const b=t.order.indexOf(h);return b>=0&&b<=m}).map(h=>{const b=t.months[h];if(!b)return 0;const $=b.income||0,I=N(t,h).aTotal||0;return Math.max(0,$-I)}).reduce((h,b)=>h+b,0),x=u.filter(h=>{const b=t.order.indexOf(h);return b<0||b>m}).length,T=t.target||0,L=Math.max(0,T-w),M=x>0?L/x:0,c=T/12,g=[];u.forEach(h=>{const b=t.order.indexOf(h);if(b>=0&&b<=m){const $=t.months[h],I=$&&$.income||0,O=$?N(t,h).aTotal:0,K=Math.max(0,I-O);g.push({m:h,v:K,t:"actual"})}else g.push({m:h,v:M,t:"required"})});const d=Math.max(c,...g.map(h=>h.v),1),l=y/u.length*.65;g.forEach((h,b)=>{const $=h.v/d*S,I=r+b*(y/u.length)+(y/u.length-l)/2,O=s+S-$;let K;h.t==="actual"?K=h.v>=c?"#10b981":"#ef4444":K="#f59e0b";const H=at("rect");H.setAttribute("x",I),H.setAttribute("y",O),H.setAttribute("width",l),H.setAttribute("height",$),H.setAttribute("fill",K),e.appendChild(H),e.appendChild(wt(I+l/2,o-12,h.m.slice(5),"middle","#9aa3b2",12))});const A=s+S-c/d*S,p=at("line");p.setAttribute("x1",r),p.setAttribute("x2",r+y),p.setAttribute("y1",A),p.setAttribute("y2",A),p.setAttribute("stroke","#93c5fd"),p.setAttribute("stroke-dasharray","5,5"),e.appendChild(p),e.appendChild(wt(r+y-6,A-6,"Monthly target "+St(P(t,c)),"end","#cfe4ff",16));const v=document.getElementById("glidePill");v&&(L<=0?(v.textContent="On track ✔",v.classList.add("ok")):(v.textContent="From now: need "+St(P(t,M))+" SEK / month",v.classList.remove("ok")))}function St(t){return Math.round(t).toLocaleString("sv-SE")}const ct=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Ct=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=ct("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function Qt(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const a=760,o=320,r=110,n=20,s=20,E=40,y=a-r-n,S=o-s-E,C=N(t,i),k=t.months[i].income||0,u=[{lab:"Income",val:k,c:"#60a5fa"},{lab:"Budget",val:C.bTotal,c:"#3b82f6"},{lab:"Actual",val:C.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,k-C.aTotal),c:"#34d399"}],m=Math.max(...u.map(x=>x.val),1),f=S/u.length*.55;u.forEach((x,T)=>{const L=s+T*(S/u.length)+(S/u.length-f)/2,M=x.val/m*y,c=ct("rect");c.setAttribute("x",r),c.setAttribute("y",L),c.setAttribute("width",M),c.setAttribute("height",f),c.setAttribute("fill",x.c),e.appendChild(c),e.appendChild(Ct(r-10,L+f/2+4,x.lab,"end","#cbd5e1",16)),e.appendChild(Ct(r+M+6,L+f/2+4,te(P(t,x.val)),"start","#cbd5e1",16))});const w=ct("line");w.setAttribute("x1",r),w.setAttribute("x2",r),w.setAttribute("y1",s),w.setAttribute("y2",s+S),w.setAttribute("stroke","#243049"),e.appendChild(w)}function te(t){return Math.round(t).toLocaleString("sv-SE")}const dt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),$t=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=dt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ee(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=700,r=280,n=40,s=30,E=60,y=a-r-n,S=o-s-E,C=N(t,i),k=Object.keys(B).map(x=>({p:x,v:C.aParents[x]||0})).sort((x,T)=>T.v-x.v),u=k.reduce((x,T)=>x+T.v,0)||1,m=k.length,f=S/m*.75;k.forEach((x,T)=>{const L=s+T*(S/m)+(S/m-f)/2,M=x.v/u*y,c=t.highlightedCategory===x.p,g=c?"#f59e0b":"#3b82f6",d=t.highlightedCategory&&!c?.3:1,l=dt("rect");l.setAttribute("x",r),l.setAttribute("y",L),l.setAttribute("width",M),l.setAttribute("height",f),l.setAttribute("fill",g),l.setAttribute("opacity",d),c&&l.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(l);const A=t.highlightedCategory&&!c?.5:1,p=(t.icons[x.p]||"")+" "+x.p,v=$t(r-16,L+f/2+6,p,"end","#cbd5e1",15);v.setAttribute("opacity",A),e.appendChild(v);const h=$t(r+M+12,L+f/2+6,(x.v/u*100).toFixed(1)+"%  ·  "+ne(P(t,x.v))+" SEK","start","#cbd5e1",14);h.setAttribute("opacity",A),e.appendChild(h)});const w=dt("line");w.setAttribute("x1",r),w.setAttribute("x2",r),w.setAttribute("y1",s),w.setAttribute("y2",s+S),w.setAttribute("stroke","#243049"),e.appendChild(w)}function ne(t){return Math.round(t).toLocaleString("sv-SE")}const tt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=tt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function ie(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=460,r=260,n=40,s=20,E=60,y=a-r-n,S=o-s-E,C=N(t,i),k=Object.keys(B).map(T=>({p:T,b:C.bParents[T]||0,a:C.aParents[T]||0})).sort((T,L)=>L.a-T.a),u=k.length,m=S/u,f=m*.35,w=Math.max(...k.map(T=>Math.max(T.a,T.b)),1);k.forEach((T,L)=>{const M=s+L*m+m/2,c=T.b/w*y,g=T.a/w*y,d=t.highlightedCategory===T.p,l=d?"#f59e0b":"#3b82f6",A=d?"#f97316":"#10b981",p=t.highlightedCategory&&!d?.3:1,v=t.highlightedCategory&&!d?.5:1,h=tt("rect");h.setAttribute("x",r),h.setAttribute("y",M-f-3),h.setAttribute("width",c),h.setAttribute("height",f),h.setAttribute("fill",l),h.setAttribute("opacity",p),d&&h.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(h);const b=tt("rect");b.setAttribute("x",r),b.setAttribute("y",M+3),b.setAttribute("width",g),b.setAttribute("height",f),b.setAttribute("fill",A),b.setAttribute("opacity",p),d&&b.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(b);const $=(t.icons[T.p]||"")+" "+T.p,I=Tt(r-14,M+4,$,"end","#cbd5e1",14);I.setAttribute("opacity",v),e.appendChild(I);const O=Tt(r+Math.max(c,g)+10,M+4,"B "+It(P(t,T.b))+"  A "+It(P(t,T.a)),"start","#cbd5e1",12);O.setAttribute("opacity",v),e.appendChild(O)});const x=tt("line");x.setAttribute("x1",r),x.setAttribute("x2",r),x.setAttribute("y1",s),x.setAttribute("y2",s+S),x.setAttribute("stroke","#243049"),e.appendChild(x)}function It(t){return Math.round(t).toLocaleString("sv-SE")}const Kt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=Kt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function re(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=440,r=260,n=40,s=20,E=40,y=a-r-n,S=o-s-E,C=i.slice(0,4),k=parseInt(i.slice(5,7)),u=[];if(k>=9){for(let l=9;l<=12;l++){const A=`${C}-${l.toString().padStart(2,"0")}`;u.push(A)}const d=(parseInt(C)+1).toString();for(let l=1;l<=8;l++){const A=`${d}-${l.toString().padStart(2,"0")}`;u.push(A)}}else{const d=(parseInt(C)-1).toString();for(let l=9;l<=12;l++){const A=`${d}-${l.toString().padStart(2,"0")}`;u.push(A)}for(let l=1;l<=8;l++){const A=`${C}-${l.toString().padStart(2,"0")}`;u.push(A)}}const m=Object.keys(B),f=u.length,w=[],x=[];m.forEach(d=>{const l=[];u.forEach(A=>{const p=N(t,A),v=p.bParents[d]||0,h=p.aParents[d]||0,b=v?(h-v)/v:0;l.push({p:d,b:v,a:h,v:b,m:A}),x.push(b)}),w.push(l)});const T=Math.min(...x),L=Math.max(...x),M=y/f,c=S/m.length;function g(d){const l=d<=0?150:0,A=d<=0?T===0?1:-T:L===0?1:L,v=30+30*Math.min(1,Math.abs(d)/A||0);return`hsl(${l},70%,${v}%)`}w.forEach((d,l)=>{d.forEach((p,v)=>{const h=Kt("rect");h.setAttribute("x",r+v*M),h.setAttribute("y",s+l*c),h.setAttribute("width",M-2),h.setAttribute("height",c-2),h.setAttribute("fill",g(p.v)),t.highlightedCategory&&p.p===t.highlightedCategory&&(h.setAttribute("stroke","#3b82f6"),h.setAttribute("stroke-width","3")),h.addEventListener("mouseenter",b=>{const $=document.getElementById("tooltip"),I=p.a-p.b,O=I>=0?"+":"";$.innerHTML=`<div><b>${p.p}</b> · <span class='t'>${p.m}</span></div>
                        <div>Budget: <b>${rt(P(t,p.b))}</b> SEK</div>
                        <div>Actual: <b>${rt(P(t,p.a))}</b> SEK</div>
                        <div>Variance: <b>${O+rt(P(t,I))}</b> (${p.b?(I/p.b*100).toFixed(1):"0.0"}%)</div>`,$.style.left=b.clientX+12+"px",$.style.top=b.clientY+12+"px",$.style.display="block"}),h.addEventListener("mousemove",b=>{const $=document.getElementById("tooltip");$.style.left=b.clientX+12+"px",$.style.top=b.clientY+12+"px"}),h.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(h)});const A=(t.icons[m[l]]||"")+" "+m[l];e.appendChild(Mt(r-14,s+l*c+c/2+4,A,"end",t.highlightedCategory===m[l]?"#ffffff":"#cbd5e1",18))}),u.forEach((d,l)=>e.appendChild(Mt(r+l*M+M/2,o-12,d.slice(5),"middle","#9aa3b2",16)))}function rt(t){return Math.round(t).toLocaleString("sv-SE")}const U=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,a="start",o="#cbd5e1",r=12)=>{const n=U("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",o),n.setAttribute("font-size",r),n.textContent=e,n};function se(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const a=Vt(t,i);if(!a){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const o=1200,r=420,n=80,s=40,E=30,y=60,S=o-n-s,C=r-E-y,k=N(t,i),u=N(t,a),m=u.aTotal,f=k.aTotal,w=Object.keys(B).map(v=>({p:v,icon:t.icons[v]||"",delta:(k.aParents[v]||0)-(u.aParents[v]||0)})).sort((v,h)=>Math.abs(h.delta)-Math.abs(v.delta)),x=w.slice(0,Math.min(10,w.length)),T=w.slice(x.length).reduce((v,h)=>v+h.delta,0);Math.abs(T)>.5&&x.push({p:"Others",icon:"",delta:T});const L=S/(x.length+3),M=E+C;let c=n+L;function g(v){const h=Math.max(m,f,Math.max(...x.map(b=>Math.abs(b.delta)))+Math.max(m,f));return E+C-v/h*C}const d=U("rect");d.setAttribute("x",c-24),d.setAttribute("y",g(m)),d.setAttribute("width",48),d.setAttribute("height",M-g(m)),d.setAttribute("fill","#64748b"),e.appendChild(d),e.appendChild(G(c,r-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(c,g(m)-6,st(P(t,m)),"middle","#cbd5e1",16));let l=m;c+=L,x.forEach(v=>{const h=v.delta,b=h>=0,$=g(l),I=g(l+h),O=Math.min($,I),K=Math.abs(I-$);let H=b?"#ef4444":"#10b981",Y=1;t.highlightedCategory&&(v.p===t.highlightedCategory?(H=b?"#dc2626":"#059669",Y=1):Y=.3);const z=U("rect");z.setAttribute("x",c-24),z.setAttribute("y",O),z.setAttribute("width",48),z.setAttribute("height",K),z.setAttribute("fill",H),z.setAttribute("opacity",Y),e.appendChild(z);const it=(v.icon?v.icon+" ":"")+v.p;e.appendChild(G(c,r-18,it.length>14?it.slice(0,14)+"…":it,"middle",t.highlightedCategory===v.p?"#ffffff":"#9aa3b2",16));const Rt=(b?"+":"")+st(P(t,h));e.appendChild(G(c,O-6,Rt,"middle",t.highlightedCategory===v.p?"#ffffff":"#cbd5e1",16)),l+=h,c+=L});const A=U("rect");A.setAttribute("x",c-24),A.setAttribute("y",g(f)),A.setAttribute("width",48),A.setAttribute("height",M-g(f)),A.setAttribute("fill","#64748b"),e.appendChild(A),e.appendChild(G(c,r-18,"End","middle","#9aa3b2",16)),e.appendChild(G(c,g(f)-6,st(P(t,f)),"middle","#cbd5e1",16));const p=U("line");p.setAttribute("x1",n*.6),p.setAttribute("x2",o-s),p.setAttribute("y1",M),p.setAttribute("y2",M),p.setAttribute("stroke","#243049"),e.appendChild(p)}function st(t){return Math.round(t).toLocaleString("sv-SE")}function R(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function _(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=R("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function Lt(t,i,e,a){const o=t.querySelector("defs")||t.appendChild(R("defs")),r=R("linearGradient");r.setAttribute("id",i),r.setAttribute("x1","0%"),r.setAttribute("y1","0%"),r.setAttribute("x2","0%"),r.setAttribute("y2","100%");const n=R("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const s=R("stop");return s.setAttribute("offset","100%"),s.setAttribute("stop-color",a),r.appendChild(n),r.appendChild(s),o.appendChild(r),`url(#${i})`}function oe(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r={top:40,right:60,bottom:60,left:80},n=a-r.left-r.right,s=o-r.top-r.bottom,E=i.slice(0,4),y=parseInt(i.slice(5,7)),S=[];for(let d=11;d>=0;d--){let l=y-d,A=parseInt(E);l<=0&&(l+=12,A-=1);const p=`${A}-${l.toString().padStart(2,"0")}`;t.months[p]&&S.push({key:p,label:p.slice(5,7),data:N(t,p)})}if(S.length===0)return;const C=Math.max(...S.map(d=>d.data.aTotal)),k=n/(S.length-1),u=s/C,m=Lt(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),f=Lt(e,"trendLine","#3b82f6","#1d4ed8"),w=R("rect");w.setAttribute("x",r.left),w.setAttribute("y",r.top),w.setAttribute("width",n),w.setAttribute("height",s),w.setAttribute("fill","rgba(15, 23, 42, 0.5)"),w.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),w.setAttribute("rx",8),e.appendChild(w);for(let d=0;d<=5;d++){const l=r.top+s/5*d,A=R("line");A.setAttribute("x1",r.left),A.setAttribute("y1",l),A.setAttribute("x2",r.left+n),A.setAttribute("y2",l),A.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),A.setAttribute("stroke-width",1),A.setAttribute("stroke-dasharray","2,2"),e.appendChild(A);const p=C-C/5*d,v=_(r.left-10,l+4,Z(p),"end","#94a3b8",14);e.appendChild(v)}let x=`M ${r.left} ${r.top+s}`,T="M";S.forEach((d,l)=>{const A=r.left+l*k,p=r.top+s-d.data.aTotal*u;l===0?(T+=` ${A} ${p}`,x+=` L ${A} ${p}`):(T+=` L ${A} ${p}`,x+=` L ${A} ${p}`)}),x+=` L ${r.left+(S.length-1)*k} ${r.top+s} Z`;const L=R("path");L.setAttribute("d",x),L.setAttribute("fill",m),L.setAttribute("opacity","0"),e.appendChild(L);const M=R("path");M.setAttribute("d",T),M.setAttribute("fill","none"),M.setAttribute("stroke",f),M.setAttribute("stroke-width",3),M.setAttribute("stroke-linecap","round"),M.setAttribute("stroke-linejoin","round"),M.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),M.style.strokeDasharray=M.getTotalLength(),M.style.strokeDashoffset=M.getTotalLength(),e.appendChild(M),S.forEach((d,l)=>{const A=r.left+l*k,p=r.top+s-d.data.aTotal*u,v=R("circle");v.setAttribute("cx",A),v.setAttribute("cy",p),v.setAttribute("r",6),v.setAttribute("fill","rgba(15, 23, 42, 0.9)"),v.setAttribute("stroke","#3b82f6"),v.setAttribute("stroke-width",2),v.setAttribute("opacity","0"),e.appendChild(v);const h=R("circle");h.setAttribute("cx",A),h.setAttribute("cy",p),h.setAttribute("r",4),h.setAttribute("fill","#3b82f6"),h.setAttribute("opacity","0"),h.style.cursor="pointer",e.appendChild(h);const b=_(A,r.top+s+20,d.label,"middle","#94a3b8",14);e.appendChild(b),h.addEventListener("mouseenter",()=>{h.setAttribute("r",6),h.setAttribute("fill","#1d4ed8"),v.setAttribute("opacity","1");const $=document.getElementById("tooltip");$&&($.style.display="block",$.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${d.label}</div>
          <div>Total Spending: ${Z(d.data.aTotal)} SEK</div>
          <div>Budget: ${Z(d.data.bTotal)} SEK</div>
          <div>Variance: ${Z(d.data.aTotal-d.data.bTotal)} SEK</div>
        `)}),h.addEventListener("mouseleave",()=>{h.setAttribute("r",4),h.setAttribute("fill","#3b82f6"),v.setAttribute("opacity","0");const $=document.getElementById("tooltip");$&&($.style.display="none")}),h.addEventListener("mousemove",$=>{const I=document.getElementById("tooltip");I&&(I.style.left=$.pageX+10+"px",I.style.top=$.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{L.style.transition="opacity 1s ease-out",L.setAttribute("opacity","1")},200),setTimeout(()=>{M.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",M.style.strokeDashoffset="0"},400),setTimeout(()=>{S.forEach((d,l)=>{setTimeout(()=>{const A=e.querySelectorAll("circle"),p=l*2+2;A[p]&&(A[p].style.transition="opacity 0.3s ease-out",A[p].setAttribute("opacity","1")),A[p+1]&&(A[p+1].style.transition="opacity 0.3s ease-out",A[p+1].setAttribute("opacity","1"))},l*100)})},1e3)});const c=_(a/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(c);const g=_(20,o/2,"Spending (SEK)","middle","#94a3b8",12,"500");g.setAttribute("transform",`rotate(-90, 20, ${o/2})`),e.appendChild(g)}function Z(t){return Math.round(t).toLocaleString("sv-SE")}function q(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Q(t,i,e,a="start",o="#cbd5e1",r=12,n="normal"){const s=q("text");return s.setAttribute("x",t),s.setAttribute("y",i),s.setAttribute("text-anchor",a),s.setAttribute("fill",o),s.setAttribute("font-size",r),s.setAttribute("font-weight",n),s.setAttribute("font-family","Inter, system-ui, sans-serif"),s.textContent=e,s}function ae(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const a=1200,o=400,r=60,n=20,s=40,E=60,y=a-r-n,S=o-s-E,C=i.slice(0,4),k=parseInt(i.slice(5,7)),u=[];if(k>=9){for(let g=9;g<=12;g++){const d=`${C}-${g.toString().padStart(2,"0")}`;u.push(d)}const c=(parseInt(C)+1).toString();for(let g=1;g<=8;g++){const d=`${c}-${g.toString().padStart(2,"0")}`;u.push(d)}}else{const c=(parseInt(C)-1).toString();for(let g=9;g<=12;g++){const d=`${c}-${g.toString().padStart(2,"0")}`;u.push(d)}for(let g=1;g<=8;g++){const d=`${C}-${g.toString().padStart(2,"0")}`;u.push(d)}}if(u.length===0)return;const m=u.map(c=>{const g=t.months[c];if(!g)return{month:c,percentage:0};const d=g.income||0,l=Object.keys(g.actual||{}).reduce((p,v)=>p+Object.values(g.actual[v]||{}).reduce((h,b)=>h+(b||0),0),0),A=d>0?l/d*100:0;return{month:c,percentage:Math.min(A,100)}}),f=Math.max(100,Math.max(...m.map(c=>c.percentage))),w=c=>r+c/(u.length-1)*y,x=c=>s+S-c/f*S,T=q("rect");T.setAttribute("width",a),T.setAttribute("height",o),T.setAttribute("fill","transparent"),e.appendChild(T);for(let c=0;c<=5;c++){const g=s+c/5*S,d=q("line");d.setAttribute("x1",r),d.setAttribute("y1",g),d.setAttribute("x2",r+y),d.setAttribute("y2",g),d.setAttribute("stroke","#374151"),d.setAttribute("stroke-width",.5),e.appendChild(d);const l=(100-c/5*100).toFixed(0)+"%";e.appendChild(Q(r-10,g+4,l,"end","#9ca3af",11))}if(u.forEach((c,g)=>{const d=w(g),l=c.slice(5,7);e.appendChild(Q(d,o-E+20,l,"middle","#9ca3af",11))}),m.length>1){const c=q("path");let g=`M ${w(0)} ${x(m[0].percentage)}`;for(let d=1;d<m.length;d++)g+=` L ${w(d)} ${x(m[d].percentage)}`;c.setAttribute("d",g),c.setAttribute("stroke","#f59e0b"),c.setAttribute("stroke-width",3),c.setAttribute("fill","none"),c.setAttribute("stroke-linecap","round"),c.setAttribute("stroke-linejoin","round"),e.appendChild(c)}m.forEach((c,g)=>{const d=q("circle");d.setAttribute("cx",w(g)),d.setAttribute("cy",x(c.percentage)),d.setAttribute("r",4),d.setAttribute("fill","#f59e0b"),d.setAttribute("stroke","#1f2937"),d.setAttribute("stroke-width",2),e.appendChild(d)}),e.appendChild(Q(r,25,"Percentage of Income Spent","start","#e5e7eb",14,"bold"));const L=s+10;e.appendChild(Q(r+y-200,L,"% of Income Spent","start","#f59e0b",12));const M=q("line");M.setAttribute("x1",r+y-220),M.setAttribute("y1",L-4),M.setAttribute("x2",r+y-210),M.setAttribute("y2",L-4),M.setAttribute("stroke","#f59e0b"),M.setAttribute("stroke-width",3),e.appendChild(M)}let F=jt();F.highlightedCategory=null;const ce=document.getElementById("app");ce.innerHTML=`
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
`;Dt(F,nt);Ht(F,et());Jt();mt();Nt(F,et());ut(F,nt);window.state=F;window.drawAll=mt;window.monthTotals=t=>N(F,t);function et(){return F.order[F.order.length-1]}function nt(){lt(F),Ht(F,et()),mt(),Nt(F,et()),ut(F,nt)}function Ht(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const a=N(t,i),o=t.months[i].income||0,r=P(t,o-a.aTotal),n=o>0?(o-a.aTotal)/o:0,s=a.bTotal>0?a.aTotal/a.bTotal:0,y=t.order.filter(C=>C.slice(0,4)===i.slice(0,4)&&C<=i).map(C=>(t.months[C].income||0)-N(t,C).aTotal).reduce((C,k)=>C+k,0);[{lab:"Monthly Savings (real SEK)",val:kt(r)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(s*100).toFixed(0)+" %"},{lab:"YTD Savings",val:kt(P(t,y))+" SEK"}].forEach(C=>{const k=document.createElement("div");k.className="kpi",k.innerHTML=`<div class="lab">${C.lab}</div><div class="val">${C.val}</div>`,k.onclick=()=>{F.highlightedCategory=C.lab,nt()},e.appendChild(k)})}function mt(){const t=document.getElementById("monthSel").value;Xt(F,t),_t(F,t),Zt(F,t),Qt(F,t),oe(F,t),ae(F,t),ee(F,t),ie(F,t),re(F,t),se(F,t)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}
