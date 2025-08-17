(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const dt={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},lt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function ut(e){const i=[];for(let t=1;t<=12;t++)i.push(`${e}-${String(t).padStart(2,"0")}`);return i}function it(e,i){if(e.months[i])Object.keys(B).forEach(t=>{e.months[i].budget[t]||(e.months[i].budget[t]={},e.months[i].actual[t]={}),Object.keys(B[t]).forEach(o=>{e.months[i].budget[t][o]===void 0&&(e.months[i].budget[t][o]=B[t][o]),e.months[i].actual[t][o]===void 0&&(e.months[i].actual[t][o]=B[t][o])})}),e.months[i].income===void 0&&(e.months[i].income=e.defaultIncome||0);else{let t={},o={};Object.keys(B).forEach(a=>{t[a]={},o[a]={},Object.keys(B[a]).forEach(s=>{t[a][s]=B[a][s],o[a][s]=B[a][s]})}),e.months[i]={income:e.defaultIncome||0,budget:t,actual:o}}}const Mt="rohmee_budget_live",Lt=2,It=108e3;function Ft(){let e=localStorage.getItem(Mt);if(e)try{const t=JSON.parse(e);return t.version=t.version||0,Bt(t),(!t.order||!t.order.length)&&(t.order=ut(2025)),t.order.forEach(o=>it(t,o)),t.icons=t.icons||dt,t.tags=t.tags||lt,t}catch{}const i={defaultIncome:It,target:25e4,cpi:1,order:ut(2025),months:{},icons:dt,tags:lt,selected:null,version:Lt};return i.order.forEach(t=>it(i,t)),["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07"].forEach(t=>{const o=i.months[t];Object.keys(o.actual).forEach(a=>Object.keys(o.actual[a]).forEach(s=>{const n=o.budget[a][s],r=Math.random()*.2-.05;o.actual[a][s]=Math.max(0,Math.round(n*(1+r)))}))}),ot(i),i}function ot(e){localStorage.setItem(Mt,JSON.stringify(e))}function Ht(e){const i=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(i),t.download="rohmee_budget.json",t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}function Rt(e,i){const t=new FileReader;t.onload=()=>{try{const o=JSON.parse(t.result);Bt(o),ot(o),i(o)}catch{alert("Invalid JSON file")}},t.readAsText(e)}function Bt(e){e.version<2&&(e.defaultIncome=e.income||It,delete e.income,e.order&&e.order.forEach(i=>{const t=e.months[i];t&&t.income===void 0&&(t.income=e.defaultIncome)})),e.version=Lt}function N(e,i){it(e,i);const t=e.months[i],o=mt(t.budget),a=mt(t.actual);let s=0,n=0;return Object.keys(o).forEach(r=>{s+=o[r],n+=a[r]||0}),{bParents:o,aParents:a,bTotal:s,aTotal:n}}function zt(e,i){const t=e.order.indexOf(i);return t>0?e.order[t-1]:null}function P(e,i){return i/(e.cpi||1)}function jt(e){let i=0;return Object.keys(e).forEach(t=>i+=+e[t]||0),i}function mt(e){let i={};return Object.keys(e).forEach(t=>i[t]=jt(e[t])),i}function Kt(e,i){const t=document.getElementById("controls"),o=e.order[e.order.length-1];t.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="number" step="500" value="${e.months[o].income||0}">
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="number" step="10000" value="${e.target}">
      </div>
      <div>
        <label>CPI factor (real SEK toggle)</label>
        <input id="cpiFactor" type="number" step="0.01" value="${e.cpi}">
      </div>
      <div class="row">
        <button class="btn ghost" id="exportCSV">Export CSV</button>
        <button class="btn" id="saveJSON">Save JSON</button>
        <label for="loadJsonInput" class="chip">Load JSON</label>
        <input id="loadJsonInput" type="file" accept="application/json" style="display:none">
      </div>
      <div class="help" style="color:var(--muted)">Tip: double‑click names to rename; +/− to add/remove; click parent to highlight; ▸ to collapse/expand; F/V to toggle fixed vs variable.</div>
    </div>
  `;const a=t.querySelector("#monthSel");e.order.forEach(n=>{const r=document.createElement("option");r.value=n,r.textContent=n,a.appendChild(r)}),a.value=o;const s=t.querySelector("#netIncome");a.addEventListener("change",n=>{s.value=e.months[a.value].income||0,i()}),s.addEventListener("input",n=>{e.months[a.value].income=+n.target.value||0,i()}),t.querySelector("#savTarget").addEventListener("input",n=>{e.target=+n.target.value||0,i()}),t.querySelector("#cpiFactor").addEventListener("input",n=>{e.cpi=+n.target.value||1,i()}),t.querySelector("#saveJSON").addEventListener("click",()=>Ht(e)),t.querySelector("#loadJsonInput").addEventListener("change",n=>{const r=n.target.files[0];r&&Rt(r,h=>{Object.assign(e,h),i()})}),t.querySelector("#exportCSV").addEventListener("click",()=>{const n=[["Month","Parent","Sub","Budget","Actual"]];e.order.forEach(b=>{const f=e.months[b];Object.keys(f.budget).forEach(w=>Object.keys(f.budget[w]).forEach(E=>{n.push([b,w,E,f.budget[w][E],f.actual[w][E]])}))});const r=n.map(b=>b.map(f=>`"${String(f).replace('"','""')}"`).join(",")).join(`
`),h=document.createElement("a");h.href=URL.createObjectURL(new Blob([r],{type:"text/csv"})),h.download="budget.csv",h.click(),setTimeout(()=>URL.revokeObjectURL(h.href),1e3)})}let q={};function Z(e,i){const t=document.getElementById("monthSel").value,o=document.querySelector("#dataTable tbody");o.innerHTML="";const a=e.months[t];Object.keys(B).forEach(n=>{const r=ht(a.budget[n]||{}),h=ht(a.actual[n]||{}),b=document.createElement("tr");b.className="parent"+(h>r?" over":"");const f=document.createElement("td"),w=document.createElement("span");w.textContent=q[n]?"▾":"▸",w.className="toggle",w.title="Collapse/expand",w.onclick=()=>{q[n]=!q[n],Z(e,i)};const E=document.createElement("span");E.className="icon",E.textContent=e.icons[n]||"",E.title="Click to set emoji",E.style.cursor="pointer",E.onclick=()=>{const c=prompt("Set emoji for "+n+":",e.icons[n]||"");c&&(e.icons[n]=c,i&&i())};const L=document.createElement("span");L.textContent=n,L.style.cursor="pointer",L.ondblclick=()=>{const c=prompt("Rename parent:",n);!c||B[c]||(B[c]=B[n],delete B[n],e.icons[c]=e.icons[n],delete e.icons[n],e.tags[c]=e.tags[n],delete e.tags[n],e.order.forEach(x=>{const l=e.months[x];l.budget[c]=l.budget[n],l.actual[c]=l.actual[n],delete l.budget[n],delete l.actual[n]}),i&&i())},b.onclick=c=>{c.target.closest(".rowtools")||c.target.closest(".toggle")||c.target.closest(".icon")||(e.highlightedCategory===n?e.highlightedCategory=null:e.highlightedCategory=n,i&&i())},e.highlightedCategory===n&&(b.style.background="rgba(59, 130, 246, 0.2)",b.style.borderLeft="4px solid #3b82f6");const M=document.createElement("span");M.className="rowtools";const $=document.createElement("span");$.className="chip",$.textContent=e.tags[n]==="F"?"Fixed":"Variable",$.title="Toggle Fixed/Variable",$.onclick=()=>{e.tags[n]=e.tags[n]==="F"?"V":"F",i&&i()};const A=document.createElement("span");A.className="chip",A.textContent="+",A.title="Add subcategory",A.onclick=()=>{const c=prompt("New subcategory under "+n+":");c&&(B[n][c]=0,e.order.forEach(x=>{const l=e.months[x];l.budget[n][c]=0,l.actual[n][c]=0}),i&&i())};const y=document.createElement("span");y.className="chip",y.textContent="−",y.title="Delete parent",y.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete e.icons[n],delete e.tags[n],e.order.forEach(c=>{const x=e.months[c];delete x.budget[n],delete x.actual[n]}),i&&i())},M.appendChild($),M.appendChild(A),M.appendChild(y),f.appendChild(w),f.appendChild(E),f.appendChild(L),f.appendChild(M),b.appendChild(f);const C=document.createElement("td");C.className="num",C.textContent=U(P(e,r)),b.appendChild(C);const S=document.createElement("td");S.className="num",S.textContent=U(P(e,h)),b.appendChild(S);const v=document.createElement("td");v.className="num",v.textContent=U(P(e,r-h)),b.appendChild(v),o.appendChild(b),q[n]&&Object.keys(B[n]).forEach(c=>{const x=document.createElement("tr");(a.actual[n]||{})[c]>(a.budget[n]||{})[c]&&(x.className="over");const l=document.createElement("td"),m=document.createElement("span");m.textContent="• "+c,m.title="Double-click to rename",m.style.cursor="text",m.ondblclick=()=>{const T=prompt("Rename subcategory:",c);T&&(B[n][T]=B[n][c],delete B[n][c],e.order.forEach(I=>{const k=e.months[I];k.budget[n][T]=k.budget[n][c],k.actual[n][T]=k.actual[n][c],delete k.budget[n][c],delete k.actual[n][c]}),i&&i())},l.appendChild(m);const p=document.createElement("span");p.className="chip",p.textContent="−",p.title="Delete subcategory",p.style.marginLeft="8px",p.onclick=()=>{confirm("Delete "+c+"?")&&(delete B[n][c],e.order.forEach(T=>{const I=e.months[T];delete I.budget[n][c],delete I.actual[n][c]}),i&&i())},l.appendChild(p),x.appendChild(l);const d=document.createElement("td");d.className="num",d.appendChild(pt(e,t,n,c,"budget",(a.budget[n]||{})[c]||0,i)),x.appendChild(d);const u=document.createElement("td");u.className="num",u.appendChild(pt(e,t,n,c,"actual",(a.actual[n]||{})[c]||0,i)),x.appendChild(u);const g=document.createElement("td");g.className="num",g.textContent=U(P(e,((a.budget[n]||{})[c]||0)-((a.actual[n]||{})[c]||0))),x.appendChild(g),o.appendChild(x)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},e.icons[n]="📦",e.tags[n]="V",e.order.forEach(r=>{const h=e.months[r];h.budget[n]={},h.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function pt(e,i,t,o,a,s,n){const r=document.createElement("input");r.type="number",r.value=s,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const h=b=>{const f=+r.value||0;e.months[i][a][t][o]=f,n&&n()};return r.addEventListener("keydown",b=>{b.key==="Enter"?(h(b.shiftKey?"up":"down"),b.preventDefault()):b.key==="Escape"&&(r.value=s,r.blur())}),r.addEventListener("blur",()=>h()),r}function ht(e){let i=0;return Object.keys(e).forEach(t=>i+=+e[t]||0),i}function U(e){return Math.round(e).toLocaleString("sv-SE")}class Vt{constructor(i){this.state=i}generateInsights(i){const t=[],o=this.getRecentMonths(i,6);if(o.length<3)return t;const a=this.analyzeTrend(o);a&&t.push(a);const s=this.analyzeBudgetVariance(o);s&&t.push(s);const n=this.analyzeCategorySpending(o);t.push(...n);const r=this.analyzeSavingsRate(o);r&&t.push(r);const h=this.analyzeSeasonalPatterns(i);return h&&t.push(h),t.slice(0,8)}getRecentMonths(i,t){const o=parseInt(i.slice(0,4)),a=parseInt(i.slice(5,7)),s=[];for(let n=0;n<t;n++){let r=a-n,h=o;r<=0&&(r+=12,h-=1);const b=`${h}-${r.toString().padStart(2,"0")}`;this.state.months[b]&&s.unshift({key:b,data:N(this.state,b),income:this.state.months[b].income||0})}return s}analyzeTrend(i){if(i.length<3)return null;const t=this.calculateTrend(i.map(a=>a.data.aTotal)),o=i.reduce((a,s)=>a+s.data.aTotal,0)/i.length;if(Math.abs(t)<o*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(t>0){const a=t/o*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(t/o*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const t=i[i.length-1],o=t.data.aTotal-t.data.bTotal,a=o/t.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:o>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(o)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(o))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const t=[],o=i[i.length-1];if(i.length>=2){const a=i[i.length-2];Object.keys(o.data.aParents).forEach(s=>{const n=o.data.aParents[s]||0,r=a.data.aParents[s]||0;if(r>0){const h=(n-r)/r*100;if(Math.abs(h)>20&&Math.abs(n-r)>1e3){const b=this.getCategoryIcon(s);h>0?t.push({type:"warning",category:"spending",title:`${s} Spending Increased`,message:`${s} spending increased by ${h.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:h>50?"high":"medium",icon:b,recommendation:`Review your ${s.toLowerCase()} expenses and look for ways to optimize.`}):t.push({type:"positive",category:"spending",title:`${s} Spending Decreased`,message:`Great! ${s} spending decreased by ${Math.abs(h).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:b})}}})}return t.slice(0,3)}analyzeSavingsRate(i){const t=i[i.length-1],o=t.income>0?(t.income-t.data.aTotal)/t.income*100:0;return o<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${o.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:o>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${o.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${o.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const t=parseInt(i.slice(5,7));return t===11||t===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:t>=6&&t<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const t=i.length,o=t*(t-1)/2,a=i.reduce((r,h)=>r+h,0),s=i.reduce((r,h,b)=>r+b*h,0),n=i.reduce((r,h,b)=>r+b*b,0);return(t*s-o*a)/(t*n-o*o)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const t=[],o=this.getRecentMonths(i,3);if(o.length===0)return t;const a=o[o.length-1],r=o.reduce((b,f)=>b+f.data.aTotal,0)/o.length*6;if(t.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const b=(a.income-a.data.aTotal)*.7;t.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(b)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return t}}function kt(e,i){const t=document.getElementById("insightsPanel");if(!t)return;const o=new Vt(e),a=o.generateInsights(i),s=o.generateRecommendations(i);if(t.innerHTML="",a.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,t.appendChild(n);const r=document.getElementById("insightsGrid");a.forEach((h,b)=>{const f=Gt(h);r.appendChild(f)})}if(s.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,t.appendChild(n);const r=document.getElementById("recommendationsList");s.forEach((h,b)=>{const f=Yt(h);r.appendChild(f)})}requestAnimationFrame(()=>{t.querySelectorAll(".insight-card, .recommendation-card").forEach((r,h)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},h*100)})})}function Gt(e,i){const t=document.createElement("div");t.className=`insight-card insight-${e.type} insight-${e.impact}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[e.impact]||{text:"",color:"var(--text-muted)"};return t.innerHTML=`
    <div class="insight-header">
      <div class="insight-icon-wrapper">
        <span class="insight-emoji">${e.icon}</span>
      </div>
      <div class="insight-meta">
        <h4 class="insight-title">${e.title}</h4>
        ${a.text?`<span class="insight-badge" style="color: ${a.color}">${a.text}</span>`:""}
      </div>
    </div>
    <p class="insight-message">${e.message}</p>
    ${e.recommendation?`
      <div class="insight-recommendation">
        <span class="recommendation-label">💡 Recommendation:</span>
        <p>${e.recommendation}</p>
      </div>
    `:""}
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateY(-4px)",t.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),t.addEventListener("mouseleave",()=>{t.style.transform="translateY(0)",t.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),t}function Yt(e,i){const t=document.createElement("div");t.className=`recommendation-card recommendation-${e.priority}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return t.innerHTML=`
    <div class="recommendation-header">
      <span class="recommendation-icon">${e.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${e.title}</h4>
        <span class="recommendation-priority" style="color: ${o[e.priority]}">
          ${e.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${e.message}</p>
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateX(8px)",t.style.borderLeftColor=o[e.priority]}),t.addEventListener("mouseleave",()=>{t.style.transform="translateX(0)",t.style.borderLeftColor="var(--panel-border)"}),t}function Dt(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function G(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function Y(e,i,t,o="start",a="#cbd5e1",s=12,n="normal"){const r=G("text");return r.setAttribute("x",e),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=t,r}function bt(e,i,t,o){const a=e.querySelector("defs")||e.appendChild(G("defs")),s=G("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=G("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",t);const r=G("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function qt(e,i){const t=document.getElementById("ytdGauge");for(;t.firstChild;)t.removeChild(t.firstChild);const o=i.slice(0,4),s=e.order.filter(u=>u.slice(0,4)===o&&u<=i).map(u=>Math.max(0,(e.months[u].income||0)-N(e,u).aTotal)).reduce((u,g)=>u+g,0),n=e.target||0,r=n>0?Math.min(1,s/n):0,h=bt(t,"gaugeProgress","#10b981","#059669"),b=bt(t,"gaugeBg","#1e293b","#0f172a"),f=Y(380,120,"0%","middle","#10b981",120,"900");t.appendChild(f);const w=Y(380,180,`${gt(P(e,s))} SEK`,"middle","#f8fafc",48,"700");t.appendChild(w);const E=Y(380,220,`of ${gt(P(e,n))} SEK target`,"middle","#94a3b8",32,"500");t.appendChild(E);const L=r>=1?"#10b981":r>=.8?"#f59e0b":"#ef4444",M=r>=1?"✓ Target Achieved":r>=.8?"⚡ On Track":"⚠ Behind Target",$=Y(380,260,M,"middle",L,36,"600");t.appendChild($);const A=400,y=20,C=380-A/2,S=280,v=G("rect");v.setAttribute("x",C),v.setAttribute("y",S),v.setAttribute("width",A),v.setAttribute("height",y),v.setAttribute("fill",b),v.setAttribute("rx",10),v.setAttribute("opacity","0.3"),t.appendChild(v);const c=G("rect");c.setAttribute("x",C),c.setAttribute("y",S),c.setAttribute("width",0),c.setAttribute("height",y),c.setAttribute("fill",h),c.setAttribute("rx",10),c.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),c.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("width",A*r)},100)}),["0%","25%","50%","75%","100%"].forEach((u,g)=>{const T=C+A*g/4,I=Y(T,S+40,u,"middle","#64748b",18,"500");t.appendChild(I)});let l=0;const m=Math.round(r*100),p=m/60;function d(){l<m&&(l+=p,f.textContent=Math.round(Math.min(l,m))+"%",requestAnimationFrame(d))}setTimeout(d,200)}function gt(e){return Math.round(e).toLocaleString("sv-SE")}function z(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function K(e,i,t,o="start",a="#cbd5e1",s=12,n="normal"){const r=z("text");return r.setAttribute("x",e),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=t,r}function ft(e,i,t,o){const a=e.querySelector("defs")||e.appendChild(z("defs")),s=z("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=z("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",t);const r=z("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function Ut(e,i){const t=document.getElementById("fixedVarMini");for(;t.firstChild;)t.removeChild(t.firstChild);const o=N(e,i);let a=0,s=0;Object.keys(o.aParents).forEach(j=>{e.tags[j]==="F"?a+=o.aParents[j]||0:s+=o.aParents[j]||0});const n=a+s||1,r=Math.round(a/n*100),h=Math.round(s/n*100),b=ft(t,"fixedGrad","#8b5cf6","#7c3aed"),f=ft(t,"variableGrad","#06b6d4","#0891b2"),w=200,E=K(w,120,"0%","middle","#8b5cf6",96,"900");t.appendChild(E);const L=K(w,170,"Fixed Expenses","middle","#8b5cf6",32,"600");t.appendChild(L);const M=K(w,210,`${vt(P(e,a))} SEK`,"middle","#a78bfa",28,"500");t.appendChild(M);const $=560,A=K($,120,"0%","middle","#06b6d4",96,"900");t.appendChild(A);const y=K($,170,"Variable Expenses","middle","#06b6d4",32,"600");t.appendChild(y);const C=K($,210,`${vt(P(e,s))} SEK`,"middle","#67e8f9",28,"500");t.appendChild(C);const S=240,v=30,c=500,x=380-c/2,l=c*(a/n),m=z("rect");m.setAttribute("x",x),m.setAttribute("y",S),m.setAttribute("width",0),m.setAttribute("height",v),m.setAttribute("fill",b),m.setAttribute("rx",15),m.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),m.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(m);const p=c*(s/n),d=z("rect");d.setAttribute("x",x+l),d.setAttribute("y",S),d.setAttribute("width",0),d.setAttribute("height",v),d.setAttribute("fill",f),d.setAttribute("rx",15),d.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),d.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(d);const u=z("rect");u.setAttribute("x",x),u.setAttribute("y",S),u.setAttribute("width",c),u.setAttribute("height",v),u.setAttribute("fill","#1e293b"),u.setAttribute("rx",15),u.setAttribute("opacity","0.3"),t.insertBefore(u,m),requestAnimationFrame(()=>{setTimeout(()=>{m.setAttribute("width",l)},200),setTimeout(()=>{d.setAttribute("x",x+l),d.setAttribute("width",p)},400)});const g=K(380,140,"VS","middle","#64748b",24,"600");t.appendChild(g);const T=z("line");T.setAttribute("x1",380),T.setAttribute("y1",60),T.setAttribute("x2",380),T.setAttribute("y2",230),T.setAttribute("stroke","#374151"),T.setAttribute("stroke-width",2),T.setAttribute("opacity","0.5"),t.appendChild(T);let I=0,k=0;const F=r/50,tt=h/50;function R(){(I<r||k<h)&&(I<r&&(I+=F,E.textContent=Math.round(Math.min(I,r))+"%"),k<h&&(k+=tt,A.textContent=Math.round(Math.min(k,h))+"%"),requestAnimationFrame(R))}setTimeout(R,300),m.style.cursor="pointer",d.style.cursor="pointer",m.addEventListener("mouseenter",()=>{m.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),m.addEventListener("mouseleave",()=>{m.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),d.addEventListener("mouseenter",()=>{d.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),d.addEventListener("mouseleave",()=>{d.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function vt(e){return Math.round(e).toLocaleString("sv-SE")}const st=e=>document.createElementNS("http://www.w3.org/2000/svg",e),yt=(e,i,t,o="start",a="#cbd5e1",s=12)=>{const n=st("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=t,n};function Wt(e,i){const t=document.getElementById("glidepath");for(;t.firstChild;)t.removeChild(t.firstChild);const o=760,a=320,s=60,n=20,r=20,h=50,b=o-s-n,f=a-r-h,w=i.slice(0,4),E=e.order.filter(d=>d.slice(0,4)===w),L=e.order.indexOf(i),M=e.order.filter(d=>d.slice(0,4)===w&&e.order.indexOf(d)<=L),$=M.map(d=>Math.max(0,(e.months[d].income||0)-N(e,d).aTotal)).reduce((d,u)=>d+u,0),A=12-M.length,y=Math.max(0,(e.target||0)-$),C=A>0?y/A:0,S=(e.target||0)/12,v=[];E.forEach(d=>{e.order.indexOf(d)<=L?v.push({m:d,v:Math.max(0,(e.months[d].income||0)-N(e,d).aTotal),t:"a"}):v.push({m:d,v:C,t:"r"})});const c=Math.max(S,...v.map(d=>d.v),1),x=b/E.length*.65;v.forEach((d,u)=>{const g=d.v/c*f,T=s+u*(b/E.length)+(b/E.length-x)/2,I=r+f-g,k=d.t==="a"?d.v>=S?"#10b981":"#ef4444":"#f59e0b",F=st("rect");F.setAttribute("x",T),F.setAttribute("y",I),F.setAttribute("width",x),F.setAttribute("height",g),F.setAttribute("fill",k),t.appendChild(F),t.appendChild(yt(T+x/2,a-16,d.m.slice(5),"middle","#9aa3b2",12))});const l=r+f-S/c*f,m=st("line");m.setAttribute("x1",s),m.setAttribute("x2",s+b),m.setAttribute("y1",l),m.setAttribute("y2",l),m.setAttribute("stroke","#93c5fd"),m.setAttribute("stroke-dasharray","5,5"),t.appendChild(m),t.appendChild(yt(s+b-6,l-6,"Monthly target "+xt(P(e,S)),"end","#cfe4ff",12));const p=document.getElementById("glidePill");p&&(y<=0?(p.textContent="On track ✔",p.classList.add("ok")):(p.textContent="From now: need "+xt(P(e,C))+" SEK / month",p.classList.remove("ok")))}function xt(e){return Math.round(e).toLocaleString("sv-SE")}const rt=e=>document.createElementNS("http://www.w3.org/2000/svg",e),At=(e,i,t,o="start",a="#cbd5e1",s=12)=>{const n=rt("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=t,n};function Jt(e,i){const t=document.getElementById("barSummary");for(;t.firstChild;)t.removeChild(t.firstChild);const o=760,a=320,s=110,n=20,r=20,h=40,b=o-s-n,f=a-r-h,w=N(e,i),E=e.months[i].income||0,L=[{lab:"Income",val:E,c:"#60a5fa"},{lab:"Budget",val:w.bTotal,c:"#3b82f6"},{lab:"Actual",val:w.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,E-w.aTotal),c:"#34d399"}],M=Math.max(...L.map(y=>y.val),1),$=f/L.length*.55;L.forEach((y,C)=>{const S=r+C*(f/L.length)+(f/L.length-$)/2,v=y.val/M*b,c=rt("rect");c.setAttribute("x",s),c.setAttribute("y",S),c.setAttribute("width",v),c.setAttribute("height",$),c.setAttribute("fill",y.c),t.appendChild(c),t.appendChild(At(s-10,S+$/2+4,y.lab,"end","#cbd5e1",12)),t.appendChild(At(s+v+6,S+$/2+4,Xt(P(e,y.val)),"start","#cbd5e1",12))});const A=rt("line");A.setAttribute("x1",s),A.setAttribute("x2",s),A.setAttribute("y1",r),A.setAttribute("y2",r+f),A.setAttribute("stroke","#243049"),t.appendChild(A)}function Xt(e){return Math.round(e).toLocaleString("sv-SE")}const at=e=>document.createElementNS("http://www.w3.org/2000/svg",e),wt=(e,i,t,o="start",a="#cbd5e1",s=12)=>{const n=at("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=t,n};function _t(e,i){const t=document.getElementById("shareBars");for(;t.firstChild;)t.removeChild(t.firstChild);const o=1200,a=700,s=280,n=40,r=30,h=60,b=o-s-n,f=a-r-h,w=N(e,i),E=Object.keys(B).map(y=>({p:y,v:w.aParents[y]||0})).sort((y,C)=>C.v-y.v),L=E.reduce((y,C)=>y+C.v,0)||1,M=E.length,$=f/M*.75;E.forEach((y,C)=>{const S=r+C*(f/M)+(f/M-$)/2,v=y.v/L*b,c=e.highlightedCategory===y.p,x=c?"#f59e0b":"#3b82f6",l=e.highlightedCategory&&!c?.3:1,m=at("rect");m.setAttribute("x",s),m.setAttribute("y",S),m.setAttribute("width",v),m.setAttribute("height",$),m.setAttribute("fill",x),m.setAttribute("opacity",l),c&&m.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),t.appendChild(m);const p=e.highlightedCategory&&!c?.5:1,d=(e.icons[y.p]||"")+" "+y.p,u=wt(s-16,S+$/2+6,d,"end","#cbd5e1",15);u.setAttribute("opacity",p),t.appendChild(u);const g=wt(s+v+12,S+$/2+6,(y.v/L*100).toFixed(1)+"%  ·  "+Zt(P(e,y.v))+" SEK","start","#cbd5e1",14);g.setAttribute("opacity",p),t.appendChild(g)});const A=at("line");A.setAttribute("x1",s),A.setAttribute("x2",s),A.setAttribute("y1",r),A.setAttribute("y2",r+f),A.setAttribute("stroke","#243049"),t.appendChild(A)}function Zt(e){return Math.round(e).toLocaleString("sv-SE")}const X=e=>document.createElementNS("http://www.w3.org/2000/svg",e),Et=(e,i,t,o="start",a="#cbd5e1",s=12)=>{const n=X("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=t,n};function Qt(e,i){const t=document.getElementById("baParents");for(;t.firstChild;)t.removeChild(t.firstChild);const o=1200,a=460,s=260,n=40,r=20,h=60,b=o-s-n,f=a-r-h,w=N(e,i),E=Object.keys(B).map(C=>({p:C,b:w.bParents[C]||0,a:w.aParents[C]||0})).sort((C,S)=>S.a-C.a),L=E.length,M=f/L,$=M*.35,A=Math.max(...E.map(C=>Math.max(C.a,C.b)),1);E.forEach((C,S)=>{const v=r+S*M+M/2,c=C.b/A*b,x=C.a/A*b,l=e.highlightedCategory===C.p,m=l?"#f59e0b":"#3b82f6",p=l?"#f97316":"#10b981",d=e.highlightedCategory&&!l?.3:1,u=e.highlightedCategory&&!l?.5:1,g=X("rect");g.setAttribute("x",s),g.setAttribute("y",v-$-3),g.setAttribute("width",c),g.setAttribute("height",$),g.setAttribute("fill",m),g.setAttribute("opacity",d),l&&g.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),t.appendChild(g);const T=X("rect");T.setAttribute("x",s),T.setAttribute("y",v+3),T.setAttribute("width",x),T.setAttribute("height",$),T.setAttribute("fill",p),T.setAttribute("opacity",d),l&&T.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),t.appendChild(T);const I=(e.icons[C.p]||"")+" "+C.p,k=Et(s-14,v+4,I,"end","#cbd5e1",14);k.setAttribute("opacity",u),t.appendChild(k);const F=Et(s+Math.max(c,x)+10,v+4,"B "+Ct(P(e,C.b))+"  A "+Ct(P(e,C.a)),"start","#cbd5e1",12);F.setAttribute("opacity",u),t.appendChild(F)});const y=X("line");y.setAttribute("x1",s),y.setAttribute("x2",s),y.setAttribute("y1",r),y.setAttribute("y2",r+f),y.setAttribute("stroke","#243049"),t.appendChild(y)}function Ct(e){return Math.round(e).toLocaleString("sv-SE")}const Ot=e=>document.createElementNS("http://www.w3.org/2000/svg",e),St=(e,i,t,o="start",a="#cbd5e1",s=12)=>{const n=Ot("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=t,n};function te(e,i){const t=document.getElementById("heatmapVar");for(;t.firstChild;)t.removeChild(t.firstChild);const o=1200,a=440,s=260,n=40,r=20,h=40,b=o-s-n,f=a-r-h,w=i.slice(0,4),E=e.order.filter(x=>x.slice(0,4)===w),L=Object.keys(B),M=E.length,$=[],A=[];L.forEach(x=>{const l=[];E.forEach(m=>{const p=N(e,m),d=p.bParents[x]||0,u=p.aParents[x]||0,g=d?(u-d)/d:0;l.push({p:x,b:d,a:u,v:g,m}),A.push(g)}),$.push(l)});const y=Math.min(...A,0),C=Math.max(...A,0),S=b/M,v=f/L.length;function c(x){const l=x<=0?150:0,p=30+30*Math.min(1,Math.abs(x)/(x<=0?-y:C)||0);return`hsl(${l},70%,${p}%)`}$.forEach((x,l)=>{x.forEach((p,d)=>{const u=Ot("rect");u.setAttribute("x",s+d*S),u.setAttribute("y",r+l*v),u.setAttribute("width",S-2),u.setAttribute("height",v-2),u.setAttribute("fill",c(p.v)),u.addEventListener("mouseenter",g=>{const T=document.getElementById("tooltip"),I=p.a-p.b,k=I>=0?"+":"";T.innerHTML=`<div><b>${p.p}</b> · <span class='t'>${p.m}</span></div>
                        <div>Budget: <b>${et(P(e,p.b))}</b> SEK</div>
                        <div>Actual: <b>${et(P(e,p.a))}</b> SEK</div>
                        <div>Variance: <b>${k+et(P(e,I))}</b> (${p.b?(I/p.b*100).toFixed(1):"0.0"}%)</div>`,T.style.left=g.clientX+12+"px",T.style.top=g.clientY+12+"px",T.style.display="block"}),u.addEventListener("mousemove",g=>{const T=document.getElementById("tooltip");T.style.left=g.clientX+12+"px",T.style.top=g.clientY+12+"px"}),u.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),t.appendChild(u)});const m=(e.icons[L[l]]||"")+" "+L[l];t.appendChild(St(s-14,r+l*v+v/2+4,m,"end","#cbd5e1",14))}),E.forEach((x,l)=>t.appendChild(St(s+l*S+S/2,a-12,x.slice(5),"middle","#9aa3b2",12)))}function et(e){return Math.round(e).toLocaleString("sv-SE")}const D=e=>document.createElementNS("http://www.w3.org/2000/svg",e),V=(e,i,t,o="start",a="#cbd5e1",s=12)=>{const n=D("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=t,n};function ee(e,i){const t=document.getElementById("bridge");for(;t.firstChild;)t.removeChild(t.firstChild);const o=zt(e,i);if(!o){t.appendChild(V(600,210,"No previous month to compare.","middle","#9aa3b2",14));return}const a=1200,s=420,n=80,r=40,h=30,b=60,f=a-n-r,w=s-h-b,E=N(e,i),L=N(e,o),M=L.aTotal,$=E.aTotal,A=Object.keys(B).map(u=>({p:u,icon:e.icons[u]||"",delta:(E.aParents[u]||0)-(L.aParents[u]||0)})).sort((u,g)=>Math.abs(g.delta)-Math.abs(u.delta)),y=A.slice(0,Math.min(10,A.length)),C=A.slice(y.length).reduce((u,g)=>u+g.delta,0);Math.abs(C)>.5&&y.push({p:"Others",icon:"",delta:C});const S=f/(y.length+3),v=h+w;let c=n+S;function x(u){const g=Math.max(M,$,Math.max(...y.map(T=>Math.abs(T.delta)))+Math.max(M,$));return h+w-u/g*w}const l=D("rect");l.setAttribute("x",c-24),l.setAttribute("y",x(M)),l.setAttribute("width",48),l.setAttribute("height",v-x(M)),l.setAttribute("fill","#64748b"),t.appendChild(l),t.appendChild(V(c,s-18,"Start","middle","#9aa3b2",12)),t.appendChild(V(c,x(M)-6,nt(P(e,M)),"middle","#cbd5e1",12));let m=M;c+=S,y.forEach(u=>{const g=u.delta,T=g>=0,I=x(m),k=x(m+g),F=Math.min(I,k),tt=Math.abs(k-I),R=D("rect");R.setAttribute("x",c-24),R.setAttribute("y",F),R.setAttribute("width",48),R.setAttribute("height",tt),R.setAttribute("fill",T?"#ef4444":"#10b981"),t.appendChild(R);const j=(u.icon?u.icon+" ":"")+u.p;t.appendChild(V(c,s-18,j.length>14?j.slice(0,14)+"…":j,"middle","#9aa3b2",12));const Nt=(T?"+":"")+nt(P(e,g));t.appendChild(V(c,F-6,Nt,"middle","#cbd5e1",12)),m+=g,c+=S});const p=D("rect");p.setAttribute("x",c-24),p.setAttribute("y",x($)),p.setAttribute("width",48),p.setAttribute("height",v-x($)),p.setAttribute("fill","#64748b"),t.appendChild(p),t.appendChild(V(c,s-18,"End","middle","#9aa3b2",12)),t.appendChild(V(c,x($)-6,nt(P(e,$)),"middle","#cbd5e1",12));const d=D("line");d.setAttribute("x1",n*.6),d.setAttribute("x2",a-r),d.setAttribute("y1",v),d.setAttribute("y2",v),d.setAttribute("stroke","#243049"),t.appendChild(d)}function nt(e){return Math.round(e).toLocaleString("sv-SE")}function H(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function W(e,i,t,o="start",a="#cbd5e1",s=12,n="normal"){const r=H("text");return r.setAttribute("x",e),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=t,r}function Tt(e,i,t,o){const a=e.querySelector("defs")||e.appendChild(H("defs")),s=H("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","0%"),s.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",t);const r=H("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function ne(e,i){const t=document.getElementById("spendingTrends");if(!t)return;for(;t.firstChild;)t.removeChild(t.firstChild);const o=1200,a=400,s={top:40,right:60,bottom:60,left:80},n=o-s.left-s.right,r=a-s.top-s.bottom,h=i.slice(0,4),b=parseInt(i.slice(5,7)),f=[];for(let l=11;l>=0;l--){let m=b-l,p=parseInt(h);m<=0&&(m+=12,p-=1);const d=`${p}-${m.toString().padStart(2,"0")}`;e.months[d]&&f.push({key:d,label:d.slice(5,7),data:N(e,d)})}if(f.length===0)return;const w=Math.max(...f.map(l=>l.data.aTotal)),E=n/(f.length-1),L=r/w,M=Tt(t,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),$=Tt(t,"trendLine","#3b82f6","#1d4ed8"),A=H("rect");A.setAttribute("x",s.left),A.setAttribute("y",s.top),A.setAttribute("width",n),A.setAttribute("height",r),A.setAttribute("fill","rgba(15, 23, 42, 0.5)"),A.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),A.setAttribute("rx",8),t.appendChild(A);for(let l=0;l<=5;l++){const m=s.top+r/5*l,p=H("line");p.setAttribute("x1",s.left),p.setAttribute("y1",m),p.setAttribute("x2",s.left+n),p.setAttribute("y2",m),p.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),p.setAttribute("stroke-width",1),p.setAttribute("stroke-dasharray","2,2"),t.appendChild(p);const d=w-w/5*l,u=W(s.left-10,m+4,J(d),"end","#94a3b8",10);t.appendChild(u)}let y=`M ${s.left} ${s.top+r}`,C="M";f.forEach((l,m)=>{const p=s.left+m*E,d=s.top+r-l.data.aTotal*L;m===0?(C+=` ${p} ${d}`,y+=` L ${p} ${d}`):(C+=` L ${p} ${d}`,y+=` L ${p} ${d}`)}),y+=` L ${s.left+(f.length-1)*E} ${s.top+r} Z`;const S=H("path");S.setAttribute("d",y),S.setAttribute("fill",M),S.setAttribute("opacity","0"),t.appendChild(S);const v=H("path");v.setAttribute("d",C),v.setAttribute("fill","none"),v.setAttribute("stroke",$),v.setAttribute("stroke-width",3),v.setAttribute("stroke-linecap","round"),v.setAttribute("stroke-linejoin","round"),v.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),v.style.strokeDasharray=v.getTotalLength(),v.style.strokeDashoffset=v.getTotalLength(),t.appendChild(v),f.forEach((l,m)=>{const p=s.left+m*E,d=s.top+r-l.data.aTotal*L,u=H("circle");u.setAttribute("cx",p),u.setAttribute("cy",d),u.setAttribute("r",6),u.setAttribute("fill","rgba(15, 23, 42, 0.9)"),u.setAttribute("stroke","#3b82f6"),u.setAttribute("stroke-width",2),u.setAttribute("opacity","0"),t.appendChild(u);const g=H("circle");g.setAttribute("cx",p),g.setAttribute("cy",d),g.setAttribute("r",4),g.setAttribute("fill","#3b82f6"),g.setAttribute("opacity","0"),g.style.cursor="pointer",t.appendChild(g);const T=W(p,s.top+r+20,l.label,"middle","#94a3b8",10);t.appendChild(T),g.addEventListener("mouseenter",()=>{g.setAttribute("r",6),g.setAttribute("fill","#1d4ed8"),u.setAttribute("opacity","1");const I=document.getElementById("tooltip");I&&(I.style.display="block",I.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${l.label}</div>
          <div>Total Spending: ${J(l.data.aTotal)} SEK</div>
          <div>Budget: ${J(l.data.bTotal)} SEK</div>
          <div>Variance: ${J(l.data.aTotal-l.data.bTotal)} SEK</div>
        `)}),g.addEventListener("mouseleave",()=>{g.setAttribute("r",4),g.setAttribute("fill","#3b82f6"),u.setAttribute("opacity","0");const I=document.getElementById("tooltip");I&&(I.style.display="none")}),g.addEventListener("mousemove",I=>{const k=document.getElementById("tooltip");k&&(k.style.left=I.pageX+10+"px",k.style.top=I.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{S.style.transition="opacity 1s ease-out",S.setAttribute("opacity","1")},200),setTimeout(()=>{v.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",v.style.strokeDashoffset="0"},400),setTimeout(()=>{f.forEach((l,m)=>{setTimeout(()=>{const p=t.querySelectorAll("circle"),d=m*2+2;p[d]&&(p[d].style.transition="opacity 0.3s ease-out",p[d].setAttribute("opacity","1")),p[d+1]&&(p[d+1].style.transition="opacity 0.3s ease-out",p[d+1].setAttribute("opacity","1"))},m*100)})},1e3)});const c=W(o/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");t.appendChild(c);const x=W(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");x.setAttribute("transform",`rotate(-90, 20, ${a/2})`),t.appendChild(x)}function J(e){return Math.round(e).toLocaleString("sv-SE")}let O=Ft();const ie=document.getElementById("app");ie.innerHTML=`
  <div class="panel kpis" id="kpiStrip"></div>

  <div class="panel controlsArea">
    <div class="controls" id="controls"></div>
    <div class="stack" id="rightStack">
      <div class="subpanel grid2">
        <div>
          <div class="legend"><span><i class="sw" style="background:#34d399"></i>YTD Savings vs Year Target</span></div>
          <svg id="ytdGauge" class="chart tiny" viewBox="0 0 760 300" aria-label="YTD gauge"></svg>
        </div>
        <div>
          <div class="legend"><span><i class="sw" style="background:#06b6d4"></i>Fixed vs Variable (donut)</span></div>
          <svg id="fixedVarMini" class="chart tiny" viewBox="0 0 760 300" aria-label="Fixed vs Variable donut"></svg>
        </div>
      </div>

      <div class="subpanel" style="position:relative">
        <div class="legend"><span><i class="sw" style="background:#f59e0b"></i>Glidepath — required per month to hit target</span></div>
        <div id="glidePill" class="pill"></div>
        <svg id="glidepath" class="chart small" viewBox="0 0 760 320" aria-label="Glidepath"></svg>
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
`;Kt(O,Q);Pt(O,_());Dt();ct();kt(O,_());Z(O,Q);window.state=O;window.drawAll=ct;window.monthTotals=e=>N(O,e);function _(){return O.order[O.order.length-1]}function Q(){ot(O),Pt(O,_()),ct(),kt(O,_()),Z(O,Q)}function Pt(e,i){const t=document.getElementById("kpiStrip");t.innerHTML="";const o=N(e,i),a=e.months[i].income||0,s=P(e,a-o.aTotal),n=a>0?(a-o.aTotal)/a:0,r=o.bTotal>0?o.aTotal/o.bTotal:0,b=e.order.filter(w=>w.slice(0,4)===i.slice(0,4)&&w<=i).map(w=>(e.months[w].income||0)-N(e,w).aTotal).reduce((w,E)=>w+E,0);[{lab:"Monthly Savings (real SEK)",val:$t(s)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:$t(P(e,b))+" SEK"}].forEach(w=>{const E=document.createElement("div");E.className="kpi",E.innerHTML=`<div class="lab">${w.lab}</div><div class="val">${w.val}</div>`,t.appendChild(E)})}function ct(){const e=document.getElementById("monthSel").value;qt(O,e),Ut(O,e),Wt(O,e),Jt(O,e),ne(O,e),_t(O,e),Qt(O,e),te(O,e),ee(O,e),Z(O,Q)}function $t(e){return Math.round(e).toLocaleString("sv-SE")}
