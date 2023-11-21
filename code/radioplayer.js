// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// DOMContentLoaded Event: Ensure that your JavaScript code runs after the DOM has fully loaded. You can achieve this by wrapping your code in the DOMContentLoaded event listener... If I don't do this the channelsEl.appendChild(newChannelContainer); does not work... fetch going too fast for api?
document.addEventListener("DOMContentLoaded", function () {
  const channelsEl = document.getElementById("channels");

  async function getChannels() {

    const response = await fetch("https://api.sr.se/api/v2/channels/?format=json");

    const data = await response.json();
    console.log(data); // object of objects..?

    // this does not work... not iteratable?
    /*  data.forEach( (item) => {
      console.log(item);
    }); */

    // data.channels  data.copyright data.pagination
    data.channels.forEach( (channel) => {
      console.log(channel); // channeltype, color, id, image, imagetemplate, liveaudio, name, scheduleurl, siteurl, tagline, xmltvid...
      const newChannelContainer = document.createElement("div");
      channelsEl.appendChild(newChannelContainer);
      newChannelContainer.style.display = "flex";
      console.log(channel.color);
      newChannelContainer.style.backgroundColor = "#" + channel.color;

      const newChannelImg = document.createElement("img");
      newChannelImg.src = channel.image;
      newChannelContainer.appendChild(newChannelImg);

      const newChannelName = document.createElement("div");
      newChannelName.innerHTML = "<h2>" + channel.name + "</h2>";
      newChannelContainer.appendChild(newChannelName);

    });

    // liveaudio contains: id, statkey, url
  /*   data.channels.liveaudio.url.forEach( (url) => {
      const newAudioEl = document.createElement("audio");
      newAudioEl.src = url;
      newAudioEl
    });
  */
  }

  getChannels();

});
// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.
        // done

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
