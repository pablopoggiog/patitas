export const validate = (
  email,
  password,
  setSubmittable,
  confirmPassword = null
) => {
  console.log("the email is", email);
  console.log("password:", password, "conf", confirmPassword);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    console.log("please use a valid email format");
    setSubmittable(false);
  } else if (password.length < 6) {
    console.log("password should have at least 6 characters");
    setSubmittable(false);
  } else if (confirmPassword !== null && password !== confirmPassword) {
    console.log("passwords don't match");
    setSubmittable(false);
  } else setSubmittable(true);
};
