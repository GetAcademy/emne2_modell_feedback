const model = {

    // =========================================================
    // DEL 1: APP
    // =========================================================
    // State som gjelder hele applikasjonen.
    app: {
        currentPage: 'productsPage',
        loggedInUserId: null,
    },


    // =========================================================
    // DEL 2: VIEW STATE
    // =========================================================
    // Det brukeren holder på med akkurat nå på de ulike sidene.
    viewState: {

        // -----------------------------------------------------
        // Produktsiden
        // -----------------------------------------------------
        productsPage: {
            selectedCategoryId: null,
            selectedProductId: null,
        },


        // -----------------------------------------------------
        // Handlekurven
        // -----------------------------------------------------
        shoppingCartPage: {

            // Kunden velger hentetid på denne siden.
            // Dette skal derfor ikke genereres i controlleren.
            pickupTime: null,
        },


        // -----------------------------------------------------
        // Bekreftelsessiden
        // -----------------------------------------------------
        confirmationPage: {

            // Peker på ordren vi akkurat har opprettet.
            orderId: null,
        },


        // -----------------------------------------------------
        // Ansattes ordreoversikt
        // -----------------------------------------------------
        staffOrdersPage: {
            selectedOrderId: null,

            // For eksempel:
            // active / ready / collected
            selectedStatus: 'active',
        },


        // -----------------------------------------------------
        // Varebeholdning
        // -----------------------------------------------------
        inventoryPage: {
            selectedProductId: null,
        },


        // -----------------------------------------------------
        // Opprette / redigere produkt
        // -----------------------------------------------------
        // Inputfeltene brukeren holder på med hører hjemme
        // i viewState, ikke direkte i products-listen.
        editProductPage: {
            productId: null,

            name: '',
            categoryId: null,
            price: null,
            stock: 0,

            ingredientIds: [],
            allergenIds: [],
        },
    },


    // =========================================================
    // DEL 3: DATA
    // =========================================================
    data: {

        // -----------------------------------------------------
        // Kategorier
        // -----------------------------------------------------
        categories: [
            { id: 1, name: 'Baguette' },
            { id: 2, name: 'Cake' },
            { id: 3, name: 'Coffee' },
            { id: 4, name: 'Pastry' },
        ],


        // -----------------------------------------------------
        // Produkter
        // -----------------------------------------------------
        // Alle produkter ligger samlet i én liste.
        products: [
            {
                id: 1,
                categoryId: 3,
                name: 'Regular coffee',
                price: 40,
                stock: 100,
                ingredientIds: [],
                allergenIds: [],
            },
            {
                id: 2,
                categoryId: 3,
                name: 'Caffè latte',
                price: 60,
                stock: 50,
                ingredientIds: [],
                allergenIds: [2],
            },
            {
                id: 3,
                categoryId: 1,
                name: 'Baguette',
                price: 30,
                stock: 20,
                ingredientIds: [1, 2],
                allergenIds: [1, 2],
            },
        ],


        // -----------------------------------------------------
        // Ingredienser
        // -----------------------------------------------------
        ingredients: [
            { id: 1, name: 'Wheat flour' },
            { id: 2, name: 'Milk' },
            { id: 3, name: 'Ham' },
            { id: 4, name: 'Cheese' },
        ],


        // -----------------------------------------------------
        // Allergener
        // -----------------------------------------------------
        allergens: [
            { id: 1, name: 'Gluten' },
            { id: 2, name: 'Milk' },
            { id: 3, name: 'Egg' },
            { id: 4, name: 'Nuts' },
        ],


        // -----------------------------------------------------
        // Handlekurv
        // -----------------------------------------------------
        // Handlekurven peker på produkter med productId.
        //
        // Vi kopierer ikke navn, pris osv. inn hit.
        cartItems: [
            {
                productId: 1,
                quantity: 1,
            },
            {
                productId: 2,
                quantity: 1,
            },
        ],


        // -----------------------------------------------------
        // Ordre
        // -----------------------------------------------------
        // Informasjon som gjelder hele ordren.
        orders: [
            {
                id: 1,
                referenceNumber: 'A001',

                pickupTime: '09:30',

                // active -> ready -> collected
                status: 'ready',
            },
        ],


        // -----------------------------------------------------
        // Ordrelinjer
        // -----------------------------------------------------
        // Koblingen mellom ordre og produkter.
        //
        // Nå mister vi ikke quantity slik studentenes
        // items: [1, 3] gjorde.
        orderItems: [
            {
                orderId: 1,
                productId: 1,
                quantity: 1,
            },
            {
                orderId: 1,
                productId: 3,
                quantity: 2,
            },
        ],


        // -----------------------------------------------------
        // Brukere
        // -----------------------------------------------------
        users: [
            {
                id: 1,
                name: 'Becka',
                role: 'staff',
            },
        ],
    },
};