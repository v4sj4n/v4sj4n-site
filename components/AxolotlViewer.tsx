"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type * as ThreeTypes from "three";

const MODEL_SRC = "/axolotl-mascot.glb?v=eyes-only";

type ViewerStatus = "loading" | "ready" | "error";

export function AxolotlViewer({
	label,
	loadingLabel,
	errorLabel,
	celebration = false,
}: {
	label: string;
	loadingLabel: string;
	errorLabel: string;
	celebration?: boolean;
}) {
	const prefersReducedMotion = useReducedMotion();
	const mountRef = useRef<HTMLDivElement | null>(null);
	const celebrationRef = useRef(celebration);
	const [status, setStatus] = useState<ViewerStatus>("loading");

	useEffect(() => {
		celebrationRef.current = celebration;
	}, [celebration]);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		let cancelled = false;
		let raf = 0;
		let disposeScene: (() => void) | null = null;
		const reduceMotion = prefersReducedMotion === true;

		(async () => {
			try {
				const THREE = await import("three");
				const { GLTFLoader } = await import(
					"three/examples/jsm/loaders/GLTFLoader.js"
				);
				const { OrbitControls } = await import(
					"three/examples/jsm/controls/OrbitControls.js"
				);
				if (cancelled || !mountRef.current) return;
				const host = mountRef.current;

				const width = host.clientWidth || 320;
				const height = host.clientHeight || 320;

				const renderer = new THREE.WebGLRenderer({
					antialias: true,
					alpha: true,
				});
				renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
				renderer.setSize(width, height);
				renderer.setClearColor(0x000000, 0);
				renderer.shadowMap.enabled = false;
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1.1;
				renderer.domElement.style.display = "block";
				renderer.domElement.style.width = "100%";
				renderer.domElement.style.height = "100%";
				renderer.domElement.style.pointerEvents = "none";
				renderer.domElement.setAttribute("role", "img");
				renderer.domElement.setAttribute("aria-label", label);
				host.appendChild(renderer.domElement);

				const scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 50);
				camera.position.set(0, 1.05, 2.8);

				// Rotation disabled per user preference
				const controls = new OrbitControls(camera, host);
				controls.enableRotate = false;
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.update();

				// Ambient & key lighting with bright, clean slate-lavender bounce and fill
				scene.add(new THREE.HemisphereLight(0xffffff, 0x675883, 0.9));

				const key = new THREE.DirectionalLight(0xffffff, 1.6);
				key.position.set(2.2, 3.2, 2.4);
				scene.add(key);

				const rim = new THREE.DirectionalLight(0xc1b4e8, 0.95);
				rim.position.set(-2.5, 1.5, -2.2);
				scene.add(rim);

				const fill = new THREE.DirectionalLight(0xcfc6eb, 0.42);
				fill.position.set(-1.5, 0.8, 2.0);
				scene.add(fill);

				const gltf = await new GLTFLoader().loadAsync(MODEL_SRC);
				if (cancelled) {
					return;
				}
				const model = gltf.scene;

				// Light slate purple accents on gills, LEDs, and blush; clean original body
				model.traverse((obj) => {
					const mesh = obj as ThreeTypes.Mesh;
					if (!mesh.isMesh) return;
					mesh.castShadow = false;
					mesh.receiveShadow = false;

					if (mesh.material) {
						if (Array.isArray(mesh.material)) {
							mesh.material = mesh.material.map((m) => m.clone());
						} else {
							mesh.material = mesh.material.clone();
						}
					}

					const std = (
						Array.isArray(mesh.material) ? mesh.material[0] : mesh.material
					) as ThreeTypes.MeshStandardMaterial | undefined;
					if (!std) return;

					const name = mesh.name;

					if (name.includes("Gill") || name.includes("TailFin")) {
						// Accents: lighter slate purple for external gills, feathery frills, and tail fin
						std.color.set(0x766694);
						if (std.emissive) {
							std.emissive.set(0x45355e);
							std.emissiveIntensity = 0.75;
						}
						std.roughness = 0.38;
						std.metalness = 0.08;
					} else if (name.includes("Blush")) {
						// Accents: lighter soft lilac-slate cheek blush
						std.color.set(0x9482b3);
						if (std.emissive) {
							std.emissive.set(0x6b568c);
							std.emissiveIntensity = 0.7;
						}
					} else if (
						name.includes("Eye") ||
						name.includes("Brow") ||
						name.includes("Core")
					) {
						if (!name.includes("Bezel")) {
							// Accents: luminous bright slate-lavender LED glow
							std.color.set(0xbdb0de);
							if (std.emissive) {
								std.emissive.set(0x9d8ac7);
								std.emissiveIntensity = 2.0;
							}
						} else {
							// Bezels: lighter slate purple frame
							std.color.set(0x483a60);
							std.roughness = 0.38;
							std.metalness = 0.15;
						}
					} else if (name.includes("Bezel")) {
						// Visor bezel: lighter slate purple frame
						std.color.set(0x483a60);
						std.roughness = 0.38;
						std.metalness = 0.15;
					}
				});

				// Center the model and frame camera closer so animal appears bigger
				const bounds = new THREE.Box3().setFromObject(model);
				const center = bounds.getCenter(new THREE.Vector3());
				model.position.x -= center.x;
				model.position.z -= center.z;
				model.updateMatrixWorld(true);
				const fitBounds = new THREE.Box3().setFromObject(model);
				const fitCenter = fitBounds.getCenter(new THREE.Vector3());
				const fitSize = fitBounds.getSize(new THREE.Vector3());
				const radius = fitSize.length() / 2;
				const vFov = THREE.MathUtils.degToRad(camera.fov / 2);
				const hFov = Math.atan(Math.tan(vFov) * (width / Math.max(height, 1)));
				// Factor 0.80 brings camera closer so the pet is prominently larger in frame
				const fitDist = (radius / Math.sin(Math.min(vFov, hFov))) * 0.8;
				const viewDir = new THREE.Vector3(0, 0.22, 0.97).normalize();
				camera.position.copy(fitCenter).addScaledVector(viewDir, fitDist);
				camera.near = Math.max(fitDist / 100, 0.01);
				camera.far = fitDist * 20;
				// Raising the lookAt point (+0.16) seats the axolotl lower in the viewport
				camera.lookAt(fitCenter.x, fitCenter.y + 0.16, fitCenter.z);
				camera.updateProjectionMatrix();

				controls.target.set(fitCenter.x, fitCenter.y + 0.16, fitCenter.z);
				controls.update();

				const root = new THREE.Group();
				root.add(model);
				scene.add(root);

				// ---- Three.js rig: named parts + rest pose ----
				const find = (name: string) => model.getObjectByName(name);
				const body = find("Axolotl_Body");
				const head = find("Axolotl_Head");
				const armL = find("Axolotl_Arm_L");
				const armR = find("Axolotl_Arm_R");
				const footL = find("Axolotl_Foot_L");
				const footR = find("Axolotl_Foot_R");
				const tail = find("Axolotl_Tail");
				const tailFin = find("Axolotl_TailFin");
				const browL = find("Axolotl_Brow_L");
				const browR = find("Axolotl_Brow_R");
				const eyeL = find("Axolotl_Eye_L");
				const eyeR = find("Axolotl_Eye_R");
				const blushL = find("Axolotl_Blush_L");
				const blushR = find("Axolotl_Blush_R");
				const mouth = find("Axolotl_Mouth");

				if (armL) armL.visible = false;
				if (armR) armR.visible = false;
				if (mouth) mouth.visible = false;

				const rest = new Map<string, number[][]>();
				model.traverse((obj) => {
					rest.set(obj.name, [
						[obj.position.x, obj.position.y, obj.position.z],
						[obj.rotation.x, obj.rotation.y, obj.rotation.z],
					]);
				});
				const restRot = (obj: ThreeTypes.Object3D | undefined) =>
					rest.get(obj?.name ?? "")?.[1] ?? [0, 0, 0];
				const restPosY = (obj: ThreeTypes.Object3D | undefined) =>
					rest.get(obj?.name ?? "")?.[0][1] ?? 0;

				const gills: {
					stalk: ThreeTypes.Object3D;
					frills: ThreeTypes.Object3D[];
					side: -1 | 1;
					phase: number;
					level: number;
				}[] = [];
				for (const sideName of ["L", "R"] as const) {
					const side: -1 | 1 = sideName === "L" ? -1 : 1;
					for (let level = 0; level < 3; level++) {
						const stalk = find(`Axolotl_Gill_${sideName}${level}`);
						if (!stalk) continue;
						const frills = [
							find(`Axolotl_GillFrill_${sideName}${level}0`),
							find(`Axolotl_GillFrill_${sideName}${level}1`),
						].filter((f): f is ThreeTypes.Object3D => f !== undefined);
						gills.push({
							stalk,
							frills,
							side,
							phase: level * 0.9 + (side > 0 ? 1.6 : 0),
							level,
						});
					}
				}

				// Continuous state integration for ultra-smooth, buttery animations
				let happyBlend = celebrationRef.current ? 1 : 0;
				let swimPhase = 0;
				let gillPhase = 0;
				let breathPhase = 0;
				let hopTimer = 0;
				let blinkTimer = 1.0;
				let nextBlinkTime = 3.6;
				let prevHopY = 0;

				// Light follow filters — source curves are already C1, so keep lag tiny
				let smoothHopY = 0;
				let smoothSquashY = 0;
				let smoothSquashXZ = 0;
				let smoothVel = 0;

				const gauss = (x: number, center: number, width: number) => {
					const n = (x - center) / width;
					return Math.exp(-(n * n));
				};

				const updatePose = (dt: number, celebrating: boolean) => {
					// Exponential smoothing so idle <-> celebration blends seamlessly without pops
					happyBlend = THREE.MathUtils.damp(
						happyBlend,
						celebrating ? 1 : 0,
						3.2,
						dt,
					);

					// Integrate continuous phase angles to guarantee smooth motion across speed transitions
					const swimSpeed = THREE.MathUtils.lerp(1.7, 2.6, happyBlend);
					const gillSpeed = THREE.MathUtils.lerp(1.5, 2.2, happyBlend);
					swimPhase += swimSpeed * dt;
					gillPhase += gillSpeed * dt;
					breathPhase += 1.35 * dt;

					// Soft blinks — rarer + shallower while happy so crescent eyes stay readable
					blinkTimer += dt;
					if (blinkTimer >= nextBlinkTime) {
						blinkTimer = 0;
						nextBlinkTime =
							THREE.MathUtils.lerp(3.8, 4.6, happyBlend) + Math.random() * 1.8;
					}
					const BLINK_DURATION = 0.14;
					let blink = 1.0;
					if (blinkTimer < BLINK_DURATION) {
						const bp = blinkTimer / BLINK_DURATION;
						const blinkCurve = Math.sin(bp * Math.PI);
						blink =
							1 - blinkCurve * THREE.MathUtils.lerp(0.82, 0.35, happyBlend);
					}

					// Continuous hop: overlapping Gaussians + sin^k flight (zero vel at liftoff/land)
					const HOP_PERIOD = 1.7;
					const wrapped = hopTimer + dt >= HOP_PERIOD;
					hopTimer = (hopTimer + dt) % HOP_PERIOD;
					const p = hopTimer / HOP_PERIOD;

					const AIR_START = 0.16;
					const AIR_END = 0.7;
					let rawHopY = 0;
					if (p > AIR_START && p < AIR_END) {
						const t = (p - AIR_START) / (AIR_END - AIR_START);
						const s = Math.sin(t * Math.PI);
						// power > 1 → soft takeoff/landing, flat floaty apex
						rawHopY = s ** 1.45 * 0.32;
					}

					const crouch = gauss(p, 0.09, 0.055);
					const land = gauss(p, 0.76, 0.09);
					rawHopY -= crouch * 0.024;

					// Stretch from vertical velocity of the continuous height curve
					const rawVel = !wrapped && dt > 1e-6 ? (rawHopY - prevHopY) / dt : 0;
					prevHopY = rawHopY;

					const rawSquashY =
						-crouch * 0.055 -
						land * 0.06 +
						THREE.MathUtils.clamp(rawVel, -3, 3) * 0.016;
					const rawSquashXZ =
						crouch * 0.028 +
						land * 0.03 -
						THREE.MathUtils.clamp(rawVel, -3, 3) * 0.009;

					smoothHopY = THREE.MathUtils.damp(
						smoothHopY,
						rawHopY * happyBlend,
						18,
						dt,
					);
					smoothSquashY = THREE.MathUtils.damp(
						smoothSquashY,
						rawSquashY * happyBlend,
						16,
						dt,
					);
					smoothSquashXZ = THREE.MathUtils.damp(
						smoothSquashXZ,
						rawSquashXZ * happyBlend,
						16,
						dt,
					);
					smoothVel = THREE.MathUtils.damp(
						smoothVel,
						rawVel * happyBlend,
						14,
						dt,
					);

					root.position.y = smoothHopY;

					// Natural gentle breathing & aquatic bob
					const breath = Math.sin(breathPhase) * 0.012;
					const floatBob = Math.sin(swimPhase * 0.8) * 0.022;

					// Body: organic floating bob + cushioned squash and stretch
					if (body) {
						body.position.y = restPosY(body) + floatBob;
						body.scale.set(
							1 + breath * 0.5 + smoothSquashXZ,
							1 + breath + smoothSquashY,
							1 + breath * 0.5 + smoothSquashXZ,
						);

						const rBody = restRot(body);
						const bodyPitch =
							rBody[0] +
							Math.sin(swimPhase * 0.8 + 0.4) * 0.022 -
							(smoothHopY > 0 ? 0.04 * happyBlend : 0);
						const bodyYaw = rBody[1] + Math.sin(swimPhase * 0.5) * 0.018;
						const bodyRoll = rBody[2] + Math.sin(swimPhase * 0.5 + 0.8) * 0.018;
						body.rotation.set(bodyPitch, bodyYaw, bodyRoll);
					}

					// Head: smoothly lags behind vertical momentum with natural mass inertia
					if (head) {
						const rHead = restRot(head);
						const headPitch =
							rHead[0] +
							Math.sin(swimPhase * 0.8 - 0.4) * 0.025 +
							happyBlend * 0.02 -
							smoothVel * 0.035;
						const headYaw = rHead[1] + Math.sin(swimPhase * 0.5 - 0.5) * 0.02;
						const headRoll = rHead[2] - Math.sin(swimPhase * 0.5 + 0.8) * 0.012;
						head.rotation.set(headPitch, headYaw, headRoll);
					}

					// Feet: smooth trailing tilt with vertical momentum
					if (footL) {
						const rFootL = restRot(footL);
						const footPitch =
							Math.sin(swimPhase * 0.8 - 0.6) * 0.05 + smoothVel * 0.06;
						footL.rotation.x = rFootL[0] + footPitch;
					}
					if (footR) {
						const rFootR = restRot(footR);
						const footPitch =
							Math.sin(swimPhase * 0.8 - 0.3) * 0.05 + smoothVel * 0.06;
						footR.rotation.x = rFootR[0] + footPitch;
					}

					// Tail & Fin: continuous, buttery traveling wave down spine
					if (tail) {
						const rTail = restRot(tail);
						const tailYaw =
							Math.sin(swimPhase) *
							THREE.MathUtils.lerp(0.18, 0.28, happyBlend);
						const tailPitch = Math.sin(swimPhase * 0.5) * 0.03;
						const tailRoll = Math.cos(swimPhase) * 0.035;
						tail.rotation.set(
							rTail[0] + tailPitch,
							rTail[1] + tailYaw,
							rTail[2] + tailRoll,
						);
					}
					if (tailFin) {
						const rFin = restRot(tailFin);
						const finYaw =
							Math.sin(swimPhase - 0.75) *
							THREE.MathUtils.lerp(0.24, 0.36, happyBlend);
						const finPitch = Math.sin(swimPhase * 0.5 - 0.75) * 0.035;
						const finRoll = Math.cos(swimPhase - 0.75) * 0.04;
						tailFin.rotation.set(
							rFin[0] + finPitch,
							rFin[1] + finYaw,
							rFin[2] + finRoll,
						);
					}

					// Gills & Frills: feathery plumes drifting smoothly in underwater currents
					const stalkAmp = THREE.MathUtils.lerp(0.07, 0.12, happyBlend);
					const stalkBase = THREE.MathUtils.lerp(0.04, 0.07, happyBlend);
					const frillAmp = THREE.MathUtils.lerp(0.1, 0.16, happyBlend);

					for (const g of gills) {
						const w = gillPhase + g.phase;
						const sr = restRot(g.stalk);
						g.stalk.rotation.z =
							sr[2] +
							g.side * (stalkBase + Math.sin(w) * stalkAmp - smoothVel * 0.035);
						g.stalk.rotation.x = sr[0] + Math.cos(w * 0.85) * 0.04;
						g.stalk.rotation.y = sr[1] + Math.sin(w * 0.6) * 0.02;

						g.frills.forEach((f, j) => {
							const fr = restRot(f);
							f.rotation.z =
								fr[2] + g.side * Math.sin(w - 0.45 - j * 0.22) * frillAmp;
							f.rotation.x =
								fr[0] + Math.cos(w - 0.35 - j * 0.18) * frillAmp * 0.6;
						});
					}

					// Eyebrows: soft raised arch while celebrating
					const browLift = THREE.MathUtils.lerp(0.0, 0.08, happyBlend);
					const browRaise = THREE.MathUtils.lerp(0.0, 0.012, happyBlend);
					if (browL) {
						const rBrowL = restRot(browL);
						browL.position.y = restPosY(browL) + browRaise;
						browL.rotation.set(rBrowL[0], rBrowL[1], rBrowL[2] - browLift);
					}
					if (browR) {
						const rBrowR = restRot(browR);
						browR.position.y = restPosY(browR) + browRaise;
						browR.rotation.set(rBrowR[0], rBrowR[1], rBrowR[2] + browLift);
					}

					if (eyeL) {
						const rEyeL = restRot(eyeL);
						eyeL.rotation.set(rEyeL[0], rEyeL[1], rEyeL[2]);
						eyeL.scale.set(1, Math.max(0.12, blink), 1);
						eyeL.visible = true;
					}
					if (eyeR) {
						const rEyeR = restRot(eyeR);
						eyeR.rotation.set(rEyeR[0], rEyeR[1], rEyeR[2]);
						eyeR.scale.set(1, Math.max(0.12, blink), 1);
						eyeR.visible = true;
					}

					// Cheeks: warmer blush pulse while celebrating
					const blushPulse =
						1.0 + happyBlend * (0.22 + Math.sin(swimPhase * 1.2) * 0.05);
					if (blushL) blushL.scale.set(blushPulse, blushPulse, 1);
					if (blushR) blushR.scale.set(blushPulse, blushPulse, 1);
				};

				// Initial pose
				updatePose(0.016, celebrationRef.current);

				let lastTime = performance.now();
				const tick = () => {
					if (cancelled) return;
					raf = requestAnimationFrame(tick);
					const now = performance.now();
					const dt = Math.min((now - lastTime) / 1000, 0.05);
					lastTime = now;

					if (!reduceMotion) {
						updatePose(dt, celebrationRef.current);
					}
					renderer.render(scene, camera);
				};
				tick();

				const resize = () => {
					const w = host.clientWidth || 320;
					const h = host.clientHeight || 320;
					camera.aspect = w / h;
					camera.updateProjectionMatrix();
					renderer.setSize(w, h);
				};
				const observer = new ResizeObserver(resize);
				observer.observe(host);
				resize();

				setStatus("ready");

				disposeScene = () => {
					observer.disconnect();
					controls.dispose();
					scene.traverse((obj) => {
						const mesh = obj as ThreeTypes.Mesh;
						if (mesh.isMesh) {
							mesh.geometry?.dispose?.();
							const mat = mesh.material as
								| ThreeTypes.Material
								| ThreeTypes.Material[]
								| undefined;
							if (Array.isArray(mat)) {
								mat.forEach((m) => {
									m.dispose?.();
								});
							} else mat?.dispose?.();
						}
					});
					renderer.dispose();
					if (renderer.domElement.parentElement === host) {
						host.removeChild(renderer.domElement);
					}
				};
			} catch (err) {
				console.error("three.js viewer error:", err);
				if (!cancelled) setStatus("error");
			}
		})();

		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			disposeScene?.();
		};
	}, [label, prefersReducedMotion]);

	return (
		<div
			className="min-w-0 max-w-full overflow-hidden"
			aria-busy={status === "loading"}
			data-mood={celebration ? "celebrating" : "idle"}
			data-status={celebration ? "submitted" : status}
		>
			<div className="relative isolate h-72 w-full min-w-0 overflow-hidden sm:h-80">
				{status === "loading" ? (
					<p
						role="status"
						className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
					>
						{loadingLabel}
					</p>
				) : null}
				{status === "error" ? (
					<p
						role="alert"
						className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-muted-foreground"
					>
						{errorLabel}
					</p>
				) : null}
				{status !== "error" ? (
					<div
						ref={mountRef}
						className="block h-full w-full max-w-full overflow-hidden"
						style={{ touchAction: "auto" }}
					/>
				) : null}
			</div>
		</div>
	);
}
