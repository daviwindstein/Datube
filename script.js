const videos = [
  {
    titulo: "Vídeo 1",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    titulo: "Vídeo 2",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U"
  }
];

const container = document.getElementById("videos");

videos.forEach(v => {
  container.innerHTML += `
    <div class="video">
      <iframe width="100%" src="${v.url}" frameborder="0"></iframe>
      <p>${v.titulo}</p>
      <button onclick="like()">👍 Like</button>
    </div>
  `;
});

function like(){
  alert("Você curtiu!");
}
