const schema = {
  firstName: Joi.string().min(2).max(17),
  lastName: Joi.string().min(3).max(17),
  town: Joi.string().min(2).max(58),
  postCode: Joi.string().alphanum().min(5).max(7),
  email: Joi.string().email(),
  age: Joi.string().min(0),
  jobDesc: Joi.string().min(3).max(50),
};

const ref = document.getElementById("form");

const userInput = {};
let typeTimer;

ref.addEventListener("input", (e) => {
  userInput[e.target.name] = e.target.value;

  console.log(userInput);

  Joi.validate(userInput, schema, { abortEarly: false }, (errors, results) => {
    const errMod = {};

    if (errors) {
      errors.details.forEach((error) => {
        errMod[error.context.key] = error.message;
      });
    }

    const errorRefs = document.querySelectorAll(".err");
    Array.from(errorRefs).forEach((error) => {
      error.innerHTML = "";
    });

    for (const error in errMod) {
      if (e.target.value.length > 3) {
        error.innerHTML = "";
      } else {
        clearTimeout(typeTimer);

        typeTimer = setTimeout(() => {
          document.getElementById(`${error}Err`).innerHTML = errMod[error];
        }, 3000);
      }
    }
  });
});

ref.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);
});
