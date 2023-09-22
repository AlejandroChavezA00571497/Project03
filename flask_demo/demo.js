// Get the Roadster endpoint
const roadster = "https://api.spacexdata.com/v4/roadster";

// Fetch the JSON data and console log it
d3.json(roadster).then(function(data) {
  console.log(data);
});

// Get the capsules endpoint
const capsules = "https://api.spacexdata.com/v4/capsules";

// Fetch the JSON data and console log it
d3.json(capsules).then(function(data) {
  console.log(data);
});


d3.json("http://127.0.0.1:5000/api/v1.0/names").then(function(data) {
  console.log(data);
});


// python -m http.server