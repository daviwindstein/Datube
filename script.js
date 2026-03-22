let usuarioLogado = null;

// 🔐 CRIAR CONTA
async function registrar(){
  let username = prompt("Crie um nome de usuário:");
  let senha = prompt("Crie uma senha:");

  // verificar se já existe
  let users = await getDocs(collection(db, "users"));
  let existe = false;

  users.forEach(u => {
    if(u.data().username === username){
      existe = true;
    }
  });

  if(existe){
    alert("Nome já existe!");
    return;
  }

  await addDoc(collection(db, "users"), {
    username,
    password: senha,
    inscritos: 0
  });

  alert("Conta criada!");
}

// 🔓 LOGIN
async function login(){
  let username = prompt("Usuário:");
  let senha = prompt("Senha:");

  let users = await getDocs(collection(db, "users"));

  users.forEach(u => {
    let data = u.data();

    if(data.username === username && data.password === senha){
      usuarioLogado = username;
      alert("Logado como " + username);
    }
  });

  if(!usuarioLogado){
    alert("Erro no login");
  }
}
async function uploadVideo(){
  if(!usuarioLogado){
    alert("Faça login!");
    return;
  }

  let file = document.createElement("input");
  file.type = "file";
  file.accept = "video/*";
  file.click();

  file.onchange = async () => {
    let video = file.files[0];
    let titulo = prompt("Título:");
    let descricao = prompt("Descrição:");

    let refVideo = ref(storage, "videos/" + video.name);
    await uploadBytes(refVideo, video);
    let url = await getDownloadURL(refVideo);

    await addDoc(collection(db, "videos"), {
      titulo,
      descricao,
      url,
      dono: usuarioLogado,
      likes: 0,
      views: 0
    });

    alert("Vídeo enviado!");
    carregarVideos();
  }
}
async function comentar(videoId){
  if(!usuarioLogado){
    alert("Faça login!");
    return;
  }

  let texto = prompt("Comentário:");

  await addDoc(collection(db, "comentarios"), {
    videoId,
    usuario: usuarioLogado,
    texto
  });

  alert("Comentado!");
}
async function like(id){
  alert("Like registrado (simples)");
}
async function verCanal(){
  if(!usuarioLogado){
    alert("Faça login!");
    return;
  }

  let lista = document.getElementById("videos");
  lista.innerHTML = "";

  let query = await getDocs(collection(db, "videos"));

  query.forEach(doc => {
    let v = doc.data();

    if(v.dono === usuarioLogado){
      lista.innerHTML += `
        <div>
          <video src="${v.url}" width="300" controls></video>
          <p>${v.titulo}</p>
        </div>
      `;
    }
  });
}
async function pesquisar(){
  let termo = prompt("Pesquisar:");

  let lista = document.getElementById("videos");
  lista.innerHTML = "";

  let query = await getDocs(collection(db, "videos"));

  query.forEach(doc => {
    let v = doc.data();

    if(v.titulo.includes(termo)){
      lista.innerHTML += `
        <div>
          <video src="${v.url}" width="300" controls></video>
          <p>${v.titulo}</p>
        </div>
      `;
    }
  });
}
