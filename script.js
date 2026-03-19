const nb = document.getElementById('navbar');
window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 40), {passive:true});

function toggleMobile() { document.getElementById('mobileNav').classList.toggle('open'); }
function closeMobile()  { document.getElementById('mobileNav').classList.remove('open'); }

function toggleAcc(btn) {
const item = btn.closest('.acc-item');
const isOpen = item.classList.contains('open');
document.querySelectorAll('.acc-item.open').forEach(el => el.classList.remove('open'));
if (!isOpen) item.classList.add('open');
}

const io = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

async function submitForm(e) {
  e.preventDefault();
  const f = e.target;
  const checked = [...f.querySelectorAll('input[type="checkbox"]:checked')].map(c => c.value).join(', ');

  const data = {
    name:         f.name.value,
    email:        f.email.value,
    phone:        f.phone.value,
    location:     f.location.value,
    boat_make:    f.boat_make.value,
    boat_age:     f.boat_age.value,
    condition:    f.condition.value,
    service_type: f.service_type.value,
    services:     checked,
    details:      f.details.value
  };

  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    document.getElementById('form-success').style.display = 'block';
    f.reset();
  } else {
    alert('Something went wrong — please email us directly at hello@boutiqueboat.care');
  }
}

const secs = document.querySelectorAll('section[id]');
const nls  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
let cur = '';
secs.forEach(s => { if (scrollY >= s.offsetTop - 100) cur = s.id; });
nls.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--ink)' : ''; });
}, {passive:true});