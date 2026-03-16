const recipes = [
  
  { id:2,  name:"Aloo Paratha", category:"Breakfast", time:"25 min",
    image:"https://static.vecteezy.com/system/resources/previews/054/624/393/non_2x/potato-stuffed-flat-bread-aloo-paratha-traditional-indian-food-wooden-background-top-view-photo.jpg",
    ingredients:["whole wheat flour","potatoes","green chilies","coriander","cumin","butter"],
    instructions:"Boil and mash potatoes, mix with spices and herbs. Stuff inside rolled dough, seal, and roll again. Cook on a hot tawa with butter until golden brown.",
    reviews: [
      { author: "Zainab B.", rating: 5, text: "Tastes just like my Ammi makes it! Perfectly stuffed." },
      { author: "Bilal M.", rating: 4.5, text: "Really good paratha. Best paired with mint raita." },
      { author: "Hadia A.", rating: 4, text: "Loved the crispy edges and generous filling." }
    ]
  },
  
  { id:4,  name:"Chicken Biryani", category:"Dinner", time:"1.5 hrs",
    image:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Hyderabadi_Chicken_Biryani.jpg",
    ingredients:["basmati rice","chicken","yogurt","onions","tomatoes","biryani masala","mint"],
    instructions:"Marinate chicken in yogurt and spices. Fry onions until brown. Cook chicken curry. Layer partially cooked rice over the curry, top with mint, and steam (dum) for 20 mins.",
    reviews: [
      { author: "Saad Q.", rating: 5, text: "The aroma is incredible. Authentic Karachi style biryani!" },
      { author: "Hira M.", rating: 4.5, text: "Spice level was perfect. Rice grains were separate and fluffy." },
      { author: "Tariq P.", rating: 4, text: "Very tasty. Could use a tiny bit more meat, but flavors are 10/10." }
    ]
  },
  
  { id: 5,  name: "Mutton Karahi", category: "Dinner", time: "1 hr",
    image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&w=600&q=80",
    ingredients: ["mutton","tomatoes","green chilies","ginger","garlic","black pepper","oil"],
    instructions: "Cook mutton until tender. In a wok (karahi), fry the meat on high heat with tomatoes, ginger, and garlic until oil separates. Garnish heavily with fresh ginger juliennes and chilies.",
    reviews: [
      { author: "Nida F.", rating: 5, text: "Mutton melts in your mouth. Best karahi I've had outside." },
      { author: "Omer R.", rating: 4.5, text: "Excellent tomato base, perfectly balanced spices." },
      { author: "Mahnoor S.", rating: 4, text: "Really rich and heavy, exactly how a good karahi should be." }
    ]
  },
  { id: 6,  name: "Beef Nihari", category: "Dinner", time: "4 hrs",
    image: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?auto=format&fit=crop&w=600&q=80",
    ingredients: ["beef shank","bone marrow","nihari masala","wheat flour","onions","ghee"],
    instructions: "Slow cook beef shanks and marrow bones with spices overnight or for 4 hours until extremely tender. Thicken the gravy with toasted wheat flour slurry. Serve with lemon and ginger.",
    reviews: [
      { author: "Fahad A.", rating: 5, text: "Incredibly tender meat and perfectly thick, rich gravy." },
      { author: "Zoya K.", rating: 4.5, text: "Very authentic flavor. Needs a fresh, hot kulcha!" },
      { author: "Waleed J.", rating: 4, text: "Great spice blend. Perfect for winter nights." }
    ]
  },
  
  { id: 9,  name: "Zarda (Sweet Rice)", category: "Dessert", time: "45 min",
    image: "https://images.unsplash.com/photo-1633383718081-22ac93e3db65?auto=format&fit=crop&w=600&q=80",
    ingredients: ["sela basmati rice","sugar","food color","ghee","mixed nuts","ashrafi (candied fruit)"],
    instructions: "Boil rice with yellow/orange food color until 90% done. In a separate pan, melt ghee, add cardamom and sugar to make a light syrup. Add rice, dum (steam) for 15 mins. Garnish with nuts.",
    reviews: [
      { author: "Khadija E.", rating: 5, text: "Looks and tastes beautiful. The candied fruits were a great touch." },
      { author: "Jawad B.", rating: 4.5, text: "Classic dawati dessert. Rice grains were perfectly separated." },
      { author: "Osama .", rating: 4, text: "Really good flavor, just the right amount of sweetness." }
    ]
  },
  { id: 10, name: "Samosa Chaat", category: "Snack", time: "20 min",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    ingredients: ["potato samosas","chana masala","yogurt","tamarind chutney","mint chutney","onions"],
    instructions: "Crush hot potato samosas onto a plate. Pour hot chana masala over them. Drizzle generously with whipped yogurt, sweet tamarind chutney, and spicy mint chutney. Top with chopped onions.",
    reviews: [
      { author: "Hassan M", rating: 5, text: "The perfect street food vibe! Chutneys are amazing." },
      { author: "Rida V.", rating: 4.5, text: "Spicy, sweet, and tangy all at once. Loved it." },
      { author: "Imran S.", rating: 4, text: "Great evening snack. Samosas stayed nicely crisp." }
    ]
  }
];

let favorites = JSON.parse(localStorage.getItem("ff_favorites")) || [];

const recipeGrid    = document.getElementById("recipeGrid");
const favGrid       = document.getElementById("favGrid");
const favEmpty      = document.getElementById("favEmpty");
const favBadge      = document.getElementById("favBadge");
const searchInput   = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");
const modalOverlay  = document.getElementById("modalOverlay");
const modalContent  = document.getElementById("modalContent");
const navLinks      = document.querySelectorAll(".nav-link");
const checkboxes    = document.querySelectorAll(".category-filters input[type='checkbox']");

const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
const showMsg = msg => searchMessage.textContent = msg;

function createRecipeCard(recipe) {
  const card = el("article", "recipe-card"); card.dataset.id = recipe.id;

  const img = el("div", "card-image"); 
  img.style.backgroundImage = `url("${recipe.image}")`;
  card.appendChild(img);

  const catTag = el("span", "card-category-tag", recipe.category);
  card.appendChild(catTag);

  const body = el("div", "card-body");
  body.appendChild(el("h3", "card-title", recipe.name));
  body.appendChild(el("p", "card-meta", `${recipe.category} · ⏱ ${recipe.time}`));

  const toggleBtn = el("button", "card-instructions-toggle");
  toggleBtn.innerHTML = `<span class="toggle-arrow">▶</span> Instructions`;
  const inst = el("p", "card-instructions", recipe.instructions);
  toggleBtn.addEventListener("click", e => {
    e.stopPropagation();
    inst.classList.toggle("visible");
    toggleBtn.querySelector(".toggle-arrow").classList.toggle("open");
  });
  body.appendChild(toggleBtn); body.appendChild(inst);
  card.appendChild(body);

  const footer = el("div", "card-footer");
  const isFav = favorites.includes(recipe.id);
  const favBtn = el("button", "btn-fav" + (isFav ? " added" : ""), isFav ? "✓ Saved" : "♡ Favorite");
  favBtn.dataset.id = recipe.id;
  favBtn.addEventListener("click", e => { e.stopPropagation(); handleFavToggle(recipe, favBtn); });

  const viewBtn = el("button", "btn-view", "View");
  viewBtn.addEventListener("click", e => { e.stopPropagation(); openModal(recipe); });

  footer.appendChild(favBtn); footer.appendChild(viewBtn);
  card.appendChild(footer);
  card.addEventListener("click", () => openModal(recipe));
  return card;
}

function renderRecipes(list) {
  while (recipeGrid.firstChild) recipeGrid.removeChild(recipeGrid.firstChild);
  if (!list.length) {
    const nr = el("div", "no-results");
    nr.innerHTML = `<div class="no-results-icon">🔍</div><h3>No recipes found</h3><p>Try a different ingredient or category!</p>`;
    return recipeGrid.appendChild(nr);
  }
  list.forEach((r, i) => { const c = createRecipeCard(r); c.style.animationDelay = `${i * 0.06}s`; recipeGrid.appendChild(c); });
}

function renderFavorites() {
  while (favGrid.firstChild) favGrid.removeChild(favGrid.firstChild);
  favBadge.textContent = favorites.length;
  favBadge.classList.add("bump");
  setTimeout(() => favBadge.classList.remove("bump"), 400);
  favEmpty.style.display = favorites.length ? "none" : "block";

  favorites.forEach(id => {
    const r = recipes.find(x => x.id === id); if (!r) return;
    const fc = el("div", "fav-card"); fc.dataset.favId = r.id;
    
    const fImg = el("div", "fav-image");
    fImg.style.backgroundImage = `url("${r.image}")`;
    fc.appendChild(fImg);

    fc.appendChild(el("h3",  "fav-name",  r.name));
    fc.appendChild(el("p",   "fav-cat",   r.category));
    const rmBtn = el("button", "btn-remove", "✕ Remove");
    rmBtn.addEventListener("click", () => { fc.classList.add("fav-remove-anim"); setTimeout(() => removeFromFav(r.id), 280); });
    fc.appendChild(rmBtn);
    favGrid.appendChild(fc);
  });
}

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const cats  = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
  if (!query && !cats.length) return showMsg("Please enter an ingredient or select a category.");
  showMsg("");
  let res = recipes;
  if (cats.length) res = res.filter(r => cats.includes(r.category));
  if (query) res = res.filter(r => r.name.toLowerCase().includes(query) || r.ingredients.some(i => i.toLowerCase().includes(query)) || r.category.toLowerCase().includes(query));
  const t = document.querySelector(".section-recipes .section-title");
  if (t) t.textContent = res.length ? `${res.length} Result${res.length !== 1 ? "s" : ""} Found` : "No Results";
  renderRecipes(res);
  document.querySelector("#recipes").scrollIntoView({ behavior: "smooth" });
}

function clearSearch() {
  searchInput.value = ""; checkboxes.forEach(c => c.checked = false); showMsg("");
  const t = document.querySelector(".section-recipes .section-title"); if (t) t.textContent = "All Recipes";
  renderRecipes(recipes);
}

function handleFavToggle(recipe, btn) {
  if (favorites.includes(recipe.id)) return showMsg(`"${recipe.name}" is already in your favorites!`);
  favorites.push(recipe.id);
  localStorage.setItem("ff_favorites", JSON.stringify(favorites));
  renderFavorites();
  btn.textContent = "✓ Saved"; btn.classList.add("added"); showMsg("");
}

function removeFromFav(id) {
  favorites = favorites.filter(f => f !== id);
  localStorage.setItem("ff_favorites", JSON.stringify(favorites));
  renderFavorites();
  const cardBtn = recipeGrid.querySelector(`[data-id="${id}"] .btn-fav`);
  if (cardBtn) { cardBtn.textContent = "♡ Favorite"; cardBtn.classList.remove("added"); }
}

function openModal(recipe) {
  modalContent.innerHTML = "";
  
  const mImg = el("div", "modal-image");
  mImg.style.backgroundImage = `url("${recipe.image}")`;
  modalContent.appendChild(mImg);
  
  [el("span","modal-cat-tag",recipe.category), el("h2","modal-title",recipe.name)].forEach(n => modalContent.appendChild(n));
  const meta = el("p"); meta.style.cssText = "font-size:.82rem;color:#888;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:.05em"; meta.textContent = `⏱ ${recipe.time}`; modalContent.appendChild(meta);
  
  modalContent.appendChild(el("p","modal-section-head","Ingredients"));
  const ul = el("ul","modal-ingredients");
  recipe.ingredients.forEach(i => { const li = el("li","",i); ul.appendChild(li); });
  modalContent.appendChild(ul);
  
  modalContent.appendChild(el("p","modal-section-head","Instructions"));
  modalContent.appendChild(el("p","modal-instructions",recipe.instructions));

  modalContent.appendChild(el("p", "modal-section-head", "Customer Reviews"));
  const revWrap = el("div", "reviews-container");
  recipe.reviews.forEach((rev, i) => {
    const rc = el("div", "review-card");
    rc.style.animationDelay = `${i * 0.12}s`;
    
    const starString = "★".repeat(Math.floor(rev.rating)) + (rev.rating % 1 !== 0 ? "½" : "");
    const stars = el("div", "review-stars", starString);
    
    const author = el("div", "review-author", rev.author);
    const text = el("div", "review-text", `"${rev.text}"`);
    rc.append(stars, author, text);
    revWrap.appendChild(rc);
  });
  modalContent.appendChild(revWrap);

  modalOverlay.classList.add("open"); document.body.style.overflow = "hidden";
}

function closeModal() { modalOverlay.classList.remove("open"); document.body.style.overflow = ""; }

document.getElementById("searchBtn").addEventListener("click", performSearch);
document.getElementById("clearBtn").addEventListener("click", clearSearch);
document.getElementById("modalClose").addEventListener("click", closeModal);
searchInput.addEventListener("keydown", e => e.key === "Enter" && performSearch());
modalOverlay.addEventListener("click", e => e.target === modalOverlay && closeModal());
document.addEventListener("keydown", e => e.key === "Escape" && modalOverlay.classList.contains("open") && closeModal());
checkboxes.forEach(cb => cb.addEventListener("change", () => (Array.from(checkboxes).some(c => c.checked) || searchInput.value.trim()) ? performSearch() : clearSearch()));
navLinks.forEach(link => link.addEventListener("click", e => {
  e.preventDefault();
  Array.from(link.parentNode.children).forEach(c => c.classList.remove("active")); link.classList.add("active");
  const s = document.getElementById(link.getAttribute("data-section")); if (s) s.scrollIntoView({ behavior:"smooth" });
}));

document.addEventListener("DOMContentLoaded", () => { renderRecipes(recipes); renderFavorites(); });
