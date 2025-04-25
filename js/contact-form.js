(function () {
  // const dateField = document.querySelector("#date-field");
  // const date = document.querySelector("#date");

  // function dateFieldSwitch() {
  //   dateField.style.display = "none";
  //   date.style.display = "block";
  // }

  // dateField.addEventListener("focus", dateFieldSwitch);

  const form = document.getElementById("contact-form");
  async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("contacts__form--status");
    const data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thank you for your inquiry! We'll get in touch with you asap!";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops, something went wrong. Please try other contact options";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML =
          "ВOops, something went wrong. Please try other contact options";
      });
  }
  form.addEventListener("submit", handleSubmit);
})();
