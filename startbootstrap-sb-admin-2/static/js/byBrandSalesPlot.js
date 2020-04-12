// define the route to the information for the graphic
let YearHibGraph = d3.json("/hybridComplete").then(data => {
    console.log(data)
    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    let getYear = (current_anio) => {
        valores = []
        for (x of meses) {
            if (Object.keys(data).includes(x)) {
                valores.push(data[x][current_anio])
            } else {
                valores.push(0)
            }
        }
        return valores
    }

    var trace1 = {
        x: meses,
        y: getYear(2016),
        type: 'scatter',
        name: '2016',
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    };

    var trace2 = {
        x: meses,
        y: getYear(2017),
        type: 'scatter',
        name: '2017',
        marker: {
            color: 'rgb(233, 150, 122)',
            opacity: 0.5
        }
    };
    var trace3 = {
        x: meses,
        y: getYear(2018),
        type: 'scatter',
        name: '2018',
        marker: {
            color: 'rgb(138, 43, 226)',
            opacity: 0.5
        }
    }

    var trace4 = {
        x: meses,
        y: getYear(2019),
        type: 'scatter',
        name: '2019',
        marker: {
            color: 'rgb(0, 139, 139)',
            opacity: 0.5
        }
    }

    var datos = [trace1, trace2, trace3, trace4];
    var layout = {
        title: {
            text: '2016-2019 Year Sales',
            font: {
                family: 'Consolas',
                size: 24
            },
            xref: 'paper',
            x: 0.05,

        },
        xaxis: { title: "Month", tickangle: 30, family: 'Consolas' },
        yaxis: { title: "Sales", family: 'Consolas' },

    };
    const config = { responsive: true }
    Plotly.newPlot('adobadas', datos, layout, config);

});