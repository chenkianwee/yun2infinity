// Set the Cesium Ion token to `null` to avoid warnings
Cesium.Ion.defaultAccessToken = null;
// ======================================================================
// #region : Load the background map
// ======================================================================
// If base picker is used uncomment this
// ======================================================================
// Create ProviderViewModel based on different imagery sources
// - these can be used without Cesium Ion
// Per Carto's website regarding basemap attribution: https://carto.com/help/working-with-data/attribution/#basemaps
// https://github.com/CartoDB/basemap-styles
// let CartoAttribution = 'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'
// var imageryViewModels = [];
// imageryViewModels.push(new Cesium.ProviderViewModel({
//   name: 'Positron',
//   tooltip: 'CartoDB Positron basemap',
//   iconUrl: 'http://a.basemaps.cartocdn.com/light_all/5/15/12.png',
//   creationFunction: function () {
//     return new Cesium.UrlTemplateImageryProvider({
//       url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
//       credit: CartoAttribution,
//       minimumLevel: 0,
//       maximumLevel: 18
//     });
//   }
// }));
// ======================================================================
// If WMTS is used 
// ======================================================================
// https://sandcastle.cesium.com/?src=Imagery%20Layers%20Manipulation.html for examples
// const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
//   new Cesium.WebMapTileServiceImageryProvider({
//     url:
//       "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/WMTS",
//     layer: "USGSImageryOnly",
//     style: "default",
//     format: "image/jpeg",
//     tileMatrixSetID: "default028mm",
//     maximumLevel: 8,
//     credit: "U. S. Geological Survey",
//   })
// );

// const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
//   new Cesium.UrlTemplateImageryProvider({
//     url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
//     credit: 'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.',
//     minimumLevel: 0,
//     maximumLevel: 18
//   }));

// const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
//   new Cesium.UrlTemplateImageryProvider({
//     url: 'https://tile.openstreetmap.org/${z}/${x}/${y}.png	',
//     minimumLevel: 0,
//     maximumLevel: 19
//   }));

// Using the local low resolution basemap from cesiumJS 
const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.TileMapServiceImageryProvider.fromUrl(Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")));

// #endregion
// ======================================================================
// #region : Initialize the viewer - this works without a token!
// ======================================================================
const timeZoneLong = "Asia/Singapore";
const DateTime = luxon.DateTime;
let dateTime = DateTime.now();
// If you want to set a specific timezone
//dateTime = dateTime.setZone("local");
dateTime = dateTime.setZone(timeZoneLong);
var timeZone = dateTime.toISO();
timeZone = timeZone.substr(timeZone.length - 6);
//6pm of the day 
let day6am = DateTime.fromISO(dateTime.toISODate() + "T06:00:00" + timeZone);
day6am = day6am.setZone(timeZoneLong);
// is it bef or after 6pm now
let date1;
let date2;
var dur = luxon.Duration.fromObject({"days": 1});
if (dateTime < day6am) {
  date1 = day6am.minus(dur);
} else {
  date1 = day6am
}
var dur2 = luxon.Duration.fromObject({"minutes": 5});
// date2 = date1.plus(dur);
date2 = dateTime.plus(dur2);

const clock = new Cesium.Clock({
  startTime: Cesium.JulianDate.fromIso8601(date1.toISO()),
  stopTime: Cesium.JulianDate.fromIso8601(date2.toISO()),
  currentTime: Cesium.JulianDate.fromIso8601(dateTime.toISO()),
  clockRange: Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
  clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
  multiplier: 1, // how much time to advance each tick
  shouldAnimate: true, // Animation on by default
});

const viewer = new Cesium.Viewer('cesiumContainer', {
  clockViewModel: new Cesium.ClockViewModel(clock),
  // imageryProviderViewModels: imageryViewModels,
  // selectedImageryProviderViewModel: imageryViewModels[0],
  automaticallyTrackDataSourceClocks: false,
  animation: true,
  timeline: true,
  infoBox: true,
  homeButton: false,
  fullscreenButton: false,
  selectionIndicator: false,
  geocoder: false,
  creditContainer: document.createElement("none"),
  shouldAnimate: true,
  scene3DOnly: true,
  baseLayerPicker: false,
  baseLayer: imageryLayer
});

// Adjust the clock and timeline to timezone of interest
viewer.animation.viewModel.dateFormatter = function (date, viewModel) {
  const isoString = Cesium.JulianDate.toIso8601(date);
  let dateTime = DateTime.fromISO(isoString);
  //dateTime = dateTime.setZone("local");
  // If you want to set a specific timezone
  dateTime = dateTime.setZone(timeZoneLong);
  return dateTime.toLocaleString(DateTime.DATE_MED);
};

viewer.animation.viewModel.timeFormatter = function (date, viewModel) {
  const isoString = Cesium.JulianDate.toIso8601(date);
  let dateTime = DateTime.fromISO(isoString);
  //dateTime = dateTime.setZone("local");
  // If you want to set a specific timezone
  dateTime = dateTime.setZone(timeZoneLong);
  return dateTime.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET);
};

viewer.timeline.makeLabel = function (date) {
  const isoString = Cesium.JulianDate.toIso8601(date);
  let dateTime = DateTime.fromISO(isoString);
  //dateTime = dateTime.setZone("local");
  // If you want to set a specific timezone
  dateTime = dateTime.setZone(timeZoneLong);
  return dateTime.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET);
};

// Remove the Terrain section of the baseLayerPicker
// viewer.baseLayerPicker.viewModel.terrainProviderViewModels.removeAll();
const scene = viewer.scene;
// define the directional light
const directionalLight = new Cesium.DirectionalLight({ direction: new Cesium.Cartesian3(0.2454278300540191, 0.8842635425193919, 0.39729481195458805) });
scene.light = directionalLight;

// #endregion
// ======================================================================
// #region : Configure drop-down menu
// ======================================================================
const exampleTypes = ["dataset1", "dataset2"];
const views = ["view1", "view2"];
const viewModel = {
  exampleTypes: exampleTypes,
  currentExampleType: exampleTypes[0],
  views: views,
  currentView: views[0],
  clippingPlanesEnabled: true,
  parameterX: 1.0,
  getCamera: getCamera,
};
const toolbar = document.getElementById("toolbar");
Cesium.knockout.track(viewModel);
Cesium.knockout.applyBindings(viewModel, toolbar);
// For tracking state when switching exampleTypes
let clippingPlanesEnabled = true;
// #endregion
// ======================================================================
// #region : configure the interactivity of the plane
// ======================================================================
let targetY = -0.0;
let planeEntities = [];
let selectedPlane;
let clippingPlanes;

// Select plane when mouse down
const downHandler = new Cesium.ScreenSpaceEventHandler(
  viewer.scene.canvas
);
downHandler.setInputAction(function (movement) {
  const pickedObject = scene.pick(movement.position);
  if (
    Cesium.defined(pickedObject) &&
    Cesium.defined(pickedObject.id) &&
    Cesium.defined(pickedObject.id.plane)
  ) {
    selectedPlane = pickedObject.id.plane;
    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.8);
    selectedPlane.outlineColor = Cesium.Color.RED;
    scene.screenSpaceCameraController.enableInputs = false;
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

// Release plane on mouse up
const upHandler = new Cesium.ScreenSpaceEventHandler(
  viewer.scene.canvas
);
upHandler.setInputAction(function () {
  if (Cesium.defined(selectedPlane)) {
    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.3);
    selectedPlane.outlineColor = Cesium.Color.RED;
    selectedPlane = undefined;
  }

  scene.screenSpaceCameraController.enableInputs = true;
}, Cesium.ScreenSpaceEventType.LEFT_UP);

// Update plane on mouse move
const moveHandler = new Cesium.ScreenSpaceEventHandler(
  viewer.scene.canvas
);
moveHandler.setInputAction(function (movement) {
  if (Cesium.defined(selectedPlane)) {
    const deltaY = movement.startPosition.x - movement.endPosition.x;
    targetY += deltaY * 0.01;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

function createPlaneUpdateFunction(plane) {
  return function () {
    plane.distance = targetY;
    return plane;
  };
}
// #endregion
// ======================================================================
// #region : create the clipping plane and load the 3dtiles
// ======================================================================
clippingPlanes = new Cesium.ClippingPlaneCollection({
  planes: [
    new Cesium.ClippingPlane(
      new Cesium.Cartesian3(1.0, 0.0, 0.0),
      targetY
    ),
  ],
  edgeWidth: 10.0,
  edgeColor: Cesium.Color.RED
});
const tileset = await Cesium.Cesium3DTileset.fromUrl("http://localhost/static/3dtiles/arch_eg/tileset.json", { clippingPlanes: clippingPlanes });
// const tileset = await Cesium.Cesium3DTileset.fromUrl("http://localhost/static/3dtiles/example/tileset.json", { clippingPlanes: clippingPlanes });
viewer.scene.primitives.add(tileset)

// tileset.debugShowBoundingVolume = true;
const boundingSphere = tileset.boundingSphere;
const radius = boundingSphere.radius;
viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(45.0), Cesium.Math.toRadians(-30.0), radius * 6.0));

// camera.flyTo(
//   { destination: new Cesium.Cartesian3(-1537208.9568848056, 6243950.736813731, 149050.24326118626),
//     orientation: { heading: 6.232497274754154, pitch: -1.5706967139588732, roll: 0.0},
//     complete: function () {
//         setTimeout(function () {
//           camera.flyTo(
//             { destination: new Cesium.Cartesian3(-1527508.7312540275, 6191011.437993621, 148471.09369672707),
//               orientation: { heading: 5.7742604719375175, pitch: -0.803883441771009, roll: 6.26132135788863},
//               complete: function() {
//                 camera.flyTo(
//                   { destination: new Cesium.Cartesian3(-1527253.2222008316, 6190807.613055745, 148715.51603420844),
//                     orientation: { heading: 1.8564735434534176, pitch: -0.6865544445580372, roll:  8.239294704281974e-7},
//                   });
//                   clippingPlanes.enabled = true
//               }
//             });
//             }, 1000)
//         },
//     duration: 5
//     });

// #endregion
//=============================================================
// #region : viz the cutting plane
//=============================================================
const bcenter = boundingSphere.center;
const bsphereCarto = Cesium.Cartographic.fromCartesian(bcenter);

// The clipping plane is initially positioned at the tileset's root transform.
// Apply an additional matrix to center the clipping plane on the bounding sphere center.
const transformCenter = Cesium.Matrix4.getTranslation(tileset.root.transform, new Cesium.Cartesian3());
const transformCartographic = Cesium.Cartographic.fromCartesian(transformCenter);

const bsphereCartoX = new Cesium.Cartographic(bsphereCarto.longitude, transformCartographic.latitude, transformCartographic.height);
const ellipsoidGeodesic = new Cesium.EllipsoidGeodesic(bsphereCartoX, transformCartographic);
var distanceX = ellipsoidGeodesic.surfaceDistance;
const directionX = bsphereCarto.longitude - transformCartographic.longitude
if (directionX < 0) { distanceX = distanceX * -1 };

const bsphereCartoY = new Cesium.Cartographic(transformCartographic.longitude, bsphereCarto.latitude, transformCartographic.height);
ellipsoidGeodesic.setEndPoints(transformCartographic, bsphereCartoY);
var distanceY = ellipsoidGeodesic.surfaceDistance;
const directionY = bsphereCarto.latitude - transformCartographic.latitude
if (directionY < 0) { distanceY = distanceY * -1 };

const distanceZ = bsphereCarto.height - transformCartographic.height

clippingPlanes.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(distanceX, distanceY, distanceZ));

for (let i = 0; i < clippingPlanes.length; ++i) {
  const plane = clippingPlanes.get(i);
  const planeEntity = viewer.entities.add({
    position: bcenter,
    plane: {
      dimensions: new Cesium.Cartesian2(radius * 1.2, radius * 1.2),
      material: Cesium.Color.WHITE.withAlpha(0.3),
      plane: new Cesium.CallbackProperty(
        createPlaneUpdateFunction(plane),
        false
      ),
      outline: true,
      outlineColor: Cesium.Color.RED,
    },
  });
  planeEntities.push(planeEntity);
}
// #endregion
// ====================================================================
// #region : Stream a czml in near real-time
// ====================================================================

// Create new CZML datasource
var czmlStream = new Cesium.CzmlDataSource();
// Put the datasource into Cesium
const datasourceURL1 = "updatets";
const datasourceURL2 = "updatets2";
viewer.dataSources.add(czmlStream);
async function update(czmlStream, url) {
  const URL = url;
  const Res = fetch(URL);
  const response = await Res;
  const json = await response.json();
  const czml = json['czml'];
  czmlStream.process(json["czml"]);
  console.log('updated!!');

  const DateTime = luxon.DateTime;
  let dateTime = DateTime.now();
  var newStopTime = dateTime.plus({"minutes": 5});
  viewer.clock.stopTime = Cesium.JulianDate.fromIso8601(newStopTime.toISO());

  // If you want to set a specific timezone
  dateTime = dateTime.setZone("local");
  console.log(dateTime.toISO());
}

update(czmlStream, datasourceURL1);


const upInterval = 5 * 60 * 1000
var intervalId;
var toId;

function setIntervalUpdate(upInterval, dataSourceURL) {
  var date = new Date();
  const remain = ((60-(date.getSeconds())) + ((4 - (date.getMinutes()%5)) * 60) + 10) * 1000;
  toId = setTimeout(function() {
    update(czmlStream, dataSourceURL);
    intervalId = setInterval(function () { update(czmlStream, dataSourceURL); }, upInterval);
  }, remain);
}

setIntervalUpdate(upInterval, datasourceURL1);

// update(czmlStream, datasourceURL1);
// var intervalId = setInterval(function () { update(czmlStream, datasourceURL1); }, upInterval);
// =============================================================
// #load a static czml
// =============================================================
// Create new CZML datasource
// var czmlStreamUrl = 'http://localhost/static/czml/bms.czml';
// var dataSource = Cesium.CzmlDataSource.load(czmlStreamUrl);
// viewer.dataSources.add(dataSource);
// #endregion
// ======================================================================
// #region : Configure the interactive selection
// ======================================================================
// Create the HTML that will be put into the info box that shows
// information about the currently selected feature
function createPickedFeatureDescription(pickedFeature) {
  if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
    const description =
    `${'<table><tbody>' +
    "<tr><th>building_component</th><td>"}${pickedFeature.getProperty("building_component")}</td></tr>` +
    `<tr><th>propertyx</th><td>This is property x</td></tr>` +
    `</tbody></table>`;
    return description;
  } else if (Cesium.defined(pickedFeature.id.label)) {
    const description =
    `${pickedFeature.primitive.id.description.getValue()}`;
    return description;
  };
}
// Information about the currently selected feature
const selected = { feature: undefined, originalColor: new Cesium.Color() };
// An entity object which will hold info about the currently selected feature for infobox display
const selectedEntity = new Cesium.Entity();
// Get default left click handler for when a feature is not picked on left click
const clickHandler = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
// Information about the currently highlighted feature
const highlighted = {
  feature: undefined,
  originalColor: new Cesium.Color(),
};
// Color a feature yellow on hover.
viewer.screenSpaceEventHandler.setInputAction(function onMouseMove(movement) {
  // If a feature was previously highlighted, undo the highlight
  if (Cesium.defined(highlighted.feature)) {
    if (highlighted.feature instanceof Cesium.Cesium3DTileFeature) {
      highlighted.feature.color = highlighted.originalColor;
    } else if (Cesium.defined(highlighted.feature.id.label)) {
      highlighted.feature.id.label.backgroundColor = highlighted.originalColor;
    };
    highlighted.feature = undefined;
  }
  // Pick a new feature
  const pickedFeature = viewer.scene.pick(movement.endPosition);
  if (!Cesium.defined(pickedFeature)) {
    return;
  }
  // Highlight the feature if it's not already selected.
  if (pickedFeature !== selected.feature) {
    highlighted.feature = pickedFeature;
    if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
      Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
      pickedFeature.color = Cesium.Color.YELLOW;
    } else if (Cesium.defined(pickedFeature.id.label)) {
      Cesium.Color.clone(pickedFeature.id.label.backgroundColor.getValue(), highlighted.originalColor);
      pickedFeature.id.label.backgroundColor = Cesium.Color.YELLOW;
    };
  }
},
  Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// Color a feature on selection and show metadata in the InfoBox.
viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
  // If a feature was previously selected, undo the highlight
  if (Cesium.defined(selected.feature)) {
    if (selected.feature instanceof Cesium.Cesium3DTileFeature) {
      selected.feature.color = selected.originalColor;
    } else if (Cesium.defined(selected.feature.id.label)) {
      selected.feature.id.label.backgroundColor = selected.originalColor;
    };
    selected.feature = undefined;
  };
  // Pick a new feature
  const pickedFeature = viewer.scene.pick(movement.position);
  if (!Cesium.defined(pickedFeature)) {
    clickHandler(movement);
    return;
  };
  // Select the feature if it's not already selected
  if (selected.feature === pickedFeature) {
    return;
  };
  selected.feature = pickedFeature;
  // Save the selected feature's original color
  if (pickedFeature === highlighted.feature) {
    Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
    highlighted.feature = undefined;
  } else {
    Cesium.Color.clone(pickedFeature.color, selected.originalColor);
    if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
      Cesium.Color.clone(pickedFeature.color, selected.originalColor);
    } else if (Cesium.defined(pickedFeature.id.label)) {
      Cesium.Color.clone(pickedFeature.id.label.backgroundColor.getValue(), selected.originalColor);
    };
  };
  // Highlight newly selected feature
  if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
    pickedFeature.color = Cesium.Color.YELLOW.withAlpha(0.5);
    // Set feature infobox description
    viewer.selectedEntity = selectedEntity;
    selectedEntity.name = "Information";
    selectedEntity.description = createPickedFeatureDescription(pickedFeature);
  }
  else if (Cesium.defined(pickedFeature.id.label)) {
    pickedFeature.id.label.backgroundColor = Cesium.Color.YELLOW.withAlpha(0.5);
    // Set feature infobox description
    viewer.selectedEntity = selectedEntity;
    selectedEntity.name = "Information";
    selectedEntity.description = createPickedFeatureDescription(pickedFeature);
  };
},
  Cesium.ScreenSpaceEventType.LEFT_CLICK);
// #endregion
// =============================================================
// #region : interactivity of the knockout
// =============================================================
function getCamera() {
  var pos = viewer.scene.camera.position;
  var head = viewer.scene.camera.heading;
  var pitch = viewer.scene.camera.pitch;
  var roll = viewer.scene.camera.roll;
  const prop = "Position:" + pos.toString() + "\nHead:" + head.toString() + "\nPitch: " + pitch.toString()  + "\nRoll: " + roll.toString() + '\nLook at console'
  alert(prop);
  console.log(prop);
}

Cesium.knockout
  .getObservable(viewModel, "clippingPlanesEnabled")
  .subscribe(function (value) {
    clippingPlanes.enabled = value;
    clippingPlanesEnabled = value;
  });

Cesium.knockout
  .getObservable(viewModel, "currentView")
  .subscribe(function (newValue) {
    if (newValue === views[0]) {
      viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(45.0), Cesium.Math.toRadians(-10.0), radius * 5));
    } else if (newValue === views[1]) {
      viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-45.0), Cesium.Math.toRadians(-45.0), radius * 5));
    }
  });

Cesium.knockout
  .getObservable(viewModel, "currentExampleType")
  .subscribe(function (newValue) {
    clearInterval(intervalId);
    viewer.dataSources.removeAll();
    if (newValue === exampleTypes[0]) {
      czmlStream = new Cesium.CzmlDataSource();
      viewer.dataSources.add(czmlStream);
      update(czmlStream, datasourceURL1);
      setIntervalUpdate(upInterval, datasourceURL1);
    } else if (newValue === exampleTypes[1]) {
      czmlStream = new Cesium.CzmlDataSource();
      viewer.dataSources.add(czmlStream);
      update(czmlStream, datasourceURL2);
      setIntervalUpdate(upInterval, datasourceURL2);
    }
  });

  Cesium.knockout
  .getObservable(viewModel, "parameterX")
  .subscribe(function (newValue) {
    var fVal = parseFloat(newValue);
    alert(newValue);
  });
  // #endregion