// Set the Cesium Ion token to `null` to avoid warnings
Cesium.Ion.defaultAccessToken = null;

/* Stamen's website (http://maps.stamen.com) as of 2019-08-28 says that the
 * maps they host may be used free of charge.  For http access, use a url like
 * http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png */
let StamenAttribution = 'Map tiles by <a href="http://stamen.com">Stamen ' +
  'Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">' +
  'CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap' +
  '</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.';

/* Per Carto's website regarding basemap attribution: https://carto.com/help/working-with-data/attribution/#basemaps */
let CartoAttribution = 'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'

// Create ProviderViewModel based on different imagery sources
// - these can be used without Cesium Ion
var imageryViewModels = [];

imageryViewModels.push(new Cesium.ProviderViewModel({
  name: 'Positron',
  tooltip: 'CartoDB Positron basemap',
  iconUrl: 'http://a.basemaps.cartocdn.com/light_all/5/15/12.png',
  creationFunction: function() {
    return new Cesium.UrlTemplateImageryProvider({
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      credit: CartoAttribution,
      minimumLevel: 0,
      maximumLevel: 18
    });
  }
}));

// Initialize the viewer - this works without a token!
const viewer = new Cesium.Viewer('cesiumContainer', {
  		imageryProviderViewModels: imageryViewModels,
  		selectedImageryProviderViewModel: imageryViewModels[0],
  		animation: true,
  		timeline: true,
  		infoBox: false,
  		homeButton: false,
  		fullscreenButton: false,
  		selectionIndicator: true,
  		geocoder: false,
  		creditContainer: document.createElement("none")
		});

// Remove the Terrain section of the baseLayerPicker
viewer.baseLayerPicker.viewModel.terrainProviderViewModels.removeAll();
const scene = viewer.scene;

const tileset = await Cesium.Cesium3DTileset.fromUrl("http://localhost/static/3dtiles/example/tileset.json");

viewer.scene.primitives.add(tileset)
tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(103.858459, 1.3452442559817817, 3.0)
);

viewer.zoomTo(tileset);

tileset.featureIdLabel = 0;

// Create an HTML element that will serve as the
// tooltip that displays the feature information
function createTooltip() {
  const tooltip = document.createElement("div");
  viewer.container.appendChild(tooltip);
  tooltip.style.backgroundColor = "white";
  tooltip.style.position = "absolute";
  tooltip.style.left = "0";
  tooltip.style.top = "0";
  tooltip.style.padding = "14px";
  tooltip.style["pointer-events"] = "none";
  tooltip.style["block-size"] = "fit-content";
  return tooltip;
}
const tooltip = createTooltip();

// Show the given HTML content in the tooltip
// at the given screen position
function showTooltip(screenX, screenY, htmlContent) {
  tooltip.style.display = "block";
  tooltip.style.left = `${screenX}px`;
  tooltip.style.top = `${screenY}px`;
  tooltip.innerHTML = htmlContent;
}

// Create an HTML string that contains information
// about the given feature, under the given title
function createFeatureHtml(title, feature) {
  if (!Cesium.defined(feature)) {
    return `(No ${title})<br>`;
  }
  const propertyKeys = feature.getPropertyIds();
  if (!Cesium.defined(propertyKeys)) {
    return `(No properties for ${title})<br>`;
  }
  let html = `<b>${title}:</b><br>`;
  for (let i = 0; i < propertyKeys.length; i++) {
    const propertyKey = propertyKeys[i];
    const propertyValue = feature.getProperty(propertyKey);
    html += `&nbsp;&nbsp;${propertyKey} : ${propertyValue}<br>`;
  }
  return html;
}

// Given an object that was obtained via Scene#pick: If it is
// a Cesium3DTileFeature, then it is returned.
// Otherwise, 'undefined' is returned.
function obtainFeature(picked) {
  if (!Cesium.defined(picked)) {
    return undefined;
  }
  const isFeature = picked instanceof Cesium.Cesium3DTileFeature;
  if (!isFeature) {
    return undefined;
  }
  return picked;
}

// Install the handler that will perform picking when the
// mouse is moved, and update the label entity when the
// mouse is over a Cesium3DTileFeature
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
  let tooltipText = "";
  const picked = viewer.scene.pick(movement.endPosition);

  const feature = obtainFeature(picked);
  tooltipText += createFeatureHtml("Feature", feature);

  const screenX = movement.endPosition.x;
  const screenY = movement.endPosition.y;
  showTooltip(screenX, screenY, tooltipText);
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

