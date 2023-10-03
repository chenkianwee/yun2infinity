import struct

import py3dtileslib
import numpy as np
from pygltflib import GLTF2
#===================================================================================================
# region ----- Parameters -----
#===================================================================================================
gltf_path = '/home/chenkianwee/kianwee_work/code_workspace/yun2inf/django/yun2inf_project/csviewer/static/3dtiles/arch_eg/tiles/root.gltf'
# endregion
#===================================================================================================
# region ----- Main -----
#===================================================================================================
gltf = GLTF2().load(gltf_path)
buffers = gltf.buffers
data = gltf.get_data_from_buffer_uri(buffers[0].uri)
scene = gltf.scene
scenes = gltf.scenes
nodes = gltf.nodes
acc = gltf.accessors
meshes = gltf.meshes
# for mesh in meshes:
#     name = mesh.name
#     primitives = mesh.primitives
#     print(len(primitives), name)
#     for prim in primitives:
#         idxs = py3dtileslib.utils.get_idx_frm_primitive(prim, gltf)
#         print(idxs)
ncnt = 0
for node in nodes:
    children = node.children
    name = node.name
    scale = node.scale
    rot = node.rotation
    trsl = node.translation
    # print(scale)
    # print(rot)
    # print(trsl)
    # print('my name is', name, 'my node index is', ncnt)
    # print(children)
    mesh_id = node.mesh
    if mesh_id is not None:
        mesh = meshes[mesh_id]
        primitives = mesh.primitives
        # print('number of prims',len(primitives))
        for pcnt, prim in enumerate(primitives):
            #outline the primitives
            if ncnt >= 6 and ncnt <=7:
                if pcnt == 12:
                    pos = py3dtileslib.utils.get_pos_frm_primitive(prim, gltf)
                    indxs_orig = py3dtileslib.utils.get_idx_frm_primitive(prim, gltf)
                    indxs_orig = np.reshape(indxs_orig, (int(len(indxs_orig)/3), 3))
                    indxs = indxs_orig
                    nrmls = py3dtileslib.utils.get_nmrl_frm_primitive(prim, gltf)
                    outline = py3dtileslib.utils.get_edge_indx(prim, gltf)
                    print(pos)
                    print(indxs)
                    print(outline)


    ncnt+=1
# endregion

