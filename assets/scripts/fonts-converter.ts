const btn = document.querySelector('#check');
const input = document.querySelector('#website_search');

// const mockResponse = {
// 	pageUrl: 'https://firebase.google.com/products/crashlytics/',
// 	result: [
// 		{
// 			fonts: [
// 				{
// 					family: 'Roboto',
// 					variants: ['regular', 'italic', '500', '500italic', '700', '700italic'],
// 					subsets: ['latin'],
// 					record: {
// 						family: 'Roboto',
// 						variants: [
// 							'100',
// 							'100italic',
// 							'300',
// 							'300italic',
// 							'regular',
// 							'italic',
// 							'500',
// 							'500italic',
// 							'700',
// 							'700italic',
// 							'900',
// 							'900italic',
// 						],
// 						subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
// 						version: 'v20',
// 						lastModified: '2019-07-24',
// 						files: {
// 							'100': 'http://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf',
// 							'300': 'http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf',
// 							'500': 'http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf',
// 							'700': 'http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf',
// 							'900': 'http://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf',
// 							'100italic': 'http://fonts.gstatic.com/s/roboto/v20/KFOiCnqEu92Fr1Mu51QrIzcXLsnzjYk.ttf',
// 							'300italic': 'http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TjARc9AMX6lJBP.ttf',
// 							regular: 'http://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf',
// 							italic: 'http://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf',
// 							'500italic': 'http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51S7ABc9AMX6lJBP.ttf',
// 							'700italic': 'http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf',
// 							'900italic': 'http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBBc9AMX6lJBP.ttf',
// 						},
// 						category: 'sans-serif',
// 						kind: 'webfonts#webfont',
// 					},
// 				},
// 				{
// 					family: 'Roboto Mono',
// 					variants: ['regular', '500', '700'],
// 					subsets: ['latin'],
// 					record: {
// 						family: 'Roboto Mono',
// 						variants: [
// 							'100',
// 							'200',
// 							'300',
// 							'regular',
// 							'500',
// 							'600',
// 							'700',
// 							'100italic',
// 							'200italic',
// 							'300italic',
// 							'italic',
// 							'500italic',
// 							'600italic',
// 							'700italic',
// 						],
// 						subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'latin', 'latin-ext', 'vietnamese'],
// 						version: 'v12',
// 						lastModified: '2020-07-13',
// 						files: {
// 							'100':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vuPQ--5Ip2sSQ.ttf',
// 							'200':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_XvqPQ--5Ip2sSQ.ttf',
// 							'300':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_gPqPQ--5Ip2sSQ.ttf',
// 							'500':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7PqPQ--5Ip2sSQ.ttf',
// 							'600':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_AP2PQ--5Ip2sSQ.ttf',
// 							'700':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2PQ--5Ip2sSQ.ttf',
// 							regular:
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQ--5Ip2sSQ.ttf',
// 							'100italic':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAeW9AJi8SZwt.ttf',
// 							'200italic':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrnnAOW9AJi8SZwt.ttf',
// 							'300italic':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrk5AOW9AJi8SZwt.ttf',
// 							italic:
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAOW9AJi8SZwt.ttf',
// 							'500italic':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlVAOW9AJi8SZwt.ttf',
// 							'600italic':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrm5B-W9AJi8SZwt.ttf',
// 							'700italic':
// 								'http://fonts.gstatic.com/s/robotomono/v12/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrmAB-W9AJi8SZwt.ttf',
// 						},
// 						category: 'monospace',
// 						kind: 'webfonts#webfont',
// 					},
// 				},
// 			],
// 		},
// 	],
// };

let busy = false;
let result = null;
document.querySelector('form#search').addEventListener('submit', async (event: any) => {
	event.preventDefault();
	if (busy) {
		return;
	}
	setBusy(true);
	busy = true;
	document.querySelector('#results').classList.add('busy');

	const link = (document.querySelector('#website_search') as HTMLInputElement).value;
	const url = link.indexOf('://') === -1 ? 'http://' + link : link;
	try {
		const response = await fetch(`https://us-central1-fonts-converter.cloudfunctions.net/font_urls?url=${url}`, {
			method: 'POST',
		});
		const result = ((await response.json()) as any).result;
		displaySearchResults(result);
		// result = mockResponse.result;
		// displaySearchResults(mockResponse.result);
	} catch (err) {
		console.log('err', err);
	} finally {
		document.querySelector('#results').classList.remove('busy');
		busy = false;
	}
});

function setBusy(value: boolean) {
	busy = value;
	if (value) {
	}
}

(window as any).toggleProperty = (resultIndex: number, fontIndex: number, name: string, value: string) => {
	if (name === 'display') {
		result[resultIndex].fonts[fontIndex][name] = value;
	} else {
		// in case subsets doesn't exist as an array yet
		if (!result[resultIndex].fonts[fontIndex][name]) {
			result[resultIndex].fonts[fontIndex][name] = [];
		}
		result[resultIndex].fonts[fontIndex][name] =
			result[resultIndex].fonts[fontIndex][name].indexOf(value) === -1
				? result[resultIndex].fonts[fontIndex][name].concat(value)
				: result[resultIndex].fonts[fontIndex][name].filter((item) => item !== value);
	}
	displaySearchResults(result);
};

function displaySearchResults(result: any) {
	// list section
	const fonts = result
		.map((result, resultIndex) => {
			return result.fonts
				.map((font, fontIndex) => {
					// const input = `<input type="checkbox" checked style="position: relative; top: -2.5px;" />`;
					const input = ``;
					const text = `<div style="width: 100%; font-weight: bold; padding-bottom: 5px; border-bottom: 2px solid rgba(0, 0, 0, 0.1);">${font.family}</div>`;
					const selectedSubsets = font.subsets || ['latin'];
					const selectedVariants = font.variants || ['regular'];
					const selectedDisplay = font.display || 'auto';
					const options = `
					<ul style="list-style: none; padding-left: 30px;">
						<li style="margin-top: 10px;">
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Charsets:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
									${font.record.subsets
										.map((subset) => {
											return `<label style="display: flex; align-items: center; margin-right: 20px;">
												<input 
													class="subitem" 
													onchange="toggleProperty(${resultIndex}, ${fontIndex}, 'subsets', '${subset}')" 
													type="checkbox" 
													${selectedSubsets.indexOf(subset) !== -1 ? 'checked' : ''}
													value=""
												/> ${subset}
											</label>`;
										})
										.join('')}
								</div>
							</div>
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Styles:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
									${font.record.variants
										.map((variant) => {
											return `<label style="display: flex; align-items: center; margin-right: 20px;">
												<input
													class="subitem"
													onchange="toggleProperty(${resultIndex}, ${fontIndex}, 'variants', '${variant}')" 
													type="checkbox"
													${selectedVariants.indexOf(variant) !== -1 ? 'checked' : ''}
													value=""
												/> ${variant}
											</label>`;
										})
										.join('')}
								</div>
							</div>
							<div style="display: flex; align-items: baseline; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Font Display:</div>
								<div style="display: flex; flex-wrap: wrap; flex: 1;">
								${['auto', 'block', 'swap', 'fallback', 'optional']
									.map((display) => {
										return `<label style="display: flex; align-items: center; margin-right: 20px;">
											<input
												class="subitem"
												onchange="toggleProperty(${resultIndex}, ${fontIndex}, 'display', '${display}')"
												type="radio"
												name="${font.record.family}_display"
												${selectedDisplay === display ? 'checked' : ''}
												value="${display}"
											/> ${display}
										</label>`;
									})
									.join('')}
								</div>
							</div>
							<div style="display: flex; align-items: flex-start; margin-top: 20px;">
								<div style="flex-basis: 120px; margin-bottom: 10px;">Download:</div>
								<a href="${[
									'https://google-webfonts-helper.herokuapp.com/api/fonts/',
									font.record.family.toLowerCase().split(' ').join('-'),
									'?download=zip',
									`&subsets=${selectedSubsets.join(',')}`,
									`&variants=${selectedVariants.join(',')}`,
								].join('')}" download style="border: 0;">
									<button type="button">
										${font.record.family}-${font.record.version}-${selectedSubsets.join(',')}-${selectedVariants.join(',')}.zip
									</button>
								</a>
							</div>
						</li>
					</ul>
				`;

					return `<li>
					<label style="display: flex; align-items: center;">
						${input}${text}
					</label>
					${options}
				</li>`;
				})
				.join('<br /><br />');
		})
		.flat()
		.join('<br /><br />');
	const fontUsageList = document.querySelector('#font-usage__list');
	fontUsageList.innerHTML = fonts;

	// css section
	const css = `<pre><code>${result.map((result) => {
		return result.fonts.map((font, fontIndex) => {
			const selectedSubsets = font.subsets || ['latin'];
			const selectedVariants = font.variants || ['regular'];
			const selectedDisplay = font.display || 'auto';
			const fontId = font.record.family.toLowerCase().split(' ').join('+');
			const path = '../fonts/';
			return selectedSubsets.map((subset) => {
				return selectedVariants
					.map((variant) => {
						// prettier-ignore
						return `/* ${fontId}-${variant} ${subset} */
@font-face {
  font-family: '${font.record.family}';
  font-style: ${variant.indexOf('italic') !== -1 ? 'italic' : 'normal'};
  font-weight: ${variant === 'regular' || variant === 'italic' ? '400' : variant};
  font-display: ${selectedDisplay};
  src: url('${path}${fontId}-${font.record.version}-${subset}-${variant}.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('${path}${fontId}-${font.record.version}-${subset}-${variant}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('${path}${fontId}-${font.record.version}-${subset}-${variant}.woff2') format('woff2'), /* Super Modern Browsers */
       url('${path}${fontId}-${font.record.version}-${subset}-${variant}.woff') format('woff'), /* Modern Browsers */
       url('${path}${fontId}-${font.record.version}-${subset}-${variant}.ttf') format('truetype'), /* Safari, Android, iOS */
       url('${path}${fontId}-${font.record.version}-${subset}-${variant}.svg#${font.record.family.split(' ').join('')}') format('svg'); /* Legacy iOS */

`;
					})
					.join('');
			});
		});
	})}
</code></pre>`;
	const cssList = document.querySelector('#css__list');
	cssList.innerHTML = css;
}
