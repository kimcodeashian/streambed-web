const socket = io("http://localhost:5000");

$(document).ready(function () {
  console.log("ready");

  let searchParams = new URLSearchParams(window.location.search);
  var videoActivity = (feed) => {
    const videoID = searchParams.get("v_id");
    console.log(videoID);
    if (feed.activity.userVideoId == videoID) {
      $(".activity-feed-row").prepend(
        '<div class="d-flex flex-row justify-content-between mt-3 mb-4 activity-row"><div class="align-items-center d-flex flex-row" ><div class="d-flex flex-column justify-content-center"><i class="fas fa-user-circle fa-4x text-center streamGrey mb-0"></i></div> <div class="ml-4"> <p class="mb-0 streamGrey"> <b class="streamGreen">' +
          feed.user.displayName +
          '</b> posted a video to <b class="streamGreen text-capitalize">' +
          feed.activity.platform +
          '.</b> </p> <div class="d-flex justify-content-between streamGrey"> <span>' +
          new Date(feed.activity.createdAt).toDateString() +
          "</span> <span>" +
          new Date(feed.activity.createdAt).toLocaleTimeString() +
          '</span> </div> </div> </div> <div class="d-flex flex-column justify-content-center"> <a class="btn btn-primary streamButton activityFeedButton ml-0" href="/content.html?v_id=' +
          feed.activity.userVideoId +
          '" >CHECK IT OUT</a></div></div>'
      );
    }
  };
  socket.on("connect", () => {
    console.log("connected"); // true
  });
  socket.on("disconnect", () => {
    console.log("disconnected"); // false
  });
  var colorCodes = {
    back: "#fff",
    front: "#888",
    side: "#369",
  };

  var feed = null;
  socket.on("index_activity_feed", (data) => {
    feed = data;
    console.log("hey", feed);
    videoActivity(data);
  });

  socket.on("index_activity_feed_coll", (feed) => {
    let searchParams = new URLSearchParams(window.location.search);

    const videoID = searchParams.get("v_id");
    console.log(videoID);
    if (feed.activity.userVideoId == videoID) {
      $(".activity-feed-row").prepend(
        '<div class="d-flex flex-row justify-content-between mt-3 mb-4 activity-row"><div class="align-items-center d-flex flex-row" ><div class="d-flex flex-column justify-content-center"><i class="fas fa-user-circle fa-4x text-center streamGrey mb-0"></i></div> <div class="ml-4"> <p class="mb-0 streamGrey"> <b class="streamGreen">' +
          feed.user.displayName +
          '</b> is now a verified  <b class="streamGreen text-capitalize">' +
          "collaborator" +
          '.</b> </p> <div class="d-flex justify-content-between streamGrey"> <span>' +
          new Date().toDateString() +
          "</span> <span>" +
          new Date().toLocaleTimeString() +
          '</span> </div> </div> </div> <div class="d-flex flex-column justify-content-center"> <a class="btn btn-primary streamButton activityFeedButton ml-0" href="/content.html?v_id=' +
          feed.activity.userVideoId +
          '" >CHECK IT OUT</a></div></div>'
      );
    }
  });
});