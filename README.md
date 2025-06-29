<p align="center">
   <a href="https://vangelov.github.io/recoil-demo-with-jotai/" target="_blank">
    <img src="screenshot.png" alt="Devices preview" />
  </a>
</p>

<div align="center">

[Live version](https://vangelov.github.io/recoil-demo-with-jotai/)

</div>

## Motivation

This project is a reimplementation of the app demonstrated in **David McCabe’s Recoil presentation** at [ReactEurope 2020](https://www.youtube.com/watch?v=_ISAA_Jt9kI) — but using [Jotai](https://jotai.org/) instead of Recoil for state management. 

I wanted to explore Jotai in a real-world context and provide the community with a Jotai version of a well-known reference app.


## Features 
I've done my best to implement all the features demonstrated in the app demo, including:

- All three widget types: Text, Image and Chart
- Adding, editing, rezising and selection of widgets
- Boundning box for selected items
- Asynchronous loading of the charts widgets
- Preserving aspect ratio when resizing image widgets
- Saving the document on every change
- Loading a previously saved document by id
- Preview link
- The ability to update the document background color
- Adding multiple widgets for performance testing

Although panning and zooming weren't explicitly shown in the demo, I chose to include them as they bring the app closer to a real-world implementation. 

The server requests are mocked and localStorage is used as a database.

## Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.\
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view it in the browser.

#### `npm run build`

Builds the app for production in the `dist` folder.
