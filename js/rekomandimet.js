const textarea = document.getElementById("comment-text");
const template = document.getElementById("template-new-comment");
const button = document.getElementById("submit-btn");
const output = document.querySelector(".new-comments-section");



button.addEventListener("click", shtoRekomandim);

function shtoRekomandim() {
  let text = textarea.value.trim();
  if (text === "") return;

  var clone = template.content.cloneNode(true);
  clone.querySelector(".recent-comment").textContent = text;

  let timeEl = clone.querySelector(".comment-time");
  let createdAt = Date.now();

  timeEl.dataset.time = createdAt;
  timeEl.textContent = "now";

 
  output.prepend(clone);
  textarea.value = "";
}


function initReactions(r) {
    r.querySelector('.num-likes').textContent = Math.floor(Math.random() * 100) + 1;
    r.querySelector('.num-dislikes').textContent = Math.floor(Math.random() * 100) + 1;
    r.dataset.reaction = 'none';
}

// init për elementët ekzistues
document.querySelectorAll('.reactions').forEach(initReactions);


document.addEventListener('click', e => {
    const likeBtn = e.target.closest('.like-btn');
    const dislikeBtn = e.target.closest('.dislike-btn');
    if (!likeBtn && !dislikeBtn) return;

    const r = e.target.closest('.reactions');
    if (!r) return;

    const likes = r.querySelector('.num-likes');
    const dislikes = r.querySelector('.num-dislikes');
    const current = r.dataset.reaction;

    // LIKE
    if (likeBtn) {
        if (current === 'like') {
            likes.textContent--;
            r.dataset.reaction = 'none';
            return;
        }
        if (current === 'dislike') {
            dislikes.textContent--;
        }
        likes.textContent++;
        r.dataset.reaction = 'like';
    }

    // DISLIKE
    if (dislikeBtn) {
        if (current === 'dislike') {
            dislikes.textContent--;
            r.dataset.reaction = 'none';
            return;
        }
        if (current === 'like') {
            likes.textContent--;
        }
        dislikes.textContent++;
        r.dataset.reaction = 'dislike';
    }
});


function timeAgo(timestamp) {
  let diff = Math.floor((Date.now() - timestamp) / 1000);

  if (diff < 5) return "now";
  if (diff < 60) return diff + " sec ago";

  var min = Math.floor(diff / 60);
  if (min < 60) return min + " min ago";

  var h = Math.floor(min / 60);
  if (h < 24) return h + " h ago";

  let days = Math.floor(h / 24);
  return days + " d ago";
}

setInterval(function () {
  let times = document.querySelectorAll(".comment-time");

  times.forEach(function (el) {
    let timestamp = Number(el.dataset.time);
    if (!timestamp) return;

    el.textContent = timeAgo(timestamp);
  });
}, 1000);



