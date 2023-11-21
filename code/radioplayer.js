// Steg 1. Gör en fetch till 'http://api.sr.se/api/v2/channels?format=json&size=100'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.
        // done

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>


// DOMContentLoaded Event: Ensure that your JavaScript code runs after the DOM has fully loaded. You can achieve this by wrapping your code in the DOMContentLoaded event listener... 
// fixed the issue in index.html where we placed <div id="channels"> </div> AFTER the script.js link (should be before).
document.addEventListener("DOMContentLoaded", function () {
  const channelsEl = document.getElementById("channels");
  channelsEl.style.minWidth = "600px";

  async function getChannels() {

    let response;
    try { // is try-catch good to use? doesnt it use a lot of processing power?
       response = await fetch("http://api.sr.se/api/v2/channels?format=json&size=100");
    } catch (err) {
      console.log(err); // TypeError: failed to fetch
    }

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
          // better if I assigned a class to this div and styled in the css file?
      newChannelContainer.style.width = "100%";
      newChannelContainer.style.display = "flex";
      newChannelContainer.style.justifyContent = "space-evenly";
      newChannelContainer.style.border = "solid 4px black"
      newChannelContainer.style.backgroundColor = "#" + channel.color;
      channelsEl.appendChild(newChannelContainer);
    
      const newChannelImg = document.createElement("img");
      newChannelImg.src = channel.image;
      if (channel.image == undefined ) {
        console.log("image for channel id " + channel.id + " could not load.");
      }
      newChannelImg.style.width = "50%";
      newChannelContainer.appendChild(newChannelImg);

      const nameAndaudioContainer = document.createElement("div");
      nameAndaudioContainer.style.width = "50%";
      nameAndaudioContainer.style.display = "flex";
      nameAndaudioContainer.style.flexDirection = "column";
      nameAndaudioContainer.style.justifyContent = "center";
      nameAndaudioContainer.style.alignItems = "center";
      newChannelContainer.appendChild(nameAndaudioContainer);

      const newChannelName = document.createElement("div");
      newChannelName.style.padding = "0 20px";
     /*  newChannelName.style.width = "100%"; */ // if I want to set the name at the start of the div or something...
      newChannelName.innerHTML = "<h2>" + channel.name + "</h2>";
      nameAndaudioContainer.appendChild(newChannelName);
       
      const newAudioEl = document.createElement("audio");
      newAudioEl.style.width = "70%"; 
      newAudioEl.style.padding = "10px";
      newAudioEl.controls = "true";
      newAudioEl.type = "audio/mpeg";
      newAudioEl.src = channel.liveaudio.url; 
      nameAndaudioContainer.appendChild(newAudioEl);

      // INSTEAD OF ALL THIS ABOVE WE COULDVE USED THIS? here we also assigned classes so we can style in style.css...
    /*   newChannelContainer.innerHTML = `
      <img> src=${channel.image} </img> 
      <div class="nameAndAudioContainer"> 
        <div class="channelNameDiv"> <h2>${channel.name}</h2> </div>
        <audio controls class="audioPlayer">
          <source src=${channel.liveaudio.url} type="audio/mpeg" />
        </audio>
      </div> 
    `*/
    });
  
  }

  getChannels();

});
