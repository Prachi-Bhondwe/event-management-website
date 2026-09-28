/* =========================================
   EVENTHUB - MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   1. DEFAULT EVENTS
   ========================================= */

const defaultEvents = [
    {
        name: "Tech Fest",
        category: "Technology",
        date: "2026-10-15",
        venue: "Main Auditorium",
        description: "Explore technology, innovation and exciting ideas."
    },
    {
        name: "Cultural Fest",
        category: "Cultural",
        date: "2026-11-05",
        venue: "College Ground",
        description: "Celebrate culture, creativity, music and performances."
    },
    {
        name: "Sports Event",
        category: "Sports",
        date: "2026-11-20",
        venue: "Sports Ground",
        description: "Participate in exciting sports and team activities."
    }
];


/* =========================================
   2. LOCAL STORAGE
   ========================================= */

function getEvents() {

    const savedEvents = localStorage.getItem("events");

    if (savedEvents) {
        return JSON.parse(savedEvents);
    }

    localStorage.setItem("events", JSON.stringify(defaultEvents));

    return defaultEvents;
}


function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
}


/* =========================================
   3. DISPLAY EVENTS
   ========================================= */

function displayEvents() {

    const eventContainer =
        document.getElementById("eventContainer");

    if (!eventContainer) {
        return;
    }

    const events = getEvents();

    eventContainer.innerHTML = "";

    events.forEach(function(event) {

        const card =
            document.createElement("div");

        card.className = "event-card";


        /* CATEGORY DESIGN */

        let eventClass = "tech-event";
        let eventIcon = "💻";

        if (event.category === "Cultural") {

            eventClass = "cultural-event";
            eventIcon = "🎭";

        } else if (event.category === "Sports") {

            eventClass = "sports-event";
            eventIcon = "⚽";

        } else if (event.category === "AIML") {

            eventClass = "tech-event";
            eventIcon = "🤖";

        } else if (event.category === "Other") {

            eventClass = "tech-event";
            eventIcon = "✨";
        }


        card.innerHTML = `

            <!-- EVENT TOP -->

            <div class="event-top ${eventClass}">

                <span>
                    ${eventIcon}
                </span>

                <p>
                    ${event.category}
                </p>

            </div>


            <!-- EVENT CONTENT -->

            <div class="event-content">

                <span class="event-badge">
                    ${event.category}
                </span>


                <h3>
                    ${event.name}
                </h3>


                <p class="event-description">
                    ${event.description ||
                    "Join us for this exciting event."}
                </p>


                <!-- EVENT INFORMATION -->

                <div class="event-info">

                    <p>
                        📅 ${event.date}
                    </p>

                    <p>
                        ⏰ ${event.time ||
                        "Time not specified"}
                    </p>

                    <p>
                        📍 ${event.venue}
                    </p>

                    <p>
                        👤 ${event.organizer ||
                        "Event Organizer"}
                    </p>

                </div>


                <!-- REGISTER BUTTON -->

                <a
                    href="register.html"
                    class="event-register-btn"
                >
                    Register Now →
                </a>

            </div>
        `;


        eventContainer.appendChild(card);

    });
}

     


/* =========================================
   4. ADMIN - ADD EVENT
   ========================================= */

const eventForm = document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const eventName =
            document.getElementById("eventName").value;

        const eventCategory =
            document.getElementById("eventCategory").value;

        const eventDate =
            document.getElementById("eventDate").value;

        const eventTime =
            document.getElementById("eventTime").value;

        const eventVenue =
            document.getElementById("eventVenue").value;
        
        const eventOrganizer =
            document.getElementById("eventOrganizer").value;    

        const eventDescription =
            document.getElementById("eventDescription").value;

        const eventDepartment =
            document.getElementById("eventDepartment").value;

        const newEvent = {
            name: eventName,
            category: eventCategory,
            date: eventDate,
            time: eventTime,
            venue: eventVenue,
            organizer: eventOrganizer,
            department: eventDepartment,
            description: eventDescription
            
        };


        const events = getEvents();

        events.push(newEvent);

        saveEvents(events);


        alert("Event added successfully! 🎉");


        eventForm.reset();


        displayAdminEvents();

        updateEventCount();

    });
}


/* =========================================
   5. ADMIN - DISPLAY EVENTS
   ========================================= */

function displayAdminEvents() {

    const adminEventContainer =
        document.getElementById("adminEventContainer");

    if (!adminEventContainer) {
        return;
    }

    const events = getEvents();

    adminEventContainer.innerHTML = "";


    events.forEach((event, index) => {

        const card = document.createElement("div");

        card.className = "admin-event-item";

        card.innerHTML = `

            <div class="admin-event-info">

                <span class="admin-event-category">
                    ${event.category}
                </span>

                <h3>${event.name}</h3>

   <p>
    📅 ${event.date}
    &nbsp;&nbsp;
    ⏰ ${event.time || "Time not specified"}
    &nbsp;&nbsp;
    📍 ${event.venue}
</p>

<small>
    👤 ${event.organizer || "Event Organizer"}
</small>
<p>
    🏫 ${event.department ||
    "Department not specified"}
</p>
                <small>
                    ${event.description || ""}
                </small>

            </div>


            <button
                class="delete-event-btn"
                onclick="deleteEvent(${index})">

                🗑 Delete

            </button>
        `;


        adminEventContainer.appendChild(card);

    });
}
/* =========================================
   LOAD EVENTS IN REGISTRATION DROPDOWN
   ========================================= */

function loadRegistrationEvents() {

    const eventSelect = document.getElementById("event");

    if (!eventSelect) {
        return;
    }

    const events = getEvents();

    eventSelect.innerHTML = `
        <option value="">
            -- Select Event --
        </option>
    `;

    events.forEach(function(event) {

        const option = document.createElement("option");

        option.value = event.name;
        option.textContent = event.name;

        eventSelect.appendChild(option);

    });
}

/* =========================================
   6. DELETE EVENT
   ========================================= */

function deleteEvent(index) {

    const events = getEvents();

    const confirmDelete =
        confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) {
        return;
    }


    events.splice(index, 1);

    saveEvents(events);


    displayAdminEvents();

    displayEvents();

    updateEventCount();


    alert("Event deleted successfully.");
}


/* =========================================
   7. UPDATE EVENT COUNT
   ========================================= */

function updateEventCount() {

    const eventCount =
        document.getElementById("eventCount");

    if (!eventCount) {
        return;
    }

    const events = getEvents();

    eventCount.textContent = events.length;
}


/* =========================================
   8. REGISTRATION
   ========================================= */

const registrationForm =
    document.getElementById("registrationForm");


if (registrationForm) {

    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const selectedEvent =
            document.getElementById("event").value;

        const department =
            document.getElementById("department").value;

        const registration = {
            name: name,
            email: email,
            phone: phone,
            department: department,
            event: selectedEvent
        };


        const registrations =
            JSON.parse(
                localStorage.getItem("registrations")
            ) || [];


        registrations.push(registration);


        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        const message =
            document.getElementById("message");


        if (message) {

            message.textContent =
                "Registration successful! 🎉";

            message.style.color = "#46d9ff";

        }


        registrationForm.reset();


        displayParticipants();

        updateParticipantCount();

    });
}


/* =========================================
   9. DISPLAY PARTICIPANTS
   ========================================= */

function displayParticipants() {

    const tableBody =
        document.getElementById("participantTableBody");

    if (!tableBody) {
        return;
    }


    const registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    tableBody.innerHTML = "";


    if (registrations.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-row">
                    No registrations yet.
                </td>
            </tr>
        `;

        return;
    }


    registrations.forEach(function(registration) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${registration.name}</td>

            <td>${registration.email}</td>

            <td>${registration.phone}</td>

            <td>${registration.department || "Not specified"}</td>

            <td>${registration.event}</td>

        `;


        tableBody.appendChild(row);

    });
}


/* =========================================
   10. UPDATE PARTICIPANT COUNT
   ========================================= */

function updateParticipantCount() {

    const participantCount =
        document.getElementById("participantCount");

    if (!participantCount) {
        return;
    }


    const registrations =
        JSON.parse(
            localStorage.getItem("registrations")
        ) || [];


    participantCount.textContent =
        registrations.length;
}


/* =========================================
   11. RUN FUNCTIONS WHEN PAGE LOADS
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {

    displayEvents();

    displayAdminEvents();

    displayParticipants();

    updateEventCount();

    updateParticipantCount();

    loadRegistrationEvents();
});
/* =========================================
   CLEAR ALL REGISTRATIONS
   ========================================= */

function clearRegistrations() {

    const confirmClear =
        confirm("Are you sure you want to delete all registrations?");

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem("registrations");

    displayParticipants();

    updateParticipantCount();

    alert("All registrations deleted successfully.");
}