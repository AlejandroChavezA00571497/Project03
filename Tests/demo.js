// Comando en terminal donde esté el HTML:
// python -m http.server 8001
// En lugar de abrir el HTML en el browser poner: http://127.0.0.1:8001

// Este es el url base 
const baseUrl = "http://127.0.0.1:5000/api/v1.0/alldata"


// Console log ejemplo con la información de company
d3.json(baseUrl).then(function(jsonData) {
  //console.log(jsonData);
});

/*
//Reading the data, extracting the first company's data and using it to run the inital bar chart function
d3.json(baseUrl).then(function(jsonData){
  let firstCompany = jsonData[0]["company"];
  console.log(firstCompany)
  initialChart(firstCompany)
});


// Define function for the initial chart
function initialChart(firstCompany){
  d3.json(baseUrl).then(function(jsonData){
      let subjectSelector = d3.select("#selDataset");
      let companies = jsonData.company;
      companies.forEach(function(company){
          subjectSelector.append("option").text(company);
      })
  
      barChart(firstCompany);

  })
}



//Define function for building the barCharts
function barChart(firstCompany){
  d3.json(baseUrl).then(function(jsonData){
      let companyData = jsonData.samples.filter(x => x.id == firstCompany);


      let barChartData = [{
          x : companyData[0].company,
          y : companyData[0].totalyearlycompensation,
          type : "bar",
          orientation : "h",
          text : companyData[0].totalyearlycompensation
      }];

      let barChartLayout = {
          height : 500,
          width : 600,
          yaxis : {type : "category"}
      }

      Plotly.newPlot("bar", barChartData, barChartLayout)
  })
};


//Define the optionChanged function present in the HTML, in order to actually change the visualizations according to the selected SubjectID

function optionChanged(firstCompany){
  barChart(firstCompany);
};
*/


//---------------------------------------------------------------------------
// Charts

// Bar Chart Company - TotalYearlyCompensation
d3.json(baseUrl).then(function(jsonData) {
  const companyData = d3.group(jsonData, d => d.company);
        const companyAverages = Array.from(companyData, ([key, value]) => ({
            company: key,
            averageSalary: d3.mean(value, d => d.totalyearlycompensation)
        }));
        
    companyAverages.sort((a, b) => b.averageSalary - a.averageSalary);
  
    const companyNames = companyAverages.map(d => d.company);
    const averageSalaries = companyAverages.map(d => d.averageSalary);


  const ctx = document.getElementById('myChart01');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: companyNames,
      datasets: [{
        label: 'Average Total Yearly Compensation per company',
        data: averageSalaries,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 10000,
          min: 0,
          max: 600000
        }
      }
    }
  });

});


// Line Chart YearsOfExperience - TotalYearlyCompensation
d3.json(baseUrl).then(function(jsonData) {
  const groupedYearsOfExperience = d3.group(jsonData, d => d.yearsofexperience);
  const averagesYearsOfExperience = Array.from(groupedYearsOfExperience, ([yearsofexperience, values]) => ({
    yearsofexperience: +yearsofexperience,
    averageTotalYearlyCompensation: d3.mean(values, d => d.totalyearlycompensation),
  }));

  const years = averagesYearsOfExperience.map(d => d.yearsofexperience);
  const avgCompensation = averagesYearsOfExperience.map(d => d.averageTotalYearlyCompensation);
  years.sort((a,b) => a-b)
  
  const ctx = document.getElementById('myChart02');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Average Total Yearly Compensation per year',
        data: avgCompensation,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 10000,
          min: 0,
          max: 1000000
        }
      }
    }
  });

});
