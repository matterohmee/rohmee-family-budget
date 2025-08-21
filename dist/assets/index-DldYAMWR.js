(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();const pt={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},ht={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},B={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function gt(t,i=1){const e=[];let o=i,a=t;for(let s=0;s<12;s++)e.push(`${a}-${String(o).padStart(2,"0")}`),o++,o>12&&(o=1,a++);return e}function at(t,i){if(t.months[i])Object.keys(B).forEach(e=>{t.months[i].budget[e]||(t.months[i].budget[e]={},t.months[i].actual[e]={}),Object.keys(B[e]).forEach(o=>{t.months[i].budget[e][o]===void 0&&(t.months[i].budget[e][o]=B[e][o]),t.months[i].actual[e][o]===void 0&&(t.months[i].actual[e][o]=B[e][o])})}),t.months[i].income===void 0&&(t.months[i].income=t.defaultIncome||0);else{let e={},o={};Object.keys(B).forEach(a=>{e[a]={},o[a]={},Object.keys(B[a]).forEach(s=>{e[a][s]=B[a][s],o[a][s]=B[a][s]})}),t.months[i]={income:t.defaultIncome||0,budget:e,actual:o}}}const Bt="rohmee_budget_live",Ft=2,Ot=108e3;function Yt(){let t=localStorage.getItem(Bt);if(t)try{const e=JSON.parse(t);return e.version=e.version||0,Nt(e),(!e.order||!e.order.length)&&(e.order=gt(2025,9)),e.order.forEach(o=>at(e,o)),e.icons=e.icons||pt,e.tags=e.tags||ht,e}catch{}const i={defaultIncome:Ot,target:25e4,cpi:1,order:gt(2025,9),months:{},icons:pt,tags:ht,selected:null,version:Ft};return i.order.forEach(e=>at(i,e)),lt(i),i}function lt(t){localStorage.setItem(Bt,JSON.stringify(t))}function Vt(t){const i=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),e=document.createElement("a");e.href=URL.createObjectURL(i),e.download="rohmee_budget.json",e.click(),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)}function zt(t,i){const e=new FileReader;e.onload=()=>{try{const o=JSON.parse(e.result);Nt(o),lt(o),i(o)}catch{alert("Invalid JSON file")}},e.readAsText(t)}function Nt(t){t.version<2&&(t.defaultIncome=t.income||Ot,delete t.income,t.order&&t.order.forEach(i=>{const e=t.months[i];e&&e.income===void 0&&(e.income=t.defaultIncome)})),t.version=Ft}function N(t,i){at(t,i);const e=t.months[i],o=bt(e.budget),a=bt(e.actual);let s=0,n=0;return Object.keys(o).forEach(r=>{s+=o[r],n+=a[r]||0}),{bParents:o,aParents:a,bTotal:s,aTotal:n}}function jt(t,i){const e=t.order.indexOf(i);return e>0?t.order[e-1]:null}function O(t,i){return i/(t.cpi||1)}function Gt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function bt(t){let i={};return Object.keys(t).forEach(e=>i[e]=Gt(t[e])),i}function Dt(t,i){const e=document.getElementById("controls"),o=t.order[t.order.length-1];e.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${A(t.months[o].income||0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${A(t.target)}">
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
  `;const a=e.querySelector("#monthSel"),s=o.slice(5,7),n=o.slice(0,4),r=[];if(parseInt(s)>=9){for(let g=9;g<=12;g++){const f=`${n}-${g.toString().padStart(2,"0")}`;t.order.includes(f)&&r.push(f)}const h=(parseInt(n)+1).toString();for(let g=1;g<=8;g++){const f=`${h}-${g.toString().padStart(2,"0")}`;t.order.includes(f)&&r.push(f)}}else{const h=(parseInt(n)-1).toString();for(let g=9;g<=12;g++){const f=`${h}-${g.toString().padStart(2,"0")}`;t.order.includes(f)&&r.push(f)}for(let g=1;g<=8;g++){const f=`${n}-${g.toString().padStart(2,"0")}`;t.order.includes(f)&&r.push(f)}}t.order.forEach(h=>{r.includes(h)||r.push(h)}),r.forEach(h=>{const g=document.createElement("option");g.value=h,g.textContent=h,a.appendChild(g)}),a.value=o;const x=e.querySelector("#netIncome"),v=e.querySelector("#savTarget"),C=e.querySelector("#cpiFactor");function A(h){return Math.round(h).toLocaleString("sv-SE")}function M(h){return parseFloat(h.replace(/\s/g,"").replace(",","."))||0}a.addEventListener("change",h=>{x.value=A(t.months[a.value].income||0),v.value=A(t.target),C.value=t.cpi,i()}),x.addEventListener("input",h=>{const g=h.target.value.replace(/\s/g,""),f=M(g);isNaN(f)?(document.getElementById("netIncomeFeedback").innerHTML="&#10060;",document.getElementById("netIncomeFeedback").style.color="red"):(t.months[a.value].income=f,h.target.value=A(f),document.getElementById("netIncomeFeedback").innerHTML="&#10004;",document.getElementById("netIncomeFeedback").style.color="green"),i()}),v.addEventListener("input",h=>{const g=h.target.value.replace(/\s/g,""),f=M(g);isNaN(f)?(document.getElementById("savTargetFeedback").innerHTML="&#10060;",document.getElementById("savTargetFeedback").style.color="red"):(t.target=f,h.target.value=A(f),document.getElementById("savTargetFeedback").innerHTML="&#10004;",document.getElementById("savTargetFeedback").style.color="green"),i()}),C.addEventListener("input",h=>{const g=parseFloat(h.target.value);isNaN(g)?(document.getElementById("cpiFactorFeedback").innerHTML="&#10060;",document.getElementById("cpiFactorFeedback").style.color="red"):(t.cpi=g,document.getElementById("cpiFactorFeedback").innerHTML="&#10004;",document.getElementById("cpiFactorFeedback").style.color="green"),i()}),e.querySelector("#saveJSON").addEventListener("click",()=>Vt(t)),e.querySelector("#loadJsonInput").addEventListener("change",h=>{const g=h.target.files[0];g&&zt(g,f=>{Object.assign(t,f),i()})}),e.querySelector("#exportCSV").addEventListener("click",()=>{const h=[["Month","Parent","Sub","Budget","Actual"]];t.order.forEach(S=>{const y=t.months[S];Object.keys(y.budget).forEach(w=>Object.keys(y.budget[w]).forEach(T=>{h.push([S,w,T,y.budget[w][T],y.actual[w][T]])}))});const g=h.map(S=>S.map(y=>`"${String(y).replace('"','""')}"`).join(",")).join(`
`),f=document.createElement("a");f.href=URL.createObjectURL(new Blob([g],{type:"text/csv"})),f.download="budget.csv",f.click(),setTimeout(()=>URL.revokeObjectURL(f.href),1e3)})}let X={};function ut(t,i){const e=document.getElementById("monthSel").value,o=document.querySelector("#dataTable tbody");o.innerHTML="";const a=t.months[e];Object.keys(B).forEach(n=>{const r=vt(a.budget[n]||{}),x=vt(a.actual[n]||{}),v=document.createElement("tr");v.className="parent"+(x>r?" over":""),t.highlightedCategory&&n===t.highlightedCategory&&(v.style.backgroundColor="rgba(59, 130, 246, 0.2)",v.style.borderLeft="4px solid #3b82f6");const C=document.createElement("td"),A=document.createElement("span");A.textContent=X[n]?"▾":"▸",A.className="toggle",A.title="Collapse/expand",A.onclick=()=>{X[n]=!X[n],ut(t,i)};const M=document.createElement("span");M.className="icon",M.textContent=t.icons[n]||"",M.title="Click to set emoji",M.style.cursor="pointer",M.onclick=()=>{const l=prompt("Set emoji for "+n+":",t.icons[n]||"");l&&(t.icons[n]=l,i&&i())};const h=document.createElement("span");h.textContent=n,h.style.cursor="pointer",h.onclick=()=>{t.highlightedCategory=t.highlightedCategory===n?null:n,i&&i()},h.ondblclick=()=>{const l=prompt("Rename parent:",n);!l||B[l]||(B[l]=B[n],delete B[n],t.icons[l]=t.icons[n],delete t.icons[n],t.tags[l]=t.tags[n],delete t.tags[n],t.order.forEach(I=>{const p=t.months[I];p.budget[l]=p.budget[n],p.actual[l]=p.actual[n],delete p.budget[n],delete p.actual[n]}),i&&i())},v.onclick=l=>{l.target.closest(".rowtools")||l.target.closest(".toggle")||l.target.closest(".icon")||(t.highlightedCategory===n?t.highlightedCategory=null:t.highlightedCategory=n,i&&i())},t.highlightedCategory===n&&(v.style.background="rgba(59, 130, 246, 0.2)",v.style.borderLeft="4px solid #3b82f6");const g=document.createElement("span");g.className="rowtools";const f=document.createElement("span");f.className="chip",f.textContent=t.tags[n]==="F"?"Fixed":"Variable",f.title="Toggle Fixed/Variable",f.onclick=()=>{t.tags[n]=t.tags[n]==="F"?"V":"F",i&&i()};const S=document.createElement("span");S.className="chip",S.textContent="+",S.title="Add subcategory",S.onclick=()=>{const l=prompt("New subcategory under "+n+":");l&&(B[n][l]=0,t.order.forEach(I=>{const p=t.months[I];p.budget[n][l]=0,p.actual[n][l]=0}),i&&i())};const y=document.createElement("span");y.className="chip",y.textContent="−",y.title="Delete parent",y.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete B[n],delete t.icons[n],delete t.tags[n],t.order.forEach(l=>{const I=t.months[l];delete I.budget[n],delete I.actual[n]}),i&&i())},g.appendChild(f),g.appendChild(S),g.appendChild(y),C.appendChild(A),C.appendChild(M),C.appendChild(h),C.appendChild(g),v.appendChild(C);const w=document.createElement("td");w.className="num",w.textContent=_(O(t,r)),v.appendChild(w);const T=document.createElement("td");T.className="num",T.textContent=_(O(t,x)),v.appendChild(T);const E=document.createElement("td");E.className="num",E.textContent=_(O(t,r-x)),v.appendChild(E),o.appendChild(v),X[n]&&Object.keys(B[n]).forEach(l=>{const I=document.createElement("tr");(a.actual[n]||{})[l]>(a.budget[n]||{})[l]&&(I.className="over");const p=document.createElement("td"),m=document.createElement("span");m.textContent="• "+l,m.title="Double-click to rename",m.style.cursor="text",m.ondblclick=()=>{const $=prompt("Rename subcategory:",l);$&&(B[n][$]=B[n][l],delete B[n][l],t.order.forEach(L=>{const k=t.months[L];k.budget[n][$]=k.budget[n][l],k.actual[n][$]=k.actual[n][l],delete k.budget[n][l],delete k.actual[n][l]}),i&&i())},p.appendChild(m);const b=document.createElement("span");b.className="chip",b.textContent="−",b.title="Delete subcategory",b.style.marginLeft="8px",b.onclick=()=>{confirm("Delete "+l+"?")&&(delete B[n][l],t.order.forEach($=>{const L=t.months[$];delete L.budget[n][l],delete L.actual[n][l]}),i&&i())},p.appendChild(b),I.appendChild(p);const d=document.createElement("td");d.className="num",d.appendChild(ft(t,e,n,l,"budget",(a.budget[n]||{})[l]||0,i)),I.appendChild(d);const c=document.createElement("td");c.className="num",c.appendChild(ft(t,e,n,l,"actual",(a.actual[n]||{})[l]||0,i)),I.appendChild(c);const u=document.createElement("td");u.className="num",u.textContent=_(O(t,((a.budget[n]||{})[l]||0)-((a.actual[n]||{})[l]||0))),I.appendChild(u),o.appendChild(I)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(B[n]){alert("Parent already exists");return}B[n]={},t.icons[n]="📦",t.tags[n]="V",t.order.forEach(r=>{const x=t.months[r];x.budget[n]={},x.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function ft(t,i,e,o,a,s,n){const r=document.createElement("input");r.type="number",r.value=s,r.step="100",r.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const x=v=>{const C=+r.value||0;t.months[i][a][e][o]=C,n&&n()};return r.addEventListener("keydown",v=>{v.key==="Enter"?(x(v.shiftKey?"up":"down"),v.preventDefault()):v.key==="Escape"&&(r.value=s,r.blur())}),r.addEventListener("blur",()=>x()),r}function vt(t){let i=0;return Object.keys(t).forEach(e=>i+=+t[e]||0),i}function _(t){return Math.round(t).toLocaleString("sv-SE")}class qt{constructor(i){this.state=i}generateInsights(i){const e=[],o=this.getRecentMonths(i,6);if(o.length<3)return e;const a=this.analyzeTrend(o);a&&e.push(a);const s=this.analyzeBudgetVariance(o);s&&e.push(s);const n=this.analyzeCategorySpending(o);e.push(...n);const r=this.analyzeSavingsRate(o);r&&e.push(r);const x=this.analyzeSeasonalPatterns(i);return x&&e.push(x),e.slice(0,8)}getRecentMonths(i,e){const o=parseInt(i.slice(0,4)),a=parseInt(i.slice(5,7)),s=[];for(let n=0;n<e;n++){let r=a-n,x=o;r<=0&&(r+=12,x-=1);const v=`${x}-${r.toString().padStart(2,"0")}`;this.state.months[v]&&s.unshift({key:v,data:N(this.state,v),income:this.state.months[v].income||0})}return s}analyzeTrend(i){if(i.length<3)return null;const e=this.calculateTrend(i.map(a=>a.data.aTotal)),o=i.reduce((a,s)=>a+s.data.aTotal,0)/i.length;if(Math.abs(e)<o*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(e>0){const a=e/o*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(e/o*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const e=i[i.length-1],o=e.data.aTotal-e.data.bTotal,a=o/e.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:o>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(o)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(o))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const e=[],o=i[i.length-1];if(i.length>=2){const a=i[i.length-2];Object.keys(o.data.aParents).forEach(s=>{const n=o.data.aParents[s]||0,r=a.data.aParents[s]||0;if(r>0){const x=(n-r)/r*100;if(Math.abs(x)>20&&Math.abs(n-r)>1e3){const v=this.getCategoryIcon(s);x>0?e.push({type:"warning",category:"spending",title:`${s} Spending Increased`,message:`${s} spending increased by ${x.toFixed(1)}% (${this.fmt(n-r)} SEK).`,impact:x>50?"high":"medium",icon:v,recommendation:`Review your ${s.toLowerCase()} expenses and look for ways to optimize.`}):e.push({type:"positive",category:"spending",title:`${s} Spending Decreased`,message:`Great! ${s} spending decreased by ${Math.abs(x).toFixed(1)}% (${this.fmt(Math.abs(n-r))} SEK).`,impact:"positive",icon:v})}}})}return e.slice(0,3)}analyzeSavingsRate(i){const e=i[i.length-1],o=e.income>0?(e.income-e.data.aTotal)/e.income*100:0;return o<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${o.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:o>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${o.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${o.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const e=parseInt(i.slice(5,7));return e===11||e===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:e>=6&&e<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const e=i.length,o=e*(e-1)/2,a=i.reduce((r,x)=>r+x,0),s=i.reduce((r,x,v)=>r+v*x,0),n=i.reduce((r,x,v)=>r+v*v,0);return(e*s-o*a)/(e*n-o*o)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const e=[],o=this.getRecentMonths(i,3);if(o.length===0)return e;const a=o[o.length-1],r=o.reduce((v,C)=>v+C.data.aTotal,0)/o.length*6;if(e.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(r)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const v=(a.income-a.data.aTotal)*.7;e.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(v)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return e}}function Pt(t,i){const e=document.getElementById("insightsPanel");if(!e)return;const o=new qt(t),a=o.generateInsights(i),s=o.generateRecommendations(i);if(e.innerHTML="",a.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,e.appendChild(n);const r=document.getElementById("insightsGrid");a.forEach((x,v)=>{const C=Wt(x);r.appendChild(C)})}if(s.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,e.appendChild(n);const r=document.getElementById("recommendationsList");s.forEach((x,v)=>{const C=Ut(x);r.appendChild(C)})}requestAnimationFrame(()=>{e.querySelectorAll(".insight-card, .recommendation-card").forEach((r,x)=>{setTimeout(()=>{r.style.opacity="1",r.style.transform="translateY(0)"},x*100)})})}function Wt(t,i){const e=document.createElement("div");e.className=`insight-card insight-${t.type} insight-${t.impact}`,e.style.opacity="0",e.style.transform="translateY(20px)",e.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[t.impact]||{text:"",color:"var(--text-muted)"};return e.innerHTML=`
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
  `,document.head.appendChild(t)}function D(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=D("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function yt(t,i,e,o){const a=t.querySelector("defs")||t.appendChild(D("defs")),s=D("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=D("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=D("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function Xt(t,i){const e=document.getElementById("ytdGauge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=i.slice(0,4),s=t.order.filter(c=>c.slice(0,4)===o&&c<=i).map(c=>Math.max(0,(t.months[c].income||0)-N(t,c).aTotal)).reduce((c,u)=>c+u,0),n=t.target||0,r=n>0?Math.min(1,s/n):0,x=yt(e,"gaugeProgress","#10b981","#059669"),v=yt(e,"gaugeBg","#1e293b","#0f172a"),C=W(380,150,`${Math.round(r*100)}%`,"middle","#10b981",80,"900");e.appendChild(C);const A=W(380,240,`${xt(O(t,s))} SEK`,"middle","#f8fafc",32,"700");e.appendChild(A);const M=W(380,290,`of ${xt(O(t,n))} SEK target`,"middle","#94a3b8",20,"500");e.appendChild(M);const h=r>=1?"#10b981":r>=.8?"#f59e0b":"#ef4444",g=r>=1?"✓ Target Achieved":r>=.8?"⚡ On Track":"⚠ Behind Target",f=W(380,350,g,"middle",h,24,"600");e.appendChild(f);const S=500,y=30,w=380-S/2,T=380,E=D("rect");E.setAttribute("x",w),E.setAttribute("y",T),E.setAttribute("width",S),E.setAttribute("height",y),E.setAttribute("fill",v),E.setAttribute("rx",10),E.setAttribute("opacity","0.3"),e.appendChild(E);const l=D("rect");l.setAttribute("x",w),l.setAttribute("y",T),l.setAttribute("width",0),l.setAttribute("height",y),l.setAttribute("fill",x),l.setAttribute("rx",10),l.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"),l.style.transition="width 2s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(l),requestAnimationFrame(()=>{setTimeout(()=>{l.setAttribute("width",S*r)},100)}),["0%","25%","50%","75%","100%"].forEach((c,u)=>{const $=w+S*u/4,L=W($,T+60,c,"middle","#64748b",30,"500");e.appendChild(L)});let p=0;const m=Math.round(r*100),b=m/60;function d(){p<m&&(p+=b,C.textContent=Math.round(Math.min(p,m))+"%",requestAnimationFrame(d))}setTimeout(d,200)}function xt(t){return Math.round(t).toLocaleString("sv-SE")}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=Y("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function At(t,i,e,o){const a=t.querySelector("defs")||t.appendChild(Y("defs")),s=Y("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=Y("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=Y("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function _t(t,i){const e=document.getElementById("fixedVarMini");for(;e.firstChild;)e.removeChild(e.firstChild);const o=N(t,i);let a=0,s=0;Object.keys(o.aParents).forEach(V=>{t.tags[V]==="F"?a+=o.aParents[V]||0:s+=o.aParents[V]||0});const n=a+s||1,r=Math.round(a/n*100),x=Math.round(s/n*100),v=At(e,"fixedGrad","#8b5cf6","#7c3aed"),C=At(e,"variableGrad","#06b6d4","#0891b2"),A=200,M=j(A,150,"0%","middle","#8b5cf6",60,"900");e.appendChild(M);const h=j(A,220,"Fixed Expenses","middle","#8b5cf6",20,"600");e.appendChild(h);const g=j(A,280,`${wt(O(t,a))} SEK`,"middle","#a78bfa",16,"500");e.appendChild(g);const f=560,S=j(f,150,"0%","middle","#06b6d4",60,"900");e.appendChild(S);const y=j(f,220,"Variable Expenses","middle","#06b6d4",20,"600");e.appendChild(y);const w=j(f,280,`${wt(O(t,s))} SEK`,"middle","#67e8f9",16,"500");e.appendChild(w);const T=320,E=40,l=600,I=380-l/2,p=l*(a/n),m=Y("rect");m.setAttribute("x",I),m.setAttribute("y",T),m.setAttribute("width",0),m.setAttribute("height",E),m.setAttribute("fill",v),m.setAttribute("rx",15),m.setAttribute("filter","drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"),m.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(m);const b=l*(s/n),d=Y("rect");d.setAttribute("x",I+p),d.setAttribute("y",T),d.setAttribute("width",0),d.setAttribute("height",E),d.setAttribute("fill",C),d.setAttribute("rx",15),d.setAttribute("filter","drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"),d.style.transition="width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",e.appendChild(d);const c=Y("rect");c.setAttribute("x",I),c.setAttribute("y",T),c.setAttribute("width",l),c.setAttribute("height",E),c.setAttribute("fill","#1e293b"),c.setAttribute("rx",15),c.setAttribute("opacity","0.3"),e.insertBefore(c,m),requestAnimationFrame(()=>{setTimeout(()=>{m.setAttribute("width",p)},200),setTimeout(()=>{d.setAttribute("x",I+p),d.setAttribute("width",b)},400)});const u=j(380,140,"VS","middle","#64748b",32,"600");e.appendChild(u);const $=Y("line");$.setAttribute("x1",380),$.setAttribute("y1",60),$.setAttribute("x2",380),$.setAttribute("y2",230),$.setAttribute("stroke","#374151"),$.setAttribute("stroke-width",2),$.setAttribute("opacity","0.5"),e.appendChild($);let L=0,k=0;const P=r/50,K=x/50;function q(){(L<r||k<x)&&(L<r&&(L+=P,M.textContent=Math.round(Math.min(L,r))+"%"),k<x&&(k+=K,S.textContent=Math.round(Math.min(k,x))+"%"),requestAnimationFrame(q))}setTimeout(q,300),m.style.cursor="pointer",d.style.cursor="pointer",m.addEventListener("mouseenter",()=>{m.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),m.addEventListener("mouseleave",()=>{m.style.filter="drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))"}),d.addEventListener("mouseenter",()=>{d.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),d.addEventListener("mouseleave",()=>{d.style.filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))"})}function wt(t){return Math.round(t).toLocaleString("sv-SE")}const ot=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Et=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=ot("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function Zt(t,i){const e=document.getElementById("glidepath");for(;e.firstChild;)e.removeChild(e.firstChild);const o=600,a=250,s=50,n=20,r=20,x=40,v=o-s-n,C=a-r-x,A=i.slice(0,4),M=parseInt(i.slice(5,7)),h=[];if(M>=9){for(let u=9;u<=12;u++){const $=`${A}-${u.toString().padStart(2,"0")}`;h.push($)}const c=(parseInt(A)+1).toString();for(let u=1;u<=8;u++){const $=`${c}-${u.toString().padStart(2,"0")}`;h.push($)}}else{const c=(parseInt(A)-1).toString();for(let u=9;u<=12;u++){const $=`${c}-${u.toString().padStart(2,"0")}`;h.push($)}for(let u=1;u<=8;u++){const $=`${A}-${u.toString().padStart(2,"0")}`;h.push($)}}const g=t.order.indexOf(i),f=h.filter(c=>t.order.indexOf(c)<=g&&t.order.indexOf(c)>=0),S=f.map(c=>Math.max(0,(t.months[c]&&t.months[c].income||0)-(t.months[c]?N(t,c).aTotal:0))).reduce((c,u)=>c+u,0),y=12-f.length,w=Math.max(0,(t.target||0)-S),T=y>0?w/y:0,E=(t.target||0)/12,l=[];h.forEach(c=>{t.order.indexOf(c)<=g&&t.order.indexOf(c)>=0?l.push({m:c,v:Math.max(0,(t.months[c]&&t.months[c].income||0)-(t.months[c]?N(t,c).aTotal:0)),t:"a"}):l.push({m:c,v:T,t:"r"})});const I=Math.max(E,...l.map(c=>c.v),1),p=v/h.length*.65;l.forEach((c,u)=>{const $=c.v/I*C,L=s+u*(v/h.length)+(v/h.length-p)/2,k=r+C-$,P=c.t==="a"?c.v>=E?"#10b981":"#ef4444":"#f59e0b",K=ot("rect");K.setAttribute("x",L),K.setAttribute("y",k),K.setAttribute("width",p),K.setAttribute("height",$),K.setAttribute("fill",P),e.appendChild(K),e.appendChild(Et(L+p/2,a-12,c.m.slice(5),"middle","#9aa3b2",12))});const m=r+C-E/I*C,b=ot("line");b.setAttribute("x1",s),b.setAttribute("x2",s+v),b.setAttribute("y1",m),b.setAttribute("y2",m),b.setAttribute("stroke","#93c5fd"),b.setAttribute("stroke-dasharray","5,5"),e.appendChild(b),e.appendChild(Et(s+v-6,m-6,"Monthly target "+Ct(O(t,E)),"end","#cfe4ff",16));const d=document.getElementById("glidePill");d&&(w<=0?(d.textContent="On track ✔",d.classList.add("ok")):(d.textContent="From now: need "+Ct(O(t,T))+" SEK / month",d.classList.remove("ok")))}function Ct(t){return Math.round(t).toLocaleString("sv-SE")}const ct=t=>document.createElementNS("http://www.w3.org/2000/svg",t),St=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=ct("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function Qt(t,i){const e=document.getElementById("barSummary");for(;e.firstChild;)e.removeChild(e.firstChild);const o=760,a=320,s=110,n=20,r=20,x=40,v=o-s-n,C=a-r-x,A=N(t,i),M=t.months[i].income||0,h=[{lab:"Income",val:M,c:"#60a5fa"},{lab:"Budget",val:A.bTotal,c:"#3b82f6"},{lab:"Actual",val:A.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,M-A.aTotal),c:"#34d399"}],g=Math.max(...h.map(y=>y.val),1),f=C/h.length*.55;h.forEach((y,w)=>{const T=r+w*(C/h.length)+(C/h.length-f)/2,E=y.val/g*v,l=ct("rect");l.setAttribute("x",s),l.setAttribute("y",T),l.setAttribute("width",E),l.setAttribute("height",f),l.setAttribute("fill",y.c),e.appendChild(l),e.appendChild(St(s-10,T+f/2+4,y.lab,"end","#cbd5e1",16)),e.appendChild(St(s+E+6,T+f/2+4,te(O(t,y.val)),"start","#cbd5e1",16))});const S=ct("line");S.setAttribute("x1",s),S.setAttribute("x2",s),S.setAttribute("y1",r),S.setAttribute("y2",r+C),S.setAttribute("stroke","#243049"),e.appendChild(S)}function te(t){return Math.round(t).toLocaleString("sv-SE")}const dt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),$t=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=dt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function ee(t,i){const e=document.getElementById("shareBars");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=700,s=280,n=40,r=30,x=60,v=o-s-n,C=a-r-x,A=N(t,i),M=Object.keys(B).map(y=>({p:y,v:A.aParents[y]||0})).sort((y,w)=>w.v-y.v),h=M.reduce((y,w)=>y+w.v,0)||1,g=M.length,f=C/g*.75;M.forEach((y,w)=>{const T=r+w*(C/g)+(C/g-f)/2,E=y.v/h*v,l=t.highlightedCategory===y.p,I=l?"#f59e0b":"#3b82f6",p=t.highlightedCategory&&!l?.3:1,m=dt("rect");m.setAttribute("x",s),m.setAttribute("y",T),m.setAttribute("width",E),m.setAttribute("height",f),m.setAttribute("fill",I),m.setAttribute("opacity",p),l&&m.setAttribute("filter","drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"),e.appendChild(m);const b=t.highlightedCategory&&!l?.5:1,d=(t.icons[y.p]||"")+" "+y.p,c=$t(s-16,T+f/2+6,d,"end","#cbd5e1",15);c.setAttribute("opacity",b),e.appendChild(c);const u=$t(s+E+12,T+f/2+6,(y.v/h*100).toFixed(1)+"%  ·  "+ne(O(t,y.v))+" SEK","start","#cbd5e1",14);u.setAttribute("opacity",b),e.appendChild(u)});const S=dt("line");S.setAttribute("x1",s),S.setAttribute("x2",s),S.setAttribute("y1",r),S.setAttribute("y2",r+C),S.setAttribute("stroke","#243049"),e.appendChild(S)}function ne(t){return Math.round(t).toLocaleString("sv-SE")}const tt=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Tt=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=tt("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function ie(t,i){const e=document.getElementById("baParents");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=460,s=260,n=40,r=20,x=60,v=o-s-n,C=a-r-x,A=N(t,i),M=Object.keys(B).map(w=>({p:w,b:A.bParents[w]||0,a:A.aParents[w]||0})).sort((w,T)=>T.a-w.a),h=M.length,g=C/h,f=g*.35,S=Math.max(...M.map(w=>Math.max(w.a,w.b)),1);M.forEach((w,T)=>{const E=r+T*g+g/2,l=w.b/S*v,I=w.a/S*v,p=t.highlightedCategory===w.p,m=p?"#f59e0b":"#3b82f6",b=p?"#f97316":"#10b981",d=t.highlightedCategory&&!p?.3:1,c=t.highlightedCategory&&!p?.5:1,u=tt("rect");u.setAttribute("x",s),u.setAttribute("y",E-f-3),u.setAttribute("width",l),u.setAttribute("height",f),u.setAttribute("fill",m),u.setAttribute("opacity",d),p&&u.setAttribute("filter","drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"),e.appendChild(u);const $=tt("rect");$.setAttribute("x",s),$.setAttribute("y",E+3),$.setAttribute("width",I),$.setAttribute("height",f),$.setAttribute("fill",b),$.setAttribute("opacity",d),p&&$.setAttribute("filter","drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))"),e.appendChild($);const L=(t.icons[w.p]||"")+" "+w.p,k=Tt(s-14,E+4,L,"end","#cbd5e1",14);k.setAttribute("opacity",c),e.appendChild(k);const P=Tt(s+Math.max(l,I)+10,E+4,"B "+It(O(t,w.b))+"  A "+It(O(t,w.a)),"start","#cbd5e1",12);P.setAttribute("opacity",c),e.appendChild(P)});const y=tt("line");y.setAttribute("x1",s),y.setAttribute("x2",s),y.setAttribute("y1",r),y.setAttribute("y2",r+C),y.setAttribute("stroke","#243049"),e.appendChild(y)}function It(t){return Math.round(t).toLocaleString("sv-SE")}const Ht=t=>document.createElementNS("http://www.w3.org/2000/svg",t),Mt=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=Ht("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function se(t,i){const e=document.getElementById("heatmapVar");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=440,s=260,n=40,r=20,x=40,v=o-s-n,C=a-r-x,A=i.slice(0,4),M=parseInt(i.slice(5,7)),h=[];if(M>=9){for(let m=9;m<=12;m++){const b=`${A}-${m.toString().padStart(2,"0")}`;h.push(b)}const p=(parseInt(A)+1).toString();for(let m=1;m<=8;m++){const b=`${p}-${m.toString().padStart(2,"0")}`;h.push(b)}}else{const p=(parseInt(A)-1).toString();for(let m=9;m<=12;m++){const b=`${p}-${m.toString().padStart(2,"0")}`;h.push(b)}for(let m=1;m<=8;m++){const b=`${A}-${m.toString().padStart(2,"0")}`;h.push(b)}}const g=Object.keys(B),f=h.length,S=[],y=[];g.forEach(p=>{const m=[];h.forEach(b=>{const d=N(t,b),c=d.bParents[p]||0,u=d.aParents[p]||0,$=c?(u-c)/c:0;m.push({p,b:c,a:u,v:$,m:b}),y.push($)}),S.push(m)});const w=Math.min(...y),T=Math.max(...y),E=v/f,l=C/g.length;function I(p){const m=p<=0?150:0,b=p<=0?w===0?1:-w:T===0?1:T,c=30+30*Math.min(1,Math.abs(p)/b||0);return`hsl(${m},70%,${c}%)`}S.forEach((p,m)=>{p.forEach((d,c)=>{const u=Ht("rect");u.setAttribute("x",s+c*E),u.setAttribute("y",r+m*l),u.setAttribute("width",E-2),u.setAttribute("height",l-2),u.setAttribute("fill",I(d.v)),t.highlightedCategory&&d.p===t.highlightedCategory&&(u.setAttribute("stroke","#3b82f6"),u.setAttribute("stroke-width","3")),u.addEventListener("mouseenter",$=>{const L=document.getElementById("tooltip"),k=d.a-d.b,P=k>=0?"+":"";L.innerHTML=`<div><b>${d.p}</b> · <span class='t'>${d.m}</span></div>
                        <div>Budget: <b>${st(O(t,d.b))}</b> SEK</div>
                        <div>Actual: <b>${st(O(t,d.a))}</b> SEK</div>
                        <div>Variance: <b>${P+st(O(t,k))}</b> (${d.b?(k/d.b*100).toFixed(1):"0.0"}%)</div>`,L.style.left=$.clientX+12+"px",L.style.top=$.clientY+12+"px",L.style.display="block"}),u.addEventListener("mousemove",$=>{const L=document.getElementById("tooltip");L.style.left=$.clientX+12+"px",L.style.top=$.clientY+12+"px"}),u.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),e.appendChild(u)});const b=(t.icons[g[m]]||"")+" "+g[m];e.appendChild(Mt(s-14,r+m*l+l/2+4,b,"end",t.highlightedCategory===g[m]?"#ffffff":"#cbd5e1",18))}),h.forEach((p,m)=>e.appendChild(Mt(s+m*E+E/2,a-12,p.slice(5),"middle","#9aa3b2",16)))}function st(t){return Math.round(t).toLocaleString("sv-SE")}const J=t=>document.createElementNS("http://www.w3.org/2000/svg",t),G=(t,i,e,o="start",a="#cbd5e1",s=12)=>{const n=J("text");return n.setAttribute("x",t),n.setAttribute("y",i),n.setAttribute("text-anchor",o),n.setAttribute("fill",a),n.setAttribute("font-size",s),n.textContent=e,n};function re(t,i){const e=document.getElementById("bridge");for(;e.firstChild;)e.removeChild(e.firstChild);const o=jt(t,i);if(!o){e.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",18));return}const a=1200,s=420,n=80,r=40,x=30,v=60,C=a-n-r,A=s-x-v,M=N(t,i),h=N(t,o),g=h.aTotal,f=M.aTotal,S=Object.keys(B).map(c=>({p:c,icon:t.icons[c]||"",delta:(M.aParents[c]||0)-(h.aParents[c]||0)})).sort((c,u)=>Math.abs(u.delta)-Math.abs(c.delta)),y=S.slice(0,Math.min(10,S.length)),w=S.slice(y.length).reduce((c,u)=>c+u.delta,0);Math.abs(w)>.5&&y.push({p:"Others",icon:"",delta:w});const T=C/(y.length+3),E=x+A;let l=n+T;function I(c){const u=Math.max(g,f,Math.max(...y.map($=>Math.abs($.delta)))+Math.max(g,f));return x+A-c/u*A}const p=J("rect");p.setAttribute("x",l-24),p.setAttribute("y",I(g)),p.setAttribute("width",48),p.setAttribute("height",E-I(g)),p.setAttribute("fill","#64748b"),e.appendChild(p),e.appendChild(G(l,s-18,"Start","middle","#9aa3b2",16)),e.appendChild(G(l,I(g)-6,rt(O(t,g)),"middle","#cbd5e1",16));let m=g;l+=T,y.forEach(c=>{const u=c.delta,$=u>=0,L=I(m),k=I(m+u),P=Math.min(L,k),K=Math.abs(k-L);let q=$?"#ef4444":"#10b981",V=1;t.highlightedCategory&&(c.p===t.highlightedCategory?(q=$?"#dc2626":"#059669",V=1):V=.3);const z=J("rect");z.setAttribute("x",l-24),z.setAttribute("y",P),z.setAttribute("width",48),z.setAttribute("height",K),z.setAttribute("fill",q),z.setAttribute("opacity",V),e.appendChild(z);const it=(c.icon?c.icon+" ":"")+c.p;e.appendChild(G(l,s-18,it.length>14?it.slice(0,14)+"…":it,"middle",t.highlightedCategory===c.p?"#ffffff":"#9aa3b2",16));const Rt=($?"+":"")+rt(O(t,u));e.appendChild(G(l,P-6,Rt,"middle",t.highlightedCategory===c.p?"#ffffff":"#cbd5e1",16)),m+=u,l+=T});const b=J("rect");b.setAttribute("x",l-24),b.setAttribute("y",I(f)),b.setAttribute("width",48),b.setAttribute("height",E-I(f)),b.setAttribute("fill","#64748b"),e.appendChild(b),e.appendChild(G(l,s-18,"End","middle","#9aa3b2",16)),e.appendChild(G(l,I(f)-6,rt(O(t,f)),"middle","#cbd5e1",16));const d=J("line");d.setAttribute("x1",n*.6),d.setAttribute("x2",a-r),d.setAttribute("y1",E),d.setAttribute("y2",E),d.setAttribute("stroke","#243049"),e.appendChild(d)}function rt(t){return Math.round(t).toLocaleString("sv-SE")}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function Z(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=H("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function Lt(t,i,e,o){const a=t.querySelector("defs")||t.appendChild(H("defs")),s=H("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","0%"),s.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",e);const r=H("stop");return r.setAttribute("offset","100%"),r.setAttribute("stop-color",o),s.appendChild(n),s.appendChild(r),a.appendChild(s),`url(#${i})`}function ae(t,i){const e=document.getElementById("spendingTrends");if(!e)return;for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,s={top:40,right:60,bottom:60,left:80},n=o-s.left-s.right,r=a-s.top-s.bottom,x=i.slice(0,4),v=parseInt(i.slice(5,7)),C=[];for(let p=11;p>=0;p--){let m=v-p,b=parseInt(x);m<=0&&(m+=12,b-=1);const d=`${b}-${m.toString().padStart(2,"0")}`;t.months[d]&&C.push({key:d,label:d.slice(5,7),data:N(t,d)})}if(C.length===0)return;const A=Math.max(...C.map(p=>p.data.aTotal)),M=n/(C.length-1),h=r/A,g=Lt(e,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),f=Lt(e,"trendLine","#3b82f6","#1d4ed8"),S=H("rect");S.setAttribute("x",s.left),S.setAttribute("y",s.top),S.setAttribute("width",n),S.setAttribute("height",r),S.setAttribute("fill","rgba(15, 23, 42, 0.5)"),S.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),S.setAttribute("rx",8),e.appendChild(S);for(let p=0;p<=5;p++){const m=s.top+r/5*p,b=H("line");b.setAttribute("x1",s.left),b.setAttribute("y1",m),b.setAttribute("x2",s.left+n),b.setAttribute("y2",m),b.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),b.setAttribute("stroke-width",1),b.setAttribute("stroke-dasharray","2,2"),e.appendChild(b);const d=A-A/5*p,c=Z(s.left-10,m+4,Q(d),"end","#94a3b8",14);e.appendChild(c)}let y=`M ${s.left} ${s.top+r}`,w="M";C.forEach((p,m)=>{const b=s.left+m*M,d=s.top+r-p.data.aTotal*h;m===0?(w+=` ${b} ${d}`,y+=` L ${b} ${d}`):(w+=` L ${b} ${d}`,y+=` L ${b} ${d}`)}),y+=` L ${s.left+(C.length-1)*M} ${s.top+r} Z`;const T=H("path");T.setAttribute("d",y),T.setAttribute("fill",g),T.setAttribute("opacity","0"),e.appendChild(T);const E=H("path");E.setAttribute("d",w),E.setAttribute("fill","none"),E.setAttribute("stroke",f),E.setAttribute("stroke-width",3),E.setAttribute("stroke-linecap","round"),E.setAttribute("stroke-linejoin","round"),E.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),E.style.strokeDasharray=E.getTotalLength(),E.style.strokeDashoffset=E.getTotalLength(),e.appendChild(E),C.forEach((p,m)=>{const b=s.left+m*M,d=s.top+r-p.data.aTotal*h,c=H("circle");c.setAttribute("cx",b),c.setAttribute("cy",d),c.setAttribute("r",6),c.setAttribute("fill","rgba(15, 23, 42, 0.9)"),c.setAttribute("stroke","#3b82f6"),c.setAttribute("stroke-width",2),c.setAttribute("opacity","0"),e.appendChild(c);const u=H("circle");u.setAttribute("cx",b),u.setAttribute("cy",d),u.setAttribute("r",4),u.setAttribute("fill","#3b82f6"),u.setAttribute("opacity","0"),u.style.cursor="pointer",e.appendChild(u);const $=Z(b,s.top+r+20,p.label,"middle","#94a3b8",14);e.appendChild($),u.addEventListener("mouseenter",()=>{u.setAttribute("r",6),u.setAttribute("fill","#1d4ed8"),c.setAttribute("opacity","1");const L=document.getElementById("tooltip");L&&(L.style.display="block",L.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${p.label}</div>
          <div>Total Spending: ${Q(p.data.aTotal)} SEK</div>
          <div>Budget: ${Q(p.data.bTotal)} SEK</div>
          <div>Variance: ${Q(p.data.aTotal-p.data.bTotal)} SEK</div>
        `)}),u.addEventListener("mouseleave",()=>{u.setAttribute("r",4),u.setAttribute("fill","#3b82f6"),c.setAttribute("opacity","0");const L=document.getElementById("tooltip");L&&(L.style.display="none")}),u.addEventListener("mousemove",L=>{const k=document.getElementById("tooltip");k&&(k.style.left=L.pageX+10+"px",k.style.top=L.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{T.style.transition="opacity 1s ease-out",T.setAttribute("opacity","1")},200),setTimeout(()=>{E.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",E.style.strokeDashoffset="0"},400),setTimeout(()=>{C.forEach((p,m)=>{setTimeout(()=>{const b=e.querySelectorAll("circle"),d=m*2+2;b[d]&&(b[d].style.transition="opacity 0.3s ease-out",b[d].setAttribute("opacity","1")),b[d+1]&&(b[d+1].style.transition="opacity 0.3s ease-out",b[d+1].setAttribute("opacity","1"))},m*100)})},1e3)});const l=Z(o/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");e.appendChild(l);const I=Z(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");I.setAttribute("transform",`rotate(-90, 20, ${a/2})`),e.appendChild(I)}function Q(t){return Math.round(t).toLocaleString("sv-SE")}function R(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function U(t,i,e,o="start",a="#cbd5e1",s=12,n="normal"){const r=R("text");return r.setAttribute("x",t),r.setAttribute("y",i),r.setAttribute("text-anchor",o),r.setAttribute("fill",a),r.setAttribute("font-size",s),r.setAttribute("font-weight",n),r.setAttribute("font-family","Inter, system-ui, sans-serif"),r.textContent=e,r}function oe(t,i){const e=document.getElementById("monthlyTrends");for(;e.firstChild;)e.removeChild(e.firstChild);const o=1200,a=400,s=60,n=20,r=40,x=60,v=o-s-n,C=a-r-x,A=i.slice(0,4),M=parseInt(i.slice(5,7)),h=[];if(M>=9){for(let c=9;c<=12;c++){const u=`${A}-${c.toString().padStart(2,"0")}`;h.push(u)}const d=(parseInt(A)+1).toString();for(let c=1;c<=8;c++){const u=`${d}-${c.toString().padStart(2,"0")}`;h.push(u)}}else{const d=(parseInt(A)-1).toString();for(let c=9;c<=12;c++){const u=`${d}-${c.toString().padStart(2,"0")}`;h.push(u)}for(let c=1;c<=8;c++){const u=`${A}-${c.toString().padStart(2,"0")}`;h.push(u)}}if(h.length===0)return;const g=h.map(d=>{const c=t.months[d]&&t.months[d].income||0,u=t.months[d]?N(t,d).aTotal:0;return{month:d,income:c,expenses:u}}),f=g.filter(d=>!isNaN(d.income)&&!isNaN(d.expenses));if(f.length===0)return;const S=Math.max(1,...f.map(d=>Math.max(d.income,d.expenses))),y=Math.min(0,...f.map(d=>Math.min(d.income,d.expenses))),w=d=>r+C-(d-y)/(S-y)*C,T=d=>s+d/(h.length-1)*v,E=w(0);e.appendChild(R("line")).setAttributes({x1:s,y1:E,x2:s+v,y2:E,stroke:"#374151","stroke-width":1}),e.appendChild(R("line")).setAttributes({x1:s,y1:r,x2:s,y2:r+C,stroke:"#374151","stroke-width":1}),h.forEach((d,c)=>{const u=T(c);e.appendChild(U(u,E+20,d.slice(0,7),"middle","#94a3b8",14))});const l=5;for(let d=0;d<=l;d++){const c=y+d/l*(S-y),u=w(c);e.appendChild(U(s-10,u+5,ce(c),"end","#94a3b8",14)),e.appendChild(R("line")).setAttributes({x1:s,y1:u,x2:s+v,y2:u,stroke:"#374151","stroke-dasharray":"2,2","stroke-width":.5})}const I=R("path");let p=`M${T(0)},${w(g[0].income)}`;for(let d=1;d<g.length;d++)p+=`L${T(d)},${w(g[d].income)}`;I.setAttribute("d",p),I.setAttribute("fill","none"),I.setAttribute("stroke","#3b82f6"),I.setAttribute("stroke-width",3),e.appendChild(I);const m=R("path");let b=`M${T(0)},${w(g[0].expenses)}`;for(let d=1;d<g.length;d++)b+=`L${T(d)},${w(g[d].expenses)}`;m.setAttribute("d",b),m.setAttribute("fill","none"),m.setAttribute("stroke","#ef4444"),m.setAttribute("stroke-width",3),e.appendChild(m),g.forEach((d,c)=>{e.appendChild(R("circle")).setAttributes({cx:T(c),cy:w(d.income),r:4,fill:"#3b82f6",stroke:"#0a0e1a","stroke-width":2}),e.appendChild(R("circle")).setAttributes({cx:T(c),cy:w(d.expenses),r:4,fill:"#ef4444",stroke:"#0a0e1a","stroke-width":2})}),e.appendChild(U(s,r-15,"Monthly Income vs. Expenses","start","#f8fafc",18,"600")),e.appendChild(R("rect")).setAttributes({x:s+300,y:r-25,width:15,height:15,fill:"#3b82f6"}),e.appendChild(U(s+320,r-15,"Income","start","#f8fafc",14)),e.appendChild(R("rect")).setAttributes({x:s+400,y:r-25,width:15,height:15,fill:"#ef4444"}),e.appendChild(U(s+420,r-15,"Expenses","start","#f8fafc",14))}function ce(t){return Math.round(t).toLocaleString("sv-SE")}SVGElement.prototype.setAttributes=function(t){for(var i in t)this.setAttribute(i,t[i]);return this};let F=Yt();F.highlightedCategory=null;const de=document.getElementById("app");de.innerHTML=`
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
`;Dt(F,nt);Kt(F,et());Jt();mt();Pt(F,et());ut(F,nt);window.state=F;window.drawAll=mt;window.monthTotals=t=>N(F,t);function et(){return F.order[F.order.length-1]}function nt(){lt(F),Kt(F,et()),mt(),Pt(F,et()),ut(F,nt)}function Kt(t,i){const e=document.getElementById("kpiStrip");e.innerHTML="";const o=N(t,i),a=t.months[i].income||0,s=O(t,a-o.aTotal),n=a>0?(a-o.aTotal)/a:0,r=o.bTotal>0?o.aTotal/o.bTotal:0,v=t.order.filter(A=>A.slice(0,4)===i.slice(0,4)&&A<=i).map(A=>(t.months[A].income||0)-N(t,A).aTotal).reduce((A,M)=>A+M,0);[{lab:"Monthly Savings (real SEK)",val:kt(s)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(r*100).toFixed(0)+" %"},{lab:"YTD Savings",val:kt(O(t,v))+" SEK"}].forEach(A=>{const M=document.createElement("div");M.className="kpi",M.innerHTML=`<div class="lab">${A.lab}</div><div class="val">${A.val}</div>`,M.onclick=()=>{F.highlightedCategory=A.lab,nt()},e.appendChild(M)})}function mt(){const t=document.getElementById("monthSel").value;Xt(F,t),_t(F,t),Zt(F,t),Qt(F,t),ae(F,t),oe(F,t),ee(F,t),ie(F,t),se(F,t),re(F,t)}function kt(t){return Math.round(t).toLocaleString("sv-SE")}
