import base64
import struct
import geomie3d

import numpy as np
from pygltflib import GLTF2, Node, Scene, Mesh, Primitive, Buffer, BufferView, Accessor, ELEMENT_ARRAY_BUFFER, ARRAY_BUFFER, UNSIGNED_SHORT, FLOAT, SCALAR, VEC3

res_path = '/cesiumjs/test.gltf'
#===================================================================================================
#Function
#===================================================================================================
def pack_att(att_list, pack_format):
    if type(att_list) == np.ndarray:
        att_list = att_list.tolist()
        
    pack_res = bytearray()
    for att in att_list:
        if type(att) == list or type(att) == tuple: 
            pack = struct.pack(pack_format, *att)
        else:
            pack = struct.pack(pack_format, att)
        pack_res.extend(pack)
    return pack_res
#===================================================================================================
#===================================================================================================
box = geomie3d.create.box(1, 1, 1)
edges = geomie3d.get.wires_frm_solid(box)
# geomie3d.viz.viz([{'topo_list':edges, 'colour':'red'}])
face_list = geomie3d.get.faces_frm_solid(box)

pos_list = []
nrml_list = []
idx_list = []

prev_idx = 0
for f in face_list:
    verts_idxs = geomie3d.modify.triangulate_face(f, indices=True)
    verts = verts_idxs[0]
    # idxs = np.flip(verts_idxs[1], 1)
    idxs = verts_idxs[1]
    idxs = idxs.flatten() + prev_idx
    #get the normals of the points
    nrml = geomie3d.get.face_normal(f)
    nrml = np.reshape(nrml, (1,3))
    nrml = np.repeat(nrml, len(verts_idxs[0]), axis=0)
    
    pos_list.extend(verts)
    idx_list.extend(idxs)
    nrml_list.extend(nrml)
    # print(verts)
    # print(idxs)
    prev_idx += len(verts)

pos_list = np.array(pos_list)
nrml_list = np.array(nrml_list)
idx_list = np.array(idx_list)

bbox_pos = geomie3d.calculate.bbox_frm_xyzs(pos_list).bbox_arr.tolist()
bbox_nrml = geomie3d.calculate.bbox_frm_xyzs(nrml_list).bbox_arr.tolist()


pack_pos = pack_att(pos_list, '<fff')
pack_nrml = pack_att(nrml_list, '<fff')
#make sure the index buffer is in multiple of 4 need to be padded
is_mltp4 = (len(idx_list)*2)%4
if is_mltp4 != 0:    
    idx_list_4 = idx_list[:]
    idx_list_4.append(0)
    pack_indices = pack_att(idx_list_4, '<H')
else:
    pack_indices = pack_att(idx_list, '<H')

#append them into a single bytearray
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

#convert the bytes array into base64 utf 8 string
buffer_data_header = 'data:application/octet-stream;base64,'
data = base64.b64encode(data_bytes).decode('utf-8')
buffer_data = f'{buffer_data_header}{data}'
# add data
buffer = Buffer()
buffer.uri = buffer_data
buffer.byteLength = len(data_bytes)
gltf.buffers.append(buffer)

mesh = Mesh()
primitive = Primitive()
primitive.indices = 2 #index of the accessor
primitive.attributes.POSITION = 0 #index of the accessor
primitive.attributes.NORMAL = 1 #index of the accessor
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

#region ----- this accessor is for the position -----
accessor1 = Accessor()
accessor1.bufferView = 0
accessor1.byteOffset = 0
accessor1.componentType = FLOAT
accessor1.count = len(pos_list)
accessor1.type = VEC3
accessor1.max = [bbox_pos[3], bbox_pos[4], bbox_pos[5]]
accessor1.min = [bbox_pos[0], bbox_pos[1], bbox_pos[2]]
gltf.accessors.append(accessor1)
#endregion
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

gltf.save(res_path)