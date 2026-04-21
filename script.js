const API_URL = "https://69c820a563393440b3176e82.mockapi.io";

async function seed() {
  const cards = [
    {
      id: 1,
      posterURL: "./img/image_part_001.jpg",
      name: "Вогняний воїн",
      power: 120,
      health: 470,
      protection: "10%",
      super_power: "10% , x2 до (сили або здоров'я або захисту)",
    },
    {
      id: 2,
      posterURL: "./img/image_part_002.jpg",
      name: "Крижаний воїн",
      power: 150,
      health: 400,
      protection: "15%",
      super_power: "Підпалює ворога (мінус 30 HP протягом 3 ходів)",
    },
    {
      id: 3,
      posterURL: "./img/image_part_003.jpg",
      name: "Титан-танк",
      power: 100,
      health: 380,
      protection: "20%",
      super_power: "Заморожує ворога (пропуск 1 ходу)",
    },
    {
      id: 4,
      posterURL: "./img/image_part_004.jpg",
      name: "Тіньовий асасин",
      power: 80,
      health: 600,
      protection: "35%",
      super_power: "Повністю блокує атаку на 1 хід",
    },
    {
      id: 5,
      posterURL: "./img/image_part_005.jpg",
      name: "Світлий цілитель",
      power: 180,
      health: 300,
      protection: "5%",
      super_power: "Критичний удар x2 з шансом 40%",
    },
    {
      id: 6,
      posterURL: "./img/image_part_006.jpg",
      name: "Громовержець",
      power: 70,
      health: 450,
      protection: "10%",
      super_power: "Відновлює 100 HP собі або союзнику",
    },
    {
      id: 7,
      posterURL: "./img/image_part_007.jpg",
      name: "Отруйний алхімік",
      power: 160,
      health: 350,
      protection: "12%",
      super_power: "Б'є блискавкою (ігнорує захист)",
    },
    {
      id: 8,
      posterURL: "./img/image_part_008.jpg",
      name: "Повітряний ніндзя",
      power: 110,
      health: 390,
      protection: "10%",
      super_power: "Отруює ворога (мінус 20 HP кожен хід)",
    },
    {
      id: 9,
      posterURL: "./img/image_part_009.jpg",
      name: "Темний чаклун",
      power: 140,
      health: 330,
      protection: "8%",
      super_power: "Ухиляється від наступної атаки",
    },
    {
      id: 10,
      posterURL: "./img/image_part_010.jpg",
      name: "Кібер-воїн",
      power: 170,
      health: 320,
      protection: "10%",
      super_power: "Краде 50 HP у ворога",
    },
    {
      id: 11,
      posterURL: "./img/image_part_011.jpg",
      name: "Водяний маг",
      power: 130,
      health: 420,
      protection: "25%",
      super_power: "Активує щит (+30% захисту на 2 ходи)",
    },
  ];

  for (let card of cards) {
    await fetch(`${API_URL}/cards`, {
      method: "POST", // створення чогось
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });
  }

  const response = await fetch(`${API_URL}/cards`);
  const my_cards = await response.json();
  console.log(my_cards);

  for (let index = 12; index < 34; index++) {
    await fetch(`${API_URL}/cards/${index}`, {
      method: "DELETE",
    });
  }

  for (let index = 1; index < 12; index++) {
    await fetch(`${API_URL}/cards/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        super_power_type: String(index),
      }),
    });
  }
}

function getCardsCardHTML(card) {
  let posterHTML = "";

  if (card.posterURL) {
    posterHTML = `<img src="${card.posterURL}" alt="${card.posterAlt}">`;
  }

  return `
    <li class="cards-card">
      ${posterHTML}
      <div class="cards-text">
      <h2>${card.name}</h2>
      <p>сила: ${card.power}</p>
      <p>здоровя: ${card.health}</p>
      <p>вітсоток супер-сили: ${card.protection}</p>
      <p>супер-сила: ${card.super_power}</p>
      </div>
      </li>`;
}

const cardsListEl = document.querySelector(".js-cards-list");

// for (const cardsItem of cards) {
//   const cardsHTML = getCardsCardHTML(cardsItem);
//   cardsListEl.insertAdjacentHTML("beforeend", cardsHTML);
// }

// await seed();

const response = await fetch(`${API_URL}/cards`);
const my_cards = await response.json();
console.log(my_cards);

// function flipCard(event) {
//   const card = document.querySelector(".card");
//   card.classList.toggle("flipped");
//   console.log(event);
// }

// document.querySelector(".card").addEventListener("click", flipCard);

function startGame() {
  document.querySelector(".js-start-game").style.display = "none";
  document.querySelector(".js-game").style.display = "flex";

  // let randomCard = Math.ceil(Math.random() * 11);
  // Виклик: 3 унікальних числа від 1 до 10
  const result = getUniqueRandoms(1, 11, 3);
  console.log(result); // Наприклад: [5, 2, 9]

  for (let i in result) {
    console.log(my_cards[i - 1]);
  }
}

document.querySelector(".js-start").onclick = startGame;

function getUniqueRandoms(min, max, count) {
  let numbers = [];
  // 1. Створюємо масив чисел у діапазоні
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  // 2. Перемішуємо масив (алгоритм Фішера-Йейтса)
  for (let i = numbers.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // 3. Повертаємо перші 'count' елементів
  return numbers.slice(0, count);
}

async function openChest() {
  chestBtn.classList.add("open"); // відкрили скриню
  chestBtn.style.pointerEvents = "none";

  // 1. отримати карти
  if (!my_cards || my_cards.length === 0) {
    const response = await fetch(`${API_URL}/cards`);
    my_cards = await response.json();
  }

  // 2. підготовка рулетки
  const rouletteWrapper = document.getElementById("rouletteWrapper");
  const cardsStrip = document.getElementById("cardsStrip");

  rouletteWrapper.style.display = "block";
  cardsStrip.style.transition = "none";
  cardsStrip.style.transform = "translateY(0)";
  cardsStrip.innerHTML = "";

  const totalItems = 20;
  const winnerPosition = totalItems - 3; // переможець — третя з кінця
  const randomIndices = [];

  // 3. створення стрічки карток
  for (let i = 0; i < totalItems; i++) {
    const randomIndex = Math.floor(Math.random() * my_cards.length);
    randomIndices.push(randomIndex);

    const img = document.createElement("img");
    img.src = my_cards[randomIndex].posterURL;
    img.className = "strip-item";
    cardsStrip.appendChild(img);
  }

  // 4. запуск анімації (прокрутка вниз)
  setTimeout(() => {
    const cardHeight = 200;
    // прокручуємо так, щоб переможець потрапив у центр вікна
    const finalOffset = winnerPosition * cardHeight;

    cardsStrip.style.transition =
      "transform 3s cubic-bezier(0.15, 0.85, 0.25, 1)";
    cardsStrip.style.transform = `translateY(-${finalOffset}px)`;
  }, 50);

  // 5. завершення — показуємо переможця
  setTimeout(() => {
    rouletteWrapper.style.display = "none";

    const winnerIndex = randomIndices[winnerPosition];
    const winnerData = my_cards[winnerIndex];

    const html = getCardsCardHTML(winnerData);
    cardsListEl.insertAdjacentHTML("beforeend", html);

    // закрити скриню
    chestBtn.classList.remove("open");

    setTimeout(() => {
      chestBtn.style.pointerEvents = "auto";
    }, 500);

    console.log("Ви виграли:", winnerData.name);
  }, 4200);
}

chestBtn.onclick = openChest;
