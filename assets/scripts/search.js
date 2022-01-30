const { Index } = require('flexsearch');

const nav = document.querySelector('body');
const searchInput = document.querySelector('#search_input');
let posts;
let index;
let lastMatchedIds = [];
let searchIndexInitialised = false;
let timerSearch;
let timerTracking;

document.addEventListener('DOMContentLoaded', function () {
	// add search toggle handlers
	['#search_search', '#search_close'].map((selector) => {
		document.querySelector(selector).addEventListener('click', (evt) => {
			evt.preventDefault();
			nav.classList.toggle('in-search');
			// check if search input needs focus
			if (isInSearch()) {
				searchInput.focus();
				// if hasn't done already, fetch and load search indexes
				if (!searchIndexInitialised) {
					initSearchIndexes();
				}
			}
		});
	});
	// upon typing into search input
	searchInput.addEventListener('input', (evt) => {
		if (index) {
			clearTimeout(timerSearch);
			timerSearch = setTimeout(() => {
				const value = evt.target.value;
				const matches = index.search(value).map((match) => posts.find((post) => post.link === match));
				buildResults(matches);
			}, 300);
			clearTimeout(timerTracking);
			timerTracking = setTimeout(() => {
				// track searches
				const value = evt.target.value;
				gtag('event', 'change', { event_category: 'search', value });
			}, 1000);
		}
	});
});

// make sure to close search mode when hitting 'esc'
document.onkeydown = (evt) => {
	if (evt.key === 'Escape' || evt.key === 'Esc') {
		if (isInSearch()) {
			nav.classList.toggle('in-search');
		}
	}
};

function isInSearch() {
	return nav.classList.contains('in-search');
}

function initSearchIndexes() {
	searchIndexInitialised = true;
	// request search index json once
	fetch('/posts/index.json')
		.then((response) => response.json())
		.then((items) => {
			posts = items;
			index = new Index();
			items.forEach((item) => {
				index.add(item.link, item.content);
			});
		});
}

function buildResults(matches) {
	// only rebuild the results, if the matches aren't the same as last render
	const matchedIds = matches.map((match) => match.link).join('#');
	if (lastMatchedIds !== matchedIds) {
		const result = matches
			.slice(0, 7)
			.map((match) => {
				const title = match.title.replaceAll('"', '\'');
				const image = match.image
					? `<img class="d-none inline d-sm-block" src="${match.link}/${match.image}" alt="${title}">`
					: '<div class="d-none inline d-sm-block search-results__item__image"></div>';
				return `
				<div class="search-results__item">
					${image}
					<div class="search-results__item__text">
						<h3><a href="${match.link}" onclick="gtag('event', 'click', { event_category: 'search', event_label: '${match.link}' })">${match.title}</a></h3>
						<p>${match.description}</p>
					</div>
				</div>
				`;
			})
			.join('\n');
		document.querySelector('#search_results .container').innerHTML = result;
		lastMatchedIds = matchedIds;
	}
}
