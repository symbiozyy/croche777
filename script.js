/* ==========================================================
   CONFIG — edite aqui os links e contatos do Rafael
   ========================================================== */
const CONFIG = {
  instagram: "croche.777",
  // Número do WhatsApp com DDI + DDD, só números (ex: "5511999999999").
  // Deixe vazio para mandar os pedidos só pelo Instagram.
  whatsapp: "",
  tiktok: "https://www.tiktok.com/@croche.777",
  threads: "https://www.threads.net/@croche.777",
  linktree: "https://linktr.ee/bonescroche.777",
};

/* ==========================================================
   PRODUTOS — adicione novos drops aqui
   price: texto livre ("Sob encomenda", "R$ 250", ...)
   ========================================================== */
const PRODUCTS = [
  { name: "Gato de Cheshire", img: "assets/img/cheshire.jpg", cat: "personagem", badge: "Personagem", likes: 935,
    desc: "Lilás com debrum vinho e espiral no topo. O sorriso mais brabo da ZL 😼" },
  { name: "PJL — homenagem Buzeira", img: "assets/img/pjl-buzeira.jpg", cat: "homenagem", badge: "🔥 Viral", likes: 7181,
    desc: "Retrato pixel a pixel em crochê. O post mais curtido do perfil 🗽💭" },
  { name: "Brasil — Copa 2026", img: "assets/img/brasil.jpg", cat: "selecao", badge: "Seleção", likes: 779,
    desc: "Inspirado na maior seleção. Amarelo, azul ou branco — qual é o seu? 💚💛💙" },
  { name: "Metralha vs Tio Patinhas", img: "assets/img/metralha-patinhas.jpg", cat: "personagem", badge: "Dupla", likes: 1044,
    desc: "Aba xadrez preta e amarela + o pato mais rico do mundo 💰" },
  { name: "Ref. Burberry", img: "assets/img/burberry-ref.jpg", cat: "homenagem", badge: "Ref", likes: 1083,
    desc: "Azul marinho por fora, xadrez clássico por baixo da aba. Detalhe que só quem usa vê." },
  { name: "Homenagem Brooksfield", img: "assets/img/brooksfield.jpg", cat: "homenagem", badge: "Homenagem", likes: 555,
    desc: "Marinho com logo e letreiro em branco, debrum contrastante 🧢💙" },
  { name: "aclau — personalizado", img: "assets/img/aclau-close.jpg", cat: "personalizado", badge: "Dubai 🌎", likes: 621,
    desc: "Nome da artista em pink sobre preto, feito sob medida. Foi parar em Dubai." },
  { name: "Liso Marinho", img: "assets/img/azul-liso.jpg", cat: "liso", badge: "Clássico", likes: null,
    desc: "O básico que não é básico: 100% crochê, ponto fechado, caimento perfeito." },
];
PRODUCTS.forEach(p => (p.price = p.price || "Sob encomenda"));

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const igProfile = `https://www.instagram.com/${CONFIG.instagram}/`;
const igDM = `https://ig.me/m/${CONFIG.instagram}`;
const fmt = n => n.toLocaleString("pt-BR");

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 3200);
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}

/** Abre o pedido: WhatsApp (com texto pronto) se configurado, senão DM do Insta (copiando o texto). */
async function sendOrder(message) {
  if (CONFIG.whatsapp) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    return;
  }
  const ok = await copy(message);
  toast(ok ? "Pedido copiado! É só colar na DM 📋" : "Abrindo a DM do Insta…");
  setTimeout(() => window.open(igDM, "_blank", "noopener"), ok ? 700 : 0);
}

/* ---------- links ---------- */
const LINKS = { instagram: igProfile, tiktok: CONFIG.tiktok, threads: CONFIG.threads, linktree: CONFIG.linktree,
  whatsapp: CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}` : "" };
$$("[data-link]").forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) { a.href = url; a.hidden = false; }
});
$$("[data-order]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); sendOrder(a.dataset.order); }));

/* ---------- nav ---------- */
const burger = $("#burger"), navLinks = $("#navLinks");
burger.addEventListener("click", () => { burger.classList.toggle("open"); navLinks.classList.toggle("open"); });
$$("#navLinks a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); navLinks.classList.remove("open"); }));

/* ---------- produtos ---------- */
const grid = $("#grid");
function renderProducts(filter = "all") {
  grid.innerHTML = "";
  PRODUCTS.filter(p => filter === "all" || p.cat === filter).forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="card-img">
        <img src="${p.img}" alt="Boné de crochê ${p.name}" loading="lazy">
        <span class="card-badge">${p.badge}</span>
        <button class="card-like-btn" aria-label="Curtir">🤍</button>
        ${p.likes ? `<span class="card-likes">♥ ${fmt(p.likes)}</span>` : ""}
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-foot">
          <span class="price">${p.price}</span>
          <a href="#" class="btn btn-yellow">Quero esse</a>
        </div>
      </div>`;
    $(".btn", card).addEventListener("click", e => {
      e.preventDefault();
      sendOrder(`Oi Rafael! Vi no site o boné "${p.name}" e quero encomendar um 🧢🔥`);
    });
    const like = $(".card-like-btn", card);
    like.addEventListener("click", () => {
      const on = like.textContent === "🤍";
      like.textContent = on ? "❤️" : "🤍";
      like.classList.remove("liked"); void like.offsetWidth; like.classList.add("liked");
      if (on) toast("Boa escolha 🔥 Chama o Rafa pra garantir o seu");
    });
    grid.appendChild(card);
  });
}
renderProducts();
$$("#chips .chip").forEach(c => c.addEventListener("click", () => {
  $$("#chips .chip").forEach(x => x.classList.remove("active"));
  c.classList.add("active");
  renderProducts(c.dataset.filter);
}));

/* ---------- monte o seu ---------- */
const COLORS = [
  ["Lilás", "#c9b6ff"], ["Preto", "#141414"], ["Branco", "#f4f4f4"], ["Marinho", "#1d3a7a"],
  ["Azul royal", "#1f4fd8"], ["Amarelo", "#ffd60a"], ["Verde", "#1f8a3a"], ["Vermelho", "#e2263b"],
  ["Vinho", "#8e1b3a"], ["Pink", "#ff2d8a"], ["Roxo", "#6c3cf0"], ["Nude", "#f2c4a8"],
];
const state = { base: 0, brim: 0, trim: 7 };

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 < 140;
}

function buildChecker() {
  const g = $("#capChecker");
  let html = "";
  const size = 22;
  for (let y = 156; y < 222; y += size) for (let x = 40; x < 340; x += size) {
    if (((x - 40) / size + (y - 156) / size) % 2 === 0) html += `<rect x="${x}" y="${y}" width="${size}" height="${size}" />`;
  }
  g.innerHTML = html;
}
buildChecker();

function updateCap() {
  const base = COLORS[state.base][1], brim = COLORS[state.brim][1], trim = COLORS[state.trim][1];
  const style = $("input[name=style]:checked").value;
  $("#capCrown").setAttribute("fill", base);
  $("#capBrim").setAttribute("fill", brim);
  $("#capTrim").setAttribute("stroke", trim);
  $("#capTrim2").setAttribute("stroke", trim);
  const spiral = $("#capSpiral");
  spiral.setAttribute("stroke", trim);
  spiral.setAttribute("opacity", style === "Espiral no topo" || style === "Personagem" ? "1" : "0");
  const checker = $("#capChecker");
  checker.setAttribute("fill", trim);
  checker.setAttribute("opacity", style === "Xadrez" ? "1" : "0");
  const txt = $("#capText");
  const value = $("#capInput").value.trim();
  txt.textContent = style === "Liso" ? "" : style === "Personagem" ? (value || "😼") : value;
  txt.setAttribute("fill", style === "Xadrez" ? (isDark(base) ? "#fff" : "#111") : (isDark(base) ? trim === base ? "#fff" : trim : trim === base ? "#111" : trim));
  txt.setAttribute("y", style === "Xadrez" ? "130" : "150");
  const len = txt.textContent.length;
  txt.setAttribute("font-size", len > 9 ? 30 : len > 6 ? 38 : 46);
}

$$(".swatches").forEach(box => {
  const key = box.dataset.target;
  COLORS.forEach(([name, hex], i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch" + (state[key] === i ? " active" : "");
    b.style.background = hex;
    b.title = name;
    b.setAttribute("aria-label", name);
    b.addEventListener("click", () => {
      state[key] = i;
      $$(".swatch", box).forEach(s => s.classList.remove("active"));
      b.classList.add("active");
      updateCap();
    });
    box.appendChild(b);
  });
});
$$("input[name=style]").forEach(r => r.addEventListener("change", updateCap));
$("#capInput").addEventListener("input", updateCap);

$("#randomCap").addEventListener("click", () => {
  const rnd = n => Math.floor(Math.random() * n);
  ["base", "brim", "trim"].forEach(k => {
    state[k] = rnd(COLORS.length);
    $$(`.swatches[data-target=${k}] .swatch`).forEach((s, i) => s.classList.toggle("active", i === state[k]));
  });
  const radios = $$("input[name=style]");
  radios[rnd(radios.length)].checked = true;
  updateCap();
});

$("#sendOrder").addEventListener("click", () => {
  const style = $("input[name=style]:checked").value;
  const text = $("#capInput").value.trim();
  const idea = $("#capIdea").value.trim();
  const msg = [
    "Oi Rafael! Montei meu boné no site 🧢✨",
    `• Cor do boné: ${COLORS[state.base][0]}`,
    `• Cor da aba: ${COLORS[state.brim][0]}`,
    `• Debrum: ${COLORS[state.trim][0]}`,
    `• Estilo: ${style}`,
    text && style !== "Liso" ? `• Texto: ${text}` : "",
    idea ? `• Ideia: ${idea}` : "",
    "Quanto fica e qual o prazo?",
  ].filter(Boolean).join("\n");
  $("#orderHint").textContent = CONFIG.whatsapp ? "Abrindo o WhatsApp com seu pedido…" : "Seu pedido foi copiado — cola na DM do @croche.777 ✌️";
  sendOrder(msg);
});
updateCap();

/* ---------- contador ---------- */
const counter = $("[data-count]");
if (counter) {
  const target = +counter.dataset.count;
  const t0 = performance.now();
  const step = t => {
    const k = Math.min(1, (t - t0) / 1600);
    counter.textContent = fmt(Math.round(target * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
$$(".section-head, .proof-img, .proof-text, .steps li, .course, details, .final > *").forEach(el => {
  el.classList.add("reveal"); io.observe(el);
});

$("#year").textContent = new Date().getFullYear();
