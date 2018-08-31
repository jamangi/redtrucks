# Goal
Display the food trucks that are open at the time the app is invoked.

## Overview
With this project I hope to show the connective power of a web API. The foodtrucks web api which provides our apps the data can be accessed from anywhere: the browser, the terminal, a python application, or even an HTML page. We can also make our own web api, which can be used to connect applications that would otherwise be [unrelated](https://github.com/jamangi/redtrucks/tree/master/visitors_service). 

## Python Console
In the Python Console version of this app, a CSV file is used to cache the request, and that cache is relied on if we ever become unable to connect to the food trucks API. The downside to this, is the extra seconds of overhead when turning on the app, as it updates the CSV file. 

* ![console](https://github.com/jamangi/redtrucks/blob/master/writeup/images/console.gif)

As you can see, the geographic location of the user is also used to calculate the distance from each truck. 

You'll only need to install requests to run the app. Ideally using python3. 
