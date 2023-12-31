//get elements by id
const getDom = (id) => document.getElementById(id);

//dom elements
const cardContainer = getDom("cardContainer");
(searchInput = getDom("searchText")),
  (loadingDiv = getDom("loadingDiv")),
  (showAllBtnDiv = getDom("showAllBtnDiv")),
  (dynamic = getDom("dynamicSection")),
  (modalName = getDom("modalName")),
  (image = getDom("modalImage")),
  (storage = getDom("storage")),
  (display = getDom("display")),
  (chipset = getDom("chipset")),
  (memory = getDom("memory")),
  (brand = getDom("brand")),
  (gps = getDom("gps")),
  (releaseDate = getDom("rDate"));

//loading spinner function
const loadingHandler = (isLoading) => {
  if (isLoading) {
    loadingDiv.classList.remove("hidden");
  } else {
    loadingDiv.classList.add("hidden");
  }
};

//data fetch function
const loadData = async (url = "iphone", isShowAll) => {
  loadingHandler(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${url}`
  );
  const data = await res.json();
  setDynamic(data.data, isShowAll);
};
loadData();

//dynamic card set part
const setDynamic = (phones, isShowAll) => {
  cardContainer.textContent = "";

  if (phones.length > 17 && !isShowAll) {
    showAllBtnDiv.classList.remove("hidden");
  } else {
    showAllBtnDiv.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 16);
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `<div id="${phone.slug}" class="card bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title mb-3">${phone.phone_name}</h2>
                      <div class="card-actions">
                        <button onclick="showDetailsHandler('${phone.slug}'), my_modal_1.showModal()" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                  </div>`;
    cardContainer.appendChild(div);
  });
  loadingHandler(false);
};

//search handler function
const searchHandler = (isShowAll) => {
  const searchText = searchInput.value;
  loadData(searchText, isShowAll);
};

//show all btn handler function
const showAllBtnHandler = () => {
  searchHandler(true);
};

//card show details btn handler
const showDetailsHandler = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const allDetails = await res.json();
  details = allDetails.data;
  loadDataToSingleCard(details);
};

//show details card data loader
const loadDataToSingleCard = (phone) => {
  image.src = phone.image;
  modalName.innerText = phone.name;
  brand.innerText = phone.brand;
  storage.innerText = phone.mainFeatures?.storage;
  display.innerText = phone.mainFeatures?.displaySize;
  chipset.innerText = phone.mainFeatures?.chipSet;
  memory.innerText = phone.mainFeatures?.memory;
  gps.innerText = phone.others?.GPS || "no gps";
  releaseDate.innerText = phone.releaseDate || "not showed";
};
