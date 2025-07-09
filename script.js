const burger = document.getElementById('burger');
const navMobile = document.getElementById('nav-mobile');

burger.addEventListener('click', () => {
navMobile.classList.toggle('hidden');
});

const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
if (window.pageYOffset > 300) {
scrollBtn.style.display = 'block';
} else {
scrollBtn.style.display = 'none';
}
});
scrollBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const showPasswordCheckbox = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

contactForm.addEventListener('submit', (e) => {
e.preventDefault();
formMsg.textContent = '';

const name = contactForm.name.value.trim();
const email = contactForm.email.value.trim();
const password = contactForm.password.value.trim();
const message = contactForm.message.value.trim();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!name || !email || !password || !message) {
formMsg.textContent = 'გთხოვთ შეავსოთ ყველა ველი.';
formMsg.style.color = 'red';
return;
}
if (!emailRegex.test(email)) {
formMsg.textContent = 'გთხოვთ შეიყვანოთ სწორი მეილი.';
formMsg.style.color = 'red';
return;
}
if (password.length < 8) {
formMsg.textContent = 'პაროლი უნდა შედგებოდეს მინიმუმ 8 სიმბოლოსგან.';
formMsg.style.color = 'red';
return;
}

formMsg.textContent = 'მადლობა კონტაქტისთვის!';
formMsg.style.color = 'green';

contactForm.reset();
});

showPasswordCheckbox.addEventListener('change', () => {
passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});

const cookieNotice = document.getElementById('cookieNotice');
const acceptCookiesBtn = document.getElementById('acceptCookies');

if (!localStorage.getItem('cookiesAccepted')) {
cookieNotice.classList.remove('hidden');
}

acceptCookiesBtn.addEventListener('click', () => {
localStorage.setItem('cookiesAccepted', 'true');
cookieNotice.classList.add('hidden');
});

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');

searchBtn.addEventListener('click', async () => {
const query = searchInput.value.trim();
resultsContainer.innerHTML = '';

if (!query) {
resultsContainer.textContent = 'გთხოვთ შეიყვანოთ საძიებო სიტყვა.';
return;
}

try {
const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`);
const data = await response.json();

if (data.results.length === 0) {
resultsContainer.textContent = 'შედეგი არ მოიძებნა.';
return;
}

data.results.forEach(track => {
const card = document.createElement('div');
card.className = 'song-card';

card.innerHTML = `
<img src="${track.artworkUrl100}" alt="${track.trackName}" />
<h4>${track.trackName}</h4>
<p>${track.artistName}</p>
<audio controls src="${track.previewUrl}"></audio>
`;

resultsContainer.appendChild(card);
});
} catch (error) {
resultsContainer.textContent = 'გთხოვთ ცადოთ მოგვიანებით.';
}
});