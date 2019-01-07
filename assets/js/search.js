const search = instantsearch({
  appId: "OYRT4AO3TM",
  apiKey: "e3afaac8323ecd81552a76be7fa77635",
  indexName: "blackwood"
});

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "search baze blackwood on the net"
  })
);

// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: '<h1>{{title}}</h1><p>{{{_highlightResult.html.value}}}</p>',
      empty: "No results"
    }
  })
);

search.start();