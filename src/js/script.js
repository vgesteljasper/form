let $form;
let $inputs;

const handleInputChange = (event, checkFunction) => {
  let $field = event.currentTarget;
  if (event.type === "blur") {
    checkFunction($field);
  } else if (event.type === "input") {
    console.log("typing");
    if ($field.validity.valid) {
      $field.parentNode.querySelector(".form__error").textContent = "";
    }
  }
};

const checkText = $field => {
  console.log("checkText", $field.parentNode.querySelector(".form__error"));
  $field.parentNode.querySelector(".form__error").textContent = valueMissing(
    $field
  );
};

const checkGeneral = $field => {
  if (valueMissing($field)) {
    $field.parentNode.querySelector(".form__error").textContent = valueMissing(
      $field
    );
  } else if (typeMismatch($field)) {
    $field.parentNode.querySelector(".form__error").textContent = typeMismatch(
      $field
    );
  }
};

const valueMissing = $field =>
  $field.validity.valueMissing ? "required field" : "";

const typeMismatch = $field =>
  $field.validity.typeMismatch ? "invalid email address" : "";

const handleSendForm = event => {
  event.preventDefault();

  if (!$form.checkValidity()) {
    for (let i = 0; i < $inputs.length; i++) {
      if (
        $inputs[i].dataset.type === "email" ||
        $inputs[i].dataset.type === "phone"
      )
        checkGeneral($inputs[i]);
      if ($inputs[i].dataset.type === "text") checkText($inputs[i]);
    }
  } else {
    $form.submit();
  }
};

const toggleFocus = event => {
  event.preventDefault();
  const $parent = event.currentTarget.parentElement;

  if (event.type === "focus") $parent.classList.add("form__item_focus");
  else $parent.classList.remove("form__item_focus");
};

const init = () => {
  $form = document.querySelector(".contact__form");
  $inputs = document.querySelectorAll(".form__item .form__input");

  $form.noValidate = true;

  for (let i = 0; i < $inputs.length; i++) {
    $inputs[i].addEventListener("focus", toggleFocus);
    $inputs[i].addEventListener("blur", toggleFocus);

    if (!$inputs[i].dataset.type) return;

    /* prettier-ignore */
    if ($inputs[i].dataset.type === "email") {
      $inputs[i].addEventListener("input", event => handleInputChange(event, checkGeneral));
      $inputs[i].addEventListener("blur", event => handleInputChange(event, checkGeneral));
    }

    /* prettier-ignore */
    if ($inputs[i].dataset.type === "text") {
      $inputs[i].addEventListener("input", event => handleInputChange(event, checkText));
      $inputs[i].addEventListener("blur", event => handleInputChange(event, checkText));
    }

    /* prettier-ignore */
    if ($inputs[i].dataset.type === "phone") {
      $inputs[i].addEventListener("input", event => handleInputChange(event, checkGeneral));
      $inputs[i].addEventListener("blur", event => handleInputChange(event, checkGeneral));
    }

    $form.addEventListener("submit", handleSendForm);
  }
};

init();
