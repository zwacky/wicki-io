(()=>{const u=document.querySelector("#check"),v=document.querySelector("#website_search");let o=!1,l=null;document.querySelector("form#search").addEventListener("submit",async b=>{b.preventDefault();if(o)return;t(!0),o=!0,document.querySelector("#results").classList.add("busy");const c=document.querySelector("#website_search").value,e=c.indexOf("://")===-1?"http://"+c:c;try{const i=await fetch(`https://us-central1-fonts-converter.cloudfunctions.net/font_urls?url=${e}`,{method:"POST"}),m=(await i.json()).result;s(m)}catch(i){console.log("err",i)}finally{document.querySelector("#results").classList.remove("busy"),o=!1}});function t(b){o=b}window.toggleProperty=(b,c,e,i)=>{e==="display"?l[b].fonts[c][e]=i:(l[b].fonts[c][e]||(l[b].fonts[c][e]=[]),l[b].fonts[c][e]=l[b].fonts[c][e].indexOf(i)===-1?l[b].fonts[c][e].concat(i):l[b].fonts[c][e].filter(m=>m!==i)),s(l)};function s(b){const c=b.map((p,a)=>p.fonts.map((g,n)=>{const q="",r=`<div style="width: 100%; font-weight: bold; padding-bottom: 5px; border-bottom: 2px solid rgba(0, 0, 0, 0.1);">${g.family}</div>`,h=g.subsets||["latin"],j=g.variants||["regular"],k=g.display||"auto",d=`
					<ul style="list-style: none; padding-left: 30px;">
						<li style="margin-top: 10px;">
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Charsets:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
									${g.record.subsets.map(f=>`<label style="display: flex; align-items: center; margin-right: 20px;">
												<input 
													class="subitem" 
													onchange="toggleProperty(${a}, ${n}, 'subsets', '${f}')" 
													type="checkbox" 
													${h.indexOf(f)!==-1?"checked":""}
													value=""
												/> ${f}
											</label>`).join("")}
								</div>
							</div>
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Styles:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
									${g.record.variants.map(f=>`<label style="display: flex; align-items: center; margin-right: 20px;">
												<input
													class="subitem"
													onchange="toggleProperty(${a}, ${n}, 'variants', '${f}')" 
													type="checkbox"
													${j.indexOf(f)!==-1?"checked":""}
													value=""
												/> ${f}
											</label>`).join("")}
								</div>
							</div>
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Font Display:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
								${["auto","block","swap","fallback","optional"].map(f=>`<label style="display: flex; align-items: center; margin-right: 20px;">
											<input
												class="subitem"
												onchange="toggleProperty(${a}, ${n}, 'display', '${f}')"
												type="radio"
												name="${g.record.family}_display"
												${k===f?"checked":""}
												value="${f}"
											/> ${f}
										</label>`).join("")}
								</div>
							</div>
							<div style="display: flex; align-items: flex-start; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Download:</div>
								<a href="${["https://google-webfonts-helper.herokuapp.com/api/fonts/",g.record.family.toLowerCase().split(" ").join("-"),"?download=zip",`&subsets=${h.join(",")}`,`&variants=${j.join(",")}`].join("")}" download style="border: 0;">
									<button type="button">
										${g.record.family}-${g.record.version}-${h.join(",")}-${j.join(",")}.zip
									</button>
								</a>
							</div>
						</li>
					</ul>
				`;return`<li>
					<label style="display: flex; align-items: center;">
						${q}${r}
					</label>
					${d}
				</li>`}).join("<br /><br />")).flat().join("<br /><br />"),e=document.querySelector("#font-usage__list");e.innerHTML=c;const i=`<pre><code>${b.map(p=>p.fonts.map((a,g)=>{const n=a.subsets||["latin"],q=a.variants||["regular"],r=a.display||"auto",h=a.record.family.toLowerCase().split(" ").join("+"),j="../fonts/";return n.map(k=>q.map(d=>`/* ${h}-${d} ${k} */
@font-face {
  font-family: '${a.record.family}';
  font-style: ${d.indexOf("italic")!==-1?"italic":"normal"};
  font-weight: ${d==="regular"||d==="italic"?"400":d};
  font-display: ${r};
  src: url('${j}${h}-${a.record.version}-${k}-${d}.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('${j}${h}-${a.record.version}-${k}-${d}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('${j}${h}-${a.record.version}-${k}-${d}.woff2') format('woff2'), /* Super Modern Browsers */
       url('${j}${h}-${a.record.version}-${k}-${d}.woff') format('woff'), /* Modern Browsers */
       url('${j}${h}-${a.record.version}-${k}-${d}.ttf') format('truetype'), /* Safari, Android, iOS */
       url('${j}${h}-${a.record.version}-${k}-${d}.svg#${a.record.family.split(" ").join("")}') format('svg'); /* Legacy iOS */

`).join(""))}))}
</code></pre>`,m=document.querySelector("#css__list");m.innerHTML=i}})();
