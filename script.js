document.addEventListener("DOMContentLoaded", function () {
  // Load Education/Experience Data
  fetch("./data/education.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("education_experience");

      data.forEach((element) => {
        const educational_data = `
                        <div class="mb-4">
                            <div>
                                <div class="mb-3 linebreak"></div>
                            </div>
                            <h5 class="heading-font" style="text-decoration: none;">${element.position}</h5>
                            <p class="paragraph-font">
                                ${element.company}<br />
                                ${element.duration}
                            </p>
                        </div>
                    `;
        container.innerHTML += educational_data;
      });
    })
    .catch((error) => {
      console.error("Error loading education data:", error);
    });

  // Load Certificate Data
  fetch("./data/certificate.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const certification_showcase = document.getElementById(
        "certificate_showcase"
      );
      data.forEach((element) => {
        const certification_data = `
                        <div class="mb-3">
                            <div>
                                <div class="mb-3 linebreak"></div>
                            </div>
                            <h5 class="heading-font">
                                <a href="${element.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
                                    ${element.certificate}
                                </a>
                            </h5>
                            <p class="paragraph-font">
                                ${element.issurer} (${element.year})
                            </p>
                        </div>
                    `;
        certification_showcase.innerHTML += certification_data;
      });
    })
    .catch((error) => {
      console.error("Error loading certification data:", error);
    });

  // Load Project Data
  fetch("./data/project.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const project_showcase = document.getElementById("project_showcase");
      data.forEach((element) => {
        const project_data = `
                        <div class="col-4 d-flex justify-content-center mb-4">
                                    <div class="project-card shadow">
                                        <!-- photosize 960-560 -->
                                        <img src="${element.photo_dir}"
                                            alt="${element.alt}" />
                                        <p class="title">${element.project_title}</p>
                                        <p class="description">
                                        ${element.description}
                                        </p>
                                    </div>
                                </div>
                    `;
        project_showcase.innerHTML += project_data;
      });
    })
    .catch((error) => {
      console.error("Error loading certification data:", error);
    });
});
