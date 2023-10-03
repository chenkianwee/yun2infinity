import numpy as np
import geomie3d
import py3dtileslib

#===================================================================================================
# region: PARAMETERS
#===================================================================================================
geo_loc = [103.85809169201723, 1.3450289755465907, 0.0] # this corresponds to local model_loc, lon, lat, alt
model_loc = [0.0, 0.0, 0.0] # corresponding location of the geo-location in the 3d model
sensor_locs = [[8.3645, -2.1267, 5.4],
               [4.99537, -2.43579, 5.4],
               [6.39599, -16.89, 5.4],
               [10.05, -16.33, 5.4]] # sensors location

# endregion: PARAMETERS
#===================================================================================================
# region: MAIN
#===================================================================================================
# project the geoloc to a PCS
geo_loc_xyz = py3dtileslib.utils.gcs2pcs(geo_loc)
for sensor_loc in sensor_locs:
    vec = np.array(sensor_loc) - np.array(model_loc)
    trsl = geomie3d.calculate.translate_matrice(vec[0], vec[1], vec[2])
    sensor_loc_xyz = geomie3d.calculate.trsf_xyzs([geo_loc_xyz], trsl)[0]
    sensor_geo_loc = py3dtileslib.utils.pcs2gcs(sensor_loc_xyz)
    print(sensor_geo_loc)

# endregion: MAIN
