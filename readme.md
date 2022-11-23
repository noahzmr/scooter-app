<br />
<div align="center">
  <a href="https://github.com/noahzmr/scooter-app">
    <img src="img/favicon.ico" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Scooter App</h3>

  <p align="center">
    A school project!
    <br />
    <a href="https://github.com/noahzmr/scooter-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://chat.noerkelit.online/">View Live Demo</a>
    ·
    <a href="https://github.com/noahzmr/scooter-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/noahzmr/scooter-app/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
  <li>
    <a href="#about">About</a>
    <ul>
        <li><a href="#built-with">Built With</a>
    </ul>
  </li>
    <li>
        <a href="#introduction">Introduction</a>
        <ul>
            <li><a href="#app">App</a></li>
            <li><a href="#scooter-hardeware">Scooter Hardeware</a></li>
            <li><a href="#team-and-roles">Team and Roles</a></li>
        </ul>
    </li>
    <li>
        <a href="requirements">Requirements</a>
        <ul>
            <li><a href="#software">Software</a></li>
            <li>
                <a href="#scooter-hardware">Scooter Hardware</a>
                <ul>
                    <li><a href="##solution-description">Solution description</a></li>
                    <li>
                        <a href="#solution-details">Solution Details</a>
                        <ul>
                            <li><a href="#sensors-&-actuators">Sensors & Actuators</a></li>
                            <li><a href="#embedded-code">Embedded Code</a></li>
                            <li>
                                <a href="#network">Network</a>
                                <ul>
                                    <li><a href="#logical-network-topology">Logical Network Topology</a></li>
                                </ul>
                            </li>
                            <li><a href="#cloud-&-data-analytics">Cloud & Data Analytics</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
    <li>
        <a href="#business-canvas">Business Canvas</a>
        <ul>
            <li>
                <a href="#key-partners">Key Partners</a>
                <ul>
                    <li><a href="personas-from-the-scootec">Personas from the ScooTec</a></li>
                </ul>
            </li>
            <li><a href="#key-activities">Key Activities</a></li>
            <li><a href="#key-resources">Key Resources</a></li>
            <li><a href="#customer-relationships">Customer Relationships</a></li>
            <li><a href="#customer-segments">Customer Segments</a></li>
            <li><a href="#channels">Channels</a></li>
            <li><a href="#value-propositions">Value Propositions</a></li>
            <li>
                <a href="#cost-structure">Cost Structure</a>
                <ul>
                    <li><a href="#production">Production</a></li>
                    <li><a href="#logistik">Logistik</a></li>
                    <li><a href="#selling">Selling</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li>
        <a href="#features">Features</a>
        <ul>
            <li><a href="#structure-chart">Structure Chart</a></li>
            <li>
                <a href="#uml">UML</a>
                <ul>
                    <li><a href="#use-case">Use Case</a></li>
                    <li><a href="#sequence-diagram">Sequence Diagram</a></li>
                </ul>
            </li>
            <li>
                <a href="#flowdiagramm">Flowdiagramm</a>
                <ul>
                    <li><a href="#scootec-gmbh-website">ScooTec GmbH Website</a></li>
                    <li><a href="#sensor-device-with-the-website">Sensor Device with the Website</a></li>
                </ul>
            </li>
            <li><a href="#electric-circuit-diagram">Electric Circuit Diagram</a></li>
            <li><a href="#sql-model">SQL Model</a></li>
        </ul>
    </li>
    <li>
        <a href="#extra">Extra</a>
        <ul>
            <li><a href="#test">Test</a></li>
            <li>
                <a href="#insterllation">Insterllation</a>
                <ul>
                    <li><a href="#arduino-on-a-pi">Arduino on a Pi</a></li>
                    <li><a href="#gps-module">GPS Module</a></li>
                </ul>
            </li>
        </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#hosted">Hosted</a></li>
    <li><a href="#support">Support</a></li>
    <li><a href="#demo">Demo</a></li>
  </ol>
</details>

## About

This is a school assignment that was created in two blocks, each of which was three weeks long, 
The scenario from the first block was to write a script that calculates the travel costs for a scooter rental.
It was up to us if we wanted to keep it a pure terminal application or if we wanted to add a UI to it.
In the next block, live data should be read out with the help of an Arduino and a Raspberry Pi, and a business plan should be created.
For us it was possible to connect this with the first block where the sensor package represents a scooter.
For the time being, no changes will be made.

### Built With
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/de/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org)
[![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.com/docs/)
[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.javascript.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](https://ubuntu.com/download?gclid=Cj0KCQiA37KbBhDgARIsAIzce16YF-tHi0cfujV9iwI4m9iC1zlTmt7il2I-97BzOt8PvtOG8AlIApEaAuCaEALw_wcB)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)
<a href='https://github.com/speakeasyjs/speakeasy' target="_blank"><img alt='speakeasy' src='https://img.shields.io/badge/speakeasy-100000?style=for-the-badge&logo=speakeasy&logoColor=white&labelColor=961414&color=f95959'/></a>
<a href='https://nodemailer.com/about/' target="_blank"><img alt='node mailer' src='https://img.shields.io/badge/node mailer-100000?style=for-the-badge&logo=node mailer&logoColor=white&labelColor=961414&color=233142'/></a>
<a href='https://leafletjs.com/' target="_blank"><img alt='Leaflet' src='https://img.shields.io/badge/Leaflet-100000?style=for-the-badge&logo=Leaflet&logoColor=white&labelColor=961414&color=233142'/></a>
![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
<a href='https://d3js.org/' target="_blank"><img alt='node mailer' src='https://img.shields.io/badge/d3JS-100000?style=for-the-badge&logo=d3JS&logoColor=white&labelColor=961414&color=233142'/></a>

## Introduction

### App
We have developed a web application for the company ScooTec GmbH.
This is intended for the end user UI
Every user can register on the web page as well.
After registration the customer will receive an email and 20.00 starting credit will be added to his account.
For better security, the registration is done with an Authenticator, which is secure.
After registration, the position on the map is displayed, as well as the scooters in the vicinity.
When you click on a scooter, you can see the battery level as well as the scooter ID.
After clicking on `Choose Scoter` the ride can be started.
When the ride is finished the timer resets to zero and it is calculated how much the ride cost, 0,89€ activation fee and 0,18€ per minute.
The outstanding amount is automatically deducted from the credits and the user receives a personalized email with the important information. 
Payment methods such as PayPal, MasterCard, Klarna, etc. can be integrated.
You can also add cards and save them.

### Scooter Hardeware

With the Scooters is often not as desired umgegagen, whereby it comes to damage.
In general, the data transmission does not run as desired and needed.
Therefore, we need to develop a device that collects important data and sends it to a central location.
With an admin account should be logged on their site and to each scooter a dashboard can be retrieved.

### Team and Roles

| Function | Group or User |
| -------- | ------------- |
| Problem Owner | ScooTec GmbH |
| Developer | Noah Danyael Zeumer |
| Designer | Noah Danyael Zeumer, Ben Luca Eibel, Vincent Wolff | 
| Network Engineer | Noah Danyael Zeumer |
| Business Expert | Ben Luca Eibel |
| Time & Note Keeper | Vincent Wolff |

## Requirements

### Software

It is a ReactJS frontend with a Node Express backend.
To test the app you need:
- a MariaDB database
- NodeJS
- PayPal development account 
- An email account
- Microsoft Authenticator App / or similar

As well as a `.env` file in `backend` path that looks like this:

```
DB_HOST=************
DB_PORT=*****
DB_USER=**********
DB_PASSWORD=*************** 
DB_DATABASE=scooter-gmbh

MAIL_USER=****@***.***
MAIL_PASSWORD=*********
MAIL_HOST=imap.****.**
MAIL_PORT=***
MAIL_TLS=false
MAIL_SECURE=true
MAIL_SERVICE=******
MAIL_NAME= <****>

PAYPAL_CLIENTID=*************************************************

```
Zur Insterlation muss das Git Responsitory geclonet werden und mit ``npm install`` installiert werden.
Mit `npx express-generator` eine Express Anwendung.

Mit `npx create-react-app PROJECT_NAME` ertsllt man eine React App.


### Scooter Hardware

#### Solution description


ScooTec GmbH, to whom we have already sold a scooter app, complained about a lack of data analysis of the scooters. We fulfill their request by providing a scooter with a 
- temperature and humidity sensor, 
- GPS, 
- Gyroskop. 

This can show more accurate details about the scooters.

#### Solution details

##### Sensors & Actuators

-	Temp(0-55) and Humidity
-	Digital Temperature(-55 bis 125)
-	GPS Mouse 
-	GY-521(Gyroskop)

#### Embedded Code

| For | medocino | School |
| --- | -------- | ------ |
| UI/UX | [Gitlab Autonubil](https://gitlab.autonubil.net/schule/scootec-gmbh/frontend) | [Gitlab School](https://gitlab.com/itech_ble_nze/lf-seven-and-2/frontend) |
| Backend | [Gitlab Autonubil](https://gitlab.autonubil.net/schule/scootec-gmbh/backend) | [Gitlab School](https://gitlab.com/itech_ble_nze/lf-seven-and-2/backend) |
| Rasperry & Arduino | [Gitlab Autonubil](https://gitlab.autonubil.net/schule/scootec-gmbh/arduino) | [Gitlab School](https://gitlab.com/itech_ble_nze/lf-seven-and-2/scooter-hardware) |

#### Network

##### Logical Network Topology

![Logical Network Topology](img/strucktogramm-network.png)

#### Cloud & Data Analytics

With the help of the driving data, the areas can be adjusted.
Thanks to the user data, the target group analysis is easier and it is possible to target new groups.

Also the condition of the scooters can be seen faster, does a user drop the scooter or did it happen after the customer left.

The temperature can also show useful disadvantage for the customer, such as "It might be slippery, so please drive carefully." 

The data can be displayed visually with the help of D3.

## Business Canvas

### Key Partners

Our business partners are the Raspberry Pi Foundation, Arduino as well as Elegoo.
With the help of our partners we were able to create a prototype and thanks to the e-scooter manufacturer Xiaomi Mi we were able to test our prototype under real conditions.

#### Personas from the ScooTec

<img src="img/boss_persona.png" alt="Persona Boss" style="background: white">

<img src="img/lf7user_persona.png" alt="Persone Employee" style="background: white">

### Key Activities

It is primarily aimed at industrial customers. With the help of the product, the most diverse data of an e-scooter can be read out. 
How: 
- Humidity
- speed
- position
- Inclination
The whole thing can also be included in Betshende software. 

### Key Resources

The main components for our product comes from Elegoo, the sensors and the wiring is supplied by them. The microcontroller is supplied by Arduino. The one platinum computer is supplied by the Raspberry PI foundation.

### Customer Relationships

The product is aimed at an already known business partner. 
The ScooTec GmbH has asked us for a device to better evaluate the scooter data. Of course, this device could also be installed on other devices.

### Customer Segments 

Our target group consists mainly of e-scooter scooter startups .

### Channels

We would like to recruit our potential customers via modern forms of advertising, such as social media. 
Of course, we also introduce our product to existing business partners.

### Value Propositions

All the hardware can be minimized to an extremely small size, which allows it to be used for a wide variety of sharing services, such as scooters, bicycles, etc..

The JSON format also allows the sensors to be quickly integrated into existing systems.

For each customer we also offer a basic software package with:
- Login
- OTP
- Payment
- Email notifications
- Data analysis

Our team is constantly working on adding new features and enhancing existing ones. 

### Cost Structure

The storage costs are currently still extremely low, it can be integrated with an office purely whereby no separate warehouse is needed.
It takes very little time to produce a device, usually 5 minutes for the hardware.
Thanks to Terraform we are able to roll out the software on several devices at the same time and customize it for individual customers.
In total it takes about 15 minutes until devices are ready for use. 
We expect a wear and tear of about 5 devices per month.
And the wage is 25€ per hour
In addition, there is the development department, which tries new innovative ideas.
The team currently consists of 3 people.
Our advertising costs per month are about 1.000 €.
The working hours consists of a 35 hour week. 

#### Production
 
| Cost Point per Device | Brutto Cost |
| --------------------- | ----------- |
| DHT11 Sensor | 0.16 € |
| GY-521 | 0.22 € |
| Custemize Arduino | 3.70 € |
| Custimze Raspberry Pi | 80.39 € |
| Total | 84,47 € |

| Cost Point | Brutto Cost |
| ---------- | ----------- |
| Office-Rent | 2.800 € per Month |
| Worker-Cost | 10.500 € per Month |
| Wear | 423,50 € per Month |
| Advertising costs | 1.000 € per Month |
| <strong>Total Cost</strong>|
| Cost Total | 14.723,50 € per Month |
| <strong> Cost Per Device </strong> |
| Cost per Hour | 105.17 € |
| 12 Devices per Hour | 1.013,64 € |
| Total | 1.118,81 € |
| <strong> Finall Cost </strong> |
| Device Cost | 93,23 € |
| 7% Win | 6,53 |

#### Selling 


| Cost Point | Brutto Cost |
| ---------- | ----------- | 
| Software Rent | 30 € per Month |
| Software Hosting | 50 € for 100 devices |
| Support | 100 € per Hour |
| Complettly Outsource | from 9000 € per Month  |
| Sensor Paket | 100 € per Sensor |
| Cost per Device | 99,75 € |

### Revenue Streams

The project was financed by individual sponsors plus the company's own capital. In the future it will be financed by the above offer list.

## Features

- Account creation
- Password is sallted and hashed and stored in the database.
- A 2 factor token is automatically generated, the user has to scan this token at the first login, as well as enter the token.
- It is always logged in with a token
- Automated and personalized emails 
- A world map that searches for the current position
- View live location on the map, with the profile picture
- View scooters on the map
- Add and save payment methods.
- Rent a scooter
- Calculate duration and cost
- Invoice in the app, as well as in by email
- Add credit, e.g. with a PayPal account

### Structure chart

Meaning of the colors:
- Blue = Frontend
- Green = Backend

#### Registrierung

<img src="img/strucktogramm-Registrieren.svg" alt="Registrierung" style="background: white">

#### Anmeldung an der Seite

![Anmeldung](img/strucktogramm-Anmeldung an der Seite.svg)

#### Kosten Berechnen

![Kosten](img/strucktogramm-Kosten Berechnen.svg)

#### Karten Input

![Karten](img/strucktogramm-Karten Input.svg)

#### PayPal

![PayPal](img/strucktogramm-PayPal.svg)

### UML

#### Use Case

![Use Case](img/strucktogramm-use_case.png)

#### Sequence Diagram

![Sequence Diagram](img/strucktogramm-sequence_diagram.png)

### Flowdiagramm

#### ScooTec GmbH Website

![Flowdiagramm](img/strucktogramm-flowdiagram.png)

#### Sensor Device with the Website

![Flowdiagramm](img/strucktogramm-raspberry-pi-and-arduino.png)


### Electric Circuit Diagram

![Electric Circuit DIagram](img/strucktogramm-circuit_diagram.png)


### SQL Model

![SQL Model](img/scooter_app_db.png)

## Extra

### Test

| Test case number | Test case description | Input values | Expected behavior | Observed behavior | Successful? |
|----------------------|----------------------------|-------------|----------------------|------------------------|--------------|
| 1 | reason algorithm, without user input (time*price per min) + entry fee | 5 | result becomes 1.84 | true |
| 10 | the user can start a stopwatch and the time will be given in mil sec | 5 | result will be 1,84 | result will be 54000,84. Mil sec were not converted | false |
| 20 | the user can start a stopwatch and the time will be given in mil sec and converted to min | 5 | result will be 1,84 | result will be NaN.the timer value will be given too late | wrong |
| 30 | With input (time*price per min) + start fee | 5 | Result becomes 1,84 | True |

### Insterllation

### Installation
The both insterllation was tested with Ubuntu 20.04LTS, Docker version 20.10.17 and docker-compose version 1.25.0.
First, this Git repo must be cloned, with the following command:
```
git clone https://github.com/noahzmr/scooter-app.git
```

### Local

- [ ] Set up [UI Directorie](#ui-directorie)
  - [ ] Clone project in the Path
  - [ ] Install node modules
- [ ] Set up [Backend](#backend-directorie)
  - [ ] Clone project in the Path
  - [ ] Install node modules
- [ ] [MariaDB](#mariadb)
  - [ ] Upload [Script](https://github.com/noahzmr/react-chat/tree/master/sql)
- [ ] Edit the [env](#.env) file / if necessary
  - [ ] DB_HOST
  - [ ] DB_PORT
  - [ ] DB_USER
  - [ ] DB_PASSWORD
  - [ ] DB_NAME
  - [ ] MINIO_ROOT_USER
  - [ ] MINIO_ROOT_PASSWORD
  - [ ] MAIL_USER
  - [ ] MAIL_PASSWORD
  - [ ] MAIL_HOST
  - [ ] MAIL_PORT
  - [ ] MAIL_TLS
  - [ ] MAIL_SECURE
  - [ ] MAIL_SERVICE
  - [ ] MAIL_NAME
- [ ] Set Up min.io



#### UI Directorie

```
cd scooter_app
npm install
```

After the installation you can check with the command `npm start` if everything worked. If the following window appears at https://localhost:3000 every thing was success!


#### Backend Directorie

```
cd -
cd backend
npm install
cd -
```

#### MariaDB

Install MariaDB at this <a href='https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04'>tutorial</a>

Update Packages

```
sudo apt update
```

Install MariaDB

```
sudo apt install mariadb-server
```

Start MariaDB

```
sudo systemctl start mariadb.service
```

Run the security script

If the error appears:

```
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
```

try:

```
sudo /etc/init.d/mysql stop
sudo /etc/init.d/mysql start
```

```
sudo mysql_secure_installation
```

Output:

```
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user.  If you've just installed MariaDB, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none): 
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MariaDB
root user without the proper authorisation.

Set root password? [Y/n] y
New password: 
Re-enter new password: 
Password updated successfully!
Reloading privilege tables..
 ... Success!


By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] n
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] n
 ... skipping.

By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] n
 ... skipping.

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] y
 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!
```

Import the Database

```
sudo mysql -u root -p
```

```
CREATE DATABASE scooter-gmbh;
```
from the path `~/scooter_app`:
```
sudo mysql -u root -p scooter-gmbh < ./sql/scooter-gmbh.sql
```

To check if everything works enter: 

```
sudo mysqlshow scooter-gmbh
```

Output: 
```
Database: scooter-gmbh
+----------------------+
|       Tables         |
+----------------------+
| bank                 |
| billing              |
| credit               |
| login                |
| otp                  |
| payment_methods      |
| ride                 |
| role                 |
| scooter              |       
| scooter_data_gy521   |  
| scooter_data_tem_hum |
| scoter_data          |  
| user                 |
| userpicture          |
+----------------------+
```

Now u can start the Backend by typing 

```
cd backend && npm start
```

Maybe this appears:

```
> backend@0.0.0 start
> node ./app.js

Initializing Database...
Connetion Failed! SqlError: (conn=72, no: 1698, SQLState: 28000) Access denied for user 'root'@'localhost'
```

then:

```
sudo mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root';
```

After entering `npm start` again, you should see somthing at https://localhost:9001/index.



### Docker

To install the app with Docker, just run the `docker-compose.yaml` file by going to the project directory and running the following commands:

```
cd scooter_app
mkdir backend
cd backend
vi .env
```
The `.env` file lock the same as the as [here](#env)

After you setup the env file u you can run:

```
docker-compose up -d
```

At the first insterllation daurter the whole thing a little longer, because he downloaded the packets.

output:

```
Starting scooter_gmbh_db_1 ... done
Starting scooter_gmbh_minio_1   ... done
Starting scooter_gmbh_adminer_1 ... done
Starting scooter_gmbh_fullstack_1 ... done
```
When everything is ready, the UI should be available at https://localhost:3000.


### Arduino on a Pi

You can install Arduino on the Raspberry Pi with `sudo apt-get install arduino`.

### GPS Module 

Plug the device to the Raspberry PI.
With `ls /dev/tty*` you cann see a list with devices.
By runing `sudo cat /dev/ttyACM0` you will see the data from the USB GPS device.
After this you have to install the *gpsd* module with `sudo apt install gpsd`
To auto start the USB Device, after a boot go into `vi` or `nano` `/etc/default/gpsd`.
To check if everything runs wright install `sudo apt install gpsd-clients`.
Then type *xgps*.

`cgps`

## Contact

<div style='display: flex; flex-direction: row; justify-content: space-around; width: 200px;'>

[![XING](https://img.shields.io/badge/xing-%23006567.svg?style=for-the-badge&logo=xing&logoColor=white)](https://www.xing.com/profile/NoahDanyael_Zeumer/)

<a href='mailto:noah@noerkelit.online' target="_blank"><img alt='Email' src='https://img.shields.io/badge/Email-100000?style=for-the-badge&logo=Email&logoColor=white&labelColor=961414&color=14D386'/></a>

</div>

## Hosted

<div style='display: flex; flex-direction: row; justify-content: space-around; width: 200px;'>
<a href='https://medocino.net/' target="_blank"><img alt='medocino' src='https://img.shields.io/badge/medocino-100000?style=for-the-badge&logo=medocino&logoColor=white&labelColor=961414&color=26358c'/></a>

<a href='https://medocino.net/' target="_blank"><img alt='exanio' src='https://img.shields.io/badge/exanio-100000?style=for-the-badge&logo=exanio&logoColor=white&labelColor=961414&color=069fad'/></a>
</div>

## Support

If you like this project and it helped you I would appreciate a little support!

<a href='https://www.buymeacoffee.com/noahdnylzmr' target="_blank"><img alt='buy me a coffee' src='https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png'/></a>

## Demo

The demo version is available to all free.
All passwords are hashed and salted, so they are not visible in the database, but we recommend not to use passwords that you use somewhere.
The server is automatically restarted in the evening and all data is deleted.