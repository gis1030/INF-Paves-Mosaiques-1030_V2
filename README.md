# 🪨 Inventory of the mosaic paving stones of the entrances and facades of Schaerbeek

> Bilingual interactive map of the mosaic paving stones adorning the entrances and facades of Schaerbeek · 243 mosaics catalogued · Data as of May 2026

---

## 🔗 Quick Access

| Tool | Description | Link |
|---|---|---|
| 🌐 **Home page** | Project portal | [index.html](https://gis1030.github.io/INF-Paves-Mosaiques-1030_V2/) |
| 🗺️ **Interactive Map (FR)** | Carte interactive des pavés mosaïques — Français | [indexFR.html](https://gis1030.github.io/INF-Paves-Mosaiques-1030_V2/indexFR.html) |
| 🗺️ **Interactieve Kaart (NL)** | Interactieve kaart van de mozaïekstenen — Nederlands | [indexNL.html](https://gis1030.github.io/INF-Paves-Mosaiques-1030_V2/indexNL.html) |

---

## 📋 About the Project

This project provides a **bilingual interactive cartographic inventory of the mosaic paving stones** adorning the entrances and facades of buildings throughout the municipality of Schaerbeek.

### Origin of the Mosaics

The story of Schaerbeek's mosaic paving stones began with a personal initiative by artist **Ingrid Schreyers**, who installed the first mosaic independently. This artistic impulse quickly captured the imagination of Schaerbeek residents, becoming a recurring request from neighbours wishing to beautify the public space and give character to their streets.

### How the Inventory Was Built

The inventory was born from an exemplary synergy between civic engagement and public service:

- **Patrick Bastin** systematically documented the mosaics during his walks through the municipality, building a photographic archive of each work.
- **Richard Robinson** of the Roads Technical Department collaborated to make the official cataloguing of these works within the municipality a reality.
- By cross-referencing Bastin's photographic archives with data from projects carried out by the Roads Technical Department, a precise and comprehensive inventory was compiled.

Today, **243 mosaic paving stones** are registered in the catalogue.

---

## 🧭 Contents

### 🗺️ Interactive Map

The bilingual map (FR/NL) displays each inventoried mosaic as an individual point, with full photographic and descriptive documentation.

**Available information per mosaic**

- 📍 Precise geolocation (entrance / facade address)
- 🎨 Description of the motif and artistic style
- 📸 Field photograph of the mosaic
- 🏛️ Street and administrative quartier
- 📅 Installation date (where known)

**Base maps** — Google Terrain (default) · Google Satellite · OpenStreetMap

---

## 🛠️ Technologies

- **HTML / CSS / JavaScript** — 100% client-side application, no server required
- **Leaflet.js** — interactive mapping with marker clustering and popup photo display
- **GitHub Pages** — static hosting

---

## 🌐 Compatibility

Compatible with recent versions of **Firefox**, **Chrome**, and **Edge**.
Available in French and Dutch. Optimised for desktop use; the map is responsive on mobile.

---

## 📁 Repository Structure

```
INF-Paves-Mosaiques-1030_V2/
├── index.html                    # Entry point / landing page
├── indexFR.html                  # Interactive map — French
├── indexNL.html                  # Interactive map — Dutch
├── css/                          # Stylesheets and UI assets
├── js/                           # Leaflet libraries + application logic
├── data/                         # GeoJSON data (JS wrapper format)
│   └── *.js                      # Mosaic inventory dataset
├── images/                       # Field photographs of mosaics
├── markers/                      # Map point icons (PNG)
├── legend/                       # Legend swatches
└── webfonts/                     # FontAwesome subset
```

---

## 📅 Changelog

| Date | Description |
|---|---|
| May 2026 | Dataset updated — 243 mosaics catalogued as of 26/05/2026 |
| April 2026 | V2 published — bilingual version with photo documentation |
| 2025 | V1 initial publication |

---

## 📄 Data Sources

| Dataset | Source | Date |
|---|---|---|
| Mosaic photographic archive | Patrick Bastin — civic documentation | 2024–2026 |
| Roads Technical Department records | Direction de l'Infrastructure — Commune de Schaerbeek | 2024–2026 |

Data results from cross-referencing civic photographic archives with official municipal road works records. Published as static GeoJSON files for client-side rendering.

---

## 📄 Licence

This project is licensed under the **European Union Public Licence v. 1.2 (EUPL-1.2)**.
See the [LICENSE](LICENSE) file for the full text.

[![License: EUPL-1.2](https://img.shields.io/badge/License-EUPL%201.2-blue.svg)](https://eupl.eu/1.2/en/)

> © 2024–2026 Direction des Systèmes d'Information (DSI) · Commune de Schaerbeek · 1030 Brussels · Belgium

---

*Commune de Schaerbeek · Direction des Systèmes d'Information (DSI) · 1030 Brussels · Belgium*
