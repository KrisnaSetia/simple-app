# Network Analysis Dashboard Telkomsel Jawa Bali
This is a network analysis dashboard project for Telkomsel's Java Bali area which is useful as a network report for the Java Bali area using Next js,Bootstrap, React Bootstrap, Leaflet, GeoJSON,ChartJS, React Chartjs and MySQL. 

The purpose of this project is to provide convenience for Top Management regarding reports and analysis of Telkomsel network performance.

The data used in this project does not use original data and has been hashed to avoid data leakage.
## Getting Started
### 1. Download and Install Main Resources
1. Install Node js : https://nodejs.org/id/download/current
2. Install XAMPP (Optional) : https://www.apachefriends.org/download.html
3. Download Dataset : https://intip.in/DataDashboardNetworkAnalysis
### 2. Setup Database
Full instructions are at the following link https://intip.in/DataDashboardNetworkAnalysis
### 3. Clone this repository
Run this code to git clone the repository
```bash
git clone https://github.com/KrisnaSetia/simple-app.git
```
After that, install the dependencies
```bash
npm install
```
### 4. Run Program
After the setup is complete, you can try the dashboard, but first you must turn on your local database. 
You can check your connection database with this command
```bash
node test_connection.js
# or
node test_table.js
```
If database connect, you can run this command for start the program
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser in desktop


## Documentation

To learn more about depedencies, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Bootstrap documentation
- [React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) - React Bootstrap Documentation
- [Leaflet](https://leafletjs.com/index.html) - Leaflet Map Documentation
- [ChartJS](https://www.chartjs.org/docs/latest/) - ChartJS Documentation
- [React-ChartJS](https://react-chartjs-2.js.org/) - React ChartJS Documentation
- [API Documentation](https://documenter.getpostman.com/view/40227475/2sAYQcDpuW#8c3bff3c-3023-4e19-9dc9-91728ef6d2d0) - API Documentation with Postman


## Build & Start
After developing your program, go to the Build & Start stage of the program.
1. Run Build
Run the following command to perform the build:
```bash
npm run build
```
Wait for a while, if it's done then proceed to Start

2. Run Start
Run the following command to start:
```bash
npm run start
```
Open [http://localhost:3000](http://localhost:3000) with your browser in desktop

## Other Optimization for This Project
In this project there are some features that are not optimal and you can optimize, here are some things that can be optimized: 
1. Integration using remote server (cloud server)
