// Comando en terminal donde esté el HTML:
// python -m http.server 8001
// En lugar de abrir el HTML en el browser poner: http://127.0.0.1:8001

// Este es el url base 
const baseUrl = "http://127.0.0.1:5000/api/v1.0/alldata"


// Console log ejemplo con la información de company
d3.json(baseUrl).then(function(data) {
  console.log(data.company);
});

d3.json(baseUrl).then(function(data){
  company = data[0];
});

console.log(company)