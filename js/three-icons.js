/* EJAD Studio — big 3D icons (Bliss / Prismatico inspired)
   One shared WebGL canvas draws every [data-obj] placeholder (scissor rendering),
   so the page keeps a single GPU context. Materials echo the chrome/iridescent
   renders in the EJAD company profile.                                            */
import * as THREE from "three";
import { RoomEnvironment } from "../assets/vendor/RoomEnvironment.js";

const canvas = document.querySelector(".gl");
const S = window.EJAD_STATE || { mx: 0, my: 0, processP: 0, reduce: false };
const mobile = matchMedia("(max-width: 760px)").matches;

// wait for the intro to finish so shader compiling never stutters the first seconds
await new Promise((res) => {
  if (S.ready) return res();
  addEventListener("ejad:ready", res, { once: true });
});
await new Promise((res) => (window.requestIdleCallback ? requestIdleCallback(res, { timeout: 600 }) : setTimeout(res, 120)));

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: "high-performance" });
} catch (e) {
  canvas.remove();
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 1.75));
renderer.setSize(innerWidth, innerHeight, false);
renderer.setScissorTest(true);
renderer.setClearColor(0x000000, 0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const pmrem = new THREE.PMREMGenerator(renderer);
const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

/* ---------- materials ---------- */
const chrome = () => new THREE.MeshPhysicalMaterial({
  color: 0xffffff, metalness: 1, roughness: 0.1, envMap, envMapIntensity: 1.25,
  iridescence: 1, iridescenceIOR: 1.85, iridescenceThicknessRange: [220, 880], clearcoat: 1, clearcoatRoughness: 0.05
});
const copper = () => new THREE.MeshPhysicalMaterial({
  color: 0xd99a6c, metalness: 1, roughness: 0.16, envMap, envMapIntensity: 1.3,
  iridescence: 0.45, iridescenceIOR: 1.5, clearcoat: 1, clearcoatRoughness: 0.08
});
const glass = () => new THREE.MeshPhysicalMaterial({
  color: 0xffffff, metalness: 0.15, roughness: 0.04, envMap, envMapIntensity: 1.6,
  transmission: 1, thickness: 1.4, ior: 1.6, dispersion: 6, iridescence: 1, iridescenceIOR: 1.4,
  clearcoat: 1, transparent: true
});

const seg = mobile ? 0.5 : 1;
// bevelled block (an EJAD bar) — rounded edges catch the reflections
function bar(w = 0.42, h = 1.3) {
  const r = 0.06, s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2); s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const g = new THREE.ExtrudeGeometry(s, { depth: w * 0.8, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 5, curveSegments: 8 });
  g.center();
  return g;
}

/* ---------- scene builders ---------- */
function base(fov = 32, z = 6) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 50);
  camera.position.set(0, 0, z);
  const key = new THREE.DirectionalLight(0xffe2c8, 2.2); key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight(0xbb4a1e, 3); rim.position.set(-4, -1, -3);
  scene.add(key, rim);
  return { scene, camera };
}

const builders = {
  // About: twisted chrome knot drifting slowly behind the statement (darker finish so the text stays readable)
  knot() {
    const o = base(30, 9);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x77706a, metalness: 1, roughness: 0.3, envMap, envMapIntensity: 0.5,
      iridescence: 0.4, iridescenceIOR: 1.6, iridescenceThicknessRange: [220, 700], clearcoat: 0.5, clearcoatRoughness: 0.2
    });
    const m = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.34, Math.round(320 * seg), Math.round(48 * seg), 2, 3), mat);
    o.scene.add(m);
    o.exposure = 0.66;
    // fit to the narrow side so it never fills a phone screen (knot radius ≈ 1.7)
    const halfH = 9 * Math.tan(THREE.MathUtils.degToRad(15));
    o.fit = (aspect) => { m.scale.setScalar(Math.min(0.86, (halfH * Math.min(aspect, 1) * 0.78) / 1.7)); };
    o.update = (t, k) => {
      m.position.y = Math.sin(t * 0.35) * 0.12;
      m.rotation.x = t * 0.07 + S.my * 0.25 + k * 0.5;
      m.rotation.y = t * 0.1 + S.mx * 0.35;
    };
    return o;
  },
  // Process: the four EJAD blocks build up step by step
  bars() {
    const o = base(30, 4.8);
    const g = new THREE.Group(), list = [];
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(bar(), i === 3 ? copper() : chrome());
      b.position.x = (i - 1.5) * 0.6;
      b.scale.y = 0.001;
      g.add(b); list.push(b);
    }
    o.scene.add(g);
    o.update = (t) => {
      const p = S.processP;
      list.forEach((b, i) => {
        const target = p > i / 4 - 0.02 || S.reduce ? 1 : 0.001;
        b.scale.y += (target - b.scale.y) * 0.12;
        b.position.y = (b.scale.y - 1) * 0.65;
      });
      g.rotation.y = -0.5 + S.mx * 0.8 + Math.sin(t * 0.5) * 0.15;
      g.rotation.x = 0.18 + S.my * 0.3;
    };
    return o;
  },
  // Services 01 — strategy: a dispersive glass prism
  prism() {
    const o = base(30, 4.2);
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(1.05, 0), glass());
    m.scale.set(1, 1.35, 1);
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), copper());
    o.scene.add(m, core);
    o.update = (t) => {
      m.rotation.y = t * 0.4 + S.mx * 1.2; m.rotation.x = S.my * 0.5;
      core.rotation.y = -t * 0.8; core.rotation.z = t * 0.3;
    };
    return o;
  },
  // Services 02 — identity: the logo blocks as a chrome sculpture
  blocks() {
    const o = base(30, 4.3);
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(bar(0.36, 1.2), i % 2 ? copper() : chrome());
      b.position.x = (i - 1.5) * 0.48;
      b.userData.o = i * 0.9;
      g.add(b);
    }
    o.scene.add(g);
    o.update = (t) => {
      g.children.forEach((b) => { b.position.y = Math.sin(t * 1.2 + b.userData.o) * 0.08; });
      g.rotation.y = -0.6 + S.mx * 1 + Math.sin(t * 0.4) * 0.2;
      g.rotation.x = 0.2 + S.my * 0.4;
    };
    return o;
  },
  // Services 03 — motion: an iridescent ring
  ring() {
    const o = base(30, 6.2);
    const m = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.34, Math.round(48 * seg), Math.round(160 * seg)), chrome());
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), copper());
    o.scene.add(m, dot);
    o.update = (t) => {
      m.rotation.x = 1.1 + S.my * 0.6 + Math.sin(t * 0.6) * 0.2;
      m.rotation.y = t * 0.5 + S.mx * 1;
      dot.position.set(Math.cos(t * 1.4) * 0.95, Math.sin(t * 1.4) * 0.95 * Math.cos(m.rotation.x), Math.sin(t * 1.4) * 0.95 * Math.sin(m.rotation.x));
    };
    return o;
  }
};

/* ---------- placeholders ---------- */
const cache = new Map();
let items = [];
function collect() {
  items = [...document.querySelectorAll("[data-obj]")].map((el, i) => {
    const key = el.dataset.obj + ":" + i;
    if (!cache.has(key)) cache.set(key, builders[el.dataset.obj] ? builders[el.dataset.obj](el) : null);
    return { el, o: cache.get(key) };
  }).filter((it) => it.o);
}
collect();
addEventListener("ejad:objects", () => requestAnimationFrame(collect));
addEventListener("resize", () => renderer.setSize(innerWidth, innerHeight, false));

/* ---------- render loop ---------- */
const clock = new THREE.Clock();
let drewLast = true, dead = false, confirmed = false;
// a lost context cannot get its reflection maps back: fall back to the still renders for this visit
canvas.addEventListener("webglcontextlost", () => {
  dead = true;
  document.documentElement.classList.remove("gl-on");
  canvas.style.display = "none";
});
// only hide the stills once real pixels reached the canvas
function confirmDrawn(r, y) {
  const gl = renderer.getContext(), pr = renderer.getPixelRatio();
  // only the part on screen: a tall object can be larger than the viewport
  const x0 = Math.max(0, r.left), y0 = Math.max(0, y);
  const x1 = Math.min(innerWidth, r.right), y1 = Math.min(innerHeight, y + r.height);
  const w = Math.floor((x1 - x0) * pr), h = Math.floor((y1 - y0) * pr);
  if (w < 1 || h < 1) return false;
  const px = new Uint8Array(w * h * 4);
  gl.readPixels(Math.floor(x0 * pr), Math.floor(y0 * pr), w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
  for (let i = 3; i < px.length; i += 4) if (px[i] > 8) return true;
  return false;
}
function frame() {
  if (dead) return;
  requestAnimationFrame(frame);
  const t = S.reduce ? 0 : clock.getElapsedTime();
  const H = innerHeight, W = innerWidth;
  const vis = [];
  for (const it of items) {
    const r = it.el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > H || r.width < 2 || r.height < 2 || it.el.offsetParent === null) continue;
    vis.push([it, r]);
  }
  // nothing on screen: clear once, then let the GPU rest
  if (!vis.length && !drewLast) return;
  renderer.setScissor(0, 0, W, H);
  renderer.clear();
  drewLast = vis.length > 0;
  for (const [{ o }, r] of vis) {
    const k = 1 - (r.top + r.height / 2) / H; // scroll position factor
    const aspect = r.width / r.height;
    o.camera.aspect = aspect;
    o.camera.updateProjectionMatrix();
    if (o.fit) o.fit(aspect);
    renderer.toneMappingExposure = o.exposure || 1.05;
    o.update(t, S.reduce ? 0 : k * 0.6);
    const y = H - r.bottom;
    renderer.setViewport(r.left, y, r.width, r.height);
    renderer.setScissor(r.left, y, r.width, r.height);
    renderer.render(o.scene, o.camera);
    if (!confirmed && confirmDrawn(r, y)) {
      confirmed = true;
      document.documentElement.classList.add("gl-on");
    }
  }
}
frame();
