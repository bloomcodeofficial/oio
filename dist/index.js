"use strict";(()=>{var f=async function(){let p=async function(){let t=document.querySelector(".positions_wrapper"),n=t==null?void 0:t.cloneNode(!0),e=t.parentElement,o=document.querySelector(".positions_loader"),c=document.querySelector('[ponty-element="count"]'),i=await d("https://oio.ponty-system.se/extapi/job?p=eyJ0IjogW119.c309dfdb4a0280110cd800184bc693d8ad0b8ebb13597ffca9095f95df39aa82");i.forEach(r=>{let s=w(r,n);e==null||e.insertAdjacentElement("afterbegin",s),t==null||t.remove()}),setTimeout(()=>{o==null||o.classList.add("is-not-loading"),e==null||e.classList.add("is-loaded"),c.textContent=i.length,c.style.opacity="1"},500),e==null||e.addEventListener("click",r=>{let s=r.target.closest(".positions_wrapper");s&&(window.location.href=`/tjanster/tjanst?id=${s.dataset.pontyid}`)})},b=async function(){let t=document.querySelector(".position_wrapper"),e=new URLSearchParams(window.location.search).get("id");if(!e){i();return}let c=await d("https://oio.ponty-system.se/extapi/job?p=eyJ0IjogW119.c309dfdb4a0280110cd800184bc693d8ad0b8ebb13597ffca9095f95df39aa82"),[a]=c.filter(s=>s.assignment_id==e);if(!a){i();return}g(a),r();function i(){t==null||t.classList.remove("position-loading"),t==null||t.classList.add("position-empty")}function r(){t==null||t.classList.remove("position-loading"),t==null||t.classList.add("position-loaded")}};function d(t){return fetch(t).then(n=>n.json()).then(n=>{let{jobs:e}=n;return e}).catch(n=>{console.log(n)})}function w(t,n){let e=n.cloneNode(!0),o=e.querySelector('[ponty-element="title"]'),c=e.querySelector('[ponty-element="company"]'),a=e.querySelector('[ponty-element="location"]');return o&&(o.textContent=t.title),c&&(c.textContent=t.organization_name),a&&(a.textContent=t.location),e&&(e.dataset.pontyid=t.assignment_id),e}function g(t){let n=document.querySelector('[ponty-element="title"]'),e=document.querySelector('[ponty-element="company"]'),o=document.querySelector('[ponty-element="name"]'),c=document.querySelector('[ponty-element="location"]'),a=document.querySelector('[ponty-element="extent"]'),i=document.querySelector('[ponty-element="body"]'),r=document.querySelector('[ponty-element="button"]'),s=document.querySelector('[ponty-element="button2"]'),l=document.querySelector("head"),u=l.querySelector("title"),y=l==null?void 0:l.querySelector('[property="og:title"]'),m=l==null?void 0:l.querySelector('[property="twitter:title"]');n&&(n.textContent=t.title),u&&(u.textContent=t.title+" | OIO Rekrytering"),y&&y.setAttribute("content",t.title+" | OIO Rekrytering"),m&&m.setAttribute("content",t.title+" | OIO Rekrytering"),e&&(e.textContent=t.organization_name),o&&(o.textContent=t.user_name),c&&(c.textContent=t.location),i&&i.replaceWith(h(t.body)),r&&(r.href=t.apply_url),s&&(s.href=t.apply_url)}function h(t){let e=new DOMParser().parseFromString(t,"text/html"),o=document.createElement("div");for(o.classList.add("text-rich-text");e.body.firstChild;)o.appendChild(e.body.firstChild);return o}window.location.pathname==="/tjanster/tjanst"&&b(),window.location.pathname==="/tjanster"&&p()};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{f()});})();
