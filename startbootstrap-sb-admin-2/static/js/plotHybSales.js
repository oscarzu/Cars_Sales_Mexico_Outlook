var coso = undefined;

let salesGraph = d3.json("/hybrid").then(data => {
    coso = data;

    estados = data.map(d => d.State)
    estados = Array.from(new Set(estados));

    let extractor = (x_datos, fecha) => {
        return x_datos.filter(d => d.Year === fecha).map(d => d.Total_Sales)
    }

    var trace1 = {
        x: estados,
        y: extractor(data, "2016"),
        type: 'bar',
        name: '2016',
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    };
    var trace2 = {
        x: estados,
        y: extractor(data, "2017"),
        type: 'bar',
        name: '2017',
        marker: {
            color: 'rgb(233, 150, 122)',
            opacity: 0.5
        }
    };
    var trace3 = {
        x: estados,
        y: extractor(data, "2018"),
        type: 'bar',
        name: '2018',
        marker: {
            color: 'rgb(138, 43, 226)',
            opacity: 0.5
        }
    }

    var trace4 = {
        x: estados,
        y: extractor(data, "2019"),
        type: 'bar',
        name: '2019',
        marker: {
            color: 'rgb(0, 139, 139)',
            opacity: 0.5
        }
    }

    var datos = [trace1, trace2, trace3, trace4];
    var layout = {
        title: {

            font: {
                family: 'Consolas',
                size: 24
            },
            xref: 'paper',
            x: 0.05,

        },
        xaxis: { title: "States", tickangle: 30, family: 'Consolas' },
        yaxis: { title: "Sales", family: 'Consolas' },

        barmode: 'group'
    };
    const config = { responsive: true }
    Plotly.newPlot('churrumais', datos, layout, config);

});