(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const ht={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},pt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function gt(t){const s=[];for(let e=1;e<=12;e++)s.push(`${t}-${String(e).padStart(2,"0")}`);return s}function at(t,s){if(t.months[s])Object.keys(B).forEach(e=>{t.months[s].budget[e]||(t.months[s].budget[e]={},t.months[s].actual[e]={}),Object.keys(B[e]).forEach(o=>{t.months[s].budget[e][o]===void 0&&(t.months[s].budget[e][o]=B[e][o]),t.months[s].actual[e][o]===void 0&&(t.months[s].actual[e][o]=B[e][o])})}),t.months[s].income===void 0&&(t.months[s].income=t.defaultIncome||0);else{let e={},o={};Object.keys(B).forEach(a=>{e[a]={},o[a]={},Object.keys(B[a]).forEach(i=>{e[a][i]=B[a][i],o[a][i]=B[a][i]})}),t.months[s]={income:t.defaultIncome||0,budget:e,actual:o}}}const Bt="rohmee_budget_live",Ft=2,Ot=108e3;function zt(){let t=localStorage.getItem(Bt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Pt(e),(!e.order||!e.order.length)&&(e.order=gt(2025)),e.order.forEach(o=>at(e,o)),e.icons=e.icons||ht,e.tags=e.tags||pt,e}catch{}const s={defaultIncome:Ot,target:25e4,cpi:1,order:gt(2025),months:{},icons:ht,tags:pt,selected:null,version:Ft};return s.order.forEach(e=>at(s,e)),["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07"].forEach(e=>{const o=s.months[e];Object.keys(o.actual).forEach(a=>Object.keys(o.actual[a]).forEach(i=>{const n=o.budget[a][i],r=Math.random()*.2-.05;o.actual[a][i]=Math.max(0,Math.round(n*(1+r)))}))}),lt(s),s}function lt(t){localStorage.setItem(Bt,JSON.stringify(t))}function jt(t){const s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(s),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Gt(t,s){const e=new FileReader;e.onload=()=>{try{const o=JSON.parse(e.result);Pt(o),lt(o),s(o)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Pt(t){t.version<2&&(t.defaultIncome=t.income||Ot,delete t.income,t.order&&t.order.forEach(s=>{const e=t.months[s];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ft}function N(t,s){at(t,s);const e=t.months[s],o=bt(e.budget),a=bt(e.actual);let i=0,n=0;return Object.keys(o).forEach(r=>{i+=o[r],n+=a[r]||0}),{bParents:o,aParents:a,bTotal:i,aTotal:n}}function Kt(t,s){const e=t.order.indexOf(s);return e>0?t.order[e-1]:null}function O(t,s){return s/(t.cpi||1)}function Yt(t){let s=0;return Object.keys(t).forEach(e=>s+=+t[e]||0),s}function bt(t){let s={};return Object.keys(t).forEach(e=>s[e]=Yt(t[e])),s}function Dt(t,s){const e=document.getElementById("controls"),o=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${v(t.months[o].income||0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${v(t.target)}">
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
      <div class="help" style="color:var(--muted)">Tip: double‑click names to rename; +/− to add/remove; click parent to highlight; ▸ to collapse/expand; F/V to toggle fixed vs variable.</div>
    </div>
  `;const a=e.querySelector("#monthSel");t.order.forEach(m=>{const g=document.createElement("option");g.value=m,g.textContent=m,a.appendChild(g)}),a.value=o;const i=e.querySelector("#netIncome"),n=e.querySelector("#savTarget"),r=e.querySelector("#cpiFactor");function v(m){return Math.round(m).toLocaleString("sv-SE")}function b(m){return parseFloat(m.replace(/\s/g,"").replace(",","."))||0}a.addEventListener("change",m=>{i.value=v(t.months[a.value].income||0),n.value=v(t.target),r.value=t.cpi,s()}),i.addEventListener("input",m=>{const g=m.target.value.replace(/\s/g,""),f=b(g);isNaN(f)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[a.value].income=f,m.target.value=v(f),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),s()}),n.addEventListener("input",m=>{const g=m.target.value.replace(/\s/g,""),f=b(g);isNaN(f)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=f,m.target.value=v(f),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),s()}),r.addEventListener("input",m=>{const g=parseFloat(m.target.value);isNaN(g)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=g,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),s()}),e.querySelector("#saveJSON").addEventListener("click",()=>jt(t)),e.querySelector("#loadJsonInput").addEventListener("change",m=>{const g=m.target.files[0];g&&Gt(g,f=>{Object.assign(t,f),s()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const m=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach($=>{const C=t.months[$];Object.keys(C.budget).forEach(w=>Object.keys(C.budget[w]).forEach(x=>{m.push([$,w,x,C.budget[w][x],C.actual[w][x]])}))});const g=m.map($=>$.map(C=>`"${String(C).replace('"','""')}"`).join(",")).join(`
`),f=document.createElement("a");f.href=URL.createObjectURL(new Blob([g],{type:"text/csv"})),f.download="budget.csv",f.click(),setTimeout(()=>URL.revokeObjectURL(f.href),1e3)})}let J={};function ut(t,s){const e=document.getElementById("monthSel").value,o=document.querySelector("#dataTable tbody");o.innerHTML="";const a=t.months[e];Object.keys(B).forEach(n=>{const r=vt(a.budget[n]||{}),v=vt(a.actual[n]||{}),b=document.createElement("tr");b.className="parent"+(v>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(b.style.backgroundColor="rgba(59, 130, 246, 0.2)",b.style.borderLeft="4px solid #3b82f6");const m=document.createElement("td"),g=document.createElement("span");g.textContent=J[n]?"▾":"▸",g.className="toggle",g.title="Collapse/expand",g.onclick=()=>{J[n]=!J[n],ut(t,s)};const f=document.createElement("span");f.className="icon",f.textContent=t.icons[n]||"",f.title="Click to set emoji",f.style.cursor="pointer",f.onclick=()=>{const d=prompt("Set emoji for "+n+":",t.icons[n]||"");d&&(t.icons[n]=d,s&&s())};const $=document.createElement("span");$.textContent=n,$.style.cursor="pointer",$.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,s&&s()},$.ondblclick=()=>{const d=prompt("Rename parent:",n);!d||B[d]||(B[d]=B[n],delete B[n],t.icons[d]=t.icons[n],delete t.icons[n],t.tags[d]=t.tags[n],delete t.tags[n],t.order.forEach(M=>{const c=t.months[M];c.budget[d]=c.budget[n],c.actual[d]=c.actual[n],delete c.budget[n],delete c.actual[n]}),s&&s())},b.onclick=d=>{d.target.closest(".rowtools")||d.target.closest(".toggle")||d.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,s&&s())},t.highlightedCategory===n&&(b.style.background="rgba(59, 130, 246, 0.2)",b.style.borderLeft="4px solid #3b82f6");const C=document.createElement("span");C.className="rowtools";const w=document.createElement("span");w.className="chip",w.textContent=t.tags[n]==="F"?"Fixed":"Variable",w.title="Toggle Fixed/Variable",w.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",s&&s()};const x=document.createElement("span");x.className="chip",x.textContent="+",x.title="Add subcategory",x.onclick=()=>{const d=prompt("New subcategory under "+n+":");d&&(B[n][d]=0,t.order.forEach(M=>{const c=t.months[M];c.budget[n][d]=0,c.actual[n][d]=0}),s&&s())};const A=document.createElement("span");A.className="chip",A.textContent="−",A.title="Delete parent",A.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(d=>{const M=t.months[d];delete M.budget[n],delete M.actual[n]}),s&&s())},C.appendChild(w),C.appendChild(x),C.appendChild(A),m.appendChild(g),m.appendChild(f),m.appendChild($),m.appendChild(C),b.appendChild(m);const S=document.createElement("td");S.className="num",S.textContent=X(O(t,r)),b.appendChild(S);const T=document.createElement("td");T.className="num",T.textContent=X(O(t,v)),b.appendChild(T);const E=document.createElement("td");E.className="num",E.textContent=X(O(t,r-v)),b.appendChild(E),o.appendChild(b),J[n]&&Object.keys(B[n]).forEach(d=>{const M=document.createElement("tr");(a.actual[n]||{})[d]>(a.budget[n]||{})[d]&&(M.className="over");const c=document.createElement("td"),u=document.createElement("span");u.textContent="• "+d,u.title="Double-click to rename",u.style.cursor="text",u.ondblclick=()=>{const I=prompt("Rename subcategory:",d);I&&(B[n][I]=B[n][d],delete B[n][d],t.order.forEach(k=>{const L=t.months[k];L.budget[n][I]=L.budget[n][d],L.actual[n][I]=L.actual[n][d],delete L.budget[n][d],delete L.actual[n][d]}),s&&s())},c.appendChild(u);const h=document.createElement("span");h.className="chip",h.textContent="−",h.title="Delete subcategory",h.style.marginLeft="8px",h.onclick=()=>{confirm("Delete "+d+"?")&&(delete B[n][d],t.order.forEach(I=>{const k=t.months[I];delete k.budget[n][d],delete k.actual[n][d]}),s&&s())},c.appendChild(h),M.appendChild(c);const l=document.createElement("td");l.className="num",l.appendChild(ft(t,e,n,d,"budget",(a.budget[n]||{})[d]||0,s)),M.appendChild(l);const p=document.createElement("td");p.className="num",p.appendChild(ft(t,e,n,d,"actual",(a.actual[n]||{})[d]||0,s)),M.appendChild(p);const y=document.createElement("td");y.className="num",y.textContent=X(O(t,((a.budget[n]||{})[d]||0)-((a.actual[n]||{})[d]||0))),M.appendChild(y),o.appendChild(M)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const v=t.months[r];v.budget[n]={},v.actual[n]={}}),document.getElementById("newParentName").value="",s&&s()}}}function ft(t,s,e,o,a,i,n){const r=document.createElement("input");r.type="number",r.value=i,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const v=b=>{const m=+r.value||0;t.months[s][a][e][o]=m,n&&n()};return r.addEventListener("keydown",b=>{b.key==="Enter"?(v(b.shiftKey?"up":"down"),b.preventDefault()):b.key==="Escape"&&(r.value=i,r.blur())}),r.addEventListener("blur",()=>v()),r}function vt(t){let s=0;return Object.keys(t).forEach(e=>s+=+t[e]||0),s}function X(t){return Math.round(t).toLocaleString("sv-SE")}class qt{constructor(s){this.state=s}generateInsights(s){const e=[],o=this.getRecentMonths(s,6);if(o.length<3)return e;const a=this.analyzeTrend(o);a&&e.push(a);const i=this.analyzeBudgetVariance(o);i&&e.push(i);const n=this.analyzeCategorySpending(o);e.push(...n);const r=this.analyzeSavingsRate(o);r&&e.push(r);const v=this.analyzeSeasonalPatterns(s);return v&&e.push(v),e.slice(0,8)}getRecentMonths(s,e){const o=parseInt(s.slice(0,4)),a=parseInt(s.slice(5,7)),i=[];for(let n=0;n<e;n++){let r=a-n,v=o;r<=0&&(r+=12,v-=1);const b=`${v}-${r.toString().padStart(2,"0")}`;this.state.months[b]&&i.unshift({key:b,data:N(this.state,b),income:this.state.months[b].income||0})}return i}analyzeTrend(s){if(s.length<3)return null;const e=this.calculateTrend(s.map(a=>a.data.aTotal)),o=s.reduce((a,i)=>a+i.data.aTotal,0)/s.length;if(Math.abs(e)<o*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const a=e/o*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/o*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(s){const e=s[s.length-1],o=e.data.aTotal-e.data.bTotal,a=o/e.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:o>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(o)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(o))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(s){const e=[],o=s[s.length-1];if(s.length>=2){const a=s[s.length-2];Object.keys(o.data.aParents).forEach(i=>{const n=o.data.aParents[i]||0,r=a.data.aParents[i]||0;if(r>0){const v=(n-r)/r*100;if(Math.abs(v)>20&&Math.abs(n-r)>1e3){const b=this.getCategoryIcon(i);v>0?e.push({type:"warning",category:"spending",title:`${i} Spending Increased`,message:`${i} spending increased by ${v.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:v>50?"high":"medium",icon:b,recommendation:`Review your ${i.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${i} Spending Decreased`,message:`Great! ${i} spending decreased by ${Math.abs(v).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:b})}}})}return e.slice(0,3)}analyzeSavingsRate(s){const e=s[s.length-1],o=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return o<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${o.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:o>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${o.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${o.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(s){const e=parseInt(s.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(s){const e=s.length,o=e*(e-1)/2,a=s.reduce((r,v)=>r+v,0),i=s.reduce((r,v,b)=>r+b*v,0),n=s.reduce((r,v,b)=>r+b*b,0);return(e*i-o*a)/(e*n-o*o)}getCategoryIcon(s){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[s]||"📊"}fmt(s){return Math.round(s).toLocaleString("sv-SE")}generateRecommendations(s){const e=[],o=this.getRecentMonths(s,3);if(o.length===0)return e;const a=o[o.length-1],r=o.reduce((b,m)=>b+m.data.aTotal,0)/o.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const b=(a.income-a.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(b)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Nt(t,s){const e=document.getElementById("insightsPanel");if(!e)return;const o=new qt(t),a=o.generateInsights(s),i=o.generateRecommendations(s);if(e.innerHTML="",a.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");a.forEach((v,b)=>{const m=Wt(v);r.appendChild(m)})}if(i.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");i.forEach((v,b)=>{const m=Ut(v);r.appendChild(m)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,v)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},v*100)})})}function Wt(t,s){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
    <div class="insight-header">
      <div class="insight-icon-wrapper">
        <span class="insight-emoji">${t.icon}</span>
      </div>
      <div class="insight-meta">
        <h4 class="insight-title">${t.title}</h4>
        ${a.text?`<span class="insight-badge" style="color: ${a.color}">${a.text}</span>`:""}
      </div>
    </div>
    <p class="insight-message">${t.message}</p>
    ${t.recommendation?`
      <div class="insight-recommendation">
        <span class="recommendation-label">💡 Recommendation:</span>
        <p>${t.recommendation}</p>
      </div>
    `:""}
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-4px)",e.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),e}function Ut(t,s){const e=document.createElement("div");e.className=`recommendation-card recommendation-${t.priority}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return e.innerHTML=`
    <div class="recommendation-header">
      <span class="recommendation-icon">${t.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${t.title}</h4>
        <span class="recommendation-priority" style="color: ${o[t.priority]}">
          ${t.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${t.message}</p>
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateX(8px)",e.style.borderLeftColor=o[t.priority]}),e.addEventListener("mouseleave",()=>{e.style.transform="translateX(0)",e.style.borderLeftColor="var(--panel-border)"}),e}function Jt(){const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function q(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=Y("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function yt(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(Y("defs")),i=Y("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","100%"),i.setAttribute("y2","100%");const n=Y("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=Y("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function Xt(t,s){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=s.slice(0,4),i=t.order.filter(p=>p.slice(0,4)===o&&p<=s).map(p=>Math.max(0,(t.months[p].income||0)-N(t,p).aTotal)).reduce((p,y)=>p+y,0),n=t.target||0,r=n>0?Math.min(1,i/n):0,v=yt(e,"gaugeProgress","#10b981","#059669"),b=yt(e,"gaugeBg","#1e293b","#0f172a"),m=q(380,150,`${Math.round(r*100)}%`,"middle","#10b981",80,"900");e.appendChild(m);const g=q(380,240,`${xt(O(t,i))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(g);const f=q(380,290,`of ${xt(O(t,n))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(f);const $=r>=1?"#10b981":r>=.8?"#f59e0b":"#ef4444",C=r>=1?"✓ Target Achieved":r>=.8?"⚡ On Track":"⚠ Behind Target",w=q(380,350,C,"middle",$,24,"600");e.appendChild(w);const x=500,A=30,S=380-x/2,T=380,E=Y("rect");E.setAttribute("x",S),E.setAttribute("y",T),E.setAttribute("width",x),E.setAttribute("height",A),E.setAttribute("fill",b),E.setAttribute("rx",10),E.setAttribute("opacity","0.3"),e.appendChild(E);const d=Y("rect");d.setAttribute("x",S),d.setAttribute("y",T),d.setAttribute("width",0),d.setAttribute("height",A),d.setAttribute("fill",v),d.setAttribute("rx",10),d.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),d.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(d),requestAnimationFrame(()=>{setTimeout(()=>{d.setAttribute("width",x*r)},100)}),["0%","25%","50%","75%","100%"].forEach((p,y)=>{const I=S+x*y/4,k=q(I,T+60,p,"middle","#64748b",30,"500");e.appendChild(k)});let c=0;const u=Math.round(r*100),h=u/60;function l(){c<u&&(c+=h,m.textContent=Math.round(Math.min(c,u))+"%",requestAnimationFrame(l))}setTimeout(l,200)}function xt(t){return Math.round(t).toLocaleString("sv-SE")}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function G(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=V("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function At(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(V("defs")),i=V("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","100%"),i.setAttribute("y2","100%");const n=V("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=V("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function _t(t,s){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const o=N(t,s);let a=0,i=0;Object.keys(o.aParents).forEach(z=>{t.tags[z]==="F"?a+=o.aParents[z]||0:i+=o.aParents[z]||0});const n=a+i||1,r=Math.round(a/n*100),v=Math.round(i/n*100),b=At(e,"fixedGrad","#8b5cf6","#7c3aed"),m=At(e,"variableGrad","#06b6d4","#0891b2"),g=200,f=G(g,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(f);const $=G(g,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild($);const C=G(g,280,`${Et(O(t,a))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(C);const w=560,x=G(w,150,"0%","middle","#06b6d4",60,"900");e.appendChild(x);const A=G(w,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(A);const S=G(w,280,`${Et(O(t,i))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(S);const T=320,E=40,d=600,M=380-d/2,c=d*(a/n),u=V("rect");u.setAttribute("x",M),u.setAttribute("y",T),u.setAttribute("width",0),u.setAttribute("height",E),u.setAttribute("fill",b),u.setAttribute("rx",15),u.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),u.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(u);const h=d*(i/n),l=V("rect");l.setAttribute("x",M+c),l.setAttribute("y",T),l.setAttribute("width",0),l.setAttribute("height",E),l.setAttribute("fill",m),l.setAttribute("rx",15),l.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),l.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l);const p=V("rect");p.setAttribute("x",M),p.setAttribute("y",T),p.setAttribute("width",d),p.setAttribute("height",E),p.setAttribute("fill","#1e293b"),p.setAttribute("rx",15),p.setAttribute("opacity","0.3"),e.insertBefore(p,u),requestAnimationFrame(()=>{setTimeout(()=>{u.setAttribute("width",c)},200),setTimeout(()=>{l.setAttribute("x",M+c),l.setAttribute("width",h)},400)});const y=G(380,140,"VS","middle","#64748b",32,"600");e.appendChild(y);const I=V("line");I.setAttribute("x1",380),I.setAttribute("y1",60),I.setAttribute("x2",380),I.setAttribute("y2",230),I.setAttribute("stroke","#374151"),I.setAttribute("stroke-width",2),I.setAttribute("opacity","0.5"),e.appendChild(I);let k=0,L=0;const P=r/50,nt=v/50;function D(){(k<r||L<v)&&(k<r&&(k+=P,f.textContent=Math.round(Math.min(k,r))+"%"),L<v&&(L+=nt,x.textContent=Math.round(Math.min(L,v))+"%"),requestAnimationFrame(D))}setTimeout(D,300),u.style.cursor="pointer",l.style.cursor="pointer",u.addEventListener("mouseenter",()=>{u.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),u.addEventListener("mouseleave",()=>{u.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),l.addEventListener("mouseenter",()=>{l.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),l.addEventListener("mouseleave",()=>{l.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function Et(t){return Math.round(t).toLocaleString("sv-SE")}const ot=t=>document.createElementNS("http://www.w3.org/2000/svg",t),wt=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=ot("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function Zt(t,s){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const o=600,a=250,i=50,n=20,r=20,v=40,b=o-i-n,m=a-r-v,g=s.slice(0,4),f=t.order.filter(l=>l.slice(0,4)===g),$=t.order.indexOf(s),C=t.order.filter(l=>l.slice(0,4)===g&&t.order.indexOf(l)<=$),w=C.map(l=>Math.max(0,(t.months[l].income||0)-N(t,l).aTotal)).reduce((l,p)=>l+p,0),x=12-C.length,A=Math.max(0,(t.target||0)-w),S=x>0?A/x:0,T=(t.target||0)/12,E=[];f.forEach(l=>{t.order.indexOf(l)<=$?E.push({m:l,v:Math.max(0,(t.months[l].income||0)-N(t,l).aTotal),t:"a"}):E.push({m:l,v:S,t:"r"})});const d=Math.max(T,...E.map(l=>l.v),1),M=b/f.length*.65;E.forEach((l,p)=>{const y=l.v/d*m,I=i+p*(b/f.length)+(b/f.length-M)/2,k=r+m-y,L=l.t==="a"?l.v>=T?"#10b981":"#ef4444":"#f59e0b",P=ot("rect");P.setAttribute("x",I),P.setAttribute("y",k),P.setAttribute("width",M),P.setAttribute("height",y),P.setAttribute("fill",L),e.appendChild(P),e.appendChild(wt(I+M/2,a-12,l.m.slice(5),"middle","#9aa3b2",12))});const c=r+m-T/d*m,u=ot("line");u.setAttribute("x1",i),u.setAttribute("x2",i+b),u.setAttribute("y1",c),u.setAttribute("y2",c),u.setAttribute("stroke","#93c5fd"),u.setAttribute("stroke-dasharray","5,5"),e.appendChild(u),e.appendChild(wt(i+b-6,c-6,"Monthly target "+Ct(O(t,T)),"end","#cfe4ff",16));const h=document.getElementById("glidePill");h&&(A<=0?(h.textContent="On track ✔",h.classList.add("ok")):(h.textContent="From now: need "+Ct(O(t,S))+" SEK / month",h.classList.remove("ok")))}function Ct(t){return Math.round(t).toLocaleString("sv-SE")}const ct=t=>document.createElementNS("http://www.w3.org/2000/svg",t),St=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=ct("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function Qt(t,s){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const o=760,a=320,i=110,n=20,r=20,v=40,b=o-i-n,m=a-r-v,g=N(t,s),f=t.months[s].income||0,$=[{lab:"Income",val:f,c:"#60a5fa"},{lab:"Budget",val:g.bTotal,c:"#3b82f6"},{lab:"Actual",val:g.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,f-g.aTotal),c:"#34d399"}],C=Math.max(...$.map(A=>A.val),1),w=m/$.length*.55;$.forEach((A,S)=>{const T=r+S*(m/$.length)+(m/$.length-w)/2,E=A.val/C*b,d=ct("rect");d.setAttribute("x",i),d.setAttribute("y",T),d.setAttribute("width",E),d.setAttribute("height",w),d.setAttribute("fill",A.c),e.appendChild(d),e.appendChild(St(i-10,T+w/2+4,A.lab,"end","#cbd5e1",16)),e.appendChild(St(i+E+6,T+w/2+4,te(O(t,A.val)),"start","#cbd5e1",16))});const x=ct("line");x.setAttribute("x1",i),x.setAttribute("x2",i),x.setAttribute("y1",r),x.setAttribute("y2",r+m),x.setAttribute("stroke","#243049"),e.appendChild(x)}function te(t){return Math.round(t).toLocaleString("sv-SE")}const dt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=dt("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function ee(t,s){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=700,i=280,n=40,r=30,v=60,b=o-i-n,m=a-r-v,g=N(t,s),f=Object.keys(B).map(A=>({p:A,v:g.aParents[A]||0})).sort((A,S)=>S.v-A.v),$=f.reduce((A,S)=>A+S.v,0)||1,C=f.length,w=m/C*.75;f.forEach((A,S)=>{const T=r+S*(m/C)+(m/C-w)/2,E=A.v/$*b,d=t.highlightedCategory===A.p,M=d?"#f59e0b":"#3b82f6",c=t.highlightedCategory&&!d?.3:1,u=dt("rect");u.setAttribute("x",i),u.setAttribute("y",T),u.setAttribute("width",E),u.setAttribute("height",w),u.setAttribute("fill",M),u.setAttribute("opacity",c),d&&u.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(u);const h=t.highlightedCategory&&!d?.5:1,l=(t.icons[A.p]||"")+" "+A.p,p=Tt(i-16,T+w/2+6,l,"end","#cbd5e1",15);p.setAttribute("opacity",h),e.appendChild(p);const y=Tt(i+E+12,T+w/2+6,(A.v/$*100).toFixed(1)+"%  ·  "+ne(O(t,A.v))+" SEK","start","#cbd5e1",14);y.setAttribute("opacity",h),e.appendChild(y)});const x=dt("line");x.setAttribute("x1",i),x.setAttribute("x2",i),x.setAttribute("y1",r),x.setAttribute("y2",r+m),x.setAttribute("stroke","#243049"),e.appendChild(x)}function ne(t){return Math.round(t).toLocaleString("sv-SE")}const Q=t=>document.createElementNS("http://www.w3.org/2000/svg",t),It=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=Q("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function ie(t,s){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=460,i=260,n=40,r=20,v=60,b=o-i-n,m=a-r-v,g=N(t,s),f=Object.keys(B).map(S=>({p:S,b:g.bParents[S]||0,a:g.aParents[S]||0})).sort((S,T)=>T.a-S.a),$=f.length,C=m/$,w=C*.35,x=Math.max(...f.map(S=>Math.max(S.a,S.b)),1);f.forEach((S,T)=>{const E=r+T*C+C/2,d=S.b/x*b,M=S.a/x*b,c=t.highlightedCategory===S.p,u=c?"#f59e0b":"#3b82f6",h=c?"#f97316":"#10b981",l=t.highlightedCategory&&!c?.3:1,p=t.highlightedCategory&&!c?.5:1,y=Q("rect");y.setAttribute("x",i),y.setAttribute("y",E-w-3),y.setAttribute("width",d),y.setAttribute("height",w),y.setAttribute("fill",u),y.setAttribute("opacity",l),c&&y.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(y);const I=Q("rect");I.setAttribute("x",i),I.setAttribute("y",E+3),I.setAttribute("width",M),I.setAttribute("height",w),I.setAttribute("fill",h),I.setAttribute("opacity",l),c&&I.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(I);const k=(t.icons[S.p]||"")+" "+S.p,L=It(i-14,E+4,k,"end","#cbd5e1",14);L.setAttribute("opacity",p),e.appendChild(L);const P=It(i+Math.max(d,M)+10,E+4,"B "+Mt(O(t,S.b))+"  A "+Mt(O(t,S.a)),"start","#cbd5e1",12);P.setAttribute("opacity",p),e.appendChild(P)});const A=Q("line");A.setAttribute("x1",i),A.setAttribute("x2",i),A.setAttribute("y1",r),A.setAttribute("y2",r+m),A.setAttribute("stroke","#243049"),e.appendChild(A)}function Mt(t){return Math.round(t).toLocaleString("sv-SE")}const Ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),$t=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=Ht("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function se(t,s){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=440,i=260,n=40,r=20,v=40,b=o-i-n,m=a-r-v,g=s.slice(0,4),$=t.order.filter(c=>c.slice(0,4)===g||c.slice(0,4)===(parseInt(g)+1).toString()).filter(c=>{const u=parseInt(c.slice(5,7)),h=c.slice(0,4);return h===g&&u>=9||h===(parseInt(g)+1).toString()&&u<=8}).slice(0,12),C=Object.keys(B),w=$.length,x=[],A=[];C.forEach(c=>{const u=[];$.forEach(h=>{const l=N(t,h),p=l.bParents[c]||0,y=l.aParents[c]||0,I=p?(y-p)/p:0;u.push({p:c,b:p,a:y,v:I,m:h}),A.push(I)}),x.push(u)});const S=Math.min(...A,0),T=Math.max(...A,0),E=b/w,d=m/C.length;function M(c){const u=c<=0?150:0,l=30+30*Math.min(1,Math.abs(c)/(c<=0?-S:T)||0);return`hsl(${u},70%,${l}%)`}x.forEach((c,u)=>{c.forEach((l,p)=>{const y=Ht("rect");y.setAttribute("x",i+p*E),y.setAttribute("y",r+u*d),y.setAttribute("width",E-2),y.setAttribute("height",d-2),y.setAttribute("fill",M(l.v)),t.highlightedCategory&&l.p===t.highlightedCategory&&(y.setAttribute("stroke","#3b82f6"),y.setAttribute("stroke-width","3")),y.addEventListener("mouseenter",I=>{const k=document.getElementById("tooltip"),L=l.a-l.b,P=L>=0?"+":"";k.innerHTML=`<div><b>${l.p}</b> · <span class='t'>${l.m}</span></div>
                        <div>Budget: <b>${st(O(t,l.b))}</b> SEK</div>
                        <div>Actual: <b>${st(O(t,l.a))}</b> SEK</div>
                        <div>Variance: <b>${P+st(O(t,L))}</b> (${l.b?(L/l.b*100).toFixed(1):"0.0"}%)</div>`,k.style.left=I.clientX+12+"px",k.style.top=I.clientY+12+"px",k.style.display="block"}),y.addEventListener("mousemove",I=>{const k=document.getElementById("tooltip");k.style.left=I.clientX+12+"px",k.style.top=I.clientY+12+"px"}),y.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(y)});const h=(t.icons[C[u]]||"")+" "+C[u];e.appendChild($t(i-14,r+u*d+d/2+4,h,"end",t.highlightedCategory===C[u]?"#ffffff":"#cbd5e1",18))}),$.forEach((c,u)=>e.appendChild($t(i+u*E+E/2,a-12,c.slice(5),"middle","#9aa3b2",16)))}function st(t){return Math.round(t).toLocaleString("sv-SE")}const U=t=>document.createElementNS("http://www.w3.org/2000/svg",t),K=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=U("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function re(t,s){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=Kt(t,s);if(!o){e.appendChild(K(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const a=1200,i=420,n=80,r=40,v=30,b=60,m=a-n-r,g=i-v-b,f=N(t,s),$=N(t,o),C=$.aTotal,w=f.aTotal,x=Object.keys(B).map(p=>({p,icon:t.icons[p]||"",delta:(f.aParents[p]||0)-($.aParents[p]||0)})).sort((p,y)=>Math.abs(y.delta)-Math.abs(p.delta)),A=x.slice(0,Math.min(10,x.length)),S=x.slice(A.length).reduce((p,y)=>p+y.delta,0);Math.abs(S)>.5&&A.push({p:"Others",icon:"",delta:S});const T=m/(A.length+3),E=v+g;let d=n+T;function M(p){const y=Math.max(C,w,Math.max(...A.map(I=>Math.abs(I.delta)))+Math.max(C,w));return v+g-p/y*g}const c=U("rect");c.setAttribute("x",d-24),c.setAttribute("y",M(C)),c.setAttribute("width",48),c.setAttribute("height",E-M(C)),c.setAttribute("fill","#64748b"),e.appendChild(c),e.appendChild(K(d,i-18,"Start","middle","#9aa3b2",16)),e.appendChild(K(d,M(C)-6,rt(O(t,C)),"middle","#cbd5e1",16));let u=C;d+=T,A.forEach(p=>{const y=p.delta,I=y>=0,k=M(u),L=M(u+y),P=Math.min(k,L),nt=Math.abs(L-k);let D=I?"#ef4444":"#10b981",z=1;t.highlightedCategory&&(p.p===t.highlightedCategory?(D=I?"#dc2626":"#059669",z=1):z=.3);const j=U("rect");j.setAttribute("x",d-24),j.setAttribute("y",P),j.setAttribute("width",48),j.setAttribute("height",nt),j.setAttribute("fill",D),j.setAttribute("opacity",z),e.appendChild(j);const it=(p.icon?p.icon+" ":"")+p.p;e.appendChild(K(d,i-18,it.length>14?it.slice(0,14)+"…":it,"middle",t.highlightedCategory===p.p?"#ffffff":"#9aa3b2",16));const Vt=(I?"+":"")+rt(O(t,y));e.appendChild(K(d,P-6,Vt,"middle",t.highlightedCategory===p.p?"#ffffff":"#cbd5e1",16)),u+=y,d+=T});const h=U("rect");h.setAttribute("x",d-24),h.setAttribute("y",M(w)),h.setAttribute("width",48),h.setAttribute("height",E-M(w)),h.setAttribute("fill","#64748b"),e.appendChild(h),e.appendChild(K(d,i-18,"End","middle","#9aa3b2",16)),e.appendChild(K(d,M(w)-6,rt(O(t,w)),"middle","#cbd5e1",16));const l=U("line");l.setAttribute("x1",n*.6),l.setAttribute("x2",a-r),l.setAttribute("y1",E),l.setAttribute("y2",E),l.setAttribute("stroke","#243049"),e.appendChild(l)}function rt(t){return Math.round(t).toLocaleString("sv-SE")}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function _(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=H("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function kt(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(H("defs")),i=H("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","0%"),i.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=H("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function ae(t,s){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,i={top:40,right:60,bottom:60,left:80},n=o-i.left-i.right,r=a-i.top-i.bottom,v=s.slice(0,4),b=parseInt(s.slice(5,7)),m=[];for(let c=11;c>=0;c--){let u=b-c,h=parseInt(v);u<=0&&(u+=12,h-=1);const l=`${h}-${u.toString().padStart(2,"0")}`;t.months[l]&&m.push({key:l,label:l.slice(5,7),data:N(t,l)})}if(m.length===0)return;const g=Math.max(...m.map(c=>c.data.aTotal)),f=n/(m.length-1),$=r/g,C=kt(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),w=kt(e,"trendLine","#3b82f6","#1d4ed8"),x=H("rect");x.setAttribute("x",i.left),x.setAttribute("y",i.top),x.setAttribute("width",n),x.setAttribute("height",r),x.setAttribute("fill","rgba(15, 23, 42, 0.5)"),x.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),x.setAttribute("rx",8),e.appendChild(x);for(let c=0;c<=5;c++){const u=i.top+r/5*c,h=H("line");h.setAttribute("x1",i.left),h.setAttribute("y1",u),h.setAttribute("x2",i.left+n),h.setAttribute("y2",u),h.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),h.setAttribute("stroke-width",1),h.setAttribute("stroke-dasharray","2,2"),e.appendChild(h);const l=g-g/5*c,p=_(i.left-10,u+4,Z(l),"end","#94a3b8",14);e.appendChild(p)}let A=`M ${i.left} ${i.top+r}`,S="M";m.forEach((c,u)=>{const h=i.left+u*f,l=i.top+r-c.data.aTotal*$;u===0?(S+=` ${h} ${l}`,A+=` L ${h} ${l}`):(S+=` L ${h} ${l}`,A+=` L ${h} ${l}`)}),A+=` L ${i.left+(m.length-1)*f} ${i.top+r} Z`;const T=H("path");T.setAttribute("d",A),T.setAttribute("fill",C),T.setAttribute("opacity","0"),e.appendChild(T);const E=H("path");E.setAttribute("d",S),E.setAttribute("fill","none"),E.setAttribute("stroke",w),E.setAttribute("stroke-width",3),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round"),E.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),E.style.strokeDasharray=E.getTotalLength(),E.style.strokeDashoffset=E.getTotalLength(),e.appendChild(E),m.forEach((c,u)=>{const h=i.left+u*f,l=i.top+r-c.data.aTotal*$,p=H("circle");p.setAttribute("cx",h),p.setAttribute("cy",l),p.setAttribute("r",6),p.setAttribute("fill","rgba(15, 23, 42, 0.9)"),p.setAttribute("stroke","#3b82f6"),p.setAttribute("stroke-width",2),p.setAttribute("opacity","0"),e.appendChild(p);const y=H("circle");y.setAttribute("cx",h),y.setAttribute("cy",l),y.setAttribute("r",4),y.setAttribute("fill","#3b82f6"),y.setAttribute("opacity","0"),y.style.cursor="pointer",e.appendChild(y);const I=_(h,i.top+r+20,c.label,"middle","#94a3b8",14);e.appendChild(I),y.addEventListener("mouseenter",()=>{y.setAttribute("r",6),y.setAttribute("fill","#1d4ed8"),p.setAttribute("opacity","1");const k=document.getElementById("tooltip");k&&(k.style.display="block",k.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${c.label}</div>
          <div>Total Spending: ${Z(c.data.aTotal)} SEK</div>
          <div>Budget: ${Z(c.data.bTotal)} SEK</div>
          <div>Variance: ${Z(c.data.aTotal-c.data.bTotal)} SEK</div>
        `)}),y.addEventListener("mouseleave",()=>{y.setAttribute("r",4),y.setAttribute("fill","#3b82f6"),p.setAttribute("opacity","0");const k=document.getElementById("tooltip");k&&(k.style.display="none")}),y.addEventListener("mousemove",k=>{const L=document.getElementById("tooltip");L&&(L.style.left=k.pageX+10+"px",L.style.top=k.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{T.style.transition="opacity 1s ease-out",T.setAttribute("opacity","1")},200),setTimeout(()=>{E.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",E.style.strokeDashoffset="0"},400),setTimeout(()=>{m.forEach((c,u)=>{setTimeout(()=>{const h=e.querySelectorAll("circle"),l=u*2+2;h[l]&&(h[l].style.transition="opacity 0.3s ease-out",h[l].setAttribute("opacity","1")),h[l+1]&&(h[l+1].style.transition="opacity 0.3s ease-out",h[l+1].setAttribute("opacity","1"))},u*100)})},1e3)});const d=_(o/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(d);const M=_(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");M.setAttribute("transform",`rotate(-90, 20, ${a/2})`),e.appendChild(M)}function Z(t){return Math.round(t).toLocaleString("sv-SE")}function R(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=R("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function oe(t,s){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,i=60,n=20,r=40,v=60,b=o-i-n,m=a-r-v,g=t.order;if(g.length===0)return;const f=g.map(c=>{const u=t.months[c].income||0,h=N(t,c).aTotal;return{month:c,income:u,expenses:h}}),$=Math.max(...f.map(c=>Math.max(c.income,c.expenses))),C=Math.min(0,...f.map(c=>Math.min(c.income,c.expenses))),w=c=>r+m-(c-C)/($-C)*m,x=c=>i+c/(g.length-1)*b,A=w(0);e.appendChild(R("line")).setAttributes({x1:i,y1:A,x2:i+b,y2:A,stroke:"#374151","stroke-width":1}),e.appendChild(R("line")).setAttributes({x1:i,y1:r,x2:i,y2:r+m,stroke:"#374151","stroke-width":1}),g.forEach((c,u)=>{const h=x(u);e.appendChild(W(h,A+20,c.slice(0,7),"middle","#94a3b8",14))});const S=5;for(let c=0;c<=S;c++){const u=C+c/S*($-C),h=w(u);e.appendChild(W(i-10,h+5,ce(u),"end","#94a3b8",14)),e.appendChild(R("line")).setAttributes({x1:i,y1:h,x2:i+b,y2:h,stroke:"#374151","stroke-dasharray":"2,2","stroke-width":.5})}const T=R("path");let E=`M${x(0)},${w(f[0].income)}`;for(let c=1;c<f.length;c++)E+=`L${x(c)},${w(f[c].income)}`;T.setAttribute("d",E),T.setAttribute("fill","none"),T.setAttribute("stroke","#3b82f6"),T.setAttribute("stroke-width",3),e.appendChild(T);const d=R("path");let M=`M${x(0)},${w(f[0].expenses)}`;for(let c=1;c<f.length;c++)M+=`L${x(c)},${w(f[c].expenses)}`;d.setAttribute("d",M),d.setAttribute("fill","none"),d.setAttribute("stroke","#ef4444"),d.setAttribute("stroke-width",3),e.appendChild(d),f.forEach((c,u)=>{e.appendChild(R("circle")).setAttributes({cx:x(u),cy:w(c.income),r:4,fill:"#3b82f6",stroke:"#0a0e1a","stroke-width":2}),e.appendChild(R("circle")).setAttributes({cx:x(u),cy:w(c.expenses),r:4,fill:"#ef4444",stroke:"#0a0e1a","stroke-width":2})}),e.appendChild(W(i,r-15,"Monthly Income vs. Expenses","start","#f8fafc",18,"600")),e.appendChild(R("rect")).setAttributes({x:i+300,y:r-25,width:15,height:15,fill:"#3b82f6"}),e.appendChild(W(i+320,r-15,"Income","start","#f8fafc",14)),e.appendChild(R("rect")).setAttributes({x:i+400,y:r-25,width:15,height:15,fill:"#ef4444"}),e.appendChild(W(i+420,r-15,"Expenses","start","#f8fafc",14))}function ce(t){return Math.round(t).toLocaleString("sv-SE")}SVGElement.prototype.setAttributes=function(t){for(var s in t)this.setAttribute(s,t[s]);return this};let F=zt();F.highlightedCategory=null;const de=document.getElementById("app");de.innerHTML=`
  <div class="panel kpis" id="kpiStrip"></div>

  <div class="panel controlsArea">
    <div class="controls" id="controls"></div>
    <div class="stack" id="rightStack">
      <div class="subpanel grid2">
        <div>
          <div class="legend"><span><i class="sw" style="background:#34d399"></i>YTD Savings vs Year Target</span></div>
          <svg id="ytdGauge" class="chart tiny" viewBox="0 0 760 450" aria-label="YTD gauge"></svg>
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
        <div class="legend"><span><i class="sw" style="background:#93c5fd"></i>Totals: Income / Budget / Actual / Savings</span></div>
        <svg id="barSummary" class="chart small" viewBox="0 0 760 320" aria-label="Summary bars"></svg>
      </div>
    </div>
  </div>

  <div class="panel">
    <div id="insightsPanel" class="insights-panel"></div>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background:#3b82f6"></i>Monthly Income vs. Expenses Over Time</span>
    </div>
    <svg id="monthlyTrends" class="chart" viewBox="0 0 1200 400" aria-label="Monthly Income vs. Expenses Over Time"></svg>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);"></i>Monthly Spending Trends</span>
    </div>
    <svg id="spendingTrends" class="chart" viewBox="0 0 1200 400" aria-label="Spending trends"></svg>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#fbbf24"></i>Share of total spend (parents, sorted)</span></div>
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
    <div class="help" style="color:var(--muted);font-size:12px;">Explains why this month's total changed vs last month. Bars are labeled; red = categories that got more expensive, green = cheaper.</div>
    <svg id="bridge" class="chart" viewBox="0 0 1200 420" aria-label="Bridge"></svg>
  </div>
`;Dt(F,et);Rt(F,tt());Jt();mt();Nt(F,tt());ut(F,et);window.state=F;window.drawAll=mt;window.monthTotals=t=>N(F,t);function tt(){return F.order[F.order.length-1]}function et(){lt(F),Rt(F,tt()),mt(),Nt(F,tt()),ut(F,et)}function Rt(t,s){const e=document.getElementById("kpiStrip");e.innerHTML="";const o=N(t,s),a=t.months[s].income||0,i=O(t,a-o.aTotal),n=a>0?(a-o.aTotal)/a:0,r=o.bTotal>0?o.aTotal/o.bTotal:0,b=t.order.filter(g=>g.slice(0,4)===s.slice(0,4)&&g<=s).map(g=>(t.months[g].income||0)-N(t,g).aTotal).reduce((g,f)=>g+f,0);[{lab:"Monthly Savings (real SEK)",val:Lt(i)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Lt(O(t,b))+" SEK"}].forEach(g=>{const f=document.createElement("div");f.className="kpi",f.innerHTML=`<div class="lab">${g.lab}</div><div class="val">${g.val}</div>`,f.onclick=()=>{F.highlightedCategory=g.lab,et()},e.appendChild(f)})}function mt(){const t=document.getElementById("monthSel").value;Xt(F,t),_t(F,t),Zt(F,t),Qt(F,t),ae(F,t),oe(F),ee(F,t),ie(F,t),se(F,t),re(F,t)}function Lt(t){return Math.round(t).toLocaleString("sv-SE")}
