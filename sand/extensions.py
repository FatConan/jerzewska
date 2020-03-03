import datetime

class SiteExt:
    def tick(self):
        try:
            return self.run_tick
        except AttributeError:
            self.run_tick = datetime.datetime.now().timestamp()
            return self.run_tick

    def get_portfolio_images(self, data):
        imgs = data.get("portfolio_images", [])
        if isinstance(imgs, list):
            return imgs
        else:
            return [imgs]#

    def get_portfolio_count(self, data):
        return len(self.get_portfolio_images(data))

    def copyright(self):
        return datetime.date.today().strftime("© %Y Agnieszka Jerzewska")

if __name__ == "__main__":
    print(SiteExt().tick())
