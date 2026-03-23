// 🔥 BANCO GLOBAL
let videos = JSON.parse(localStorage.getItem("videos")) || [];
let user = localStorage.getItem("user") || "Convidado";
let foto = localStorage.getItem("foto") || "https://via.placeholder.com/40";
let idioma = localStorage.getItem("lang") || "pt";

// 🌐 IDIOMA
const textos = {
pt: {
login:"Login",
canal:"Meu Canal",
studio:"Studio",
sair:"Sair",
postar:"Postar",
}
,
en: {
login:"Login",
canal:"My Channel",
studio:"Studio",
sair:"Logout",
postar:"Upload",
}
};

// 🔄 SALVAR
function salvar(){
localStorage.setItem("videos", JSON.stringify(videos));
}

// 👤 LOGIN
window.login = () => {
let nome = prompt("Nome:");
if(nome){
localStorage.setItem("user", nome);
location.reload();
}
}

// 🚪 LOGOUT
window.logout = () => {
localStorage.removeItem("user");
location.reload();
}

// 🖼️ FOTO
window.mudarFoto = () => {
let input = document.createElement("input");
input.type="file";
input.accept="image/*";

input.onchange = () => {
let reader = new FileReader();

reader.onload = () => {
localStorage.setItem("foto", reader.result);
location.reload();
}

reader.readAsDataURL(input.files[0]);
}

input.click();
}

// 🌐 IDIOMA REAL
window.mudarIdioma = () => {
idioma = idioma === "pt" ? "en" : "pt";
localStorage.setItem("lang", idioma);
location.reload();
}

// 🔔 NOTIFICAÇÕES
window.notificar = (msg) => {
let lista = JSON.parse(localStorage.getItem("noti")) || [];
lista.push(msg);
localStorage.setItem("noti", JSON.stringify(lista));
}

// 📤 POSTAR
window.postarVideo = () => {

let video = document.getElementById("videoFile").files[0];
let thumb = document.getElementById("thumbFile").files[0];
let titulo = document.getElementById("titulo").value;

if(!video || !thumb || !titulo){
alert("Preencha tudo!");
return;
}

let rv = new FileReader();
let rt = new FileReader();

rv.onload = () => {
rt.onload = () => {

videos.unshift({
titulo,
video: rv.result,
thumb: rt.result,
dono: user,
views:0,
likes:0,
comentarios:[]
});

salvar();
notificar("Novo vídeo: " + titulo);

location.reload();

}
rt.readAsDataURL(thumb);
}
rv.readAsDataURL(video);
}

// ▶️ ABRIR
window.abrirVideo = (id)=>{
localStorage.setItem("videoAtual", id);
window.location.href="video.html";
}

// 📺 CANAL
window.irCanal = ()=>{
window.location.href="canal.html";
}

// 📊 STUDIO
window.irStudio = ()=>{
window.location.href="studio.html";
}

// 🔔 VER NOTIFICAÇÕES
window.verNoti = ()=>{
let lista = JSON.parse(localStorage.getItem("noti")) || [];
alert(lista.join("\n") || "Sem notificações");
}

// 📺 CARREGAR HOME
window.carregarHome = ()=>{

let lista = document.getElementById("videos");
if(!lista) return;

lista.innerHTML="";

videos.forEach((v,i)=>{
lista.innerHTML+=`
<div onclick="abrirVideo(${i})" style="cursor:pointer">
<img src="${v.thumb}" width="100%">
<p>${v.titulo}</p>
<p>${v.dono}</p>
<p>👁️ ${v.views}</p>
</div>
`;
});
}
