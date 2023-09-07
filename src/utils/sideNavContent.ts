export interface ISideNavContent {
    headerTXT: string;
    child: ISideChildrenContent[]
}
export interface ISideChildrenContent {
    listTXT: string;
    title?: boolean;
    children?: ISideChildrenContent[]
}[]
const sideNavContent: ISideNavContent[] = [
    {
        headerTXT: "Digital Content & Devices",
        child: [
            {
                listTXT: "Amazon Music",
                children: [
                    {
                        title: true,
                        listTXT: "Stream Music",
                        children: [
                            {
                                title: false,
                                listTXT: "Amazon Music Unlimited"
                            },
                            {
                                title: false,
                                listTXT: "Free Streaming Music"
                            },
                            {
                                title: false,
                                listTXT: "Podcasts"
                            },
                            {
                                title: false,
                                listTXT: "Open Web Player"
                            },
                            {
                                title: false,
                                listTXT: "Open Web Player"
                            },
                            {
                                title: false,
                                listTXT: "Download the app"
                            },
                        ]
                    },
                ]
            },
            {
                listTXT: "Kindle E-readers & Books"
            },
            {
                listTXT: "Amazon Appstore"
            },
        ]
    },
    {
        headerTXT: "Shop By Department",
        child: [
            {
                listTXT: "Electronics"
            },
            {
                listTXT: "Computers"
            },
            {
                listTXT: "Smart Home"
            },
        ]
    },
    {
        headerTXT: "Programs & Features",
        child: [
            {
                listTXT: "Gift Cards"
            },
            {
                listTXT: "Amazon live"
            },
            {
                listTXT: "International Shopping"
            },
        ]
    },
    {
        headerTXT: "Help & Settings",
        child: [
            {
                listTXT: "Your Account"
            },
            {
                listTXT: "Customer Service"
            },
            {
                listTXT: "Contact us"
            },
        ]
    },
]

export default sideNavContent;