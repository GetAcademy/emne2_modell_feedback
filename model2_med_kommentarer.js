// ============================================================
// VIEW
// ============================================================

const view = {

  // PROBLEM:
  // I Emne 2-modellen vår bør viewState ligge i selve modellen,
  // ikke inne i et separat view-objekt.
  //
  // view skal først og fremst være kode som tegner HTML.
  //
  // Eksempel:
  // model.viewState.shoppingCartPage.pickupTime
  viewState: {

    // PROBLEM:
    // "itemOrder" og "isOrdered" sier veldig lite om
    // hvilket skjermbilde og hvilken tilstand dette representerer.
    //
    // Skjermbildene viser flere tydelige sider:
    // - produktvalg
    // - handlekurv
    // - bekreftelse
    // - aktive bestillinger
    // - varebeholdning
    // - rediger produkt
    //
    // View state bør helst organiseres rundt disse sidene.
    itemOrder: {
      isOrdered: true,
    },
  },
};



// ============================================================
// MODEL
// ============================================================

const model = {

  // MANGLER:
  // Vi burde ha app-state, for eksempel:
  //
  // app: {
  //   currentPage: 'products',
  //   loggedInUserId: null,
  // },


  // ==========================================================
  // PRODUCTS
  // ==========================================================

  // BRA:
  // Alle produkter ligger samlet i én liste.
  // De har id, og andre deler av modellen kan peke på id.
  //
  // Dette er mye bedre enn å kopiere hele produktobjekter
  // inn i handlekurven.
  products: [
    { id: 1, name: "Kaffe, vanlig", price: 40, stock: 100 },
    { id: 2, name: "Kaffe latte", price: 60, stock: 50 },
    { id: 3, name: "Baguett", price: 30, stock: 20 },
  ],

  // MANGLER:
  // Skjermbildene viser mer produktinformasjon enn dette:
  //
  // - kategori
  // - ingredienser
  // - allergener
  // - ulike alternativer/tilbehør
  //
  // Produktene trenger derfor sannsynligvis flere felter
  // eller referanser til egne lister.
  //
  // Eksempel:
  //
  // categoryId: 1
  // allergenIds: [1, 2]
  // ingredientIds: [3, 7]
  //
  // Skjermbildet for redigering viser eksplisitt
  // ingredienser, allergener, pris og tilbehørspriser.
  // ----------------------------------------------------------


  // ==========================================================
  // BASKET
  // ==========================================================

  basket: {

    // SPØRSMÅL:
    // Trenger en aktiv handlekurv egentlig en egen id?
    // Det er ikke nødvendigvis feil, men i denne løsningen
    // virker det foreløpig unødvendig.
    id: 101,

    // BRA:
    // Dette er et godt modelleringsvalg.
    //
    // Handlekurven kopierer ikke inn navn og pris,
    // men peker på produktet med productId.
    //
    // quantity hører også naturlig hjemme her.
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
    ],


    // PROBLEM / DISKUSJON:
    // Dette er beregnet informasjon, ikke data vi trenger å huske.
    //
    // Det er bra at totalpris IKKE lagres som et eget tall.
    // Men funksjonen trenger heller ikke ligge inne i datamodellen.
    //
    // Vi kan beregne totalprisen når viewet trenger den.
    //
    // Prinsipp:
    // Modellen inneholder data vi må huske.
    // Ting vi kan beregne, beregner vi.
    getTotalPrice: function () {
      return this.items.reduce((total, item) => {
        const product = model.products.find(
          (p) => p.id === item.productId
        );
        return total + product.price * item.quantity;
      }, 0);
    },
  },


  // MANGLER:
  // På handlekurv-skjermbildet velger kunden hentetid.
  //
  // Det er noe brukeren holder på med akkurat nå,
  // og passer derfor godt i viewState:
  //
  // viewState: {
  //   shoppingCartPage: {
  //     pickupTime: null
  //   }
  // }
  //
  // Skjermbildet har eksplisitt valg av hentetid.
  // ----------------------------------------------------------


  // ==========================================================
  // ORDERS
  // ==========================================================

  // BRA:
  // Ordrene ligger i en egen liste.
  orders: [
    {
      orderId: 1,

      // PROBLEM:
      // [1, 3] forteller bare hvilke produkter som finnes i ordren.
      //
      // Vi mister blant annet ANTALL.
      //
      // Bedre:
      //
      // items: [
      //   { productId: 1, quantity: 2 },
      //   { productId: 3, quantity: 1 }
      // ]
      //
      // Eller enda bedre senere:
      // egen liste orderItems.
      items: [1, 3], // IDs of products

      pickupTime: "0930",

      // BRA at ordre har status.
      //
      // Men vi bør være tydelige på hvilke statuser som finnes:
      // f.eks. 'new', 'ready', 'collected'.
      //
      // Skjermbildet viser at ansatte kan markere
      // ordren som "Klar" og senere "Hentet".
      status: "klar",
    },
  ],
};



// ============================================================
// CONTROLLER
// ============================================================
//
// Egentlig utenfor selve modelleringsoppgaven,
// men det er noen interessante ting her fordi controlleren
// avslører hvilken state modellen faktisk trenger.
// ============================================================

const controller = {

  addToBasket: function (productId) {
    const product = model.products.find(
      (p) => p.id === productId
    );

    if (product && product.stock > 0) {

      // PROBLEM:
      // Hvis produktet allerede finnes i handlekurven,
      // legger dette inn enda en linje med samme produkt.
      //
      // Vi bør normalt heller øke quantity på eksisterende linje.
      model.basket.items.push({
        productId: product.id,
        quantity: 1
      });


      // PROBLEM:
      // view.updateView finnes ikke i view-objektet over.
      //
      // Men dette er mer et implementasjonsproblem enn
      // et modelleringsproblem.
      view.updateView(model.basket);
    }
  },


  completeOrder: function () {

    const newOrder = {

      // Dette fungerer som enkel id-generering i et eksempel.
      orderId: Date.now(),


      // PROBLEM:
      // Her legges basket.items direkte inn i ordren.
      //
      // Da må vi være oppmerksomme på referanser.
      // I Emne 2 ønsker vi helst nye objekter/arrayer.
      //
      // Eksempel:
      //
      // items: model.basket.items.map(item => ({ ...item }))
      items: model.basket.items,


      // VIKTIG PROBLEM:
      // pickupTime skal IKKE være tidspunktet kunden trykker "Bestill".
      //
      // Kunden velger hentetid på skjermbildet.
      // Derfor må vi hente verdien fra viewState.
      //
      // Eksempel:
      // pickupTime:
      //   model.viewState.shoppingCartPage.pickupTime
      pickupTime: new Date().toLocaleTimeString(),


      // PROBLEM:
      // En ny bestilling bør neppe være "klar" med en gang.
      //
      // Skjermbildet for ansatte viser nettopp at ansatte
      // senere skal kunne markere bestillingen som klar.
      //
      // Mer naturlig:
      // status: 'new'
      status: "klar",
    };


    model.orders.push(newOrder);


    // BRA:
    // handlekurven tømmes etter bestilling.
    //
    // Og her lages faktisk en ny array,
    // i stedet for å mutere den gamle med splice().
    model.basket.items = [];


    // PROBLEM:
    // Skjermbildet sier:
    //
    // "Takk for bestillingen!
    //  Du har mottatt SMS med referansenummer."
    //
    // SMS-en skal altså bekrefte bestillingen og gi referanse.
    // Den skal ikke si at ordren allerede er ferdig.
    sendSMS("Your order is ready!");
  },
};



// ============================================================
// FUNKSJONER SOM FORELØPIG IKKE ER IMPLEMENTERT
// ============================================================

// BRA at disse behovene er identifisert.
//
// Men de viser også at modellen sannsynligvis mangler state
// som funksjonene trenger.

function updateOrderStatus() {}

// Denne vil sannsynligvis trenge orderId,
// telefonnummer og referansenummer.
function sendSMS() {}


// Denne viser tydelig at produktskjermbildet trenger
// viewState for inputfeltene:
//
// viewState: {
//   editProductPage: {
//     productId: null,
//     name: '',
//     price: null,
//     ...
//   }
// }
function createNewProduct() {}