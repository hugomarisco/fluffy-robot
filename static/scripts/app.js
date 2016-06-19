function setFormAction(index, actionUrl) {
  const form = document.querySelector(`.form--users--${index}`);

  form.action = actionUrl;

  form.submit();
};
