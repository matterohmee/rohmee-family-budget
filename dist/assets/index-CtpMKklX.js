(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const pt={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},ht={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function gt(t,i=1){const e=[];let o=i,a=t;for(let s=0;s<12;s++)e.push(`${a}-${String(o).padStart(2,"0")}`),o++,o>12&&(o=1,a++);return e}function at(t,i){if(t.months[i])Object.keys(B).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(B[e]).forEach(o=>{t.months[i].budget[e][o]===void 0&&(t.months[i].budget[e][o]=B[e][o]),t.months[i].actual[e][o]===void 0&&(t.months[i].actual[e][o]=B[e][o])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},o={};Object.keys(B).forEach(a=>{e[a]={},o[a]={},Object.keys(B[a]).forEach(s=>{e[a][s]=B[a][s],o[a][s]=B[a][s]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:o}}}const Bt="rohmee_budget_live",Ft=2,Ot=108e3;function Vt(){let t=localStorage.getItem(Bt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Nt(e),(!e.order||!e.order.length)&&(e.order=gt(2025,9)),e.order.forEach(o=>at(e,o)),e.icons=e.icons||pt,e.tags=e.tags||ht,e}catch{}const i={defaultIncome:Ot,target:25e4,cpi:1,order:gt(2025,9),months:{},icons:pt,tags:ht,selected:null,version:Ft};return i.order.forEach(e=>at(i,e)),lt(i),i}function lt(t){localStorage.setItem(Bt,JSON.stringify(t))}function zt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function Yt(t,i){const e=new FileReader;e.onload=()=>{try{const o=JSON.parse(e.result);Nt(o),lt(o),i(o)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Nt(t){t.version<2&&(t.defaultIncome=t.income||Ot,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ft}function N(t,i){at(t,i);const e=t.months[i],o=bt(e.budget),a=bt(e.actual);let s=0,n=0;return Object.keys(o).forEach(r=>{s+=o[r],n+=a[r]||0}),{bParents:o,aParents:a,bTotal:s,aTotal:n}}function jt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function O(t,i){return i/(t.cpi||1)}function Gt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function bt(t){let i={};return Object.keys(t).forEach(e=>i[e]=Gt(t[e])),i}function Dt(t,i){const e=document.getElementById("controls"),o=t.order[t.order.length-1];e.innerHTML=`
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
  `;const a=e.querySelector("#monthSel");t.order.forEach(g=>{const b=document.createElement("option");b.value=g,b.textContent=g,a.appendChild(b)}),a.value=o;const s=e.querySelector("#netIncome"),n=e.querySelector("#savTarget"),r=e.querySelector("#cpiFactor");function v(g){return Math.round(g).toLocaleString("sv-SE")}function f(g){return parseFloat(g.replace(/\s/g,"").replace(",","."))||0}a.addEventListener("change",g=>{s.value=v(t.months[a.value].income||0),n.value=v(t.target),r.value=t.cpi,i()}),s.addEventListener("input",g=>{const b=g.target.value.replace(/\s/g,""),w=f(b);isNaN(w)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[a.value].income=w,g.target.value=v(w),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),n.addEventListener("input",g=>{const b=g.target.value.replace(/\s/g,""),w=f(b);isNaN(w)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=w,g.target.value=v(w),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),r.addEventListener("input",g=>{const b=parseFloat(g.target.value);isNaN(b)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=b,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>zt(t)),e.querySelector("#loadJsonInput").addEventListener("change",g=>{const b=g.target.files[0];b&&Yt(b,w=>{Object.assign(t,w),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const g=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(A=>{const S=t.months[A];Object.keys(S.budget).forEach($=>Object.keys(S.budget[$]).forEach(C=>{g.push([A,$,C,S.budget[$][C],S.actual[$][C]])}))});const b=g.map(A=>A.map(S=>`"${String(S).replace('"','""')}"`).join(",")).join(`
`),w=document.createElement("a");w.href=URL.createObjectURL(new Blob([b],{type:"text/csv"})),w.download="budget.csv",w.click(),setTimeout(()=>URL.revokeObjectURL(w.href),1e3)})}let X={};function ut(t,i){const e=document.getElementById("monthSel").value,o=document.querySelector("#dataTable tbody");o.innerHTML="";const a=t.months[e];Object.keys(B).forEach(n=>{const r=vt(a.budget[n]||{}),v=vt(a.actual[n]||{}),f=document.createElement("tr");f.className="parent"+(v>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(f.style.backgroundColor="rgba(59, 130, 246, 0.2)",f.style.borderLeft="4px solid #3b82f6");const g=document.createElement("td"),b=document.createElement("span");b.textContent=X[n]?"▾":"▸",b.className="toggle",b.title="Collapse/expand",b.onclick=()=>{X[n]=!X[n],ut(t,i)};const w=document.createElement("span");w.className="icon",w.textContent=t.icons[n]||"",w.title="Click to set emoji",w.style.cursor="pointer",w.onclick=()=>{const l=prompt("Set emoji for "+n+":",t.icons[n]||"");l&&(t.icons[n]=l,i&&i())};const A=document.createElement("span");A.textContent=n,A.style.cursor="pointer",A.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},A.ondblclick=()=>{const l=prompt("Rename parent:",n);!l||B[l]||(B[l]=B[n],delete B[n],t.icons[l]=t.icons[n],delete t.icons[n],t.tags[l]=t.tags[n],delete t.tags[n],t.order.forEach(M=>{const p=t.months[M];p.budget[l]=p.budget[n],p.actual[l]=p.actual[n],delete p.budget[n],delete p.actual[n]}),i&&i())},f.onclick=l=>{l.target.closest(".rowtools")||l.target.closest(".toggle")||l.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(f.style.background="rgba(59, 130, 246, 0.2)",f.style.borderLeft="4px solid #3b82f6");const S=document.createElement("span");S.className="rowtools";const $=document.createElement("span");$.className="chip",$.textContent=t.tags[n]==="F"?"Fixed":"Variable",$.title="Toggle Fixed/Variable",$.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",i&&i()};const C=document.createElement("span");C.className="chip",C.textContent="+",C.title="Add subcategory",C.onclick=()=>{const l=prompt("New subcategory under "+n+":");l&&(B[n][l]=0,t.order.forEach(M=>{const p=t.months[M];p.budget[n][l]=0,p.actual[n][l]=0}),i&&i())};const y=document.createElement("span");y.className="chip",y.textContent="−",y.title="Delete parent",y.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(l=>{const M=t.months[l];delete M.budget[n],delete M.actual[n]}),i&&i())},S.appendChild($),S.appendChild(C),S.appendChild(y),g.appendChild(b),g.appendChild(w),g.appendChild(A),g.appendChild(S),f.appendChild(g);const E=document.createElement("td");E.className="num",E.textContent=_(O(t,r)),f.appendChild(E);const I=document.createElement("td");I.className="num",I.textContent=_(O(t,v)),f.appendChild(I);const x=document.createElement("td");x.className="num",x.textContent=_(O(t,r-v)),f.appendChild(x),o.appendChild(f),X[n]&&Object.keys(B[n]).forEach(l=>{const M=document.createElement("tr");(a.actual[n]||{})[l]>(a.budget[n]||{})[l]&&(M.className="over");const p=document.createElement("td"),m=document.createElement("span");m.textContent="• "+l,m.title="Double-click to rename",m.style.cursor="text",m.ondblclick=()=>{const T=prompt("Rename subcategory:",l);T&&(B[n][T]=B[n][l],delete B[n][l],t.order.forEach(L=>{const k=t.months[L];k.budget[n][T]=k.budget[n][l],k.actual[n][T]=k.actual[n][l],delete k.budget[n][l],delete k.actual[n][l]}),i&&i())},p.appendChild(m);const h=document.createElement("span");h.className="chip",h.textContent="−",h.title="Delete subcategory",h.style.marginLeft="8px",h.onclick=()=>{confirm("Delete "+l+"?")&&(delete B[n][l],t.order.forEach(T=>{const L=t.months[T];delete L.budget[n][l],delete L.actual[n][l]}),i&&i())},p.appendChild(h),M.appendChild(p);const d=document.createElement("td");d.className="num",d.appendChild(ft(t,e,n,l,"budget",(a.budget[n]||{})[l]||0,i)),M.appendChild(d);const c=document.createElement("td");c.className="num",c.appendChild(ft(t,e,n,l,"actual",(a.actual[n]||{})[l]||0,i)),M.appendChild(c);const u=document.createElement("td");u.className="num",u.textContent=_(O(t,((a.budget[n]||{})[l]||0)-((a.actual[n]||{})[l]||0))),M.appendChild(u),o.appendChild(M)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const v=t.months[r];v.budget[n]={},v.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function ft(t,i,e,o,a,s,n){const r=document.createElement("input");r.type="number",r.value=s,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const v=f=>{const g=+r.value||0;t.months[i][a][e][o]=g,n&&n()};return r.addEventListener("keydown",f=>{f.key==="Enter"?(v(f.shiftKey?"up":"down"),f.preventDefault()):f.key==="Escape"&&(r.value=s,r.blur())}),r.addEventListener("blur",()=>v()),r}function vt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function _(t){return Math.round(t).toLocaleString("sv-SE")}class qt{constructor(i){this.state=i}generateInsights(i){const e=[],o=this.getRecentMonths(i,6);if(o.length<3)return e;const a=this.analyzeTrend(o);a&&e.push(a);const s=this.analyzeBudgetVariance(o);s&&e.push(s);const n=this.analyzeCategorySpending(o);e.push(...n);const r=this.analyzeSavingsRate(o);r&&e.push(r);const v=this.analyzeSeasonalPatterns(i);return v&&e.push(v),e.slice(0,8)}getRecentMonths(i,e){const o=parseInt(i.slice(0,4)),a=parseInt(i.slice(5,7)),s=[];for(let n=0;n<e;n++){let r=a-n,v=o;r<=0&&(r+=12,v-=1);const f=`${v}-${r.toString().padStart(2,"0")}`;this.state.months[f]&&s.unshift({key:f,data:N(this.state,f),income:this.state.months[f].income||0})}return s}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(a=>a.data.aTotal)),o=i.reduce((a,s)=>a+s.data.aTotal,0)/i.length;if(Math.abs(e)<o*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const a=e/o*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/o*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],o=e.data.aTotal-e.data.bTotal,a=o/e.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:o>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(o)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(o))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],o=i[i.length-1];if(i.length>=2){const a=i[i.length-2];Object.keys(o.data.aParents).forEach(s=>{const n=o.data.aParents[s]||0,r=a.data.aParents[s]||0;if(r>0){const v=(n-r)/r*100;if(Math.abs(v)>20&&Math.abs(n-r)>1e3){const f=this.getCategoryIcon(s);v>0?e.push({type:"warning",category:"spending",title:`${s} Spending Increased`,message:`${s} spending increased by ${v.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:v>50?"high":"medium",icon:f,recommendation:`Review your ${s.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${s} Spending Decreased`,message:`Great! ${s} spending decreased by ${Math.abs(v).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:f})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],o=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return o<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${o.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:o>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${o.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${o.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,o=e*(e-1)/2,a=i.reduce((r,v)=>r+v,0),s=i.reduce((r,v,f)=>r+f*v,0),n=i.reduce((r,v,f)=>r+f*f,0);return(e*s-o*a)/(e*n-o*o)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],o=this.getRecentMonths(i,3);if(o.length===0)return e;const a=o[o.length-1],r=o.reduce((f,g)=>f+g.data.aTotal,0)/o.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const f=(a.income-a.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(f)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Pt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const o=new qt(t),a=o.generateInsights(i),s=o.generateRecommendations(i);if(e.innerHTML="",a.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");a.forEach((v,f)=>{const g=Wt(v);r.appendChild(g)})}if(s.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");s.forEach((v,f)=>{const g=Ut(v);r.appendChild(g)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,v)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},v*100)})})}function Wt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-4px)",e.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),e}function Ut(t,i){const e=document.createElement("div");e.className=`recommendation-card recommendation-${t.priority}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const o={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=D("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function yt(t,i,e,o){const a=t.querySelector("defs")||t.appendChild(D("defs")),s=D("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=D("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function Xt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=i.slice(0,4),s=t.order.filter(c=>c.slice(0,4)===o&&c<=i).map(c=>Math.max(0,(t.months[c].income||0)-N(t,c).aTotal)).reduce((c,u)=>c+u,0),n=t.target||0,r=n>0?Math.min(1,s/n):0,v=yt(e,"gaugeProgress","#10b981","#059669"),f=yt(e,"gaugeBg","#1e293b","#0f172a"),g=W(380,150,`${Math.round(r*100)}%`,"middle","#10b981",80,"900");e.appendChild(g);const b=W(380,240,`${xt(O(t,s))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(b);const w=W(380,290,`of ${xt(O(t,n))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(w);const A=r>=1?"#10b981":r>=.8?"#f59e0b":"#ef4444",S=r>=1?"✓ Target Achieved":r>=.8?"⚡ On Track":"⚠ Behind Target",$=W(380,350,S,"middle",A,24,"600");e.appendChild($);const C=500,y=30,E=380-C/2,I=380,x=D("rect");x.setAttribute("x",E),x.setAttribute("y",I),x.setAttribute("width",C),x.setAttribute("height",y),x.setAttribute("fill",f),x.setAttribute("rx",10),x.setAttribute("opacity","0.3"),e.appendChild(x);const l=D("rect");l.setAttribute("x",E),l.setAttribute("y",I),l.setAttribute("width",0),l.setAttribute("height",y),l.setAttribute("fill",v),l.setAttribute("rx",10),l.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),l.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l),requestAnimationFrame(()=>{setTimeout(()=>{l.setAttribute("width",C*r)},100)}),["0%","25%","50%","75%","100%"].forEach((c,u)=>{const T=E+C*u/4,L=W(T,I+60,c,"middle","#64748b",30,"500");e.appendChild(L)});let p=0;const m=Math.round(r*100),h=m/60;function d(){p<m&&(p+=h,g.textContent=Math.round(Math.min(p,m))+"%",requestAnimationFrame(d))}setTimeout(d,200)}function xt(t){return Math.round(t).toLocaleString("sv-SE")}function V(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=V("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function At(t,i,e,o){const a=t.querySelector("defs")||t.appendChild(V("defs")),s=V("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=V("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=V("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function _t(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const o=N(t,i);let a=0,s=0;Object.keys(o.aParents).forEach(z=>{t.tags[z]==="F"?a+=o.aParents[z]||0:s+=o.aParents[z]||0});const n=a+s||1,r=Math.round(a/n*100),v=Math.round(s/n*100),f=At(e,"fixedGrad","#8b5cf6","#7c3aed"),g=At(e,"variableGrad","#06b6d4","#0891b2"),b=200,w=j(b,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(w);const A=j(b,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(A);const S=j(b,280,`${wt(O(t,a))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(S);const $=560,C=j($,150,"0%","middle","#06b6d4",60,"900");e.appendChild(C);const y=j($,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(y);const E=j($,280,`${wt(O(t,s))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(E);const I=320,x=40,l=600,M=380-l/2,p=l*(a/n),m=V("rect");m.setAttribute("x",M),m.setAttribute("y",I),m.setAttribute("width",0),m.setAttribute("height",x),m.setAttribute("fill",f),m.setAttribute("rx",15),m.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),m.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(m);const h=l*(s/n),d=V("rect");d.setAttribute("x",M+p),d.setAttribute("y",I),d.setAttribute("width",0),d.setAttribute("height",x),d.setAttribute("fill",g),d.setAttribute("rx",15),d.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),d.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(d);const c=V("rect");c.setAttribute("x",M),c.setAttribute("y",I),c.setAttribute("width",l),c.setAttribute("height",x),c.setAttribute("fill","#1e293b"),c.setAttribute("rx",15),c.setAttribute("opacity","0.3"),e.insertBefore(c,m),requestAnimationFrame(()=>{setTimeout(()=>{m.setAttribute("width",p)},200),setTimeout(()=>{d.setAttribute("x",M+p),d.setAttribute("width",h)},400)});const u=j(380,140,"VS","middle","#64748b",32,"600");e.appendChild(u);const T=V("line");T.setAttribute("x1",380),T.setAttribute("y1",60),T.setAttribute("x2",380),T.setAttribute("y2",230),T.setAttribute("stroke","#374151"),T.setAttribute("stroke-width",2),T.setAttribute("opacity","0.5"),e.appendChild(T);let L=0,k=0;const P=r/50,K=v/50;function q(){(L<r||k<v)&&(L<r&&(L+=P,w.textContent=Math.round(Math.min(L,r))+"%"),k<v&&(k+=K,C.textContent=Math.round(Math.min(k,v))+"%"),requestAnimationFrame(q))}setTimeout(q,300),m.style.cursor="pointer",d.style.cursor="pointer",m.addEventListener("mouseenter",()=>{m.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),m.addEventListener("mouseleave",()=>{m.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),d.addEventListener("mouseenter",()=>{d.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),d.addEventListener("mouseleave",()=>{d.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function wt(t){return Math.round(t).toLocaleString("sv-SE")}const ot=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Et=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=ot("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function Zt(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const o=600,a=250,s=50,n=20,r=20,v=40,f=o-s-n,g=a-r-v,b=i.slice(0,4),w=parseInt(i.slice(5,7)),A=[];if(w>=9){for(let u=9;u<=12;u++){const T=`${b}-${u.toString().padStart(2,"0")}`;A.push(T)}const c=(parseInt(b)+1).toString();for(let u=1;u<=8;u++){const T=`${c}-${u.toString().padStart(2,"0")}`;A.push(T)}}else{const c=(parseInt(b)-1).toString();for(let u=9;u<=12;u++){const T=`${c}-${u.toString().padStart(2,"0")}`;A.push(T)}for(let u=1;u<=8;u++){const T=`${b}-${u.toString().padStart(2,"0")}`;A.push(T)}}const S=t.order.indexOf(i),$=A.filter(c=>t.order.indexOf(c)<=S&&t.order.indexOf(c)>=0),C=$.map(c=>Math.max(0,(t.months[c]&&t.months[c].income||0)-(t.months[c]?N(t,c).aTotal:0))).reduce((c,u)=>c+u,0),y=12-$.length,E=Math.max(0,(t.target||0)-C),I=y>0?E/y:0,x=(t.target||0)/12,l=[];A.forEach(c=>{t.order.indexOf(c)<=S&&t.order.indexOf(c)>=0?l.push({m:c,v:Math.max(0,(t.months[c]&&t.months[c].income||0)-(t.months[c]?N(t,c).aTotal:0)),t:"a"}):l.push({m:c,v:I,t:"r"})});const M=Math.max(x,...l.map(c=>c.v),1),p=f/A.length*.65;l.forEach((c,u)=>{const T=c.v/M*g,L=s+u*(f/A.length)+(f/A.length-p)/2,k=r+g-T,P=c.t==="a"?c.v>=x?"#10b981":"#ef4444":"#f59e0b",K=ot("rect");K.setAttribute("x",L),K.setAttribute("y",k),K.setAttribute("width",p),K.setAttribute("height",T),K.setAttribute("fill",P),e.appendChild(K),e.appendChild(Et(L+p/2,a-12,c.m.slice(5),"middle","#9aa3b2",12))});const m=r+g-x/M*g,h=ot("line");h.setAttribute("x1",s),h.setAttribute("x2",s+f),h.setAttribute("y1",m),h.setAttribute("y2",m),h.setAttribute("stroke","#93c5fd"),h.setAttribute("stroke-dasharray","5,5"),e.appendChild(h),e.appendChild(Et(s+f-6,m-6,"Monthly target "+Ct(O(t,x)),"end","#cfe4ff",16));const d=document.getElementById("glidePill");d&&(E<=0?(d.textContent="On track ✔",d.classList.add("ok")):(d.textContent="From now: need "+Ct(O(t,I))+" SEK / month",d.classList.remove("ok")))}function Ct(t){return Math.round(t).toLocaleString("sv-SE")}const ct=t=>document.createElementNS("http://www.w3.org/2000/svg",t),St=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=ct("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function Qt(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const o=760,a=320,s=110,n=20,r=20,v=40,f=o-s-n,g=a-r-v,b=N(t,i),w=t.months[i].income||0,A=[{lab:"Income",val:w,c:"#60a5fa"},{lab:"Budget",val:b.bTotal,c:"#3b82f6"},{lab:"Actual",val:b.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,w-b.aTotal),c:"#34d399"}],S=Math.max(...A.map(y=>y.val),1),$=g/A.length*.55;A.forEach((y,E)=>{const I=r+E*(g/A.length)+(g/A.length-$)/2,x=y.val/S*f,l=ct("rect");l.setAttribute("x",s),l.setAttribute("y",I),l.setAttribute("width",x),l.setAttribute("height",$),l.setAttribute("fill",y.c),e.appendChild(l),e.appendChild(St(s-10,I+$/2+4,y.lab,"end","#cbd5e1",16)),e.appendChild(St(s+x+6,I+$/2+4,te(O(t,y.val)),"start","#cbd5e1",16))});const C=ct("line");C.setAttribute("x1",s),C.setAttribute("x2",s),C.setAttribute("y1",r),C.setAttribute("y2",r+g),C.setAttribute("stroke","#243049"),e.appendChild(C)}function te(t){return Math.round(t).toLocaleString("sv-SE")}const dt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=dt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function ee(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=700,s=280,n=40,r=30,v=60,f=o-s-n,g=a-r-v,b=N(t,i),w=Object.keys(B).map(y=>({p:y,v:b.aParents[y]||0})).sort((y,E)=>E.v-y.v),A=w.reduce((y,E)=>y+E.v,0)||1,S=w.length,$=g/S*.75;w.forEach((y,E)=>{const I=r+E*(g/S)+(g/S-$)/2,x=y.v/A*f,l=t.highlightedCategory===y.p,M=l?"#f59e0b":"#3b82f6",p=t.highlightedCategory&&!l?.3:1,m=dt("rect");m.setAttribute("x",s),m.setAttribute("y",I),m.setAttribute("width",x),m.setAttribute("height",$),m.setAttribute("fill",M),m.setAttribute("opacity",p),l&&m.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(m);const h=t.highlightedCategory&&!l?.5:1,d=(t.icons[y.p]||"")+" "+y.p,c=Tt(s-16,I+$/2+6,d,"end","#cbd5e1",15);c.setAttribute("opacity",h),e.appendChild(c);const u=Tt(s+x+12,I+$/2+6,(y.v/A*100).toFixed(1)+"%  ·  "+ne(O(t,y.v))+" SEK","start","#cbd5e1",14);u.setAttribute("opacity",h),e.appendChild(u)});const C=dt("line");C.setAttribute("x1",s),C.setAttribute("x2",s),C.setAttribute("y1",r),C.setAttribute("y2",r+g),C.setAttribute("stroke","#243049"),e.appendChild(C)}function ne(t){return Math.round(t).toLocaleString("sv-SE")}const tt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),$t=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=tt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function ie(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=460,s=260,n=40,r=20,v=60,f=o-s-n,g=a-r-v,b=N(t,i),w=Object.keys(B).map(E=>({p:E,b:b.bParents[E]||0,a:b.aParents[E]||0})).sort((E,I)=>I.a-E.a),A=w.length,S=g/A,$=S*.35,C=Math.max(...w.map(E=>Math.max(E.a,E.b)),1);w.forEach((E,I)=>{const x=r+I*S+S/2,l=E.b/C*f,M=E.a/C*f,p=t.highlightedCategory===E.p,m=p?"#f59e0b":"#3b82f6",h=p?"#f97316":"#10b981",d=t.highlightedCategory&&!p?.3:1,c=t.highlightedCategory&&!p?.5:1,u=tt("rect");u.setAttribute("x",s),u.setAttribute("y",x-$-3),u.setAttribute("width",l),u.setAttribute("height",$),u.setAttribute("fill",m),u.setAttribute("opacity",d),p&&u.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(u);const T=tt("rect");T.setAttribute("x",s),T.setAttribute("y",x+3),T.setAttribute("width",M),T.setAttribute("height",$),T.setAttribute("fill",h),T.setAttribute("opacity",d),p&&T.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild(T);const L=(t.icons[E.p]||"")+" "+E.p,k=$t(s-14,x+4,L,"end","#cbd5e1",14);k.setAttribute("opacity",c),e.appendChild(k);const P=$t(s+Math.max(l,M)+10,x+4,"B "+It(O(t,E.b))+"  A "+It(O(t,E.a)),"start","#cbd5e1",12);P.setAttribute("opacity",c),e.appendChild(P)});const y=tt("line");y.setAttribute("x1",s),y.setAttribute("x2",s),y.setAttribute("y1",r),y.setAttribute("y2",r+g),y.setAttribute("stroke","#243049"),e.appendChild(y)}function It(t){return Math.round(t).toLocaleString("sv-SE")}const Ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=Ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function se(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=440,s=260,n=40,r=20,v=40,f=o-s-n,g=a-r-v,b=i.slice(0,4),w=parseInt(i.slice(5,7)),A=[];if(w>=9){for(let m=9;m<=12;m++){const h=`${b}-${m.toString().padStart(2,"0")}`;A.push(h)}const p=(parseInt(b)+1).toString();for(let m=1;m<=8;m++){const h=`${p}-${m.toString().padStart(2,"0")}`;A.push(h)}}else{const p=(parseInt(b)-1).toString();for(let m=9;m<=12;m++){const h=`${p}-${m.toString().padStart(2,"0")}`;A.push(h)}for(let m=1;m<=8;m++){const h=`${b}-${m.toString().padStart(2,"0")}`;A.push(h)}}const S=Object.keys(B),$=A.length,C=[],y=[];S.forEach(p=>{const m=[];A.forEach(h=>{const d=N(t,h),c=d.bParents[p]||0,u=d.aParents[p]||0,T=c?(u-c)/c:0;m.push({p,b:c,a:u,v:T,m:h}),y.push(T)}),C.push(m)});const E=Math.min(...y),I=Math.max(...y),x=f/$,l=g/S.length;function M(p){const m=p<=0?150:0,h=p<=0?E===0?1:-E:I===0?1:I,c=30+30*Math.min(1,Math.abs(p)/h||0);return`hsl(${m},70%,${c}%)`}C.forEach((p,m)=>{p.forEach((d,c)=>{const u=Ht("rect");u.setAttribute("x",s+c*x),u.setAttribute("y",r+m*l),u.setAttribute("width",x-2),u.setAttribute("height",l-2),u.setAttribute("fill",M(d.v)),t.highlightedCategory&&d.p===t.highlightedCategory&&(u.setAttribute("stroke","#3b82f6"),u.setAttribute("stroke-width","3")),u.addEventListener("mouseenter",T=>{const L=document.getElementById("tooltip"),k=d.a-d.b,P=k>=0?"+":"";L.innerHTML=`<div><b>${d.p}</b> · <span class='t'>${d.m}</span></div>
                        <div>Budget: <b>${st(O(t,d.b))}</b> SEK</div>
                        <div>Actual: <b>${st(O(t,d.a))}</b> SEK</div>
                        <div>Variance: <b>${P+st(O(t,k))}</b> (${d.b?(k/d.b*100).toFixed(1):"0.0"}%)</div>`,L.style.left=T.clientX+12+"px",L.style.top=T.clientY+12+"px",L.style.display="block"}),u.addEventListener("mousemove",T=>{const L=document.getElementById("tooltip");L.style.left=T.clientX+12+"px",L.style.top=T.clientY+12+"px"}),u.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(u)});const h=(t.icons[S[m]]||"")+" "+S[m];e.appendChild(Mt(s-14,r+m*l+l/2+4,h,"end",t.highlightedCategory===S[m]?"#ffffff":"#cbd5e1",18))}),A.forEach((p,m)=>e.appendChild(Mt(s+m*x+x/2,a-12,p.slice(5),"middle","#9aa3b2",16)))}function st(t){return Math.round(t).toLocaleString("sv-SE")}const J=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=J("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function re(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=jt(t,i);if(!o){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const a=1200,s=420,n=80,r=40,v=30,f=60,g=a-n-r,b=s-v-f,w=N(t,i),A=N(t,o),S=A.aTotal,$=w.aTotal,C=Object.keys(B).map(c=>({p:c,icon:t.icons[c]||"",delta:(w.aParents[c]||0)-(A.aParents[c]||0)})).sort((c,u)=>Math.abs(u.delta)-Math.abs(c.delta)),y=C.slice(0,Math.min(10,C.length)),E=C.slice(y.length).reduce((c,u)=>c+u.delta,0);Math.abs(E)>.5&&y.push({p:"Others",icon:"",delta:E});const I=g/(y.length+3),x=v+b;let l=n+I;function M(c){const u=Math.max(S,$,Math.max(...y.map(T=>Math.abs(T.delta)))+Math.max(S,$));return v+b-c/u*b}const p=J("rect");p.setAttribute("x",l-24),p.setAttribute("y",M(S)),p.setAttribute("width",48),p.setAttribute("height",x-M(S)),p.setAttribute("fill","#64748b"),e.appendChild(p),e.appendChild(G(l,s-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(l,M(S)-6,rt(O(t,S)),"middle","#cbd5e1",16));let m=S;l+=I,y.forEach(c=>{const u=c.delta,T=u>=0,L=M(m),k=M(m+u),P=Math.min(L,k),K=Math.abs(k-L);let q=T?"#ef4444":"#10b981",z=1;t.highlightedCategory&&(c.p===t.highlightedCategory?(q=T?"#dc2626":"#059669",z=1):z=.3);const Y=J("rect");Y.setAttribute("x",l-24),Y.setAttribute("y",P),Y.setAttribute("width",48),Y.setAttribute("height",K),Y.setAttribute("fill",q),Y.setAttribute("opacity",z),e.appendChild(Y);const it=(c.icon?c.icon+" ":"")+c.p;e.appendChild(G(l,s-18,it.length>14?it.slice(0,14)+"…":it,"middle",t.highlightedCategory===c.p?"#ffffff":"#9aa3b2",16));const Rt=(T?"+":"")+rt(O(t,u));e.appendChild(G(l,P-6,Rt,"middle",t.highlightedCategory===c.p?"#ffffff":"#cbd5e1",16)),m+=u,l+=I});const h=J("rect");h.setAttribute("x",l-24),h.setAttribute("y",M($)),h.setAttribute("width",48),h.setAttribute("height",x-M($)),h.setAttribute("fill","#64748b"),e.appendChild(h),e.appendChild(G(l,s-18,"End","middle","#9aa3b2",16)),e.appendChild(G(l,M($)-6,rt(O(t,$)),"middle","#cbd5e1",16));const d=J("line");d.setAttribute("x1",n*.6),d.setAttribute("x2",a-r),d.setAttribute("y1",x),d.setAttribute("y2",x),d.setAttribute("stroke","#243049"),e.appendChild(d)}function rt(t){return Math.round(t).toLocaleString("sv-SE")}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Z(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=H("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Lt(t,i,e,o){const a=t.querySelector("defs")||t.appendChild(H("defs")),s=H("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","0%"),s.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=H("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function ae(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,s={top:40,right:60,bottom:60,left:80},n=o-s.left-s.right,r=a-s.top-s.bottom,v=i.slice(0,4),f=parseInt(i.slice(5,7)),g=[];for(let p=11;p>=0;p--){let m=f-p,h=parseInt(v);m<=0&&(m+=12,h-=1);const d=`${h}-${m.toString().padStart(2,"0")}`;t.months[d]&&g.push({key:d,label:d.slice(5,7),data:N(t,d)})}if(g.length===0)return;const b=Math.max(...g.map(p=>p.data.aTotal)),w=n/(g.length-1),A=r/b,S=Lt(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),$=Lt(e,"trendLine","#3b82f6","#1d4ed8"),C=H("rect");C.setAttribute("x",s.left),C.setAttribute("y",s.top),C.setAttribute("width",n),C.setAttribute("height",r),C.setAttribute("fill","rgba(15, 23, 42, 0.5)"),C.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),C.setAttribute("rx",8),e.appendChild(C);for(let p=0;p<=5;p++){const m=s.top+r/5*p,h=H("line");h.setAttribute("x1",s.left),h.setAttribute("y1",m),h.setAttribute("x2",s.left+n),h.setAttribute("y2",m),h.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),h.setAttribute("stroke-width",1),h.setAttribute("stroke-dasharray","2,2"),e.appendChild(h);const d=b-b/5*p,c=Z(s.left-10,m+4,Q(d),"end","#94a3b8",14);e.appendChild(c)}let y=`M ${s.left} ${s.top+r}`,E="M";g.forEach((p,m)=>{const h=s.left+m*w,d=s.top+r-p.data.aTotal*A;m===0?(E+=` ${h} ${d}`,y+=` L ${h} ${d}`):(E+=` L ${h} ${d}`,y+=` L ${h} ${d}`)}),y+=` L ${s.left+(g.length-1)*w} ${s.top+r} Z`;const I=H("path");I.setAttribute("d",y),I.setAttribute("fill",S),I.setAttribute("opacity","0"),e.appendChild(I);const x=H("path");x.setAttribute("d",E),x.setAttribute("fill","none"),x.setAttribute("stroke",$),x.setAttribute("stroke-width",3),x.setAttribute("stroke-linecap","round"),x.setAttribute("stroke-linejoin","round"),x.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),x.style.strokeDasharray=x.getTotalLength(),x.style.strokeDashoffset=x.getTotalLength(),e.appendChild(x),g.forEach((p,m)=>{const h=s.left+m*w,d=s.top+r-p.data.aTotal*A,c=H("circle");c.setAttribute("cx",h),c.setAttribute("cy",d),c.setAttribute("r",6),c.setAttribute("fill","rgba(15, 23, 42, 0.9)"),c.setAttribute("stroke","#3b82f6"),c.setAttribute("stroke-width",2),c.setAttribute("opacity","0"),e.appendChild(c);const u=H("circle");u.setAttribute("cx",h),u.setAttribute("cy",d),u.setAttribute("r",4),u.setAttribute("fill","#3b82f6"),u.setAttribute("opacity","0"),u.style.cursor="pointer",e.appendChild(u);const T=Z(h,s.top+r+20,p.label,"middle","#94a3b8",14);e.appendChild(T),u.addEventListener("mouseenter",()=>{u.setAttribute("r",6),u.setAttribute("fill","#1d4ed8"),c.setAttribute("opacity","1");const L=document.getElementById("tooltip");L&&(L.style.display="block",L.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${p.label}</div>
          <div>Total Spending: ${Q(p.data.aTotal)} SEK</div>
          <div>Budget: ${Q(p.data.bTotal)} SEK</div>
          <div>Variance: ${Q(p.data.aTotal-p.data.bTotal)} SEK</div>
        `)}),u.addEventListener("mouseleave",()=>{u.setAttribute("r",4),u.setAttribute("fill","#3b82f6"),c.setAttribute("opacity","0");const L=document.getElementById("tooltip");L&&(L.style.display="none")}),u.addEventListener("mousemove",L=>{const k=document.getElementById("tooltip");k&&(k.style.left=L.pageX+10+"px",k.style.top=L.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{I.style.transition="opacity 1s ease-out",I.setAttribute("opacity","1")},200),setTimeout(()=>{x.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",x.style.strokeDashoffset="0"},400),setTimeout(()=>{g.forEach((p,m)=>{setTimeout(()=>{const h=e.querySelectorAll("circle"),d=m*2+2;h[d]&&(h[d].style.transition="opacity 0.3s ease-out",h[d].setAttribute("opacity","1")),h[d+1]&&(h[d+1].style.transition="opacity 0.3s ease-out",h[d+1].setAttribute("opacity","1"))},m*100)})},1e3)});const l=Z(o/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(l);const M=Z(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");M.setAttribute("transform",`rotate(-90, 20, ${a/2})`),e.appendChild(M)}function Q(t){return Math.round(t).toLocaleString("sv-SE")}function R(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function U(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=R("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function oe(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,s=60,n=20,r=40,v=60,f=o-s-n,g=a-r-v,b=i.slice(0,4),w=parseInt(i.slice(5,7)),A=[];if(w>=9){for(let c=9;c<=12;c++){const u=`${b}-${c.toString().padStart(2,"0")}`;A.push(u)}const d=(parseInt(b)+1).toString();for(let c=1;c<=8;c++){const u=`${d}-${c.toString().padStart(2,"0")}`;A.push(u)}}else{const d=(parseInt(b)-1).toString();for(let c=9;c<=12;c++){const u=`${d}-${c.toString().padStart(2,"0")}`;A.push(u)}for(let c=1;c<=8;c++){const u=`${b}-${c.toString().padStart(2,"0")}`;A.push(u)}}if(A.length===0)return;const S=A.map(d=>{const c=t.months[d]&&t.months[d].income||0,u=t.months[d]?N(t,d).aTotal:0;return{month:d,income:c,expenses:u}}),$=S.filter(d=>!isNaN(d.income)&&!isNaN(d.expenses));if($.length===0)return;const C=Math.max(1,...$.map(d=>Math.max(d.income,d.expenses))),y=Math.min(0,...$.map(d=>Math.min(d.income,d.expenses))),E=d=>r+g-(d-y)/(C-y)*g,I=d=>s+d/(A.length-1)*f,x=E(0);e.appendChild(R("line")).setAttributes({x1:s,y1:x,x2:s+f,y2:x,stroke:"#374151","stroke-width":1}),e.appendChild(R("line")).setAttributes({x1:s,y1:r,x2:s,y2:r+g,stroke:"#374151","stroke-width":1}),A.forEach((d,c)=>{const u=I(c);e.appendChild(U(u,x+20,d.slice(0,7),"middle","#94a3b8",14))});const l=5;for(let d=0;d<=l;d++){const c=y+d/l*(C-y),u=E(c);e.appendChild(U(s-10,u+5,ce(c),"end","#94a3b8",14)),e.appendChild(R("line")).setAttributes({x1:s,y1:u,x2:s+f,y2:u,stroke:"#374151","stroke-dasharray":"2,2","stroke-width":.5})}const M=R("path");let p=`M${I(0)},${E(S[0].income)}`;for(let d=1;d<S.length;d++)p+=`L${I(d)},${E(S[d].income)}`;M.setAttribute("d",p),M.setAttribute("fill","none"),M.setAttribute("stroke","#3b82f6"),M.setAttribute("stroke-width",3),e.appendChild(M);const m=R("path");let h=`M${I(0)},${E(S[0].expenses)}`;for(let d=1;d<S.length;d++)h+=`L${I(d)},${E(S[d].expenses)}`;m.setAttribute("d",h),m.setAttribute("fill","none"),m.setAttribute("stroke","#ef4444"),m.setAttribute("stroke-width",3),e.appendChild(m),S.forEach((d,c)=>{e.appendChild(R("circle")).setAttributes({cx:I(c),cy:E(d.income),r:4,fill:"#3b82f6",stroke:"#0a0e1a","stroke-width":2}),e.appendChild(R("circle")).setAttributes({cx:I(c),cy:E(d.expenses),r:4,fill:"#ef4444",stroke:"#0a0e1a","stroke-width":2})}),e.appendChild(U(s,r-15,"Monthly Income vs. Expenses","start","#f8fafc",18,"600")),e.appendChild(R("rect")).setAttributes({x:s+300,y:r-25,width:15,height:15,fill:"#3b82f6"}),e.appendChild(U(s+320,r-15,"Income","start","#f8fafc",14)),e.appendChild(R("rect")).setAttributes({x:s+400,y:r-25,width:15,height:15,fill:"#ef4444"}),e.appendChild(U(s+420,r-15,"Expenses","start","#f8fafc",14))}function ce(t){return Math.round(t).toLocaleString("sv-SE")}SVGElement.prototype.setAttributes=function(t){for(var i in t)this.setAttribute(i,t[i]);return this};let F=Vt();F.highlightedCategory=null;const de=document.getElementById("app");de.innerHTML=`
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
`;Dt(F,nt);Kt(F,et());Jt();mt();Pt(F,et());ut(F,nt);window.state=F;window.drawAll=mt;window.monthTotals=t=>N(F,t);function et(){return F.order[F.order.length-1]}function nt(){lt(F),Kt(F,et()),mt(),Pt(F,et()),ut(F,nt)}function Kt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const o=N(t,i),a=t.months[i].income||0,s=O(t,a-o.aTotal),n=a>0?(a-o.aTotal)/a:0,r=o.bTotal>0?o.aTotal/o.bTotal:0,f=t.order.filter(b=>b.slice(0,4)===i.slice(0,4)&&b<=i).map(b=>(t.months[b].income||0)-N(t,b).aTotal).reduce((b,w)=>b+w,0);[{lab:"Monthly Savings (real SEK)",val:kt(s)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:kt(O(t,f))+" SEK"}].forEach(b=>{const w=document.createElement("div");w.className="kpi",w.innerHTML=`<div class="lab">${b.lab}</div><div class="val">${b.val}</div>`,w.onclick=()=>{F.highlightedCategory=b.lab,nt()},e.appendChild(w)})}function mt(){const t=document.getElementById("monthSel").value;Xt(F,t),_t(F,t),Zt(F,t),Qt(F,t),ae(F,t),oe(F,t),ee(F,t),ie(F,t),se(F,t),re(F,t)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}
