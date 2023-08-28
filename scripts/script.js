//dom elements
const cardContainer = document.getElementById("cardContainer"),
  loadingDiv = document.getElementById("loadingDiv");

//loading spinner function
const isLoading = (trueOrFalse) => {
  if (trueOrFalse) {
    loadingDiv.classList.remove("hidden");
  } else {
    loadingDiv.classList.add("hidden");
  }
};

//dynamic card set part
const setDynamic = (data) => {
  data.data.map((phone) => {
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

//data fetch function
const loadData = async (url = "?search=13") => {
  isLoading(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones${url}`
  );
  const data = await res.json();
  setDynamic(data);
};
loadData();
