# Building a cesiumJS viewer with Django

1. Refer to previous document for understanding the Django app (refer to this doc [{doc}`054containerize`])

2. Go to the django/yun2inf_project folder.

3. Create the csviewer app with this command
    ```
    python manage.py startapp csviewer
    ```
4. In the csviewer app create a folder called templates/csviewer. In the csviewer folder create a html file called viewer.html
    ```
    <!DOCTYPE html>
    <html lang="en">
        <head>
            {% load static %}
            <meta charset="utf-8">
            <script src="https://cesium.com/downloads/cesiumjs/releases/1.107/Build/Cesium/Cesium.js"></script>
            <link href="https://cesium.com/downloads/cesiumjs/releases/1.107/Build/Cesium/Widgets/widgets.css" rel="stylesheet">          
        </head>
        <body>
        	<div id="cesiumContainer"></div>
            	<script type="module" src="/static/cesium_script/csviz.js"></script>
        </body>
    </html>
    ```

5. in the csviewer app create a folder called static. Create two folders 3dtiles and cesium_script folders.  Download the 3dtiles from [here](https://github.com/CesiumGS/3d-tiles-samples/tree/main/1.0/TilesetWithRequestVolume) and place it in the 3dtiles folder.

6. In the cesium_script folders create a javascript file called csviz.js
    ```
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

    ``` 
    
7. Go to views.py file and put in these codes.
    ```
    from django.http import HttpResponse
    from django.template import loader

    def cesium_viewer(request):
        template = loader.get_template('csviewer/viewer.html')
        return HttpResponse(template.render())
    ```

8. Go to the urls.py fildes and put in these codes.
    ```
    from django.urls import path
    from . import views

    urlpatterns = [
        path('', views.cesium_viewer, name='cesium_viewer'),
    ]

    ```
9. Go to yun2inf_project/urls.py and input these codes.
    ```
    from django.urls import include, path

    urlpatterns = [
        path('', include('yun2inf_book.urls')),
        path('csviewer/', include('csviewer.urls')),
    ]

    ```
    
10. Go to yun2inf_project/settings.py and add the csviewer app.
    ```
    INSTALLED_APPS = [
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
        "yun2inf_book",
        "csviewer"
    ]
    ```
11. Then run this command.
    ```
    python manage.py migrate
    ```

12. refer to {doc}`054containerize` containerize section to build a new container image of the django app.

## Resources 
- Cesium js without ion token
    - https://gist.github.com/banesullivan/e3cc15a3e2e865d5ab8bae6719733752
    - https://stackoverflow.com/questions/76015471/how-can-i-prevent-the-cesium-ion-logo-from-showing-up

- Configure cesiumjs search bar
    - https://stackoverflow.com/questions/44372068/find-object-through-search-box-with-cesium-js

- CesiumJS offline
    - https://github.com/CesiumGS/cesium/tree/main/Documentation/OfflineGuide
    - https://cesium.com/learn/3d-tiling/on-prem/hosting-3d-content/a2zQ

- 3dtiles sample
    - https://github.com/CesiumGS/3d-tiles-samples