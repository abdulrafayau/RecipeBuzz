
const recipes = [
  { id:1,  name:"Avocado Toast Deluxe",       category:"Breakfast", emoji:"🥑", color:"#6B8C6A", time:"10 min",
    ingredients:["avocado","sourdough bread","cherry tomatoes","feta cheese","lemon","chili flakes"],
    instructions:"Toast sourdough. Mash avocado with lemon, salt, pepper. Spread on toast, top with tomatoes, feta, chili flakes, olive oil." },
  { id:2,  name:"Classic Shakshuka",           category:"Breakfast", emoji:"🍳", color:"#C9622F", time:"25 min",
    ingredients:["eggs","canned tomatoes","bell pepper","onion","garlic","cumin","paprika"],
    instructions:"Sauté onion and pepper. Add garlic and spices. Add tomatoes, simmer 10 min. Make wells, crack in eggs, cover until whites set." },
  { id:3,  name:"Mango Chicken Salad",         category:"Lunch",     emoji:"🥗", color:"#E8A030", time:"20 min",
    ingredients:["chicken breast","mango","mixed greens","cucumber","red onion","lime","honey"],
    instructions:"Grill and slice chicken. Whisk lime, honey, oil for dressing. Toss greens, mango, cucumber, onion. Top with chicken, drizzle dressing." },
  { id:4,  name:"Mushroom Ramen Bowl",         category:"Lunch",     emoji:"🍜", color:"#8B6914", time:"30 min",
    ingredients:["ramen noodles","shiitake mushrooms","soy sauce","miso paste","soft-boiled egg","green onion","sesame oil"],
    instructions:"Rehydrate mushrooms, reserve liquid. Sauté mushrooms. Combine liquid, miso, soy for broth. Cook noodles. Assemble with toppings." },
  { id:5,  name:"Honey Garlic Salmon",         category:"Dinner",    emoji:"🐟", color:"#E8782F", time:"25 min",
    ingredients:["salmon fillets","honey","garlic","soy sauce","butter","lemon","fresh dill"],
    instructions:"Season salmon. Mix honey, garlic, soy, lemon for glaze. Sear 4 min, flip, glaze, bake 200°C for 6–8 min. Garnish with dill." },
  { id:6,  name:"Creamy Tuscan Pasta",         category:"Dinner",    emoji:"🍝", color:"#C9622F", time:"30 min",
    ingredients:["fettuccine","sun-dried tomatoes","spinach","heavy cream","parmesan","garlic","basil"],
    instructions:"Cook fettuccine. Sauté garlic, add tomatoes, pour cream, simmer. Stir in parmesan. Add spinach. Toss pasta, top with basil." },
  { id:7,  name:"Chocolate Lava Cake",         category:"Dessert",   emoji:"🍫", color:"#3D1A0A", time:"40 min",
    ingredients:["dark chocolate","butter","eggs","sugar","flour","vanilla extract"],
    instructions:"Melt chocolate and butter. Whisk eggs, yolks, sugar. Combine, fold in flour. Into ramekins, refrigerate 20 min. Bake 220°C for 12 min." },
  { id:8,  name:"Mango Coconut Panna Cotta",   category:"Dessert",   emoji:"🥭", color:"#F5A623", time:"4.5 hrs",
    ingredients:["coconut milk","mango","gelatin","sugar","vanilla bean","lime zest"],
    instructions:"Bloom gelatin. Heat coconut milk with sugar and vanilla, whisk in gelatin. Chill 4 hrs. Blend mango coulis. Unmould and drizzle." },
  { id:9,  name:"Spicy Guacamole & Chips",     category:"Snack",     emoji:"🫑", color:"#6B8C6A", time:"10 min",
    ingredients:["avocado","jalapeño","lime","cilantro","red onion","tomato","tortilla chips"],
    instructions:"Mash avocados. Mix in jalapeño, onion, tomato, lime, cilantro. Season. Serve with tortilla chips." },
  { id:10, name:"Caprese Bruschetta",          category:"Snack",     emoji:"🍅", color:"#E8302F", time:"15 min",
    ingredients:["baguette","fresh mozzarella","tomatoes","basil","balsamic glaze","olive oil","garlic"],
    instructions:"Toast baguette, rub with garlic. Layer mozzarella and tomatoes. Drizzle olive oil and balsamic. Top with basil and sea salt." },
  { id:11, name:"Korean Bibimbap",             category:"Dinner",    emoji:"🍲", color:"#C9331A", time:"45 min",
    ingredients:["rice","beef","spinach","carrot","zucchini","egg","gochujang","sesame oil"],
    instructions:"Cook rice. Marinate and stir-fry beef. Sauté vegetables separately. Fry egg. Assemble in bowl, top with egg, mix with gochujang." },
  { id:12, name:"Greek Yogurt Parfait",        category:"Breakfast", emoji:"🫐", color:"#5A7A9C", time:"5 min",
    ingredients:["greek yogurt","granola","blueberries","honey","chia seeds","mint"],
    instructions:"Layer yogurt, granola, and blueberries. Drizzle honey, sprinkle chia seeds, garnish with mint. Serve immediately." }
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

  const img = el("div", "card-image"); img.textContent = recipe.emoji;
  img.style.background = recipe.color + "22";
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
    fc.appendChild(el("span", "fav-emoji", r.emoji));
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
  [el("div","modal-emoji",recipe.emoji), el("span","modal-cat-tag",recipe.category), el("h2","modal-title",recipe.name)].forEach(n => modalContent.appendChild(n));
  const meta = el("p"); meta.style.cssText = "font-size:.82rem;color:#888;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:.05em"; meta.textContent = `⏱ ${recipe.time}`; modalContent.appendChild(meta);
  modalContent.appendChild(el("p","modal-section-head","Ingredients"));
  const ul = el("ul","modal-ingredients");
  recipe.ingredients.forEach(i => { const li = el("li","",i); ul.appendChild(li); });
  modalContent.appendChild(ul);
  modalContent.appendChild(el("p","modal-section-head","Instructions"));
  modalContent.appendChild(el("p","modal-instructions",recipe.instructions));
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