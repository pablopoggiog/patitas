export const validate = (
  email,
  password,
  setSubmittable,
  setWarnings,
  confirmPassword = null
) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (reg.test(email) === false) setSubmittable(false);
  else if (password.length < 6) setSubmittable(false);
  else if (confirmPassword !== null && password !== confirmPassword)
    setSubmittable(false);
  else setSubmittable(true);

  if (!confirmPassword)
    setWarnings({
      email:
        email === ""
          ? null
          : reg.test(email) === false
          ? "Mail inexistente"
          : null,
      password:
        password === ""
          ? null
          : password.length < 6
          ? "La contraseña debe tener al menos 6 caracteres"
          : null,
    });
  else
    setWarnings({
      email:
        email === ""
          ? null
          : reg.test(email) === false
          ? "Mail inexistente"
          : null,
      password:
        password === ""
          ? null
          : password.length < 6
          ? "La contraseña debe tener al menos 6 caracteres"
          : null,
      confirmPassword:
        confirmPassword === ""
          ? null
          : confirmPassword !== password
          ? "Las contraseñas ingresadas no coinciden"
          : null,
    });
};
