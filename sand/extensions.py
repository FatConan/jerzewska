import datetime

class SiteExt:
    def tick(self):
        try:
            return self.run_tick
        except AttributeError:
            self.run_tick = datetime.datetime.now().timestamp()
            return self.run_tick


if __name__ == "__main__":
    print(SiteExt().tick())
