// Helper function to fetch and inject data
function fetchAndRender({ url, containerId, renderFn }) {
  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Network response was not ok for ${url}`);
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById(containerId);
      if (container) {
        data.forEach((item) =>
          container.insertAdjacentHTML("beforeend", renderFn(item))
        );
      }
    })
    .catch((error) => {
      console.error(`Error loading data from ${url}:`, error);
    });
}

// Render functions for each section
function renderEducation(item) {
  return `
    <div class="mb-4">
      <div><div class="mb-3 linebreak"></div></div>
      <h5 class="heading-font m1">${item.position}</h5>
      <p class="paragraph-font m0">${item.company}</p>
      <p class="paragraph-font date">${item.duration}</p>
    </div>
  `;
}

function renderCertificate(item) {
  return `
    <div class="mb-3">
      <div><div class="mb-3 linebreak"></div></div>
      <h5 class="heading-font">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
          ${item.certificate}
        </a>
      </h5>
      <p class="paragraph-font">
        ${item.issurer} (${item.year})
      </p>
    </div>
  `;
}

function renderProject(item, idx) {
  return `
    <div class="col-4 d-flex justify-content-center mb-4">
      <div class="project-card shadow d-flex flex-column h-100">
        <img src="${item.photo_dir}" alt="${item.alt}" loading="lazy"/>
        <p class="title">${item.project_title}</p>
        <p class="description">${item.description}</p>
        <div class="mt-auto d-flex justify-content-end">
          <button class="btn btn-outline-success show-modal-btn" data-index="${idx}">Show</button>
        </div>
      </div>
    </div>
  `;
}

// Modal handling
function showProjectModal(project) {
  const modal = document.getElementById("myModal");
  const modalImagesContainer = modal.querySelector(".project_model");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalDesc = document.getElementById("modalProjectDesc");
  modalImagesContainer.innerHTML = ""; // Clear previous images

  modalTitle.textContent = project.project_title || "";
  modalDesc.textContent = project.description || "";

  if (project.showcase && Array.isArray(project.showcase)) {
    project.showcase.forEach((filename) => {
      const img = document.createElement("img");
      img.src = `assets/projects/student_mangement_system/${filename}`;
      img.alt = project.project_title;
      img.className = "img-fluid shadow py-2 border mb-2";
      modalImagesContainer.appendChild(img);
    });
  } else {
    // Fallback: Show only the main project image
    const img = document.createElement("img");
    img.src = project.photo_dir;
    img.alt = project.project_title;
    img.className = "img-fluid shadow py-2 border mb-2";
    modalImagesContainer.appendChild(img);
  }
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Animation on scroll using IntersectionObserver
function animateSectionsOnScroll() {
  const heroSections = document.querySelectorAll(".hero-section .show");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("visible");
          void entry.target.offsetWidth; // Force reflow to reset animation
          entry.target.classList.add("visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );
  heroSections.forEach((section) => observer.observe(section));
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  // Education & Experience
  fetchAndRender({
    url: "./data/education.json",
    containerId: "education_experience",
    renderFn: renderEducation,
  });

  // Certificates
  fetchAndRender({
    url: "./data/certificate.json",
    containerId: "certificate_showcase",
    renderFn: renderCertificate,
  });

  // Projects
  fetch("./data/project.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((projects) => {
      const project_showcase = document.getElementById("project_showcase");
      if (project_showcase) {
        projects.forEach((project, idx) => {
          project_showcase.insertAdjacentHTML(
            "beforeend",
            renderProject(project, idx)
          );
        });

        // Modal open: Event delegation
        project_showcase.addEventListener("click", function (e) {
          if (e.target.classList.contains("show-modal-btn")) {
            const idx = parseInt(e.target.getAttribute("data-index"), 10);
            showProjectModal(projects[idx]);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error loading project data:", error);
    });

  // Animation for sections on scroll
  animateSectionsOnScroll();

  // CV Button handler
  const cvBtn = document.getElementById("viewCV");
  if (cvBtn) {
    cvBtn.addEventListener("click", function () {
      window.open("assets/my_cv.pdf", "_blank");
    });
  }
});
