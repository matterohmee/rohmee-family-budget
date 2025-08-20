(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const pt={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},ht={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function gt(t,s=1){const e=[];let o=s,a=t;for(let i=0;i<12;i++)e.push(`${a}-${String(o).padStart(2,"0")}`),o++,o>12&&(o=1,a++);return e}function at(t,s){if(t.months[s])Object.keys(B).forEach(e=>{t.months[s].budget[e]||(t.months[s].budget[e]={},t.months[s].actual[e]={}),Object.keys(B[e]).forEach(o=>{t.months[s].budget[e][o]===void 0&&(t.months[s].budget[e][o]=B[e][o]),t.months[s].actual[e][o]===void 0&&(t.months[s].actual[e][o]=B[e][o])})}),t.months[s].income===void 0&&(t.months[s].income=t.defaultIncome||0);else{let e={},o={};Object.keys(B).forEach(a=>{e[a]={},o[a]={},Object.keys(B[a]).forEach(i=>{e[a][i]=B[a][i],o[a][i]=B[a][i]})}),t.months[s]={income:t.defaultIncome||0,budget:e,actual:o}}}const Bt="rohmee_budget_live",Ft=2,Ot=108e3;function zt(){let t=localStorage.getItem(Bt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Nt(e),(!e.order||!e.order.length)&&(e.order=gt(2025,9)),e.order.forEach(o=>at(e,o)),e.icons=e.icons||pt,e.tags=e.tags||ht,e}catch{}const s={defaultIncome:Ot,target:25e4,cpi:1,order:gt(2025,9),months:{},icons:pt,tags:ht,selected:null,version:Ft};return s.order.forEach(e=>at(s,e)),lt(s),s}function lt(t){localStorage.setItem(Bt,JSON.stringify(t))}function Kt(t){const s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(s),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Yt(t,s){const e=new FileReader;e.onload=()=>{try{const o=JSON.parse(e.result);Nt(o),lt(o),s(o)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Nt(t){t.version<2&&(t.defaultIncome=t.income||Ot,delete t.income,t.order&&t.order.forEach(s=>{const e=t.months[s];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ft}function N(t,s){at(t,s);const e=t.months[s],o=bt(e.budget),a=bt(e.actual);let i=0,n=0;return Object.keys(o).forEach(r=>{i+=o[r],n+=a[r]||0}),{bParents:o,aParents:a,bTotal:i,aTotal:n}}function jt(t,s){const e=t.order.indexOf(s);return e>0?t.order[e-1]:null}function O(t,s){return s/(t.cpi||1)}function Gt(t){let s=0;return Object.keys(t).forEach(e=>s+=+t[e]||0),s}function bt(t){let s={};return Object.keys(t).forEach(e=>s[e]=Gt(t[e])),s}function Dt(t,s){const e=document.getElementById("controls"),o=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${y(t.months[o].income||0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${y(t.target)}">
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
  `;const a=e.querySelector("#monthSel");t.order.forEach(h=>{const b=document.createElement("option");b.value=h,b.textContent=h,a.appendChild(b)}),a.value=o;const i=e.querySelector("#netIncome"),n=e.querySelector("#savTarget"),r=e.querySelector("#cpiFactor");function y(h){return Math.round(h).toLocaleString("sv-SE")}function f(h){return parseFloat(h.replace(/\s/g,"").replace(",","."))||0}a.addEventListener("change",h=>{i.value=y(t.months[a.value].income||0),n.value=y(t.target),r.value=t.cpi,s()}),i.addEventListener("input",h=>{const b=h.target.value.replace(/\s/g,""),g=f(b);isNaN(g)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[a.value].income=g,h.target.value=y(g),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),s()}),n.addEventListener("input",h=>{const b=h.target.value.replace(/\s/g,""),g=f(b);isNaN(g)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=g,h.target.value=y(g),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),s()}),r.addEventListener("input",h=>{const b=parseFloat(h.target.value);isNaN(b)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=b,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),s()}),e.querySelector("#saveJSON").addEventListener("click",()=>Kt(t)),e.querySelector("#loadJsonInput").addEventListener("change",h=>{const b=h.target.files[0];b&&Yt(b,g=>{Object.assign(t,g),s()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const h=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(M=>{const C=t.months[M];Object.keys(C.budget).forEach(S=>Object.keys(C.budget[S]).forEach(E=>{h.push([M,S,E,C.budget[S][E],C.actual[S][E]])}))});const b=h.map(M=>M.map(C=>`"${String(C).replace('"','""')}"`).join(",")).join(`
`),g=document.createElement("a");g.href=URL.createObjectURL(new Blob([b],{type:"text/csv"})),g.download="budget.csv",g.click(),setTimeout(()=>URL.revokeObjectURL(g.href),1e3)})}let X={};function ut(t,s){const e=document.getElementById("monthSel").value,o=document.querySelector("#dataTable tbody");o.innerHTML="";const a=t.months[e];Object.keys(B).forEach(n=>{const r=vt(a.budget[n]||{}),y=vt(a.actual[n]||{}),f=document.createElement("tr");f.className="parent"+(y>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(f.style.backgroundColor="rgba(59, 130, 246, 0.2)",f.style.borderLeft="4px solid #3b82f6");const h=document.createElement("td"),b=document.createElement("span");b.textContent=X[n]?"▾":"▸",b.className="toggle",b.title="Collapse/expand",b.onclick=()=>{X[n]=!X[n],ut(t,s)};const g=document.createElement("span");g.className="icon",g.textContent=t.icons[n]||"",g.title="Click to set emoji",g.style.cursor="pointer",g.onclick=()=>{const l=prompt("Set emoji for "+n+":",t.icons[n]||"");l&&(t.icons[n]=l,s&&s())};const M=document.createElement("span");M.textContent=n,M.style.cursor="pointer",M.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,s&&s()},M.ondblclick=()=>{const l=prompt("Rename parent:",n);!l||B[l]||(B[l]=B[n],delete B[n],t.icons[l]=t.icons[n],delete t.icons[n],t.tags[l]=t.tags[n],delete t.tags[n],t.order.forEach($=>{const u=t.months[$];u.budget[l]=u.budget[n],u.actual[l]=u.actual[n],delete u.budget[n],delete u.actual[n]}),s&&s())},f.onclick=l=>{l.target.closest(".rowtools")||l.target.closest(".toggle")||l.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,s&&s())},t.highlightedCategory===n&&(f.style.background="rgba(59, 130, 246, 0.2)",f.style.borderLeft="4px solid #3b82f6");const C=document.createElement("span");C.className="rowtools";const S=document.createElement("span");S.className="chip",S.textContent=t.tags[n]==="F"?"Fixed":"Variable",S.title="Toggle Fixed/Variable",S.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",s&&s()};const E=document.createElement("span");E.className="chip",E.textContent="+",E.title="Add subcategory",E.onclick=()=>{const l=prompt("New subcategory under "+n+":");l&&(B[n][l]=0,t.order.forEach($=>{const u=t.months[$];u.budget[n][l]=0,u.actual[n][l]=0}),s&&s())};const x=document.createElement("span");x.className="chip",x.textContent="−",x.title="Delete parent",x.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(l=>{const $=t.months[l];delete $.budget[n],delete $.actual[n]}),s&&s())},C.appendChild(S),C.appendChild(E),C.appendChild(x),h.appendChild(b),h.appendChild(g),h.appendChild(M),h.appendChild(C),f.appendChild(h);const w=document.createElement("td");w.className="num",w.textContent=_(O(t,r)),f.appendChild(w);const T=document.createElement("td");T.className="num",T.textContent=_(O(t,y)),f.appendChild(T);const A=document.createElement("td");A.className="num",A.textContent=_(O(t,r-y)),f.appendChild(A),o.appendChild(f),X[n]&&Object.keys(B[n]).forEach(l=>{const $=document.createElement("tr");(a.actual[n]||{})[l]>(a.budget[n]||{})[l]&&($.className="over");const u=document.createElement("td"),m=document.createElement("span");m.textContent="• "+l,m.title="Double-click to rename",m.style.cursor="text",m.ondblclick=()=>{const I=prompt("Rename subcategory:",l);I&&(B[n][I]=B[n][l],delete B[n][l],t.order.forEach(L=>{const k=t.months[L];k.budget[n][I]=k.budget[n][l],k.actual[n][I]=k.actual[n][l],delete k.budget[n][l],delete k.actual[n][l]}),s&&s())},u.appendChild(m);const v=document.createElement("span");v.className="chip",v.textContent="−",v.title="Delete subcategory",v.style.marginLeft="8px",v.onclick=()=>{confirm("Delete "+l+"?")&&(delete B[n][l],t.order.forEach(I=>{const L=t.months[I];delete L.budget[n][l],delete L.actual[n][l]}),s&&s())},u.appendChild(v),$.appendChild(u);const c=document.createElement("td");c.className="num",c.appendChild(ft(t,e,n,l,"budget",(a.budget[n]||{})[l]||0,s)),$.appendChild(c);const d=document.createElement("td");d.className="num",d.appendChild(ft(t,e,n,l,"actual",(a.actual[n]||{})[l]||0,s)),$.appendChild(d);const p=document.createElement("td");p.className="num",p.textContent=_(O(t,((a.budget[n]||{})[l]||0)-((a.actual[n]||{})[l]||0))),$.appendChild(p),o.appendChild($)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const y=t.months[r];y.budget[n]={},y.actual[n]={}}),document.getElementById("newParentName").value="",s&&s()}}}function ft(t,s,e,o,a,i,n){const r=document.createElement("input");r.type="number",r.value=i,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const y=f=>{const h=+r.value||0;t.months[s][a][e][o]=h,n&&n()};return r.addEventListener("keydown",f=>{f.key==="Enter"?(y(f.shiftKey?"up":"down"),f.preventDefault()):f.key==="Escape"&&(r.value=i,r.blur())}),r.addEventListener("blur",()=>y()),r}function vt(t){let s=0;return Object.keys(t).forEach(e=>s+=+t[e]||0),s}function _(t){return Math.round(t).toLocaleString("sv-SE")}class qt{constructor(s){this.state=s}generateInsights(s){const e=[],o=this.getRecentMonths(s,6);if(o.length<3)return e;const a=this.analyzeTrend(o);a&&e.push(a);const i=this.analyzeBudgetVariance(o);i&&e.push(i);const n=this.analyzeCategorySpending(o);e.push(...n);const r=this.analyzeSavingsRate(o);r&&e.push(r);const y=this.analyzeSeasonalPatterns(s);return y&&e.push(y),e.slice(0,8)}getRecentMonths(s,e){const o=parseInt(s.slice(0,4)),a=parseInt(s.slice(5,7)),i=[];for(let n=0;n<e;n++){let r=a-n,y=o;r<=0&&(r+=12,y-=1);const f=`${y}-${r.toString().padStart(2,"0")}`;this.state.months[f]&&i.unshift({key:f,data:N(this.state,f),income:this.state.months[f].income||0})}return i}analyzeTrend(s){if(s.length<3)return null;const e=this.calculateTrend(s.map(a=>a.data.aTotal)),o=s.reduce((a,i)=>a+i.data.aTotal,0)/s.length;if(Math.abs(e)<o*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const a=e/o*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/o*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(s){const e=s[s.length-1],o=e.data.aTotal-e.data.bTotal,a=o/e.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:o>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(o)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(o))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(s){const e=[],o=s[s.length-1];if(s.length>=2){const a=s[s.length-2];Object.keys(o.data.aParents).forEach(i=>{const n=o.data.aParents[i]||0,r=a.data.aParents[i]||0;if(r>0){const y=(n-r)/r*100;if(Math.abs(y)>20&&Math.abs(n-r)>1e3){const f=this.getCategoryIcon(i);y>0?e.push({type:"warning",category:"spending",title:`${i} Spending Increased`,message:`${i} spending increased by ${y.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:y>50?"high":"medium",icon:f,recommendation:`Review your ${i.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${i} Spending Decreased`,message:`Great! ${i} spending decreased by ${Math.abs(y).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:f})}}})}return e.slice(0,3)}analyzeSavingsRate(s){const e=s[s.length-1],o=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return o<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${o.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:o>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${o.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${o.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(s){const e=parseInt(s.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(s){const e=s.length,o=e*(e-1)/2,a=s.reduce((r,y)=>r+y,0),i=s.reduce((r,y,f)=>r+f*y,0),n=s.reduce((r,y,f)=>r+f*f,0);return(e*i-o*a)/(e*n-o*o)}getCategoryIcon(s){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[s]||"📊"}fmt(s){return Math.round(s).toLocaleString("sv-SE")}generateRecommendations(s){const e=[],o=this.getRecentMonths(s,3);if(o.length===0)return e;const a=o[o.length-1],r=o.reduce((f,h)=>f+h.data.aTotal,0)/o.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const f=(a.income-a.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(f)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Pt(t,s){const e=document.getElementById("insightsPanel");if(!e)return;const o=new qt(t),a=o.generateInsights(s),i=o.generateRecommendations(s);if(e.innerHTML="",a.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");a.forEach((y,f)=>{const h=Wt(y);r.appendChild(h)})}if(i.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");i.forEach((y,f)=>{const h=Ut(y);r.appendChild(h)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,y)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},y*100)})})}function Wt(t,s){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=D("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function yt(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(D("defs")),i=D("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","100%"),i.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=D("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function Xt(t,s){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=s.slice(0,4),i=t.order.filter(d=>d.slice(0,4)===o&&d<=s).map(d=>Math.max(0,(t.months[d].income||0)-N(t,d).aTotal)).reduce((d,p)=>d+p,0),n=t.target||0,r=n>0?Math.min(1,i/n):0,y=yt(e,"gaugeProgress","#10b981","#059669"),f=yt(e,"gaugeBg","#1e293b","#0f172a"),h=W(380,150,`${Math.round(r*100)}%`,"middle","#10b981",80,"900");e.appendChild(h);const b=W(380,240,`${xt(O(t,i))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(b);const g=W(380,290,`of ${xt(O(t,n))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(g);const M=r>=1?"#10b981":r>=.8?"#f59e0b":"#ef4444",C=r>=1?"✓ Target Achieved":r>=.8?"⚡ On Track":"⚠ Behind Target",S=W(380,350,C,"middle",M,24,"600");e.appendChild(S);const E=500,x=30,w=380-E/2,T=380,A=D("rect");A.setAttribute("x",w),A.setAttribute("y",T),A.setAttribute("width",E),A.setAttribute("height",x),A.setAttribute("fill",f),A.setAttribute("rx",10),A.setAttribute("opacity","0.3"),e.appendChild(A);const l=D("rect");l.setAttribute("x",w),l.setAttribute("y",T),l.setAttribute("width",0),l.setAttribute("height",x),l.setAttribute("fill",y),l.setAttribute("rx",10),l.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),l.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l),requestAnimationFrame(()=>{setTimeout(()=>{l.setAttribute("width",E*r)},100)}),["0%","25%","50%","75%","100%"].forEach((d,p)=>{const I=w+E*p/4,L=W(I,T+60,d,"middle","#64748b",30,"500");e.appendChild(L)});let u=0;const m=Math.round(r*100),v=m/60;function c(){u<m&&(u+=v,h.textContent=Math.round(Math.min(u,m))+"%",requestAnimationFrame(c))}setTimeout(c,200)}function xt(t){return Math.round(t).toLocaleString("sv-SE")}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=z("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function At(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(z("defs")),i=z("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","100%"),i.setAttribute("y2","100%");const n=z("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=z("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function _t(t,s){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const o=N(t,s);let a=0,i=0;Object.keys(o.aParents).forEach(K=>{t.tags[K]==="F"?a+=o.aParents[K]||0:i+=o.aParents[K]||0});const n=a+i||1,r=Math.round(a/n*100),y=Math.round(i/n*100),f=At(e,"fixedGrad","#8b5cf6","#7c3aed"),h=At(e,"variableGrad","#06b6d4","#0891b2"),b=200,g=j(b,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(g);const M=j(b,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(M);const C=j(b,280,`${wt(O(t,a))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(C);const S=560,E=j(S,150,"0%","middle","#06b6d4",60,"900");e.appendChild(E);const x=j(S,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(x);const w=j(S,280,`${wt(O(t,i))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(w);const T=320,A=40,l=600,$=380-l/2,u=l*(a/n),m=z("rect");m.setAttribute("x",$),m.setAttribute("y",T),m.setAttribute("width",0),m.setAttribute("height",A),m.setAttribute("fill",f),m.setAttribute("rx",15),m.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),m.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(m);const v=l*(i/n),c=z("rect");c.setAttribute("x",$+u),c.setAttribute("y",T),c.setAttribute("width",0),c.setAttribute("height",A),c.setAttribute("fill",h),c.setAttribute("rx",15),c.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),c.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(c);const d=z("rect");d.setAttribute("x",$),d.setAttribute("y",T),d.setAttribute("width",l),d.setAttribute("height",A),d.setAttribute("fill","#1e293b"),d.setAttribute("rx",15),d.setAttribute("opacity","0.3"),e.insertBefore(d,m),requestAnimationFrame(()=>{setTimeout(()=>{m.setAttribute("width",u)},200),setTimeout(()=>{c.setAttribute("x",$+u),c.setAttribute("width",v)},400)});const p=j(380,140,"VS","middle","#64748b",32,"600");e.appendChild(p);const I=z("line");I.setAttribute("x1",380),I.setAttribute("y1",60),I.setAttribute("x2",380),I.setAttribute("y2",230),I.setAttribute("stroke","#374151"),I.setAttribute("stroke-width",2),I.setAttribute("opacity","0.5"),e.appendChild(I);let L=0,k=0;const P=r/50,R=y/50;function q(){(L<r||k<y)&&(L<r&&(L+=P,g.textContent=Math.round(Math.min(L,r))+"%"),k<y&&(k+=R,E.textContent=Math.round(Math.min(k,y))+"%"),requestAnimationFrame(q))}setTimeout(q,300),m.style.cursor="pointer",c.style.cursor="pointer",m.addEventListener("mouseenter",()=>{m.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),m.addEventListener("mouseleave",()=>{m.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),c.addEventListener("mouseenter",()=>{c.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),c.addEventListener("mouseleave",()=>{c.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function wt(t){return Math.round(t).toLocaleString("sv-SE")}const ot=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Et=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=ot("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function Zt(t,s){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const o=600,a=250,i=50,n=20,r=20,y=40,f=o-i-n,h=a-r-y,b=s.slice(0,4),g=[];for(let d=9;d<=12;d++){const p=`${b}-${d.toString().padStart(2,"0")}`;g.push(p)}const M=(parseInt(b)+1).toString();for(let d=1;d<=8;d++){const p=`${M}-${d.toString().padStart(2,"0")}`;g.push(p)}const C=t.order.indexOf(s),S=g.filter(d=>t.order.indexOf(d)<=C&&t.order.indexOf(d)>=0),E=S.map(d=>Math.max(0,(t.months[d]&&t.months[d].income||0)-(t.months[d]?N(t,d).aTotal:0))).reduce((d,p)=>d+p,0),x=12-S.length,w=Math.max(0,(t.target||0)-E),T=x>0?w/x:0,A=(t.target||0)/12,l=[];g.forEach(d=>{t.order.indexOf(d)<=C&&t.order.indexOf(d)>=0?l.push({m:d,v:Math.max(0,(t.months[d]&&t.months[d].income||0)-(t.months[d]?N(t,d).aTotal:0)),t:"a"}):l.push({m:d,v:T,t:"r"})});const $=Math.max(A,...l.map(d=>d.v),1),u=f/g.length*.65;l.forEach((d,p)=>{const I=d.v/$*h,L=i+p*(f/g.length)+(f/g.length-u)/2,k=r+h-I,P=d.t==="a"?d.v>=A?"#10b981":"#ef4444":"#f59e0b",R=ot("rect");R.setAttribute("x",L),R.setAttribute("y",k),R.setAttribute("width",u),R.setAttribute("height",I),R.setAttribute("fill",P),e.appendChild(R),e.appendChild(Et(L+u/2,a-12,d.m.slice(5),"middle","#9aa3b2",12))});const m=r+h-A/$*h,v=ot("line");v.setAttribute("x1",i),v.setAttribute("x2",i+f),v.setAttribute("y1",m),v.setAttribute("y2",m),v.setAttribute("stroke","#93c5fd"),v.setAttribute("stroke-dasharray","5,5"),e.appendChild(v),e.appendChild(Et(i+f-6,m-6,"Monthly target "+Ct(O(t,A)),"end","#cfe4ff",16));const c=document.getElementById("glidePill");c&&(w<=0?(c.textContent="On track ✔",c.classList.add("ok")):(c.textContent="From now: need "+Ct(O(t,T))+" SEK / month",c.classList.remove("ok")))}function Ct(t){return Math.round(t).toLocaleString("sv-SE")}const ct=t=>document.createElementNS("http://www.w3.org/2000/svg",t),St=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=ct("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function Qt(t,s){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const o=760,a=320,i=110,n=20,r=20,y=40,f=o-i-n,h=a-r-y,b=N(t,s),g=t.months[s].income||0,M=[{lab:"Income",val:g,c:"#60a5fa"},{lab:"Budget",val:b.bTotal,c:"#3b82f6"},{lab:"Actual",val:b.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,g-b.aTotal),c:"#34d399"}],C=Math.max(...M.map(x=>x.val),1),S=h/M.length*.55;M.forEach((x,w)=>{const T=r+w*(h/M.length)+(h/M.length-S)/2,A=x.val/C*f,l=ct("rect");l.setAttribute("x",i),l.setAttribute("y",T),l.setAttribute("width",A),l.setAttribute("height",S),l.setAttribute("fill",x.c),e.appendChild(l),e.appendChild(St(i-10,T+S/2+4,x.lab,"end","#cbd5e1",16)),e.appendChild(St(i+A+6,T+S/2+4,te(O(t,x.val)),"start","#cbd5e1",16))});const E=ct("line");E.setAttribute("x1",i),E.setAttribute("x2",i),E.setAttribute("y1",r),E.setAttribute("y2",r+h),E.setAttribute("stroke","#243049"),e.appendChild(E)}function te(t){return Math.round(t).toLocaleString("sv-SE")}const dt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=dt("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function ee(t,s){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=700,i=280,n=40,r=30,y=60,f=o-i-n,h=a-r-y,b=N(t,s),g=Object.keys(B).map(x=>({p:x,v:b.aParents[x]||0})).sort((x,w)=>w.v-x.v),M=g.reduce((x,w)=>x+w.v,0)||1,C=g.length,S=h/C*.75;g.forEach((x,w)=>{const T=r+w*(h/C)+(h/C-S)/2,A=x.v/M*f,l=t.highlightedCategory===x.p,$=l?"#f59e0b":"#3b82f6",u=t.highlightedCategory&&!l?.3:1,m=dt("rect");m.setAttribute("x",i),m.setAttribute("y",T),m.setAttribute("width",A),m.setAttribute("height",S),m.setAttribute("fill",$),m.setAttribute("opacity",u),l&&m.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(m);const v=t.highlightedCategory&&!l?.5:1,c=(t.icons[x.p]||"")+" "+x.p,d=Tt(i-16,T+S/2+6,c,"end","#cbd5e1",15);d.setAttribute("opacity",v),e.appendChild(d);const p=Tt(i+A+12,T+S/2+6,(x.v/M*100).toFixed(1)+"%  ·  "+ne(O(t,x.v))+" SEK","start","#cbd5e1",14);p.setAttribute("opacity",v),e.appendChild(p)});const E=dt("line");E.setAttribute("x1",i),E.setAttribute("x2",i),E.setAttribute("y1",r),E.setAttribute("y2",r+h),E.setAttribute("stroke","#243049"),e.appendChild(E)}function ne(t){return Math.round(t).toLocaleString("sv-SE")}const tt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),$t=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=tt("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function ie(t,s){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=460,i=260,n=40,r=20,y=60,f=o-i-n,h=a-r-y,b=N(t,s),g=Object.keys(B).map(w=>({p:w,b:b.bParents[w]||0,a:b.aParents[w]||0})).sort((w,T)=>T.a-w.a),M=g.length,C=h/M,S=C*.35,E=Math.max(...g.map(w=>Math.max(w.a,w.b)),1);g.forEach((w,T)=>{const A=r+T*C+C/2,l=w.b/E*f,$=w.a/E*f,u=t.highlightedCategory===w.p,m=u?"#f59e0b":"#3b82f6",v=u?"#f97316":"#10b981",c=t.highlightedCategory&&!u?.3:1,d=t.highlightedCategory&&!u?.5:1,p=tt("rect");p.setAttribute("x",i),p.setAttribute("y",A-S-3),p.setAttribute("width",l),p.setAttribute("height",S),p.setAttribute("fill",m),p.setAttribute("opacity",c),u&&p.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(p);const I=tt("rect");I.setAttribute("x",i),I.setAttribute("y",A+3),I.setAttribute("width",$),I.setAttribute("height",S),I.setAttribute("fill",v),I.setAttribute("opacity",c),u&&I.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(I);const L=(t.icons[w.p]||"")+" "+w.p,k=$t(i-14,A+4,L,"end","#cbd5e1",14);k.setAttribute("opacity",d),e.appendChild(k);const P=$t(i+Math.max(l,$)+10,A+4,"B "+It(O(t,w.b))+"  A "+It(O(t,w.a)),"start","#cbd5e1",12);P.setAttribute("opacity",d),e.appendChild(P)});const x=tt("line");x.setAttribute("x1",i),x.setAttribute("x2",i),x.setAttribute("y1",r),x.setAttribute("y2",r+h),x.setAttribute("stroke","#243049"),e.appendChild(x)}function It(t){return Math.round(t).toLocaleString("sv-SE")}const Ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=Ht("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function se(t,s){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=440,i=260,n=40,r=20,y=40,f=o-i-n,h=a-r-y,b=s.slice(0,4);t.order.filter(u=>u.slice(0,4)===b||u.slice(0,4)===(parseInt(b)+1).toString());const g=[];for(let u=9;u<=12;u++){const m=`${b}-${u.toString().padStart(2,"0")}`;g.push(m)}const M=(parseInt(b)+1).toString();for(let u=1;u<=8;u++){const m=`${M}-${u.toString().padStart(2,"0")}`;g.push(m)}const C=Object.keys(B),S=g.length,E=[],x=[];C.forEach(u=>{const m=[];g.forEach(v=>{const c=N(t,v),d=c.bParents[u]||0,p=c.aParents[u]||0,I=d?(p-d)/d:0;m.push({p:u,b:d,a:p,v:I,m:v}),x.push(I)}),E.push(m)});const w=Math.min(...x),T=Math.max(...x),A=f/S,l=h/C.length;function $(u){const m=u<=0?150:0,v=u<=0?w===0?1:-w:T===0?1:T,d=30+30*Math.min(1,Math.abs(u)/v||0);return`hsl(${m},70%,${d}%)`}E.forEach((u,m)=>{u.forEach((c,d)=>{const p=Ht("rect");p.setAttribute("x",i+d*A),p.setAttribute("y",r+m*l),p.setAttribute("width",A-2),p.setAttribute("height",l-2),p.setAttribute("fill",$(c.v)),t.highlightedCategory&&c.p===t.highlightedCategory&&(p.setAttribute("stroke","#3b82f6"),p.setAttribute("stroke-width","3")),p.addEventListener("mouseenter",I=>{const L=document.getElementById("tooltip"),k=c.a-c.b,P=k>=0?"+":"";L.innerHTML=`<div><b>${c.p}</b> · <span class='t'>${c.m}</span></div>
                        <div>Budget: <b>${st(O(t,c.b))}</b> SEK</div>
                        <div>Actual: <b>${st(O(t,c.a))}</b> SEK</div>
                        <div>Variance: <b>${P+st(O(t,k))}</b> (${c.b?(k/c.b*100).toFixed(1):"0.0"}%)</div>`,L.style.left=I.clientX+12+"px",L.style.top=I.clientY+12+"px",L.style.display="block"}),p.addEventListener("mousemove",I=>{const L=document.getElementById("tooltip");L.style.left=I.clientX+12+"px",L.style.top=I.clientY+12+"px"}),p.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(p)});const v=(t.icons[C[m]]||"")+" "+C[m];e.appendChild(Mt(i-14,r+m*l+l/2+4,v,"end",t.highlightedCategory===C[m]?"#ffffff":"#cbd5e1",18))}),g.forEach((u,m)=>e.appendChild(Mt(i+m*A+A/2,a-12,u.slice(5),"middle","#9aa3b2",16)))}function st(t){return Math.round(t).toLocaleString("sv-SE")}const J=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=J("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function re(t,s){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=jt(t,s);if(!o){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const a=1200,i=420,n=80,r=40,y=30,f=60,h=a-n-r,b=i-y-f,g=N(t,s),M=N(t,o),C=M.aTotal,S=g.aTotal,E=Object.keys(B).map(d=>({p:d,icon:t.icons[d]||"",delta:(g.aParents[d]||0)-(M.aParents[d]||0)})).sort((d,p)=>Math.abs(p.delta)-Math.abs(d.delta)),x=E.slice(0,Math.min(10,E.length)),w=E.slice(x.length).reduce((d,p)=>d+p.delta,0);Math.abs(w)>.5&&x.push({p:"Others",icon:"",delta:w});const T=h/(x.length+3),A=y+b;let l=n+T;function $(d){const p=Math.max(C,S,Math.max(...x.map(I=>Math.abs(I.delta)))+Math.max(C,S));return y+b-d/p*b}const u=J("rect");u.setAttribute("x",l-24),u.setAttribute("y",$(C)),u.setAttribute("width",48),u.setAttribute("height",A-$(C)),u.setAttribute("fill","#64748b"),e.appendChild(u),e.appendChild(G(l,i-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(l,$(C)-6,rt(O(t,C)),"middle","#cbd5e1",16));let m=C;l+=T,x.forEach(d=>{const p=d.delta,I=p>=0,L=$(m),k=$(m+p),P=Math.min(L,k),R=Math.abs(k-L);let q=I?"#ef4444":"#10b981",K=1;t.highlightedCategory&&(d.p===t.highlightedCategory?(q=I?"#dc2626":"#059669",K=1):K=.3);const Y=J("rect");Y.setAttribute("x",l-24),Y.setAttribute("y",P),Y.setAttribute("width",48),Y.setAttribute("height",R),Y.setAttribute("fill",q),Y.setAttribute("opacity",K),e.appendChild(Y);const it=(d.icon?d.icon+" ":"")+d.p;e.appendChild(G(l,i-18,it.length>14?it.slice(0,14)+"…":it,"middle",t.highlightedCategory===d.p?"#ffffff":"#9aa3b2",16));const Vt=(I?"+":"")+rt(O(t,p));e.appendChild(G(l,P-6,Vt,"middle",t.highlightedCategory===d.p?"#ffffff":"#cbd5e1",16)),m+=p,l+=T});const v=J("rect");v.setAttribute("x",l-24),v.setAttribute("y",$(S)),v.setAttribute("width",48),v.setAttribute("height",A-$(S)),v.setAttribute("fill","#64748b"),e.appendChild(v),e.appendChild(G(l,i-18,"End","middle","#9aa3b2",16)),e.appendChild(G(l,$(S)-6,rt(O(t,S)),"middle","#cbd5e1",16));const c=J("line");c.setAttribute("x1",n*.6),c.setAttribute("x2",a-r),c.setAttribute("y1",A),c.setAttribute("y2",A),c.setAttribute("stroke","#243049"),e.appendChild(c)}function rt(t){return Math.round(t).toLocaleString("sv-SE")}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Z(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=H("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Lt(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(H("defs")),i=H("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","0%"),i.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=H("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function ae(t,s){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,i={top:40,right:60,bottom:60,left:80},n=o-i.left-i.right,r=a-i.top-i.bottom,y=s.slice(0,4),f=parseInt(s.slice(5,7)),h=[];for(let u=11;u>=0;u--){let m=f-u,v=parseInt(y);m<=0&&(m+=12,v-=1);const c=`${v}-${m.toString().padStart(2,"0")}`;t.months[c]&&h.push({key:c,label:c.slice(5,7),data:N(t,c)})}if(h.length===0)return;const b=Math.max(...h.map(u=>u.data.aTotal)),g=n/(h.length-1),M=r/b,C=Lt(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),S=Lt(e,"trendLine","#3b82f6","#1d4ed8"),E=H("rect");E.setAttribute("x",i.left),E.setAttribute("y",i.top),E.setAttribute("width",n),E.setAttribute("height",r),E.setAttribute("fill","rgba(15, 23, 42, 0.5)"),E.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),E.setAttribute("rx",8),e.appendChild(E);for(let u=0;u<=5;u++){const m=i.top+r/5*u,v=H("line");v.setAttribute("x1",i.left),v.setAttribute("y1",m),v.setAttribute("x2",i.left+n),v.setAttribute("y2",m),v.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),v.setAttribute("stroke-width",1),v.setAttribute("stroke-dasharray","2,2"),e.appendChild(v);const c=b-b/5*u,d=Z(i.left-10,m+4,Q(c),"end","#94a3b8",14);e.appendChild(d)}let x=`M ${i.left} ${i.top+r}`,w="M";h.forEach((u,m)=>{const v=i.left+m*g,c=i.top+r-u.data.aTotal*M;m===0?(w+=` ${v} ${c}`,x+=` L ${v} ${c}`):(w+=` L ${v} ${c}`,x+=` L ${v} ${c}`)}),x+=` L ${i.left+(h.length-1)*g} ${i.top+r} Z`;const T=H("path");T.setAttribute("d",x),T.setAttribute("fill",C),T.setAttribute("opacity","0"),e.appendChild(T);const A=H("path");A.setAttribute("d",w),A.setAttribute("fill","none"),A.setAttribute("stroke",S),A.setAttribute("stroke-width",3),A.setAttribute("stroke-linecap","round"),A.setAttribute("stroke-linejoin","round"),A.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),A.style.strokeDasharray=A.getTotalLength(),A.style.strokeDashoffset=A.getTotalLength(),e.appendChild(A),h.forEach((u,m)=>{const v=i.left+m*g,c=i.top+r-u.data.aTotal*M,d=H("circle");d.setAttribute("cx",v),d.setAttribute("cy",c),d.setAttribute("r",6),d.setAttribute("fill","rgba(15, 23, 42, 0.9)"),d.setAttribute("stroke","#3b82f6"),d.setAttribute("stroke-width",2),d.setAttribute("opacity","0"),e.appendChild(d);const p=H("circle");p.setAttribute("cx",v),p.setAttribute("cy",c),p.setAttribute("r",4),p.setAttribute("fill","#3b82f6"),p.setAttribute("opacity","0"),p.style.cursor="pointer",e.appendChild(p);const I=Z(v,i.top+r+20,u.label,"middle","#94a3b8",14);e.appendChild(I),p.addEventListener("mouseenter",()=>{p.setAttribute("r",6),p.setAttribute("fill","#1d4ed8"),d.setAttribute("opacity","1");const L=document.getElementById("tooltip");L&&(L.style.display="block",L.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${u.label}</div>
          <div>Total Spending: ${Q(u.data.aTotal)} SEK</div>
          <div>Budget: ${Q(u.data.bTotal)} SEK</div>
          <div>Variance: ${Q(u.data.aTotal-u.data.bTotal)} SEK</div>
        `)}),p.addEventListener("mouseleave",()=>{p.setAttribute("r",4),p.setAttribute("fill","#3b82f6"),d.setAttribute("opacity","0");const L=document.getElementById("tooltip");L&&(L.style.display="none")}),p.addEventListener("mousemove",L=>{const k=document.getElementById("tooltip");k&&(k.style.left=L.pageX+10+"px",k.style.top=L.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{T.style.transition="opacity 1s ease-out",T.setAttribute("opacity","1")},200),setTimeout(()=>{A.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",A.style.strokeDashoffset="0"},400),setTimeout(()=>{h.forEach((u,m)=>{setTimeout(()=>{const v=e.querySelectorAll("circle"),c=m*2+2;v[c]&&(v[c].style.transition="opacity 0.3s ease-out",v[c].setAttribute("opacity","1")),v[c+1]&&(v[c+1].style.transition="opacity 0.3s ease-out",v[c+1].setAttribute("opacity","1"))},m*100)})},1e3)});const l=Z(o/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(l);const $=Z(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");$.setAttribute("transform",`rotate(-90, 20, ${a/2})`),e.appendChild($)}function Q(t){return Math.round(t).toLocaleString("sv-SE")}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function U(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=V("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function oe(t,s){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,i=60,n=20,r=40,y=60,f=o-i-n,h=a-r-y,b=s.slice(0,4);t.order.filter(c=>c.slice(0,4)===b||c.slice(0,4)===(parseInt(b)+1).toString());const g=[];for(let c=9;c<=12;c++){const d=`${b}-${c.toString().padStart(2,"0")}`;g.push(d)}const M=(parseInt(b)+1).toString();for(let c=1;c<=8;c++){const d=`${M}-${c.toString().padStart(2,"0")}`;g.push(d)}if(g.length===0)return;const C=g.map(c=>{const d=t.months[c]&&t.months[c].income||0,p=t.months[c]?N(t,c).aTotal:0;return{month:c,income:d,expenses:p}}),S=C.filter(c=>!isNaN(c.income)&&!isNaN(c.expenses));if(S.length===0)return;const E=Math.max(1,...S.map(c=>Math.max(c.income,c.expenses))),x=Math.min(0,...S.map(c=>Math.min(c.income,c.expenses))),w=c=>r+h-(c-x)/(E-x)*h,T=c=>i+c/(g.length-1)*f,A=w(0);e.appendChild(V("line")).setAttributes({x1:i,y1:A,x2:i+f,y2:A,stroke:"#374151","stroke-width":1}),e.appendChild(V("line")).setAttributes({x1:i,y1:r,x2:i,y2:r+h,stroke:"#374151","stroke-width":1}),g.forEach((c,d)=>{const p=T(d);e.appendChild(U(p,A+20,c.slice(0,7),"middle","#94a3b8",14))});const l=5;for(let c=0;c<=l;c++){const d=x+c/l*(E-x),p=w(d);e.appendChild(U(i-10,p+5,ce(d),"end","#94a3b8",14)),e.appendChild(V("line")).setAttributes({x1:i,y1:p,x2:i+f,y2:p,stroke:"#374151","stroke-dasharray":"2,2","stroke-width":.5})}const $=V("path");let u=`M${T(0)},${w(C[0].income)}`;for(let c=1;c<C.length;c++)u+=`L${T(c)},${w(C[c].income)}`;$.setAttribute("d",u),$.setAttribute("fill","none"),$.setAttribute("stroke","#3b82f6"),$.setAttribute("stroke-width",3),e.appendChild($);const m=V("path");let v=`M${T(0)},${w(C[0].expenses)}`;for(let c=1;c<C.length;c++)v+=`L${T(c)},${w(C[c].expenses)}`;m.setAttribute("d",v),m.setAttribute("fill","none"),m.setAttribute("stroke","#ef4444"),m.setAttribute("stroke-width",3),e.appendChild(m),C.forEach((c,d)=>{e.appendChild(V("circle")).setAttributes({cx:T(d),cy:w(c.income),r:4,fill:"#3b82f6",stroke:"#0a0e1a","stroke-width":2}),e.appendChild(V("circle")).setAttributes({cx:T(d),cy:w(c.expenses),r:4,fill:"#ef4444",stroke:"#0a0e1a","stroke-width":2})}),e.appendChild(U(i,r-15,"Monthly Income vs. Expenses","start","#f8fafc",18,"600")),e.appendChild(V("rect")).setAttributes({x:i+300,y:r-25,width:15,height:15,fill:"#3b82f6"}),e.appendChild(U(i+320,r-15,"Income","start","#f8fafc",14)),e.appendChild(V("rect")).setAttributes({x:i+400,y:r-25,width:15,height:15,fill:"#ef4444"}),e.appendChild(U(i+420,r-15,"Expenses","start","#f8fafc",14))}function ce(t){return Math.round(t).toLocaleString("sv-SE")}SVGElement.prototype.setAttributes=function(t){for(var s in t)this.setAttribute(s,t[s]);return this};let F=zt();F.highlightedCategory=null;const de=document.getElementById("app");de.innerHTML=`
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
`;Dt(F,nt);Rt(F,et());Jt();mt();Pt(F,et());ut(F,nt);window.state=F;window.drawAll=mt;window.monthTotals=t=>N(F,t);function et(){return F.order[F.order.length-1]}function nt(){lt(F),Rt(F,et()),mt(),Pt(F,et()),ut(F,nt)}function Rt(t,s){const e=document.getElementById("kpiStrip");e.innerHTML="";const o=N(t,s),a=t.months[s].income||0,i=O(t,a-o.aTotal),n=a>0?(a-o.aTotal)/a:0,r=o.bTotal>0?o.aTotal/o.bTotal:0,f=t.order.filter(b=>b.slice(0,4)===s.slice(0,4)&&b<=s).map(b=>(t.months[b].income||0)-N(t,b).aTotal).reduce((b,g)=>b+g,0);[{lab:"Monthly Savings (real SEK)",val:kt(i)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:kt(O(t,f))+" SEK"}].forEach(b=>{const g=document.createElement("div");g.className="kpi",g.innerHTML=`<div class="lab">${b.lab}</div><div class="val">${b.val}</div>`,g.onclick=()=>{F.highlightedCategory=b.lab,nt()},e.appendChild(g)})}function mt(){const t=document.getElementById("monthSel").value;Xt(F,t),_t(F,t),Zt(F,t),Qt(F,t),ae(F,t),oe(F,t),ee(F,t),ie(F,t),se(F,t),re(F,t)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}
