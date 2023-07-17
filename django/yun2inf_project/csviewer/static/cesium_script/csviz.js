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

const tileset = await Cesium.Cesium3DTileset.fromUrl("http://localhost/static/3dtiles/TilesetWithRequestVolume/tileset.json");  

viewer.scene.primitives.add(tileset)
viewer.flyTo(tileset);
