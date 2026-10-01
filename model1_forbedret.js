const model = {

    // =========================================================
    // DEL 1: APP
    // =========================================================
    // State som gjelder hele applikasjonen.
    // Ikke DOM-elementer og ikke data om produkter og ordre.
    app: {
        currentPage: 'frontPage',

        // null betyr at ingen bruker er logget inn.
        // Hvis noen logger inn, peker denne på en bruker i data.users.
        loggedInUserId: null,
    },


    // =========================================================
    // DEL 2: VIEW STATE
    // =========================================================
    // Midlertidig state knyttet til de forskjellige sidene.
    //
    // Hovedspørsmålet:
    // "Hva holder brukeren på med akkurat nå på dette skjermbildet?"
    //
    // Når vi går til en annen side, er mye av dette ikke lenger interessant.
    viewState: {

        // -----------------------------------------------------
        // Innlogging
        // -----------------------------------------------------
        loginPage: {
            username: '',
            password: '',
        },


        // -----------------------------------------------------
        // Forsiden / produktoversikten
        // -----------------------------------------------------
        frontPage: {

            // Hvis brukeren filtrerer på f.eks. "Kake" eller "Kaffe".
            selectedCategoryId: null,
        },


        // -----------------------------------------------------
        // Vanlig produktside
        // -----------------------------------------------------
        productPage: {

            // Vi kopierer ikke produktnavn, pris, bilde osv. hit.
            // Vi peker bare på produktet som vises.
            selectedProductId: null,

            quantity: 1,

            // Eventuelle valg brukeren holder på med.
            // For eksempel brødtype eller andre tilpasninger.
            selectedOptionIds: [],
        },


        // -----------------------------------------------------
        // Kakebestilling
        // -----------------------------------------------------
        // Dette tilsvarer omtrent studentenes cakeEdits,
        // men dette er VIEW STATE:
        // det beskriver valgene kunden holder på med akkurat nå.
        cakeOrderPage: {
            selectedProductId: null,

            selectedSizeOptionId: null,
            selectedTasteOptionId: null,
            selectedDecorationOptionId: null,
            selectedThemeOptionId: null,

            comment: '',
            quantity: 1,
        },


        // -----------------------------------------------------
        // Handlekurv / checkout
        // -----------------------------------------------------
        shoppingCartPage: {

            // Selve varene i handlekurven ligger i data.cartItems.
            //
            // Dette er derimot input brukeren gjør på denne siden.
            pickupDate: null,
            pickupTime: null,
            couponCode: '',
        },


        // -----------------------------------------------------
        // Ordreside for ansatte
        // -----------------------------------------------------
        staffOrdersPage: {

            // Skjermbildet skiller mellom ubehandlede
            // og ferdigbehandlede ordre.
            selectedTab: 'open',

            // Dersom en bestemt ordre åpnes.
            selectedOrderId: null,
        },


        // -----------------------------------------------------
        // Lageroversikt
        // -----------------------------------------------------
        inventoryPage: {
            searchText: '',
            filter: 'all',
            // f.eks. 'all' eller 'lowStock'
        },


        // -----------------------------------------------------
        // Legg til / rediger produkt
        // -----------------------------------------------------
        //
        // Feltene brukeren redigerer akkurat nå er view state.
        // Det eksisterende produktet ligger fortsatt i data.products.
        editProductPage: {
            editingProductId: null,

            title: '',
            categoryId: null,
            price: null,
            stockQuantity: 0,
            image: '',

            selectedAllergenIds: [],
            selectedIngredientIds: [],
        },
    },


    // =========================================================
    // DEL 3: DATA
    // =========================================================
    //
    // De faktiske tingene applikasjonen handler om.
    //
    // Vi prøver å ha:
    //   én liste per type entitet
    //   id på objektene
    //   id-er når objekter skal referere til hverandre
    //
    data: {


        // =====================================================
        // BRUKERE
        // =====================================================
        users: [
            {
                id: 1,
                name: 'Becka',
                role: 'admin',
                username: 'becka',

                // Bevisst IKKE passord her.
                // Autentisering ville i en virkelig løsning
                // blitt håndtert på serversiden.
                image: 'default.png',
            },
        ],


        // =====================================================
        // KATEGORIER
        // =====================================================
        //
        // Objekter med id er mer fleksibelt enn:
        // ['kake', 'kaffe', ...]
        categories: [
            { id: 1, name: 'Baguetter' },
            { id: 2, name: 'Kaker' },
            { id: 3, name: 'Kaffe' },
            { id: 4, name: 'Snitter' },
        ],


        // =====================================================
        // ALLERGENER
        // =====================================================
        //
        // Produktet peker på allergenene med id.
        allergens: [
            { id: 1, name: 'Gluten' },
            { id: 2, name: 'Melk' },
            { id: 3, name: 'Egg' },
            { id: 4, name: 'Peanøtter' },
            { id: 5, name: 'Sesamfrø' },
            { id: 6, name: 'Sennep' },
            { id: 7, name: 'Fisk' },
            { id: 8, name: 'Skalldyr' },
        ],


        // =====================================================
        // INGREDIENSER / RÅVARER
        // =====================================================
        //
        // Skjermbildene viser blant annet mel, skinke og ost.
        //
        // Vi skiller disse fra produkter som kunden faktisk kjøper.
        // Det gjør modellen tydeligere.
        ingredients: [
            {
                id: 1,
                name: 'Hvetemel',
                quantity: 100,
                unit: 'kg',
                lastUpdated: '2026-10-01T10:22',
            },
            {
                id: 2,
                name: 'Skinke',
                quantity: 400,
                unit: 'stk',
                lastUpdated: '2026-10-01T10:42',
            },
            {
                id: 3,
                name: 'Ost',
                quantity: 330,
                unit: 'stk',
                lastUpdated: '2026-10-01T10:12',
            },
        ],


        // =====================================================
        // PRODUKTER
        // =====================================================
        //
        // Alle produkter ligger i samme liste.
        //
        // Vi lager ikke egne produktobjekter inne i handlekurven,
        // ordren osv. De andre delene peker tilbake hit med productId.
        products: [
            {
                id: 1,
                categoryId: 1,

                title: 'Skinkebaguette',
                description: 'Baguette med skinke og ost.',
                image: 'skinkebaguette.jpg',

                price: 89,
                stockQuantity: 12,

                allergenIds: [1, 2],
                ingredientIds: [1, 2, 3],

                // Dette produktet har ingen spesielle valg.
                optionGroupIds: [],

                lastUpdated: '2026-10-01T10:22',
            },

            {
                id: 2,
                categoryId: 2,

                title: 'Bestillingskake',
                description: 'Kake som lages på bestilling.',
                image: 'cake.jpg',

                // Vi bruker bare en eksempelpris her.
                // Hvordan tilpasninger eventuelt påvirker pris,
                // er ikke tydelig avklart i skjermbildene.
                price: 500,

                stockQuantity: null,

                allergenIds: [1, 2, 3],
                ingredientIds: [1],

                // Denne kaken kan tilpasses.
                optionGroupIds: [1, 2, 3, 4],

                lastUpdated: null,
            },

            {
                id: 3,
                categoryId: 3,

                title: 'Cappuccino',
                description: 'Cappuccino.',
                image: 'cappuccino.jpg',

                price: 40,
                stockQuantity: 30,

                allergenIds: [2],
                ingredientIds: [],

                optionGroupIds: [],

                lastUpdated: '2026-10-01T09:50',
            },
        ],


        // =====================================================
        // PRODUKTVALG / TILPASNINGER
        // =====================================================
        //
        // Dette er VALGENE SOM FINNES.
        //
        // Det må ikke blandes med valgene kunden akkurat
        // holder på med i cakeOrderPage.
        optionGroups: [
            { id: 1, name: 'Size' },
            { id: 2, name: 'Taste' },
            { id: 3, name: 'Decoration' },
            { id: 4, name: 'Theme' },
        ],

        productOptions: [
            // Size
            { id: 1, optionGroupId: 1, name: 'Small' },
            { id: 2, optionGroupId: 1, name: 'Medium' },
            { id: 3, optionGroupId: 1, name: 'Large' },

            // Taste
            { id: 4, optionGroupId: 2, name: 'Chocolate' },
            { id: 5, optionGroupId: 2, name: 'Vanilla' },

            // Decoration
            { id: 6, optionGroupId: 3, name: 'Flowers' },
            { id: 7, optionGroupId: 3, name: 'Simple' },

            // Theme
            { id: 8, optionGroupId: 4, name: 'Birthday' },
            { id: 9, optionGroupId: 4, name: 'Wedding' },
        ],


        // =====================================================
        // HANDLEKURV
        // =====================================================
        //
        // Handlekurven er data som brukes på tvers av sider.
        // Derfor ligger den ikke inne i shoppingCartPage.
        //
        // Legg merke til at vi bare lagrer productId.
        // Navn, bilde og pris finnes allerede i products.
        cartItems: [
            {
                id: 1,
                productId: 1,
                quantity: 2,
            },

            {
                id: 2,
                productId: 3,
                quantity: 1,
            },
        ],


        // Valg/tilpasninger for varer i handlekurven.
        //
        // Separat liste gjør at cartItem ikke trenger å inneholde
        // en dyp struktur av objekter.
        cartItemOptions: [
            // Eksempel:
            // { cartItemId: 3, optionId: 2 }
        ],


        // Eventuelle kommentarer knyttet til en spesialbestilling
        // kan også følge cart-itemet.
        cartItemComments: [
            // { cartItemId: 3, comment: 'Skriv Gratulerer på kaken' }
        ],


        // =====================================================
        // ORDRE
        // =====================================================
        //
        // Én ordre inneholder informasjon som gjelder hele ordren.
        //
        // Selve varene ligger i orderItems.
        orders: [
            {
                id: 1336,

                customerName: 'Karen Smith',

                pickupDate: '2026-10-01',
                pickupTime: '11:30',

                paymentStatus: 'paid',

                // f.eks. new, ready, collected
                status: 'new',
            },

            {
                id: 1337,

                customerName: 'Will Smith',

                pickupDate: '2026-10-01',
                pickupTime: '12:00',

                paymentStatus: 'payOnPickup',
                status: 'new',
            },
        ],


        // =====================================================
        // ORDRELINJER
        // =====================================================
        //
        // Dette er relasjonen mellom ordre og produkt.
        //
        // Samme prinsipp som:
        // students + courses + enrollments.
        orderItems: [
            {
                id: 1,
                orderId: 1336,
                productId: 1,
                quantity: 2,
            },
            {
                id: 2,
                orderId: 1336,
                productId: 3,
                quantity: 1,
            },
        ],


        // Tilpasninger på en bestemt ordrelinje.
        orderItemOptions: [
            // {
            //     orderItemId: 10,
            //     optionId: 4
            // }
        ],


        orderItemComments: [
            // {
            //     orderItemId: 10,
            //     comment: 'Skriv Gratulerer på kaken'
            // }
        ],


        // =====================================================
        // FORSIDEN
        // =====================================================
        //
        // Skjermbildet viser blant annet "Ukens tilbud".
        //
        // Vi peker på produkter fremfor å kopiere hele produktet
        // eller lagre egne bilder her.
        frontPageSections: [
            {
                id: 1,
                title: 'Ukens tilbud',
                productIds: [1, 3],
            },
            {
                id: 2,
                title: 'Lunsj og kaffe',
                productIds: [1, 3],
            },
        ],
    },
};