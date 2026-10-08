document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // COURSE DATA
    // ==========================================

    const courseDetails = {
        python: {
            title: "Python Full Stack Development",
            image: "/static/main/images/python.webp",
            description:
                "Learn complete Python Full Stack Development with practical training in frontend, backend, database and real-world project development.",
            category: "Software Development",
            mode: "Online",
            level: "Beginner",
            duration: "6 Months"
        },

        web: {
            title: "Web Development",
            image: "/static/main/images/web.webp",
            description:
                "Learn modern web development using HTML, CSS, JavaScript and responsive design techniques through practical projects.",
            category: "Web Development",
            mode: "Online",
            level: "Beginner",
            duration: "4 Months"
        },

        java: {
            title: "Java Programming",
            image: "/static/main/images/java.webp",
            description:
                "Build a strong foundation in Java programming, object-oriented concepts, problem solving and application development.",
            category: "Programming",
            mode: "Offline",
            level: "Intermediate",
            duration: "4 Months"
        },

        uiux: {
            title: "UI / UX Design",
            image: "/static/main/images/uiux.webp",
            description:
                "Learn UI and UX design principles, wireframing, prototyping and user-centered design to create modern digital experiences.",
            category: "UI / UX",
            mode: "Online",
            level: "Beginner",
            duration: "3 Months"
        },

        digital: {
            title: "Digital Marketing",
            image: "/static/main/images/digital.webp",
            description:
                "Learn SEO, social media marketing, content strategy, digital advertising and other important digital marketing skills.",
            category: "Digital Marketing",
            mode: "Online",
            level: "Beginner",
            duration: "3 Months"
        },

        cloud: {
            title: "Cloud Computing",
            image: "/static/main/images/cloud.webp",
            description:
                "Understand cloud computing concepts, cloud platforms, deployment, storage and essential cloud technologies.",
            category: "Cloud Computing",
            mode: "Hybrid",
            level: "Intermediate",
            duration: "4 Months"
        }
    };


    // ==========================================
    // VARIABLES
    // ==========================================

    let selectedCategory = "all";
    let selectedMode = "all";
    let selectedLevel = "all";


    // ==========================================
    // COURSE CARDS
    // ==========================================

    const courseCards = document.querySelectorAll(".course-card");

    const searchInput = document.querySelector(".search-box input");

    const searchButton = document.querySelector(".search-box button");


    // ==========================================
    // APPLY SEARCH + FILTERS
    // ==========================================

    function applyFilters() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        let visibleCourses = 0;

        courseCards.forEach(function (card) {

            const courseName =
                (card.dataset.course || "").toLowerCase();

            const category =
                (card.dataset.category || "").toLowerCase();

            const mode =
                (card.dataset.mode || "").toLowerCase();

            const level =
                (card.dataset.level || "").toLowerCase();


            // Search condition
            const matchesSearch =
                courseName.includes(searchText);


            // Category condition
            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory.toLowerCase();


            // Mode condition
            const matchesMode =
                selectedMode === "all" ||
                mode === selectedMode.toLowerCase();


            // Level condition
            const matchesLevel =
                selectedLevel === "all" ||
                level === selectedLevel.toLowerCase();


            // Final result
            if (
                matchesSearch &&
                matchesCategory &&
                matchesMode &&
                matchesLevel
            ) {

                card.style.display = "";

                visibleCourses++;

            } else {

                card.style.display = "none";

            }

        });


        // No result message
        showNoResults(visibleCourses === 0);
    }


    // ==========================================
    // NO RESULTS MESSAGE
    // ==========================================

    function showNoResults(show) {

        let noResults = document.querySelector(".no-course-results");

        if (show) {

            if (!noResults) {

                noResults = document.createElement("div");

                noResults.className = "no-course-results";

                noResults.innerHTML = `
                    <h3>No Courses Found</h3>
                    <p>Try searching with a different course name or change the filters.</p>
                `;

                const courseContainer =
                    document.querySelector(".courses-grid") ||
                    document.querySelector(".course-grid") ||
                    document.querySelector(".courses-container");

                if (courseContainer) {
                    courseContainer.appendChild(noResults);
                }
            }

        } else {

            if (noResults) {
                noResults.remove();
            }
        }
    }


    // ==========================================
    // SEARCH INPUT
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener("input", function () {
            applyFilters();
        });
    }


    // ==========================================
    // SEARCH BUTTON
    // ==========================================

    if (searchButton) {

        searchButton.addEventListener("click", function () {
            applyFilters();
        });
    }


    // ==========================================
    // ENTER KEY SEARCH
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                applyFilters();
            }
        });
    }


    // ==========================================
    // FILTER BUTTONS
    // ==========================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filterType =
                button.dataset.filter;

            const filterValue =
                button.dataset.value || "all";


            // Category
            if (filterType === "category") {

                selectedCategory = filterValue;

            }


            // Mode
            if (filterType === "mode") {

                selectedMode = filterValue;

            }


            // Level
            if (filterType === "level") {

                selectedLevel = filterValue;

            }


            // Active button only within same filter group
            document
                .querySelectorAll(
                    `.filter-btn[data-filter="${filterType}"]`
                )
                .forEach(function (btn) {

                    btn.classList.remove("active");

                });


            button.classList.add("active");


            // Apply everything together
            applyFilters();

        });

    });


    // ==========================================
    // COURSE DETAILS MODAL
    // ==========================================

    const modal =
        document.getElementById("courseModal");

    const modalTitle =
        document.getElementById("modalCourseTitle");

    const modalImage =
        document.getElementById("modalCourseImage");

    const modalDescription =
        document.getElementById("modalCourseDescription");

    const modalCategory =
        document.getElementById("modalCourseCategory");

    const modalMode =
        document.getElementById("modalCourseMode");

    const modalLevel =
        document.getElementById("modalCourseLevel");

    const modalDuration =
        document.getElementById("modalCourseDuration");

    const closeModal =
        document.querySelector(".close-modal");


    // ==========================================
    // VIEW COURSE BUTTON
    // ==========================================

    const viewCourseButtons =
        document.querySelectorAll(".view-course");


    viewCourseButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();


            const courseId =
                button.dataset.courseId;


            const course =
                courseDetails[courseId];


            if (!course) {

                console.error(
                    "Course details not found:",
                    courseId
                );

                return;
            }


            // Set course details
            if (modalTitle) {
                modalTitle.textContent =
                    course.title;
            }


            if (modalImage) {
                modalImage.src =
                    course.image;

                modalImage.alt =
                    course.title;
            }


            if (modalDescription) {
                modalDescription.textContent =
                    course.description;
            }


            if (modalCategory) {
                modalCategory.textContent =
                    course.category;
            }


            if (modalMode) {
                modalMode.textContent =
                    course.mode;
            }


            if (modalLevel) {
                modalLevel.textContent =
                    course.level;
            }


            if (modalDuration) {
                modalDuration.textContent =
                    course.duration;
            }


            // Open modal
            if (modal) {

                modal.classList.add("show");

                document.body.style.overflow =
                    "hidden";
            }

        });

    });


    // ==========================================
    // CLOSE MODAL - X BUTTON
    // ==========================================

    if (closeModal) {

        closeModal.addEventListener("click", function () {

            closeCourseModal();

        });

    }


    // ==========================================
    // CLOSE MODAL - OUTSIDE CLICK
    // ==========================================

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                closeCourseModal();

            }

        });

    }


    // ==========================================
    // CLOSE MODAL - ESC KEY
    // ==========================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeCourseModal();

        }

    });


    function closeCourseModal() {

        if (modal) {

            modal.classList.remove("show");

            document.body.style.overflow = "";

        }

    }


    // ==========================================
    // BOOK THIS COURSE BUTTON
    // ==========================================

    const bookButton =
        document.querySelector(".book-course-btn");


    if (bookButton) {

        bookButton.addEventListener("click", function () {

            const courseTitle =
                modalTitle
                    ? modalTitle.textContent
                    : "";

            // Change this later to your booking page URL
            window.location.href =
                `/booking/?course=${encodeURIComponent(courseTitle)}`;

        });

    }


    // ==========================================
    // INITIAL FILTER
    // ==========================================

    applyFilters();

});