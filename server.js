const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Funktion zur Überprüfung der Gehaltsvorstellungen der Kandidaten
function validateCandidatesSalary(candidates) {
  return candidates.filter(candidate => candidate.desired_salary > 100000);
}

// Route zur Validierung der Gehälter
server.post('/validate-salary', (req, res) => {
  const candidates = router.db.get('candidates').value();
  const highEarners = validateCandidatesSalary(candidates);

  if (highEarners.length > 0) {
    res.status(400).json({
      message: 'Es gibt Kandidaten, die mehr als 100000€ verdienen möchten.',
      highEarners
    });
  } else {
    res.json({ message: 'Alle Kandidaten haben akzeptable Gehaltswünsche.' });
  }
});

// Neue Route zur Überprüfung, ob ein Kandidat vorhanden ist
server.get('/candidates/check', (req, res) => {
  const { surname } = req.query;
  const candidates = router.db.get('candidates').value();
  const candidateExists = candidates.some(candidate => candidate.surname === surname);

  if (candidateExists) {
    res.json({ message: 'Der Kandidat ist vorhanden.' });
  } else {
    res.status(404).json({ message: 'Der Kandidat wurde nicht gefunden.' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
