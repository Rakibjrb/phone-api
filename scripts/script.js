//dom elements
const cardContainer = document.getElementById("cardContainer"),
  searchInput = document.getElementById("searchText"),
  loadingDiv = document.getElementById("loadingDiv"),
  showAllBtnDiv = document.getElementById("showAllBtnDiv");

//loading spinner function
const isLoading = (trueOrFalse) => {
  if (trueOrFalse) {
    loadingDiv.classList.remove("hidden");
  } else {
    loadingDiv.classList.add("hidden");
  }
};

//data fetch function
const loadData = async (url = "iphone") => {
  isLoading(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${url}`
  );
  const data = await res.json();
  setDynamic(data.data);
  console.log(url);
};
loadData();

//dynamic card set part
const setDynamic = (allPhones) => {
  cardContainer.textContent = "";
  phones = allPhones.slice(0);
  phones.map((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `<div id="${phone.slug}" class="card bg-base-100 shadow-xl">
                  <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                  </figure>
                  <div class="card-body items-center text-center">
                    <h2 class="card-title mb-3">${phone.phone_name}</h2>
                    <div class="card-actions">
                      <button class="btn btn-primary">Show Details</button>
                    </div>
                  </div>
                </div>`;
    cardContainer.appendChild(div);
  });
  isLoading(false);
};

const searchHandler = () => {
  const searchText = searchInput.value;
  loadData(searchText);
};
