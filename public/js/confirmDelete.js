document.querySelectorAll(".delete-form").forEach(function (form) {
  form.addEventListener("submit", (e) => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (!confirmed) {
      e.preventDefault();
    }
  });
});
