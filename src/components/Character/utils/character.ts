"use client";
import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader, FontLoader, TextGeometry } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { createNoiseTexture } from "./textureUtils";

type MaterialConfig = {
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  side?: THREE.Side;
  bumpMap?: THREE.Texture;
  bumpScale?: number;
};

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  // Updated modern palette
  const noiseTexture = createNoiseTexture(512, 0.5); // Generate noise texture
  const materialMap: Record<string, MaterialConfig> = {
    BODYSHIRT: {
      // Sky blue shirt
      color: "#87CEEB",
      roughness: 0.4,
      metalness: 0.05,
    },

    Pant: {
      // Blue pants
      color: "#dedfe3ff",
      roughness: 0.45,
      metalness: 0.1,
    },

    // Shoes
    Shoe: {
      color: "#F9FAFB",
      roughness: 0.35,
      metalness: 0.2,
    },
    Sole: {
      color: "#111827",
      roughness: 0.45,
      metalness: 0.15,
    },

    // Skin
    Ear001: { color: "#C48B60" },
    Neck: { color: "#C48B60" },
    Hand: { color: "#C48B60" },
    Plane007: { color: "#C48B60" },
    Cube002: { color: "#C48B60" },

    // Hair & brows
    hair: {
      color: "#080402", // Slightly lighter black for texture visibility
      roughness: 0.9, // Higher roughness for frizz
      metalness: 0.0,
      side: THREE.DoubleSide,
      bumpMap: noiseTexture,
      bumpScale: 0.15,
    },
    Eyebrow: { color: "#020617", roughness: 0.8, metalness: 0.05 },
  };

  const createMaterialFromConfig = (config: MaterialConfig) => {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.color),
      roughness: config.roughness ?? 0.6,
      metalness: config.metalness ?? 0.1,
      side: config.side ?? THREE.FrontSide,
      bumpMap: config.bumpMap ?? null,
      bumpScale: config.bumpScale ?? 0,
    });

    if (config.emissive) {
      material.emissive = new THREE.Color(config.emissive);
      material.emissiveIntensity = config.emissiveIntensity ?? 0.1;
    }

    material.envMapIntensity = 0.5;

    return material;
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let character: THREE.Object3D;

        loader.load(
          "/models/character.glb",
          async (gltf) => {
            character = gltf.scene;

            await renderer.compileAsync(character, camera, scene);

            // Apply materials
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                const config = materialMap[mesh.name];
                if (config) {
                  mesh.material = createMaterialFromConfig(config);
                }

                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            // -------------------------------------------------
            // ADD 3D TEXT “VICKY” ON THE SHIRT
            // -------------------------------------------------
            const fontLoader = new FontLoader();
            fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
              const textGeo = new TextGeometry("MANOJ", {
                font,
                size: 0.15,
                height: 0.02,
                curveSegments: 12,
              });

              const textMat = new THREE.MeshStandardMaterial({
                color: "#00FF00", // Green text
                roughness: 0.3,
                metalness: 0.2,
              });

              const textMesh = new THREE.Mesh(textGeo, textMat);

              const shirt = character.getObjectByName("BODYSHIRT");
              if (shirt) {
                shirt.add(textMesh);
                textMesh.position.set(0, 0.32, 0.18); // Adjust based on model
                textMesh.rotation.set(0, 0, 0);
              }
            });

            setCharTimeline(character, camera);
            setAllTimeline();

            // Fix foot offset (if needed)
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;

            dracoLoader.dispose();
            resolve(gltf);
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
