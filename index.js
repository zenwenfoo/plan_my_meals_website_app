// Updated itemData with ingredients, quantities, and prep time

const itemData = 
{
    Oatmeal: 
    {
        ingredients:
        {
            Oats: '100g',
            Water: '200ml',
            Milk: '100ml'
        }
    },
    Pancakes: 
    {
        ingredients:
        {
            Flour: '100g',
            Eggs: '2 eggs',
            Milk: '100ml',
            BakingPowder: '1 tsp',
            Butter: '20g'
        }
    },
    Eggs: 
    {
        Eggs: '2 eggs'
    },
    Smoothie: 
    {
        ingredients:
        {
            Banana: '1 banana',
            Yogurt: '150g',
            AlmondMilk: '200ml',
            Honey: '1 tbsp'
        }
    },
    Toast: 
    {
        ingredients:
        {
            Bread: '2 slices',
            Butter: '10g'
        }
    },
    'Chicken Salad':
    {
        ingredients:
        {
            ChickenBreast: '150g',
            Lettuce: '100g',
            Tomato: '1 medium',
            Cucumber: '1/2 cucumber',
            Oliveoil: '1 tbsp.',
            Vinegar: '1 tsp.'
        }
    },
    'Sandwich':
    {
        ingredients:
        {
            Bread: '2 slices',
            Turkey: '100g',
            Lettuce: '50g',
            Tomato: '2 slices',
            Cheese: '1 slice'
        }
    },
    Soup:
    {
        ingredients:
        {
           Carrots: '100g',
           Celery: '50g',
           Onion: '1 medium',
           ChickenStock: '500ml',
           Tomatoes: '2 medium'
        }
    },
    Sushi:
    {
        ingredients:
        {
            SushiRice: '150g',
            Nori: '4 sheets',
            Salmon: '100g',
            Cucumber: '1/2 cucumber',
            RiceVinegar: '1 tbsp.'
        }
    },
    Pasta:
    {
        ingredients:
        {
            Pasta: '100g',
            OliveOil: '1 tbsp.',
            Garlic: '2 cloves',
            TomatoSauce: '100g',
            Basil: '2 leaves'
        }
    },
    Steak:
    {
        ingredients:
        {
            BeefSteak: '200g',
            OliveOil: '1 tbsp.',
            Garlic: '2 cloves',
            Butter: '20g',
            Rosemary: '1 sprig'
        }
    },
    'Grilled Fish':
    {
        ingredients:
        {
            FIshFiller: '150g',
            Lemon: '1/2 lemon',
            OliveOil: '1 tbsp.',
            Garlic: '2 cloves'
        }
    },
    'Vegetable Stir-Fry':
    {
        ingredients:
        {
            BellPeppers: '2 medium',
            Broccoli: '100g',
            Carrots: '100g',
            SoySauce: '2 tbsp.',
            OliveOil: '1 tbsp.'
        }
    },
    Tacos:
    {
        ingredients:
        {
            GroundBeef: '150g',
            TacoShells: '3 shells',
            Lettuce: '50g',
            Tomato: '1 medium',
            Cheese: '30g'
        }
    },
    Risotto:
    {
        ingredients:
        {
            ArborioRice: '100g',
            ChickenStock: '500ml',
            Parmesan: '30g',
            Onion: '1 small',
            WhiteWine: '1/4 cup'
        }
    }
};

// Array to hold items on current plate

let currentPlate = [];

// Function to save meal plan

function saveMealPlan()
{
    const day = document.getElementById('day-selector').value;
    //const plateList = document.getElementById('saved-meals-list');
    let savedMeals = JSON.parse(localStorage.getItem('savedMeals')) || [];

    const mealPlan = 
    {
        day: day,
        meals: currentPlate.map(item => item.name)
    };

    //const savedMeal = document.createElement("li");
    //savedMeal.textContent = `${day}: `;
    /*currentPlate.forEach(item => {
        savedMeal.textContent += `${item.name}, `;
    });

    plateList.appendChild(savedMeal);*/

    savedMeals.push(mealPlan);
    localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
    renderSavedMeals();
    currentPlate = []; // Clear the plate after saving
    renderPlate(); // Reset plate display
}

// Function to load saved meal plans from local storage

function renderSavedMeals()
{
    const plateList = document.getElementById('saved-meals-list');
    plateList.innerHTML = '';

    const savedMeals = JSON.parse(localStorage.getItem('savedMeals')) || [];
    savedMeals.forEach(plan => 
    {
        const savedMeal = document.createElement("li");
        savedMeal.textContent = `${plan.day}: ${plan.meals.join(', ')}`;
        plateList.appendChild(savedMeal);   
    });
}

// Function to generate shopping list

function generateShoppingList()
{
    const shoppingList =
    document.getElementById("shopping-list");
    shoppingList.innerHTML = ""; // Clear existing shopping list

    currentPlate.forEach(item => {
        const ingredients = itemData[item.name]?.ingredients;
        if(ingredients)
        {
            const ingredientList = document.createElement("ul");
            ingredientList.textContent = `${item.name}:`;

            for (let ingredient in ingredients)
            {1
                const li = document.createElement("li");
                li.textContent = `${ingredient}: ${ingredients[ingredient]}`;
                ingredientList.appendChild(li);
            }

            shoppingList.appendChild(ingredientList);
        }
    });
}

// Drag and drop setup for draggable items
document.querySelectorAll('.draggable-items li').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.name);
    });
});

const droppableArea = document.getElementById('plate-items');
droppableArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

droppableArea.addEventListener('drop', (e) => {
    e.preventDefault();

    const itemName = e.dataTransfer.getData('text/plain');
    const itemCategory = e.target.closest('ul').id;

    if(!currentPlate.some(item => item.name === itemName))
    {
        currentPlate.push({
            name: itemName,
            category: itemCategory
        });

        renderPlate();
    }
});

function renderPlate()
{
    droppableArea.innerHTML = '';
    currentPlate.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        droppableArea.appendChild(li);
    });
}

// Load Saved Meals

window.onload = function () {
    renderSavedMeals();
};

// Function to clear all saved meals

function clearSavedMeals()
{
    localStorage.removeItem('savedMeals');
    renderSavedMeals();
}