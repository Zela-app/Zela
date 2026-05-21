// =============================================================
//  login.js — Zela · Segurança Inteligente
//  Controla o formulário de login, validação e envio via fetch()
// =============================================================

const API_BASE_URL = "http://localhost:8080";
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;

// ---- Referências aos elementos ----
const loginForm    = document.getElementById("loginForm");
const emailInput   = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError   = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const feedbackMsg  = document.getElementById("feedback-msg");
const submitBtn    = document.getElementById("submitBtn");
const btnLabel     = submitBtn.querySelector(".btn-label");
const btnLoading   = submitBtn.querySelector(".btn-loading");
const togglePwd    = document.getElementById("togglePwd");

// ---- Utilitários ----

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(inputEl, errorEl, msg) {
  inputEl.classList.add("error-field");
  errorEl.textContent = "";

  // Reconstrói com ícone
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-circle-exclamation";
  errorEl.appendChild(icon);
  errorEl.appendChild(document.createTextNode(" " + msg));
  errorEl.style.display = "flex";
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove("error-field");
  errorEl.style.display = "none";
}

function showFeedback(type, msg) {
  feedbackMsg.className = `feedback ${type}`;
  feedbackMsg.innerHTML = type === "success"
    ? `<i class="fa-solid fa-circle-check"></i> ${msg}`
    : `<i class="fa-solid fa-triangle-exclamation"></i> ${msg}`;
  feedbackMsg.classList.remove("hidden");
}

function hideFeedback() {
  feedbackMsg.classList.add("hidden");
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  btnLabel.classList.toggle("hidden", isLoading);
  btnLoading.classList.toggle("hidden", !isLoading);
}

// ---- Validação em tempo real ----

emailInput.addEventListener("input", () => {
  if (emailInput.value.trim() === "" || EMAIL_REGEX.test(emailInput.value.trim())) {
    clearError(emailInput, emailError);
  }
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length > 0) {
    clearError(passwordInput, passwordError);
  }
});

// ---- Mostrar/ocultar senha ----

togglePwd.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePwd.querySelector("i").className = isPassword
    ? "fa-solid fa-eye-slash"
    : "fa-solid fa-eye";
  togglePwd.setAttribute("aria-label", isPassword ? "Ocultar senha" : "Mostrar senha");
});

// ---- Validação completa antes do envio ----

function validateForm() {
  let isValid = true;

  const emailVal = emailInput.value.trim();
  if (!emailVal || !EMAIL_REGEX.test(emailVal)) {
    showError(emailInput, emailError, "Por favor, insira um e-mail válido.");
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  const passwordVal = passwordInput.value;
  if (!passwordVal || passwordVal.length === 0) {
    showError(passwordInput, passwordError, "A senha não pode estar vazia.");
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  return isValid;
}

// ---- Envio do formulário ----

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideFeedback();

  if (!validateForm()) return;

  const payload = {
    email:    emailInput.value.trim(),
    password: passwordInput.value,
  };

  console.log("[Zela Login] Enviando dados:", JSON.stringify(payload, null, 2));

  setLoading(true);

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log("[Zela Login] Sucesso:", data);
      showFeedback("success", "Login realizado com sucesso! Redirecionando…");

      // Guarda o token se vier no payload (ajuste conforme seu backend)
      if (data.token) {
        localStorage.setItem("zela_token", data.token);
      }

      // Redireciona após breve delay
      setTimeout(() => {
        window.location.href = "./dashboard.html"; // ajuste para a rota correta
      }, 1500);
    } else {
      const msg = data?.message || "E-mail ou senha incorretos. Tente novamente.";
      console.warn("[Zela Login] Erro da API:", msg);
      showFeedback("error", msg);
    }
  } catch (err) {
    console.error("[Zela Login] Falha na requisição:", err);
    showFeedback("error", "Não foi possível conectar ao servidor. Tente novamente mais tarde.");
  } finally {
    setLoading(false);
  }
});

// ---- Link "Esqueceu a senha?" ----

document.getElementById("forgotLink").addEventListener("click", (e) => {
  e.preventDefault();
  // Substitua pela rota real de recuperação de senha
  alert("Funcionalidade de recuperação de senha em breve.");
});