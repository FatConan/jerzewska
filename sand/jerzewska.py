import datetime

class Jerzewska:
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

class Plugin:
    def __init__(self):
       self.JERZEWSKA = Jerzewska()

    def configure(self, site_data, site):
        self.site = site

    def add_render_context(self, page, environment, data):
        data["JERZEWSKA"] = self.JERZEWSKA

    def parse(self, site_data, site):
       pass