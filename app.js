const SUBJECTS = [
  {
    name: 'Big Data Analytics',
    description: 'Topic-wise solved Q&A with interactive navigation for 2024 and 2025 papers.',
    syllabus: 'syllabus/Big_Data_Analytics_syllabus.pdf',
    papers: [
      {
        title: 'BTCS816PET — 2024 (Interactive Q&A)',
        href: 'Big_Data_Analytics/BTCS816PET-Big Data Analytics - 2024.html'
      },
      {
        title: 'MTCS246PET — 2025 (Exam Guide)',
        href: 'Big_Data_Analytics/MTCS246PET-Big Data Analytics - 2025.html'
      }
    ]
  },
  {
    name: 'Blockchain Technology',
    description: 'Complete answers from 2023 and 2025 papers with diagrams and examples.',
    syllabus: 'syllabus/Blockchain_syllabus.pdf',
    papers: [
      {
        title: 'MTCS231PET — 2023 (Complete Answers)',
        href: 'Blockchain_Technology/MTCS231PET (Blockchain Technology) - 2023.html'
      },
      {
        title: 'MTCS231PET — 2025 (Detailed Answer Key)',
        href: 'Blockchain_Technology/MTCS231PET-Blockchain Technology - 2025.html'
      }
    ]
  },
  {
    name: 'Internet of Things',
    description: 'Comprehensive 2025 exam guide with interactive navigation, in-page search, and 20 solved questions.',
    syllabus: 'syllabus/Internet_of_Things_syllabus.pdf',
    papers: [
      {
        title: 'MTCS212PCT — 2025 (IoT Exam Guide)',
        href: 'Internet_of_Things/MTCS212PCT- Internet of Things - 2025.html'
      }
    ]
  }
];

const searchInput = document.getElementById('global-search');
const subjectGrid = document.getElementById('subject-grid');
const resultsContainer = document.getElementById('results');
const resultCount = document.getElementById('result-count');
const statsLine = document.getElementById('stats');

function encodeLink(link) {
  return encodeURI(link);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${escapedQuery})`, 'ig');
  return safe.replace(pattern, '<mark>$1</mark>');
}

function renderSubjectCards() {
  subjectGrid.innerHTML = SUBJECTS.map((subject) => {
    const badgeClass = subject.name.includes('Big Data') ? 'primary' : 'green';

    const paperLinks = subject.papers
      .map((paper) => `
        <a class="link-btn" href="${encodeLink(paper.href)}">
          ${escapeHtml(paper.title)}
          <span class="sub">Open subject page</span>
        </a>
      `)
      .join('');

    const syllabusLink = subject.syllabus
      ? `
          <a class="link-btn ${badgeClass}" href="${encodeLink(subject.syllabus)}" target="_blank" rel="noopener noreferrer">
            Open Syllabus (PDF)
            <span class="sub">Quick revision outline</span>
          </a>
        `
      : '';

    return `
      <article class="card">
        <h2>${escapeHtml(subject.name)}</h2>
        <p>${escapeHtml(subject.description)}</p>
        <div class="links">
          ${syllabusLink}
          ${paperLinks}
        </div>
      </article>
    `;
  }).join('');
}

function renderStats(index) {
  const subjects = new Set(index.map(item => item.subject)).size;
  const papers = new Set(index.map(item => item.paper)).size;
  const questions = index.length;
  const syllabusCount = SUBJECTS.filter(subject => Boolean(subject.syllabus)).length;

  statsLine.innerHTML = `
    <span class="stat-chip">${subjects} Subjects</span>
    <span class="stat-chip">${papers} Papers</span>
    <span class="stat-chip">${questions} Searchable Questions</span>
    <span class="stat-chip">${syllabusCount} Syllabus PDFs</span>
  `;
}

function renderResults(index, query = '') {
  let filtered = index;
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filtered = index.filter(item => (
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.paper.toLowerCase().includes(normalizedQuery) ||
      item.subject.toLowerCase().includes(normalizedQuery)
    ));
  }

  resultCount.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'}`;

  if (!filtered.length) {
    resultsContainer.innerHTML = '<div class="empty">No matches found. Try a keyword like Spark, HDFS, Merkle, RAFT, PoW, Hyperledger...</div>';
    return;
  }

  const maxResults = normalizedQuery ? 120 : 24;
  const visible = filtered.slice(0, maxResults);

  resultsContainer.innerHTML = visible.map(item => `
    <a class="result-item" href="${encodeLink(item.url)}">
      <div class="result-title">${highlight(item.question, normalizedQuery)}</div>
      <div class="result-meta">${escapeHtml(item.subject)} · ${escapeHtml(item.paper)}</div>
    </a>
  `).join('');

  if (filtered.length > maxResults) {
    resultsContainer.insertAdjacentHTML('beforeend', `<div class="empty">Showing first ${maxResults} results. Refine search for more precise matches.</div>`);
  }
}

function initSearch() {
  const index = Array.isArray(window.SEARCH_INDEX) ? window.SEARCH_INDEX : [];
  renderSubjectCards();
  renderStats(index);
  renderResults(index);

  searchInput.addEventListener('input', (event) => {
    renderResults(index, event.target.value);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
  });
}

initSearch();