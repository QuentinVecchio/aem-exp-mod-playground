export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length >= 2) {
      const question = cols[0];
      const answer = cols[1];
      question.classList.add('accordion-question');
      answer.classList.add('accordion-answer');
      answer.style.display = 'none';
      question.addEventListener('click', () => {
        const isOpen = answer.style.display !== 'none';
        // Close all
        block.querySelectorAll('.accordion-answer').forEach((a) => { a.style.display = 'none'; });
        block.querySelectorAll('.accordion-question').forEach((q) => q.classList.remove('open'));
        if (!isOpen) {
          answer.style.display = 'block';
          question.classList.add('open');
        }
      });
    }
  });
}
