"""
    This program returns a list of open food trucks
    It only displays trucks that are open during the program's invocation.
    Optional filters include: distance from current location, and price range
    Falls back on a csv cache if internet is unavailable
"""
import cmd
import csv
from datetime import datetime
import requests
import shlex

# url = "http://data.sfgov.org/resource/bbb8-hzi6.json"

# response = requests.get(url)
# if response.status_code == 200:
#     data = response.json()

class RedTrucksCommand(cmd.Cmd):
    """
        Contains the entry point of the command interpreter.
    """

    prompt = ("(RedTrucks) ")

    def __init__(self):
        self.url = "http://data.sfgov.org/resource/bbb8-hzi6.json"
        self.csv = "redtrucks.csv"
        self.support = "https://github.com/GucciGerm/Anime-Animation/blob/master/eyes.css"
        self.data = []
        self.index = 0
        response = requests.get(self.url)
        if response.status_code == 200:
            print("Connect Success")
            self.data = response.json()
        else:
            print("Connection Failed.\nLoading cache'd truck data.")
            if not self.load_csv():
                print("{} not found either.\nReport bugs here: {}".format(
                    self.csv, self.support))

    def do_echo(self, args):
        """
            Echo method
        """
        print(args)
        print(type(args))

    def do_back(self, args):
        """
            Show last 10 trucks
        """
        pass

    def do_next(self, args):
        """
            Show next 10 trucks
        """
        pass

if __name__ == "__main__":
    '''
        Entry point for the loop.
    '''
    RedTrucksCommand().cmdloop()