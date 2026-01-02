const popup = document.getElementById('popup-img');
const openBtn = document.getElementById('new-image-btn');
const closeBtn = document.getElementById('closePopup-img');
const saveBtn = document.getElementById('save-img');
const inputImg = document.getElementById('image-input');
const outputImg = document.getElementById('my-profile-img');
const errorImg = document.getElementById('message');

const openBioBtn = document.getElementById('bio-btn');
const saveBio = document.getElementById('save-bio');
const cancelBio = document.getElementById('cancel');
const updateBio = document.getElementById('change-bio');

const bioName = document.getElementById('your-name');
const bioEmail = document.getElementById('your-email');
const bioJob = document.getElementById('job');
const bioNumber = document.getElementById('number');
const errorBio = document.getElementById('bio-alert');

const bioDisplayName = document.getElementById('my-name');
const bioDisplayEmail = document.getElementById('my-email');
const bioDisplayJob = document.getElementById('my-job');
const bioDisplayNumber = document.getElementById('my-phone');

let selectedImage = null;

openBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  errorImg.textContent = '';
  popup.style.display = 'none';
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    errorImg.textContent = '';
    popup.style.display = 'none';
  }
});

inputImg.addEventListener('change', ()=>{
    const file = inputImg.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = () =>{
        selectedImage = reader.result;
        outputImg.src = selectedImage;
    };
    reader.readAsDataURL(file);
});


saveBtn.onclick = function(){
  if (selectedImage) {
    popup.style.display = 'none';
  }else if(!selectedImage){
    popup.style.display = 'flex';
    errorImg.style.display = 'block';
    errorImg.textContent = 'Nuk keni perzgjedhur ndonje imazh!';
    errorImg.style.color = 'red';
    errorImg.style.fontWeight = 'bold';
  }
};

openBioBtn.onclick = function(){
    updateBio.style.display = 'flex';
    bioName.value = bioDisplayName.textContent;
    bioEmail.value = bioDisplayEmail.textContent;
    bioJob.value = bioDisplayJob.textContent;
    bioNumber.value = bioDisplayNumber.textContent;

}

cancelBio.addEventListener('click', () => {
    errorBio.textContent = '';
    updateBio.style.display = 'none';
});

updateBio.addEventListener('click', (e) => {
    if (e.target === updateBio) {
        errorBio.textContent = '';
        updateBio.style.display = 'none';
    }
});

saveBio.onclick = function(){
    bioDisplayName.textContent = bioName.value;
    bioDisplayEmail.textContent = bioEmail.value;
    bioDisplayJob.textContent = bioJob.value;
    bioDisplayNumber.textContent = bioNumber.value;

    if(bioName.value === '' || bioEmail.value === '' || bioJob.value === '' || bioNumber.value === ''){
        errorBio.textContent = 'Ju lutem plotesoni te gjitha fushat!';
        errorBio.style.color = 'red';
        errorBio.style.fontWeight = 'bold';
        return;
    }

    updateBio.style.display = 'none';
}