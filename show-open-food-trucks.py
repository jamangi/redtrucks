"""
    This program returns a list of open food trucks.
    It only displays trucks that are open during the program's invocation.
    Falls back on a csv cache if internet is unavailable during invocation.
"""
import cmd
import csv
from datetime import datetime
import shlex

import requests

import logistics


class FoodTrucksCommand(cmd.Cmd):
    """
        Contains the entry point of the command interpreter.
    """

    prompt = ("(FoodTrucks) ")

    def __init__(self):
        cmd.Cmd.__init__(self)
        self.url = "http://data.sfgov.org/resource/bbb8-hzi6.json"
        self.csv = "backup.csv"
        self.support = "https://github.com/jamangi/Redtrucks"
        self.raw = []
        self.data = []
        self.index = 0

        response = requests.get(self.url)

        if response.status_code == 200:
            self.raw = response.json()
            self.update_backup()
        else:
            print("\nConnection Failure.\nLoading backup data.")
            if not self.load_csv():
                print("{} not found.\nReport bugs to: {}".format(
                    self.csv, self.support))

        for truck in self.raw:
            start_time = (int(truck.get("dayorder")), truck.get("start24"))
            closing_time = (start_time[0], truck.get("end24"))
            if logistics.is_open(start_time, closing_time):
                name = truck.get("applicant")
                address = truck.get("location")
                self.data.append((name, address))

        self.data.sort()

        self.onecmd("?")
        print("{:<35}{:<35}".format("NAME", "ADDRESS"))
        self.print_range(False)

    def do_next(self, args):
        """
            Show next 10 trucks
        """
        self.index = self.index + 10
        if self.index > len(self.data):
            self.index = len(self.data)
        self.print_range()

    def do_back(self, args):
        """
            Show last 10 trucks
        """
        self.index = self.index - 10
        if self.index < 0:
            self.index = 0
        self.print_range()

    def do_quit(self, args):
        """
            Quits the console
        """
        return True

    def print_range(self, init_newline=True):
        """
            Print's up to ten food trucks
        """
        if init_newline:
            print()
        start = self.index
        end = start + 10
        if end > len(self.data):
            end = len(self.data)
        for i in range(start, end):
            name = self.data[i][0]
            address = self.data[i][1]
            print("{:<35}{:<35}".format(name, address))
        print()

    def update_backup(self):
        """
            Updates backup after successful connection
        """
        try:
            with open(self.csv, 'w', newline='') as csvfile:
                fieldnames = ['applicant', 'location', 'dayorder',
                              'start24', 'end24']
                writer = csv.DictWriter(csvfile,
                                        fieldnames=fieldnames,
                                        quoting=csv.QUOTE_MINIMAL,
                                        delimiter=" ")
                for blob in self.raw:
                    entry = {}
                    for field in fieldnames:
                        entry[field] = blob.get(field)
                    writer.writerow(entry)
        except Exception:
            pass

    def load_csv(self):
        """
            Load data into memory from csv
        """
        try:
            with open(self.csv, 'r', newline='') as csvfile:
                fieldnames = ['applicant', 'location',
                              'dayorder', 'start24', 'end24']
                reader = csv.DictReader(csvfile, fieldnames=fieldnames,
                                        delimiter=" ")
                for row in reader:
                    self.raw.append(dict(row))
            return True
        except Exception:
            return False


if __name__ == "__main__":
    '''
        Entry point for the loop.
    '''
    FoodTrucksCommand().cmdloop()
