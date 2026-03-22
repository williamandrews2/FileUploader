document.querySelectorAll(".delete-form").forEach(function (form) {
  form.addEventListener("submit", (e) => {
    e.stopPropagation();
    const confirmed = confirm(
      "Are you sure you want to delete this? You cannot undo this action!",
    );
    if (!confirmed) {
      e.preventDefault();
    }
  });
});
