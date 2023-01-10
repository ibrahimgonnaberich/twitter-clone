let tweetsInformation = []; 




function getItemFromStorage(){
  let retrievedTasks = JSON.parse(localStorage.getItem('tweetsInformation'))
  tweetsInformation = retrievedTasks ?? []
}
getItemFromStorage()
addTweet()




function storeTweets() {
  let tweetsInformationString = JSON.stringify(tweetsInformation)
  localStorage.setItem("tweetsInformation", tweetsInformationString)
}





function addTweet() {
  let index = 0;
  for (element of tweetsInformation) {
    document.getElementById(
      "tweetsholder"
    ).innerHTML += `<div class="feed-tweet" id="tweetbgClor${index}">
<img src="imgs/pfp.jpg" alt="" class="tweet-img">
<div class="feed-tweet-details">
  <div class="tweeter-details">
    <a href="" class="tweeter-name">
      <p class="full-name">${element.fullName}</p>

      <span class="tweeter-tag">
      ${element.tagName}
      </span>
    </a>
    <i class="material-icons-outlined">more_horiz</i>
  </div>
  <div class="tweet-text">
    <p>${element.contant}</p>
  </div>
  <div class="tweet-icons">
    <i class="material-symbols-outlined">
      bar_chart
    </i>
    <i class="material-symbols-outlined">
      mode_comment
    </i>
    <i class="material-symbols-outlined" onclick="retweet(${index})" id="retweetcolor${index}">
      quick_phrases
    </i>
    <i class="fa-solid fa-heart" id="likeClicked${index}" onclick="likeButtonPressed(${index})" style="display: none;"></i>
    <i class="material-icons-outlined" id="like${index}" onclick="likeButtonPressed(${index})">favorite_border</i>
   
    <i class="material-icons-outlined">upload</i>
  </div>`;

    index++;
  }
  storeTweets()
}

function generateTwitterHandle(name) {
  var names = name.split(" ");
  var firstName = names[0];
  var lastName = names[1];
  var firstInitial = firstName.charAt(0);
  var lastInitial = lastName;
  var handle = "@" + firstInitial + lastInitial;
  storeTweets()
  return handle;
}




document.getElementById("tweet-add-btn").addEventListener("click", function () {
  let nameAdded = document.getElementById("full-name-added");
  let contantAdded = document.getElementById("tweet-contant-added");
  if (nameAdded.value.trim() === "" || contantAdded.value.trim() === "") {
    alert("u must add name or contant");
    return;
  }
  document.getElementById("tweetsholder").innerHTML = "";
  tweetsInformation.unshift({
    fullName: nameAdded.value,
    tagName: generateTwitterHandle(nameAdded.value),
    contant: contantAdded.value,
    isLiked: false,
    isRetweeted: false,
  });
  storeTweets()
  addTweet();
  nameAdded.value = "";
  contantAdded.value = "";
});






function likeButtonPressed(index) {
  if (tweetsInformation[index].isLiked == false) {
    document.getElementById(`like${index}`).style.display = "none";
    document.getElementById(`likeClicked${index}`).style.color = "red";
    document.getElementById(`likeClicked${index}`).style.display = "inline";
    document.getElementById(`tweetbgClor${index}`).style.backgroundColor =
      "whitesmoke";
    tweetsInformation[index].isLiked = true;
    storeTweets()
  } else {
    document.getElementById(`likeClicked${index}`).style.display = "none";
    document.getElementById(`like${index}`).style.display = "inline";
    document.getElementById(`like${index}`).style.color = "(110,118,125)";
    document.getElementById(`tweetbgClor${index}`).style.backgroundColor =
      "white";
    tweetsInformation[index].isLiked = false;
    storeTweets()
  }
}

function retweet(index) {
  if (tweetsInformation[index].isRetweeted == false) {
    document.getElementById("tweetsholder").innerHTML = "";
    tweetsInformation.unshift({
      fullName: tweetsInformation[index].fullName,
      tagName: generateTwitterHandle(tweetsInformation[index].fullName),
      contant: tweetsInformation[index].contant,
      isLiked: false,
      isRetweeted: true,
    });
    tweetsInformation[index+1].isRetweeted = true;
    addTweet();
    storeTweets()
  } else {
    alert("the tweet already tweeted");
  }
}
