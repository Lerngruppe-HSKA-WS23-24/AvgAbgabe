const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Validierungsfunktion, die jetzt direkt das Anfrage-Objekt verwendet
function validateCandidateRequest(requestData) {
  return requestData.desired_salary > 100000;
}

// Route zur Validierung der Daten aus dem Formular
server.post('/validate', (req, res) => {
  // Die Anfrage-Daten direkt aus req.body extrahieren
  const requestData = req.body;

  // Validierung der Daten aus dem Formular
  const isSalaryTooHigh = validateCandidateRequest(requestData);

  if (isSalaryTooHigh) {
    console.log("Ein Kandidat möchte mehr als 100000€ verdienen.");
    res.status(400).json({
      message: 'Ein Kandidat möchte mehr als 100000€ verdienen.',
      requestData
    });
  } else {
    res.json({ message: 'Die Gehaltsvorstellung des Kandidaten ist akzeptabel.' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
