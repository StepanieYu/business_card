async function liffInit() {
  await liff.init({ liffId: "1657623497-DZyKpqOL" });
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href });
  }
}

async function liffProfile() {
  const profile = await liff.getProfile();
  const displayName = profile.displayName;
  const h1 = document.createElement("h1");
  const textNode = document.createTextNode(`Hello ${displayName}`);
  h1.appendChild(textNode);

  const body = document.querySelector('body');
  body.appendChild(h1);
}

function createButton(profile, body) {
  const urlParams = new URLSearchParams(window.location.search);
  const userImage = profile.pictureUrl;
  const userReply = [urlParams.get('name'), urlParams.get('phone'), urlParams.get('email'), userImage];
  const flexContent = flexCard(userReply);
  const handleClick = async () => {
    if (liff.isApiAvailable("shareTargetPicker")) {
      try {
        const result = await liff.shareTargetPicker([
          {
            "type": "flex",
            "altText": `${urlParams.get('name')} present name card from Netlify`,
            "contents": flexContent
          }
        ])

        if (result) {
          alert('Flex Message success');
        }

      } catch (error) {
        alert("Flex Message got some error");
      }
    }
  }

  const button = document.createElement("button");
  button.innerHTML = "Share Your Name Card";
  button.onclick = handleClick;

  body.appendChild(button);
}

async function main() {
  await liffInit()
  const profile = await liff.getProfile();
  const body = document.querySelector('body');
  createButton(profile, body);
}

main()
