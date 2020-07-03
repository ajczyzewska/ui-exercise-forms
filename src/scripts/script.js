const instruction = document.querySelector(".help");
const wrongEmail = document.querySelector(".wrong-email");
const email_address_provided = document.querySelector(".email");
const noEmail = document.querySelector(".no-email");
const success = document.querySelector(".success-email");

const examples = [
  "koosvandermerwe@space48.com",
  "erika.mustermann@space48.com",
  "john.doe@space48.com",
  "joe.bloggs@space48.com",
];

// Showing/ Hiding Reset Password instruction

document.querySelector(".need-help").addEventListener("click", (e) => {
  instruction.classList.toggle("hidden");
});

// Posting Email to DB  & checking if email is valid
document.querySelector(".reset").addEventListener("click", (e) => {
  if (validate(email_address_provided.value)) {
    let data = { email: email_address_provided.value };
    console.log(data);
    const options = {
      method: "POST",
      body: JSON.stringify(data),
    };
    const responseHandling = (response) => {
      if (!response.ok) throw Error("Ooops, Something went wrong");
      if (response.status === 200) {
        success.classList.toggle("hidden");
      }
      if (response.status === 404) {
        noEmail.classList.toggle("hidden");
      }
    };

    fetch("http://localhost:3005/customer/account/resetPassword", options)
      .then(responseHandling)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate(email) {
  if (!validateEmail(email)) {
    wrongEmail.classList.toggle("hidden");
    return false;
  }
  return true;
}
