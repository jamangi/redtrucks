# Red Trucks
Displays the food trucks that are open at the time you invoke the app.

## Overview
I've prepared two versions of the application, a python version and a javascript version, and each version has its unique strengths to offer.

## Python
In the python version of this app, a CSV file is used to cache the request, and that cache is relied on if we ever become unable to connect to the food trucks API. This works especially well, since the owners of the food trucks don't change their schedules up very often. The downside to this, is that there are a few extra seconds of overhead when turning on the app, as it updates the CSV file.
![]()

## Frontend Javascript
In the Javascript version of the app, we lose the CSV cache functionality, but we gain a wonderfully appealing user interface. The app makes an AJAX call to the food trucks service every thirty seconds automatically, so it'll update the display every hour or so without us needing to lift a finger. Weaknesses include the added labor required to code the interface, and frontend Javascript also struggles with using files on the user's file system, so it is network reliant.
![]()

## After Thoughts
If we were to actually deploy an app like this, I think it could be best to have both a front end and back end strategy. This would be easy to coordinate with the use of API, as the front end developers could trust the web APIs, and code around possible failures, without being held up. Likewise, the backend developers could deevlop upgrades at their own pace, for example routes leading to a database system to record user food truck ratings. 

On the other hand, there is something magical about the simplicity of food trucks. An app like this seems to provide value to everyone with no strings attached, and I'm surprised the API data is free. A version of this could be used as an accessory app on a landing page, to act as a gift of charity to any user visiting your website, which would make your presence on the market more special and valuable.
