# Accuenergy Challenge

Task: Create a web page with the following features:

1. A button to allow users to acquire their current location from their browser.

2. A search module that lets users input the name of a location. The search feature is triggered by both button clicks and pressing the enter key on the keyboard.

3. Display the location on a map and add a marker to each searched location every time the location changes.

4. A table with pagination to show all searched places:
- Display a maximum of 10 records on each page.

- A checkbox at the beginning of each row to let users select multiple records at the same time.

- A delete button on the top to remove all selected records as well as their markers on the map.

5. Display the time zone and local time of the latest searched location.


## Features

1. Get current location from browser
!["the defult page when the app firstly loaded"](https://github.com/Tank-Sun/scheduler/blob/master/docs/default-page.png?raw=true)

2. Search a location inside the search bar, show the map with a marker, put it in a table, and also show the time zone and local time
!["the creat appointment form"](https://github.com/Tank-Sun/scheduler/blob/master/docs/add-appointment.png?raw=true)

3. Delete the searched location and their markers
!["the confirmation page before the appointment is deleted"](https://github.com/Tank-Sun/scheduler/blob/master/docs/delete-appointment.png?raw=true)

4. Display a maximum of 10 records on each page
!["the page showing after adding and deleting appointments, the remaing number of spots changes accordingly"](https://github.com/Tank-Sun/scheduler/blob/master/docs/after-add&delete-page.png?raw=true)


## Setup

Install dependencies with `npm install`

## Running Backend Development Server

```sh
npm run dev
```
## Running Frontend Development Server

```sh
npm run dev
```



## Dependencies

Frontend:
- vue
- axios
- @googlemaps/js-api-loader
- @fortawesome/vue-fontawesome
- tailwindcss
- vite

<br>
<br>
  

Backend:
- axios
- cors
- dotenv
- express
- morgan

