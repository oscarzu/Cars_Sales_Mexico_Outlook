// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Compact",
            " Sports",
            "Pick Ups",
            "Minivans",
            "Subcompacts",
            " SUVs", "Luxury"
        ],
        datasets: [{
            data: [4046974, 133936, 2731231, 358172, 5793580, 3465625, 779845, ],
            backgroundColor: ['#6f42c1', '#f6c23e', '#4e73df', '#acacaf', '#36b9cc', '#fd7e14', '#e83e8c'],
            hoverBackgroundColor: ['#58349a', '#c49b31', '#3e5cb2', '#89898c', '#2b94a3', '#ca6410', '#b93170'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 0.5,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
            display: false
        },
        cutoutPercentage: 80,
    },
});