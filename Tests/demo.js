// Comando en terminal donde esté el HTML:
// python -m http.server 8001
// En lugar de abrir el HTML en el browser poner: http://127.0.0.1:8001

// Este es el url base 
const baseUrl = "http://127.0.0.1:5000/api/v1.0/alldata"


// Console log ejemplo con la información de company
d3.json(baseUrl).then(function(jsonData) {
  console.log(jsonData);
});

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