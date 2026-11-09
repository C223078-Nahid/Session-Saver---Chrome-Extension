(()=>{try{if(!chrome?.runtime?.id)return}catch{return}if(window.top!==window)return;const Q=window;if(Q.__sessionSaverNav)return;Q.__sessionSaverNav=!0;const H=t=>new Promise(e=>{try{const n=chrome.runtime.sendMessage(t);n&&typeof n.then=="function"?n.then(e,()=>e(null)):e(null)}catch{e(null)}}),b=40,B=8,pt=6,ut=430,N=64,ft=18,mt=46,ht=230,Z=.78,xt=.92,gt=240,wt=330,q="#1a73e8",tt="#9aa0a6";let z=[],h=0,R=null,x=null,a=null,f=null,k=null,X=null,g=null,E=null,v=null,Y=!1,I=null,G=null;const S=(t,e,n)=>Math.max(e,Math.min(n,t)),J=()=>{try{return typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}};function et(t){return{x:S(t.x,B,Math.max(B,window.innerWidth-b-B)),y:S(t.y,B,Math.max(B,window.innerHeight-b-B))}}function L(t,e){const n=et(e);t.style.left=`${n.x}px`,t.style.top=`${n.y}px`}function nt(t,e,n){L(t,e??{x:16,y:Math.max(B,window.innerHeight-n)})}const M=t=>t==="back"?h>0:h<z.length-1;function yt(){!a||!f||(a.style.color=M("back")?q:tt,f.style.color=M("fwd")?q:tt,a.style.cursor=M("back")?"pointer":"default",f.style.cursor=M("fwd")?"pointer":"default",a.style.opacity=M("back")?"1":"0.55",f.style.opacity=M("fwd")?"1":"0.55",a.setAttribute("aria-disabled",M("back")?"false":"true"),f.setAttribute("aria-disabled",M("fwd")?"false":"true"))}function vt(t){let e=t.url;try{const n=new URL(t.url);e=n.hostname+(n.pathname==="/"?"":n.pathname)}catch{}return{title:t.title?.trim()||e,sub:t.url}}const ot=["#e8f0fe","#e6f4ea","#fef7e0","#fce8e6","#f3e8fd","#e4f7fb"];function bt(t){let e=0;for(let n=0;n<t.length;n++)e=e*31+t.charCodeAt(n)|0;return ot[Math.abs(e)%ot.length]}function kt(t,e){try{const s=new URL(t).hostname.replace(/^www\./,"").split(".")[0];if(s)return s.charAt(0).toUpperCase()}catch{}const n=e.trim();return n?n.charAt(0).toUpperCase():"•"}function Ct(t,e){const n=document.createElement("div");n.className="ic",n.style.background=bt(t.url);const i=document.createElement("span");i.textContent=kt(t.url,e),n.appendChild(i);try{const r=chrome.runtime.getURL("_favicon/?pageUrl="+encodeURIComponent(t.url)+"&size=32"),s=document.createElement("img");s.alt="",s.src=r,s.style.opacity="0",s.addEventListener("load",()=>{s.style.opacity="1"}),s.addEventListener("error",()=>s.remove()),n.appendChild(s)}catch{}return n}const Et=`
  :host { all: initial !important; }
  .btn {
    position: fixed; width: ${b}px; height: ${b}px; border-radius: 50%;
    background: rgba(255,255,255,0.96);
    border: 1px solid rgba(0,0,0,0.14);
    box-shadow: 0 2px 6px rgba(0,0,0,0.30), 0 0 1px rgba(0,0,0,0.20);
    display: flex; align-items: center; justify-content: center;
    box-sizing: border-box; padding: 0; margin: 0;
    z-index: 2147483646; pointer-events: auto; cursor: pointer;
    user-select: none; -webkit-user-select: none; touch-action: none;
    transition: box-shadow .15s ease, transform .15s ease, opacity .15s ease;
  }
  .btn svg { width: 22px; height: 22px; display: block; pointer-events: none; }
  .btn:hover { box-shadow: 0 3px 10px rgba(0,0,0,0.34); }
  .btn:active { transform: scale(0.94); }
  .btn.drag {
    transform: scale(1.1); cursor: grabbing;
    box-shadow: 0 8px 22px rgba(0,0,0,0.42);
    z-index: 2147483647; transition: none;
  }
  .btn.overx { opacity: 0.45; }
  .dock {
    position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(31,33,38,0.58);
    border: 1px solid rgba(255,255,255,0.22);
    box-shadow: 0 4px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 1px; z-index: 2147483645; pointer-events: none;
    animation: ssnav-dock-in .28s cubic-bezier(.2,.9,.3,1.12);
  }
  .dock svg { width: 24px; height: 24px; color: rgba(255,255,255,0.94); }
  .dock.hot {
    transform: translateX(-50%) scale(1.1);
    background: rgba(46,50,58,0.72);
    border-color: rgba(255,255,255,0.48);
    box-shadow: 0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  /* The dock rises out of the bottom edge of the page (like a messenger
   *  app's floating-widget close target), instead of just fading in. */
  @keyframes ssnav-dock-in {
    from { opacity: 0; transform: translateX(-50%) translateY(46px) scale(.7); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  }
  /* …and sinks back below the edge the same way whenever it goes away:
   *  the button was placed on it, the drag ended elsewhere, or the grabbed
   *  button was pulled back off the cross. */
  .dock.out {
    animation: ssnav-dock-out .26s cubic-bezier(.55,0,.85,.45) forwards;
  }
  @keyframes ssnav-dock-out {
    from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
    to   { opacity: 0; transform: translateX(-50%) translateY(46px) scale(.7); }
  }
  .menu {
    position: fixed; width: 300px; max-height: 340px; overflow-y: auto;
    background: #fff; border: 1px solid rgba(0,0,0,0.10); border-radius: 10px;
    box-shadow: 0 10px 32px rgba(0,0,0,0.30); padding: 5px 0; z-index: 2147483647;
    animation: ssnav-menu .12s ease;
  }
  @keyframes ssnav-menu { from { opacity: 0; transform: translateY(4px);} }
  .mi {
    padding: 7px 14px; cursor: pointer;
    display: flex; align-items: flex-start; gap: 9px;
  }
  .mi .ic {
    flex: 0 0 18px; width: 18px; height: 18px; margin-top: 1px;
    border-radius: 4px; overflow: hidden; position: relative;
    display: flex; align-items: center; justify-content: center;
    font: 700 10px/1 system-ui, sans-serif; color: #3c4043;
  }
  .mi .ic img {
    position: absolute; inset: 1px; width: 16px; height: 16px; display: block;
  }
  .mi .txt { min-width: 0; flex: 1; }
  .mi .t {
    font: 500 12.5px/1.35 system-ui, sans-serif; color: #202124;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .mi .u {
    font: 400 11px/1.35 system-ui, sans-serif; color: #5f6368;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .mi:hover { background: #f1f3f4; }
  .mi.cur { background: #e8f0fe; }
  .mi.cur .t { color: ${q}; font-weight: 700; }
  .mi.cur .u { color: #1a56b0; }
  .mtitle {
    padding: 6px 14px 4px; font: 700 10px/1.3 system-ui, sans-serif;
    color: #5f6368; text-transform: uppercase; letter-spacing: .6px;
  }
  .tip {
    position: fixed; background: rgba(32,33,36,0.94); color: #fff;
    font: 400 11px/1.4 system-ui, sans-serif; padding: 6px 9px; border-radius: 6px;
    max-width: 250px; z-index: 2147483647; pointer-events: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3); white-space: nowrap;
  }
  .hint {
    position: fixed; width: 264px; background: #202124; color: #fff;
    border-radius: 12px; padding: 13px 14px 12px; z-index: 2147483647;
    box-shadow: 0 10px 34px rgba(0,0,0,0.45);
    font: 400 11.5px/1.55 system-ui, sans-serif;
  }
  .hint b { font-size: 11.5px; }
  .hint .x {
    position: absolute; top: 8px; right: 10px; color: #9aa0a6; cursor: pointer;
    font: 400 14px/1 system-ui, sans-serif; padding: 2px 4px;
  }
  .hint .x:hover { color: #fff; }
  @media (prefers-reduced-motion: reduce) {
    .btn, .menu, .dock { transition: none !important; animation: none !important; }
  }
  `,Lt='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5.5 8.5 12 15 18.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',Mt='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5.5 15.5 12 9 18.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',At='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';function Tt(){R=document.createElement("div"),R.setAttribute("data-session-saver-nav",""),x=R.attachShadow({mode:"closed"});const t=document.createElement("style");t.textContent=Et,x.appendChild(t),a=it("back",Lt,"Click to go back, hold to see history — drag to move"),f=it("fwd",Mt,"Click to go forward, hold to see history — drag to move"),x.appendChild(a),x.appendChild(f),document.documentElement.appendChild(R)}function it(t,e,n){const i=document.createElement("div");return i.className="btn",i.setAttribute("role","button"),i.setAttribute("aria-label",n),i.title=n,i.innerHTML=e,i.addEventListener("pointerenter",()=>Rt(i,n)),i.addEventListener("pointerleave",()=>K()),Nt(i,t),i}let W;function Rt(t,e){K(),W=window.setTimeout(()=>{if(W=void 0,!x)return;E=document.createElement("div"),E.className="tip",E.textContent=e,x.appendChild(E);const n=t.getBoundingClientRect();E.style.left=`${S(n.left+n.width/2-70,6,Math.max(6,window.innerWidth-150))}px`;const i=E.getBoundingClientRect().height;E.style.top=`${Math.max(6,n.top-i-8)}px`},380)}function K(){W!==void 0&&(clearTimeout(W),W=void 0),E?.remove(),E=null}function St(){if(!x||!a)return;v=document.createElement("div"),v.className="hint",v.innerHTML='<span class="x" title="Dismiss">✕</span><b>Session Saver — history restored</b><br/>This tab reopened on its last page with its recorded history. Click the arrows to move through it, hold a button for the page list, drag them anywhere — and drop one on the ✕ at the bottom to hide them (reloading the page brings them back).',x.appendChild(v);const t=a.getBoundingClientRect();v.style.left=`${S(t.right+14,6,Math.max(6,window.innerWidth-276))}px`,v.style.top=`${S(t.top-10,6,Math.max(6,window.innerHeight-170))}px`;const e=()=>{v?.remove(),v=null};v.querySelector(".x")?.addEventListener("click",e),window.setTimeout(e,12e3)}function st(){k||!x||(X?.remove(),X=null,k=document.createElement("div"),k.className="dock",k.innerHTML=At,x.appendChild(k))}function U(){if(!k)return;const t=k;if(k=null,J()){t.remove();return}t.classList.add("out"),X=t;const e=()=>{t.remove(),X===t&&(X=null)};t.addEventListener("animationend",e,{once:!0}),window.setTimeout(e,460)}function rt(){const t=window.innerWidth/2-N/2,e=window.innerHeight-ft-N;return{left:t,top:e,right:t+N,bottom:e+N}}function at(t,e){const n=rt(),i=14;return t>=n.left-i&&t<=n.right+i&&e>=n.top-i&&e<=n.bottom+i}function _t(){const t=rt();return{x:t.left+(N-b)/2,y:t.top+(N-b)/2}}let j=null,_=null,w=null,O=0,P=0,y=!1,A=!1;function F(t){const e=parseInt(t.style.left||"0",10)||0,n=parseInt(t.style.top||"0",10)||0;return{x:e,y:n}}function D(t){const e=t;if(typeof e.getAnimations=="function")for(const n of e.getAnimations())try{n.cancel?.()}catch{}}function $t(t,e,n,i){const r=c=>c<.5?2*c*c:1-Math.pow(-2*c+2,2)/2,s=e.x-t.x,d=e.y-t.y,u=S(Math.hypot(s,d)*.45,56,190),o=t.x+s/2,p=t.y+d/2-u,l=[],T=9;for(let c=0;c<=T;c++){const m=r(c/T),C=1-m,Pt=C*C*t.x+2*C*m*o+m*m*e.x,zt=C*C*t.y+2*C*m*p+m*m*e.y;l.push({transform:`translate(${Pt-t.x}px, ${zt-t.y}px) scale(${1+(n-1)*m})`,opacity:String(1+(i-1)*m)})}return l}function V(t,e,n){_||(_=F(t));const i=t.getBoundingClientRect(),r={x:i.left,y:i.top};D(t),w=null,L(t,r),j=t,O=e.x-r.x,P=e.y-r.y;const s=()=>{A&&(A=!1,U())},d=()=>{L(t,e),D(t),O=0,P=0,s()},u=()=>{L(t,e),D(t),O=0,P=0,s()};if(J()||typeof t.animate!="function"){u();return}try{const o=t.animate($t(r,e,n.scale,n.opacity),{duration:ht,easing:"linear",fill:"forwards"});w=o,o.onfinish=()=>{if(w===o&&(w=null),n.park){s();return}d()},o.oncancel=()=>{w===o&&(w=null)}}catch{u()}}function Bt(t){const e=t.getBoundingClientRect();if(w)try{w.cancel()}catch{}w=null,D(t),L(t,{x:e.left,y:e.top}),j=null,_=null,y=!1,A=!1,O=0,P=0}function Dt(t){H({type:"ss-nav-hide"});const e=y,n=O,i=P,r=t===a?f:a;if(D(t),r&&D(r),w=null,j=null,_=null,y=!1,A=!1,O=0,P=0,J()){ct();return}U();const s=(d,u,o,p)=>{if(typeof d.animate=="function")try{d.animate([{transform:`translate(${u}px, ${o}px) scale(${p})`},{transform:`translate(${u}px, ${o+mt}px) scale(${p})`,opacity:0}],{duration:gt,easing:"cubic-bezier(.55,0,.85,.45)",fill:"forwards"})}catch{}};t.style.pointerEvents="none",s(t,0,0,1),r&&(r.style.pointerEvents="none",s(r,e?n:0,e?i:0,e?Z:1)),window.setTimeout(()=>ct(),wt)}function $(){g?.remove(),g=null,I&&(document.removeEventListener("pointerdown",I,!0),I=null),G&&(document.removeEventListener("keydown",G,!0),G=null)}function Ht(t,e){if($(),!x)return;g=document.createElement("div"),g.className="menu";const n=t==="back",i=[];if(n)for(let o=h-1;o>=0;o--)i.push(o);else for(let o=h+1;o<z.length;o++)i.push(o);i.length===0&&i.push(h);const r=document.createElement("div");r.className="mtitle",r.textContent=n?"Go back to…":"Go forward to…",g.appendChild(r);for(const o of i){const p=z[o],l=document.createElement("div");l.className="mi"+(o===h?" cur":"");const T=vt(p);l.appendChild(Ct(p,T.title));const c=document.createElement("div");c.className="txt";const m=document.createElement("div");m.className="t",m.textContent=(o===h?"● ":"")+T.title;const C=document.createElement("div");C.className="u",C.textContent=T.sub,c.appendChild(m),c.appendChild(C),l.appendChild(c),l.addEventListener("click",()=>{$(),o!==h&&lt(o)}),g.appendChild(l)}x.appendChild(g);const s=e.getBoundingClientRect(),d=300,u=Math.min(340,g.getBoundingClientRect().height||200);g.style.left=`${S(s.left+s.width/2-d/2,6,Math.max(6,window.innerWidth-d-6))}px`,g.style.top=`${S(s.top-u-10,6,Math.max(6,window.innerHeight-u-6))}px`,I=o=>{const p=o.composedPath();R&&p.includes(R)||$()},document.addEventListener("pointerdown",I,!0),G=o=>{o.key==="Escape"&&$()},document.addEventListener("keydown",G,!0)}async function lt(t){if(t<0||t>=z.length||t===h)return;const e=await H({type:"ss-nav-go",targetIndex:t});if(!(!e||e.ok!==!0)&&e.mode==="replace"&&typeof e.url=="string"){try{location.replace(e.url);return}catch{}await H({type:"ss-nav-update",targetIndex:t})}}function ct(){K(),$(),U(),v?.remove(),v=null,window.removeEventListener("resize",dt),R?.remove(),R=null}function dt(){for(const t of[a,f]){if(!t)continue;const e=t.getBoundingClientRect();D(t),L(t,{x:e.left,y:e.top})}}function Nt(t,e){let n=!1,i=!1,r=0,s=0,d;const u=()=>{d!==void 0&&(clearTimeout(d),d=void 0)};t.addEventListener("pointerdown",o=>{if(!(o.pointerType==="mouse"&&o.button!==0)){K(),w&&j===t&&Bt(t),g&&!Y&&$(),Y=!1,n=!0,i=!1,r=o.clientX,s=o.clientY;try{t.setPointerCapture(o.pointerId)}catch{}u(),d=window.setTimeout(()=>{d=void 0,!(!n||i||!a||!f)&&(Y=!0,Ht(e,t))},ut),o.preventDefault(),o.stopPropagation()}},{passive:!1}),t.addEventListener("pointermove",o=>{if(!n||(!i&&Math.hypot(o.clientX-r,o.clientY-s)>pt&&(i=!0,u(),$(),st(),t.classList.add("drag"),K(),w||(_=null,y=!1,A=!1)),!i))return;L(t,{x:o.clientX-b/2,y:o.clientY-b/2});const p=at(o.clientX,o.clientY);p&&!k&&st();const l=t===a?f:a;p&&!y&&l?(y=!0,A=!1,V(l,_t(),{scale:Z,opacity:xt,park:!0})):!p&&y&&(y=!1,A=!0,l&&V(l,_??F(l),{scale:1,opacity:1,park:!1})),t.classList.toggle("overx",p),k?.classList.toggle("hot",p)}),t.addEventListener("pointerup",o=>{if(n){n=!1,u();try{t.releasePointerCapture(o.pointerId)}catch{}if(i){if(i=!1,t.classList.remove("drag","overx"),at(o.clientX,o.clientY)){Dt(t);return}const l=t===a?f:a;y&&l&&(y=!1,A=!1,V(l,_??F(l),{scale:1,opacity:1,park:!1})),U(),L(t,{x:o.clientX-b/2,y:o.clientY-b/2});const T=t.getBoundingClientRect(),c=et({x:T.left,y:T.top});L(t,c),H({type:"ss-nav-position",which:e,x:c.x,y:c.y});return}if(Y){Y=!1;return}if(g){$();return}M(e)&&lt(e==="back"?h-1:h+1)}}),t.addEventListener("pointercancel",()=>{n=!1,i=!1,u();const o=t===a?f:a;y&&o&&(y=!1,A=!1,V(o,_??F(o),{scale:1,opacity:1,park:!1})),t.classList.remove("drag","overx"),U()}),t.addEventListener("contextmenu",o=>o.preventDefault())}async function Ot(){const t=await H({type:"ss-nav-get"});if(!t||t.show!==!0||!Array.isArray(t.entries)||t.entries.length<2)return;z=t.entries,h=typeof t.index=="number"?t.index:t.entries.length-1,Tt(),nt(a,t.back,104),nt(f,t.fwd,48),yt(),window.addEventListener("resize",dt),t.hint===!0&&St();const e=document.title?.trim();if(e)try{H({type:"ss-nav-title",url:location.href,title:e})}catch{}}Ot()})();
