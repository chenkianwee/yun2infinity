from pygltflib import GLTF2
#===================================================================================================
# region ----- Parameters -----
#===================================================================================================
gltf_path = '/yun2inf/example/gltf/arch_eg.glb'
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
for mesh in meshes:
    name = mesh.name
    primitives = mesh.primitives
    print(len(primitives), name)
# endregion

