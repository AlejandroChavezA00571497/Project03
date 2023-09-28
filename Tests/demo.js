// Comando en terminal donde esté el HTML:
// python -m http.server 8001
// En lugar de abrir el HTML en el browser poner: http://127.0.0.1:8001

// Este es el url base 
const baseUrl = "http://127.0.0.1:5000/api/v1.0/alldata"


// Console log ejemplo con la información de company
d3.json(baseUrl).then(function(jsonData) {
  console.log(jsonData);
});


//---------------------------------------------------------------------------
// Interacive Charts

//Reading the data, extracting the first company's data and using it to run the inital bar chart function
d3.json(baseUrl).then(function(jsonData){
  let firstCompany = jsonData[0]["company"];
  console.log(firstCompany)
  initialChart(firstCompany)
});


// Define function for the initial chart
function initialChart(firstCompany){
  d3.json(baseUrl).then(function(jsonData){
      let allData = jsonData;
      let subjectSelector = d3.select("#selDataset");
      let companies = []
      for (i = 1; i < allData.length; i++){
        companies.push(allData[i]["company"])
      }

      const companyData = d3.group(jsonData, d => d.company);
        const companyAverages = Array.from(companyData, ([key, value]) => ({
            company: key,
            averageSalary: d3.mean(value, d => d.totalyearlycompensation)
        }));
      companyAverages.sort((a, b) => b.averageSalary - a.averageSalary);
      const companyNames = companyAverages.map(d => d.company);
      companyNames.forEach(function(company){
          subjectSelector.append("option").text(company);
      })
  
      barChart(firstCompany);

  })
}



//Define function for building the barCharts
function barChart(firstCompany){
  d3.json(baseUrl).then(function(jsonData){
    let allData = jsonData;
    let companyData = allData.filter(x => x.company == firstCompany);


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







//---------------------------------------------------------------------------
// Static Charts

// Bar Chart: Company - TotalYearlyCompensation
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
      //indexAxis: 'y', 
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


// Line Chart: YearsOfExperience - TotalYearlyCompensation
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


// Pie Chart: Gender Distribution
d3.json(baseUrl).then(function(jsonData) {
  const genderCounts = {
    male: 0,
    female: 0,
    other: 0,
  };
  
  jsonData.forEach(entry => {
    const gender = entry.gender.toLowerCase(); // Assuming 'gender' is a property in your JSON data
    if (gender === 'male') {
      genderCounts.male++;
    } else { (gender === 'female') 
      genderCounts.female++;
    } 
  });
  
  const ctx = document.getElementById('myChart03');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Male", "Female"],
      datasets: [{
        data: [genderCounts.male, genderCounts.female],
        backgroundColor: ['#FF5733', '#33FF57'],
      }],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Gender Distribution"
      }
    }
  });

});

// Bar Chart: Education Level Distribution
d3.json(baseUrl).then(function(jsonData) {
  let gradeCounts = {
    master: 0,
    doctorate: 0,
    bachelors: 0,
    other: 0,
  };
  
//  def count(masterdegree):
//    return sum(bool(x) for x in masterdegree)

  jsonData.forEach(eachRow => {
    //console.log(eachRow)
    if (eachRow.doctoratedegree) {
      gradeCounts.doctorate ++;
    } else if (eachRow.mastersdegree) {
      gradeCounts.master ++; 
    } else if (eachRow.bachelorsdegree){
      gradeCounts.bachelors ++;
    } else {
      gradeCounts.other ++;
    }
  });

  console.log(gradeCounts);
  
  const ctx = document.getElementById('myChart04');
  console.log(ctx);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Master", "Doctorate", "Bachelors", "Other"],
      datasets: [{
        data: [gradeCounts.master, gradeCounts.doctorate, gradeCounts.bachelors, gradeCounts.other],
        backgroundColor: ['#FF5733', '#33FF57', '#F08080', '#40E0D0'],
      }],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Education Level Distribution"
      }
    }
  });

});

