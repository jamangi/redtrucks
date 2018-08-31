# Wrap Up

## Differences between console application and web application
If we were to actually deploy an app like this, I think it could be best to have both a front-end and back-end strategy talking to one another. This would be easiest to coordinate with the use of API, as the front end developers could code around possible failures, without being held up. Likewise, the backend developers could develop upgrades at their own pace, for example routes leading to a database system to record user food truck ratings, or perhaps tying in with google maps api to display exactly where the available food trucks are.

Here is an example of what I'm imagining.

![javascript](https://github.com/jamangi/redtrucks/blob/master/writeup/images/redtrucks.gif)

This index.html page makes an ajax request to the visitor's service, so if you open the page, it will contribute to the total pool of visits, along with the console app. 

Lastly, I suppose some of the main differences to look out for when deploying the full web application, would be security and stability. You would need an SSL certificate to protect your users' data, firewalls to protect your machines, and load balancing to handle the traffic. At the very least, with the use of web api we can make the transfer of data between the many pieces alot smoother.