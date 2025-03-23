document.addEventListener("DOMContentLoaded", () => {
    const counter = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const heartButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const likesList = document.querySelector(".likes");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("list");

    let count = 0;
    let isPaused = false;
    let likes = {};
    let interval = setInterval(updateCounter, 1000);

    function updateCounter() {
        if (!isPaused) {
            count++;
            counter.textContent = count;
        }
    }

    plusButton.addEventListener("click", () => {
        count++;
        counter.textContent = count;
    });

    minusButton.addEventListener("click", () => {
        count--;
        counter.textContent = count;
    });

    heartButton.addEventListener("click", () => {
        if (likes[count]) {
            likes[count]++;
        } else {
            likes[count] = 1;
        }

        let existingLike = document.getElementById(`like-${count}`);
        if (existingLike) {
            existingLike.textContent = `${count} has been liked ${likes[count]} times`;
        } else {
            let likeItem = document.createElement("li");
            likeItem.id = `like-${count}`;
            likeItem.textContent = `${count} has been liked 1 time`;
            likesList.appendChild(likeItem);
        }
    });

    pauseButton.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(interval);
            pauseButton.textContent = "resume";
            disableButtons(true);
        } else {
            interval = setInterval(updateCounter, 1000);
            pauseButton.textContent = "pause";
            disableButtons(false);
        }
    });

    function disableButtons(disabled) {
        plusButton.disabled = disabled;
        minusButton.disabled = disabled;
        heartButton.disabled = disabled;
    }

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevents form from reloading the page

        let commentText = commentInput.value.trim();
        if (commentText !== "") {
            let commentElement = document.createElement("p");
            commentElement.textContent = commentText;
            commentList.appendChild(commentElement);
            commentInput.value = ""; // Clear input field after submission
        }
    });
});
