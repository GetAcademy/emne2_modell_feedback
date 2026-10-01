const model = {
    app: document.getElementById('app'),
    viewState: {
        user: {
            username: '',
            password: '',
        },

        cart: {
            products: [],
            coupon: false,
            date: null,
            time: null,
        },

        cartItem: {
            itemName: null,
            itemImg: null,
            qty: 0,
            itemPrice: null,
            custom: [], //tilpasninger
        },
    },

    data: {
        cartQty: 0,

        frontPageImg: [{
            category: 'Ukens tilbud',
            img: []
            },
        ],

        categories: ['kake','snitter','kaffe','baguette'],

        cakeEdits: {
            taste:[],
            size:[],
            theme: [],
            decor: [],
            comment: '',
        },

        cafeProducts:[{
            img: '',
            title: '',
            category: 'baguette',
            price: '',
            allergies: [],
            ingredients: [],
            qty: 0,
            lastUpdated: null,
            },
        ],

        orders: [{
            orderStatus:null,
            orderNumber: null,
            customerName: null,
            order: {},
            payment: null,
            orderId:null,
            },
        ],

        editStorageItem: {
            title: '',
            qty: 0,
            lastUpdated: null,
        },

        users:[
            {
                id: 0,
                type: 'admin',
                username: 'becka',
                password: 'blabla',
                img: 'default',
            }
        ],
    },
};