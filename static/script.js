const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }

  // Attach click event listener to each day
  document.querySelectorAll('.days div').forEach(function (dateElement) {
    dateElement.addEventListener('click', function () {
      const clickedDate = dateElement.innerText;
      showLoadingSpinner();
      sendDateToServer(clickedDate);
    });
  });
};

function showLoadingSpinner() {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.style.display = 'flex';  // Make sure the display property is set correctly
  }
}

// Function to hide loading spinner
function hideLoadingSpinner() {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
}


document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});



document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.days div').forEach(function (dateElement) {
     dateElement.addEventListener('click', function () {
        const dayNumber = dateElement.innerText;
        
        // Get the current month and year from the rendered calendar
        const currentMonth = document.querySelector('.date h1').innerText;
        const currentYear = new Date().getFullYear();

        // Construct the complete date format
        const clickedDate = `${dayNumber} ${currentMonth} ${currentYear}`;

        // Check if the clickedDate is defined before sending to the server
        if (clickedDate) {
           sendDateToServer(clickedDate);
        }
     });
  });

  function sendDateToServer(clickedDate) {
    showLoadingSpinner();

     const xhr = new XMLHttpRequest();
     xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           updateNewsContent(xhr.responseText);
        }
     };

     const url = `/get_news?clickedDate=${encodeURIComponent(clickedDate)}`;
     xhr.open('GET', url, true);
     xhr.send();
  }

  function updateNewsContent(newsContent) {
    const headlinesArray = newsContent.split('\n');
    const formattedHeadlines = headlinesArray.map(headline => `<p>${headline.trim()}</p>`);

    document.getElementById('rightSide').innerHTML = formattedHeadlines.join('');
    hideLoadingSpinner();
  }
});


renderCalendar();
