document.addEventListener("DOMContentLoaded", () => {
  const clearButton = document.querySelector(".clear");
  const filterContainer = document.querySelector(".filter-container");

  clearButton.addEventListener("click", () => {
    filterContainer.querySelectorAll(".filter-item").forEach((item) => {
      item.remove();
    });
  });

  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      event.target.parentElement.remove();
    }
  });

  document.querySelectorAll(".tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      const filterItem = document.createElement("span");
      filterItem.className = "filter-item";
      filterItem.innerHTML = `${tag.textContent} <span class="remove">✕</span>`;
      filterContainer.insertBefore(filterItem, clearButton);
    });
  });
});
