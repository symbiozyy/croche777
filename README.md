# CROCHÊ.777 🧢

Site oficial dos **bonés 100% crochê** do Rafael Loirinho, feitos à mão na Zona Leste de SP.
Instagram: [@croche.777](https://www.instagram.com/croche.777/) · [Linktree](https://linktr.ee/bonescroche.777)

## O que tem no site

- **Hero** com polaroids dos drops e stickers no estilo do perfil
- **Drops**: vitrine com filtro (personagens, homenagens, seleção, personalizados, lisos) e botão "Quero esse"
- **Monte o seu**: personalizador com prévia do boné (cores, aba, debrum, estilo, texto) que gera o pedido pronto
- **Prova social** (aclau.art em Dubai), **Como funciona**, **Cursos**, **FAQ**

Os pedidos vão para o **WhatsApp** (com a mensagem preenchida) se houver número configurado. Se não houver, a mensagem
é copiada e a **DM do Instagram** é aberta.

## Como editar

Tudo fica em `script.js`, no topo:

- `CONFIG`: Instagram, WhatsApp (`"5511999999999"`), TikTok, Threads, Linktree
- `PRODUCTS`: lista de bonés (nome, foto, categoria, preço, descrição). Para adicionar um drop, coloque a foto em
  `assets/img/` e acrescente um item.

## Publicar (GitHub Pages)

Settings → Pages → *Deploy from a branch* → `main` / `(root)` → Save.
O site fica em `https://symbiozyy.github.io/croche777/`.

Também dá para rodar localmente: abra o `index.html` ou use `python3 -m http.server`.
