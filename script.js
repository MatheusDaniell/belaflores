document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------
     Header: muda de aparência ao rolar
     --------------------------------- */
  const header = document.getElementById('siteHeader');
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------------------------------
     Menu responsivo (hambúrguer)
     --------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  function closeMenu() {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---------------------------------
     Carrossel de depoimentos
     --------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const testimonials = Array.from(track.querySelectorAll('.testimonial'));
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  let current = 0;
  let autoTimer = null;

  testimonials.forEach(function (_, index) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Ver depoimento ' + (index + 1));
    dot.addEventListener('click', function () {
      goTo(index);
      restartAuto();
    });
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function render() {
    testimonials.forEach(function (item, index) {
      item.classList.toggle('is-active', index === current);
    });
    dots.forEach(function (dot, index) {
      dot.classList.toggle('is-active', index === current);
    });
  }

  function goTo(index) {
    current = (index + testimonials.length) % testimonials.length;
    render();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener('click', function () { prev(); restartAuto(); });
  nextBtn.addEventListener('click', function () { next(); restartAuto(); });

  function startAuto() {
    autoTimer = setInterval(next, 6000);
  }
  function restartAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  render();
  startAuto();

  /* ---------------------------------
     Scroll reveal (fade-in ao rolar)
     --------------------------------- */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  /* ---------------------------------
     Formulário de contato
     --------------------------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    const wrapper = field.closest('.form-field');
    errorEl.textContent = message;
    wrapper.classList.toggle('has-error', Boolean(message));
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    let valido = true;

    if (nome.length < 2) {
      setFieldError('nome', 'erroNome', 'Digite seu nome.');
      valido = false;
    } else {
      setFieldError('nome', 'erroNome', '');
    }

    if (!isValidEmail(email)) {
      setFieldError('email', 'erroEmail', 'Digite um e-mail válido.');
      valido = false;
    } else {
      setFieldError('email', 'erroEmail', '');
    }

    if (mensagem.length < 5) {
      setFieldError('mensagem', 'erroMensagem', 'Escreva sua mensagem.');
      valido = false;
    } else {
      setFieldError('mensagem', 'erroMensagem', '');
    }

    if (!valido) {
      formStatus.textContent = 'Verifique os campos destacados acima.';
      return;
    }

    formStatus.textContent = 'Mensagem enviada! Responderemos em breve pelo e-mail informado.';
    form.reset();
  });

  /* ---------------------------------
     Ano atual no rodapé
     --------------------------------- */
  const anoAtual = document.getElementById('anoAtual');
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

});
