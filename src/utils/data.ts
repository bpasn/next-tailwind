import bcrypt from 'bcryptjs'

const data: { products: IProduct[], users: IUsers[], menus: MenuItem[] } = {
    users: [
        {
            name: "Jhon",
            email: "admin@example.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: "Jhon",
            email: "user@example.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'A popular shirt',
            isFeatured: true,
            banner: '/images/banner1.jpg',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 3.2,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
            isFeatured: true,
            banner: '/images/banner2.jpg',
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 90,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 3,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 90,
            brand: 'Oliver',
            rating: 2.9,
            numReviews: 13,
            countInStock: 20,
            description: 'Smart looking pants',
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 95,
            brand: 'Zara',
            rating: 3.5,
            numReviews: 7,
            countInStock: 20,
            description: 'A popular pants',
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            price: 75,
            brand: 'Casely',
            rating: 2.4,
            numReviews: 14,
            countInStock: 20,
            description: 'A popular pants',
        },
    ],
    menus: [
        {
            name: "Digital Content & Devices",
            icons: "",
            title: true,
            child: [
                {
                    link: "/",
                    title: false,
                    name: "Amazon Music",
                    icons: "",
                    child: [
                        {
                            link: '/',
                            title: true,
                            name: "Stream Music",
                            child: [
                                {
                                    link: '/',
                                    name: "Amazon Music Unlimited ",
                                    icons: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    link: "/",
                    title: false,
                    name: "Kindle E-readers & Books",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "Amazon Appstore",
                    icons: ""
                },
            ]
        },
        {
            name: "Shop By Department",
            icons: "",
            title: true,
            child: [
                {
                    link: "/",
                    title: false,
                    name: "Electronics",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "Computers",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "Smart Home",
                    icons: ""
                },
            ]
        },
        {
            name: "Programs & Features",
            icons: "",
            title: true,
            child: [
                {
                    link: "/",
                    title: false,
                    name: "Gift Cards",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "Amazon live",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "International Shopping",
                    icons: ""
                },
            ]
        },
        {
            name: "Help & Settings",
            icons: "",
            title: true,
            child: [
                {
                    link: "/",
                    title: false,
                    name: "Your Account",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "Customer Service",
                    icons: ""
                },
                {
                    link: "/",
                    title: false,
                    name: "Contact us",
                    icons: ""
                },
            ]
        },
    ]
};

export default data;
