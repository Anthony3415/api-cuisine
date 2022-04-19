/* This is a way to make sure that the first time the page is loaded, the default recipes are loaded. */
let loaded = false;
const apiKey = /*your_key_here*/ ;
/**
 * It gets recipes from the spoonacular API.
 * @returns An array of objects.
 */
async function getRecipesDefault() {
    const url = "https://api.spoonacular.com/recipes/random?apiKey=" + api_key + "&number=4";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
// getRecipesDefault();

/**
 * It gets recipes from the Spoonacular API.
 * @returns An array of recipes.
 */
async function getRecipesFromInput() {
    const ing = $("input").val();
    const url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + api_key + "&ingredients=" + ing + "&number=4&ignorePantry=true";
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
}

/* This is a way to make sure that the button is clicked when the page is loaded. */
// $("#head button").click(getRecipesFromInput);

/**
 * This function is used to fill the html page with the image of the recipe.
 * @param data - The data that we want to fill the recipes info with.
 */
async function fillRecipesInfo(data) { /* Adding the image of the recipe to the html page. */
    for (let i = 0; i < data.recipes.length; i++) {
        $(".recipeImg").eq(i).attr("src", data.recipes[i].image);
        $(".containtimg").eq(i).append("<h2>" + data.recipes[i].title + "</h2>");
        $(".containtimg").eq(i).append("<ul></ul>");
        for (let j = 0; j < data.recipes[i].extendedIngredients.length; j++) {
            let ingredient = data.recipes[i].extendedIngredients[j];
            $(".containtimg ul").eq(i).append("<li>" + ingredient.original + "</li>")
        }
        $(".containtimg").eq(i).append(data.recipes[i].instructions.replaceAll("\n", "<br><br>").replaceAll("<li>", "").replaceAll("</li>", "<br><br>").replaceAll("<ol>", "<p>").replaceAll("</ol>", "</p>"));
    }
}

async function fillRecipesInfoInput(data) { /* Adding the image of the recipe to the html page. */
    for (let i = 0; i < data.length; i++) {
        $(".recipeImg").eq(i).attr("src", data[i].image);
        $(".containtimg").eq(i).append("<h2>" + data[i].title + "</h2>");
        $(".containtimg").eq(i).append("<ul></ul>");
        for (let j = 0; j < data[i].usedIngredients.length; j++) {
            let ingredient = data[i].usedIngredients[j];
            $(".containtimg ul").eq(i).append("<li>" + ingredient.original + "</li>")
        }
    }
}

// $("#generate").on("click", {data: getRecipesDefault()},fillRecipesInfo2);


/**
 * It gets the recipes from the input and displays them.
 */
async function displayInfo() {
    let data;
    if (!loaded) {
        data = await getRecipesDefault();
        fillRecipesInfo(data);
        loaded = true;
    } else {
        data = await getRecipesFromInput();
        reset();
        fillRecipesInfoInput(data);
    }
}

/* Adding a function to the window object. */
window.onload = displayInfo;
/* Adding a function to the button that is clicked. */
$("#head button").click(displayInfo);

function reset() {
    $(".containtimg h2").remove();
    $(".containtimg ul").remove();
}

async function generateRandomRecipes() {
    loaded = false;
    reset();
    displayInfo();
}
$("#generate").click(generateRandomRecipes);