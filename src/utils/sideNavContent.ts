export interface ISideNavContent {
    headerTXT: string;
    child: ISideChildrenContent[]
}
export interface ISideChildrenContent {
    listTXT: string;
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
                        listTXT:"Amaxon",
                        children:[
                            {
                                listTXT:"Azsasdfasdf"
                            },
                            {
                                listTXT:"Azsasdfasdf"
                            },
                        ]
                    },
                    {
                        listTXT:"Amaxon"
                    },
                    {
                        listTXT:"Amaxon"
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