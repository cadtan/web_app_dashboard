
/* ============================================================ 
  Variables
=============================================================== */

var sendButton = document.querySelector(".send-button");
var notificationButton = document.querySelector(".notification");
var notifyNumber = document.querySelector(".notify-number");
var newMemberDiv = document.querySelector(".new-member");
var recentActivity = document.querySelector(".recent-activity");

var trafficHourlyButton = document.getElementById("traffic-hourly");
var trafficDailyButton = document.getElementById("traffic-daily");
var trafficWeeklyButton = document.getElementById("traffic-weekly");
var trafficMonthlyButton = document.getElementById("traffic-monthly");

var notificationList = document.getElementById("notification-list");
var ctxTraffic = document.getElementById("traffic-chart").getContext("2d");
var ctxDaily = document.getElementById("daily-chart").getContext("2d");
var ctxMobile = document.getElementById("mobile-chart").getContext("2d");



/* ============================================================ 
    Message Notifications 
=============================================================== */


// Notifications array list
var notifications = [
  ["Marcos Moralez sent you a message", "6 minutes ago"],
  ["Tomas Lauriv commented on Facebook's changes for 2017", "2 hours ago"],
  ["Matt Smitt like the post Facebook's changes for 2017", "1 day ago"]
];

var totalNotifications = notifications.length;

// If there is notification/s, show total number of
if (notifications.length !== 0) {
  notifyNumber.style.display = "inline-block";
  notifyNumber.innerHTML = notifications.length;
  notificationButton.style.marginRight = "0px";
} else {
    notifyNumber.style.display = "none";
}

function updateNum( num ) {
  totalNotifications = num;
  if ( totalNotifications === 0 ) {
   notifyNumber.style.display = "none";  
  } else {
    notifyNumber.innerHTML = totalNotifications;
  }
}

// Print notification list items
(function printList() {
  var html = '<ul id="notify-list-items">';
  for (var i=0;  i<notifications.length; i++) {
     html += '<li class="notify-list">';
     html += '<span class="close-button"> X </span>'; 
     html +=  notifications[i][0];
     html +=  '<br>';
     html +=  '<span class="notify-time">';
     html +=  notifications[i][1];
     html +=  '</span>';
     html +=  '</li>';
  }
  html += '</ul>';
  // Print list items
  notificationList.innerHTML = html;
})();


// Bind deleteList to delete button
function bindEvent( listItem ) {
  var deleteButton = listItem.querySelector('.close-button');
 
  deleteButton.onclick = function() {
    this.parentNode.style.display = "none";
    totalNotifications -= 1;
    updateNum( totalNotifications );
  };   
}

// Cycle over notification ul list items
var listItems = document.getElementById("notify-list-items");
for(var i = 0; i < listItems.children.length; i++) {
  // Bind event to list item's children
  bindEvent(listItems.children[i]);
}

// Toggle notifications
notificationButton.addEventListener("click", function() {
  notificationList.classList.toggle("show");
});


/* ============================================================ 
    Charts
=============================================================== */

// *********** Traffic Chart ********************** //


// Change canvas size
ctxDaily.canvas.width = 300;

Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;

// Hourly traffic data
var hourlyData = {
        labels: [ "0-2", "2-4", "4-6", "6-8", "8-10", "10-12", "12-14", "14-16", "16-18", "18-20", "20-22", "22-24" ],
        datasets: [
            {
              data: [ 1500,1750,1250,1750,2000,1750,2250,750,1250,1000,1500,2000 ],
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 5,
              pointHitRadius: 12               
            }     
        ]
};

// Daily traffic data
var dailyData = {
        labels: [ "S", "M", "T", "W", "T", "F", "S" ],
        datasets: [
            {
              data: [ 130, 80, 120, 225, 180, 90, 40 ],
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 5,
              pointHitRadius: 12               
            }     
        ]
};

// Weekly traffic data
var weeklyData = {
        labels: [ "16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31" ],
        datasets: [
            {
              data: [ 500, 180, 520, 625, 880, 500, 400, 200, 600, 800, 1000, 800, 800 ],
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 5,
              pointHitRadius: 12               
            }     
        ]
};

// Monthly traffic data
var monthlyData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
              data: [2000, 4800, 3000, 2500, 3000, 4000, 4400, 4500, 4000, 3500, 2400, 3000],
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 5,
              pointHitRadius: 12               
            }     
        ]
};


// Update data changes for traffic chart
function updateData ( data ) {
    // Remove highlighted button
    $("button").removeClass("selected");
    // Add highlight to selected button
    $(this).addClass("selected");

    // Update data changes
    trafficChart.config.data = data;
    trafficChart.update();
}


// Traffic widget buttons
trafficHourlyButton.onclick = function() {
  updateData(hourlyData);
};
trafficDailyButton.onclick = function() {
  updateData(dailyData);
};
trafficWeeklyButton.onclick = function() {
  updateData(weeklyData);
};
trafficMonthlyButton.onclick = function() {
  updateData(monthlyData);
};

// Draw Traffic Chart
var trafficChart = new Chart(ctxTraffic, {
    type: 'line',
    data: monthlyData,
    options: {
        legend: {
            display: false
        } 
    }
});


// *********** Daily Chart ********************** //


var dailyChart = new Chart( ctxDaily, {
    type: 'bar',
     data : {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [{
            label: "Morning",
            backgroundColor: 'rgba(4, 115, 158, 1)' ,   
            data: [65, 59, 80, 81, 56, 55, 40]
        }, {
            label: "Evening",
            backgroundColor: 'rgba(0, 221, 122, 1)' ,
            data: [35, 26, 60, 51, 36, 45, 20]
        }]
    }
});


// *********** Mobile User Chart ********************** //

var mobileChart = new Chart( ctxMobile, {
    type: 'doughnut',
    data: {
        labels: [
            "Phones",
            "Tablets",
            "Desktop",
            "other"
        ],
        datasets: [
            {
              data: [300, 50, 100, 20],
              backgroundColor: [
                  "rgba(4, 115, 158, 1)",
                  "rgba(0, 198, 206, 1)",
                  "rgba(2, 221, 122, 1)",
                  "rgba(240, 215, 94, 1)"
              ],
                hoverBackgroundColor: [
                "rgba(4, 118, 224, 1)",
                "rgba(0, 227, 224, 1)",
                "rgba(81, 233, 188, 1)",
                "rgba(229, 178, 99, 1)"
                ]
            }
        ]
    }
 });


/* ============================================================ 
    New Members
=============================================================== */

var newMembers = [
  {
    firstName: "Mahmoud",
    lastName: "Ghoz",
    email: "mahmoud.ghoz80@gmail.com",
    date: "01/17/17",
    photo: "mahmoud-ghoz.png"  
  },

  {
    firstName: "Thomas",
    lastName: "Laurinavicius",
    email: "tomas.laurin@gmail.com",
    date: "02/17/17",
    photo: "thomas-laurinavicius.jpg"  
  },

  {
    firstName: "Brad",
    lastName: "Frost",
    email: "brad.frost23@gmail.com",
    date: "02/17/17",
    photo: "brad-frost.png"  
  },

  {
    firstName: "Mathew",
    lastName: "Smith",
    email: "mathew-smith44@gmail.com",
    date: "02/17/17",
    photo: "mathew-smith.png"  
  }
];

// Build new member list
function newMemberList( member ) {
  // Create new div for each member
  var newDiv = document.createElement("div");
  // Add class to div
  newDiv.className = "member flex";

  // Build each member list
  var html = "";
  html += "<img src='images/" +  member.photo + "' alt='";
  html += member.firstName + ' ' +  member.lastName + "''>";
  html += "<div class='member-info'>";
  html += "<p class='member-name'>" + member.firstName + ' ' +  member.lastName + "</p>";
  html += "<a class='member-email' href='" + member.email + "'>" + member.email + "</a>";
  html += "</div>";
  html += "<span class='date'>" + member.date + "</span>";
  // print html
  newDiv.innerHTML = html;

  // Append member div to new member div
  newMemberDiv.append( newDiv );      
}
// Loop through new members array
for ( var i = 0; i < newMembers.length; i++ ) {
  newMemberList( newMembers[i] );
}

/* ============================================================ 
    Recent Activities
=============================================================== */

var activities = [
  {
    comment: "Matt Litherla commented on YourApp's SEO Tips",
    time: "4 hours ago",
    photo: "matt-litherland.jpg"  
  },

  {
   comment: "Zack Onisko like the post Facebook's Changes for 2016",
   time: "5 hours ago",
   photo: "zack-onisko.jpeg" 
  },

  {
   comment: "Marcos Moralez commented on Facebook's Changes for 2016",
   time: "6 hours ago",
   photo: "marcos-moralez.jpg" 
  },

  {
    comment: "Nicklaus Jarvis posted YourApp's SEO Tips",
    time: "1 day ago",
    photo: "nicklaus-jarvis.jpg" 
  }
];

// Show recent activity
function recentActivities( activity ) {
  // Create new div for each activity
  var newDiv = document.createElement("div");
  // Add class to div
  newDiv.className = "member flex";

  // Build each activity list
  var html = "";
  html += "<img src='images/" + activity.photo + "' alt='";
  html += activity.firstName + ' ' +  activity.lastName + "''>";
  html += "<div class='member-activity'>";
  html += "<p class='member-comments'>" + activity.comment + "</p>";
  html += "<p class='time'>" + activity.time + "</p>";
  html += "</div>";
  html += "<img class='arrow' src='icons/arrow-forward-icon.png' alt='arrow icon'>";
  // print html
  newDiv.innerHTML = html;
  // Append member div to new member div
  recentActivity.append( newDiv );      
}
// Loop through activities array
for ( var i = 0; i < activities.length; i++ ) {
  recentActivities( activities[i] );
}


/* ============================================================ 
    Validate Form
=============================================================== */

function validateForm( event ) {
   var errorMsg = document.querySelector(".form-errors");
   var successMsg = document.querySelector(".form-success");
   var messageform = document.getElementById("message-form");
   var status = true;

   errorMsg.innerHTML = "Please fill in the highlighted field";
   successMsg.innerHTML = "Message successfully sent!!";

    for( var i=0; i<messageform.elements.length; i++ ) {
      if (messageform[i].value === "") {
        errorMsg.style.display = "block";    
        messageform[i].focus();
        status = false;
        return false;
      }
    }

    if ( status === true ) {
      // Prevent page refresh
      event.preventDefault();
      errorMsg.style.display = "none";
      $(successMsg).fadeIn("slow").delay(1000).fadeOut("slow"); 
      // Reset al values in the form elements  
      messageform.reset();  
    }
}
 
sendButton.onclick = validateForm;


/* ============================================================ 
    LOCAL STORAGE
=============================================================== */

// ************* Time zone select menu ************* //

( function timeZone() {

  var timezoneSelect = document.getElementById( "time-zone" );
  // Retrieve data from local storage
  var lastSelected = localStorage.getItem( 'timezoneSelect' );

  // If there is saved selected, set the select option to selectedIndex
  if ( lastSelected ) {
    timezoneSelect.value = lastSelected;
  }

  // When selected option changes,
  timezoneSelect.onchange = function () {
    // update new selected option
    lastSelected = timezoneSelect.options[ timezoneSelect.selectedIndex ].value;
    // Store new data 
    localStorage.setItem('timezoneSelect', lastSelected);
  };

})();


// ************* Settings ************* //

var emailCheckbox = document.getElementById('email-switch');
var profileCheckbox = document.getElementById('profile-switch');

var lastEmailData = localStorage.getItem("emailPreference");
var lastProfileData = localStorage.getItem("profilePreference");

// if previous checkbox value is not null(checked), set checkbox checked
if ( lastEmailData !== null ) {
  $(emailCheckbox).attr("checked", "checked");
}  
if ( lastProfileData !== null ) {
  $(profileCheckbox).attr("checked", "checked");
}

// Save settings in local storage
function storeData ( checkbox, name ) {
    if ( checkbox.checked === true ) {
      localStorage.setItem( name, checkbox.value);
    } else {
      localStorage.removeItem( name );
   }
}

emailCheckbox.onclick = function () {
  storeData( emailCheckbox, "emailPreference" ); 
};
profileCheckbox.onclick = function () {
  storeData( profileCheckbox, "profilePreference" ); 
};






