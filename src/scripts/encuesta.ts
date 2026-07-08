const emojiOptions = document.querySelectorAll<HTMLButtonElement>(".emoji-option");
const scaleBtns = document.querySelectorAll<HTMLButtonElement>(".scale-btn");
const textarea = document.getElementById("respuesta-texto") as HTMLTextAreaElement;
const submitBtn = document.getElementById("btn-enviar") as HTMLButtonElement;
const charCount = document.getElementById("char-count")!;
const tagChips = document.querySelectorAll<HTMLButtonElement>(".tag-chip");

const survey = document.getElementById("survey")!;
const gracias = document.getElementById("gracias")!;
const countdownNum = document.getElementById("countdown-num")!;
const countdownBar = document.getElementById("countdown-bar")!;
const btnResetNow = document.getElementById("btn-reiniciar-ahora")!;
const errorMsg = document.getElementById("error-msg")!;

let selectedEmoji: string | null = null;
let selectedScale: string | null = null;
let countdownInterval: number | null = null;
const RESET_TIME = 15; // segundos para resetear la pantalla en modo kiosco

// Estilos para emojis cuando están seleccionados
const emojiStyles: Record<string, string[]> = {
  "very-bad": ["border-danger", "bg-danger/10", "ring-2", "ring-danger/30", "text-danger", "scale-102"],
  "bad": ["border-warning", "bg-warning/10", "ring-2", "ring-warning/30", "text-warning", "scale-102"],
  "neutral": ["border-amber-400", "bg-amber-500/10", "ring-2", "ring-amber-500/30", "text-amber-600", "scale-102"],
  "good": ["border-success", "bg-success/10", "ring-2", "ring-success/30", "text-success", "scale-102"],
  "very-good": ["border-success", "bg-success/15", "ring-4", "ring-success/30", "text-success", "scale-105", "shadow-md"]
};

// Manejador de selección de Emojis
emojiOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    emojiOptions.forEach((el) => {
      const emojiType = el.dataset.emoji!;
      // Remover estilos seleccionados
      if (emojiStyles[emojiType]) {
        el.classList.remove(...emojiStyles[emojiType]);
      }
      el.classList.add("border-outline/75", "bg-white");
    });

    const selectedType = btn.dataset.emoji!;
    btn.classList.remove("border-outline/75", "bg-white");
    if (emojiStyles[selectedType]) {
      btn.classList.add(...emojiStyles[selectedType]);
    }

    selectedEmoji = selectedType;
    validateForm();
  });
});

// Manejador de selección NPS 0-10
scaleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    scaleBtns.forEach((el) => {
      el.classList.remove(
        "bg-danger", "border-danger", "ring-4", "ring-danger/20",
        "bg-warning", "border-warning", "ring-4", "ring-warning/20",
        "bg-success", "border-success", "ring-4", "ring-success/20",
        "text-white", "scale-105", "shadow-md"
      );
      el.classList.add("bg-white", "border-outline/70", "text-on-surface-muted");
    });

    const val = parseInt(btn.dataset.value!);
    btn.classList.remove("bg-white", "border-outline/70", "text-on-surface-muted");
    btn.classList.add("text-white", "scale-105", "shadow-md");
    
    if (val <= 6) {
      btn.classList.add("bg-danger", "border-danger", "ring-4", "ring-danger/20");
    } else if (val <= 8) {
      btn.classList.add("bg-warning", "border-warning", "ring-4", "ring-warning/20");
    } else {
      btn.classList.add("bg-success", "border-success", "ring-4", "ring-success/20");
    }

    selectedScale = btn.dataset.value ?? null;
    validateForm();
  });
});

// Chips de Comentarios Rápidos
tagChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const tag = chip.dataset.tag!;
    const currentText = textarea.value.trim();
    
    const isActive = chip.classList.contains("bg-primary");
    if (isActive) {
      // Deseleccionar chip
      chip.classList.remove("bg-primary", "text-on-primary", "border-primary");
      chip.classList.add("bg-white", "text-on-surface-muted", "border-outline");
      
      // Remover del textarea
      let newText = currentText
        .replace(new RegExp(`,?\\s*${tag}\\s*,?`, "g"), "")
        .replace(/^,\s*/, "")
        .replace(/,\s*$/, "");
      textarea.value = newText;
    } else {
      // Seleccionar chip
      chip.classList.add("bg-primary", "text-on-primary", "border-primary");
      chip.classList.remove("bg-white", "text-on-surface-muted", "border-outline");
      
      // Agregar al textarea
      if (currentText.length > 0) {
        textarea.value = `${currentText}, ${tag}`;
      } else {
        textarea.value = tag;
      }
    }
    
    updateCharCount();
    validateForm();
  });
});

// Sincronizar estado de los chips según texto escrito manualmente
function syncChipsWithText() {
  const text = textarea.value;
  tagChips.forEach((chip) => {
    const tag = chip.dataset.tag!;
    const hasTag = text.includes(tag);
    if (hasTag) {
      chip.classList.add("bg-primary", "text-on-primary", "border-primary");
      chip.classList.remove("bg-white", "text-on-surface-muted", "border-outline");
    } else {
      chip.classList.remove("bg-primary", "text-on-primary", "border-primary");
      chip.classList.add("bg-white", "text-on-surface-muted", "border-outline");
    }
  });
}

// Actualizar contador de caracteres
function updateCharCount() {
  const len = textarea.value.length;
  charCount.textContent = `${len} / 250`;
}

textarea.addEventListener("input", () => {
  updateCharCount();
  syncChipsWithText();
  validateForm();
});

// Validación de Formulario (Solo Emoji y Escala NPS obligatorios)
function validateForm() {
  const valid = selectedEmoji !== null && selectedScale !== null;

  submitBtn.disabled = !valid;
  if (valid) {
    submitBtn.classList.remove("bg-primary/40", "text-white/80", "cursor-not-allowed");
    submitBtn.classList.add("bg-primary", "hover:bg-primary-strong", "text-white", "cursor-pointer", "shadow-lg", "shadow-primary/20", "scale-102", "hover:scale-105");
    submitBtn.querySelector("svg")?.classList.add("translate-x-1");
  } else {
    submitBtn.classList.remove("bg-primary", "hover:bg-primary-strong", "text-white", "cursor-pointer", "shadow-lg", "shadow-primary/20", "scale-102", "hover:scale-105");
    submitBtn.classList.add("bg-primary/40", "text-white/80", "cursor-not-allowed");
    submitBtn.querySelector("svg")?.classList.remove("translate-x-1");
  }
}

// Manejador del Enviar
submitBtn.addEventListener("click", async () => {
  if (submitBtn.disabled) return;
  if (!selectedEmoji || !selectedScale) return;

  // Mostrar estado de cargando
  submitBtn.disabled = true;
  const originalText = submitBtn.querySelector("span")!.textContent;
  submitBtn.querySelector("span")!.textContent = "Enviando...";
  submitBtn.classList.add("opacity-70", "cursor-wait");
  errorMsg.classList.add("hidden");

  try {
    const response = await fetch("/api/encuestas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        satisfaccion: selectedEmoji,
        comentarios: textarea.value.trim(),
        recomendacion: selectedScale
      })
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      throw new Error(result.error || "Error al enviar la encuesta");
    }

    // Éxito: Ocultar formulario y mostrar gracias
    survey.classList.add("hidden");
    gracias.classList.remove("hidden");
    gracias.classList.add("animate-fade-in");

    window.scrollTo({ top: 0, behavior: "smooth" });
    startKioskCountdown();

  } catch (err: any) {
    console.error("Error al enviar encuesta:", err);
    errorMsg.textContent = err.message || "Ocurrió un error al enviar la encuesta. Por favor, intenta de nuevo.";
    errorMsg.classList.remove("hidden");
  } finally {
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.querySelector("span")!.textContent = originalText;
    submitBtn.classList.remove("opacity-70", "cursor-wait");
    validateForm();
  }
});

// Temporizador en modo Kiosco
function startKioskCountdown() {
  let timeLeft = RESET_TIME;
  countdownNum.textContent = String(timeLeft);
  countdownBar.style.width = "100%";

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = window.setInterval(() => {
    timeLeft -= 0.1;
    const roundedTime = Math.ceil(timeLeft);
    countdownNum.textContent = String(roundedTime >= 0 ? roundedTime : 0);
    
    const percentage = (timeLeft / RESET_TIME) * 100;
    countdownBar.style.width = `${percentage}%`;
    
    if (timeLeft <= 0) {
      clearInterval(countdownInterval!);
      resetSurveyForm();
    }
  }, 100);
}

// Reiniciar encuesta al estado original
function resetSurveyForm() {
  // Detener contador
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  
  // Limpiar estados
  selectedEmoji = null;
  selectedScale = null;
  textarea.value = "";
  updateCharCount();
  
  // Limpiar estilos de emojis
  emojiOptions.forEach((el) => {
    const emojiType = el.dataset.emoji!;
    if (emojiStyles[emojiType]) {
      el.classList.remove(...emojiStyles[emojiType]);
    }
    el.classList.add("border-outline/75", "bg-white");
  });
  
  // Limpiar estilos de escala NPS
  scaleBtns.forEach((el) => {
    el.className = `scale-btn flex h-11 w-full items-center justify-center rounded-xl border border-outline/70 bg-white text-sm font-bold text-on-surface-muted transition-all duration-300 md:h-12 md:text-base cursor-pointer`;
    const val = parseInt(el.dataset.value!);
    let hoverClass = "";
    if (val <= 6) hoverClass = "hover:bg-danger/5 hover:border-danger/35 hover:text-danger";
    else if (val <= 8) hoverClass = "hover:bg-warning/5 hover:border-warning/35 hover:text-warning";
    else hoverClass = "hover:bg-success/5 hover:border-success/35 hover:text-success";
    el.classList.add(...hoverClass.split(" "));
  });
  
  // Limpiar chips
  tagChips.forEach((chip) => {
    chip.className = "tag-chip flex items-center gap-1.5 rounded-full border border-outline bg-white px-3.5 py-1.5 text-xs font-semibold text-on-surface-muted transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-pointer";
  });
  
  // Validar formulario de nuevo
  validateForm();
  
  // Ocultar mensaje de error
  errorMsg.classList.add("hidden");
  
  // Mostrar vista inicial
  gracias.classList.add("hidden");
  survey.classList.remove("hidden");
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

btnResetNow.addEventListener("click", resetSurveyForm);
