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



//---------------------------------------------------------------------------
// Maps
// Heatmap: Locations
var myMap = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var heatmapData = [];
const locationsList = [
  { name: "Aachen, NW, Germany", latitude: 50.7753, longitude: 6.0839 },
  { name: "Aarhus, AR, Denmark", latitude: 56.1629, longitude: 10.2039 },
  { name: "Albuquerque, NM", latitude: 35.0845, longitude: -106.6504 },
  { name: "Aliso Viejo, CA", latitude: 33.5685, longitude: -117.7258 },
  { name: "Alpharetta, GA", latitude: 34.0754, longitude: -84.2941 },
  { name: "Amsterdam, NH, Netherlands", latitude: 52.3676, longitude: 4.9041 },
  { name: "Ann Arbor, MI", latitude: 42.2808, longitude: -83.7430 },
  { name: "Annandale, VA", latitude: 38.8304, longitude: -77.1968 },
  { name: "Antioch, TN", latitude: 36.0597, longitude: -86.6710 },
  { name: "Arizona City, AZ", latitude: 32.7569, longitude: -111.6710 },
  { name: "Arlington, TX", latitude: 32.7357, longitude: -97.1081 },
  { name: "Arlington, VA", latitude: 38.8816, longitude: -77.0910 },
  { name: "Armonk, NY", latitude: 41.1265, longitude: -73.7146 },
  { name: "Arvada, CO", latitude: 39.8028, longitude: -105.0875 },
  { name: "Ashburn, VA", latitude: 39.0438, longitude: -77.4874 },
  { name: "Aspen, CO", latitude: 39.1911, longitude: -106.8175 },
  { name: "Athens, GA", latitude: 33.9519, longitude: -83.3576 },
  { name: "Atlanta, GA", latitude: 33.7490, longitude: -84.3880 },
  { name: "Atlanta, NY", latitude: 33.7490, longitude: -84.3880 },
  { name: "Auckland, AU, New Zealand", latitude: 36.8485, longitude: 174.7633 },
  { name: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
  { name: "Baltimore, MD", latitude: 39.2904, longitude: -76.6122 },
  { name: "Bangalore, KA, India", latitude: 12.9716, longitude: 77.5946 },
  { name: "Barcelona, CT, Spain", latitude: 41.3851, longitude: 2.1734 },
  { name: "Baton Rouge, LA", latitude: 30.4515, longitude: -91.1871 },
  { name: "Baton Rouge, LA", latitude: 30.4515, longitude: -91.1871 },
  { name: "Beaverton, OR", latitude: 45.4871, longitude: -122.8037 },
  { name: "Bedford, MA", latitude: 42.4906, longitude: -71.2760 },
  { name: "Bellevue, WA", latitude: 47.6101, longitude: -122.2015 },
  { name: "Berkeley, CA", latitude: 37.8715, longitude: -122.2730 },
  { name: "Berlin, BE, Germany", latitude: 52.5200, longitude: 13.4050 },
  { name: "Bethesda, MD", latitude: 38.9847, longitude: -77.0947 },
  { name: "Beverly Hills, CA", latitude: 34.0736, longitude: -118.4004 },
  { name: "Birmingham, AL", latitude: 33.5186, longitude: -86.8104 },
  { name: "Bloomfield, CT", latitude: 41.8265, longitude: -72.7301 },
  { name: "Bloomington, MN", latitude: 44.8408, longitude: -93.2983 },
  { name: "Boca Raton, FL", latitude: 26.3683, longitude: -80.1289 },
  { name: "Boise, ID", latitude: 43.6150, longitude: -116.2023 },
  { name: "Bologna, BO, Italy", latitude: 44.4949, longitude: 11.3426 },
  { name: "Boston, MA", latitude: 42.3601, longitude: -71.0589 },
  { name: "Boulder, CO", latitude: 40.0150, longitude: -105.2705 },
  { name: "Boxborough, MA", latitude: 42.4917, longitude: -71.5170 },
  { name: "Bozeman, MT", latitude: 45.6770, longitude: -111.0429 },
  { name: "Bradenton, FL", latitude: 27.4989, longitude: -82.5748 },
  { name: "Brea, CA", latitude: 33.9167, longitude: -117.9001 },
  { name: "Brentwood, TN", latitude: 36.0331, longitude: -86.7828 },
  { name: "Brisbane, QLD, Australia", latitude: 27.4698, longitude: 153.0251 },
  { name: "Bristol, England, UK", latitude: 51.4545, longitude: -2.5879 },
  { name: "Broomfield, CO", latitude: 39.9205, longitude: -105.0867 },
  { name: "Brussels, BRU, Belgium", latitude: 50.8503, longitude: 4.3517 },
  { name: "Bucharest, B, Romania", latitude: 44.4268, longitude: 26.1025 },
  { name: "Budapest, BU, Hungary", latitude: 47.4979, longitude: 19.0402 },
  { name: "Buenos Aires, B, Argentina", latitude: -34.6037, longitude: -58.3816 },
  { name: "Buffalo, NY", latitude: 42.8864, longitude: -78.8784 },
  { name: "Burlington, MA", latitude: 42.5048, longitude: -71.1956 },
   { name: "Cairo, C, Egypt", latitude: 30.8025, longitude: 31.2357 },
  { name: "Calabasas, CA", latitude: 34.1367, longitude: -118.6615 },
  { name: "Calgary, AB, Canada", latitude: 51.0447, longitude: -114.0719 },
  { name: "Cambridge, MA", latitude: 42.3736, longitude: -71.1097 },
  { name: "Cambridge, England, UK", latitude: 52.2053, longitude: 0.1218 },
  { name: "Campbell, CA", latitude: 37.2872, longitude: -121.9499 },
  { name: "Canberra, ACT, Australia", latitude: -35.2809, longitude: 149.1300 },
  { name: "Cape Town, WC, South Africa", latitude: -33.9249, longitude: 18.4241 },
  { name: "Carlsbad, CA", latitude: 33.1581, longitude: -117.3506 },
  { name: "Carmel, IN", latitude: 39.9784, longitude: -86.1180 },
  { name: "Cary, NC", latitude: 35.7915, longitude: -78.7811 },
  { name: "Cedar Rapids, IA", latitude: 41.9779, longitude: -91.6656 },
  { name: "Chandler, AZ", latitude: 33.3062, longitude: -111.8413 },
  { name: "Chapel Hill, NC", latitude: 35.9049, longitude: -79.0469 },
  { name: "Charleston, SC", latitude: 32.7765, longitude: -79.9311 },
  { name: "Charlotte, NC", latitude: 35.2271, longitude: -80.8431 },
  { name: "Chattanooga, TN", latitude: 35.0456, longitude: -85.3097 },
  { name: "Chennai, TN, India", latitude: 13.0827, longitude: 80.2707 },
  { name: "Cherry Hill, NJ", latitude: 39.9268, longitude: -75.0246 },
  { name: "Chesterfield, MO", latitude: 38.6631, longitude: -90.5771 },
  { name: "Chevy Chase, MD", latitude: 38.9847, longitude: -77.0947 }, // same coordinates as Bethesda, MD
  { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
  { name: "Chico, CA", latitude: 39.7285, longitude: -121.8375 },
  { name: "Chula Vista, CA", latitude: 32.6401, longitude: -117.0842 },
  { name: "Cincinnati, OH", latitude: 39.1031, longitude: -84.5120 },
  { name: "Claremont, CA", latitude: 34.0967, longitude: -117.7198 },
  { name: "Cleveland, OH", latitude: 41.4993, longitude: -81.6944 },
  { name: "Cologne, NW, Germany", latitude: 50.9375, longitude: 6.9603 },
  { name: "Colorado Springs, CO", latitude: 38.8339, longitude: -104.8214 },
  { name: "Columbia, MD", latitude: 39.2037, longitude: -76.8610 },
  { name: "Columbia, MO", latitude: 38.9517, longitude: -92.3341 },
  { name: "Columbia, SC", latitude: 34.0007, longitude: -81.0348 },
  { name: "Columbus, GA", latitude: 32.4610, longitude: -84.9877 },
  { name: "Columbus, OH", latitude: 39.9612, longitude: -82.9988 },
  { name: "Copenhagen, H, Denmark", latitude: 55.6761, longitude: 12.5683 },
  { name: "Coppell, TX", latitude: 32.9546, longitude: -97.0150 },
  { name: "Coral Gables, FL", latitude: 25.7215, longitude: -80.2684 },
  { name: "Coral Springs, FL", latitude: 26.2712, longitude: -80.2709 },
  { name: "Cork, M, Ireland", latitude: 51.8985, longitude: -8.4756 },
  { name: "Corona, CA", latitude: 33.8753, longitude: -117.5664 },
  { name: "Corvallis, OR", latitude: 44.5646, longitude: -123.2620 },
  { name: "Costa Mesa, CA", latitude: 33.6638, longitude: -117.9047 },
  { name: "Cupertino, CA", latitude: 37.3220, longitude: -122.0322 },
  { name: "Cuyahoga Falls, OH", latitude: 41.1339, longitude: -81.4846 },
  { name: "Dallas, TX", latitude: 32.7767, longitude: -96.7970 },
  { name: "Daly City, CA", latitude: 37.6879, longitude: -122.4702 },
  { name: "Danbury, CT", latitude: 41.3948, longitude: -73.4540 },
  { name: "Davenport, IA", latitude: 41.5236, longitude: -90.5776 },
  { name: "Davis, CA", latitude: 38.5449, longitude: -121.7405 },
  { name: "Dayton, OH", latitude: 39.7589, longitude: -84.1916 },
  { name: "Dearborn, MI", latitude: 42.3223, longitude: -83.1763 },
  { name: "Decatur, IL", latitude: 39.8403, longitude: -88.9548 },
  { name: "Denver, CO", latitude: 39.7392, longitude: -104.9903 },
  { name: "Des Moines, IA", latitude: 41.5868, longitude: -93.6250 },
  { name: "Detroit, MI", latitude: 42.3314, longitude: -83.0458 },
  { name: "Dublin, D, Ireland", latitude: 53.3498, longitude: -6.2603 },
  { name: "Dublin, CA", latitude: 37.7022, longitude: -121.9358 },
  { name: "Durham, NC", latitude: 35.9940, longitude: -78.8986 },
  { name: "Eagan, MN", latitude: 44.8041, longitude: -93.1669 }, 
  { name: "East Hartford, CT", latitude: 41.7634, longitude: -72.6120 },
  { name: "East Lansing, MI", latitude: 42.7360, longitude: -84.4839 },
  { name: "East Orange, NJ", latitude: 40.7673, longitude: -74.2049 },
  { name: "East Palo Alto, CA", latitude: 37.4688, longitude: -122.1411 },
  { name: "Eden Prairie, MN", latitude: 44.8547, longitude: -93.4708 },
  { name: "Edina, MN", latitude: 44.8897, longitude: -93.3499 },
  { name: "Edinburgh, S, UK", latitude: 55.9533, longitude: -3.1883 },
  { name: "Edmonton, AB, Canada", latitude: 53.5461, longitude: -113.4938 },
  { name: "El Cajon, CA", latitude: 32.7948, longitude: -116.9625 },
  { name: "El Monte, CA", latitude: 34.0686, longitude: -118.0276 },
  { name: "El Paso, TX", latitude: 31.7619, longitude: -106.4850 },
  { name: "El Segundo, CA", latitude: 33.9192, longitude: -118.4165 },
  { name: "Elizabeth, NJ", latitude: 40.6630, longitude: -74.2107 },
  { name: "Elk Grove, CA", latitude: 38.4088, longitude: -121.3716 },
  { name: "Elkhart, IN", latitude: 41.681999, longitude: -85.9767 },
  { name: "Erie, PA", latitude: 42.1292, longitude: -80.0851 },
  { name: "Escondido, CA", latitude: 33.1192, longitude: -117.0864 },
  { name: "Eugene, OR", latitude: 44.0521, longitude: -123.0868 },
  { name: "Evansville, IN", latitude: 37.9716, longitude: -87.5711 },
  { name: "Everett, WA", latitude: 47.9787, longitude: -122.2021 },
  { name: "Fairfield, CA", latitude: 38.2494, longitude: -122.0400 },
  { name: "Fargo, ND", latitude: 46.8772, longitude: -96.7898 },
  { name: "Farmington Hills, MI", latitude: 42.4980, longitude: -83.4055 },
  { name: "Fayetteville, AR", latitude: 36.0822, longitude: -94.1719 },
  { name: "Fayetteville, NC", latitude: 35.0527, longitude: -78.8784 },
  { name: "Fishers, IN", latitude: 39.9568, longitude: -86.0133 },
  { name: "Flint, MI", latitude: 43.0125, longitude: -83.6875 },
  { name: "Florence, KY", latitude: 38.9989, longitude: -84.6266 },
  { name: "Fort Collins, CO", latitude: 40.5853, longitude: -105.0844 },
  { name: "Fort Lauderdale, FL", latitude: 26.1224, longitude: -80.1373 },
  { name: "Fort Smith, AR", latitude: 35.3859, longitude: -94.3985 },
  { name: "Fort Wayne, IN", latitude: 41.0793, longitude: -85.1394 },
  { name: "Fort Worth, TX", latitude: 32.7555, longitude: -97.3308 },
  { name: "Framingham, MA", latitude: 42.2793, longitude: -71.4162 },
  { name: "Frankfurt, HE, Germany", latitude: 50.1109, longitude: 8.6821 },
  { name: "Franklin, TN", latitude: 35.9251, longitude: -86.8689 },
  { name: "Frederick, MD", latitude: 39.4143, longitude: -77.4105 },
  { name: "Fremont, CA", latitude: 37.5485, longitude: -121.9886 },
  { name: "Fresno, CA", latitude: 36.7378, longitude: -119.7871 },
  { name: "Fullerton, CA", latitude: 33.8704, longitude: -117.9243 },
  { name: "Gainesville, FL", latitude: 29.6516, longitude: -82.3248 },
  { name: "Galway, C, Ireland", latitude: 53.2707, longitude: -9.0568 },
  { name: "Garden Grove, CA", latitude: 33.7739, longitude: -117.9414 },
  { name: "Garland, TX", latitude: 32.9126, longitude: -96.6389 },
  { name: "Gary, IN", latitude: 41.5934, longitude: -87.3464 },
  { name: "Gatineau, QC, Canada", latitude: 45.4765, longitude: -75.7013 },
  { name: "Geneva, GE, Switzerland", latitude: 46.2044, longitude: 6.1432 },
  { name: "Georgetown, TX", latitude: 30.6333, longitude: -97.6770 },
  { name: "Gilbert, AZ", latitude: 33.3528, longitude: -111.7890 },
  { name: "Gladstone, MO", latitude: 39.2039, longitude: -94.5547 },
  { name: "Glendale, AZ", latitude: 33.5387, longitude: -112.1860 },
  { name: "Glendale, CA", latitude: 34.1425, longitude: -118.2551 },
  { name: "Goodyear, AZ", latitude: 33.4353, longitude: -112.3577 },
  { name: "Grand Prairie, TX", latitude: 32.7459, longitude: -96.9978 },
  { name: "Grand Rapids, MI", latitude: 42.9634, longitude: -85.6681 },
  { name: "Grapevine, TX", latitude: 32.9343, longitude: -97.0781 },
  { name: "Green Bay, WI", latitude: 44.5133, longitude: -88.0158 },
  { name: "Greensboro, NC", latitude: 36.0726, longitude: -79.7920 },
  { name: "Greenville, SC", latitude: 34.8526, longitude: -82.3940 },
  { name: "Greenwich, CT", latitude: 41.0262, longitude: -73.6282 },  { name: "Gresham, OR", latitude: 45.5051, longitude: -122.4487 },
  { name: "Gulfport, MS", latitude: 30.3674, longitude: -89.0928 },
  { name: "Hackensack, NJ", latitude: 40.8859, longitude: -74.0435 },
  { name: "Hagerstown, MD", latitude: 39.6418, longitude: -77.7200 },
  { name: "Halifax, NS, Canada", latitude: 44.6488, longitude: -63.5752 },
  { name: "Hamilton, ON, Canada", latitude: 43.2557, longitude: -79.8711 },
  { name: "Hamburg, HH, Germany", latitude: 53.5511, longitude: 9.9937 },
  { name: "Hammond, IN", latitude: 41.5834, longitude: -87.5000 },
  { name: "Hampton, VA", latitude: 37.0299, longitude: -76.3452 },
  { name: "Hanover, NH", latitude: 43.7022, longitude: -72.2896 },
  { name: "Harrisburg, PA", latitude: 40.2732, longitude: -76.8867 },
  { name: "Hartford, CT", latitude: 41.7658, longitude: -72.6734 },
  { name: "Havana, La Habana, Cuba", latitude: 23.1136, longitude: -82.3666 },
  { name: "Hayward, CA", latitude: 37.6688, longitude: -122.0808 },
  { name: "Henderson, NV", latitude: 36.0395, longitude: -114.9817 },
  { name: "Hialeah, FL", latitude: 25.8576, longitude: -80.2781 },
  { name: "High Point, NC", latitude: 35.9557, longitude: -80.0053 },
  { name: "Hillsboro, OR", latitude: 45.5229, longitude: -122.9898 },
  { name: "Hoboken, NJ", latitude: 40.7433, longitude: -74.0324 },
  { name: "Hollywood, FL", latitude: 26.0112, longitude: -80.1495 },
  { name: "Honolulu, HI", latitude: 21.3069, longitude: -157.8583 },
  { name: "Houston, TX", latitude: 29.7604, longitude: -95.3698 },
  { name: "Huntington Beach, CA", latitude: 33.6595, longitude: -117.9988 },
  { name: "Huntsville, AL", latitude: 34.7304, longitude: -86.5861 },
  { name: "Independence, MO", latitude: 39.0911, longitude: -94.4155 },
  { name: "Indianapolis, IN", latitude: 39.7684, longitude: -86.1581 },
  { name: "Inglewood, CA", latitude: 33.9617, longitude: -118.3531 },
  { name: "Iowa City, IA", latitude: 41.6611, longitude: -91.5302 },
  { name: "Irvine, CA", latitude: 33.6846, longitude: -117.8265 },
  { name: "Irving, TX", latitude: 32.8140, longitude: -96.9489 }, 
  { name: "Irving, TX", latitude: 32.8140, longitude: -96.9489 },
  { name: "Istanbul, TR", latitude: 41.0082, longitude: 28.9784 },
  { name: "Jackson, MS", latitude: 32.2988, longitude: -90.1848 },
  { name: "Jacksonville, FL", latitude: 30.3322, longitude: -81.6557 },
  { name: "Jersey City, NJ", latitude: 40.7178, longitude: -74.0431 },
  { name: "Johannesburg, ZA", latitude: -26.2041, longitude: 28.0473 },
  { name: "Joliet, IL", latitude: 41.5250, longitude: -88.0817 },
  { name: "Kalamazoo, MI", latitude: 42.2917, longitude: -85.5872 },
  { name: "Kansas City, KS", latitude: 39.1141, longitude: -94.6275 },
  { name: "Kansas City, MO", latitude: 39.0997, longitude: -94.5786 },
  { name: "Kawasaki, Kanagawa, Japan", latitude: 35.5175, longitude: 139.6100 },
  { name: "Kenosha, WI", latitude: 42.5847, longitude: -87.8212 },
  { name: "Kiev, UA", latitude: 50.4501, longitude: 30.5234 },
  { name: "Killeen, TX", latitude: 31.1171, longitude: -97.7278 },
  { name: "Kitchener, ON, Canada", latitude: 43.4516, longitude: -80.4925 },
  { name: "Knoxville, TN", latitude: 35.9606, longitude: -83.9207 },
  { name: "Kobe, Hyogo, Japan", latitude: 34.6901, longitude: 135.1955 },
  { name: "Lafayette, LA", latitude: 30.2241, longitude: -92.0198 },
  { name: "Lakeland, FL", latitude: 28.0395, longitude: -81.9498 },
  { name: "Lakewood, CO", latitude: 39.7047, longitude: -105.0814 },
  { name: "Lancaster, PA", latitude: 40.0379, longitude: -76.3055 },
  { name: "Lansing, MI", latitude: 42.7325, longitude: -84.5555 },
  { name: "Laredo, TX", latitude: 27.5064, longitude: -99.5075 },
  { name: "Las Vegas, NV", latitude: 36.1699, longitude: -115.1398 },
  { name: "Lawrence, KS", latitude: 38.9717, longitude: -95.2353 },
  { name: "Lawton, OK", latitude: 34.6036, longitude: -98.3959 },
  { name: "Layton, UT", latitude: 41.0602, longitude: -111.9711 },
  { name: "Leipzig, Saxony, Germany", latitude: 51.3397, longitude: 12.3731 },
  { name: "Lewisville, TX", latitude: 33.0462, longitude: -96.9818 },
  { name: "Lexington, KY", latitude: 38.0406, longitude: -84.5037 }, 
  { name: "Lima, Peru", latitude: -12.0464, longitude: -77.0428 },
  { name: "Lincoln, NE", latitude: 40.8136, longitude: -96.7026 },
  { name: "Little Rock, AR", latitude: 34.7465, longitude: -92.2896 },
  { name: "Long Beach, CA", latitude: 33.7701, longitude: -118.1937 },
  { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
  { name: "Louisville, KY", latitude: 38.2527, longitude: -85.7585 },
  { name: "Lubbock, TX", latitude: 33.5779, longitude: -101.8552 },
  { name: "Luxembourg City, Luxembourg", latitude: 49.6116, longitude: 6.1319 },
  { name: "Lyon, France", latitude: 45.7578, longitude: 4.8320 },
  { name: "Madison, WI", latitude: 43.0731, longitude: -89.4012 },
  { name: "Madrid, Spain", latitude: 40.4168, longitude: -3.7038 },
  { name: "Manchester, NH", latitude: 42.9956, longitude: -71.4548 },
  { name: "Manila, Philippines", latitude: 14.5995, longitude: 120.9842 },
  { name: "Maracaibo, Zulia, Venezuela", latitude: 10.6317, longitude: -71.6406 },
  { name: "Marseille, France", latitude: 43.2965, longitude: 5.3698 },
  { name: "McAllen, TX", latitude: 26.2034, longitude: -98.2300 },
  { name: "Melbourne, Victoria, Australia", latitude: -37.8136, longitude: 144.9631 },
  { name: "Memphis, TN", latitude: 35.1495, longitude: -90.0490 },
  { name: "Mesa, AZ", latitude: 33.4152, longitude: -111.8315 },
  { name: "Mesquite, TX", latitude: 32.7668, longitude: -96.5992 },
  { name: "Mexico City, Mexico", latitude: 19.4326, longitude: -99.1332 },
  { name: "Miami, FL", latitude: 25.7617, longitude: -80.1918 },
  { name: "Milan, Lombardy, Italy", latitude: 45.4642, longitude: 9.1900 },
  { name: "Milwaukee, WI", latitude: 43.0389, longitude: -87.9065 },
  { name: "Minneapolis, MN", latitude: 44.9778, longitude: -93.2650 },
  { name: "Minsk, Belarus", latitude: 53.9006, longitude: 27.5590 },
  { name: "Mobile, AL", latitude: 30.6954, longitude: -88.0399 },
  { name: "Modesto, CA", latitude: 37.6391, longitude: -120.9969 },
  { name: "Monterrey, Nuevo Leon, Mexico", latitude: 25.6866, longitude: -100.3161 },
  { name: "Montgomery, AL", latitude: 32.3792, longitude: -86.3077 },
  { name: "Montpellier, France", latitude: 43.6108, longitude: 3.8772 },
  { name: "Montreal, Quebec, Canada", latitude: 45.5017, longitude: -73.5673 },
  { name: "Moreno Valley, CA", latitude: 33.9425, longitude: -117.2297 },
  { name: "Mumbai, Maharashtra, India", latitude: 19.0760, longitude: 72.8777 },
  { name: "Munich, Bavaria, Germany", latitude: 48.1351, longitude: 11.5820 },
  { name: "Nagoya, Aichi, Japan", latitude: 35.1815, longitude: 136.9066 },
  { name: "Nairobi, Kenya", latitude: -1.2864, longitude: 36.8172 },
  { name: "Nanjing, Jiangsu, China", latitude: 32.0603, longitude: 118.7969 },
  { name: "Nashville, TN", latitude: 36.1627, longitude: -86.7816 },
  { name: "New Delhi, Delhi, India", latitude: 28.6139, longitude: 77.2090 },
  { name: "New Haven, CT", latitude: 41.3083, longitude: -72.9279 },
  { name: "New Orleans, LA", latitude: 29.9511, longitude: -90.0715 },
  { name: "New York City, NY", latitude: 40.7128, longitude: -74.0060 },
  { name: "Newark, NJ", latitude: 40.7357, longitude: -74.1724 },
  { name: "Newcastle, New South Wales, Australia", latitude: -32.9283, longitude: 151.7817 },
  { name: "Nice, France", latitude: 43.7102, longitude: 7.2620 },
  { name: "Norfolk, VA", latitude: 36.8508, longitude: -76.2859 },
  { name: "North Las Vegas, NV", latitude: 36.2001, longitude: -115.1220 },
  { name: "Norwich, England, United Kingdom", latitude: 52.6309, longitude: 1.2974 },
  { name: "Nottingham, England, United Kingdom", latitude: 52.9548, longitude: -1.1581 },
  { name: "Nuremberg, Bavaria, Germany", latitude: 49.4521, longitude: 11.0767 },
  { name: "Oakland, CA", latitude: 37.8044, longitude: -122.2711 },
  { name: "Oklahoma City, OK", latitude: 35.4676, longitude: -97.5164 },
  { name: "Omaha, NE", latitude: 41.2565, longitude: -95.9345 },
  { name: "Orlando, FL", latitude: 28.5383, longitude: -81.3792 },
  { name: "Osaka, Osaka Prefecture, Japan", latitude: 34.6937, longitude: 135.5022 },
  { name: "Oslo, Norway", latitude: 59.9139, longitude: 10.7522 },
  { name: "Ottawa, Ontario, Canada", latitude: 45.4215, longitude: -75.6999 },
  { name: "Oxnard, CA", latitude: 34.1975, longitude: -119.1771 },
  { name: "Palermo, Sicily, Italy", latitude: 38.1157, longitude: 13.3615 },
  { name: "Paris, France", latitude: 48.8566, longitude: 2.3522 },
  { name: "Patna, Bihar, India", latitude: 25.5941, longitude: 85.1376 },
  { name: "Pensacola, FL", latitude: 30.4213, longitude: -87.2169 },
  { name: "Perth, Western Australia, Australia", latitude: -31.9505, longitude: 115.8605 },
  { name: "Philadelphia, PA", latitude: 39.9526, longitude: -75.1652 },
  { name: "Phoenix, AZ", latitude: 33.4484, longitude: -112.0740 },
  { name: "Pittsburgh, PA", latitude: 40.4406, longitude: -79.9959 },
  { name: "Plymouth, England, United Kingdom", latitude: 50.3755, longitude: -4.1427 },
  { name: "Port Elizabeth, Eastern Cape, South Africa", latitude: -33.9608, longitude: 25.6022 },
  { name: "Portland, OR", latitude: 45.5122, longitude: -122.6587 },
  { name: "Porto, Portugal", latitude: 41.1579, longitude: -8.6291 },
  { name: "Portsmouth, England, United Kingdom", latitude: 50.8198, longitude: -1.0882 },
  { name: "Prague, Czech Republic", latitude: 50.0755, longitude: 14.4378 },
  { name: "Pretoria, Gauteng, South Africa", latitude: -25.7461, longitude: 28.1881 },
  { name: "Puebla City, Puebla, Mexico", latitude: 19.0414, longitude: -98.2063 },
  { name: "Pune, Maharashtra, India", latitude: 18.5204, longitude: 73.8567 },
  { name: "Qingdao, Shandong, China", latitude: 36.0671, longitude: 120.3826 },
  { name: "Quebec City, Quebec, Canada", latitude: 46.8139, longitude: -71.2082 },
  { name: "Quito, Pichincha, Ecuador", latitude: -0.1807, longitude: -78.4678 },
  { name: "Raleigh, NC", latitude: 35.7796, longitude: -78.6382 },
  { name: "Ranchi, Jharkhand, India", latitude: 23.3441, longitude: 85.3096 },
  { name: "Rawalpindi, Punjab, Pakistan", latitude: 33.5651, longitude: 73.0169 },
  { name: "Recife, Pernambuco, Brazil", latitude: -8.0476, longitude: -34.8770 },
  { name: "Reno, NV", latitude: 39.5296, longitude: -119.8138 },
  { name: "Richmond, VA", latitude: 37.5407, longitude: -77.4360 },
  { name: "Rio de Janeiro, Rio de Janeiro, Brazil", latitude: -22.9083, longitude: -43.1964 },
  { name: "Riyadh, Saudi Arabia", latitude: 24.7136, longitude: 46.6753 },
  { name: "Rochester, NY", latitude: 43.1566, longitude: -77.6088 },
  { name: "Rome, Lazio, Italy", latitude: 41.9028, longitude: 12.4964 },
  { name: "Rotterdam, South Holland, Netherlands", latitude: 51.9225, longitude: 4.4792 },
  { name: "Sacramento, CA", latitude: 38.5816, longitude: -121.4944 },
  { name: "Saint Louis, MO", latitude: 38.6270, longitude: -90.1994 },
  { name: "Saint Petersburg, Russia", latitude: 59.9343, longitude: 30.3351 },
  { name: "Salem, OR", latitude: 44.9429, longitude: -123.0351 },
  { name: "Salt Lake City, UT", latitude: 40.7608, longitude: -111.8910 },
  { name: "San Antonio, TX", latitude: 29.4241, longitude: -98.4936 },
  { name: "San Diego, CA", latitude: 32.7157, longitude: -117.1611 },
  { name: "San Francisco, CA", latitude: 37.7749, longitude: -122.4194 },
  { name: "San Jose, CA", latitude: 37.3382, longitude: -121.8863 },
  { name: "San Juan, Puerto Rico", latitude: 18.4655, longitude: -66.1057 },
  { name: "Santa Cruz, CA", latitude: 36.9741, longitude: -122.0308 },
  { name: "Santiago, Chile", latitude: -33.4489, longitude: -70.6693 },
  { name: "Santo Domingo, Dominican Republic", latitude: 18.4861, longitude: -69.9312 },
  { name: "Sao Paulo, Sao Paulo, Brazil", latitude: -23.5505, longitude: -46.6333 },
  { name: "Sapporo, Hokkaido, Japan", latitude: 43.0621, longitude: 141.3544 },
  { name: "Sarasota, FL", latitude: 27.3364, longitude: -82.5307 },
  { name: "Saskatoon, Saskatchewan, Canada", latitude: 52.1332, longitude: -106.6700 },
  { name: "Seattle, WA", latitude: 47.6062, longitude: -122.3321 },
  { name: "Seoul, South Korea", latitude: 37.5665, longitude: 126.9780 },
  { name: "Shanghai, China", latitude: 31.2304, longitude: 121.4737 },
  { name: "Shenzhen, Guangdong, China", latitude: 22.5431, longitude: 114.0579 },
  { name: "Shreveport, LA", latitude: 32.5252, longitude: -93.7502 },
  { name: "Singapore, Singapore", latitude: 1.3521, longitude: 103.8198 },
  { name: "Sioux Falls, SD", latitude: 43.5460, longitude: -96.7313 },
  { name: "Sofia, Bulgaria", latitude: 42.6977, longitude: 23.3219 },
  { name: "Southampton, England, United Kingdom", latitude: 50.9097, longitude: -1.4044 },
  { name: "Spokane, WA", latitude: 47.6588, longitude: -117.4260 },
  { name: "Springfield, MO", latitude: 37.2089, longitude: -93.2923 },
  { name: "St. Paul, MN", latitude: 44.9537, longitude: -93.0900 },
  { name: "Stockholm, Sweden", latitude: 59.3293, longitude: 18.0686 }, 
  { name: "Stuttgart, Germany", latitude: 48.7758, longitude: 9.1829 },
  { name: "Suva, Fiji", latitude: -18.1248, longitude: 178.4501 },
  { name: "Sydney, New South Wales, Australia", latitude: -33.8688, longitude: 151.2093 },
  { name: "Syracuse, NY", latitude: 43.0481, longitude: -76.1474 },
  { name: "Taipei, Taiwan", latitude: 25.0330, longitude: 121.5654 },
  { name: "Tallinn, Estonia", latitude: 59.4370, longitude: 24.7536 },
  { name: "Tampa, FL", latitude: 27.9506, longitude: -82.4572 },
  { name: "Tashkent, Uzbekistan", latitude: 41.2995, longitude: 69.2401 },
  { name: "Tbilisi, Georgia", latitude: 41.7151, longitude: 44.8271 },
  { name: "Tegucigalpa, Honduras", latitude: 14.0723, longitude: -87.1921 },
  { name: "Tehran, Iran", latitude: 35.6892, longitude: 51.3890 },
  { name: "Tel Aviv, Israel", latitude: 32.0853, longitude: 34.7818 },
  { name: "The Hague, Netherlands", latitude: 52.0705, longitude: 4.3007 },
  { name: "Thessaloniki, Greece", latitude: 40.6401, longitude: 22.9444 },
  { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917 },
  { name: "Toledo, OH", latitude: 41.6528, longitude: -83.5379 },
  { name: "Toronto, Ontario, Canada", latitude: 43.6532, longitude: -79.3832 },
  { name: "Toulouse, France", latitude: 43.6047, longitude: 1.4442 },
  { name: "Tripoli, Libya", latitude: 32.8872, longitude: 13.1913 },
  { name: "Tucson, AZ", latitude: 32.2226, longitude: -110.9747 },
  { name: "Tulsa, OK", latitude: 36.1540, longitude: -95.9928 },
  { name: "Turin, Italy", latitude: 45.0703, longitude: 7.6869 },
  { name: "Ulaanbaatar, Mongolia", latitude: 47.8864, longitude: 106.9057 },
  { name: "Utrecht, Netherlands", latitude: 52.0907, longitude: 5.1214 },
  { name: "Vaduz, Liechtenstein", latitude: 47.1410, longitude: 9.5209 },
  { name: "Valencia, Spain", latitude: 39.4699, longitude: -0.3763 },
  { name: "Valletta, Malta", latitude: 35.8989, longitude: 14.5146 },
  { name: "Vancouver, British Columbia, Canada", latitude: 49.2827, longitude: -123.1207 },
  { name: "Vienna, Austria", latitude: 48.2082, longitude: 16.3738 },
  { name: "Vientiane, Laos", latitude: 17.9757, longitude: 102.6331 },
  { name: "Vilnius, Lithuania", latitude: 54.6872, longitude: 25.2797 },
  { name: "Virginia Beach, VA", latitude: 36.8529, longitude: -75.9780 },
  { name: "Warsaw, Poland", latitude: 52.2297, longitude: 21.0122 },
  { name: "Washington, D.C.", latitude: 38.9072, longitude: -77.0369 },
  { name: "Wellington, New Zealand", latitude: -41.2865, longitude: 174.7762 },
  { name: "Windhoek, Namibia", latitude: -22.5597, longitude: 17.0835 },
  { name: "Winnipeg, Manitoba, Canada", latitude: 49.8951, longitude: -97.1384 },
  { name: "Wuhan, China", latitude: 30.5928, longitude: 114.3055 },
  { name: "Xian, China", latitude: 34.3416, longitude: 108.9402 },
  { name: "Yakutsk, Russia", latitude: 62.0355, longitude: 129.6753 },
  { name: "Yerevan, Armenia", latitude: 40.1792, longitude: 44.4991 },
  { name: "Zagreb, Croatia", latitude: 45.8150, longitude: 15.9819 },
  { name: "Zurich, Switzerland", latitude: 47.3769, longitude: 8.5417 },
  
];
for(let i = 0; i < locationsList.length; i++){
  let currentLocation = locationsList[i];
  if(currentLocation){
    heatmapData.push([currentLocation.latitude, currentLocation.longitude])
  }
}
var heat = L.heatLayer(heatmapData, {minOpacity: 0.2, radius: 10, blur: 1 }).addTo(myMap);
//>>>>>>> c33c66436a37126e6b58f8eb6851bf8083c84980
