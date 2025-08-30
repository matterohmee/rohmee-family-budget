(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();const yt={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},vt={Housing:"F",Insurance:"F",Investments:"FS",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function xt(t,i=1){const e=[];let c=i,o=t;for(let s=0;s<12;s++)e.push(`${o}-${String(c).padStart(2,"0")}`),c++,c>12&&(c=1,o++);return e}function ut(t,i){if(t.months[i])Object.keys(B).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(B[e]).forEach(c=>{c in t.months[i].budget[e]||(t.months[i].budget[e][c]=B[e][c]),c in t.months[i].actual[e]||(t.months[i].actual[e][c]=B[e][c])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},c={};Object.keys(B).forEach(o=>{e[o]={},c[o]={},Object.keys(B[o]).forEach(s=>{e[o][s]=B[o][s],c[o][s]=B[o][s]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:c}}}const Kt="rohmee_budget_live",Ht=2,Rt=108e3;function Jt(){let t=localStorage.getItem(Kt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Vt(e),(!e.order||!e.order.length)&&(e.order=xt(2025,9)),e.order.forEach(c=>ut(e,c)),e.icons=e.icons||yt,e.tags=e.tags||vt,e.categories=e.categories||JSON.parse(JSON.stringify(B)),Object.assign(B,e.categories),e}catch{}const i={defaultIncome:Rt,target:25e4,cpi:1,order:xt(2025,9),months:{},icons:yt,tags:vt,selected:null,version:Ht,categories:JSON.parse(JSON.stringify(B))};return i.order.forEach(e=>ut(i,e)),mt(i),i}function mt(t){t.categories=JSON.parse(JSON.stringify(B)),localStorage.setItem(Kt,JSON.stringify(t))}function qt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Wt(t,i){const e=new FileReader;e.onload=()=>{try{const c=JSON.parse(e.result);Vt(c),c.categories&&(Object.keys(B).forEach(o=>delete B[o]),Object.assign(B,c.categories)),mt(c),i(c)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Vt(t){t.version<2&&(t.defaultIncome=t.income||Rt,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ht}function P(t,i){ut(t,i);const e=t.months[i],c=At(e.budget),o=At(e.actual);let s=0,n=0,r=0;return Object.keys(c).forEach(A=>{s+=c[A];const x=o[A]||0;(t.tags[A]||"V").includes("S")?r+=x:n+=x}),{bParents:c,aParents:o,bTotal:s,aTotal:n,aSavings:r}}function Ut(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function N(t,i){return i/(t.cpi||1)}function Xt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function At(t){let i={};return Object.keys(t).forEach(e=>i[e]=Xt(t[e])),i}function _t(t,i){const e=document.getElementById("controls"),c=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${C(t.months[c].income||0)}">
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
  `;const o=e.querySelector("#monthSel"),s=c.slice(5,7),n=c.slice(0,4),r=[];if(parseInt(s)>=9){for(let p=9;p<=12;p++){const g=`${n}-${p.toString().padStart(2,"0")}`;t.order.includes(g)&&r.push(g)}const h=(parseInt(n)+1).toString();for(let p=1;p<=8;p++){const g=`${h}-${p.toString().padStart(2,"0")}`;t.order.includes(g)&&r.push(g)}}else{const h=(parseInt(n)-1).toString();for(let p=9;p<=12;p++){const g=`${h}-${p.toString().padStart(2,"0")}`;t.order.includes(g)&&r.push(g)}for(let p=1;p<=8;p++){const g=`${n}-${p.toString().padStart(2,"0")}`;t.order.includes(g)&&r.push(g)}}t.order.forEach(h=>{r.includes(h)||r.push(h)}),r.forEach(h=>{const p=document.createElement("option");p.value=h,p.textContent=h,o.appendChild(p)}),o.value=c;const A=e.querySelector("#netIncome"),x=e.querySelector("#savTarget"),E=e.querySelector("#cpiFactor");function C(h){return Math.round(h).toLocaleString("sv-SE")}function L(h){return parseFloat(h.replace(/\s/g,"").replace(",","."))||0}o.addEventListener("change",h=>{A.value=C(t.months[o.value].income||0),x.value=C(t.target),E.value=t.cpi,i()}),A.addEventListener("input",h=>{const p=h.target.value.replace(/\s/g,""),g=L(p);isNaN(g)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[o.value].income=g,h.target.value=C(g),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),x.addEventListener("input",h=>{const p=h.target.value.replace(/\s/g,""),g=L(p);isNaN(g)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=g,h.target.value=C(g),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),E.addEventListener("input",h=>{const p=parseFloat(h.target.value);isNaN(p)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=p,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>qt(t)),e.querySelector("#loadJsonInput").addEventListener("change",h=>{const p=h.target.files[0];p&&Wt(p,g=>{Object.assign(t,g),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const h=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(b=>{const f=t.months[b];Object.keys(f.budget).forEach(S=>Object.keys(f.budget[S]).forEach(M=>{h.push([b,S,M,f.budget[S][M],f.actual[S][M]])}))});const p=h.map(b=>b.map(f=>`"${String(f).replace('"','""')}"`).join(",")).join(`
`),g=document.createElement("a");g.href=URL.createObjectURL(new Blob([p],{type:"text/csv"})),g.download="budget.csv",g.click(),setTimeout(()=>URL.revokeObjectURL(g.href),1e3)}),e.querySelector("#clearMonth").addEventListener("click",()=>{const h=o.value,p=t.months[h];confirm(`Clear all budget and actual amounts for ${h}?`)&&(Object.keys(p.budget).forEach(g=>{Object.keys(p.budget[g]).forEach(b=>{p.budget[g][b]=0})}),Object.keys(p.actual).forEach(g=>{Object.keys(p.actual[g]).forEach(b=>{p.actual[g][b]=0})}),i())}),e.querySelector("#copyBudget").addEventListener("click",()=>{const h=o.value,p=t.order.indexOf(h);if(p>0){const g=t.order[p-1],b=t.months[h],f=t.months[g];confirm(`Copy budget amounts from ${g} to ${h}?`)&&(Object.keys(f.budget).forEach(S=>{b.budget[S]||(b.budget[S]={}),Object.keys(f.budget[S]).forEach(M=>{b.budget[S][M]=f.budget[S][M]})}),i())}else alert("No previous month available to copy from.")})}let _={};function bt(t,i){const e=document.getElementById("monthSel").value,c=document.querySelector("#dataTable tbody");c.innerHTML="";const o=t.months[e];Object.keys(B).forEach(n=>{const r=wt(o.budget[n]||{}),A=wt(o.actual[n]||{}),x=document.createElement("tr");x.className="parent"+(A>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(x.style.backgroundColor="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const E=document.createElement("td"),C=document.createElement("span");C.textContent=_[n]?"▾":"▸",C.className="toggle",C.title="Collapse/expand",C.onclick=()=>{_[n]=!_[n],bt(t,i)};const L=document.createElement("span");L.className="icon",L.textContent=t.icons[n]||"",L.title="Click to set emoji",L.style.cursor="pointer",L.onclick=()=>{const d=prompt("Set emoji for "+n+":",t.icons[n]||"");d&&(t.icons[n]=d,i&&i())};const h=document.createElement("span");h.textContent=n,h.style.cursor="pointer",h.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},h.ondblclick=()=>{const d=prompt("Rename parent:",n);!d||B[d]||(B[d]=B[n],delete B[n],t.icons[d]=t.icons[n],delete t.icons[n],t.tags[d]=t.tags[n],delete t.tags[n],t.order.forEach(l=>{const a=t.months[l];a.budget[d]=a.budget[n],a.actual[d]=a.actual[n],delete a.budget[n],delete a.actual[n]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},x.onclick=d=>{d.target.closest(".rowtools")||d.target.closest(".toggle")||d.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(x.style.background="rgba(59, 130, 246, 0.2)",x.style.borderLeft="4px solid #3b82f6");const p=document.createElement("span");p.className="rowtools";const g=document.createElement("span");g.className="chip";const b=t.tags[n]||"V";b==="FS"?(g.textContent="Fixed+Savings",g.style.backgroundColor="#10b981",g.style.color="white"):b==="VS"?(g.textContent="Variable+Savings",g.style.backgroundColor="#10b981",g.style.color="white"):g.textContent=b==="F"?"Fixed":"Variable",g.title="Toggle Fixed/Variable/Savings",g.onclick=()=>{const d=t.tags[n]||"V";d==="F"?t.tags[n]="FS":d==="FS"?t.tags[n]="V":d==="V"?t.tags[n]="VS":d==="VS"&&(t.tags[n]="F"),i&&i()};const f=document.createElement("span");f.className="chip",f.textContent="+",f.title="Add subcategory",f.onclick=()=>{const d=prompt("New subcategory under "+n+":");d&&(B[n][d]=0,t.order.forEach(l=>{const a=t.months[l];a.budget[n][d]=0,a.actual[n][d]=0}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())};const S=document.createElement("span");S.className="chip",S.textContent="−",S.title="Delete parent",S.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(d=>{const l=t.months[d];delete l.budget[n],delete l.actual[n]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},p.appendChild(g),p.appendChild(f),p.appendChild(S),E.appendChild(C),E.appendChild(L),E.appendChild(h),E.appendChild(p),x.appendChild(E);const M=document.createElement("td");M.className="num",M.textContent=Z(N(t,r)),x.appendChild(M);const k=document.createElement("td");k.className="num",k.textContent=Z(N(t,A)),x.appendChild(k);const T=document.createElement("td");T.className="num",T.textContent=Z(N(t,r-A)),x.appendChild(T),c.appendChild(x),_[n]&&Object.keys(B[n]).forEach(d=>{const l=document.createElement("tr");(o.actual[n]||{})[d]>(o.budget[n]||{})[d]&&(l.className="over");const a=document.createElement("td"),u=document.createElement("span");u.textContent="• "+d,u.title="Double-click to rename",u.style.cursor="pointer",u.ondblclick=()=>{const I=prompt("Rename subcategory:",d);!I||B[n][I]||(B[n][I]=B[n][d],delete B[n][d],t.order.forEach($=>{const O=t.months[$];O.budget[n][I]=O.budget[n][d],O.actual[n][I]=O.actual[n][d],delete O.budget[n][d],delete O.actual[n][d]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},a.appendChild(u);const y=document.createElement("span");y.className="chip",y.textContent="−",y.title="Delete subcategory",y.style.marginLeft="8px",y.onclick=()=>{confirm("Delete "+d+"?")&&(delete B[n][d],t.order.forEach(I=>{const $=t.months[I];delete $.budget[n][d],delete $.actual[n][d]}),t.categories=JSON.parse(JSON.stringify(B)),i&&i())},a.appendChild(y),l.appendChild(a);const w=document.createElement("td");w.className="num",w.appendChild(St(t,e,n,d,"budget",(o.budget[n]||{})[d]||0,i)),l.appendChild(w);const m=document.createElement("td");m.className="num",m.appendChild(St(t,e,n,d,"actual",(o.actual[n]||{})[d]||0,i)),l.appendChild(m);const v=document.createElement("td");v.className="num",v.textContent=Z(N(t,((o.budget[n]||{})[d]||0)-((o.actual[n]||{})[d]||0))),l.appendChild(v),c.appendChild(l)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const A=t.months[r];A.budget[n]={},A.actual[n]={}}),document.getElementById("newParentName").value="",t.categories=JSON.parse(JSON.stringify(B)),i&&i()}}}function St(t,i,e,c,o,s,n){const r=document.createElement("input");r.type="number",r.value=s,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const A=x=>{const E=+r.value||0;t.months[i][o][e][c]=E,n&&n()};return r.addEventListener("keydown",x=>{x.key==="Enter"?(A(x.shiftKey?"up":"down"),x.preventDefault()):x.key==="Escape"&&(r.value=s,r.blur())}),r.addEventListener("blur",()=>A()),r}function wt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function Z(t){return Math.round(t).toLocaleString("sv-SE")}class Zt{constructor(i){this.state=i}generateInsights(i){const e=[],c=this.getRecentMonths(i,6);if(c.length<3)return e;const o=this.analyzeTrend(c);o&&e.push(o);const s=this.analyzeBudgetVariance(c);s&&e.push(s);const n=this.analyzeCategorySpending(c);e.push(...n);const r=this.analyzeSavingsRate(c);r&&e.push(r);const A=this.analyzeSeasonalPatterns(i);return A&&e.push(A),e.slice(0,8)}getRecentMonths(i,e){const c=parseInt(i.slice(0,4)),o=parseInt(i.slice(5,7)),s=[];for(let n=0;n<e;n++){let r=o-n,A=c;r<=0&&(r+=12,A-=1);const x=`${A}-${r.toString().padStart(2,"0")}`;this.state.months[x]&&s.unshift({key:x,data:P(this.state,x),income:this.state.months[x].income||0})}return s}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(o=>o.data.aTotal)),c=i.reduce((o,s)=>o+s.data.aTotal,0)/i.length;if(Math.abs(e)<c*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const o=e/c*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${o.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:o>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/c*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],c=e.data.aTotal-e.data.bTotal,o=c/e.data.bTotal*100;return Math.abs(o)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(o).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:c>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(c)} SEK (${o.toFixed(1)}%).`,impact:o>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(c))} SEK (${Math.abs(o).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],c=i[i.length-1];if(i.length>=2){const o=i[i.length-2];Object.keys(c.data.aParents).forEach(s=>{const n=c.data.aParents[s]||0,r=o.data.aParents[s]||0;if(r>0){const A=(n-r)/r*100;if(Math.abs(A)>20&&Math.abs(n-r)>1e3){const x=this.getCategoryIcon(s);A>0?e.push({type:"warning",category:"spending",title:`${s} Spending Increased`,message:`${s} spending increased by ${A.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:A>50?"high":"medium",icon:x,recommendation:`Review your ${s.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${s} Spending Decreased`,message:`Great! ${s} spending decreased by ${Math.abs(A).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:x})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],c=e.income>0?(e.income-e.data.aTotal+(e.data.aSavings||0))/e.income*100:0;return c<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${c.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:c>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${c.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${c.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,c=e*(e-1)/2,o=i.reduce((r,A)=>r+A,0),s=i.reduce((r,A,x)=>r+x*A,0),n=i.reduce((r,A,x)=>r+x*x,0);return(e*s-c*o)/(e*n-c*c)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],c=this.getRecentMonths(i,3);if(c.length===0)return e;const o=c[c.length-1],r=c.reduce((x,E)=>x+E.data.aTotal,0)/c.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(o.income>0?(o.income-o.data.aTotal+(o.data.aSavings||0))/o.income*100:0)>15){const x=(o.income-o.data.aTotal+(o.data.aSavings||0))*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(x)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function jt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const c=new Zt(t),o=c.generateInsights(i),s=c.generateRecommendations(i);if(e.innerHTML="",o.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");o.forEach((A,x)=>{const E=Qt(A);r.appendChild(E)})}if(s.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");s.forEach((A,x)=>{const E=te(A);r.appendChild(E)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,A)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},A*100)})})}function Qt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-4px)",e.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),e}function te(t,i){const e=document.createElement("div");e.className=`recommendation-card recommendation-${t.priority}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const c={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return e.innerHTML=`
    <div class="recommendation-header">
      <span class="recommendation-icon">${t.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${t.title}</h4>
        <span class="recommendation-priority" style="color: ${c[t.priority]}">
          ${t.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${t.message}</p>
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateX(8px)",e.style.borderLeftColor=c[t.priority]}),e.addEventListener("mouseleave",()=>{e.style.transform="translateX(0)",e.style.borderLeftColor="var(--panel-border)"}),e}function ee(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function U(t,i,e,c="start",o="#cbd5e1",s=12,n="normal"){const r=D("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",c),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Et(t,i,e,c){const o=t.querySelector("defs")||t.appendChild(D("defs")),s=D("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=D("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",c),s.appendChild(n),s.appendChild(r),o.appendChild(s),`url(#${i})`}function ne(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const c=i.slice(0,4),o=parseInt(i.slice(5,7)),s=[];if(o>=9){for(let $=9;$<=12;$++){const O=`${c}-${$.toString().padStart(2,"0")}`;s.push(O)}const I=(parseInt(c)+1).toString();for(let $=1;$<=8;$++){const O=`${I}-${$.toString().padStart(2,"0")}`;s.push(O)}}else{const I=(parseInt(c)-1).toString();for(let $=9;$<=12;$++){const O=`${I}-${$.toString().padStart(2,"0")}`;s.push(O)}for(let $=1;$<=8;$++){const O=`${c}-${$.toString().padStart(2,"0")}`;s.push(O)}}const n=t.order.indexOf(i),A=s.filter(I=>{const $=t.order.indexOf(I);return $>=0&&$<=n}).map(I=>{const $=t.months[I];if(!$)return 0;const O=$.income||0,H=P(t,I).aTotal||0;return Math.max(0,O-H)}).reduce((I,$)=>I+$,0),x=t.target||0,E=x>0?Math.min(1,A/x):0,C=Et(e,"gaugeProgress","#10b981","#059669"),L=Et(e,"gaugeBg","#1e293b","#0f172a"),h=U(380,150,`${Math.round(E*100)}%`,"middle","#10b981",80,"900");e.appendChild(h);const p=U(380,240,`${Ct(N(t,A))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(p);const g=U(380,290,`of ${Ct(N(t,x))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(g);const b=E>=1?"#10b981":E>=.8?"#f59e0b":"#ef4444",f=E>=1?"✓ Target Achieved":E>=.8?"⚡ On Track":"⚠ Behind Target",S=U(380,350,f,"middle",b,24,"600");e.appendChild(S);const M=500,k=30,T=380-M/2,d=380,l=D("rect");l.setAttribute("x",T),l.setAttribute("y",d),l.setAttribute("width",M),l.setAttribute("height",k),l.setAttribute("fill",L),l.setAttribute("rx",10),l.setAttribute("opacity","0.3"),e.appendChild(l);const a=D("rect");a.setAttribute("x",T),a.setAttribute("y",d),a.setAttribute("width",0),a.setAttribute("height",k),a.setAttribute("fill",C),a.setAttribute("rx",10),a.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),a.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(a),requestAnimationFrame(()=>{setTimeout(()=>{a.setAttribute("width",M*E)},100)}),["0%","25%","50%","75%","100%"].forEach((I,$)=>{const O=T+M*$/4,H=U(O,d+60,I,"middle","#64748b",30,"500");e.appendChild(H)});let y=0;const w=Math.round(E*100),m=w/60;function v(){y<w&&(y+=m,h.textContent=Math.round(Math.min(y,w))+"%",requestAnimationFrame(v))}setTimeout(v,200)}function Ct(t){return Math.round(t).toLocaleString("sv-SE")}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function z(t,i,e,c="start",o="#cbd5e1",s=12,n="normal"){const r=Y("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",c),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function $t(t,i,e,c){const o=t.querySelector("defs")||t.appendChild(Y("defs")),s=Y("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=Y("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=Y("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",c),s.appendChild(n),s.appendChild(r),o.appendChild(s),`url(#${i})`}function ie(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const c=P(t,i);let o=0,s=0;Object.keys(c.aParents).forEach(R=>{t.tags[R]==="F"?o+=c.aParents[R]||0:s+=c.aParents[R]||0});const n=o+s||1,r=Math.round(o/n*100),A=Math.round(s/n*100),x=$t(e,"fixedGrad","#8b5cf6","#7c3aed"),E=$t(e,"variableGrad","#06b6d4","#0891b2"),C=200,L=z(C,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(L);const h=z(C,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(h);const p=z(C,280,`${Tt(N(t,o))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(p);const g=560,b=z(g,150,"0%","middle","#06b6d4",60,"900");e.appendChild(b);const f=z(g,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(f);const S=z(g,280,`${Tt(N(t,s))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(S);const M=320,k=40,T=600,d=380-T/2,l=T*(o/n),a=Y("rect");a.setAttribute("x",d),a.setAttribute("y",M),a.setAttribute("width",0),a.setAttribute("height",k),a.setAttribute("fill",x),a.setAttribute("rx",15),a.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),a.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(a);const u=T*(s/n),y=Y("rect");y.setAttribute("x",d+l),y.setAttribute("y",M),y.setAttribute("width",0),y.setAttribute("height",k),y.setAttribute("fill",E),y.setAttribute("rx",15),y.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),y.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(y);const w=Y("rect");w.setAttribute("x",d),w.setAttribute("y",M),w.setAttribute("width",T),w.setAttribute("height",k),w.setAttribute("fill","#1e293b"),w.setAttribute("rx",15),w.setAttribute("opacity","0.3"),e.insertBefore(w,a),requestAnimationFrame(()=>{setTimeout(()=>{a.setAttribute("width",l)},200),setTimeout(()=>{y.setAttribute("x",d+l),y.setAttribute("width",u)},400)});const m=z(380,140,"VS","middle","#64748b",32,"600");e.appendChild(m);const v=Y("line");v.setAttribute("x1",380),v.setAttribute("y1",60),v.setAttribute("x2",380),v.setAttribute("y2",230),v.setAttribute("stroke","#374151"),v.setAttribute("stroke-width",2),v.setAttribute("opacity","0.5"),e.appendChild(v);let I=0,$=0;const O=r/50,H=A/50;function K(){(I<r||$<A)&&(I<r&&(I+=O,L.textContent=Math.round(Math.min(I,r))+"%"),$<A&&($+=H,b.textContent=Math.round(Math.min($,A))+"%"),requestAnimationFrame(K))}setTimeout(K,300),a.style.cursor="pointer",y.style.cursor="pointer",a.addEventListener("mouseenter",()=>{a.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),a.addEventListener("mouseleave",()=>{a.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),y.addEventListener("mouseenter",()=>{y.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),y.addEventListener("mouseleave",()=>{y.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function Tt(t){return Math.round(t).toLocaleString("sv-SE")}class se{constructor(){this.tooltip=null,this.createTooltip()}createTooltip(){const i=document.getElementById("chart-tooltip");i&&i.remove(),this.tooltip=document.createElement("div"),this.tooltip.id="chart-tooltip",this.tooltip.style.cssText=`
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
    `,document.body.appendChild(this.tooltip)}show(i,e){this.tooltip||this.createTooltip(),this.tooltip.textContent=i,this.tooltip.style.opacity="1";const c=e.pageX+10,o=e.pageY-10,s=this.tooltip.getBoundingClientRect(),n=window.innerWidth;let r=c,A=o;c+s.width>n&&(r=e.pageX-s.width-10),o<0&&(A=e.pageY+20),this.tooltip.style.left=r+"px",this.tooltip.style.top=A+"px"}hide(){this.tooltip&&(this.tooltip.style.opacity="0")}}const at=new se;function J(t,i){t.addEventListener("mouseenter",e=>{at.show(i,e)}),t.addEventListener("mousemove",e=>{at.show(i,e)}),t.addEventListener("mouseleave",()=>{at.hide()})}const ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),It=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function re(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const c=600,o=250,s=50,n=20,r=20,A=40,x=c-s-n,E=o-r-A,C=i.slice(0,4),L=parseInt(i.slice(5,7)),h=[];if(L>=9){for(let v=9;v<=12;v++){const I=`${C}-${v.toString().padStart(2,"0")}`;h.push(I)}const m=(parseInt(C)+1).toString();for(let v=1;v<=8;v++){const I=`${m}-${v.toString().padStart(2,"0")}`;h.push(I)}}else{const m=(parseInt(C)-1).toString();for(let v=9;v<=12;v++){const I=`${m}-${v.toString().padStart(2,"0")}`;h.push(I)}for(let v=1;v<=8;v++){const I=`${C}-${v.toString().padStart(2,"0")}`;h.push(I)}}const p=t.order.indexOf(i),b=h.filter(m=>{const v=t.order.indexOf(m);return v>=0&&v<=p}).map(m=>{const v=t.months[m];if(!v)return 0;const I=v.income||0,$=P(t,m).aTotal||0;return Math.max(0,I-$)}).reduce((m,v)=>m+v,0),f=h.filter(m=>{const v=t.order.indexOf(m);return v<0||v>p}).length,S=t.target||0,M=Math.max(0,S-b),k=f>0?M/f:0,T=S/12,d=[];h.forEach(m=>{const v=t.order.indexOf(m);if(v>=0&&v<=p){const I=t.months[m],$=I&&I.income||0,O=I?P(t,m).aTotal:0,H=Math.max(0,$-O);d.push({m,v:H,t:"actual"})}else d.push({m,v:k,t:"required"})});const l=Math.max(T,...d.map(m=>m.v),1),a=x/h.length*.65;d.forEach((m,v)=>{const I=m.v/l*E,$=s+v*(x/h.length)+(x/h.length-a)/2,O=r+E-I;let H;m.t==="actual"?H=m.v>=T?"#10b981":"#ef4444":H="#f59e0b";const K=ht("rect");K.setAttribute("x",$),K.setAttribute("y",O),K.setAttribute("width",a),K.setAttribute("height",I),K.setAttribute("fill",H),K.style.cursor="pointer";const R=m.t==="actual"?`${m.m}: ${Q(N(t,m.v))} SEK saved (${m.v>=T?"Above":"Below"} target)`:`${m.m}: ${Q(N(t,m.v))} SEK required to hit target`;J(K,R),e.appendChild(K),e.appendChild(It($+a/2,o-12,m.m.slice(5),"middle","#9aa3b2",12))});const u=r+E-T/l*E,y=ht("line");y.setAttribute("x1",s),y.setAttribute("x2",s+x),y.setAttribute("y1",u),y.setAttribute("y2",u),y.setAttribute("stroke","#93c5fd"),y.setAttribute("stroke-dasharray","5,5"),e.appendChild(y),e.appendChild(It(s+x-6,u-6,"Monthly target "+Q(N(t,T)),"end","#cfe4ff",16));const w=document.getElementById("glidePill");w&&(M<=0?(w.textContent="On track ✔",w.classList.add("ok")):(w.textContent="From now: need "+Q(N(t,k))+" SEK / month",w.classList.remove("ok")))}function Q(t){return Math.round(t).toLocaleString("sv-SE")}const pt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=pt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function oe(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const c=760,o=320,s=110,n=20,r=20,A=40,x=c-s-n,E=o-r-A,C=P(t,i),L=t.months[i].income||0,h=[{lab:"Income",val:L,c:"#60a5fa"},{lab:"Budget",val:C.bTotal,c:"#3b82f6"},{lab:"Actual",val:C.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,L-C.aTotal),c:"#34d399"}],p=Math.max(...h.map(f=>f.val),1),g=E/h.length*.55;h.forEach((f,S)=>{const M=r+S*(E/h.length)+(E/h.length-g)/2,k=f.val/p*x,T=pt("rect");T.setAttribute("x",s),T.setAttribute("y",M),T.setAttribute("width",k),T.setAttribute("height",g),T.setAttribute("fill",f.c),e.appendChild(T),e.appendChild(Mt(s-10,M+g/2+4,f.lab,"end","#cbd5e1",16)),e.appendChild(Mt(s+k+6,M+g/2+4,ae(N(t,f.val)),"start","#cbd5e1",16))});const b=pt("line");b.setAttribute("x1",s),b.setAttribute("x2",s),b.setAttribute("y1",r),b.setAttribute("y2",r+E),b.setAttribute("stroke","#243049"),e.appendChild(b)}function ae(t){return Math.round(t).toLocaleString("sv-SE")}const gt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),kt=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=gt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function ce(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const c=1200,o=700,s=280,n=40,r=30,A=60,x=c-s-n,E=o-r-A,C=P(t,i),L=Object.keys(B).filter(f=>!(t.tags[f]||"V").includes("S")).map(f=>({p:f,v:C.aParents[f]||0})).sort((f,S)=>S.v-f.v),h=L.reduce((f,S)=>f+S.v,0)||1,p=L.length,g=E/p*.75;L.forEach((f,S)=>{const M=r+S*(E/p)+(E/p-g)/2,k=f.v/h*x,T=t.highlightedCategory===f.p,d=t.highlightedCategory&&t.highlightedCategory!==null,l=T?"#f59e0b":"#3b82f6",a=d&&!T?.3:1,u=gt("rect");u.setAttribute("x",s),u.setAttribute("y",M),u.setAttribute("width",k),u.setAttribute("height",g),u.setAttribute("fill",l),u.setAttribute("opacity",a),u.style.cursor="pointer";const y=`${f.p}: ${(f.v/h*100).toFixed(1)}% (${Lt(N(t,f.v))} SEK)`;J(u,y),T&&u.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(u);const w=d&&!T?.5:1,m=(t.icons[f.p]||"")+" "+f.p,v=kt(s-16,M+g/2+6,m,"end","#cbd5e1",15);v.setAttribute("opacity",w),e.appendChild(v);const I=Math.min(s+k+12,c-n-250),$=kt(I,M+g/2+6,(f.v/h*100).toFixed(1)+"%  ·  "+Lt(N(t,f.v))+" SEK","start","#cbd5e1",14);$.setAttribute("opacity",w),e.appendChild($)});const b=gt("line");b.setAttribute("x1",s),b.setAttribute("x2",s),b.setAttribute("y1",r),b.setAttribute("y2",r+E),b.setAttribute("stroke","#243049"),e.appendChild(b)}function Lt(t){return Math.round(t).toLocaleString("sv-SE")}const st=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Bt=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=st("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function de(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const c=1200,o=460,s=260,n=40,r=20,A=60,x=c-s-n,E=o-r-A,C=P(t,i),L=Object.keys(B).filter(S=>!(t.tags[S]||"V").includes("S")).map(S=>({p:S,b:C.bParents[S]||0,a:C.aParents[S]||0})).sort((S,M)=>M.a-S.a),h=L.length,p=E/h,g=p*.35,b=Math.max(...L.map(S=>Math.max(S.a,S.b)),1);L.forEach((S,M)=>{const k=r+M*p+p/2,T=S.b/b*x,d=S.a/b*x,l=t.highlightedCategory===S.p,a=t.highlightedCategory&&t.highlightedCategory!==null,u=l?"#f59e0b":"#3b82f6",y=l?"#f97316":"#10b981",w=a&&!l?.3:1,m=a&&!l?.5:1,v=st("rect");v.setAttribute("x",s),v.setAttribute("y",k-g-3),v.setAttribute("width",T),v.setAttribute("height",g),v.setAttribute("fill",u),v.setAttribute("opacity",w),v.style.cursor="pointer";const I=`${S.p} Budget: ${tt(N(t,S.b))} SEK`;J(v,I),l&&v.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(v);const $=st("rect");$.setAttribute("x",s),$.setAttribute("y",k+3),$.setAttribute("width",d),$.setAttribute("height",g),$.setAttribute("fill",y),$.setAttribute("opacity",w),$.style.cursor="pointer";const O=`${S.p} Actual: ${tt(N(t,S.a))} SEK`;J($,O),l&&$.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild($);const H=(t.icons[S.p]||"")+" "+S.p,K=Bt(s-14,k+4,H,"end","#cbd5e1",14);K.setAttribute("opacity",m),e.appendChild(K);const R=Math.max(T,d),j=Math.min(s+R+10,c-n-200),q=Bt(j,k+4,"B "+tt(N(t,S.b))+"  A "+tt(N(t,S.a)),"start","#cbd5e1",12);q.setAttribute("opacity",m),e.appendChild(q)});const f=st("line");f.setAttribute("x1",s),f.setAttribute("x2",s),f.setAttribute("y1",r),f.setAttribute("y2",r+E),f.setAttribute("stroke","#243049"),e.appendChild(f)}function tt(t){return Math.round(t).toLocaleString("sv-SE")}const Yt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),et=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=Yt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n},Ot=t=>t.toLocaleString();function le(t,i){const e=document.getElementById("savingsBars");for(;e.firstChild;)e.removeChild(e.firstChild);const c=1200,o=300,s=280,n=40,r=30,A=60,x=c-s-n,E=o-r-A,C=P(t,i),L=Object.keys(B).filter(b=>(t.tags[b]||"V").includes("S")).map(b=>({p:b,v:C.aParents[b]||0})).sort((b,f)=>f.v-b.v);if(L.length===0){const b=et(c/2,o/2,'No savings categories yet. Tag categories as "Savings" to see them here.',"middle","#64748b",16);e.appendChild(b);return}const h=L.reduce((b,f)=>b+f.v,0)||1,p=L.length,g=E/p*.75;L.forEach((b,f)=>{const S=r+f*(E/p)+(E/p-g)/2,M=b.v/h*x,k=t.highlightedCategory===b.p,T=t.highlightedCategory&&t.highlightedCategory!==null,d=k?"#f59e0b":"#10b981",l=T&&!k?.3:1,a=Yt("rect");a.setAttribute("x",s),a.setAttribute("y",S),a.setAttribute("width",M),a.setAttribute("height",g),a.setAttribute("fill",d),a.setAttribute("opacity",l),a.style.cursor="pointer",a.onclick=()=>{t.highlightedCategory=t.highlightedCategory===b.p?null:b.p,window.drawAll&&window.drawAll()};const u=h>0?(b.v/h*100).toFixed(1):"0.0";J(a,`${b.p}: ${u}% (${Ot(b.v)} SEK saved)`),e.appendChild(a);const y=t.icons[b.p]||"💰",w=et(s-30,S+g/2+5,y,"middle","#cbd5e1",20);e.appendChild(w);const m=et(s-50,S+g/2+5,b.p,"end","#cbd5e1",14);e.appendChild(m);const v=et(s+M+10,S+g/2-5,`${u}% · ${Ot(b.v)} SEK`,"start","#cbd5e1",12);e.appendChild(v)})}const zt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Nt=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=zt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function ue(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const c=1200,o=440,s=260,n=40,r=20,A=40,x=c-s-n,E=o-r-A,C=i.slice(0,4),L=parseInt(i.slice(5,7)),h=[];if(L>=9){for(let a=9;a<=12;a++){const u=`${C}-${a.toString().padStart(2,"0")}`;h.push(u)}const l=(parseInt(C)+1).toString();for(let a=1;a<=8;a++){const u=`${l}-${a.toString().padStart(2,"0")}`;h.push(u)}}else{const l=(parseInt(C)-1).toString();for(let a=9;a<=12;a++){const u=`${l}-${a.toString().padStart(2,"0")}`;h.push(u)}for(let a=1;a<=8;a++){const u=`${C}-${a.toString().padStart(2,"0")}`;h.push(u)}}const p=Object.keys(B),g=h.length,b=[],f=[];p.forEach(l=>{const a=[];h.forEach(u=>{const y=P(t,u),w=y.bParents[l]||0,m=y.aParents[l]||0,v=w?(m-w)/w:0;a.push({p:l,b:w,a:m,v,m:u}),f.push(v)}),b.push(a)});const S=Math.min(...f),M=Math.max(...f),k=x/g,T=E/p.length;function d(l){const a=l<=0?150:0,u=l<=0?S===0?1:-S:M===0?1:M,w=30+30*Math.min(1,Math.abs(l)/u||0);return`hsl(${a},70%,${w}%)`}b.forEach((l,a)=>{l.forEach((y,w)=>{const m=zt("rect");m.setAttribute("x",s+w*k),m.setAttribute("y",r+a*T),m.setAttribute("width",k-2),m.setAttribute("height",T-2),m.setAttribute("fill",d(y.v)),t.highlightedCategory&&y.p===t.highlightedCategory&&(m.setAttribute("stroke","#3b82f6"),m.setAttribute("stroke-width","3")),m.addEventListener("mouseenter",v=>{const I=document.getElementById("tooltip"),$=y.a-y.b,O=$>=0?"+":"";I.innerHTML=`<div><b>${y.p}</b> · <span class='t'>${y.m}</span></div>
                        <div>Budget: <b>${ct(N(t,y.b))}</b> SEK</div>
                        <div>Actual: <b>${ct(N(t,y.a))}</b> SEK</div>
                        <div>Variance: <b>${O+ct(N(t,$))}</b> (${y.b?($/y.b*100).toFixed(1):"0.0"}%)</div>`,I.style.left=v.clientX+12+"px",I.style.top=v.clientY+12+"px",I.style.display="block"}),m.addEventListener("mousemove",v=>{const I=document.getElementById("tooltip");I.style.left=v.clientX+12+"px",I.style.top=v.clientY+12+"px"}),m.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(m)});const u=(t.icons[p[a]]||"")+" "+p[a];e.appendChild(Nt(s-14,r+a*T+T/2+4,u,"end",t.highlightedCategory===p[a]?"#ffffff":"#cbd5e1",18))}),h.forEach((l,a)=>e.appendChild(Nt(s+a*k+k/2,o-12,l.slice(5),"middle","#9aa3b2",16)))}function ct(t){return Math.round(t).toLocaleString("sv-SE")}const X=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,c="start",o="#cbd5e1",s=12)=>{const n=X("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",c),n.setAttribute("fill",o),n.setAttribute("font-size",s),n.textContent=e,n};function he(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const c=Ut(t,i);if(!c){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const o=1200,s=420,n=80,r=40,A=30,x=60,E=o-n-r,C=s-A-x,L=P(t,i),h=P(t,c),p=h.aTotal,g=L.aTotal,b=Object.keys(B).map(w=>({p:w,icon:t.icons[w]||"",delta:(L.aParents[w]||0)-(h.aParents[w]||0)})).sort((w,m)=>Math.abs(m.delta)-Math.abs(w.delta)),f=b.slice(0,Math.min(10,b.length)),S=b.slice(f.length).reduce((w,m)=>w+m.delta,0);Math.abs(S)>.5&&f.push({p:"Others",icon:"",delta:S});const M=E/(f.length+3),k=A+C;let T=n+M;function d(w){const m=Math.max(p,g,Math.max(...f.map(v=>Math.abs(v.delta)))+Math.max(p,g));return A+C-w/m*C}const l=X("rect");l.setAttribute("x",T-24),l.setAttribute("y",d(p)),l.setAttribute("width",48),l.setAttribute("height",k-d(p)),l.setAttribute("fill","#64748b"),e.appendChild(l),e.appendChild(G(T,s-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(T,d(p)-6,dt(N(t,p)),"middle","#cbd5e1",16));let a=p;T+=M,f.forEach(w=>{const m=w.delta,v=m>=0,I=d(a),$=d(a+m),O=Math.min(I,$),H=Math.abs($-I);let K=v?"#ef4444":"#10b981",R=1;t.highlightedCategory&&(w.p===t.highlightedCategory?(K=v?"#dc2626":"#059669",R=1):R=.3);const j=X("rect");j.setAttribute("x",T-24),j.setAttribute("y",O),j.setAttribute("width",48),j.setAttribute("height",H),j.setAttribute("fill",K),j.setAttribute("opacity",R),e.appendChild(j);const q=(w.icon?w.icon+" ":"")+w.p;e.appendChild(G(T,s-18,q.length>14?q.slice(0,14)+"…":q,"middle",t.highlightedCategory===w.p?"#ffffff":"#9aa3b2",16));const Dt=(v?"+":"")+dt(N(t,m));e.appendChild(G(T,O-6,Dt,"middle",t.highlightedCategory===w.p?"#ffffff":"#cbd5e1",16)),a+=m,T+=M});const u=X("rect");u.setAttribute("x",T-24),u.setAttribute("y",d(g)),u.setAttribute("width",48),u.setAttribute("height",k-d(g)),u.setAttribute("fill","#64748b"),e.appendChild(u),e.appendChild(G(T,s-18,"End","middle","#9aa3b2",16)),e.appendChild(G(T,d(g)-6,dt(N(t,g)),"middle","#cbd5e1",16));const y=X("line");y.setAttribute("x1",n*.6),y.setAttribute("x2",o-r),y.setAttribute("y1",k),y.setAttribute("y2",k),y.setAttribute("stroke","#243049"),e.appendChild(y)}function dt(t){return Math.round(t).toLocaleString("sv-SE")}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function nt(t,i,e,c="start",o="#cbd5e1",s=12,n="normal"){const r=V("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",c),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Ft(t,i,e,c){const o=t.querySelector("defs")||t.appendChild(V("defs")),s=V("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","0%"),s.setAttribute("y2","100%");const n=V("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=V("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",c),s.appendChild(n),s.appendChild(r),o.appendChild(s),`url(#${i})`}function pe(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const c=1200,o=400,s={top:40,right:60,bottom:60,left:80},n=c-s.left-s.right,r=o-s.top-s.bottom,A=i.slice(0,4),x=parseInt(i.slice(5,7)),E=[];if(x>=9){for(let a=9;a<=12;a++){const u=`${A}-${a.toString().padStart(2,"0")}`;E.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}const l=(parseInt(A)+1).toString();for(let a=1;a<=8;a++){const u=`${l}-${a.toString().padStart(2,"0")}`;E.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}}else{const l=(parseInt(A)-1).toString();for(let a=9;a<=12;a++){const u=`${l}-${a.toString().padStart(2,"0")}`;E.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}for(let a=1;a<=8;a++){const u=`${A}-${a.toString().padStart(2,"0")}`;E.push({key:u,label:u.slice(5,7),data:t.months[u]?P(t,u):{aTotal:0,bTotal:0}})}}if(E.length===0)return;const C=Math.max(...E.map(l=>l.data.aTotal),1),L=n/(E.length-1),h=r/C,p=Ft(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),g=Ft(e,"trendLine","#3b82f6","#1d4ed8"),b=V("rect");b.setAttribute("x",s.left),b.setAttribute("y",s.top),b.setAttribute("width",n),b.setAttribute("height",r),b.setAttribute("fill","rgba(15, 23, 42, 0.5)"),b.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),b.setAttribute("rx",8),e.appendChild(b);for(let l=0;l<=5;l++){const a=s.top+r/5*l,u=V("line");u.setAttribute("x1",s.left),u.setAttribute("y1",a),u.setAttribute("x2",s.left+n),u.setAttribute("y2",a),u.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),u.setAttribute("stroke-width",1),u.setAttribute("stroke-dasharray","2,2"),e.appendChild(u);const y=C-C/5*l,w=nt(s.left-10,a+4,lt(y),"end","#94a3b8",14);e.appendChild(w)}let f=`M ${s.left} ${s.top+r}`,S="M";E.forEach((l,a)=>{const u=s.left+a*L,y=s.top+r-l.data.aTotal*h;a===0?(S+=` ${u} ${y}`,f+=` L ${u} ${y}`):(S+=` L ${u} ${y}`,f+=` L ${u} ${y}`)}),f+=` L ${s.left+(E.length-1)*L} ${s.top+r} Z`;const M=V("path");M.setAttribute("d",f),M.setAttribute("fill",p),M.setAttribute("opacity","0"),e.appendChild(M);const k=V("path");k.setAttribute("d",S),k.setAttribute("fill","none"),k.setAttribute("stroke",g),k.setAttribute("stroke-width",3),k.setAttribute("stroke-linecap","round"),k.setAttribute("stroke-linejoin","round"),k.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),k.style.strokeDasharray=k.getTotalLength(),k.style.strokeDashoffset=k.getTotalLength(),e.appendChild(k),E.forEach((l,a)=>{const u=s.left+a*L,y=s.top+r-l.data.aTotal*h,w=V("circle");w.setAttribute("cx",u),w.setAttribute("cy",y),w.setAttribute("r",6),w.setAttribute("fill","rgba(15, 23, 42, 0.9)"),w.setAttribute("stroke","#3b82f6"),w.setAttribute("stroke-width",2),w.setAttribute("opacity","0"),e.appendChild(w);const m=V("circle");m.setAttribute("cx",u),m.setAttribute("cy",y),m.setAttribute("r",4),m.setAttribute("fill","#3b82f6"),m.setAttribute("opacity","0"),m.style.cursor="pointer",e.appendChild(m);const v=nt(u,s.top+r+20,l.label,"middle","#94a3b8",14);e.appendChild(v);const I=`Month ${l.label}: ${lt(l.data.aTotal)} SEK spent (Budget: ${lt(l.data.bTotal)} SEK)`;J(m,I)}),requestAnimationFrame(()=>{setTimeout(()=>{M.style.transition="opacity 1s ease-out",M.setAttribute("opacity","1")},200),setTimeout(()=>{k.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",k.style.strokeDashoffset="0"},400),setTimeout(()=>{E.forEach((l,a)=>{setTimeout(()=>{const u=e.querySelectorAll("circle"),y=a*2+2;u[y]&&(u[y].style.transition="opacity 0.3s ease-out",u[y].setAttribute("opacity","1")),u[y+1]&&(u[y+1].style.transition="opacity 0.3s ease-out",u[y+1].setAttribute("opacity","1"))},a*100)})},1e3)});const T=nt(c/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(T);const d=nt(20,o/2,"Spending (SEK)","middle","#94a3b8",12,"500");d.setAttribute("transform",`rotate(-90, 20, ${o/2})`),e.appendChild(d)}function lt(t){return Math.round(t).toLocaleString("sv-SE")}function W(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function it(t,i,e,c="start",o="#cbd5e1",s=12,n="normal"){const r=W("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",c),r.setAttribute("fill",o),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function ge(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const c=1200,o=400,s=60,n=20,r=40,A=60,x=c-s-n,E=o-r-A,C=i.slice(0,4),L=parseInt(i.slice(5,7)),h=[];if(L>=9){for(let l=9;l<=12;l++){const a=`${C}-${l.toString().padStart(2,"0")}`;h.push(a)}const d=(parseInt(C)+1).toString();for(let l=1;l<=8;l++){const a=`${d}-${l.toString().padStart(2,"0")}`;h.push(a)}}else{const d=(parseInt(C)-1).toString();for(let l=9;l<=12;l++){const a=`${d}-${l.toString().padStart(2,"0")}`;h.push(a)}for(let l=1;l<=8;l++){const a=`${C}-${l.toString().padStart(2,"0")}`;h.push(a)}}if(h.length===0)return;const p=h.map(d=>{const l=t.months[d];if(!l||!l.income)return{month:d,percentage:0};const a=l.income||0,u=Object.keys(l.actual||{}).reduce((w,m)=>w+Object.values(l.actual[m]||{}).reduce((v,I)=>v+(I||0),0),0),y=a>0?u/a*100:0;return{month:d,percentage:y}}),g=Math.max(...p.map(d=>d.percentage)),b=Math.max(100,Math.ceil(g/50)*50),f=d=>s+d/(h.length-1)*x,S=d=>r+E-d/b*E,M=W("rect");M.setAttribute("width",c),M.setAttribute("height",o),M.setAttribute("fill","transparent"),e.appendChild(M);for(let d=0;d<=5;d++){const l=r+d/5*E,a=W("line");a.setAttribute("x1",s),a.setAttribute("y1",l),a.setAttribute("x2",s+x),a.setAttribute("y2",l),a.setAttribute("stroke","#374151"),a.setAttribute("stroke-width",.5),e.appendChild(a);const u=(b-d/5*b).toFixed(0)+"%";e.appendChild(it(s-10,l+4,u,"end","#9ca3af",11))}if(h.forEach((d,l)=>{const a=f(l),u=d.slice(5,7);e.appendChild(it(a,o-A+20,u,"middle","#9ca3af",11))}),p.length>1){const d=W("path");let l=`M ${f(0)} ${S(p[0].percentage)}`;for(let a=1;a<p.length;a++)l+=` L ${f(a)} ${S(p[a].percentage)}`;d.setAttribute("d",l),d.setAttribute("stroke","#f59e0b"),d.setAttribute("stroke-width",3),d.setAttribute("fill","none"),d.setAttribute("stroke-linecap","round"),d.setAttribute("stroke-linejoin","round"),e.appendChild(d)}p.forEach((d,l)=>{const a=W("circle");a.setAttribute("cx",f(l)),a.setAttribute("cy",S(d.percentage)),a.setAttribute("r",4),a.setAttribute("fill","#f59e0b"),a.setAttribute("stroke","#1f2937"),a.setAttribute("stroke-width",2),a.style.cursor="pointer";const u=`${d.month}: ${d.percentage.toFixed(1)}% of income spent`;J(a,u),e.appendChild(a)}),e.appendChild(it(s,25,"Percentage of Income Spent","start","#e5e7eb",14,"bold"));const k=r+10;e.appendChild(it(s+x-200,k,"% of Income Spent","start","#f59e0b",12));const T=W("line");T.setAttribute("x1",s+x-220),T.setAttribute("y1",k-4),T.setAttribute("x2",s+x-210),T.setAttribute("y2",k-4),T.setAttribute("stroke","#f59e0b"),T.setAttribute("stroke-width",3),e.appendChild(T)}let F=Jt();F.highlightedCategory=null;const me=document.getElementById("app");me.innerHTML=`
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
    <div class="legend"><span><i class="sw" style="background:#fbbf24"></i>Current Month: Share of Total Expenses (by category)</span></div>
    <svg id="shareBars" class="chart tall" viewBox="0 0 1200 700" aria-label="Share of expenses by category"></svg>
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
    <svg id="baParents" class="chart" viewBox="0 0 1200 460" aria-label="Budget vs Actual per expense category"></svg>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#10b981"></i>Current Month: Savings Categories</span></div>
    <svg id="savingsBars" class="chart" viewBox="0 0 1200 300" aria-label="Savings by category"></svg>
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
`;_t(F,ot);Gt(F,rt());ee();ft();jt(F,rt());bt(F,ot);window.state=F;window.drawAll=ft;window.monthTotals=t=>P(F,t);function rt(){return F.order[F.order.length-1]}function ot(){mt(F),Gt(F,rt()),ft(),jt(F,rt()),bt(F,ot)}function Gt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const c=P(t,i),o=t.months[i].income||0,s=N(t,o-c.aTotal+(c.aSavings||0)),n=o>0?(o-c.aTotal+(c.aSavings||0))/o:0,r=c.bTotal>0?c.aTotal/c.bTotal:0,x=t.order.filter(C=>C.slice(0,4)===i.slice(0,4)&&C<=i).map(C=>{const L=P(t,C);return(t.months[C].income||0)-L.aTotal+(L.aSavings||0)}).reduce((C,L)=>C+L,0);[{lab:"Monthly Savings (real SEK)",val:Pt(s)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Pt(N(t,x))+" SEK"}].forEach(C=>{const L=document.createElement("div");L.className="kpi",L.innerHTML=`<div class="lab">${C.lab}</div><div class="val">${C.val}</div>`,L.onclick=()=>{F.highlightedCategory=C.lab,ot()},e.appendChild(L)})}function ft(){const t=document.getElementById("monthSel").value;ne(F,t),ie(F,t),re(F,t),oe(F,t),pe(F,t),ge(F,t),ce(F,t),de(F,t),le(F,t),ue(F,t),he(F,t)}function Pt(t){return Math.round(t).toLocaleString("sv-SE")}
