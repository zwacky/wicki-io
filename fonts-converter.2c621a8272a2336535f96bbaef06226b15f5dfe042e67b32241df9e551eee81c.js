(()=>{var h=document.querySelector("#check"),v=document.querySelector("#website_search"),$=!1,d=null;document.querySelector("form#search").addEventListener("submit",async t=>{if(t.preventDefault(),$)return;x(!0),$=!0,document.querySelector("#results").classList.add("busy");let s=document.querySelector("#website_search").value,i=s.indexOf("://")===-1?"http://"+s:s;try{let n=await fetch(`https://us-central1-fonts-converter.cloudfunctions.net/font_urls?url=${i}`,{method:"POST"}),y=(await n.json()).result;b(y)}catch(n){console.log("err",n)}finally{document.querySelector("#results").classList.remove("busy"),$=!1}});function x(t){$=t}window.toggleProperty=(t,s,i,n)=>{i==="display"?d[t].fonts[s][i]=n:(d[t].fonts[s][i]||(d[t].fonts[s][i]=[]),d[t].fonts[s][i]=d[t].fonts[s][i].indexOf(n)===-1?d[t].fonts[s][i].concat(n):d[t].fonts[s][i].filter(y=>y!==n)),b(d)};function b(t){let s=t.map((f,e)=>f.fonts.map((o,u)=>{let m="",g=`<div style="width: 100%; font-weight: bold; padding-bottom: 5px; border-bottom: 2px solid rgba(0, 0, 0, 0.1);">${o.family}</div>`,a=o.subsets||["latin"],c=o.variants||["regular"],p=o.display||"auto",l=`
					<ul style="list-style: none; padding-left: 30px;">
						<li style="margin-top: 10px;">
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Charsets:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
									${o.record.subsets.map(r=>`<label style="display: flex; align-items: center; margin-right: 20px;">
												<input 
													class="subitem" 
													onchange="toggleProperty(${e}, ${u}, 'subsets', '${r}')" 
													type="checkbox" 
													${a.indexOf(r)!==-1?"checked":""}
													value=""
												/> ${r}
											</label>`).join("")}
								</div>
							</div>
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Styles:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
									${o.record.variants.map(r=>`<label style="display: flex; align-items: center; margin-right: 20px;">
												<input
													class="subitem"
													onchange="toggleProperty(${e}, ${u}, 'variants', '${r}')" 
													type="checkbox"
													${c.indexOf(r)!==-1?"checked":""}
													value=""
												/> ${r}
											</label>`).join("")}
								</div>
							</div>
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Font Display:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
								${["auto","block","swap","fallback","optional"].map(r=>`<label style="display: flex; align-items: center; margin-right: 20px;">
											<input
												class="subitem"
												onchange="toggleProperty(${e}, ${u}, 'display', '${r}')"
												type="radio"
												name="${o.record.family}_display"
												${p===r?"checked":""}
												value="${r}"
											/> ${r}
										</label>`).join("")}
								</div>
							</div>
							<div style="display: flex; align-items: flex-start; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Download:</div>
								<a href="${["https://google-webfonts-helper.herokuapp.com/api/fonts/",o.record.family.toLowerCase().split(" ").join("-"),"?download=zip",`&subsets=${a.join(",")}`,`&variants=${c.join(",")}`].join("")}" download style="border: 0;">
									<button type="button">
										${o.record.family}-${o.record.version}-${a.join(",")}-${c.join(",")}.zip
									</button>
								</a>
							</div>
						</li>
					</ul>
				`;return`<li>
					<label style="display: flex; align-items: center;">
						${m}${g}
					</label>
					${l}
				</li>`}).join("<br /><br />")).flat().join("<br /><br />"),i=document.querySelector("#font-usage__list");i.innerHTML=s;let n=`<pre><code>${t.map(f=>f.fonts.map((e,o)=>{let u=e.subsets||["latin"],m=e.variants||["regular"],g=e.display||"auto",a=e.record.family.toLowerCase().split(" ").join("+"),c="../fonts/";return u.map(p=>m.map(l=>`/* ${a}-${l} ${p} */
@font-face {
  font-family: '${e.record.family}';
  font-style: ${l.indexOf("italic")!==-1?"italic":"normal"};
  font-weight: ${l==="regular"||l==="italic"?"400":l};
  font-display: ${g};
  src: url('${c}${a}-${e.record.version}-${p}-${l}.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('${c}${a}-${e.record.version}-${p}-${l}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('${c}${a}-${e.record.version}-${p}-${l}.woff2') format('woff2'), /* Super Modern Browsers */
       url('${c}${a}-${e.record.version}-${p}-${l}.woff') format('woff'), /* Modern Browsers */
       url('${c}${a}-${e.record.version}-${p}-${l}.ttf') format('truetype'), /* Safari, Android, iOS */
       url('${c}${a}-${e.record.version}-${p}-${l}.svg#${e.record.family.split(" ").join("")}') format('svg'); /* Legacy iOS */

`).join(""))}))}
</code></pre>`,y=document.querySelector("#css__list");y.innerHTML=n}})();
