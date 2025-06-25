from django.urls import path
from . import views

urlpatterns = [
    path('', views.cesium_viewer, name='cesium_viewer'),
    path('gettilesurl', views.tiles_url, name = 'tiles_url'),
    path('updatets', views.update_timeseries_data, name = 'update_timeseries_data'),
    path('updatets2', views.update_timeseries_data2, name = 'update_timeseries_data2'),
]
