document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")
  
        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("active")
        })
  
        // Open clicked FAQ item if it wasn't active
        if (!isActive) {
          item.classList.add("active")
        }
      })
    })
  
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".testimonial-prev")
    const nextBtn = document.querySelector(".testimonial-next")
    let currentSlide = 0
  
    function showSlide(index) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))
  
      testimonialSlides[index].classList.add("active")
      dots[index].classList.add("active")
      currentSlide = index
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })
  
    prevBtn.addEventListener("click", () => {
      let index = currentSlide - 1
      if (index < 0) index = testimonialSlides.length - 1
      showSlide(index)
    })
  
    nextBtn.addEventListener("click", () => {
      let index = currentSlide + 1
      if (index >= testimonialSlides.length) index = 0
      showSlide(index)
    })
  
    // Auto slide testimonials
    let testimonialInterval = setInterval(() => {
      let index = currentSlide + 1
      if (index >= testimonialSlides.length) index = 0
      showSlide(index)
    }, 5000)
  
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector(".testimonial-slider")
    testimonialSlider.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval)
    })
  
    testimonialSlider.addEventListener("mouseleave", () => {
      testimonialInterval = setInterval(() => {
        let index = currentSlide + 1
        if (index >= testimonialSlides.length) index = 0
        showSlide(index)
      }, 5000)
    })
  
    // Chatbot functionality
    const chatbotToggleBtn = document.getElementById("chatbot-toggle-btn")
    const chatbotContainer = document.querySelector(".chatbot-container")
    const chatbotClose = document.querySelector(".chatbot-close")
    const chatMessages = document.querySelector(".chatbot-messages")
    const userInput = document.getElementById("user-input")
    const sendBtn = document.getElementById("send-btn")
  
    // Sample chatbot responses
    const botResponses = {
      halo: "Halo! Selamat datang di WebCraftAI. Ada yang bisa saya bantu tentang jasa pembuatan website untuk UMKM?",
      website:
        "WebCraftAI menyediakan jasa pembuatan website profesional untuk UMKM dengan berbagai fitur termasuk chatbot AI. Kami memiliki beberapa paket mulai dari Rp 2.999.000. Apakah Anda tertarik dengan paket tertentu?",
      chatbot:
        "Chatbot AI kami dilatih khusus untuk bisnis Anda. Chatbot dapat menjawab pertanyaan pelanggan tentang produk, layanan, harga, dan informasi lainnya secara otomatis 24/7 tanpa perlu mempekerjakan customer service.",
      harga:
        "Kami memiliki 3 paket: Paket Starter (Rp 2.999.000), Paket Business (Rp 4.999.000), dan Paket Premium (Rp 7.999.000). Masing-masing paket memiliki fitur yang berbeda. Apakah Anda ingin tahu detail dari paket tertentu?",
      kontak:
        "Anda dapat menghubungi kami melalui telepon di +62 812 3456 7890, email di info@webcraftai.id, atau mengisi formulir kontak di website kami.",
      "terima kasih":
        "Sama-sama! Terima kasih telah menghubungi WebCraftAI. Jika Anda memiliki pertanyaan lain, jangan ragu untuk bertanya.",
    }
  
    // Default responses if no match found
    const defaultResponses = [
      "Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda menjelaskan lebih detail?",
      "Pertanyaan yang menarik! Untuk informasi lebih lanjut, sebaiknya Anda berbicara dengan tim kami. Silakan isi formulir kontak atau hubungi kami di +62 812 3456 7890.",
      "Terima kasih atas pertanyaan Anda. Tim kami akan senang membantu Anda secara langsung. Apakah Anda ingin kami menghubungi Anda?",
      "Untuk pertanyaan spesifik tersebut, sebaiknya konsultasikan dengan tim ahli kami. Apakah Anda ingin dijadwalkan konsultasi gratis?",
    ]
  
    // Toggle chatbot visibility
    chatbotToggleBtn.addEventListener("click", () => {
      chatbotContainer.style.display = "flex"
      chatbotToggleBtn.style.display = "none"
    })
  
    chatbotClose.addEventListener("click", () => {
      chatbotContainer.style.display = "none"
      chatbotToggleBtn.style.display = "flex"
    })
  
    // Send message function
    function sendMessage() {
      const message = userInput.value.trim()
      if (message === "") return
  
      // Add user message to chat
      addMessage(message, "user")
      userInput.value = ""
  
      // Simulate typing indicator
      setTimeout(() => {
        // Get bot response
        const botResponse = getBotResponse(message.toLowerCase())
        addMessage(botResponse, "bot")
  
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight
      }, 1000)
    }
  
    // Add message to chat
    function addMessage(message, sender) {
      const messageElement = document.createElement("div")
      messageElement.classList.add("message", sender)
  
      const messageText = document.createElement("p")
      messageText.textContent = message
  
      messageElement.appendChild(messageText)
      chatMessages.appendChild(messageElement)
  
      // Scroll to bottom of chat
      chatMessages.scrollTop = chatMessages.scrollHeight
    }
  
    // Get bot response based on user input
    function getBotResponse(userMessage) {
      // Check for keyword matches
      for (const keyword in botResponses) {
        if (userMessage.includes(keyword)) {
          return botResponses[keyword]
        }
      }
  
      // Return random default response if no match
      const randomIndex = Math.floor(Math.random() * defaultResponses.length)
      return defaultResponses[randomIndex]
    }
  
    // Send message on button click
    sendBtn.addEventListener("click", sendMessage)
  
    // Send message on Enter key
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  
    // Form submission
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
  
        submitBtn.textContent = "Mengirim..."
        submitBtn.disabled = true
  
        setTimeout(() => {
          // Show success message
          const formGroups = this.querySelectorAll(".form-group")
          formGroups.forEach((group) => {
            group.style.display = "none"
          })
  
          submitBtn.style.display = "none"
  
          const successMessage = document.createElement("div")
          successMessage.classList.add("success-message")
          successMessage.innerHTML = `
                      <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 20px;"></i>
                      <h3>Terima Kasih!</h3>
                      <p>Pesan Anda telah terkirim. Tim kami akan menghubungi Anda segera.</p>
                  `
          successMessage.style.textAlign = "center"
          successMessage.style.padding = "30px"
  
          this.appendChild(successMessage)
  
          // Reset form after 5 seconds
          setTimeout(() => {
            this.reset()
            formGroups.forEach((group) => {
              group.style.display = "block"
            })
            submitBtn.style.display = "block"
            submitBtn.textContent = originalText
            submitBtn.disabled = false
            successMessage.remove()
          }, 5000)
        }, 2000)
      })
    }
  
    // Add placeholder images
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      if (!img.src || img.src === window.location.href) {
        const alt = img.alt || "Image"
        if (img.classList.contains("testimonial-author")) {
          img.src = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "women" : "men"}/${Math.floor(Math.random() * 100)}.jpg`
        } else {
          img.src = `https://via.placeholder.com/600x400?text=${alt.replace(/\s+/g, "+")}`
        }
      }
    })
  })
  