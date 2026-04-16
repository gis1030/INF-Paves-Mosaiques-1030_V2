var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;
    var geomType = e.target.feature.geometry.type;
    if (geomType === 'Point' || geomType === 'MultiPoint') {
        return;
    }
    if (geomType === 'LineString' || geomType === 'MultiLineString') {
        highlightLayer.setStyle({
            color: 'rgba(255, 255, 0, 1.00)',
        });
    } else {
        highlightLayer.setStyle({
            fillColor: 'rgba(255, 255, 0, 1.00)',
            fillOpacity: 1
        });
    }
    highlightLayer.openPopup();
}
var map = L.map('map', {
    zoomControl: false, maxZoom: 28, minZoom: 1
}).setView([50.8619, 4.3882], 14);

var hash = new L.Hash(map);
map.attributionControl.setPrefix('©GeoData1030: <a href="mailto:geodata.gis1030@gmail.com">geodata.gis1030@gmail.com</a> <a href="https://www.1030.be/" target="_blank" >Commune de Schaerbeek</a> &middot;  <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot');
var autolinker = new Autolinker({ truncate: { length: 30, location: 'smart' } });

// remove popup's row if "visible-with-data"
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}
// modify popup if contains media
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var imgTd = tempDiv.querySelector('td img');
    if (imgTd) {
        var src = imgTd.getAttribute('src');
        if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
            popup._contentNode.classList.add('media');
            setTimeout(function () {
                popup.update();
            }, 10);
        } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = src;
            imgTd.parentNode.replaceChild(audio, imgTd);
            popup._contentNode.classList.add('media');
            setTimeout(function () {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
            var video = document.createElement('video');
            video.controls = true;
            video.src = src;
            video.style.width = "400px";
            video.style.height = "300px";
            video.style.maxHeight = "60vh";
            video.style.maxWidth = "60vw";
            imgTd.parentNode.replaceChild(video, imgTd);
            popup._contentNode.classList.add('media');
            // Aggiorna il popup quando il video carica i metadati
            video.addEventListener('loadedmetadata', function () {
                popup.update();
            });
            setTimeout(function () {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else {
            popup._contentNode.classList.remove('media');
        }
    } else {
        popup._contentNode.classList.remove('media');
    }
}
var title = new L.Control({ 'position': 'topleft' });
title.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
title.update = function () {
    this._div.innerHTML = '<h2>Pavés Mosaïques de Schaerbeek</h2>';
};
title.addTo(map);

var zoomControl = L.control.zoom({
    position: 'topleft'
}).addTo(map);
var bounds_group = new L.featureGroup([]);
function setBounds() {
}

map.createPane('pane_OpenStreetMap_0');
map.getPane('pane_OpenStreetMap_0').style.zIndex = 400;
var layer_OpenStreetMap_0 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMap_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_OpenStreetMap_0;

map.createPane('pane_GoogleSatellite_0');
map.getPane('pane_GoogleSatellite_0').style.zIndex = 400;
var layer_GoogleSatellite_0 = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
    pane: 'pane_GoogleSatellite_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 23,
    minNativeZoom: 0,
    maxNativeZoom: 18
});
layer_GoogleSatellite_0;

map.createPane('pane_GoogleTerrain_0');
map.getPane('pane_GoogleTerrain_0').style.zIndex = 400;
var layer_GoogleTerrain_0 = L.tileLayer('https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', {
    pane: 'pane_GoogleTerrain_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 18
});
layer_GoogleTerrain_0;

map.addLayer(layer_GoogleTerrain_0);


function pop_QuartiersdeSchaerbeek_1(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td class="visible-with-data" id="SectorName" colspan="2"><strong>SectorName</strong><br />' + (feature.properties['SectorName'] !== null ? autolinker.link(String(feature.properties['SectorName']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_QuartiersdeSchaerbeek_1_0() {
    return {
        pane: 'pane_QuartiersdeSchaerbeek_1',
        opacity: 1,
        color: 'rgba(88,151,202,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 4.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(88,151,202,1.0)',
        interactive: true,
    }
}
map.createPane('pane_QuartiersdeSchaerbeek_1');
map.getPane('pane_QuartiersdeSchaerbeek_1').style.zIndex = 401;
map.getPane('pane_QuartiersdeSchaerbeek_1').style['mix-blend-mode'] = 'normal';
var layer_QuartiersdeSchaerbeek_1 = new L.geoJson(json_QuartiersdeSchaerbeek_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_QuartiersdeSchaerbeek_1',
    layerName: 'layer_QuartiersdeSchaerbeek_1',
    pane: 'pane_QuartiersdeSchaerbeek_1',
    onEachFeature: pop_QuartiersdeSchaerbeek_1,
    style: style_QuartiersdeSchaerbeek_1_0,
});
bounds_group.addLayer(layer_QuartiersdeSchaerbeek_1);
map.addLayer(layer_QuartiersdeSchaerbeek_1);
function pop_PrimtredeSchaerbeek_2(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td class="visible-with-data" id="SectorName" colspan="2"><strong>SectorName</strong><br />' + (feature.properties['SectorName'] !== null ? autolinker.link(String(feature.properties['SectorName']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_PrimtredeSchaerbeek_2_0() {
    return {
        pane: 'pane_PrimtredeSchaerbeek_2',
        opacity: 1,
        color: 'rgba(100,100,100,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 2.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(100,100,100,1.0)',
        interactive: true,
    }
}
map.createPane('pane_PrimtredeSchaerbeek_2');
map.getPane('pane_PrimtredeSchaerbeek_2').style.zIndex = 402;
map.getPane('pane_PrimtredeSchaerbeek_2').style['mix-blend-mode'] = 'normal';
var layer_PrimtredeSchaerbeek_2 = new L.geoJson(json_PrimtredeSchaerbeek_2, {
    attribution: '',
    interactive: true,
    dataVar: 'json_PrimtredeSchaerbeek_2',
    layerName: 'layer_PrimtredeSchaerbeek_2',
    pane: 'pane_PrimtredeSchaerbeek_2',
    onEachFeature: pop_PrimtredeSchaerbeek_2,
    style: style_PrimtredeSchaerbeek_2_0,
});
bounds_group.addLayer(layer_PrimtredeSchaerbeek_2);
map.addLayer(layer_PrimtredeSchaerbeek_2);
function pop_CimentaireSchaerbeek_3(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_CimentaireSchaerbeek_3_0() {
    return {
        pane: 'pane_CimentaireSchaerbeek_3',
        interactive: true,
    }
}
map.createPane('pane_CimentaireSchaerbeek_3');
map.getPane('pane_CimentaireSchaerbeek_3').style.zIndex = 403;
map.getPane('pane_CimentaireSchaerbeek_3').style['mix-blend-mode'] = 'normal';
var layer_CimentaireSchaerbeek_3 = new L.geoJson(json_CimentaireSchaerbeek_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_CimentaireSchaerbeek_3',
    layerName: 'layer_CimentaireSchaerbeek_3',
    pane: 'pane_CimentaireSchaerbeek_3',
    onEachFeature: pop_CimentaireSchaerbeek_3,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Cimentaire Schaerbeek.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_CimentaireSchaerbeek_3);
map.addLayer(layer_CimentaireSchaerbeek_3);
function pop_TerdeltFleur_4(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Date de Placement</th>\
                <td class="visible-with-data" id="Date de Placement">' + (feature.properties['Date de Placement'] !== null ? autolinker.link(String(feature.properties['Date de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_TerdeltFleur_4_0() {
    return {
        pane: 'pane_TerdeltFleur_4',
        interactive: true,
    }
}
map.createPane('pane_TerdeltFleur_4');
map.getPane('pane_TerdeltFleur_4').style.zIndex = 404;
map.getPane('pane_TerdeltFleur_4').style['mix-blend-mode'] = 'normal';
var layer_TerdeltFleur_4 = new L.geoJson(json_TerdeltFleur_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_TerdeltFleur_4',
    layerName: 'layer_TerdeltFleur_4',
    pane: 'pane_TerdeltFleur_4',
    onEachFeature: pop_TerdeltFleur_4,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Terdelt-Fleur.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_TerdeltFleur_4);
map.addLayer(layer_TerdeltFleur_4);
function pop_Reyers_5(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Date de Placement</th>\
                <td class="visible-with-data" id="Date de Placement">' + (feature.properties['Date de Placement'] !== null ? autolinker.link(String(feature.properties['Date de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Reyers_5_0() {
    return {
        pane: 'pane_Reyers_5',
        interactive: true,
    }
}
map.createPane('pane_Reyers_5');
map.getPane('pane_Reyers_5').style.zIndex = 405;
map.getPane('pane_Reyers_5').style['mix-blend-mode'] = 'normal';
var layer_Reyers_5 = new L.geoJson(json_Reyers_5, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Reyers_5',
    layerName: 'layer_Reyers_5',
    pane: 'pane_Reyers_5',
    onEachFeature: pop_Reyers_5,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Reyers.png', iconSize: [24, 30], iconAnchor: [16, 16] }) });
    },
});
bounds_group.addLayer(layer_Reyers_5);
map.addLayer(layer_Reyers_5);
function pop_Plasky_6(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Plasky_6_0() {
    return {
        pane: 'pane_Plasky_6',
        interactive: true,
    }
}
map.createPane('pane_Plasky_6');
map.getPane('pane_Plasky_6').style.zIndex = 406;
map.getPane('pane_Plasky_6').style['mix-blend-mode'] = 'normal';
var layer_Plasky_6 = new L.geoJson(json_Plasky_6, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Plasky_6',
    layerName: 'layer_Plasky_6',
    pane: 'pane_Plasky_6',
    onEachFeature: pop_Plasky_6,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Plasky.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Plasky_6);
map.addLayer(layer_Plasky_6);
function pop_ParcJosaphat_7(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Date de Placement</th>\
                <td class="visible-with-data" id="Date de Placement">' + (feature.properties['Date de Placement'] !== null ? autolinker.link(String(feature.properties['Date de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_ParcJosaphat_7_0() {
    return {
        pane: 'pane_ParcJosaphat_7',
        interactive: true,
    }
}
map.createPane('pane_ParcJosaphat_7');
map.getPane('pane_ParcJosaphat_7').style.zIndex = 407;
map.getPane('pane_ParcJosaphat_7').style['mix-blend-mode'] = 'normal';
var layer_ParcJosaphat_7 = new L.geoJson(json_ParcJosaphat_7, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ParcJosaphat_7',
    layerName: 'layer_ParcJosaphat_7',
    pane: 'pane_ParcJosaphat_7',
    onEachFeature: pop_ParcJosaphat_7,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Parc Josaphat.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_ParcJosaphat_7);
map.addLayer(layer_ParcJosaphat_7);
function pop_PalaisReine_8(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_PalaisReine_8_0() {
    return {
        pane: 'pane_PalaisReine_8',
        interactive: true,
    }
}
map.createPane('pane_PalaisReine_8');
map.getPane('pane_PalaisReine_8').style.zIndex = 408;
map.getPane('pane_PalaisReine_8').style['mix-blend-mode'] = 'normal';
var layer_PalaisReine_8 = new L.geoJson(json_PalaisReine_8, {
    attribution: '',
    interactive: true,
    dataVar: 'json_PalaisReine_8',
    layerName: 'layer_PalaisReine_8',
    pane: 'pane_PalaisReine_8',
    onEachFeature: pop_PalaisReine_8,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Palais-Reine.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_PalaisReine_8);
map.addLayer(layer_PalaisReine_8);
function pop_Nord_9(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Date de Placement</th>\
                <td class="visible-with-data" id="Date de Placement">' + (feature.properties['Date de Placement'] !== null ? autolinker.link(String(feature.properties['Date de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Statut du Pavé</th>\
                <td class="visible-with-data" id="Statut du Pavé">' + (feature.properties['Statut du Pavé'] !== null ? autolinker.link(String(feature.properties['Statut du Pavé']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Commentaires</th>\
                <td class="visible-with-data" id="Commentaires">' + (feature.properties['Commentaires'] !== null ? autolinker.link(String(feature.properties['Commentaires']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Nombre de Pavés</th>\
                <td class="visible-with-data" id="Nombre de Pavés">' + (feature.properties['Nombre de Pavés'] !== null ? autolinker.link(String(feature.properties['Nombre de Pavés']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image du Pavé</th>\
                <td class="visible-with-data" id="Image du Pavé">' + (feature.properties['Image du Pavé'] !== null ? autolinker.link(String(feature.properties['Image du Pavé']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Nombre images</th>\
                <td class="visible-with-data" id="Nombre images">' + (feature.properties['Nombre images'] !== null ? autolinker.link(String(feature.properties['Nombre images']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Nord_9_0() {
    return {
        pane: 'pane_Nord_9',
        interactive: true,
    }
}
map.createPane('pane_Nord_9');
map.getPane('pane_Nord_9').style.zIndex = 409;
map.getPane('pane_Nord_9').style['mix-blend-mode'] = 'normal';
var layer_Nord_9 = new L.geoJson(json_Nord_9, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Nord_9',
    layerName: 'layer_Nord_9',
    pane: 'pane_Nord_9',
    onEachFeature: pop_Nord_9,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Nord.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Nord_9);
map.addLayer(layer_Nord_9);
function pop_Linthout_10(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Linthout_10_0() {
    return {
        pane: 'pane_Linthout_10',
        interactive: true,
    }
}
map.createPane('pane_Linthout_10');
map.getPane('pane_Linthout_10').style.zIndex = 410;
map.getPane('pane_Linthout_10').style['mix-blend-mode'] = 'normal';
var layer_Linthout_10 = new L.geoJson(json_Linthout_10, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Linthout_10',
    layerName: 'layer_Linthout_10',
    pane: 'pane_Linthout_10',
    onEachFeature: pop_Linthout_10,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Linthout.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Linthout_10);
map.addLayer(layer_Linthout_10);
function pop_Jardin_11(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Jardin_11_0() {
    return {
        pane: 'pane_Jardin_11',
        interactive: true,
    }
}
map.createPane('pane_Jardin_11');
map.getPane('pane_Jardin_11').style.zIndex = 411;
map.getPane('pane_Jardin_11').style['mix-blend-mode'] = 'normal';
var layer_Jardin_11 = new L.geoJson(json_Jardin_11, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Jardin_11',
    layerName: 'layer_Jardin_11',
    pane: 'pane_Jardin_11',
    onEachFeature: pop_Jardin_11,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Jardin.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Jardin_11);
map.addLayer(layer_Jardin_11);
function pop_HelmetHamoir_12(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_HelmetHamoir_12_0() {
    return {
        pane: 'pane_HelmetHamoir_12',
        interactive: true,
    }
}
map.createPane('pane_HelmetHamoir_12');
map.getPane('pane_HelmetHamoir_12').style.zIndex = 412;
map.getPane('pane_HelmetHamoir_12').style['mix-blend-mode'] = 'normal';
var layer_HelmetHamoir_12 = new L.geoJson(json_HelmetHamoir_12, {
    attribution: '',
    interactive: true,
    dataVar: 'json_HelmetHamoir_12',
    layerName: 'layer_HelmetHamoir_12',
    pane: 'pane_HelmetHamoir_12',
    onEachFeature: pop_HelmetHamoir_12,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Helmet-Hamoir.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_HelmetHamoir_12);
map.addLayer(layer_HelmetHamoir_12);
function pop_CoteauxJosaphat_13(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Date de Placement</th>\
                <td class="visible-with-data" id="Date de Placement">' + (feature.properties['Date de Placement'] !== null ? autolinker.link(String(feature.properties['Date de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Commentaires</th>\
                <td class="visible-with-data" id="Commentaires">' + (feature.properties['Commentaires'] !== null ? autolinker.link(String(feature.properties['Commentaires']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_CoteauxJosaphat_13_0() {
    return {
        pane: 'pane_CoteauxJosaphat_13',
        interactive: true,
    }
}
map.createPane('pane_CoteauxJosaphat_13');
map.getPane('pane_CoteauxJosaphat_13').style.zIndex = 413;
map.getPane('pane_CoteauxJosaphat_13').style['mix-blend-mode'] = 'normal';
var layer_CoteauxJosaphat_13 = new L.geoJson(json_CoteauxJosaphat_13, {
    attribution: '',
    interactive: true,
    dataVar: 'json_CoteauxJosaphat_13',
    layerName: 'layer_CoteauxJosaphat_13',
    pane: 'pane_CoteauxJosaphat_13',
    onEachFeature: pop_CoteauxJosaphat_13,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Coteaux-Josaphat.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_CoteauxJosaphat_13);
map.addLayer(layer_CoteauxJosaphat_13);
function pop_Cerisiers_14(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Cerisiers_14_0() {
    return {
        pane: 'pane_Cerisiers_14',
        interactive: true,
    }
}
map.createPane('pane_Cerisiers_14');
map.getPane('pane_Cerisiers_14').style.zIndex = 414;
map.getPane('pane_Cerisiers_14').style['mix-blend-mode'] = 'normal';
var layer_Cerisiers_14 = new L.geoJson(json_Cerisiers_14, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Cerisiers_14',
    layerName: 'layer_Cerisiers_14',
    pane: 'pane_Cerisiers_14',
    onEachFeature: pop_Cerisiers_14,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Cerisiers.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Cerisiers_14);
map.addLayer(layer_Cerisiers_14);
function pop_Colignon_15(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td class="visible-with-data" id="Année de Placement" colspan="2"><strong>Année de Placement</strong><br />' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td class="visible-with-data" id="Statut du Pavé" colspan="2"><strong>Statut du Pavé</strong><br />' + (feature.properties['Statut du Pavé'] !== null ? autolinker.link(String(feature.properties['Statut du Pavé']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Colignon_15_0() {
    return {
        pane: 'pane_Colignon_15',
        interactive: true,
    }
}
map.createPane('pane_Colignon_15');
map.getPane('pane_Colignon_15').style.zIndex = 415;
map.getPane('pane_Colignon_15').style['mix-blend-mode'] = 'normal';
var layer_Colignon_15 = new L.geoJson(json_Colignon_15, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Colignon_15',
    layerName: 'layer_Colignon_15',
    pane: 'pane_Colignon_15',
    onEachFeature: pop_Colignon_15,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Colignon.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Colignon_15);
map.addLayer(layer_Colignon_15);
function pop_Bienfaiteurs_16(feature, layer) {
    layer.on({
        mouseout: function (e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            var geomType = e.target.feature && e.target.feature.geometry ? e.target.feature.geometry.type : '';
            if (geomType === 'Point' || geomType === 'MultiPoint') { return; }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function (feature) {
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Code ID</th>\
                <td class="visible-with-data" id="CodeID">' + (feature.properties['CodeID'] !== null ? autolinker.link(String(feature.properties['CodeID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Adresses Complete</th>\
                <td class="visible-with-data" id="Adresses Complete">' + (feature.properties['Adresses Complete'] !== null ? autolinker.link(String(feature.properties['Adresses Complete']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Quartier</th>\
                <td class="visible-with-data" id="Quartier">' + (feature.properties['Quartier'] !== null ? autolinker.link(String(feature.properties['Quartier']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Artiste</th>\
                <td class="visible-with-data" id="Artiste">' + (feature.properties['Artiste'] !== null ? autolinker.link(String(feature.properties['Artiste']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Année de Placement</th>\
                <td class="visible-with-data" id="Année de Placement">' + (feature.properties['Année de Placement'] !== null ? autolinker.link(String(feature.properties['Année de Placement']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 01</th>\
                <td class="visible-with-data" id="Image 01">' + (feature.properties['Image 01'] !== null ? '<img src="images/' + String(feature.properties['Image 01']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 02</th>\
                <td class="visible-with-data" id="Image 02">' + (feature.properties['Image 02'] !== null ? '<img src="images/' + String(feature.properties['Image 02']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 03</th>\
                <td class="visible-with-data" id="Image 03">' + (feature.properties['Image 03'] !== null ? '<img src="images/' + String(feature.properties['Image 03']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 04</th>\
                <td class="visible-with-data" id="Image 04">' + (feature.properties['Image 04'] !== null ? '<img src="images/' + String(feature.properties['Image 04']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Image 05</th>\
                <td class="visible-with-data" id="Image 05">' + (feature.properties['Image 05'] !== null ? '<img src="images/' + String(feature.properties['Image 05']).replace(/[\\/:]/g, '_').trim().replace(/'/g, '\'').replace(/"/g, '&quot;') + '">' : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function (e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 500, maxWidth: 380, minWidth: 340 });
}

function style_Bienfaiteurs_16_0() {
    return {
        pane: 'pane_Bienfaiteurs_16',
        interactive: true,
    }
}
map.createPane('pane_Bienfaiteurs_16');
map.getPane('pane_Bienfaiteurs_16').style.zIndex = 416;
map.getPane('pane_Bienfaiteurs_16').style['mix-blend-mode'] = 'normal';
var layer_Bienfaiteurs_16 = new L.geoJson(json_Bienfaiteurs_16, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Bienfaiteurs_16',
    layerName: 'layer_Bienfaiteurs_16',
    pane: 'pane_Bienfaiteurs_16',
    onEachFeature: pop_Bienfaiteurs_16,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.marker(latlng, { icon: L.icon({ iconUrl: 'markers/Bienfaiteurs.png', iconSize: [24, 30], iconAnchor: [12, 15] }) });
    },
});
bounds_group.addLayer(layer_Bienfaiteurs_16);
map.addLayer(layer_Bienfaiteurs_16);
const url = {
    "Nominatim OSM": "https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&",
    "France BAN": "https://api-adresse.data.gouv.fr/search/?"
}
var photonControl = L.control.photon({
    url: url["Nominatim OSM"],
    feedbackLabel: '',
    position: 'topleft',
    includePosition: true,
    initial: true,
    // resultsHandler: myHandler,
}).addTo(map);
photonControl._container.childNodes[0].style.borderRadius = "10px"
// Create a variable to store the geoJSON data
var x = null;
// Create a variable to store the marker
var marker = null;
// Add an event listener to the Photon control to create a marker from the returned geoJSON data
var z = null;
var obj2 = {};
var obj3 = {};
photonControl.on('selected', function (e) {
    console.log(photonControl.search.resultsContainer);
    if (x != null) {
        map.removeLayer(obj3.marker);
        map.removeLayer(x);
    }
    obj2.gcd = e.choice;
    x = L.geoJSON(obj2.gcd).addTo(map);
    var label = typeof obj2.gcd.properties.label === 'undefined' ? obj2.gcd.properties.display_name : obj2.gcd.properties.label;
    obj3.marker = L.marker(x.getLayers()[0].getLatLng()).bindPopup(label).addTo(map);
    map.setView(x.getLayers()[0].getLatLng(), 17);
    z = typeof e.choice.properties.label === 'undefined' ? e.choice.properties.display_name : e.choice.properties.label;
    console.log(e);
    e.target.input.value = z;
});
var search = document.getElementsByClassName("leaflet-photon leaflet-control")[0];
search.classList.add("leaflet-control-search")
search.style.display = "flex";
search.style.backgroundColor = "rgba(255,255,255,0.5)"

// Create the new button element
var button = document.createElement("div");
button.id = "gcd-button-control";
button.className = "gcd-gl-btn fa fa-search search-button";

// Insert the button at the beginning of the search control
search.insertBefore(button, search.firstChild);
var last = search.lastChild;
last.style.display = "none";
button.addEventListener("click", function (e) {
    if (last.style.display === "none") {
        last.style.display = "block";
    } else {
        last.style.display = "none";
    }
});
var overlaysTree = [
    {
        //label: '<b>Paves Mosaiques par Quartiers</b>', selectAllCheckbox: true, children: [
        label: '<b>Paves par Quartiers</b>', children: [
            { label: '<img src="legend/Bienfaiteurs_16.png" /> Bienfaiteurs', layer: layer_Bienfaiteurs_16 },
            { label: '<img src="legend/Colignon_15.png" /> Colignon', layer: layer_Colignon_15 },
            { label: '<img src="legend/Cerisiers_14.png" /> Cerisiers', layer: layer_Cerisiers_14 },
            { label: '<img src="legend/CoteauxJosaphat_13.png" /> Coteaux-Josaphat', layer: layer_CoteauxJosaphat_13 },
            { label: '<img src="legend/HelmetHamoir_12.png" /> Helmet-Hamoir', layer: layer_HelmetHamoir_12 },
            { label: '<img src="legend/Jardin_11.png" /> Jardin', layer: layer_Jardin_11 },
            { label: '<img src="legend/Linthout_10.png" /> Linthout', layer: layer_Linthout_10 },
            { label: '<img src="legend/Nord_9.png" /> Nord', layer: layer_Nord_9 },
            { label: '<img src="legend/PalaisReine_8.png" /> Palais-Reine', layer: layer_PalaisReine_8 },
            { label: '<img src="legend/ParcJosaphat_7.png" /> Parc Josaphat', layer: layer_ParcJosaphat_7 },
            { label: '<img src="legend/Plasky_6.png" /> Plasky', layer: layer_Plasky_6 },
            { label: '<img src="legend/Reyers_5.png" /> Reyers', layer: layer_Reyers_5 },
            { label: '<img src="legend/TerdeltFleur_4.png" /> Terdelt-Fleur', layer: layer_TerdeltFleur_4 },
            { label: '<img src="legend/CimentaireSchaerbeek_3.png" /> Cimentaire Schaerbeek', layer: layer_CimentaireSchaerbeek_3 },]
    },
    {
        //label: '<b>Schaerbeek</b>', selectAllCheckbox: true, children: [
        label: '<b>Schaerbeek</b>', collapsed: true, children: [
            { label: '<img src="legend/PrimtredeSchaerbeek_2.png" /> Périmètre de Schaerbeek', layer: layer_PrimtredeSchaerbeek_2 },
            { label: '<img src="legend/QuartiersdeSchaerbeek_1.png" /> Quartiers de Schaerbeek', layer: layer_QuartiersdeSchaerbeek_1 },]
    },
    { label: "Google Terrain", layer: layer_GoogleTerrain_0, radioGroup: 'bm' },
    { label: "Google Satellite", layer: layer_GoogleSatellite_0, radioGroup: 'bm' },
    { label: "OpenStreet Map", layer: layer_OpenStreetMap_0, radioGroup: 'bm' },]

var lay = L.control.layers.tree(null, overlaysTree, {
    //namedToggle: true,
    //selectorBack: false,
    //closedSymbol: '&#8862; &#x1f5c0;',
    //openedSymbol: '&#8863; &#x1f5c1;',
    //collapseAll: 'Collapse all',
    //expandAll: 'Expand all',
    collapsed: false,
});
lay.addTo(map);
document.addEventListener("DOMContentLoaded", function () {
    // set new Layers List height which considers toggle icon
    function newLayersListHeight() {
        var layerScrollbarElement = document.querySelector('.leaflet-control-layers-scrollbar');
        if (layerScrollbarElement) {
            var layersListElement = document.querySelector('.leaflet-control-layers-list');
            var originalHeight = layersListElement.style.height
                || window.getComputedStyle(layersListElement).height;
            var newHeight = parseFloat(originalHeight) - 50;
            layersListElement.style.height = newHeight + 'px';
        }
    }
    var isLayersListExpanded = true;
    var controlLayersElement = document.querySelector('.leaflet-control-layers');
    var toggleLayerControl = document.querySelector('.leaflet-control-layers-toggle');
    // toggle Collapsed/Expanded and apply new Layers List height
    toggleLayerControl.addEventListener('click', function () {
        if (isLayersListExpanded) {
            controlLayersElement.classList.remove('leaflet-control-layers-expanded');
        } else {
            controlLayersElement.classList.add('leaflet-control-layers-expanded');
        }
        isLayersListExpanded = !isLayersListExpanded;
        newLayersListHeight()
    });
    // apply new Layers List height if toggle layerstree
    if (controlLayersElement) {
        controlLayersElement.addEventListener('click', function (event) {
            var toggleLayerHeaderPointer = event.target.closest('.leaflet-layerstree-header-pointer span');
            if (toggleLayerHeaderPointer) {
                newLayersListHeight();
            }
        });
    }
    // Collapsed/Expanded at Start to apply new height
    setTimeout(function () {
        toggleLayerControl.click();
    }, 10);
    setTimeout(function () {
        toggleLayerControl.click();
    }, 10);
    // Collapsed touch/small screen
    var isSmallScreen = window.innerWidth < 650;
    if (isSmallScreen) {
        setTimeout(function () {
            controlLayersElement.classList.remove('leaflet-control-layers-expanded');
            isLayersListExpanded = !isLayersListExpanded;
        }, 500);
    }
});
setBounds();
resetLabels([layer_CimentaireSchaerbeek_3, layer_TerdeltFleur_4, layer_Reyers_5, layer_Plasky_6, layer_ParcJosaphat_7, layer_PalaisReine_8, layer_Nord_9, layer_Linthout_10, layer_Jardin_11, layer_HelmetHamoir_12, layer_CoteauxJosaphat_13, layer_Cerisiers_14, layer_Colignon_15, layer_Bienfaiteurs_16]);
map.on("zoomend", function () {
    resetLabels([layer_CimentaireSchaerbeek_3, layer_TerdeltFleur_4, layer_Reyers_5, layer_Plasky_6, layer_ParcJosaphat_7, layer_PalaisReine_8, layer_Nord_9, layer_Linthout_10, layer_Jardin_11, layer_HelmetHamoir_12, layer_CoteauxJosaphat_13, layer_Cerisiers_14, layer_Colignon_15, layer_Bienfaiteurs_16]);
});
map.on("layeradd", function () {
    resetLabels([layer_CimentaireSchaerbeek_3, layer_TerdeltFleur_4, layer_Reyers_5, layer_Plasky_6, layer_ParcJosaphat_7, layer_PalaisReine_8, layer_Nord_9, layer_Linthout_10, layer_Jardin_11, layer_HelmetHamoir_12, layer_CoteauxJosaphat_13, layer_Cerisiers_14, layer_Colignon_15, layer_Bienfaiteurs_16]);
});
map.on("layerremove", function () {
    resetLabels([layer_CimentaireSchaerbeek_3, layer_TerdeltFleur_4, layer_Reyers_5, layer_Plasky_6, layer_ParcJosaphat_7, layer_PalaisReine_8, layer_Nord_9, layer_Linthout_10, layer_Jardin_11, layer_HelmetHamoir_12, layer_CoteauxJosaphat_13, layer_Cerisiers_14, layer_Colignon_15, layer_Bienfaiteurs_16]);
});
// ── Watermark: logo 1030 (bottom left) ──
L.Control.Watermark = L.Control.extend({
    onAdd: function (map) {
        var img = L.DomUtil.create('img');
        img.src = 'css/images/schaerbeek1030_logo.png';
        img.style.width = '75px';
        return img;
    },
    onRemove: function (map) { }
});
L.control.watermark = function (opts) { return new L.Control.Watermark(opts); }
L.control.watermark({ position: 'bottomleft' }).addTo(map);

// ── Page NL ──
let MyControlClass = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        var div = L.DomUtil.create('div', 'leaflet-bar my-control');

        var myButton = L.DomUtil.create('button', 'my-button-class', div);
        myButton.innerHTML = 'carte NL';
        L.DomEvent.on(myButton, 'click', function () {
            window.location.href = "indexNL.html";
        }, this);
        return div;
    },

    onRemove: function (map) {
    }
});
let myControl = new MyControlClass().addTo(map);


L.easyButton('fa-envelope', function (btn, map) {
    var url = "mailto:ihilal@1030.be?subject=Feedback: Pavés Mosaïques de Schaerbeek";
    window.location.href = url;
}).setPosition('bottomleft').addTo(map);
