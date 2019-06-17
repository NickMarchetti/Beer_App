Plotly.d3.csv('static/csv/beer_styles.csv', function(err, rows){
  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

var data = [
    {
      type: "sunburst",
      maxdepth: 3,
      ids: unpack(rows, 'ids'),
      labels: unpack(rows, 'labels'),
      parents:unpack(rows, 'parents'),
      outsidetextfont: {size: 15, color: "#377eb8"},
      leaf: {opacity: 0.5},
      marker: {line: {width: .3, color:"#FFFFFF"}}
    }
  ];

var layout = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  autosize: true,
  margin: {l: 0, r: 0, b: 5, t:5},
  extendsunburstcolorway: true,
  hovermode: false

};


Plotly.newPlot('sunburst-id', data, layout, {displayModeBar: false});
})
