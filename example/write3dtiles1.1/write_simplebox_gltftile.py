import numpy as np
import geomie3d
import py3dtileslib

from pygltflib import GLTF2, Node, Scene, Mesh, Primitive, Buffer, BufferView, Accessor, Material, ELEMENT_ARRAY_BUFFER, ARRAY_BUFFER, UNSIGNED_SHORT, FLOAT, SCALAR, VEC3
#=================================================================================================================================
# region: PARAMETERS
#=================================================================================================================================
tileset_path = '/home/chenkianwee/kianwee_work/get/2023_06_to_2023_12/cesiumjs/3dtiles/example' 
gltf_respath = '/home/chenkianwee/kianwee_work/get/2023_06_to_2023_12/cesiumjs/gltf/test.gltf'
gltf_respath2 = '/home/chenkianwee/kianwee_work/get/2023_06_to_2023_12/cesiumjs/gltf/test2.gltf'
# endregion: Parameters
#=================================================================================================================================
# region: MAIN
#=================================================================================================================================
# region: CREATE A SIMPLE GLTF BOX
box = geomie3d.create.box(10, 10, 10)
box = geomie3d.modify.move_topo(box, (0,0,5), (0,0,0))
edges = geomie3d.get.wires_frm_solid(box)
# geomie3d.viz.viz([{'topo_list':edges, 'colour':'red'}])
face_list = geomie3d.get.faces_frm_solid(box)

pos_list = []
nrml_list = []
idx_list = []
fid_list = []

prev_idx = 0
for cnt,f in enumerate(face_list):
    verts_idxs = geomie3d.modify.triangulate_face(f, indices=True)
    verts = verts_idxs[0]
    # idxs = np.flip(verts_idxs[1], 1)
    idxs = verts_idxs[1]
    idxs = idxs.flatten() + prev_idx
    #get the normals of the points
    nrml = geomie3d.get.face_normal(f)
    nrml = np.reshape(nrml, (1,3))
    nrml = np.repeat(nrml, len(verts), axis=0)
    cnt = np.repeat(cnt, len(verts))
    pos_list.extend(verts)
    idx_list.extend(idxs)
    nrml_list.extend(nrml)
    fid_list.extend(cnt)
    # print(verts)
    # print(idxs)
    prev_idx += len(verts)

pos_list = np.array(pos_list)
nrml_list = np.array(nrml_list)
idx_list = np.array(idx_list)
fid_list = np.array(fid_list)

bbox_pos = geomie3d.calculate.bbox_frm_xyzs(pos_list).bbox_arr.tolist()
bbox_nrml = geomie3d.calculate.bbox_frm_xyzs(nrml_list).bbox_arr.tolist()

pack_pos = py3dtileslib.utils.pack_att(pos_list, '<fff')
pack_nrml = py3dtileslib.utils.pack_att(nrml_list, '<fff')
# ----- make sure the index buffer is in multiple of 4 need to be padded ----- 
is_mltp4 = (len(idx_list)*2)%4
if is_mltp4 != 0:    
    idx_list_4 = idx_list[:]
    idx_list_4.append(0)
    pack_indices = py3dtileslib.utils.pack_att(idx_list_4, '<H')
else:
    pack_indices = py3dtileslib.utils.pack_att(idx_list, '<H')

# ----- append them into a single bytearray -----
data_arr = bytearray()
data_arr.extend(pack_pos)
data_arr.extend(pack_nrml)
data_arr.extend(pack_indices)
data_bytes = bytes(data_arr)

# create a new gltf file
gltf = GLTF2()
gltf.scene = 0

scene = Scene()
scene.nodes = [0]
gltf.scenes.append(scene)

node = Node()
node.mesh = 0
node.matrix = [1,0,0,0,
               0,0,-1,0,
               0,1,0,0,
               0,0,0,1] #column major transformation

gltf.nodes.append(node)

# add data
buffer = Buffer()
py3dtileslib.utils.write_buffer(buffer, data_bytes)
gltf.buffers.append(buffer)

material = Material()
material.pbrMetallicRoughness = {"baseColorFactor" : [ 0.3, 0.3, 0.3, 1.0 ], "metallicFactor" : 0.0, "roughnessFactor" : 1.0}
material.alphaMode = 'OPAQUE'
material.doubleSided = True
gltf.materials.append(material)

mesh = Mesh()
primitive = Primitive()
primitive.indices = 2 #index of the accessor
primitive.attributes.POSITION = 0 #index of the accessor
primitive.attributes.NORMAL = 1 #index of the accessor
primitive.material = 0 # index of the material
mesh.primitives.append(primitive)
gltf.meshes.append(mesh)

#this view is for both the nrml and the pos
bufferView1 = BufferView()
bufferView1.buffer = 0
bufferView1.byteOffset = 0
bufferView1.byteStride = 12
bufferView1.byteLength = len(pack_pos) + len(pack_nrml)
bufferView1.target = ARRAY_BUFFER 
gltf.bufferViews.append(bufferView1)
#this view is for the indices
bufferView2 = BufferView()
bufferView2.buffer = 0
bufferView2.byteOffset = len(pack_pos) + len(pack_nrml)
bufferView2.byteLength = len(pack_indices)
bufferView2.target = ELEMENT_ARRAY_BUFFER 
gltf.bufferViews.append(bufferView2)

# ----- this accessor is for the position -----
accessor1 = Accessor()
accessor1.bufferView = 0
accessor1.byteOffset = 0
accessor1.componentType = FLOAT
accessor1.count = len(pos_list)
accessor1.type = VEC3
accessor1.max = [bbox_pos[3], bbox_pos[4], bbox_pos[5]]
accessor1.min = [bbox_pos[0], bbox_pos[1], bbox_pos[2]]
gltf.accessors.append(accessor1)

#this accessor is for the nrml
accessor2 = Accessor()
accessor2.bufferView = 0
accessor2.byteOffset = len(pack_pos)
accessor2.componentType = FLOAT
accessor2.count = len(nrml_list)
accessor2.type = VEC3
accessor2.max = [bbox_nrml[3], bbox_nrml[4], bbox_nrml[5]]
accessor2.min = [bbox_nrml[0], bbox_nrml[1], bbox_nrml[2]]
gltf.accessors.append(accessor2)
#this accessor is for the indices
accessor3 = Accessor()
accessor3.bufferView = 1
accessor3.byteOffset = 0
accessor3.componentType = UNSIGNED_SHORT
accessor3.count = len(idx_list)
accessor3.type = SCALAR
accessor3.max = [int(max(idx_list))]
accessor3.min = [0]
gltf.accessors.append(accessor3)

gltf.save(gltf_respath)
# endregion: create a simple gltf box
#---------------------------------------------------------------------------------------------------------------------------------
# region: CREATE A GLTF with EXT_mesh_features and EXT_structural_metadata
# read the gltf file of interest
gltf = GLTF2().load(gltf_respath)
# this gltf file only have 1 scene, 1 node, 1 mesh and 1 primitive, the primitive is a box of 1m x 1m x 1m
# lets id the box based on each surface which has 4 vertices
prim = gltf.meshes[0].primitives[0]
prim_verts = py3dtileslib.utils.get_pos_frm_primitive(prim, gltf)
fid_list = []
id = 0
for cnt,pv in enumerate(prim_verts):
    if cnt%4 == 0 and cnt != 0:
        id += 1
    fid_list.append(id)

# add EXT_mesh_features onto the gltf
py3dtileslib.mesh_features.add_extmeshfeatures(gltf)
# add the EXT_mesh_features onto the primitive
py3dtileslib.mesh_features.add_extmeshfeatures_by_vertex(prim, gltf, fid_list)
#---------------------------------------------------------------------------------------------------------------------------------
# add EXT_structural_metadata to the gltf
# define and create the classes in the EXT_structural_metadata
class_name = 'example_class'
classes = py3dtileslib.struct_metadata.create_classes(class_name, 'this is an example class')
#---------------------------------------------------------------------------------------------------------------------------------
# define and create the properties
prop_id1 = 'example_string'
prop_id2 = 'example_float'
prop_id3 = 'example_enum'
enumtpye = 'example_enum'

str_prop = py3dtileslib.struct_metadata.create_classes_prop('example_str', 'example string property', 'STRING')
float_prop = py3dtileslib.struct_metadata.create_classes_prop('example_float', 'example float property', 'SCALAR', comptype = 'FLOAT32')
enum_prop = py3dtileslib.struct_metadata.create_classes_prop('example_enum', 'example enum property', 'ENUM', enumtype = enumtpye)

py3dtileslib.struct_metadata.add_property2classes(classes, prop_id1, str_prop)
py3dtileslib.struct_metadata.add_property2classes(classes, prop_id2, float_prop)
py3dtileslib.struct_metadata.add_property2classes(classes, prop_id3, enum_prop)
#---------------------------------------------------------------------------------------------------------------------------------
# create the enums
enum_dict_ls = [{'name': 'this0', 'value': 0}, {'name': 'this1', 'value': 1}, {'name': 'this2', 'value': 2},
                {'name': 'this3', 'value': 3}, {'name': 'this4', 'value': 4}, {'name': 'this5', 'value': 5}]
enum = py3dtileslib.struct_metadata.create_enum('example_enum', 'example of enums', enum_dict_ls)
enums = {}
py3dtileslib.struct_metadata.add_enum2enums(enums, enumtpye, enum)
#---------------------------------------------------------------------------------------------------------------------------------
# change the metadata into buffers
buffer_data = bytearray()
example_string_list = ['surface10', 'surface2', 'surface300', 'surface4', 'surface50', 'surface06']
packed_string, offset = py3dtileslib.utils.pack_att_string(example_string_list)
packed_offset = py3dtileslib.utils.pack_att(offset, '<l')

example_float_list = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0]
packed_float = py3dtileslib.utils.pack_att(example_float_list, '<f')

example_enum_list = [0, 1, 2, 3, 4, 5]
packed_enum = py3dtileslib.utils.pack_att(example_enum_list, '<H')

buffer2 = Buffer()
buffer_data.extend(packed_string)
buffer_data.extend(packed_offset)
buffer_data.extend(packed_float)
buffer_data.extend(packed_enum)
py3dtileslib.utils.write_buffer(buffer2, buffer_data)
gltf.buffers.append(buffer2)
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

buffer_view_meta3 = BufferView()
buffer_view_meta3.buffer = 1
buffer_view_meta3.byteOffset = len(packed_string) + len(packed_offset)
buffer_view_meta3.byteLength = len(packed_float)
gltf.bufferViews.append(buffer_view_meta3)

buffer_view_meta4 = BufferView()
buffer_view_meta4.buffer = 1
buffer_view_meta4.byteOffset = len(packed_string) + len(packed_offset) + len(packed_float)
buffer_view_meta4.byteLength = len(packed_enum)
gltf.bufferViews.append(buffer_view_meta4)
#---------------------------------------------------------------------------------------------------------------------------------
# create the property table in the EXT_structural_metadata
prop_table = py3dtileslib.struct_metadata.create_prop_table('example property table', class_name, 6)
py3dtileslib.struct_metadata.add_table_property(prop_table, prop_id1, len(gltf.bufferViews)-4, len(gltf.bufferViews)-3)
py3dtileslib.struct_metadata.add_table_property(prop_table, prop_id2, len(gltf.bufferViews)-2)
py3dtileslib.struct_metadata.add_table_property(prop_table, prop_id3, len(gltf.bufferViews)-1)

#---------------------------------------------------------------------------------------------------------------------------------
# add the classes and property table into the ext_structural_metadata extension 
py3dtileslib.struct_metadata.add_extstructmetadata(gltf, 'example_schema', classes, [prop_table], enums=enums)
sel_featureid = gltf.meshes[0].primitives[0].extensions['EXT_mesh_features']['featureIds'][0]
py3dtileslib.struct_metadata.add_prop_table2featureid(0, sel_featureid)
gltf.save(gltf_respath2)
# endregion: CREATE A GLTF with EXT_mesh_features and EXT_structural_metadata

#---------------------------------------------------------------------------------------------------------------------------------
# region: CREATE A SIMPLE TILESET
# create the tileset 
tileset = py3dtileslib.Tileset(tileset_path, 1.1)
root_node = py3dtileslib.Node('root')
pos_list = py3dtileslib.utils.get_pos_frm_gltf(gltf)

bbox = py3dtileslib.utils.compute_tile_bbox(pos_list)
root_node.add_box(bbox)
root_node.add_error(0.0)
root_node.edit_refine('REPLACE')
root_node.add_tile_content(gltf)

tileset.add_root(root_node)
tileset.add_error(10.0)
tileset.to_tileset()
# endregion: CREATE A SIMPLE TILESET

# endregion: MAIN
#=================================================================================================================================
