const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.delete('/candidates/:c_id', (req, res) => {
  const c_id = req.params.c_id;
  const candidate = router.db.get('candidates').find({ c_id: c_id }).value();
  if (candidate) {
    router.db.get('candidates').remove({ c_id: c_id }).write();
    res.status(200).json({ message: 'Kandidat erfolgreich gelöscht.' });
  } else {
    res.status(404).json({ message: 'Kandidat nicht gefunden.' });
  }
});

server.post('/employees', (req, res) => {
  const employee = req.body;
  if (employee) {
    employee.id = findLastEmployee(router.db).id + 1;
    router.db.get('employees').push(employee).write();
    res.status(201).json({ message: 'Mitarbeiter erfolgreich erstellt.' });
  } else {
    res.status(400).json({ message: 'Ungültige Anfrage.' });
  }
});

function findLastEmployee(db) {
  const employees = db.get('employees').value();
  return employees[employees.length - 1];
}
server.use(router);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
