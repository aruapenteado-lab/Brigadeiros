/* =========================================================
   CAROL BRIGADEIROS — script.js
   JavaScript puro, sem bibliotecas externas.
   ========================================================= */

// ============================================================
// CONFIGURAÇÕES DA EMPRESA
// Edite os valores abaixo para configurar o site.
// ============================================================
const empresa = {
    nome: "Carol Brigadeiros",

    // IMPORTANTE: substitua pelo número real, com DDI+DDD, somente números.
    // Exemplo: "5511987654321"
    whatsapp: "5500000000000",

    instagram: "https://www.instagram.com/brigadeiroscarool/",

    // Preencha para exibir na seção de Contato. Deixe "" para ocultar o campo.
    telefone: "",
    endereco: "",
    horario: ""
};

// ============================================================
// PRODUTOS
// Estrutura de cada produto. Substitua nome, descrição, preço
// e imagem pelos dados reais quando disponíveis.
// Categorias válidas: brigadeiros | bolos | doces | kits | presentes
// O campo "imagem" aponta para o arquivo em assets/images/.
// Enquanto a foto real não existir, um fundo ilustrativo
// aparece automaticamente no lugar (ver photo-frame no CSS).
// ============================================================
const produtos = [
    {
        nome: "Brigadeiro Tradicional",
        categoria: "brigadeiros",
        descricao: "O clássico de sempre: chocolate cremoso finalizado com granulado.",
        preco: "",
        imagem: "assets/images/brigadeiro-01.jpg",
        destaque: true
    },
    {
        nome: "Brigadeiro Gourmet",
        categoria: "brigadeiros",
        descricao: "Receita especial com chocolate belga e acabamento artesanal.",
        preco: "",
        imagem: "assets/images/brigadeiro-02.jpg",
        destaque: true
    },
    {
        nome: "Brigadeiro Trufado",
        categoria: "brigadeiros",
        descricao: "Casquinha crocante e recheio macio, derretendo na boca.",
        preco: "",
        imagem: "assets/images/brigadeiro-03.jpg",
        destaque: true
    },
    {
        nome: "Bolo no Pote",
        categoria: "bolos",
        descricao: "Camadas de bolo macio, recheio cremoso e cobertura especial.",
        preco: "",
        imagem: "assets/images/bolo.jpg",
        destaque: false
    },
    {
        nome: "Bolo Decorado",
        categoria: "bolos",
        descricao: "Bolo personalizado para aniversários e datas comemorativas.",
        preco: "",
        imagem: "assets/images/bolo-decorado.jpg",
        destaque: true
    },
    {
        nome: "Docinhos Finos",
        categoria: "doces",
        descricao: "Seleção de doces finos, ideal para complementar sua mesa de festa.",
        preco: "",
        imagem: "assets/images/doces.jpg",
        destaque: false
    },
    {
        nome: "Kit Festa",
        categoria: "kits",
        descricao: "Sortimento variado de brigadeiros para comemorar em grande estilo.",
        preco: "",
        imagem: "assets/images/kit.jpg",
        destaque: true
    },
    {
        nome: "Kit Presente",
        categoria: "kits",
        descricao: "Caixa especial com seleção de brigadeiros, pronta para presentear.",
        preco: "",
        imagem: "assets/images/kit-presente.jpg",
        destaque: false
    },
    {
        nome: "Caixa Presente Personalizada",
        categoria: "presentes",
        descricao: "Embalagem premium personalizada para a ocasião especial.",
        preco: "",
        imagem: "assets/images/presente.jpg",
        destaque: false
    }
];

// ============================================================
// UTILITÁRIOS DE WHATSAPP
// ============================================================
function linkWhatsapp(mensagem) {
    const texto = encodeURIComponent(mensagem);
    return `https://wa.me/${empresa.whatsapp}?text=${texto}`;
}

function formatarPreco(preco) {
    return preco && preco.trim() !== "" ? preco : "Consulte";
}

// ============================================================
// RENDERIZAÇÃO — CARD DE PRODUTO
// ============================================================
function criarCardProduto(produto) {
    const card = document.createElement("article");
    card.className = "produto-card";
    card.dataset.categoria = produto.categoria;

    const mensagem = `Olá! Tenho interesse no produto ${produto.nome}. Gostaria de saber mais informações.`;

    card.innerHTML = `
        <div class="photo-frame">
            <span class="photo-frame__placeholder" aria-hidden="true">
                <svg viewBox="0 0 100 100" width="52" height="52"><circle cx="50" cy="52" r="26" fill="currentColor" opacity=".5"/></svg>
            </span>
            <img src="${produto.imagem}" alt="${produto.nome} - ${empresa.nome}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="produto-card__body">
            <span class="produto-card__categoria">${rotuloCategoria(produto.categoria)}</span>
            <h3 class="produto-card__nome">${produto.nome}</h3>
            <p class="produto-card__desc">${produto.descricao}</p>
            <div class="produto-card__footer">
                <span class="produto-card__preco">${formatarPreco(produto.preco)}</span>
                <a class="produto-card__btn" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener">Quero encomendar</a>
            </div>
        </div>
    `;
    return card;
}

function rotuloCategoria(categoria) {
    const rotulos = {
        brigadeiros: "Brigadeiros",
        bolos: "Bolos",
        doces: "Doces",
        kits: "Kits",
        presentes: "Presentes"
    };
    return rotulos[categoria] || categoria;
}

function criarCardDestaque(produto) {
    const card = document.createElement("article");
    card.className = "destaque-card";

    card.innerHTML = `
        <div class="photo-frame">
            <span class="photo-frame__placeholder" aria-hidden="true">
                <svg viewBox="0 0 100 100" width="52" height="52"><circle cx="50" cy="52" r="26" fill="currentColor" opacity=".5"/></svg>
            </span>
            <img src="${produto.imagem}" alt="${produto.nome} - ${empresa.nome}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="destaque-card__info">
            <h3 class="destaque-card__nome">${produto.nome}</h3>
            <p class="destaque-card__desc">${produto.descricao}</p>
        </div>
    `;
    return card;
}

// ============================================================
// RENDERIZAR PRODUTOS E DESTAQUES NA PÁGINA
// ============================================================
function renderizarProdutos(categoria = "todos") {
    const grid = document.getElementById("produtosGrid");
    grid.innerHTML = "";

    const lista = categoria === "todos"
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    if (lista.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:rgba(90,46,46,.6);">Nenhum produto encontrado nesta categoria.</p>`;
        return;
    }

    lista.forEach(produto => grid.appendChild(criarCardProduto(produto)));
}

function renderizarDestaques() {
    const grid = document.getElementById("destaquesGrid");
    grid.innerHTML = "";
    const destaques = produtos.filter(p => p.destaque).slice(0, 6);
    destaques.forEach(produto => grid.appendChild(criarCardDestaque(produto)));
}

// ============================================================
// FILTRO DE PRODUTOS
// ============================================================
function iniciarFiltros() {
    const botoes = document.querySelectorAll(".filtro-btn");
    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            botoes.forEach(b => {
                b.classList.remove("is-active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("is-active");
            btn.setAttribute("aria-selected", "true");
            renderizarProdutos(btn.dataset.categoria);
        });
    });
}

// ============================================================
// INSTAGRAM — GRADE VISUAL (imagens locais, sem API)
// ============================================================
function renderizarInstagram() {
    const grid = document.getElementById("instagramGrid");
    grid.innerHTML = "";

    for (let i = 1; i <= 6; i++) {
        const item = document.createElement("a");
        item.className = "instagram-item";
        item.href = empresa.instagram;
        item.target = "_blank";
        item.rel = "noopener";
        item.setAttribute("aria-label", "Ver publicação no Instagram");

        item.innerHTML = `
            <div class="photo-frame">
                <span class="photo-frame__placeholder" aria-hidden="true">
                    <svg viewBox="0 0 100 100" width="34" height="34"><circle cx="50" cy="52" r="24" fill="currentColor" opacity=".45"/></svg>
                </span>
                <img src="assets/images/instagram-${i}.jpg" alt="Publicação ${i} do Instagram @brigadeiroscarool" loading="lazy" onerror="this.style.display='none'">
            </div>
        `;
        grid.appendChild(item);
    }
}

// ============================================================
// MENU MOBILE
// ============================================================
function iniciarMenuMobile() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");
    const overlay = document.getElementById("navOverlay");

    function abrirMenu() {
        nav.classList.add("is-open");
        overlay.classList.add("is-active");
        hamburger.classList.add("is-active");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function fecharMenu() {
        nav.classList.remove("is-open");
        overlay.classList.remove("is-active");
        hamburger.classList.remove("is-active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
        nav.classList.contains("is-open") ? fecharMenu() : abrirMenu();
    });

    overlay.addEventListener("click", fecharMenu);

    nav.querySelectorAll(".nav__link").forEach(link => {
        link.addEventListener("click", fecharMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 980) fecharMenu();
    });
}

// ============================================================
// LINKS DE WHATSAPP (botões espalhados pelo site)
// ============================================================
function iniciarLinksWhatsapp() {
    const mapa = [
        { id: "btnEncomendaHeader", msg: "Olá! Gostaria de fazer uma encomenda." },
        { id: "btnEncomendaHero", msg: "Olá! Gostaria de fazer uma encomenda." },
        { id: "btnPedido", msg: "Olá! Gostaria de fazer um pedido do cardápio." },
        { id: "btnEventos", msg: "Olá! Gostaria de informações sobre encomendas para um evento." },
        { id: "btnEncomendaFinal", msg: "Olá! Gostaria de fazer uma encomenda." },
        { id: "btnFalarWhats", msg: "Olá! Gostaria de mais informações sobre os brigadeiros." },
        { id: "linkWhats", msg: "Olá! Gostaria de mais informações sobre os brigadeiros." },
        { id: "linkWhatsFooter", msg: "Olá! Gostaria de mais informações sobre os brigadeiros." },
        { id: "whatsappFloat", msg: "Olá! Gostaria de mais informações sobre os brigadeiros." }
    ];

    mapa.forEach(({ id, msg }) => {
        const el = document.getElementById(id);
        if (el) {
            el.href = linkWhatsapp(msg);
            el.target = "_blank";
            el.rel = "noopener";
        }
    });
}

// ============================================================
// SEÇÃO DE CONTATO — preencher dinamicamente
// ============================================================
function iniciarContato() {
    const contatoWhats = document.getElementById("contatoWhats");
    if (contatoWhats) {
        contatoWhats.textContent = empresa.whatsapp && empresa.whatsapp !== "5500000000000"
            ? "Atendimento rápido e direto pelo WhatsApp."
            : "Fale conosco diretamente pelo WhatsApp.";
    }

    preencherCampo("itemTelefone", "contatoTelefone", empresa.telefone);
    preencherCampo("itemHorario", "contatoHorario", empresa.horario);

    if (empresa.endereco && empresa.endereco.trim() !== "") {
        document.getElementById("itemEndereco").hidden = false;
        document.getElementById("contatoEndereco").textContent = empresa.endereco;
        const linkMaps = document.getElementById("linkMaps");
        linkMaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(empresa.endereco)}`;
    }
}

function preencherCampo(idItem, idTexto, valor) {
    if (valor && valor.trim() !== "") {
        document.getElementById(idItem).hidden = false;
        document.getElementById(idTexto).textContent = valor;
    }
}

// ============================================================
// ANIMAÇÃO DE ENTRADA DAS SEÇÕES (fade-in ao rolar a página)
// ============================================================
function iniciarRevelacaoSecoes() {
    const alvos = document.querySelectorAll(
        ".sobre__container, .section-header, .destaques__grid, .eventos__container, .instagram__grid, .contato__grid"
    );
    alvos.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("is-visible");
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    alvos.forEach(el => observer.observe(el));
}

// ============================================================
// RODAPÉ — ANO ATUAL
// ============================================================
function iniciarAnoRodape() {
    const span = document.getElementById("anoAtual");
    if (span) span.textContent = new Date().getFullYear();
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    renderizarDestaques();
    renderizarProdutos();
    renderizarInstagram();
    iniciarFiltros();
    iniciarMenuMobile();
    iniciarLinksWhatsapp();
    iniciarContato();
    iniciarRevelacaoSecoes();
    iniciarAnoRodape();
});
