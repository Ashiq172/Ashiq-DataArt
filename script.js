document.addEventListener('DOMContentLoaded', function() {
  
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2 id="modal-title"></h2>
      <div class="modal-year" id="modal-year"></div>
      <img id="modal-image" src="" alt="">
      <p id="modal-description"></p>
    </div>
  `;
  document.body.appendChild(modal);

  
  document.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  
  fetch('events.json')
    .then(response => response.json())
    .then(events => {
      const timeline = document.querySelector('.timeline');
      
      events.sort((a, b) => a.year - b.year).forEach(event => {
        const milestone = document.createElement('div');
        milestone.id = `milestone-${event.year}`;
        milestone.className = 'milestone';
        
        milestone.innerHTML = `
          <div class="timeline-marker">${event.year}</div>
          <div class="milestone-content">
            <h2>${event.title}</h2>
          </div>
        `;
        
        milestone.querySelector('h2').addEventListener('click', () => {
          document.getElementById('modal-title').textContent = event.title;
          document.getElementById('modal-year').textContent = event.year;
          document.getElementById('modal-image').src = event.imageURL;
          document.getElementById('modal-image').alt = event.title;
          document.getElementById('modal-description').textContent = event.description;
          modal.style.display = 'block';
        });
        
        timeline.appendChild(milestone);
      });
    })
    .catch(error => console.error('Error loading events:', error));
});