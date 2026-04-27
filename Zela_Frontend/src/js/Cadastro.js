// =============================================================
//  Cadastro.js — Zela
//  Controla o formulário de cadastro multi-etapas e
//  envia os dados para o back-end Spring Boot via fetch()
// =============================================================

// -------------------------------------------------------------
// 1. CONFIGURAÇÃO
// -------------------------------------------------------------
const API_BASE_URL = "http://localhost:8080"; // desenvolvimento
// const API_BASE_URL = "https://api.zela.com.br"; // produção


// -------------------------------------------------------------
// 2. ESTADO
// -------------------------------------------------------------
let currentStep = 1;
const totalSteps = 3;


// -------------------------------------------------------------
// 3. POPULA OS SELECTS DE DIA E ANO DINAMICAMENTE
// -------------------------------------------------------------
function populateDateSelects() {
    // Dias 1–31
    const daySelect = document.getElementById("day");
    if (daySelect) {
        for (let d = 1; d <= 31; d++) {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = String(d).padStart(2, "0");
            daySelect.appendChild(opt);
        }
    }

    // Anos: ano atual até 1900
    const yearSelect = document.getElementById("year");
    if (yearSelect) {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear; y >= 1900; y--) {
            const opt = document.createElement("option");
            opt.value = y;
            opt.textContent = y;
            yearSelect.appendChild(opt);
        }
    }
}


// -------------------------------------------------------------
// 4. NAVEGAÇÃO ENTRE ETAPAS
// FIX: corrigida lógica duplicada do indicador e da linha ao voltar
// -------------------------------------------------------------
function changeStep(direction) {
    if (direction === 1 && !validateStep(currentStep)) return;

    // Guarda a etapa ANTES de mudar (necessário para corrigir a linha ao voltar)
    const previousStep = currentStep;

    // Marca etapa atual como concluída ao avançar
    if (direction === 1) {
        const indicator = document.getElementById(`indicator-${currentStep}`);
        if (indicator) {
            indicator.classList.remove("ativa", "active");
            indicator.classList.add("concluida", "completed");
        }
        const line = document.getElementById(`line-${currentStep}`);
        if (line) line.style.width = "100%";
    }

    // Esconde a seção atual
    const currentSection = document.getElementById(`etapa-${currentStep}`);
    if (currentSection) currentSection.classList.remove("active");

    // Atualiza o número da etapa
    currentStep += direction;

    // Mostra a nova seção
    const nextSection = document.getElementById(`etapa-${currentStep}`);
    if (nextSection) nextSection.classList.add("active");

    // Ativa o indicador da nova etapa
    const nextIndicator = document.getElementById(`indicator-${currentStep}`);
    if (nextIndicator) {
        nextIndicator.classList.remove("concluida", "completed");
        nextIndicator.classList.add("ativa", "active");
    }

    // FIX: ao voltar, apaga a linha da etapa que acabamos de DEIXAR (previousStep),
    // não da etapa para onde voltamos
    if (direction === -1) {
        const line = document.getElementById(`line-${previousStep}`);
        if (line) line.style.width = "0%";
    }

    updateButtons();
}

function updateButtons() {
    const prevBtn   = document.getElementById("prevBtn");
    const nextBtn   = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    if (prevBtn)   prevBtn.classList.toggle("hidden", currentStep === 1);

    if (currentStep === totalSteps) {
        if (nextBtn)   nextBtn.classList.add("hidden");
        if (submitBtn) submitBtn.classList.remove("hidden");
    } else {
        if (nextBtn)   nextBtn.classList.remove("hidden");
        if (submitBtn) submitBtn.classList.add("hidden");
    }
}


// -------------------------------------------------------------
// 5. VALIDAÇÃO POR ETAPA
// -------------------------------------------------------------
function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        // Nome
        const name = document.getElementById("name");
        if (!name || name.value.trim().length < 3) {
            showError("name-error", "name");
            isValid = false;
        } else {
            hideError("name-error", "name");
        }

        // CPF
        const cpf = document.getElementById("cpf");
        if (!cpf || !isValidCPF(cpf.value)) {
            showError("cpf-error", "cpf");
            isValid = false;
        } else {
            hideError("cpf-error", "cpf");
        }

        // Data de nascimento — FIX: validação de valores reais (selects)
        const day   = document.getElementById("day");
        const month = document.getElementById("month");
        const year  = document.getElementById("year");
        const dateValid = day?.value && month?.value && year?.value;
        if (!dateValid) {
            showError("date-error", null);
            [day, month, year].forEach(el => {
                if (el && !el.value) el.classList.add("error");
            });
            isValid = false;
        } else {
            hideError("date-error", null);
            [day, month, year].forEach(el => el?.classList.remove("error"));
        }
    }

    if (step === 2) {
        // E-mail
        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.value.trim())) {
            showError("email-error", "email");
            isValid = false;
        } else {
            hideError("email-error", "email");
        }

        // Telefone
        const phone = document.getElementById("phone");
        if (!phone || phone.value.replace(/\D/g, "").length < 10) {
            showError("telefone-error", "phone");
            isValid = false;
        } else {
            hideError("telefone-error", "phone");
        }
    }

    if (step === 3) {
        const password = document.getElementById("password");
        // FIX: id corrigido para "confirme-password" (igual ao HTML)
        const confirm  = document.getElementById("confirme-password");
        const terms    = document.getElementById("terms");

        const senhaOk = password?.value.length >= 8 && password.value === confirm?.value;
        if (!senhaOk) {
            showError("password-error", "password");
            isValid = false;
        } else {
            hideError("password-error", "password");
        }

        if (!terms?.checked) {
            showError("terms-error", null);
            isValid = false;
        } else {
            hideError("terms-error", null);
        }
    }

    return isValid;
}

function showError(errorId, inputId) {
    const errorEl = errorId ? document.getElementById(errorId) : null;
    const inputEl = inputId ? document.getElementById(inputId) : null;
    if (errorEl) errorEl.style.display = "block";
    if (inputEl) inputEl.classList.add("error");
}

function hideError(errorId, inputId) {
    const errorEl = errorId ? document.getElementById(errorId) : null;
    const inputEl = inputId ? document.getElementById(inputId) : null;
    if (errorEl) errorEl.style.display = "none";
    if (inputEl) inputEl.classList.remove("error");
}


// -------------------------------------------------------------
// 6. VALIDAÇÃO DE CPF (algoritmo oficial)
// -------------------------------------------------------------
function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf[10]);
}


// -------------------------------------------------------------
// 7. MÁSCARAS DE INPUT
// -------------------------------------------------------------
function applyMasks() {
    const cpfInput = document.getElementById("cpf");
    if (cpfInput) {
        cpfInput.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = v;
        });
    }

    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/(\d{2})(\d)/, "($1) $2");
            v = v.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
            e.target.value = v;
        });
    }
}


// -------------------------------------------------------------
// 8. MOSTRAR / OCULTAR SENHA
// -------------------------------------------------------------
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    // Troca o ícone do botão
    const btn = input.parentElement.querySelector(".toggle-password i");
    if (btn) {
        btn.classList.toggle("fa-eye",        !isPassword);
        btn.classList.toggle("fa-eye-slash",   isPassword);
    }
}


// -------------------------------------------------------------
// 9. MODAIS
// -------------------------------------------------------------
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("open");
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("open");
}

// Fecha modal ao clicar fora
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.classList.remove("open");
    }
});


// -------------------------------------------------------------
// 10. ENVIO DO FORMULÁRIO → SPRING BOOT
// FIX: valida todas as etapas antes de enviar (não só a 3ª)
// FIX: erros exibidos inline, sem alert()
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    populateDateSelects();
    applyMasks();
    updateButtons();

    const form = document.getElementById("cadastroForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Valida todas as etapas antes de enviar
        const allValid = validateStep(1) && validateStep(2) && validateStep(3);
        if (!allValid) return;

        const day   = document.getElementById("day")?.value.padStart(2, "0");
        const month = document.getElementById("month")?.value.padStart(2, "0");
        const year  = document.getElementById("year")?.value;

        const payload = {
            nomeCompleto:   document.getElementById("name")?.value.trim(),
            cpf:            document.getElementById("cpf")?.value.replace(/\D/g, ""),
            dataNascimento: `${year}-${month}-${day}`,
            email:          document.getElementById("email")?.value.trim().toLowerCase(),
            telefone:       document.getElementById("phone")?.value.replace(/\D/g, ""),
            senha:          document.getElementById("password")?.value,
        };

        showScreen("loading-screen");

        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/cadastrar`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(payload),
            });

            if (response.ok) {
                const nameDisplay = document.getElementById("user-name-display");
                if (nameDisplay) {
                    nameDisplay.textContent = payload.nomeCompleto.split(" ")[0];
                }
                showScreen("success-screen");

            } else {
                const errorData = await response.json().catch(() => null);
                const mensagem  = errorData?.mensagem || errorData?.message || "Erro ao cadastrar. Tente novamente.";
                showScreen("form-container");
                // FIX: erro exibido inline no topo do formulário, sem alert()
                showInlineError(mensagem);
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            showScreen("form-container");
            showInlineError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        }
    });
});


// -------------------------------------------------------------
// 11. UTILITÁRIOS
// -------------------------------------------------------------

// Alterna entre telas
function showScreen(screenId) {
    const screens = ["form-container", "loading-screen", "success-screen"];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("hidden", id !== screenId);
    });
}

// FIX: exibe mensagem de erro de servidor inline (sem alert)
function showInlineError(mensagem) {
    let banner = document.getElementById("server-error-banner");
    if (!banner) {
        banner = document.createElement("div");
        banner.id = "server-error-banner";
        banner.className = "error-msg server-error";
        const formCard = document.getElementById("form-container");
        if (formCard) formCard.prepend(banner);
    }
    banner.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${mensagem}`;
    banner.style.display = "block";
    // Remove automaticamente após 6 segundos
    setTimeout(() => { banner.style.display = "none"; }, 6000);
}