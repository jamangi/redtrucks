"""
    module containing time calculation helper function
"""
from datetime import datetime


def day_hour_minute():
    """
        Gets the current day, hour, and minute for California
        Will +1 to weekday to match the foodtruck api
        Will try to get california's time from an api first

    """
    x = datetime.now()
    day = x.weekday()
    hour = x.hour
    minute = x.minute

    if hour < 0:
        hour = 24 + hour
        day -= 1

    day += 1
    day = day % 7
    return (day, hour, minute)


def is_open(start, end):
    """
        Assumes user is in California
        Example:
            is_open((1, "12:00"), (1, "15:00") -> returns True or False

        Note:
        There are three cases in which our schedule can match a food truck's.
        --|  |---|  |--
        A. The truck starts on day one, and ends on day one. (middle case)
            1. We arrive on that day, after it opens, and before it closes.
        B. The truck starts on day one, but ends on day two. (left and right cases)
            2. We arrive on day one after it opens.
            3. We arrive on day two before it closes.
    """
    day, hour, minute = day_hour_minute()

    parsed_start = start[1].split(":")
    parsed_end = end[1].split(":")
    truck_day_start = int(start[0])
    truck_hour_start = int(parsed_start[0])
    truck_minute_start = int(parsed_start[1])
    truck_minute_end = int(parsed_end[1])
    truck_hour_end = int(parsed_end[0])
    truck_day_end = truck_day_start
    if truck_hour_end < truck_hour_start:
        truck_day_end = (truck_day_start + 1) % 7

    if (day == truck_day_start
            and hour >= truck_hour_start
            and (hour < truck_hour_end
            or hour == truck_hour_end
            and minute < truck_minute_end)):
        print("1")
        return True
    elif (day == truck_day_end
            and truck_hour_end < truck_hour_start
            and (hour < truck_hour_end
            or (hour == truck_hour_end
            and minute < truck_minute_end))):
        print("2")
        return True
    elif (day == truck_day_start
            and hour >= truck_hour_start
            and truck_hour_end < truck_hour_start):
        print("3")
        return True
    else:
        print((day, hour, minute))
        print(truck_day_start, truck_hour_start,
            truck_hour_end)
        return False
