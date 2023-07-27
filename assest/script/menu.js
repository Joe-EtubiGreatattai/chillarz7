// Define data for each section (foods, fast food, drinks)
const sectionsData = {
    foods: [
      {
        imageSrc: "assest/images/food1.jpg",
        name: "Macaroni",
        price: "&#8358;1500",
        readyTime: "15 mins",
      },
      {
        imageSrc: "assest/images/food2.jpg",
        name: "Peper meat",
        price: "&#8358;1500",
        readyTime: "15 mins",
      },
      {
        imageSrc: "assest/images/food3.jpg",
        name: "Semo and vegitable soup",
        price: "&#8358;1500",
        readyTime: "15 mins",
      },
      {
        imageSrc: "assest/images/food4.jpg",
        name: "Jollof rice and chicken",
        price: "&#8358;1500",
        readyTime: "15 mins",
      },
      // Add more food data objects here
    ],
    fastFood: [
      {
        imageSrc: "assest/images/pizza.jpg",
        name: "Quick Snack 1",
        price: "&#8358;800",
        readyTime: "10 mins",
      },
      // Add more fast food data objects here
    ],
    drinks: [
      {
        imageSrc: "assest/images/Hollandia.jpg",
        name: "Hollandia",
        price: "&#8358;2,500",
        readyTime: "5 mins",
      },
      // Add more drink data objects here
    ],
  };
  
  function generateFoodCards(sectionId) {
    const section = document.getElementById(sectionId);
    const sectionData = sectionsData[sectionId];
    const seeMoreCard = section.querySelector(".see-more-card");
    const seeMoreSection = section.querySelector(".see-more-section");
    const originalFoodCards = section.querySelectorAll(".food-card:not(.see-more-card)");
  
    sectionData.forEach((foodData, index) => {
      const card = document.createElement("div");
      card.classList.add("food-card", "bg-white", "rounded-lg", "shadow-md");
      card.innerHTML = `
        <img
          src="${foodData.imageSrc}"
          alt="${foodData.name}"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">${foodData.name}</h3>
          <p class="text-gray-600">Price: ${foodData.price}</p>
          <p class="text-gray-600">Ready Time: ${foodData.readyTime}</p>
        </div>
      `;
  
      section.insertBefore(card, seeMoreCard);
      if (index >= 3) {
        card.style.display = "none";
      }
    });
  
    seeMoreCard.addEventListener("click", () => {
      const foodCards = section.querySelectorAll(".food-card:not(.see-more-card)");
      const isSeeMoreVisible = seeMoreCard.textContent.trim() === "See More";
  
      for (let i = 3; i < foodCards.length; i++) {
        foodCards[i].style.display = isSeeMoreVisible ? "block" : "none";
      }
  
      seeMoreCard.textContent = isSeeMoreVisible ? "See Less" : "See More";
    });
  }
  
  function initializeSections() {
    const sections = ["foods", "fastFood", "drinks"];
    sections.forEach((section) => {
      generateFoodCards(section);
    });
  
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value.toLowerCase();
      sections.forEach((section) => {
        const sectionData = sectionsData[section];
        const foodCards = document.getElementById(section).querySelectorAll(".food-card:not(.see-more-card)");
        const seeMoreCard = document.getElementById(section).querySelector(".see-more-card");
        const seeMoreSection = document.getElementById(section).querySelector(".see-more-section");
        const sectionEmptyMessage = document.getElementById(`${section}-empty`);
  
        let sectionIsEmpty = true;
        let showSeeMoreCard = false;
  
        for (let i = 0; i < sectionData.length; i++) {
          const card = foodCards[i];
          const foodName = sectionData[i].name.toLowerCase();
          if (foodName.includes(searchTerm)) {
            card.style.display = "block";
            sectionIsEmpty = false;
            // Check if the "See More" card should be displayed based on the search term
            if (i >= 3) {
              showSeeMoreCard = true;
            }
          } else {
            card.style.display = "none";
          }
        }
  
        // Show/hide the "See More" card based on the search term
        if (showSeeMoreCard) {
          seeMoreCard.classList.remove("hidden"); // Remove the 'hidden' class
          seeMoreSection.classList.remove("hidden"); // Remove the 'hidden' class
        } else {
          seeMoreCard.classList.add("hidden"); // Add the 'hidden' class
          seeMoreSection.classList.add("hidden"); // Add the 'hidden' class
        }
  
        // Show/hide the section empty message
        if (sectionIsEmpty) {
          sectionEmptyMessage.style.display = "block";
        } else {
          sectionEmptyMessage.style.display = "none";
        }
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", initializeSections);
  