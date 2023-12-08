$(document).ready(function () {

  // Phone validation code
  const phone_input = document.querySelector("#phone");
  const errorMsg = document.querySelector("#error-msg");
  const validMsg = document.querySelector("#valid-msg");

  // here, the index maps to the error code returned from getValidationError - see readme
  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  const input = document.querySelector("#phone");
  window.intlTelInput(phone_input, {
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
  });

  const iti = intlTelInput(input);

  const reset = () => {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
  };

  // on input: validate
  input.addEventListener("input", () => {
    //   reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("hide");

        errorMsg.classList.add("hide");

        const validNumber = iti.getNumber();
        console.log(validNumber);
      } else {
        errorMsg.classList.add("error");
        let errorCode = iti.getValidationError();
        if(errorCode === -99) {
          errorCode = 2;
        }
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("hide");
        validMsg.classList.add("hide");
      }
    }
  });
  input.addEventListener("input", (ev) => {
    if (ev.target.value === "") {
      reset();
    }
  });
  $(".iti__flag-container li").on("click", () => {
    reset();
    input.value = "";
  });
});