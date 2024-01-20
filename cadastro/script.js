document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('button');
  button.addEventListener('click', async function (event) {
      event.preventDefault(); 
      const nome = document.getElementById('nome').value;
      const nomeUsuario = document.getElementById('nomeUsuario').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      try {
          const isNomeUsuarioExists = await checkIfNomeUsuarioExists(nomeUsuario,email);
          if (isNomeUsuarioExists) {
              alert('Este nome de usuário já está em uso. Escolha outro.');
          } else {
              await postData(nome, nomeUsuario, email, senha);
              alert('Usuário registrado com sucesso!');
              
              window.location.href = "../telaleqr/index.html";
          }
      } catch (error) {
          console.error('Erro durante o processo:', error);
          alert('Erro durante o processo. Consulte o console para mais informações.');
      }
  });

  
  const goBackButton = document.getElementById('goBackButton');
  goBackButton.addEventListener('click', function () {
     
      window.history.back();
  });
});

async function checkIfNomeUsuarioExists(nomeUsuario) {
  const apiUrl = 'https://www.armariosapi.somee.com/api/Usuarios';

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      return data.some(user => user.nomeUsuario === nomeUsuario);
  } catch (error) {
      console.error('Erro ao verificar a existência do nomeUsuario:', error);
      throw new Error('Erro ao verificar a existência do nomeUsuario');
  }
}

async function postData(nome, nomeUsuario, email, senha) {
  const apiUrl = 'https://www.armariosapi.somee.com/api/Usuarios';

  const postData = {
      nome: nome,
      nomeUsuario: nomeUsuario,
      email: email,
      senha: senha
  };

  const fetchOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
  };

  try {
      const response = await fetch(apiUrl, fetchOptions);

      if (response.ok) {
          const responseData = await response.text();
          console.log('Registration successful. Response:', responseData);
      } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Erro durante o processo de registro');
  }
}
