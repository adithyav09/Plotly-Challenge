var jsData;
var select = d3.select('select');
var panel = d3.select('.panel-body');

d3.json('../data/samples.json').then(data => {
    var names = data.names;
    
    names.forEach(name => {
        select.append('option').text(name).property('value',name)
    });
    
    showDemo(names[0])
    showBubbles(names[0])


    jsData = data;
    console.log(data.samples);
});

function showDemo(name) {
    d3.json('../data/samples.json').then( data => {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];
        Object.entries(metadata).forEach(([key,value]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${value}`)
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

        
        console.log(bubbleData);
        
        Plotly.newPlot('bubble', bubbleData)
        
    });
};