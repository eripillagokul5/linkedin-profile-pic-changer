const newProfilePicUrl = chrome.runtime.getURL("new-profile-pic.jpg");
console.log('New profile picture URL:', newProfilePicUrl);

function replaceProfilePictures() {
  const profilePics = document.querySelectorAll('img[class*="profile-photo"], img[class*="EntityPhoto-circle-"]');
  console.log('Profile pictures found:', profilePics.length);

  profilePics.forEach((pic) => {
    console.log('Replacing picture:', pic);
    pic.src = newProfilePicUrl;
    pic.srcset = `${newProfilePicUrl} 1x, ${newProfilePicUrl} 2x`;

    pic.onload = () => {
      console.log('New profile picture loaded successfully:', newProfilePicUrl);
    };

    pic.onerror = (e) => {
      console.error('Failed to load new profile picture', e);
    };
  });
}


replaceProfilePictures();


const observer = new MutationObserver(() => {
  console.log('Mutation observed. Replacing profile pictures again.');
  replaceProfilePictures();
});

observer.observe(document.body, { childList: true, subtree: true });
