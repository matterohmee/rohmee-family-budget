(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const pt={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},ht={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function gt(t,s=1){const e=[];let o=s,a=t;for(let i=0;i<12;i++)e.push(`${a}-${String(o).padStart(2,"0")}`),o++,o>12&&(o=1,a++);return e}function at(t,s){if(t.months[s])Object.keys(B).forEach(e=>{t.months[s].budget[e]||(t.months[s].budget[e]={},t.months[s].actual[e]={}),Object.keys(B[e]).forEach(o=>{t.months[s].budget[e][o]===void 0&&(t.months[s].budget[e][o]=B[e][o]),t.months[s].actual[e][o]===void 0&&(t.months[s].actual[e][o]=B[e][o])})}),t.months[s].income===void 0&&(t.months[s].income=t.defaultIncome||0);else{let e={},o={};Object.keys(B).forEach(a=>{e[a]={},o[a]={},Object.keys(B[a]).forEach(i=>{e[a][i]=B[a][i],o[a][i]=B[a][i]})}),t.months[s]={income:t.defaultIncome||0,budget:e,actual:o}}}const Bt="rohmee_budget_live",Ft=2,Ot=108e3;function zt(){let t=localStorage.getItem(Bt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Pt(e),(!e.order||!e.order.length)&&(e.order=gt(2025,9)),e.order.forEach(o=>at(e,o)),e.icons=e.icons||pt,e.tags=e.tags||ht,e}catch{}const s={defaultIncome:Ot,target:25e4,cpi:1,order:gt(2025,9),months:{},icons:pt,tags:ht,selected:null,version:Ft};return s.order.forEach(e=>at(s,e)),lt(s),s}function lt(t){localStorage.setItem(Bt,JSON.stringify(t))}function jt(t){const s=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(s),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Kt(t,s){const e=new FileReader;e.onload=()=>{try{const o=JSON.parse(e.result);Pt(o),lt(o),s(o)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Pt(t){t.version<2&&(t.defaultIncome=t.income||Ot,delete t.income,t.order&&t.order.forEach(s=>{const e=t.months[s];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ft}function N(t,s){at(t,s);const e=t.months[s],o=bt(e.budget),a=bt(e.actual);let i=0,n=0;return Object.keys(o).forEach(r=>{i+=o[r],n+=a[r]||0}),{bParents:o,aParents:a,bTotal:i,aTotal:n}}function Yt(t,s){const e=t.order.indexOf(s);return e>0?t.order[e-1]:null}function O(t,s){return s/(t.cpi||1)}function Gt(t){let s=0;return Object.keys(t).forEach(e=>s+=+t[e]||0),s}function bt(t){let s={};return Object.keys(t).forEach(e=>s[e]=Gt(t[e])),s}function Dt(t,s){const e=document.getElementById("controls"),o=t.order[t.order.length-1];e.innerHTML=`
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
  `;const a=e.querySelector("#monthSel");t.order.forEach(h=>{const g=document.createElement("option");g.value=h,g.textContent=h,a.appendChild(g)}),a.value=o;const i=e.querySelector("#netIncome"),n=e.querySelector("#savTarget"),r=e.querySelector("#cpiFactor");function v(h){return Math.round(h).toLocaleString("sv-SE")}function f(h){return parseFloat(h.replace(/\s/g,"").replace(",","."))||0}a.addEventListener("change",h=>{i.value=v(t.months[a.value].income||0),n.value=v(t.target),r.value=t.cpi,s()}),i.addEventListener("input",h=>{const g=h.target.value.replace(/\s/g,""),b=f(g);isNaN(b)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[a.value].income=b,h.target.value=v(b),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),s()}),n.addEventListener("input",h=>{const g=h.target.value.replace(/\s/g,""),b=f(g);isNaN(b)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=b,h.target.value=v(b),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),s()}),r.addEventListener("input",h=>{const g=parseFloat(h.target.value);isNaN(g)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=g,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),s()}),e.querySelector("#saveJSON").addEventListener("click",()=>jt(t)),e.querySelector("#loadJsonInput").addEventListener("change",h=>{const g=h.target.files[0];g&&Kt(g,b=>{Object.assign(t,b),s()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const h=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(M=>{const E=t.months[M];Object.keys(E.budget).forEach(S=>Object.keys(E.budget[S]).forEach(w=>{h.push([M,S,w,E.budget[S][w],E.actual[S][w]])}))});const g=h.map(M=>M.map(E=>`"${String(E).replace('"','""')}"`).join(",")).join(`
`),b=document.createElement("a");b.href=URL.createObjectURL(new Blob([g],{type:"text/csv"})),b.download="budget.csv",b.click(),setTimeout(()=>URL.revokeObjectURL(b.href),1e3)})}let J={};function ut(t,s){const e=document.getElementById("monthSel").value,o=document.querySelector("#dataTable tbody");o.innerHTML="";const a=t.months[e];Object.keys(B).forEach(n=>{const r=vt(a.budget[n]||{}),v=vt(a.actual[n]||{}),f=document.createElement("tr");f.className="parent"+(v>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(f.style.backgroundColor="rgba(59, 130, 246, 0.2)",f.style.borderLeft="4px solid #3b82f6");const h=document.createElement("td"),g=document.createElement("span");g.textContent=J[n]?"▾":"▸",g.className="toggle",g.title="Collapse/expand",g.onclick=()=>{J[n]=!J[n],ut(t,s)};const b=document.createElement("span");b.className="icon",b.textContent=t.icons[n]||"",b.title="Click to set emoji",b.style.cursor="pointer",b.onclick=()=>{const l=prompt("Set emoji for "+n+":",t.icons[n]||"");l&&(t.icons[n]=l,s&&s())};const M=document.createElement("span");M.textContent=n,M.style.cursor="pointer",M.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,s&&s()},M.ondblclick=()=>{const l=prompt("Rename parent:",n);!l||B[l]||(B[l]=B[n],delete B[n],t.icons[l]=t.icons[n],delete t.icons[n],t.tags[l]=t.tags[n],delete t.tags[n],t.order.forEach(I=>{const u=t.months[I];u.budget[l]=u.budget[n],u.actual[l]=u.actual[n],delete u.budget[n],delete u.actual[n]}),s&&s())},f.onclick=l=>{l.target.closest(".rowtools")||l.target.closest(".toggle")||l.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,s&&s())},t.highlightedCategory===n&&(f.style.background="rgba(59, 130, 246, 0.2)",f.style.borderLeft="4px solid #3b82f6");const E=document.createElement("span");E.className="rowtools";const S=document.createElement("span");S.className="chip",S.textContent=t.tags[n]==="F"?"Fixed":"Variable",S.title="Toggle Fixed/Variable",S.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",s&&s()};const w=document.createElement("span");w.className="chip",w.textContent="+",w.title="Add subcategory",w.onclick=()=>{const l=prompt("New subcategory under "+n+":");l&&(B[n][l]=0,t.order.forEach(I=>{const u=t.months[I];u.budget[n][l]=0,u.actual[n][l]=0}),s&&s())};const y=document.createElement("span");y.className="chip",y.textContent="−",y.title="Delete parent",y.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(l=>{const I=t.months[l];delete I.budget[n],delete I.actual[n]}),s&&s())},E.appendChild(S),E.appendChild(w),E.appendChild(y),h.appendChild(g),h.appendChild(b),h.appendChild(M),h.appendChild(E),f.appendChild(h);const C=document.createElement("td");C.className="num",C.textContent=X(O(t,r)),f.appendChild(C);const T=document.createElement("td");T.className="num",T.textContent=X(O(t,v)),f.appendChild(T);const A=document.createElement("td");A.className="num",A.textContent=X(O(t,r-v)),f.appendChild(A),o.appendChild(f),J[n]&&Object.keys(B[n]).forEach(l=>{const I=document.createElement("tr");(a.actual[n]||{})[l]>(a.budget[n]||{})[l]&&(I.className="over");const u=document.createElement("td"),m=document.createElement("span");m.textContent="• "+l,m.title="Double-click to rename",m.style.cursor="text",m.ondblclick=()=>{const $=prompt("Rename subcategory:",l);$&&(B[n][$]=B[n][l],delete B[n][l],t.order.forEach(L=>{const k=t.months[L];k.budget[n][$]=k.budget[n][l],k.actual[n][$]=k.actual[n][l],delete k.budget[n][l],delete k.actual[n][l]}),s&&s())},u.appendChild(m);const c=document.createElement("span");c.className="chip",c.textContent="−",c.title="Delete subcategory",c.style.marginLeft="8px",c.onclick=()=>{confirm("Delete "+l+"?")&&(delete B[n][l],t.order.forEach($=>{const L=t.months[$];delete L.budget[n][l],delete L.actual[n][l]}),s&&s())},u.appendChild(c),I.appendChild(u);const d=document.createElement("td");d.className="num",d.appendChild(ft(t,e,n,l,"budget",(a.budget[n]||{})[l]||0,s)),I.appendChild(d);const p=document.createElement("td");p.className="num",p.appendChild(ft(t,e,n,l,"actual",(a.actual[n]||{})[l]||0,s)),I.appendChild(p);const x=document.createElement("td");x.className="num",x.textContent=X(O(t,((a.budget[n]||{})[l]||0)-((a.actual[n]||{})[l]||0))),I.appendChild(x),o.appendChild(I)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const v=t.months[r];v.budget[n]={},v.actual[n]={}}),document.getElementById("newParentName").value="",s&&s()}}}function ft(t,s,e,o,a,i,n){const r=document.createElement("input");r.type="number",r.value=i,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const v=f=>{const h=+r.value||0;t.months[s][a][e][o]=h,n&&n()};return r.addEventListener("keydown",f=>{f.key==="Enter"?(v(f.shiftKey?"up":"down"),f.preventDefault()):f.key==="Escape"&&(r.value=i,r.blur())}),r.addEventListener("blur",()=>v()),r}function vt(t){let s=0;return Object.keys(t).forEach(e=>s+=+t[e]||0),s}function X(t){return Math.round(t).toLocaleString("sv-SE")}class qt{constructor(s){this.state=s}generateInsights(s){const e=[],o=this.getRecentMonths(s,6);if(o.length<3)return e;const a=this.analyzeTrend(o);a&&e.push(a);const i=this.analyzeBudgetVariance(o);i&&e.push(i);const n=this.analyzeCategorySpending(o);e.push(...n);const r=this.analyzeSavingsRate(o);r&&e.push(r);const v=this.analyzeSeasonalPatterns(s);return v&&e.push(v),e.slice(0,8)}getRecentMonths(s,e){const o=parseInt(s.slice(0,4)),a=parseInt(s.slice(5,7)),i=[];for(let n=0;n<e;n++){let r=a-n,v=o;r<=0&&(r+=12,v-=1);const f=`${v}-${r.toString().padStart(2,"0")}`;this.state.months[f]&&i.unshift({key:f,data:N(this.state,f),income:this.state.months[f].income||0})}return i}analyzeTrend(s){if(s.length<3)return null;const e=this.calculateTrend(s.map(a=>a.data.aTotal)),o=s.reduce((a,i)=>a+i.data.aTotal,0)/s.length;if(Math.abs(e)<o*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const a=e/o*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/o*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(s){const e=s[s.length-1],o=e.data.aTotal-e.data.bTotal,a=o/e.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:o>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(o)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(o))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(s){const e=[],o=s[s.length-1];if(s.length>=2){const a=s[s.length-2];Object.keys(o.data.aParents).forEach(i=>{const n=o.data.aParents[i]||0,r=a.data.aParents[i]||0;if(r>0){const v=(n-r)/r*100;if(Math.abs(v)>20&&Math.abs(n-r)>1e3){const f=this.getCategoryIcon(i);v>0?e.push({type:"warning",category:"spending",title:`${i} Spending Increased`,message:`${i} spending increased by ${v.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:v>50?"high":"medium",icon:f,recommendation:`Review your ${i.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${i} Spending Decreased`,message:`Great! ${i} spending decreased by ${Math.abs(v).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:f})}}})}return e.slice(0,3)}analyzeSavingsRate(s){const e=s[s.length-1],o=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return o<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${o.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:o>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${o.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${o.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(s){const e=parseInt(s.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(s){const e=s.length,o=e*(e-1)/2,a=s.reduce((r,v)=>r+v,0),i=s.reduce((r,v,f)=>r+f*v,0),n=s.reduce((r,v,f)=>r+f*f,0);return(e*i-o*a)/(e*n-o*o)}getCategoryIcon(s){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[s]||"📊"}fmt(s){return Math.round(s).toLocaleString("sv-SE")}generateRecommendations(s){const e=[],o=this.getRecentMonths(s,3);if(o.length===0)return e;const a=o[o.length-1],r=o.reduce((f,h)=>f+h.data.aTotal,0)/o.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const f=(a.income-a.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(f)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Nt(t,s){const e=document.getElementById("insightsPanel");if(!e)return;const o=new qt(t),a=o.generateInsights(s),i=o.generateRecommendations(s);if(e.innerHTML="",a.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");a.forEach((v,f)=>{const h=Wt(v);r.appendChild(h)})}if(i.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");i.forEach((v,f)=>{const h=Ut(v);r.appendChild(h)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,v)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},v*100)})})}function Wt(t,s){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function G(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function q(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=G("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function yt(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(G("defs")),i=G("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","100%"),i.setAttribute("y2","100%");const n=G("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=G("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function Xt(t,s){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=s.slice(0,4),i=t.order.filter(p=>p.slice(0,4)===o&&p<=s).map(p=>Math.max(0,(t.months[p].income||0)-N(t,p).aTotal)).reduce((p,x)=>p+x,0),n=t.target||0,r=n>0?Math.min(1,i/n):0,v=yt(e,"gaugeProgress","#10b981","#059669"),f=yt(e,"gaugeBg","#1e293b","#0f172a"),h=q(380,150,`${Math.round(r*100)}%`,"middle","#10b981",80,"900");e.appendChild(h);const g=q(380,240,`${xt(O(t,i))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(g);const b=q(380,290,`of ${xt(O(t,n))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(b);const M=r>=1?"#10b981":r>=.8?"#f59e0b":"#ef4444",E=r>=1?"✓ Target Achieved":r>=.8?"⚡ On Track":"⚠ Behind Target",S=q(380,350,E,"middle",M,24,"600");e.appendChild(S);const w=500,y=30,C=380-w/2,T=380,A=G("rect");A.setAttribute("x",C),A.setAttribute("y",T),A.setAttribute("width",w),A.setAttribute("height",y),A.setAttribute("fill",f),A.setAttribute("rx",10),A.setAttribute("opacity","0.3"),e.appendChild(A);const l=G("rect");l.setAttribute("x",C),l.setAttribute("y",T),l.setAttribute("width",0),l.setAttribute("height",y),l.setAttribute("fill",v),l.setAttribute("rx",10),l.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),l.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l),requestAnimationFrame(()=>{setTimeout(()=>{l.setAttribute("width",w*r)},100)}),["0%","25%","50%","75%","100%"].forEach((p,x)=>{const $=C+w*x/4,L=q($,T+60,p,"middle","#64748b",30,"500");e.appendChild(L)});let u=0;const m=Math.round(r*100),c=m/60;function d(){u<m&&(u+=c,h.textContent=Math.round(Math.min(u,m))+"%",requestAnimationFrame(d))}setTimeout(d,200)}function xt(t){return Math.round(t).toLocaleString("sv-SE")}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function K(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=V("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function At(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(V("defs")),i=V("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","100%"),i.setAttribute("y2","100%");const n=V("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=V("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function _t(t,s){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const o=N(t,s);let a=0,i=0;Object.keys(o.aParents).forEach(z=>{t.tags[z]==="F"?a+=o.aParents[z]||0:i+=o.aParents[z]||0});const n=a+i||1,r=Math.round(a/n*100),v=Math.round(i/n*100),f=At(e,"fixedGrad","#8b5cf6","#7c3aed"),h=At(e,"variableGrad","#06b6d4","#0891b2"),g=200,b=K(g,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(b);const M=K(g,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(M);const E=K(g,280,`${wt(O(t,a))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(E);const S=560,w=K(S,150,"0%","middle","#06b6d4",60,"900");e.appendChild(w);const y=K(S,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(y);const C=K(S,280,`${wt(O(t,i))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(C);const T=320,A=40,l=600,I=380-l/2,u=l*(a/n),m=V("rect");m.setAttribute("x",I),m.setAttribute("y",T),m.setAttribute("width",0),m.setAttribute("height",A),m.setAttribute("fill",f),m.setAttribute("rx",15),m.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),m.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(m);const c=l*(i/n),d=V("rect");d.setAttribute("x",I+u),d.setAttribute("y",T),d.setAttribute("width",0),d.setAttribute("height",A),d.setAttribute("fill",h),d.setAttribute("rx",15),d.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),d.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(d);const p=V("rect");p.setAttribute("x",I),p.setAttribute("y",T),p.setAttribute("width",l),p.setAttribute("height",A),p.setAttribute("fill","#1e293b"),p.setAttribute("rx",15),p.setAttribute("opacity","0.3"),e.insertBefore(p,m),requestAnimationFrame(()=>{setTimeout(()=>{m.setAttribute("width",u)},200),setTimeout(()=>{d.setAttribute("x",I+u),d.setAttribute("width",c)},400)});const x=K(380,140,"VS","middle","#64748b",32,"600");e.appendChild(x);const $=V("line");$.setAttribute("x1",380),$.setAttribute("y1",60),$.setAttribute("x2",380),$.setAttribute("y2",230),$.setAttribute("stroke","#374151"),$.setAttribute("stroke-width",2),$.setAttribute("opacity","0.5"),e.appendChild($);let L=0,k=0;const P=r/50,nt=v/50;function D(){(L<r||k<v)&&(L<r&&(L+=P,b.textContent=Math.round(Math.min(L,r))+"%"),k<v&&(k+=nt,w.textContent=Math.round(Math.min(k,v))+"%"),requestAnimationFrame(D))}setTimeout(D,300),m.style.cursor="pointer",d.style.cursor="pointer",m.addEventListener("mouseenter",()=>{m.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),m.addEventListener("mouseleave",()=>{m.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),d.addEventListener("mouseenter",()=>{d.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),d.addEventListener("mouseleave",()=>{d.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function wt(t){return Math.round(t).toLocaleString("sv-SE")}const ot=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Et=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=ot("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function Zt(t,s){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const o=600,a=250,i=50,n=20,r=20,v=40,f=o-i-n,h=a-r-v,g=s.slice(0,4),b=t.order.filter(d=>d.slice(0,4)===g),M=t.order.indexOf(s),E=t.order.filter(d=>d.slice(0,4)===g&&t.order.indexOf(d)<=M),S=E.map(d=>Math.max(0,(t.months[d].income||0)-N(t,d).aTotal)).reduce((d,p)=>d+p,0),w=12-E.length,y=Math.max(0,(t.target||0)-S),C=w>0?y/w:0,T=(t.target||0)/12,A=[];b.forEach(d=>{t.order.indexOf(d)<=M?A.push({m:d,v:Math.max(0,(t.months[d].income||0)-N(t,d).aTotal),t:"a"}):A.push({m:d,v:C,t:"r"})});const l=Math.max(T,...A.map(d=>d.v),1),I=f/b.length*.65;A.forEach((d,p)=>{const x=d.v/l*h,$=i+p*(f/b.length)+(f/b.length-I)/2,L=r+h-x,k=d.t==="a"?d.v>=T?"#10b981":"#ef4444":"#f59e0b",P=ot("rect");P.setAttribute("x",$),P.setAttribute("y",L),P.setAttribute("width",I),P.setAttribute("height",x),P.setAttribute("fill",k),e.appendChild(P),e.appendChild(Et($+I/2,a-12,d.m.slice(5),"middle","#9aa3b2",12))});const u=r+h-T/l*h,m=ot("line");m.setAttribute("x1",i),m.setAttribute("x2",i+f),m.setAttribute("y1",u),m.setAttribute("y2",u),m.setAttribute("stroke","#93c5fd"),m.setAttribute("stroke-dasharray","5,5"),e.appendChild(m),e.appendChild(Et(i+f-6,u-6,"Monthly target "+Ct(O(t,T)),"end","#cfe4ff",16));const c=document.getElementById("glidePill");c&&(y<=0?(c.textContent="On track ✔",c.classList.add("ok")):(c.textContent="From now: need "+Ct(O(t,C))+" SEK / month",c.classList.remove("ok")))}function Ct(t){return Math.round(t).toLocaleString("sv-SE")}const ct=t=>document.createElementNS("http://www.w3.org/2000/svg",t),St=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=ct("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function Qt(t,s){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const o=760,a=320,i=110,n=20,r=20,v=40,f=o-i-n,h=a-r-v,g=N(t,s),b=t.months[s].income||0,M=[{lab:"Income",val:b,c:"#60a5fa"},{lab:"Budget",val:g.bTotal,c:"#3b82f6"},{lab:"Actual",val:g.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,b-g.aTotal),c:"#34d399"}],E=Math.max(...M.map(y=>y.val),1),S=h/M.length*.55;M.forEach((y,C)=>{const T=r+C*(h/M.length)+(h/M.length-S)/2,A=y.val/E*f,l=ct("rect");l.setAttribute("x",i),l.setAttribute("y",T),l.setAttribute("width",A),l.setAttribute("height",S),l.setAttribute("fill",y.c),e.appendChild(l),e.appendChild(St(i-10,T+S/2+4,y.lab,"end","#cbd5e1",16)),e.appendChild(St(i+A+6,T+S/2+4,te(O(t,y.val)),"start","#cbd5e1",16))});const w=ct("line");w.setAttribute("x1",i),w.setAttribute("x2",i),w.setAttribute("y1",r),w.setAttribute("y2",r+h),w.setAttribute("stroke","#243049"),e.appendChild(w)}function te(t){return Math.round(t).toLocaleString("sv-SE")}const dt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=dt("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function ee(t,s){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=700,i=280,n=40,r=30,v=60,f=o-i-n,h=a-r-v,g=N(t,s),b=Object.keys(B).map(y=>({p:y,v:g.aParents[y]||0})).sort((y,C)=>C.v-y.v),M=b.reduce((y,C)=>y+C.v,0)||1,E=b.length,S=h/E*.75;b.forEach((y,C)=>{const T=r+C*(h/E)+(h/E-S)/2,A=y.v/M*f,l=t.highlightedCategory===y.p,I=l?"#f59e0b":"#3b82f6",u=t.highlightedCategory&&!l?.3:1,m=dt("rect");m.setAttribute("x",i),m.setAttribute("y",T),m.setAttribute("width",A),m.setAttribute("height",S),m.setAttribute("fill",I),m.setAttribute("opacity",u),l&&m.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(m);const c=t.highlightedCategory&&!l?.5:1,d=(t.icons[y.p]||"")+" "+y.p,p=Tt(i-16,T+S/2+6,d,"end","#cbd5e1",15);p.setAttribute("opacity",c),e.appendChild(p);const x=Tt(i+A+12,T+S/2+6,(y.v/M*100).toFixed(1)+"%  ·  "+ne(O(t,y.v))+" SEK","start","#cbd5e1",14);x.setAttribute("opacity",c),e.appendChild(x)});const w=dt("line");w.setAttribute("x1",i),w.setAttribute("x2",i),w.setAttribute("y1",r),w.setAttribute("y2",r+h),w.setAttribute("stroke","#243049"),e.appendChild(w)}function ne(t){return Math.round(t).toLocaleString("sv-SE")}const Q=t=>document.createElementNS("http://www.w3.org/2000/svg",t),$t=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=Q("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function ie(t,s){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=460,i=260,n=40,r=20,v=60,f=o-i-n,h=a-r-v,g=N(t,s),b=Object.keys(B).map(C=>({p:C,b:g.bParents[C]||0,a:g.aParents[C]||0})).sort((C,T)=>T.a-C.a),M=b.length,E=h/M,S=E*.35,w=Math.max(...b.map(C=>Math.max(C.a,C.b)),1);b.forEach((C,T)=>{const A=r+T*E+E/2,l=C.b/w*f,I=C.a/w*f,u=t.highlightedCategory===C.p,m=u?"#f59e0b":"#3b82f6",c=u?"#f97316":"#10b981",d=t.highlightedCategory&&!u?.3:1,p=t.highlightedCategory&&!u?.5:1,x=Q("rect");x.setAttribute("x",i),x.setAttribute("y",A-S-3),x.setAttribute("width",l),x.setAttribute("height",S),x.setAttribute("fill",m),x.setAttribute("opacity",d),u&&x.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(x);const $=Q("rect");$.setAttribute("x",i),$.setAttribute("y",A+3),$.setAttribute("width",I),$.setAttribute("height",S),$.setAttribute("fill",c),$.setAttribute("opacity",d),u&&$.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild($);const L=(t.icons[C.p]||"")+" "+C.p,k=$t(i-14,A+4,L,"end","#cbd5e1",14);k.setAttribute("opacity",p),e.appendChild(k);const P=$t(i+Math.max(l,I)+10,A+4,"B "+It(O(t,C.b))+"  A "+It(O(t,C.a)),"start","#cbd5e1",12);P.setAttribute("opacity",p),e.appendChild(P)});const y=Q("line");y.setAttribute("x1",i),y.setAttribute("x2",i),y.setAttribute("y1",r),y.setAttribute("y2",r+h),y.setAttribute("stroke","#243049"),e.appendChild(y)}function It(t){return Math.round(t).toLocaleString("sv-SE")}const Ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=Ht("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function se(t,s){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=440,i=260,n=40,r=20,v=40,f=o-i-n,h=a-r-v,g=s.slice(0,4);t.order.filter(u=>u.slice(0,4)===g||u.slice(0,4)===(parseInt(g)+1).toString());const b=[];for(let u=9;u<=12;u++){const m=`${g}-${u.toString().padStart(2,"0")}`;b.push(m)}const M=(parseInt(g)+1).toString();for(let u=1;u<=8;u++){const m=`${M}-${u.toString().padStart(2,"0")}`;b.push(m)}const E=Object.keys(B),S=b.length,w=[],y=[];E.forEach(u=>{const m=[];b.forEach(c=>{const d=N(t,c),p=d.bParents[u]||0,x=d.aParents[u]||0,$=p?(x-p)/p:0;m.push({p:u,b:p,a:x,v:$,m:c}),y.push($)}),w.push(m)});const C=Math.min(...y),T=Math.max(...y),A=f/S,l=h/E.length;function I(u){const m=u<=0?150:0,c=u<=0?C===0?1:-C:T===0?1:T,p=30+30*Math.min(1,Math.abs(u)/c||0);return`hsl(${m},70%,${p}%)`}w.forEach((u,m)=>{u.forEach((d,p)=>{const x=Ht("rect");x.setAttribute("x",i+p*A),x.setAttribute("y",r+m*l),x.setAttribute("width",A-2),x.setAttribute("height",l-2),x.setAttribute("fill",I(d.v)),t.highlightedCategory&&d.p===t.highlightedCategory&&(x.setAttribute("stroke","#3b82f6"),x.setAttribute("stroke-width","3")),x.addEventListener("mouseenter",$=>{const L=document.getElementById("tooltip"),k=d.a-d.b,P=k>=0?"+":"";L.innerHTML=`<div><b>${d.p}</b> · <span class='t'>${d.m}</span></div>
                        <div>Budget: <b>${st(O(t,d.b))}</b> SEK</div>
                        <div>Actual: <b>${st(O(t,d.a))}</b> SEK</div>
                        <div>Variance: <b>${P+st(O(t,k))}</b> (${d.b?(k/d.b*100).toFixed(1):"0.0"}%)</div>`,L.style.left=$.clientX+12+"px",L.style.top=$.clientY+12+"px",L.style.display="block"}),x.addEventListener("mousemove",$=>{const L=document.getElementById("tooltip");L.style.left=$.clientX+12+"px",L.style.top=$.clientY+12+"px"}),x.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(x)});const c=(t.icons[E[m]]||"")+" "+E[m];e.appendChild(Mt(i-14,r+m*l+l/2+4,c,"end",t.highlightedCategory===E[m]?"#ffffff":"#cbd5e1",18))}),b.forEach((u,m)=>e.appendChild(Mt(i+m*A+A/2,a-12,u.slice(5),"middle","#9aa3b2",16)))}function st(t){return Math.round(t).toLocaleString("sv-SE")}const U=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Y=(t,s,e,o="start",a="#cbd5e1",i=12)=>{const n=U("text");return n.setAttribute("x",t),n.setAttribute("y",s),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",i),n.textContent=e,n};function re(t,s){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=Yt(t,s);if(!o){e.appendChild(Y(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const a=1200,i=420,n=80,r=40,v=30,f=60,h=a-n-r,g=i-v-f,b=N(t,s),M=N(t,o),E=M.aTotal,S=b.aTotal,w=Object.keys(B).map(p=>({p,icon:t.icons[p]||"",delta:(b.aParents[p]||0)-(M.aParents[p]||0)})).sort((p,x)=>Math.abs(x.delta)-Math.abs(p.delta)),y=w.slice(0,Math.min(10,w.length)),C=w.slice(y.length).reduce((p,x)=>p+x.delta,0);Math.abs(C)>.5&&y.push({p:"Others",icon:"",delta:C});const T=h/(y.length+3),A=v+g;let l=n+T;function I(p){const x=Math.max(E,S,Math.max(...y.map($=>Math.abs($.delta)))+Math.max(E,S));return v+g-p/x*g}const u=U("rect");u.setAttribute("x",l-24),u.setAttribute("y",I(E)),u.setAttribute("width",48),u.setAttribute("height",A-I(E)),u.setAttribute("fill","#64748b"),e.appendChild(u),e.appendChild(Y(l,i-18,"Start","middle","#9aa3b2",16)),e.appendChild(Y(l,I(E)-6,rt(O(t,E)),"middle","#cbd5e1",16));let m=E;l+=T,y.forEach(p=>{const x=p.delta,$=x>=0,L=I(m),k=I(m+x),P=Math.min(L,k),nt=Math.abs(k-L);let D=$?"#ef4444":"#10b981",z=1;t.highlightedCategory&&(p.p===t.highlightedCategory?(D=$?"#dc2626":"#059669",z=1):z=.3);const j=U("rect");j.setAttribute("x",l-24),j.setAttribute("y",P),j.setAttribute("width",48),j.setAttribute("height",nt),j.setAttribute("fill",D),j.setAttribute("opacity",z),e.appendChild(j);const it=(p.icon?p.icon+" ":"")+p.p;e.appendChild(Y(l,i-18,it.length>14?it.slice(0,14)+"…":it,"middle",t.highlightedCategory===p.p?"#ffffff":"#9aa3b2",16));const Vt=($?"+":"")+rt(O(t,x));e.appendChild(Y(l,P-6,Vt,"middle",t.highlightedCategory===p.p?"#ffffff":"#cbd5e1",16)),m+=x,l+=T});const c=U("rect");c.setAttribute("x",l-24),c.setAttribute("y",I(S)),c.setAttribute("width",48),c.setAttribute("height",A-I(S)),c.setAttribute("fill","#64748b"),e.appendChild(c),e.appendChild(Y(l,i-18,"End","middle","#9aa3b2",16)),e.appendChild(Y(l,I(S)-6,rt(O(t,S)),"middle","#cbd5e1",16));const d=U("line");d.setAttribute("x1",n*.6),d.setAttribute("x2",a-r),d.setAttribute("y1",A),d.setAttribute("y2",A),d.setAttribute("stroke","#243049"),e.appendChild(d)}function rt(t){return Math.round(t).toLocaleString("sv-SE")}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function _(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=H("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Lt(t,s,e,o){const a=t.querySelector("defs")||t.appendChild(H("defs")),i=H("linearGradient");i.setAttribute("id",s),i.setAttribute("x1","0%"),i.setAttribute("y1","0%"),i.setAttribute("x2","0%"),i.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=H("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),i.appendChild(n),i.appendChild(r),a.appendChild(i),`url(#${s})`}function ae(t,s){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,i={top:40,right:60,bottom:60,left:80},n=o-i.left-i.right,r=a-i.top-i.bottom,v=s.slice(0,4),f=parseInt(s.slice(5,7)),h=[];for(let u=11;u>=0;u--){let m=f-u,c=parseInt(v);m<=0&&(m+=12,c-=1);const d=`${c}-${m.toString().padStart(2,"0")}`;t.months[d]&&h.push({key:d,label:d.slice(5,7),data:N(t,d)})}if(h.length===0)return;const g=Math.max(...h.map(u=>u.data.aTotal)),b=n/(h.length-1),M=r/g,E=Lt(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),S=Lt(e,"trendLine","#3b82f6","#1d4ed8"),w=H("rect");w.setAttribute("x",i.left),w.setAttribute("y",i.top),w.setAttribute("width",n),w.setAttribute("height",r),w.setAttribute("fill","rgba(15, 23, 42, 0.5)"),w.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),w.setAttribute("rx",8),e.appendChild(w);for(let u=0;u<=5;u++){const m=i.top+r/5*u,c=H("line");c.setAttribute("x1",i.left),c.setAttribute("y1",m),c.setAttribute("x2",i.left+n),c.setAttribute("y2",m),c.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),c.setAttribute("stroke-width",1),c.setAttribute("stroke-dasharray","2,2"),e.appendChild(c);const d=g-g/5*u,p=_(i.left-10,m+4,Z(d),"end","#94a3b8",14);e.appendChild(p)}let y=`M ${i.left} ${i.top+r}`,C="M";h.forEach((u,m)=>{const c=i.left+m*b,d=i.top+r-u.data.aTotal*M;m===0?(C+=` ${c} ${d}`,y+=` L ${c} ${d}`):(C+=` L ${c} ${d}`,y+=` L ${c} ${d}`)}),y+=` L ${i.left+(h.length-1)*b} ${i.top+r} Z`;const T=H("path");T.setAttribute("d",y),T.setAttribute("fill",E),T.setAttribute("opacity","0"),e.appendChild(T);const A=H("path");A.setAttribute("d",C),A.setAttribute("fill","none"),A.setAttribute("stroke",S),A.setAttribute("stroke-width",3),A.setAttribute("stroke-linecap","round"),A.setAttribute("stroke-linejoin","round"),A.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),A.style.strokeDasharray=A.getTotalLength(),A.style.strokeDashoffset=A.getTotalLength(),e.appendChild(A),h.forEach((u,m)=>{const c=i.left+m*b,d=i.top+r-u.data.aTotal*M,p=H("circle");p.setAttribute("cx",c),p.setAttribute("cy",d),p.setAttribute("r",6),p.setAttribute("fill","rgba(15, 23, 42, 0.9)"),p.setAttribute("stroke","#3b82f6"),p.setAttribute("stroke-width",2),p.setAttribute("opacity","0"),e.appendChild(p);const x=H("circle");x.setAttribute("cx",c),x.setAttribute("cy",d),x.setAttribute("r",4),x.setAttribute("fill","#3b82f6"),x.setAttribute("opacity","0"),x.style.cursor="pointer",e.appendChild(x);const $=_(c,i.top+r+20,u.label,"middle","#94a3b8",14);e.appendChild($),x.addEventListener("mouseenter",()=>{x.setAttribute("r",6),x.setAttribute("fill","#1d4ed8"),p.setAttribute("opacity","1");const L=document.getElementById("tooltip");L&&(L.style.display="block",L.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${u.label}</div>
          <div>Total Spending: ${Z(u.data.aTotal)} SEK</div>
          <div>Budget: ${Z(u.data.bTotal)} SEK</div>
          <div>Variance: ${Z(u.data.aTotal-u.data.bTotal)} SEK</div>
        `)}),x.addEventListener("mouseleave",()=>{x.setAttribute("r",4),x.setAttribute("fill","#3b82f6"),p.setAttribute("opacity","0");const L=document.getElementById("tooltip");L&&(L.style.display="none")}),x.addEventListener("mousemove",L=>{const k=document.getElementById("tooltip");k&&(k.style.left=L.pageX+10+"px",k.style.top=L.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{T.style.transition="opacity 1s ease-out",T.setAttribute("opacity","1")},200),setTimeout(()=>{A.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",A.style.strokeDashoffset="0"},400),setTimeout(()=>{h.forEach((u,m)=>{setTimeout(()=>{const c=e.querySelectorAll("circle"),d=m*2+2;c[d]&&(c[d].style.transition="opacity 0.3s ease-out",c[d].setAttribute("opacity","1")),c[d+1]&&(c[d+1].style.transition="opacity 0.3s ease-out",c[d+1].setAttribute("opacity","1"))},m*100)})},1e3)});const l=_(o/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(l);const I=_(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");I.setAttribute("transform",`rotate(-90, 20, ${a/2})`),e.appendChild(I)}function Z(t){return Math.round(t).toLocaleString("sv-SE")}function R(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t,s,e,o="start",a="#cbd5e1",i=12,n="normal"){const r=R("text");return r.setAttribute("x",t),r.setAttribute("y",s),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",i),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function oe(t,s){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,i=60,n=20,r=40,v=60,f=o-i-n,h=a-r-v,g=s.slice(0,4);t.order.filter(c=>c.slice(0,4)===g||c.slice(0,4)===(parseInt(g)+1).toString());const b=[];for(let c=9;c<=12;c++){const d=`${g}-${c.toString().padStart(2,"0")}`;b.push(d)}const M=(parseInt(g)+1).toString();for(let c=1;c<=8;c++){const d=`${M}-${c.toString().padStart(2,"0")}`;b.push(d)}if(b.length===0)return;const E=b.map(c=>{const d=t.months[c]&&t.months[c].income||0,p=t.months[c]?N(t,c).aTotal:0;return{month:c,income:d,expenses:p}}),S=Math.max(...E.map(c=>Math.max(c.income,c.expenses))),w=Math.min(0,...E.map(c=>Math.min(c.income,c.expenses))),y=c=>r+h-(c-w)/(S-w)*h,C=c=>i+c/(b.length-1)*f,T=y(0);e.appendChild(R("line")).setAttributes({x1:i,y1:T,x2:i+f,y2:T,stroke:"#374151","stroke-width":1}),e.appendChild(R("line")).setAttributes({x1:i,y1:r,x2:i,y2:r+h,stroke:"#374151","stroke-width":1}),b.forEach((c,d)=>{const p=C(d);e.appendChild(W(p,T+20,c.slice(0,7),"middle","#94a3b8",14))});const A=5;for(let c=0;c<=A;c++){const d=w+c/A*(S-w),p=y(d);e.appendChild(W(i-10,p+5,ce(d),"end","#94a3b8",14)),e.appendChild(R("line")).setAttributes({x1:i,y1:p,x2:i+f,y2:p,stroke:"#374151","stroke-dasharray":"2,2","stroke-width":.5})}const l=R("path");let I=`M${C(0)},${y(E[0].income)}`;for(let c=1;c<E.length;c++)I+=`L${C(c)},${y(E[c].income)}`;l.setAttribute("d",I),l.setAttribute("fill","none"),l.setAttribute("stroke","#3b82f6"),l.setAttribute("stroke-width",3),e.appendChild(l);const u=R("path");let m=`M${C(0)},${y(E[0].expenses)}`;for(let c=1;c<E.length;c++)m+=`L${C(c)},${y(E[c].expenses)}`;u.setAttribute("d",m),u.setAttribute("fill","none"),u.setAttribute("stroke","#ef4444"),u.setAttribute("stroke-width",3),e.appendChild(u),E.forEach((c,d)=>{e.appendChild(R("circle")).setAttributes({cx:C(d),cy:y(c.income),r:4,fill:"#3b82f6",stroke:"#0a0e1a","stroke-width":2}),e.appendChild(R("circle")).setAttributes({cx:C(d),cy:y(c.expenses),r:4,fill:"#ef4444",stroke:"#0a0e1a","stroke-width":2})}),e.appendChild(W(i,r-15,"Monthly Income vs. Expenses","start","#f8fafc",18,"600")),e.appendChild(R("rect")).setAttributes({x:i+300,y:r-25,width:15,height:15,fill:"#3b82f6"}),e.appendChild(W(i+320,r-15,"Income","start","#f8fafc",14)),e.appendChild(R("rect")).setAttributes({x:i+400,y:r-25,width:15,height:15,fill:"#ef4444"}),e.appendChild(W(i+420,r-15,"Expenses","start","#f8fafc",14))}function ce(t){return Math.round(t).toLocaleString("sv-SE")}SVGElement.prototype.setAttributes=function(t){for(var s in t)this.setAttribute(s,t[s]);return this};let F=zt();F.highlightedCategory=null;const de=document.getElementById("app");de.innerHTML=`
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
`;Dt(F,et);Rt(F,tt());Jt();mt();Nt(F,tt());ut(F,et);window.state=F;window.drawAll=mt;window.monthTotals=t=>N(F,t);function tt(){return F.order[F.order.length-1]}function et(){lt(F),Rt(F,tt()),mt(),Nt(F,tt()),ut(F,et)}function Rt(t,s){const e=document.getElementById("kpiStrip");e.innerHTML="";const o=N(t,s),a=t.months[s].income||0,i=O(t,a-o.aTotal),n=a>0?(a-o.aTotal)/a:0,r=o.bTotal>0?o.aTotal/o.bTotal:0,f=t.order.filter(g=>g.slice(0,4)===s.slice(0,4)&&g<=s).map(g=>(t.months[g].income||0)-N(t,g).aTotal).reduce((g,b)=>g+b,0);[{lab:"Monthly Savings (real SEK)",val:kt(i)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:kt(O(t,f))+" SEK"}].forEach(g=>{const b=document.createElement("div");b.className="kpi",b.innerHTML=`<div class="lab">${g.lab}</div><div class="val">${g.val}</div>`,b.onclick=()=>{F.highlightedCategory=g.lab,et()},e.appendChild(b)})}function mt(){const t=document.getElementById("monthSel").value;Xt(F,t),_t(F,t),Zt(F,t),Qt(F,t),ae(F,t),oe(F,t),ee(F,t),ie(F,t),se(F,t),re(F,t)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}
