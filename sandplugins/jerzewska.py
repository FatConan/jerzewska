import datetime

from sand.plugin import SandPlugin


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
            return [imgs]

    def get_portfolio_count(self, data):
        return len(self.get_portfolio_images(data))

    def copyright(self):
        return datetime.date.today().strftime("© %Y Agnieszka Jerzewska")


class Plugin(SandPlugin):
    def __init__(self):
        self.JERZEWSKA = Jerzewska()
        self.debug = False

    def configure(self, site_data, site):
        self.debug = site_data.get("jerzewska", {}).get("debug", False)


    def add_render_context(self, page, environment, data):
        data["JERZEWSKA"] = self.JERZEWSKA
        data["DEBUG"] = self.debug
