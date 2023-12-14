# JSON Server mit Validierung

Dieses Projekt umfasst einen erweiterten `json-server`, der benutzerdefinierte Validierungen für Gehaltsvorstellungen von Kandidaten durchführt und überprüft, ob Kandidaten in der Datenbank vorhanden sind.

## Features

- Vollständige CRUD-Operationen über den `json-server`.
- Benutzerdefinierte Validierungsroute `/validate-salary` zur Überprüfung der Gehaltsvorstellungen von Kandidaten.
- Route `/candidates/check` zur Überprüfung der Existenz eines Kandidaten anhand des Nachnamens.

## Voraussetzungen

Stellen Sie sicher, dass Node.js auf Ihrem System installiert ist. Sie können es von [Node.js offizielle Webseite](https://nodejs.org/) herunterladen.

## Installation

Führen Sie die folgenden Schritte aus, um das Projekt zu installieren:

```bash
# Klonen des Repositories
git clone <repository-url>

# Wechseln ins Projektverzeichnis
cd <repository-dir>

# Installation der Abhängigkeiten
npm install

# Server starten
npm start


#Existenz eines Kandidaten prüfen:
curl "http://localhost:3000/candidates/check?surname=Mayor"
