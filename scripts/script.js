//dom elements
const cardContainer = document.getElementById("cardContainer");

//dynamic card set part
const setDynamic = (data) => {
  data.data.map((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.innerHTML = `<div class="card bg-base-100 shadow-xl">
                  <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                  </figure>
                  <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                      <button class="btn btn-primary">Show Details</button>
                    </div>
                  </div>
                </div>`;
    cardContainer.appendChild(div);
  });
};

//data fetch function
const loadData = async (url = "?search=13") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones${url}`
  );
  const data = await res.json();
  setDynamic(data);
};
loadData();
