
function buildMetadata(sample) {

// fetch the metadata for the sample person
  var defaultURL = `/metadata/${sample}`; 
    d3.json(defaultURL).then((data) => {
    var selector = d3.select("#sample-metadata");
    
  // clear any existing metadata
    selector.html("");

    // append each metadata key and values 
    Object.entries(data).forEach(([key, value]) => {
      selector.append("div")
      .text(`${key}: `);
      selector.append("p").text(value)
      });
    });
};

function buildCharts(sample) {
console.log(sample)
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var defaultURL = `/samples/${sample}`; 
    d3.json(defaultURL).then((data) => {
    console.log(data);  
    var values = data.sample_values.slice(0,10);
    var labels = data.otu_labels.slice(0,10);
    var ids = data.otu_ids.slice(0,10);
    console.log(labels);

  // @TODO: Build a Bubble Chart using the sample data
  // @TODO: Build a Pie Chart

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


    // @TODO: Build a Pie Chart
  // function pieChart() {
    var trace = [{
      "values": values,
      "labels": ids,
      "hovertext": labels,
      "type": "pie"
    }];

    var layout = {
      height: 600,
      width: 800
    };

    var trace1 = [{
      x : ids,
      y : values,
      mode : 'markers',
      marker: {
        size: values
      }
    }];

  Plotly.plot("pie", trace, layout);
  Plotly.plot("bubble", trace1, layout);
    });
};
// };

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
      console.log(firstSample);
    });
  
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
optionChanged();


// Initialize the dashboard
init();
