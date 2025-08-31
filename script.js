// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Highlight do link ativo na navegação
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Menu mobile (funcionalidade básica)
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const nav = document.querySelector(".nav")

mobileMenuBtn.addEventListener("click", () => {
  nav.classList.toggle("mobile-active")

  // Trocar ícone do menu
  const icon = mobileMenuBtn.querySelector("i")
  if (nav.classList.contains("mobile-active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Fechar menu mobile ao clicar em um link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile-active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

// Animação de entrada dos elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observar elementos para animação
document.querySelectorAll(".skill-card, .project-card, .learning-item, .contact-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Efeito de typing no título (opcional)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Aplicar efeito de typing ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})

// Validação básica para links externos
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    alert("Este link ainda não foi configurado. Adicione seus links reais aqui!")
  })
})

// Copiar email ao clicar
document.addEventListener("DOMContentLoaded", () => {
  const emailElement = document.querySelector(".contact-item p")
  if (emailElement && emailElement.textContent.includes("@")) {
    emailElement.style.cursor = "pointer"
    emailElement.title = "Clique para copiar"

    emailElement.addEventListener("click", () => {
      navigator.clipboard.writeText(emailElement.textContent).then(() => {
        // Feedback visual
        const originalText = emailElement.textContent
        emailElement.textContent = "Email copiado!"
        emailElement.style.color = "#10b981"

        setTimeout(() => {
          emailElement.textContent = originalText
          emailElement.style.color = ""
        }, 2000)
      })
    })
  }
})

// Adicionar classe active ao link de navegação atual
const currentLocation = location.pathname
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === currentLocation) {
    link.classList.add("active")
  }
})

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)

// Theme toggle click handler
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  // Add animation class
  themeToggle.classList.add("animate")

  // Change theme
  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Remove animation class after animation completes
  setTimeout(() => {
    themeToggle.classList.remove("animate")
  }, 300)
})

// Add sparkle effect on theme change
function createSparkle(x, y) {
  const sparkle = document.createElement("div")
  sparkle.style.position = "fixed"
  sparkle.style.left = x + "px"
  sparkle.style.top = y + "px"
  sparkle.style.width = "4px"
  sparkle.style.height = "4px"
  sparkle.style.background = html.getAttribute("data-theme") === "dark" ? "#60a5fa" : "#f59e0b"
  sparkle.style.borderRadius = "50%"
  sparkle.style.pointerEvents = "none"
  sparkle.style.zIndex = "9999"
  sparkle.style.animation = "sparkleFloat 1s ease-out forwards"

  document.body.appendChild(sparkle)

  setTimeout(() => {
    sparkle.remove()
  }, 1000)
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement("style")
sparkleStyle.textContent = `
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translateY(0) scale(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-20px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-40px) scale(0);
    }
  }
`
document.head.appendChild(sparkleStyle)

// Add sparkles on theme toggle
themeToggle.addEventListener("click", (e) => {
  const rect = themeToggle.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Create multiple sparkles
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 40
      const offsetY = (Math.random() - 0.5) * 40
      createSparkle(centerX + offsetX, centerY + offsetY)
    }, i * 50)
  }
})

// Smooth theme transition on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add a small delay to ensure smooth initial render
  setTimeout(() => {
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"
  }, 100)
})

