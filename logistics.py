"""
    Module containing time comparison function.
"""
from datetime import datetime


def day_hour_minute():
    """
        Get the current day, hour, and minute for California.
        Add 1 to weekday to match the foodtruck api.
    """
    x = datetime.now()
    day = x.weekday()
    hour = x.hour
    minute = x.minute

    day += 1
    day = day % 7
    return (day, hour, minute)


def is_open(start, end):
    """
        Check our local time against the start and closing time of a truck.

        Example:
            is_open((1, "12:00"), (1, "15:00") -> Returns True or False.

        Strategy:
            If we handle 1 day like a meter,
            1 hour like a decimeter,
            and 1 minute like a centimeter,
            then we can treat days, hours, and minutes
            like a unified magnitude to simplify comparisons.
    """
    parsed_start = start[1].split(":")
    parsed_end = end[1].split(":")

    truck_day_start = int(start[0])
    truck_hour_start = int(parsed_start[0])
    truck_minute_start = int(parsed_start[1])

    truck_day_end = int(end[0])
    truck_hour_end = int(parsed_end[0])
    truck_minute_end = int(parsed_end[1])

    day, hour, minute = day_hour_minute()
    our_magnitude = (day * 1440) + (hour * 60) + minute
    truck_magnitude_start = (truck_day_start * 1440
                             + truck_hour_start * 60
                             + truck_minute_start)
    truck_magnitude_end = (truck_day_end * 1440
                           + truck_hour_end * 60
                           + truck_minute_end)

    # case A - Truck closes before 12am
    if (truck_magnitude_end > truck_magnitude_start):
        if (our_magnitude >= truck_magnitude_start
                and our_magnitude < truck_magnitude_end):
            return True

    # case B - Truck closes after 12am
    if (truck_magnitude_end < truck_magnitude_start):
        if (our_magnitude >= truck_magnitude_start
                or our_magnitude < truck_magnitude_end):
            return True

    return False
