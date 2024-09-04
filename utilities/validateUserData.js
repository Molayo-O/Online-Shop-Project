//This validates user formData
function isEmpty(value) {
  return !value || value.trim() === "";
}

export function isformDataValid(email, password, name, street, postal) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 5 &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal)
  );
}
