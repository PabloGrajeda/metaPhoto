## About this Project
This is a Full-Stack project created with:
* Nodejs + Express
* Next.js

This project implements three jsonplaceholder API endpoints:
* https://jsonplaceholder.typicode.com/users
* https://jsonplaceholder.typicode.com/albums
* https://jsonplaceholder.typicode.com/photos

And adds a couple of new functionalities:
* Data Enrichment
  * The photos and the albums endpoint has been enriched with the complete information of the user and album instead of return the reference id

* Filtering
  * Photos can be filtered by
    * Photo title `photo.title`
    * Album title `photo.album.title`
    * User email `photo.album.user.email`
  * You can apply this filters by using the following query parameters
    * title
    * album.title
    * album.user.email

* Pagination
  * To implement pagination, the `offset` and `limit` query paramenters have been implemented
  * If no parameters are sent, `offset` and `limit` are set to `0` and `25` respectively
 
The frontend application is developed in Nextjs using [tailwind](https://tailwindcss.com) as a utility-first CSS framework 


## Run the API

First, change the directory to run the API:

```bash
cd API/
```

Then you need to install all the dependencies by running the following command:


```bash
npm install
```
In order to run the API you need to execute the following:
```bash
npm run server
```

once it is done API will be running on port 8080 [http://localhost:8080/ping](http://localhost:8080/ping).
## Run the Frontend
First, change the directory to run the Frontend:

```bash
cd frontend/
```

Then you need to install all the dependencies by running the following command:

```bash
npm install
```

In order to run the frontend you need to execute the following:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
