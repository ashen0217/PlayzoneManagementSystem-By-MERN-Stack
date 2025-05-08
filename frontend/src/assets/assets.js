import logo_dark from './logo_dark.svg';
import cross_icon from './cross_icon.svg';
import menu_icon from './menu_icon.svg';
import star_icon from './star_icon.svg';
import left_arrow from './left_arrow.svg';
import right_arrow from './right_arrow.svg';
import header_img from './header_img.png';
import brand_img from './brand_img.png';
import rollarcoaster from './rollarcoaster.jpg' ;
import tornado from './tornado.jpg';
import waterpark from './waterpark.jpg';
import kart from './kartjpg.jpg';
import huricane from './huricane.jpg';
import snowW from './snowW.jpg';
import bg2 from'./bg2.png';
import oip from './oip.jpg';
import hobbit from './hobbitGarden.jpg';
import waterpark2 from './waterpark2.jpg';
import waterpark3 from './waterPark3.jpg';
import event1 from './events1.jpg';
import event2 from './events2.jpg';
import boatride from './boatride.jpg';
import proImg1 from './profile_img_1.png';
import proImg2 from './profile_img_2.png';
import proImg3 from './profile_img_3.png';

export const assets = {
    logo_dark,
    cross_icon,
    menu_icon,
    star_icon,
    header_img,
    brand_img,
    left_arrow,
    right_arrow,
    bg2,
    oip,
    rollarcoaster,
    tornado,
    waterpark,
    kart,
    huricane,
    snowW
}

export const projectsData = [
    {
      title: "Tornado",
      price: "$25",
      location: "Near west the Entrance gate",
      image: tornado
    },
    {
      title: "Water Park",
      price: "$200 per full Day",
      location: "East side of the Entrance gate",
      image: waterpark
    },
    {
      title: "GO kart racing",
      price: "$150 per hour",
      location: "South East side of the map",
      image: kart
    },
    {
      title: "huricane",
      price: "$50",
      location: "In middle side of the map",
      image: huricane
    },
    {
      title: "Roller coaster",
      price: "$75",
      location: "South west side",
      image: rollarcoaster
    },
    {
      title: "Snow",
      price: "$100 per hour",
      location: "North west side of the map",
      image: snowW
    },
    
  ];
export const ServiceData = [
    {
      title: "Boat Ride",
      price: "$50",
      location: "North side",
      image: boatride
    },
    {
      title: "Water Park area",
      price: "$200 per day",
      location: "East side of the Entrance gate",
      image: waterpark2
    },
    {
      title: "Water Park area",
      price: "$200 per hour",
      location: "East side of the Entrance gate",
      image: waterpark3
    },
    {
      title: "Hobbit Garden ",
      price: "$50",
      location: "North eact side of the map",
      image: hobbit
    },
    {
      title: "Event for festive season",
      price: "-",
      location: "Near the entrance",
      image: event1
    },
    {
      title: "Event for Annawasary",
      price: "-",
      location: "Near back entrance",
      image: event2
    },
    
  ];

  export const testimonialsData = [
    {
        name: "Donald Jackman",
        title: "Marketing Manager",
        alt: "Portrait of Donald Jackman",
        rating: 5,
        image: proImg1,
        text: "The booking process was super easy and quick and I love how I can check availability in real time"
    },
    {
        name: "Richard Nelson",
        title: "UI/UX Designer",
        alt: "Portrait of Richard Nelson",
        rating: 4,
        image: proImg2,
        text: "The interface is user-friendly and easy to navigate and I like that I can manage my kid’s bookings all in one place"
    },
    {
        name: "James Washington",
        title: "Co-Founder",
        alt: "Portrait of James Washington",
        rating: 5,
        image: proImg3,
        text: "Great feature to track my membership benefits and discounts! and It would be great if there were more filter options for available slots."
    }
];

export const userData = [
    {
      name: "James Washington",
      email: "james@example.com",
      password:"123456",
      age: 21,
      image:proImg3,
      phone:"0775645345",
      address:"123 Main St, New York, NY 10001",
    },
  ];

export const packageData = [
  {
    name:"Basic Package",
    description:"This package has 5 activities including waterpark and indoor activities valid for 24Hours",
    price:"$100",
    image:waterpark,
  },
  
  {
    name:"Standard Package",
    description : "This package has 10 activities including  indoor  activities  only  valid  for   24Hours",
    price : "$50",
    image : rollarcoaster, 
  },

  {
    name:"Premium Package",
    description : "This package has 20 activities including indoor activities  only valid for 24Hours",
    price : "$50",
    image : snowW,
  },
];

