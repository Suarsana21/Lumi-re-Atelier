// Data Produk
const products = [
  {
    id: 1,
    name: "Élégance Silk Dress",
    category: "dresses",
    price: "Rp 459.000",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop",
    desc: "Gaun sutra premium dengan potongan A-line yang anggun. Bahan jatuh, dingin di kulit, dan tidak menerawang.",
  },
  {
    id: 2,
    name: "Classy Tailored Blazer",
    category: "outerwear",
    price: "Rp 529.000",
    img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=500&auto=format&fit=crop",
    desc: "Blazer terstruktur berbahan semi-wool premium. Cocok dipadukan untuk tampilan profesional maupun casual-chic.",
  },
  {
    id: 3,
    name: "Minimalist Linen Trousers",
    category: "workwear",
    price: "Rp 389.000",
    img: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=500&auto=format&fit=crop",
    desc: "Celana bahan katun linen organik bermodel high-waist. Sangat nyaman untuk aktivitas seharian di kantor.",
  },
  {
    id: 4,
    name: "Cozy Knit Cardigan",
    category: "outerwear",
    price: "Rp 349.000",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=500&auto=format&fit=crop",
    desc: "Outwear rajut halus dengan nuansa warna bumi (earth tone). Memberikan kesan hangat dan effortless.",
  },
];

const modalOverlay = document.getElementById("quickview-modal");

modalOverlay.addEventListener("click", function (event) {
  // Memastikan klik terjadi tepat di area overlay hitam, bukan di dalam modal-body
  if (event.target === modalOverlay) {
    closeModal();
  }
});

let selectedSize = "S";
let currentProduct = null;

// Render Katalog Produk
function renderCatalog(items) {
  const grid = document.getElementById("catalog-grid");
  grid.innerHTML = "";

  items.forEach((product) => {
    grid.innerHTML += `
                    <div class="product-card">
                        <img src="${product.img}" class="product-img" alt="${product.name}">
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-price">${product.price}</p>
                            <button class="btn btn-primary" style="padding: 8px 18px; font-size: 0.8rem;" onclick="openQuickView(${product.id})">
                                Quick View
                            </button>
                        </div>
                    </div>
                `;
  });
}

// Filter Produk
function filterProduct(category) {
  // Ubah button active
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (category === "all") {
    renderCatalog(products);
  } else {
    const filtered = products.filter((p) => p.category === category);
    renderCatalog(filtered);
  }
}

// Quick View Modal
function openQuickView(id) {
  currentProduct = products.find((p) => p.id === id);
  selectedSize = "S"; // Reset size ke S

  // Reset active state tombol size
  document
    .querySelectorAll(".size-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelectorAll(".size-btn")[0].classList.add("active");

  // Set data modal
  document.getElementById("modal-img").src = currentProduct.img;
  document.getElementById("modal-title").innerText = currentProduct.name;
  document.getElementById("modal-price").innerText = currentProduct.price;
  document.getElementById("modal-desc").innerText = currentProduct.desc;

  updateWaLink();

  document.getElementById("quickview-modal").classList.add("active");
}

function closeModal() {
  document.getElementById("quickview-modal").classList.remove("active");
}

function selectSize(element, size) {
  document
    .querySelectorAll(".size-btn")
    .forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
  selectedSize = size;
  updateWaLink();
}

// Generate WA Link Otomatis
function updateWaLink() {
  const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Toko
  const message = `Halo Lumière, aku mau tanya stok ${currentProduct.name} size ${selectedSize}`;
  const encodedMessage = encodeURIComponent(message);

  const waBtn = document.getElementById("modal-wa-btn");
  waBtn.onclick = function () {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };
}

// Load Pertama Kali
renderCatalog(products);
