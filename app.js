let dataArr = [];

// fetch category
const category = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categories = data.data;
  displayCategory(categories);
};

// display category
const displayCategory = (categories) => {
  const categoryList = document.getElementById("category-list");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add = "inline";
    div.innerHTML = `
        <a class="tab mr-3" onclick="displayCategoryData('${category.category_id}')">${category.category}</a>
        `;
    categoryList.appendChild(div);
  });
};

// display category data
const displayCategoryData = async (categoryId) => {
  // fetch json data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const categoryData = data.data;

  // get id and remove content
  const tabContent = document.getElementById("tab-content");
  tabContent.innerText = "";
  const noContent = document.getElementById("no-content");
  noContent.innerText = "";

  // convert second to hour
  const convertHrsMin = (num) => {
    let hrs = Math.floor(num / 3600);
    let min = Math.floor((num % 3600) / 60);
    return `${hrs}hrs ${min}min`;
  };

  // check data status for display data
  if (data.status === true) {
    // get id and remove content
    const tabContent = document.getElementById("tab-content");
    tabContent.innerText = "";
    const noContent = document.getElementById("no-content");
    noContent.innerText = "";

    categoryData.forEach((data) => {
      //   console.log(data);
      const hrsMin = data.others.posted_date;
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <div class="relative">
                <figure>
                <img
                    src="${data.thumbnail}"
                    alt="Content"
                    class="w-full"
                    />
                </figure>
                ${
                  data.others.posted_date
                    ? `<div class='absolute bg-[#171717] px-1 py-2 text-white right-0 bottom-0 rounded-md'><p>${convertHrsMin(
                        hrsMin
                      )}</p></div>`
                    : ""
                }
                
            </div>
                <div class="card-body">
                    <div class="flex gap-5">
                    <div>
                        <div class="avatar">
                            <div class="w-14 rounded-full">
                                <img
                                src="${data.authors[0].profile_picture}"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="card-title">${data.title}</h2>
                        <p class="text-base">${data.authors[0].profile_name} 
                        ${
                          data.authors[0].verified
                            ? "<img src='./img/verified.png' class='w-5 inline'>"
                            : " "
                        }
                        </p>
                        <small class="text-sm">${
                          data.others.views
                        } views</small>
                    </div>
                    </div>
                </div>
            </div>
      `;
      tabContent.appendChild(div);
    });
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="w-full m-auto text-center p-10">
                <img src="./img/Icon.png" alt="" class="m-auto">
                <h1 class="text-4xl font-extrabold mt-5">Oops!! Sorry, There is no <br> content here</h1>
            </div>
            `;
    noContent.appendChild(div);
  }
};

const displayCategoryDataSort = async (categoryId) => {
  // get id and remove content
  const tabContent = document.getElementById("tab-content");
  tabContent.innerText = "";
  const noContent = document.getElementById("no-content");
  noContent.innerText = "";

  // displayCategoryData(categoryId);

  // fetch json data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const categoryData = data.data;

  const dataSort = categoryData.sort(
    (a, b) =>
      parseFloat(b.others.views.replace("K", "")) -
      parseFloat(a.others.views.replace("K", ""))
  );

  if (data.status === true) {
    // get id and remove content
    const tabContent = document.getElementById("tab-content");
    tabContent.innerText = "";
    const noContent = document.getElementById("no-content");
    noContent.innerText = "";

    // convert second to hour
    const convertHrsMin = (num) => {
      let hrs = Math.floor(num / 3600);
      let min = Math.floor((num % 3600) / 60);
      return `${hrs}hrs ${min}min`;
    };
    dataSort.forEach((data) => {
      //   console.log(data);
      const hrsMin = data.others.posted_date;
      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <div class="relative">
                <figure>
                <img
                    src="${data.thumbnail}"
                    alt="Content"
                    class="w-full"
                    />
                </figure>
                ${
                  data.others.posted_date
                    ? `<div class='absolute bg-[#171717] px-1 py-2 text-white right-0 bottom-0 rounded-md'><p>${convertHrsMin(
                        hrsMin
                      )}</p></div>`
                    : ""
                }
                
            </div>
                <div class="card-body">
                    <div class="flex gap-5">
                    <div>
                        <div class="avatar">
                            <div class="w-14 rounded-full">
                                <img
                                src="${data.authors[0].profile_picture}"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 class="card-title">${data.title}</h2>
                        <p class="text-base">${data.authors[0].profile_name} 
                        ${
                          data.authors[0].verified
                            ? "<img src='./img/verified.png' class='w-5 inline'>"
                            : " "
                        }
                        </p>
                        <small class="text-sm">${
                          data.others.views
                        } views</small>
                    </div>
                    </div>
                </div>
            </div>
      `;
      tabContent.appendChild(div);
    });
  }

};

document.getElementById("sort-view").addEventListener("click", () => {
  displayCategoryDataSort("1000");
});

// default show data
displayCategoryData("1000");

category();
