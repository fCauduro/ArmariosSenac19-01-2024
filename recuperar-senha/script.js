function createResetButton() {
  const buttonContainer = document.getElementById('buttonContainer');

  const resetButton = document.createElement('button');
  resetButton.textContent = 'gerar nova senha senha';

  resetButton.addEventListener('click', function () {
    const usuarioInput = document.getElementById('usuarioInput');
    const emailInput = document.getElementById('emailInput');
    const goBackButton = document.getElementById('goBackButton');

    goBackButton.addEventListener('click', function () {
      window.location.href="../telalerqr/index.html";
    });

    const usuario = usuarioInput.value;
    const email = emailInput.value;

    
    if (!usuario || !email) {
      console.error('Please enter both user and email');
      return;
    }

    const resetUrl = 'https://www.armariosapi.somee.com/api/Usuarios/RedefinirSenha';
    const resetData = {
      usuario: usuario,
      email: email
    };

    fetch(resetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resetData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonResponse => {
        console.log('Password Reset Response:', jsonResponse);
        // You might want to add further logic here based on the response
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  buttonContainer.appendChild(resetButton);
}

createResetButton();
