// fetch category 
const category = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const categories = data.data;
    displayCategory(categories);
}
// display category
const displayCategory = (categories) => {
    const categoryList = document.getElementById("category-list");
    categories.forEach((category) => {
        const div = document.createElement("div");
        div.classList.add = "inline"
        div.innerHTML = `
        <a class="tab mr-3" onclick="displayCategoryData('${category.category_id}')">${category.category}</a>
        `;
        categoryList.appendChild(div);
    });
};


// display category data
const displayCategoryData = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const categoryData = data.data;
  categoryData.forEach((data) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure>
                <img
                src="./img/Icon.png"
                alt="Content"
                />
            </figure>
            <div class="card-body">
                <div class="flex gap-5">
                <div>
                    <div class="avatar online">
                        <div class="w-14 rounded-full">
                            <img
                            src="./img/Icon.png"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="card-title">Building a Winning UX Strategy Using the Kano Model</h2>
                    <p class="text-base">Awlad Hossain <img src="./img/verified.png" class="w-5 inline"></p>
                    <small class="text-sm">91K views</small>
                </div>
                </div>
            </div>
        </div>
      `;
  });
};

// default show data
displayCategoryData("1000");

category();