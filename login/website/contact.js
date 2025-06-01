document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".login-main-btn");
    const dropdownContent = document.querySelector(".dropdown-content");
  
    loginBtn.addEventListener("click", () => {
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
    });
  
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        dropdownContent.style.display = "none";
      }
    });
  });
  