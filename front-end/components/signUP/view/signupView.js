class SignUpView extends HTMLElement {
  constructor() {
    super();
    this.card = document.createElement("div");
    this.card.classList.add("card");

    this.card2 = document.createElement("div");
    this.card2.classList.add("card2");

    this.form = document.createElement("form");
    this.form.classList.add("form");

    this.form = document.createElement("form");
    this.form.classList.add("form");

    this.heading = document.createElement("p");
    this.heading.id = "heading";
    this.heading.textContent = "Sign Up";

    this.fieldUserName = document.createElement("div");
    this.fieldUserName.classList.add("field");

    this.inputUserName = document.createElement("input");
    this.inputUserName.setAttribute("autocomplete", "on");
    this.inputUserName.placeholder = "User Name";
    this.inputUserName.classList.add("input-field");
    this.fieldUserName.appendChild(this.inputUserName);

    this.fieldName = document.createElement("div");
    this.fieldName.classList.add("field");

    this.inputName = document.createElement("input");
    this.inputName.setAttribute("autocomplete", "on");
    this.inputName.placeholder = "Name";
    this.inputName.classList.add("input-field");
    this.fieldName.appendChild(this.inputName);

    this.fieldSurname = document.createElement("div");
    this.fieldSurname.classList.add("field");

    this.inputSurname = document.createElement("input");
    this.inputSurname.setAttribute("autocomplete", "on");
    this.inputSurname.placeholder = "Surname";
    this.inputSurname.classList.add("input-field");
    this.fieldSurname.appendChild(this.inputSurname);

    this.fieldCheckPassw = document.createElement("div");
    this.fieldCheckPassw.classList.add("field");

    this.inputCheckPassw = document.createElement("input");
    this.inputCheckPassw.setAttribute("autocomplete", "on");
    this.inputCheckPassw.setAttribute("type", "password");
    this.inputCheckPassw.placeholder = "Check Password";
    this.inputCheckPassw.classList.add("input-field");
    this.fieldCheckPassw.appendChild(this.inputCheckPassw);

    this.fieldPassw = document.createElement("div");
    this.fieldPassw.classList.add("field");

    this.inputPassw = document.createElement("input");
    this.inputPassw.setAttribute("autocomplete", "on");
    this.inputPassw.placeholder = "Password";
    this.inputPassw.setAttribute("type", "password");
    this.inputPassw.classList.add("input-field");
    this.fieldPassw.appendChild(this.inputPassw);

    this.fieldEmail = document.createElement("div");
    this.fieldEmail.classList.add("field");

    this.inputEmail = document.createElement("input");
    this.inputEmail.setAttribute("autocomplete", "on");
    this.inputEmail.setAttribute("type", "email");
    this.inputEmail.placeholder = "Email";
    this.inputEmail.classList.add("input-field");
    this.fieldEmail.appendChild(this.inputEmail);

    this.btnDIV = document.createElement("div");
    this.btnDIV.classList.add("containerBtnSignUp");

    this.buttonSubmit = document.createElement("button");
    this.buttonSubmit.classList.add("btnSignUp");
    this.buttonSubmit.textContent = "SignUp";
    this.btnDIV.appendChild(this.buttonSubmit);

    this.form.appendChild(this.heading);
    this.form.appendChild(this.fieldUserName);
    this.form.appendChild(this.fieldEmail);
    this.form.appendChild(this.fieldName);
    this.form.appendChild(this.fieldSurname);
    this.form.appendChild(this.fieldPassw);
    this.form.appendChild(this.fieldCheckPassw);

    this.form.appendChild(this.btnDIV);
    this.card2.appendChild(this.form);
    this.card.appendChild(this.card2);
    this.appendChild(this.card);
  }
}

customElements.define("x-signupview", SignUpView);

export { SignUpView };
