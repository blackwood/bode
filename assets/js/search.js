const search = instantsearch({
  appId: 'OYRT4AO3TM',
  apiKey: 'e3afaac8323ecd81552a76be7fa77635',
  indexName: 'blackwood'
});

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'search miles blackwood robinson on the net'
  })
);

// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: '<a href="{{permalink}}"><h2>{{seo_title}}</h2></a><p>{{excerpt_text}}</p>',
      empty: 'No results'
    }
  })
);

search.start();
