document.addEventListener("DOMContentLoaded", () => {
  const clearButton = document.querySelector(".clear");
  const filterContainer = document.getElementById("filter-container");
  const jobListing = document.getElementById("job-listing");

  clearButton.addEventListener("click", () => {
    filterContainer.querySelectorAll(".filter-item").forEach((item) => {
      item.remove();
    });
  });

  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      event.target.parentElement.remove();
    } else if (event.target.classList.contains("filter-item")) {
      const filter = event.target.textContent.trim();
      alert(`You clicked on filter: ${filter}`);
      // Redirect to another page or perform any action
      window.location.href = `#${filter}`;
    }
  });

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      displayJobs(data);
    });

  function displayJobs(jobs) {
    jobListing.innerHTML = "";
    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");

      jobCard.innerHTML = `
              <div class="job-card-header">
                  <img src="${job.logo}" alt="${
        job.company
      } Logo" class="company-logo">
                  <div>
                      <span class="company-name">${job.company}</span>
                      <div class="new-featured">
                          ${job.new ? '<span class="new">NEW!</span>' : ""}
                          ${
                            job.featured
                              ? '<span class="featured">FEATURED</span>'
                              : ""
                          }
                      </div>
                  </div>
              </div>
              <h2 class="job-title">${job.position}</h2>
              <ul class="job-details">
                  <li>${job.postedAt}</li>
                  <li>${job.contract}</li>
                  <li>${job.location}</li>
              </ul>
              <div class="job-tags">
                  ${job.languages
                    .map((language) => `<span class="tag">${language}</span>`)
                    .join("")}
                  ${job.tools
                    .map((tool) => `<span class="tag">${tool}</span>`)
                    .join("")}
              </div>
          `;

      jobListing.appendChild(jobCard);
    });

    document.querySelectorAll(".tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        const filterItem = document.createElement("span");
        filterItem.className = "filter-item";
        filterItem.innerHTML = `${tag.textContent} <span class="remove">✕</span>`;
        filterContainer.insertBefore(filterItem, clearButton);
        // Redirect to another page or perform any action
        window.location.href = `#${tag.textContent.trim()}`;
      });
    });
  }
});
