import $ from "jquery";

class Like {
  constructor() {
    this.events();
  }

  events() {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  //methods
  ourClickDispatcher(e) {
    const currentLikeBox = $(e.target).closest(".like-box");
    if (currentLikeBox.attr("data-exists") == "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(currentLikeBox) {
    $.ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      type: "POST",
      data: {
        professorId: currentLikeBox.data("professor")
      },
      success: response => {
        currentLikeBox.attr("data-exists", "yes");
        currentLikeBox.attr("data-like", response);
        let likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
        likeCount++;
        currentLikeBox.find(".like-count").html(likeCount);
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  deleteLike(currentLikeBox) {
    $.ajax({
      beforeSend: xhr => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      data: { like: currentLikeBox.attr("data-like") },
      type: "DELETE",
      success: response => {
        currentLikeBox.attr("data-exists", "no");
        currentLikeBox.attr("data-like", "");
        let likeCount = parseInt(currentLikeBox.find(".like-count").html(), 10);
        likeCount--;
        currentLikeBox.find(".like-count").html(likeCount);
        console.log(response);
      },
      error: error => {
        console.log(error);
        console.log("sad");
      }
    });
  }
}

export default Like;
