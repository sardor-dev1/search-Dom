  function openModal() {
    document.querySelector(".modal").style.display = 'block';
  }

  function closeModal() {
    document.querySelector('.modal').style.display = 'none';
  }
  function clearForm() {
    document.querySelector('form').reset();
  }
 
  document.querySelector('.open-modal').addEventListener('click', function() {
    openModal();
  });

 
  document.querySelector('.close').addEventListener('click', function() {
    closeModal();
    clearForm(); 
  });
