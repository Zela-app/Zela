// =============================================================
//  criarconta.js — Zela
//  Controla o formulário de cadastro multi-etapas e
//  envia os dados para o back-end Spring Boot via fetch()
// =============================================================

// -------------------------------------------------------------
// 1. CONFIGURAÇÃO — altere apenas esta URL quando for para produção
// -------------------------------------------------------------
const API_BASE_URL = "http://localhost:8080"; // desenvolvimento local
// const API_BASE_URL = "https://api.zela.com.br"; // produção


// -------------------------------------------------------------
// 2. ESTADO DO FORMULÁRIO
// -------------------------------------------------------------
let currentStep = 1;
const totalSteps = 3;


// -------------------------------------------------------------
// 3. NAVEGAÇÃO ENTRE ETAPAS
// -------------------------------------------------------------
function changeStep(direction) {
    // Valida a etapa atual antes de avançar
    if (direction === 1 && !validateStep(currentStep)) return;

    // Marca etapa atual como concluída (ao avançar)
    if (direction === 1) {
        const indicator = document.getElementById(`indicator-${currentStep}`);
        if (indicator) {
            indicator.classList.remove("ativa", "active");
            indicator.classList.add("concluida", "completed");
        }
        // Preenche a linha de progresso
        const line = document.getElementById(`line-${currentStep}`);
        if (line) line.style.width = "100%";
    }

    // Esconde a etapa atual
    const currentSection = document.getElementById(`etapa-${currentStep}`) 
                        || document.getElementById(`step-${currentStep}`);
    if (currentSection) currentSection.classList.remove("active");

    // Atualiza o número da etapa
    currentStep += direction;

    // Mostra a nova etapa
    const nextSection = document.getElementById(`etapa-${currentStep}`)
                     || document.getElementById(`step-${currentStep}`);
    if (nextSection) nextSection.classList.add("active");

    // Ativa o indicador da nova etapa
    const nextIndicator = document.getElementById(`indicator-${currentStep}`);
    if (nextIndicator) {
        nextIndicator.classList.remove("concluida", "completed");
        nextIndicator.classList.add("ativa", "active");
    }

    // Ao voltar, esvazia a linha de progresso da etapa anterior
    if (direction === -1) {
        const line = document.getElementById(`line-${currentStep}`);
        if (line) line.style.width = "0%";
        // Reactiva o indicador que estava concluído
        const revertIndicator = document.getElementById(`indicator-${currentStep}`);
        if (revertIndicator) {
            revertIndicator.classList.remove("concluida", "completed");
            revertIndicator.classList.add("ativa", "active");
        }
    }

    // Controla visibilidade dos botões
    updateButtons();
}

function updateButtons() {
    const prevBtn   = document.getElementById("prevBtn")   || document.getElementById("prev-btn");
    const nextBtn   = document.getElementById("nextBtn")   || document.getElementById("next-btn");
    const submitBtn = document.getElementById("submitBtn") || document.getElementById("submit-btn");

    // Botão Voltar
    if (prevBtn) {
        if (currentStep === 1) {
            prevBtn.classList.add("hidden");
        } else {
            prevBtn.classList.remove("hidden");
        }
    }

    // Botão Próximo / Finalizar
    if (currentStep === totalSteps) {
        if (nextBtn)   nextBtn.classList.add("hidden");
        if (submitBtn) submitBtn.classList.remove("hidden");
    } else {
        if (nextBtn)   nextBtn.classList.remove("hidden");
        if (submitBtn) submitBtn.classList.add("hidden");
    }
}


// -------------------------------------------------------------
// 4. VALIDAÇÃO POR ETAPA
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

        // Data de nascimento
        const day   = document.getElementById("day");
        const month = document.getElementById("month");
        const year  = document.getElementById("year");
        if (!day?.value || !month?.value || !year?.value) {
            isValid = false;
            // Marca visualmente os campos vazios
            [day, month, year].forEach(el => {
                if (el && !el.value) el.classList.add("error");
            });
        } else {
            [day, month, year].forEach(el => el?.classList.remove("error"));
        }
    }

    if (step === 2) {
        // E-mail
        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.value)) {
            showError("email-error", "email");
            isValid = false;
        } else {
            hideError("email-error", "email");
        }

        // Telefone
        const phone = document.getElementById("phone") || document.getElementById("telefone");
        if (!phone || phone.value.replace(/\D/g, "").length < 10) {
            showError("telefone-error", phone?.id);
            isValid = false;
        } else {
            hideError("telefone-error", phone?.id);
        }
    }

    if (step === 3) {
        const password = document.getElementById("password");
        const confirm  = document.getElementById("password_confirmation") 
                      || document.getElementById("Confirmepassword");
        const terms    = document.getElementById("terms");

        // Senhas
        if (!password || password.value.length < 8 || password.value !== confirm?.value) {
            showError("password-error", "password");
            isValid = false;
        } else {
            hideError("password-error", "password");
        }

        // Termos
        if (!terms?.checked) {
            const termsError = document.getElementById("terms-error");
            if (termsError) termsError.style.display = "block";
            isValid = false;
        } else {
            const termsError = document.getElementById("terms-error");
            if (termsError) termsError.style.display = "none";
        }
    }

    return isValid;
}

function showError(errorId, inputId) {
    const errorEl = document.getElementById(errorId);
    const inputEl = inputId ? document.getElementById(inputId) : null;
    if (errorEl) errorEl.style.display = "block";
    if (inputEl) inputEl.classList.add("error");
}

function hideError(errorId, inputId) {
    const errorEl = document.getElementById(errorId);
    const inputEl = inputId ? document.getElementById(inputId) : null;
    if (errorEl) errorEl.style.display = "none";
    if (inputEl) inputEl.classList.remove("error");
}


// -------------------------------------------------------------
// 5. VALIDAÇÃO DE CPF (algoritmo oficial)
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
// 6. MÁSCARAS DE INPUT
// -------------------------------------------------------------
function applyMasks() {
    // Máscara de CPF: 000.000.000-00
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

    // Máscara de telefone: (00) 00000-0000
    const phoneInput = document.getElementById("phone") || document.getElementById("telefone");
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
// 7. MOSTRAR / OCULTAR SENHA
// -------------------------------------------------------------
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
}


// -------------------------------------------------------------
// 8. MODAIS
// -------------------------------------------------------------
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("open");
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("open");
}


// -------------------------------------------------------------
// 9. ENVIO DO FORMULÁRIO → SPRING BOOT
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    applyMasks();
    updateButtons();

    const form = document.getElementById("cadastroForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Valida a última etapa antes de enviar
        if (!validateStep(3)) return;

        // Monta o objeto que será enviado ao Spring Boot
        const day   = document.getElementById("day")?.value.padStart(2, "0");
        const month = document.getElementById("month")?.value.padStart(2, "0");
        const year  = document.getElementById("year")?.value;

        const payload = {
            nome:            document.getElementById("name")?.value.trim(),
            cpf:             document.getElementById("cpf")?.value, 
            dataNascimento:  `${day}/${month}/${year}`, 
            email:           document.getElementById("email")?.value.trim().toLowerCase(),
            telefone:        (document.getElementById("phone") || document.getElementById("telefone"))?.value, 
            senha:           document.getElementById("password")?.value,
        };
        // Exibe a tela de loading
        showScreen("loading-screen");

        try {
            const response = await fetch(`${API_BASE_URL}/api/usuarios/cadastrar`, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(payload),
            });

            if (response.ok) {
                // Sucesso — exibe tela de confirmação
                const nameDisplay = document.getElementById("user-name-display");
                if (nameDisplay) {
                    nameDisplay.textContent = payload.nomeCompleto.split(" ")[0]; // primeiro nome
                }
                showScreen("success-screen");

            } else {
                // Erro vindo do back-end (ex: e-mail já cadastrado, CPF inválido)
                const errorData = await response.json().catch(() => null);
                const mensagem  = errorData?.mensagem || errorData?.message || "Erro ao cadastrar. Tente novamente.";
                showScreen("form-container");
                alert(`⚠️ ${mensagem}`);
            }

        } catch (error) {
            // Erro de rede (back-end fora do ar, CORS, etc.)
            console.error("Erro na requisição:", error);
            showScreen("form-container");
            alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        }
    });
});


// -------------------------------------------------------------
// 10. UTILITÁRIO — alterna entre telas (formulário / loading / sucesso)
// -------------------------------------------------------------
function showScreen(screenId) {
    const screens = ["form-container", "loading-screen", "success-screen"];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("hidden", id !== screenId);
    });
}