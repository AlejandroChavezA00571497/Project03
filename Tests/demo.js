// Comando en terminal donde esté el html:
// python -m http.server 8001

d3.json("http://127.0.0.1:5000/api/v1.0/company").then(function(data) {
  console.log(data);
});


