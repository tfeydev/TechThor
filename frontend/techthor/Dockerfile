FROM node:20-alpine

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# Package-Dateien kopieren und Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm install

# Den gesamten Code ins Arbeitsverzeichnis kopieren
COPY . .

# Exponiere den Port, den Vite verwendet (Standard: 5173)
EXPOSE 5173

# Vite-Entwicklungsserver starten
CMD ["npm", "run", "dev", "--", "--host"]
