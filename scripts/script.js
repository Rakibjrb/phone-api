//data fetch function
const loadData = async (url = "?search=iphone") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones${url}`
  );
  const data = await res.json();
  console.log(data.data);
};

loadData();
