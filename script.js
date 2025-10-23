document.addEventListener('DOMContentLoaded', function(){
	const navToggle = document.getElementById('navToggle');
	const mainNav = document.getElementById('mainNav');
	navToggle.addEventListener('click', function(){
		const isOpen = mainNav.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});

	// Projects modal
	const projectsGrid = document.getElementById('projectsGrid');
	const modal = document.getElementById('modal');
	const modalTitle = document.getElementById('modalTitle');
	const modalDesc = document.getElementById('modalDesc');
	const modalClose = document.getElementById('modalClose');

	function openModal(title, desc){
		modalTitle.textContent = title;
		modalDesc.textContent = desc;
		modal.setAttribute('aria-hidden','false');
		// trap focus minimally
		modalClose.focus();
	}
	function closeModal(){
		modal.setAttribute('aria-hidden','true');
	}

	projectsGrid && projectsGrid.addEventListener('click', function(e){
		const card = e.target.closest('.project');
		if(!card) return;
		openModal(card.dataset.title || 'Project', card.dataset.desc || 'No description');
	});

	// support keyboard open (Enter) on project cards
	document.querySelectorAll('.project').forEach(card=>{
		card.addEventListener('keydown', function(e){
			if(e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				openModal(card.dataset.title, card.dataset.desc);
			}
		});
	});

	modalClose.addEventListener('click', closeModal);
	modal.addEventListener('click', function(e){
		if(e.target === modal) closeModal();
	});
	document.addEventListener('keydown', function(e){
		if(e.key === 'Escape') closeModal();
	});
});
