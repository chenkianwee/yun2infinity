import numpy as np
import scipy
import geomie3d
import py3dtileslib
from pygltflib import GLTF2, Buffer, BufferView
#===================================================================================================
# region: PARAMETERS
#===================================================================================================
tileset_path = '/yun2inf/django/yun2inf_project/csviewer/static/3dtiles/arch_eg/'
gltf_respath = '/yun2inf/example/gltf/arch_eg.glb'
geo_loc = [103.78244865132135, 1.4957790803607318, 0.0] # this corresponds to local model_loc
model_loc = [2, 1.5, 0.0] # corresponding location of the geo-location in the 3d model
# endregion: PARAMETERS
#===================================================================================================
# region: MAIN
#===================================================================================================
# region: ADJUST THE MATERIALS OF THE GLTF 
# read the gltf file of interest
gltf = GLTF2().load(gltf_respath)
mats = gltf.materials
for mat in mats:
    mat.pbrMetallicRoughness.metallicFactor = 0.0

# endregion: ADJUST THE MATERIALS OF THE GLTF 
#----------------------------------------------------------------------------------------------------------------------------------
# region: STRUCTURE THE DATA OF THE GLTF 
nodes = gltf.nodes
meshes = gltf.meshes
# add EXT_mesh_features onto the gltf
py3dtileslib.mesh_features.add_extmeshfeatures(gltf)
#---------------------------------------------------------------------------------------------------------------------------------
# add EXT_structural_metadata to the gltf
# define and create the classes in the EXT_structural_metadata
class_name = 'BIM_class'
classes = py3dtileslib.struct_metadata.create_classes(class_name, 'IFC properties of a building')
#---------------------------------------------------------------------------------------------------------------------------------
# define and create the properties
prop_id1 = 'building_component'
str_prop = py3dtileslib.struct_metadata.create_classes_prop('building component', 'this property describe the building component of the geometry', 'STRING')
py3dtileslib.struct_metadata.add_property2classes(classes, prop_id1, str_prop)

featureids = []
bldg_comp_list = []
for node in nodes:
    children = node.children
    name = node.name
    mesh_id = node.mesh
    if mesh_id is not None:
        mesh = meshes[mesh_id]
        bldg_comp_list.append(mesh.name)
        primitives = mesh.primitives
        featureids.append(mesh_id)
        for prim in primitives:
            verts = py3dtileslib.utils.get_pos_frm_primitive(prim, gltf)
            nverts = len(verts)
            fid_list = np.repeat(mesh_id ,nverts)
            py3dtileslib.mesh_features.add_extmeshfeatures_by_vertex(prim, gltf, fid_list)

# change the metadata into buffers
buffer_data = bytearray()
packed_string, offset = py3dtileslib.utils.pack_att_string(bldg_comp_list)
packed_offset = py3dtileslib.utils.pack_att(offset, '<l')

buffer1 = Buffer()
buffer_data.extend(packed_string)
buffer_data.extend(packed_offset)

py3dtileslib.utils.write_buffer(buffer1, buffer_data)
gltf.buffers.append(buffer1)
#---------------------------------------------------------------------------------------------------------------------------------
# create bufferviews for the metadata
buffer_view_meta1 = BufferView()
buffer_view_meta1.buffer = 1
buffer_view_meta1.byteOffset = 0
buffer_view_meta1.byteLength = len(packed_string)
gltf.bufferViews.append(buffer_view_meta1)

buffer_view_meta2 = BufferView()
buffer_view_meta2.buffer = 1
buffer_view_meta2.byteOffset = len(packed_string)
buffer_view_meta2.byteLength = len(packed_offset)
gltf.bufferViews.append(buffer_view_meta2)

#---------------------------------------------------------------------------------------------------------------------------------
# create the property table in the EXT_structural_metadata
prop_table = py3dtileslib.struct_metadata.create_prop_table('building component table', class_name, len(featureids))
py3dtileslib.struct_metadata.add_table_property(prop_table, prop_id1, len(gltf.bufferViews)-2, string_offset = len(gltf.bufferViews)-1)

#---------------------------------------------------------------------------------------------------------------------------------
# add the classes and property table into the ext_structural_metadata extension 
py3dtileslib.struct_metadata.add_extstructmetadata(gltf, 'building_schema', classes, [prop_table])
for mesh in gltf.meshes:
    for prim in mesh.primitives:
        if 'EXT_mesh_features' in prim.extensions.keys():
            sel_featureid = prim.extensions['EXT_mesh_features']['featureIds'][0]
            py3dtileslib.struct_metadata.add_prop_table2featureid(0, sel_featureid)
# endregion: STRUCTURE THE DATA OF THE GLTF
#----------------------------------------------------------------------------------------------------------------------------------
# region: CREATE A SIMPLE TILESET
# gltf points are y-up so transform it to z-up with this matrix
mat = np.array([[1, 0, 0, 0],
                [0, 0, -1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1]])

pos_list = py3dtileslib.utils.get_pos_frm_gltf(gltf)
pos_list = geomie3d.calculate.trsf_xyzs(pos_list, mat)
bbox = geomie3d.calculate.bbox_frm_xyzs(pos_list)
midpt_xyz = geomie3d.calculate.bbox_centre(bbox)

# v1 = geomie3d.create.vertex(midpt_xyz)
# vs = geomie3d.create.vertex_list(pos_list)
# geomie3d.viz.viz([{'topo_list':vs, 'colour': 'blue'},
#                   {'topo_list':[v1], 'colour': 'red'}])

xdim = bbox.maxx - bbox.minx
ydim = bbox.maxy - bbox.miny
zdim = bbox.maxz - bbox.minz
bbox = py3dtileslib.utils.define_bbox(midpt_xyz, xdim, ydim, zdim)

tileset = py3dtileslib.Tileset(tileset_path, 1.1)
root_node = py3dtileslib.Node('root')

# if model_loc is not [0,0,0] we have to transfer the model_loc to the model origin
trsl_mat = geomie3d.calculate.translate_matrice(0-model_loc[0], 0-model_loc[1], 0-model_loc[2])
trsf_mat = py3dtileslib.utils.compute_trsfmat4enu_frm_gcs_coord(geo_loc)
trsf_mat = trsf_mat@trsl_mat
trsf_mat = trsf_mat.T.flatten().tolist()
root_node.add_transform(trsf_mat)

root_node.add_box(bbox)
root_node.add_error(0.0)
root_node.edit_refine('REPLACE')
root_node.add_tile_content(gltf)

tileset.add_root(root_node)
tileset.add_error(20.0)
tileset.to_tileset()

# endregion: CREATE A SIMPLE TILESET
# endregion: MAIN
#===================================================================================================
