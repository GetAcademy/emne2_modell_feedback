const model = {

    // PROBLEM:
    // Dette er ikke state, men en referanse til et DOM-element.
    // DOM-elementet bør ikke ligge i modellen.
    //
    // app bør heller inneholde state som gjelder hele applikasjonen,
    // for eksempel:
    // currentPage: 'frontPage'
    // loggedInUserId: null
    app: document.getElementById('app'),

    viewState: {

        // Dette ser ut til å være inputfeltene på innloggingssiden,
        // og passer derfor godt i viewState.
        //
        // Jeg ville nok kalt objektet loginPage for å gjøre
        // koblingen til skjermbildet tydeligere.
        user: {
            username: '',
            password: '',
        },

        // date og time passer godt som view state:
        // dette er valg brukeren holder på med i handlekurven.
        //
        // coupon er kanskje heller couponCode: '',
        // siden skjermbildet viser at brukeren kan skrive inn en rabattkode.
        cart: {
            products: [],
            coupon: false,
            date: null,
            time: null,
        },

        // PROBLEM:
        // cartItem og cart.products overlapper hverandre.
        //
        // Et cart item er normalt ikke én egen view state.
        // Handlekurven bør ha en liste med varer, for eksempel:
        //
        // cartItems: [
        //   { productId: 3, qty: 2, custom: [...] }
        // ]
        //
        // itemName, itemImg og itemPrice bør normalt ikke kopieres hit
        // dersom de allerede finnes på produktet.
        cartItem: {
            itemName: null,
            itemImg: null,
            qty: 0,
            itemPrice: null,
            custom: [], // tilpasninger
        },
    },

    data: {

        // PROBLEM:
        // cartQty kan beregnes fra innholdet i handlekurven.
        // Da bør vi normalt ikke lagre det separat.
        //
        // Eksempel:
        // const cartQty = cartItems.reduce(...)
        cartQty: 0,

        // USIKKER MODELLERING:
        // Dette ser mer ut som informasjon om hva som skal vises
        // på forsiden enn en egen type data.
        //
        // Hvis "Ukens tilbud" peker på konkrete produkter,
        // bør det kanskje heller lagres som productId-er,
        // i stedet for en egen liste med bilder.
        frontPageImg: [{
            category: 'Ukens tilbud',
            img: []
        }],

        // Dette fungerer for enkle kategorier.
        //
        // Senere kan det være nyttig å bruke objekter med id,
        // særlig siden produkter allerede tilhører en kategori:
        //
        // { id: 1, name: 'Kake' }
        categories: ['kake', 'snitter', 'kaffe', 'baguette'],

        // VIKTIG PROBLEM:
        // Dette blander to forskjellige ting.
        //
        // 1. Mulige valg:
        //    hvilke smaker, størrelser, temaer og pynt finnes?
        //    -> dette er felles data.
        //
        // 2. Valgene kunden holder på med akkurat nå:
        //    valgt smak, størrelse, tema, pynt og kommentar
        //    -> dette er viewState for cakeOrderPage.
        //
        // comment er spesielt tydelig view state.
        cakeEdits: {
            taste: [],
            size: [],
            theme: [],
            decor: [],
            comment: '',
        },

        // BRA:
        // Produktene ligger samlet i én liste.
        //
        // Jeg ville lagt til id på hvert produkt,
        // slik at andre deler av modellen kan referere til produktet.
        //
        // category kunne da gjerne vært categoryId.
        cafeProducts: [{
            // id: 1,
            img: '',
            title: '',
            category: 'baguette',
            price: '',
            allergies: [],
            ingredients: [],
            qty: 0,
            lastUpdated: null,
        }],

        // BRA at ordre ligger i en egen liste.
        //
        // Men det er noen problemer:
        //
        // 1. orderNumber og orderId ser ut til å kunne representere
        //    omtrent samme identitet. Trenger vi begge?
        //
        // 2. order: {} er for uklart.
        //    Hva består en ordre av?
        //
        // En bedre løsning er ofte:
        // orders: [...]
        // orderItems: [...]
        //
        // der orderItems peker på orderId og productId.
        orders: [{
            orderStatus: null,
            orderNumber: null,
            customerName: null,
            order: {},
            payment: null,
            orderId: null,
        }],

        // PROBLEM:
        // Dette ser ut til å være feltene i skjermbildet
        // "rediger lager-/produktinformasjon".
        //
        // Da er dette view state, ikke felles data.
        //
        // Flyttes for eksempel til:
        //
        // viewState: {
        //   editProductPage: {
        //      ...
        //   }
        // }
        editStorageItem: {
            title: '',
            qty: 0,
            lastUpdated: null,
        },

        // Det er fornuftig at brukerne ligger i data.
        users: [
            {
                id: 0,
                type: 'admin',
                username: 'becka',

                // IKKE slik i en virkelig løsning:
                // passord skal aldri lagres i klartekst.
                //
                // For denne undervisningsmodellen er poenget først og fremst
                // å være bevisst på at dette ikke er realistisk autentisering.
                password: 'blabla',

                img: 'default',
            }
        ],
    },
};