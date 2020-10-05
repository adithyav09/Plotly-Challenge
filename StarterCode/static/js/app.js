var select = d3.select('select');
var panel = d3.select('.panel-body');
var jsData;
d3.json('../data/samples.json').then(data => {
    jsData = data;
    var names = data.names;
    names.forEach(name => {
        select.append('option').text(name).property('value',name)
    });
    
    showDemo(names[0])
    showBubbles(names[0])
    showPlot(names[0])
});

function showDemo(name) {
    d3.json('../data/samples.json').then( data => {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];
        Object.entries(metadata).forEach(([key,value]) => {
            panel.append('h5').text(`${key.toUpperCase()}: ${value}`)
        });
    });
};

function showBubbles(name) {
    d3.json('../data/samples.json').then(data => {
        var sample = data.samples.filter(obj => obj.id == name)[0];

        bubbleData = {
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels,
            mode: 'markers',
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids,
                colorscale: 'Earth'
            }
        };

        var data = [bubbleData];

        Plotly.newPlot('bubble', data);
        
    });
};

function showPlot(name) {
    d3.json('../data/samples.json').then(data => {
        var sample = data.samples.filter(obj => obj.id == name)[0];

        var barPlot = {
            x: sample.sample_values.slice(0,10).reverse(),
            y: sample.otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
            text: sample.otu_labels.slice(0, 10).reverse(),
            type:"bar",
            orientation: "h",
        };

        var data = [barPlot];

        Plotly.newPlot("bar", data);
        
    });

};

